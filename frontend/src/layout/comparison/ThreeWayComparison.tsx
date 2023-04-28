import { useStore } from "@nanostores/solid";
import { computed } from "nanostores";
import { DecompositionSchema } from "shared-schemas";
import { Component, createMemo, For, ParentComponent } from "solid-js";
import { DecompositionsColoursStore } from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";

const ThreeWayComparison: Component = () => {
  const three = useStore(
    computed(DecompositionsShowingStore, (store) => {
      return Object.values(store)
        .filter(function (value) {
          return value != null;
        })
        .slice(0, 3) as DecompositionSchema[];
    })
  );

  const decompositionColours = useStore(DecompositionsColoursStore);

  const hasShowing = createMemo(() => {
    return three().length !== 0;
  });

  return (
    <Table>
      <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700">
        <tr>
          <th
            scope="col"
            classList={{
              "p-4": true,
              hidden: true,
              "md:table-cell": hasShowing(),
            }}
          ></th>
          <For each={three()}>
            {(item) => {
              return (
                <>
                  <th
                    scope="col"
                    class="p-4"
                    style={{
                      color: decompositionColours().get(item.id),
                    }}
                  >
                    {item.id}
                  </th>
                </>
              );
            }}
          </For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            classList={{
              "p-4": true,
              hidden: true,
              "md:table-cell": hasShowing(),
            }}
          >
            Metadata
          </td>
          <For each={three()}>
            {(item) => {
              const metadata = createMemo(() => {
                const out: string[] = [];
                for (const [key, value] of Object.entries(item.metadata)) {
                  out.push(`[${key}: ${value}]`);
                }
                return out.join(",\n");
              });
              return <td class="p-4">{metadata()}</td>;
            }}
          </For>
        </tr>
        <tr>
          <td
            classList={{
              "p-4": true,
              hidden: true,
              "md:table-cell": hasShowing(),
            }}
          >
            # Services
          </td>
          <For each={three()}>
            {(item) => {
              return <td class="p-4">{item.servicesCount}</td>;
            }}
          </For>
        </tr>
      </tbody>
    </Table>
  );
};
export default ThreeWayComparison;

const Table: ParentComponent = (props) => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {props.children}
      </table>
    </div>
  );
};
