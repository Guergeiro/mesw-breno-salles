import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { SetPendingResult } from "@stores/pending-results.store";
import { ResultSchema } from "shared-schemas";
import { Component, createMemo, Show } from "solid-js";
import { z } from "zod";
import { HomePageStep, HomePageStepsStore } from "../home-page-steps.store";
import FormSteps from "./form-steps/FormSteps";
import { ProjectUploadStore } from "./form-steps/ProjectUpload/ProjectUploadStore";
import { ToolsSelectionStore } from "./form-steps/ToolsSelection/ToolsSelectionStore";

const ValidPromise = z.object({
  status: z.literal("fulfilled"),
  value: ResultSchema,
});
type ValidPromise = z.infer<typeof ValidPromise>;

const InvalidPromise = z.object({
  status: z.literal("rejected"),
  reason: z.instanceof(Error),
});

const PromiseResults = z
  .discriminatedUnion("status", [ValidPromise, InvalidPromise])
  .array();
export type PromiseResults = z.infer<typeof PromiseResults>;

async function submitForms(forms: FormData[]) {
  const promises = forms.map(function (form) {
    return submitForm(form);
  });
  const results = await Promise.allSettled(promises);
  const parsedResults = PromiseResults.parse(results);
  return parsedResults;
}

async function submitForm(form: FormData) {
  const url = new URL("results", API_URL);
  const res = await fetch(url, { method: "POST", body: form });
  ProjectUploadStore.set(null);

  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return ResultSchema.parse(data);
}

function getFulfilledResults(promises: PromiseResults) {
  const fulfilled = promises.filter(function (promise) {
    return promise.status === "fulfilled";
  }) as ValidPromise[];
  return fulfilled.map(function ({ value }) {
    return value;
  });
}

function setPendingResults(results: ResultSchema[]) {
  for (const result of results) {
    SetPendingResult(JSON.parse(JSON.stringify(result)));
  }
}

const Form: Component = () => {
  const toolsSelectedStore = useStore(ToolsSelectionStore);

  const currentPage = useStore(HomePageStepsStore);

  const selectedTools = createMemo(() => {
    const selected: string[] = [];
    for (const [key, value] of Object.entries(toolsSelectedStore())) {
      if (value === true) {
        selected.push(key);
      }
    }

    return selected;
  });

  const projectUploadStore = useStore(ProjectUploadStore);

  async function onSubmit() {
    const forms = buildForms();
    const response = await submitForms(forms);
    return response;
  }

  function buildForms() {
    const forms: FormData[] = [];
    for (const tool of selectedTools()) {
      const form = new FormData();
      form.append("tool", tool);
      form.append("file", projectUploadStore() || "");
      forms.push(form);
    }
    return forms;
  }

  const isShowing = createMemo(() => {
    switch (currentPage()) {
      case HomePageStep.TOOLS_SELECTION:
      case HomePageStep.FILE_INPUT:
        return true;
      default:
        return false;
    }
  });

  return (
    <Show when={isShowing()}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await onSubmit();
          console.log(response);
          const fulfilled = getFulfilledResults(response);
          console.log(fulfilled);
          setPendingResults(fulfilled);
          HomePageStepsStore.set(HomePageStep.RESULTS_WAITING);
        }}
      >
        <FormSteps />
      </form>
    </Show>
  );
};
export default Form;
