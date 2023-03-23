import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { Component, createMemo, Show } from "solid-js";
import { PromiseResults, ResultsStore } from "../ResultsStore";
import { ProjectUploadStore } from "./form-steps/ProjectUpload/ProjectUploadStore";
import FormSteps from "./form-steps/FormSteps";
import { ToolsSelectionStore } from "./form-steps/ToolsSelection/ToolsSelectionStore";
import { Step, StepsStore } from "../StepsStore";
import { ResultSchema } from "@schemas/result.schema";

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
  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return ResultSchema.parse(data);
}

function inForm(step: Step) {
  switch(step) {
    case Step.TOOLS_SELECTION:
    case Step.FILE_INPUT:
      return true;
    default:
      return false;
  }
}

const Form: Component = () => {
  const toolsSelectedStore = useStore(ToolsSelectionStore);

  const currentPage = useStore(StepsStore)

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
      form.append("file", projectUploadStore()!);
      forms.push(form);
    }
    return forms;
  }


  return (
    <Show when={inForm(currentPage())}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await onSubmit();
          ResultsStore.set(response);
          StepsStore.set(Step.RESULTS_WAITING)
        }}
      >
        <FormSteps />
      </form>
    </Show>
  );
};
export default Form;
