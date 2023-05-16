import FileInput from "@components/FileInput";
import { useStore } from "@nanostores/solid";
import { computed } from "nanostores";
import { Component } from "solid-js";
import { ToolsSelectionStore } from "../ToolsSelection/ToolsSelectionStore";
import { ProjectUploadStore } from "./ProjectUploadStore";

function handleFileInput({ target }: InputEvent) {
  if (target == null) {
    return;
  }
  const fileList = (target as HTMLInputElement).files;
  if (fileList == null) {
    ProjectUploadStore.set(null);
    return;
  }
  ProjectUploadStore.set(fileList[0]);
}

const ProjectUpload: Component = () => {
  const filetype = useStore(
    computed(ToolsSelectionStore, (store) => {
      for (const tool of Object.values(store || {})) {
        for (const { slug } of tool?.languages || []) {
          if (slug === "openapi") {
            return ".json";
          }
        }
      }
      return ".zip";
    })
  );

  return (
    <>
      <FileInput
        inputId="project-file"
        text={filetype()}
        label={"Upload project"}
        onInput={handleFileInput}
        accept={filetype()}
      />
    </>
  );
};
export default ProjectUpload;
