import {
  Accessor,
  Component,
  For,
  Match,
  ParentComponent,
  Show,
  Switch,
} from "solid-js";

type Step = {
  label: string;
};

export type StepperProps = {
  currentStep: Accessor<number>;
  steps: Array<Step>;
  lastStepOverride: Accessor<boolean>;
};

const LabelSpan: Component<{ label: string }> = (props) => {
  const [first, ...rest] = props.label.split(" ");
  if (rest.length === 0) {
    return <>{props.label}</>;
  }
  return (
    <>
      {first}{" "}
      <span class="hidden sm:inline-flex sm:ml-2">{rest.join(" ")}</span>
    </>
  );
};

const Line: ParentComponent<{
  step: Accessor<number>;
  currentStep: Accessor<number>;
  lastStepOverride: Accessor<boolean>;
}> = (props) => {
  return (
    <Switch>
      <Match when={props.step() < props.currentStep()}>
        <li class="flex items-center text-green-600 dark:text-green-500">
          <span class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-green-600 rounded-full shrink-0 dark:border-green-500">
            {props.step() + 1}
          </span>
          {props.children}
        </li>
      </Match>
      <Match when={props.step() === props.currentStep()}>
        <li class="flex items-center text-blue-600 dark:text-blue-500">
          <span class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
            {props.step() + 1}
          </span>
          {props.children}
        </li>
      </Match>
      <Match when={props.step() > props.currentStep() || props.lastStepOverride()}>
        <li class="flex items-center">
          <span class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
            {props.step() + 1}
          </span>
          {props.children}
        </li>
      </Match>
    </Switch>
  );
};

const Stepper: Component<StepperProps> = (props) => {
  return (
    <>
      <ol class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
        <For each={props.steps}>
          {(step, index) => {
            return (
              <>
                <Line step={index} currentStep={props.currentStep} lastStepOverride={props.lastStepOverride}>
                  <LabelSpan label={step.label} />
                  <Show when={index() !== props.steps.length - 1}>
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 ml-2 sm:ml-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Show>
                </Line>
              </>
            );
          }}
        </For>
      </ol>
    </>
  );
};
export default Stepper;
