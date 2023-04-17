import Anchor from "@components/Anchor";
import { useStore } from "@nanostores/solid";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { computed } from "nanostores";
import { DecompositionSchema } from "shared-schemas";
import { createMemo, For, ParentComponent } from "solid-js";
import { DecompositionsColoursStore } from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";
import { HiSolidCubeTransparent } from "solid-icons/hi";
import colors from "tailwindcss/colors";
import { ForcedGraphMode } from "@stores/forced-graph-mode.store";

const Wrapper: ParentComponent = (props) => {
  const decompositions = useStore(
    computed(DecompositionsSelectedStore, (store) => {
      return Object.values(store).filter(function (d) {
        return d != null;
      }) as Array<DecompositionSchema>;
    })
  );

  const gray200 = createMemo(() => {
    return colors.gray[200];
  });

  const decompositionShowing = useStore(DecompositionsShowingStore);
  const decompositionColours = useStore(DecompositionsColoursStore);
  const graphMode = useStore(ForcedGraphMode);

  return (
    <>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <For each={decompositions()}>
          {(item) => {
            const isShowing = createMemo(() => {
              return decompositionShowing()[item.id] != null;
            });
            const style = createMemo(() => {
              if (isShowing()) {
                return decompositionColours().get(item.id);
              }
              return gray200();
            });
            return (
              <>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value={item.id}
                    class="sr-only peer"
                    checked={isShowing()}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        DecompositionsShowingStore.setKey(item.id, item);
                      } else {
                        DecompositionsShowingStore.setKey(item.id, null);
                      }
                    }}
                  />
                  <div
                    class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                    style={{ "background-color": style() }}
                  ></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {item.id}
                  </span>
                </label>
              </>
            );
          }}
        </For>
      </div>
      <div class="my-2 mb-5">{props.children}</div>
      <div class="grid grid-cols-2">
        <div class="text-left">
          <Anchor
            variant={"alternative"}
            href="/results"
            onClick={() => {
              ResultsSelectedStore.set({});
              DecompositionsSelectedStore.set({});
            }}
          >
            Go back
          </Anchor>
        </div>
        <div class="relative text-right">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" checked={graphMode() === "true"} onChange={(e) => {
              ForcedGraphMode.set(`${e.currentTarget.checked}`)
            }} />
            <div class="mr-3 w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
            <HiSolidCubeTransparent size={24} />
            <span class="text-sm font-medium text-gray-900 dark:text-gray-300">
              3D toggle
            </span>
          </label>
        </div>
      </div>
    </>
  );
};
export default Wrapper;
