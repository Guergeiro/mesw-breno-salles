import { ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import Button, { ButtonProps } from "./Button";

export type AnchorProps = ButtonProps;

const Anchor: ParentComponent<AnchorProps> = (props) => {
  const button = Button(props);

  return <Dynamic component={"a"} children={props.children} />;
};
