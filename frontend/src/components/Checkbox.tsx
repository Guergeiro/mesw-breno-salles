import { Component, Signal } from "solid-js";

export type CheckboxProps = {
  inputId: string;
  label: string;
  checked: Signal<boolean>;
};

const Checkbox: Component<CheckboxProps> = (props) => {
  const [isChecked, setIsChecked] = props.checked;

  return (
    <>
      <div class="flex items-center">
        <input
          id={props.inputId}
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={isChecked()}
          onChange={({ currentTarget }) => {
            setIsChecked(currentTarget.checked);
          }}
        />
        <label for={props.inputId} class="sr-only">
          {props.label}
        </label>
      </div>
    </>
  );
};
export default Checkbox;
