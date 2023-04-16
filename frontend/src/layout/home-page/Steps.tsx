import Stepper from "@components/Stepper";
import { useStore } from "@nanostores/solid";
import { createMemo, ParentComponent } from "solid-js";
import { GetStepIndex, GetSteps, HomePageStep, HomePageStepsStore } from "./home-page-steps.store.ts";

const Steps: ParentComponent = (props) => {
  const steps = useStore(HomePageStepsStore);
  const currentStepIndex = createMemo(() => {
    return GetStepIndex(steps());
  });

  const lastStepOverride = createMemo(() => {
    return steps() === HomePageStep.FINISHED;
  });

  const allSteps = GetSteps();
  allSteps.pop();

  return (
    <>
      <Stepper
        currentStep={currentStepIndex}
        steps={allSteps}
        lastStepOverride={lastStepOverride}
      />
      {props.children}
    </>
  );
};
export default Steps;
