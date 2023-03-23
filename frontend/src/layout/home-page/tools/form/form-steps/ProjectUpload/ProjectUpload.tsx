import FileInput from "@components/FileInput";
import { Component } from "solid-js";
import { ProjectUploadStore } from "./ProjectUploadStore";

function handleFileInput({target}: InputEvent) {
  if (target == null) {
    return;
  }
  const fileList = (target as HTMLInputElement).files;
  if (fileList == null) {
    ProjectUploadStore.set(null)
    return;
  }
  ProjectUploadStore.set(fileList[0]);
}

const ProjectUpload: Component = () => {
  return (
    <>
      <FileInput
        inputId="project-file"
        text="ZIP"
        label={"Upload project"}
        onInput={handleFileInput}
      />
    </>
  );
};
export default ProjectUpload;
