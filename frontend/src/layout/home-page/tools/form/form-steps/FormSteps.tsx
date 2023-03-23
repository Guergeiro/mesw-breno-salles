import Button from "@components/Button";
import { useStore } from "@nanostores/solid";
import { Component, createEffect, createMemo, createSignal, Match, Switch } from "solid-js";
import { GetStepIndex, GetStepKey, GetStepValue, SetStepByKey, Step, StepsStore } from "../../StepsStore";
import ProjectUpload from "./ProjectUpload/ProjectUpload";
import { ProjectUploadStore } from "./ProjectUpload/ProjectUploadStore";
import ToolsSelection from "./ToolsSelection/ToolsSelection";
import { ToolsSelectionStore } from "./ToolsSelection/ToolsSelectionStore";

const FormSteps: Component = () => {
  const currentStep = useStore(StepsStore);

  const toolsSelectedStore = useStore(ToolsSelectionStore);

  const selectedTools = createMemo(() => {
    const selected: string[] = [];
    for (const [key, value] of Object.entries(toolsSelectedStore())) {
      if (value === true) {
        selected.push(key);
      }
    }

    return selected;
  });

  const hasToolSelected = createMemo(() => {
    return selectedTools().length !== 0;
  });

  const projectUploadStore = useStore(ProjectUploadStore);

  const hasFileSelected = createMemo(() => {
    return projectUploadStore() != null;
  });

  return (
    <>
      <Switch>
        <Match when={currentStep() === Step.TOOLS_SELECTION}>
          <ToolsSelection />
          <Button
            disabled={hasToolSelected() === false}
            onClick={() => {
              SetStepByKey(Step.FILE_INPUT);
            }}
          >
            Next
          </Button>
        </Match>
        <Match when={currentStep() === Step.FILE_INPUT}>
          <ProjectUpload />
          <Button
            variant={"alternative"}
            onClick={() => {
              SetStepByKey(Step.TOOLS_SELECTION);
            }}
          >
            Previous
          </Button>
          <Button
            type="submit"
            disabled={hasFileSelected() === false}
          >
            Submit
          </Button>
        </Match>
      </Switch>
    </>
  );
};
export default FormSteps;
