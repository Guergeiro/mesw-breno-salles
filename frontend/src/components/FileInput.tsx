import { Component } from "solid-js";

export type FileInputProps = {
  inputId: string;
  label: string;
  text: string;
  accept?: string;
  onInput?: ((event: InputEvent) => void) | (() => void);
};

const FileInput: Component<FileInputProps> = (props) => {
  return (
    <>
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for={props.inputId}
      >
        {props.label}
      </label>
      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby={`${props.inputId}_help`}
        id={props.inputId}
        type="file"
        onInput={props.onInput}
        accept={props.accept}
      />
      <p
        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id={`${props.inputId}_help`}
      >
        {props.text}
      </p>
    </>
  );
};
export default FileInput;
