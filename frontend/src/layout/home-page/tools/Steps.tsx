import Stepper from "@components/Stepper";
import { useStore } from "@nanostores/solid";
import { createMemo, ParentComponent } from "solid-js";
import { GetStepIndex, GetSteps, Step, StepsStore } from "./StepsStore";

const Steps: ParentComponent = (props) => {
  const steps = useStore(StepsStore);
  const currentStepIndex = createMemo(() => {
    return GetStepIndex(steps())
  })

  const lastStepOverride = createMemo(() => {
    return steps() === Step.FINISHED;
  })

  const allSteps = GetSteps()
  allSteps.pop()

  return <>
    <Stepper currentStep={currentStepIndex} steps={allSteps} lastStepOverride={lastStepOverride}/>
    {props.children}
  </>;
};
export default Steps;
