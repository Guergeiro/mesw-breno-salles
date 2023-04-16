import Button from "@components/Button";
import { useStore } from "@nanostores/solid";
import { Component, createMemo, Match, Switch } from "solid-js";
import { SetStepByKey, HomePageStep, HomePageStepsStore } from "../../home-page-steps.store.ts";
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
        <Match when={currentStep() === HomePageStep.TOOLS_SELECTION}>
          <ToolsSelection />
          <Button
            variant="default"
            disabled={hasToolSelected() === false}
            onClick={() => {
              SetStepByKey(HomePageStep.FILE_INPUT);
            }}
          >
            Next
          </Button>
        </Match>
        <Match when={currentStep() === HomePageStep.FILE_INPUT}>
          <ProjectUpload />
          <Button
            variant={"alternative"}
            onClick={() => {
              SetStepByKey(HomePageStep.TOOLS_SELECTION);
            }}
          >
            Previous
          </Button>
          <Button
            variant="default"
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
