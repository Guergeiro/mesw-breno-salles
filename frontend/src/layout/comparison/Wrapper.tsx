import Anchor from "@components/Anchor";
import Button from "@components/Button";
import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { DecompositionsStore } from "@stores/decompositions.store";
import { ForcedGraphMode } from "@stores/forced-graph-mode.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { computed } from "nanostores";
import { CreatePaginationSchema, DecompositionSchema } from "shared-schemas";
import { HiSolidCubeTransparent } from "solid-icons/hi";
import { TbSquaresDiagonal, TbZoomReset } from "solid-icons/tb";
import { createMemo, createReaction, createResource, createSignal, For, ParentComponent } from "solid-js";
import colors from "tailwindcss/colors";
import { z } from "zod";
import { CanZoomResetStore } from "./can-zoom-reset.store";
import { DecompositionsColoursStore } from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";
import ServiceCard from "./ServiceCard";
import { ServicesFocusedStore } from "./services-focused.store";
import { ShowModulesStore } from "./show-modules.store";

async function getDecompositions(url: URL) {
  const res = await fetch(url);
  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

const ResultPagination = CreatePaginationSchema(DecompositionSchema);
type ResultPagination = z.infer<typeof ResultPagination>;

const Wrapper: ParentComponent = (props) => {
  const pageSignal = createSignal(1);
  const [pageSize] = createSignal(5);

  const decomposistionsSelected = useStore(
    computed(DecompositionsSelectedStore, (store) => {
      return Object.values(store).filter(function (d) {
        return d != null;
      }) as Array<DecompositionSchema>;
    })
  );


  const url = createMemo(() => {
    const [page] = pageSignal;
    const url = new URL("decompositions", API_URL);
    url.searchParams.append("limit", `${pageSize()}`);
    url.searchParams.append("page", `${page()}`);
    for (const {id} of decomposistionsSelected()) {
      url.searchParams.append("id", id)
    }
    return url;
  });

  const [response] = createResource(url, function () {
    return getDecompositions(url())
  })

  const parsedData = createMemo(() => {
    const fallback = {
      data: [] as ResultPagination["data"],
      count: 0,
      page: 1,
    } as const satisfies ResultPagination;

    const parsed = ResultPagination.safeParse(response());
    if (parsed.success === false) {
      return fallback;
    }
    return parsed.data;
  });

  const results = createMemo(() => {
    return parsedData().data;
  });

  const track = createReaction(() => {
    const record: Record<string, DecompositionSchema> = {};
    for (const result of results()) {
      record[result.id] = result;
    }
    DecompositionsStore.set(record);
  });

  track(() => results())


  const decompositions = useStore(
    computed(DecompositionsStore, (store) => {
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
  const canZoomReset = useStore(CanZoomResetStore);
  const graphMode = useStore(ForcedGraphMode);
  const showModules = useStore(ShowModulesStore);
  const servicesFocused = useStore(ServicesFocusedStore);
  const hasServicesFocused = createMemo(() => {
    return servicesFocused().length !== 0;
  });

  return (
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-3/12 mx-auto">
        <div class="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
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
                <div class="h-full">
                  <label class="relative inline-flex items-center m-2 py-4 cursor-pointer">
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
                      class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[18px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                      style={{ "background-color": style() }}
                    ></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 truncate text-clip">
                      {item.id}
                    </span>
                  </label>
                </div>
              );
            }}
          </For>
        </div>
      </div>

      <div
        classList={{
          "w-full": true,
          "mx-auto": true,
          "lg:w-9/12": hasServicesFocused() === false,
          "lg:w-6/12": hasServicesFocused(),
          "lg:transition-all": true,
        }}
      >
        <div class="my-2 mb-5">{props.children}</div>
        <div class="grid grid-cols-4">
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
          <div class="text-center">
            <Button
              variant="light"
              classList={{
                "px-5": false,
                "py-2.5": false,
                "p-1": true,
              }}
              disabled={canZoomReset() === false}
              onClick={() => {
                CanZoomResetStore.set(false);
              }}
            >
              <TbZoomReset size={24} />
            </Button>
          </div>
          <div class="relative text-right">
            <label class="relative inline-flex h-full items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                checked={showModules() === true}
                onChange={(e) => {
                  ShowModulesStore.set(e.currentTarget.checked);
                }}
              />
              <div class="mr-3 w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
              <TbSquaresDiagonal size={24} />
              <span class="text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block">
                Modules toggle
              </span>
            </label>
          </div>
          <div class="relative text-right">
            <label class="relative inline-flex h-full items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                checked={graphMode() === "true"}
                onChange={(e) => {
                  ForcedGraphMode.set(`${e.currentTarget.checked}`);
                }}
              />
              <div class="mr-3 w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
              <HiSolidCubeTransparent size={24} />
              <span class="text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block">
                3D toggle
              </span>
            </label>
          </div>
        </div>
      </div>

      <div
        classList={{
          "w-full": true,
          "mx-auto": true,
          "lg:w-3/12": hasServicesFocused(),
          hidden: hasServicesFocused() === false,
        }}
      >
        <For each={servicesFocused()}>
          {(item) => {
            return <ServiceCard service={item} />;
          }}
        </For>
      </div>
    </div>
  );
};
export default Wrapper;
