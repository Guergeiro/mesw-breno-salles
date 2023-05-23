import { useStore } from "@nanostores/solid";
import { Component, createMemo, Match, Switch } from "solid-js";
import {
  SetStepByKey,
  HomePageStep,
  HomePageStepsStore,
} from "../../home-page-steps.store";
import ProjectUpload from "./ProjectUpload/ProjectUpload";
import { ProjectUploadStore } from "./ProjectUpload/ProjectUploadStore";
import ToolsSelection from "./ToolsSelection/ToolsSelection";
import { ToolsSelectionStore } from "./ToolsSelection/ToolsSelectionStore";

const FormSteps: Component = () => {
  const currentStep = useStore(HomePageStepsStore);

  const toolsSelectedStore = useStore(ToolsSelectionStore);

  const selectedTools = createMemo(() => {
    const selected: string[] = [];
    for (const [key, value] of Object.entries(toolsSelectedStore())) {
      if (value != null) {
        selected.push(key);
      }
    }

    return selected;
  });

  const hasToolSelected = createMemo(() => {
    return selectedTools().length !== 0;
  });

  const projectUploadStore = useStore(ProjectUploadStore);

  const canSubmit = createMemo(() => {
    if (currentStep() === HomePageStep.UPLOADING) {
      return false;
    }
    if (projectUploadStore() == null) {
      return false;
    }
    return true;
  });

  const showProjectUpload = createMemo(() => {
    if (currentStep() === HomePageStep.FILE_INPUT) {
      return true;
    }
    if (currentStep() === HomePageStep.UPLOADING) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Switch>
        <Match when={currentStep() === HomePageStep.TOOLS_SELECTION}>
          <ToolsSelection />
          <button
            type="button"
            classList={{
              "focus:outline-none": true,
              "focus:ring-4": true,
              "font-medium": true,
              "rounded-lg": true,
              "text-sm": true,
              "px-5": true,
              "py-2.5": true,
              "text-white": true,
              "bg-blue-700": true,
              "hover:bg-blue-800": true,
              "focus:ring-blue-300": true,
              "dark:bg-blue-600": true,
              "dark:hover:bg-blue-700": true,
              "dark:focus:ring-blue-800": true,
              "cursor-not-allowed": hasToolSelected() === false,
              "opacity-50": hasToolSelected() === false,
            }}
            disabled={hasToolSelected() === false}
            onClick={() => {
              SetStepByKey(HomePageStep.FILE_INPUT);
            }}
          >
            Next
          </button>
        </Match>
        <Match when={showProjectUpload()}>
          <ProjectUpload />
          <button
            type="button"
            classList={{
              "focus:outline-none": true,
              "focus:ring-4": true,
              "font-medium": true,
              "rounded-lg": true,
              "text-sm": true,
              "px-5": true,
              "py-2.5": true,
              "text-gray-900": true,
              "bg-white": true,
              border: true,
              "border-gray-200": true,
              "hover:bg-gray-100": true,
              "hover:text-blue-700": true,
              "focus:ring-gray-200": true,
              "dark:focus:ring-gray-700": true,
              "dark:bg-gray-800": true,
              "dark:text-gray-400": true,
              "dark:border-gray-600": true,
              "dark:hover:text-white": true,
              "dark:hover:bg-gray-700": true,
              "mr-2": true,
            }}
            onClick={() => {
              SetStepByKey(HomePageStep.TOOLS_SELECTION);
            }}
          >
            Previous
          </button>
          <button
            type="submit"
            classList={{
              "focus:outline-none": true,
              "focus:ring-4": true,
              "font-medium": true,
              "rounded-lg": true,
              "text-sm": true,
              "px-5": true,
              "py-2.5": true,
              "text-white": true,
              "bg-blue-700": true,
              "hover:bg-blue-800": true,
              "focus:ring-blue-300": true,
              "dark:bg-blue-600": true,
              "dark:hover:bg-blue-700": true,
              "dark:focus:ring-blue-800": true,
              "cursor-not-allowed": canSubmit() === false,
              "opacity-50": canSubmit() === false,
            }}
            disabled={canSubmit() === false}
          >
            Submit
          </button>
        </Match>
      </Switch>
    </>
  );
};
export default FormSteps;
