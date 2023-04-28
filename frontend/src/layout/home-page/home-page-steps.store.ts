import { atom } from "nanostores";

export const HomePageStep = {
  TOOLS_SELECTION: "tools_selection",
  FILE_INPUT: "file_input",
  RESULTS_WAITING: "results_waiting",
  FINISHED: "finished",
} as const;
export type HomePageStep = (typeof HomePageStep)[keyof typeof HomePageStep];

export const HomePageStepsStore = atom<HomePageStep>(
  HomePageStep.TOOLS_SELECTION
);

export function SetStepByKey(value: HomePageStep) {
  HomePageStepsStore.set(value);
}
export function GetStepKey(step: number) {
  const possibleOptions = Object.keys(HomePageStep) as Array<
    keyof typeof HomePageStep
  >;
  if (step >= possibleOptions.length) {
    throw new Error();
  }
  return possibleOptions[step];
}
export function GetStepValue(step: number) {
  const possibleOptions = Object.values(HomePageStep);
  return possibleOptions[step];
}
export function GetStepIndex(key: HomePageStep) {
  const possibleOptions = Object.values(HomePageStep);
  return possibleOptions.indexOf(key);
}
export function GetSteps() {
  const steps: Array<{ label: string }> = [];
  for (const value of Object.values(HomePageStep)) {
    const prettyString = value
      .split("_")
      .map(function (part) {
        return part.replace(/^./, (str) => str.toUpperCase());
      })
      .join(" ");
    steps.push({ label: prettyString });
  }
  return steps;
}
