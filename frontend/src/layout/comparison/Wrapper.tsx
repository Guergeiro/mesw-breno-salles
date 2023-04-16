import Anchor from "@components/Anchor";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { ParentComponent } from "solid-js";

const Wrapper: ParentComponent = (props) => {
  return (
    <>
      <div class="my-2">
        {props.children}
      </div>
      <Anchor
        variant={"alternative"}
        href="/results"
        onClick={() => {
          ResultsSelectedStore.set({})
        }}
      >
        Go back
      </Anchor>
    </>
  );
};
export default Wrapper;
