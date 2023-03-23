import { atom } from "nanostores";

export const Step = {
  TOOLS_SELECTION: "tools_selection",
  FILE_INPUT: "file_input",
  RESULTS_WAITING: "results_waiting",
  FINISHED: "finished"
} as const;
export type Step = (typeof Step)[keyof typeof Step];

export const StepsStore = atom<Step>(Step.TOOLS_SELECTION);

export function SetStepByKey(value: Step) {
  StepsStore.set(value);
}
export function GetStepKey(step: number) {
  const possibleOptions = Object.keys(Step) as Array<keyof typeof Step>;
  if (step >= possibleOptions.length) {
    throw new Error();
  }
  return possibleOptions[step];
}
export function GetStepValue(step: number) {
  const possibleOptions = Object.values(Step);
  return possibleOptions[step];
}
export function GetStepIndex(key: Step) {
  const possibleOptions = Object.values(Step);
  return possibleOptions.indexOf(key);
}
export function GetSteps() {
  const steps: Array<{label: string}> = [];
  for (const value of Object.values(Step)) {
    const prettyString = value.split("_").map(function (part) {
      return part.replace(/^./, str => str.toUpperCase())
    }).join(" ")
    steps.push({label: prettyString});

  }
  return steps;
}
