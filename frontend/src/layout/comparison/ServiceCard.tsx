import { Component, createMemo, For } from "solid-js";
import { FaSolidXmark } from "solid-icons/fa";
import { removeService } from "./services-focused.store";
import { ServiceSchema } from "shared-schemas";
import { useStore } from "@nanostores/solid";
import {
  DecompositionsColoursStore,
  getRandomColor,
} from "./decompositions-colours.store";
import { computed } from "nanostores";
import { IoCopy } from "solid-icons/io";
import { writeClipboard } from "@solid-primitives/clipboard";

export type ServiceCardProps = {
  service: ServiceSchema;
};

const ServiceCard: Component<ServiceCardProps> = (props) => {
  const colour = useStore(
    computed(DecompositionsColoursStore, (store) => {
      if (typeof props.service.decomposition === "string") {
        return store.get(props.service.decomposition) ?? getRandomColor();
      }
      return store.get(props.service.decomposition.id) ?? getRandomColor();
    })
  );

  return (
    <div
      class="w-full max-w-md p-2 bg-white border rounded-lg shadow dark:bg-gray-800"
      style={{
        "border-color": colour(),
      }}
    >
      <div class="flex items-center justify-between mb-4">
        <h6 class="font-bold leading-none text-gray-900 dark:text-white">
          {props.service.name}
        </h6>
        <button
          type="button"
          classList={{
            "focus:outline-none": true,
            "focus:ring-4": true,
            "font-medium": true,
            "rounded-lg": true,
            "text-sm": true,
            "text-gray-900": true,
            "bg-white": true,
            border: true,
            "border-gray-200": true,
            "hover:bg-gray-100": true,
            "hover:text-blue-700": true,
            "focus:ring-gray-200": true,
            "dark:focus:ring-gray-700": true,
            "dark:bg-gray-800": true,
            "dark:text-gray-400": true,
            "dark:border-gray-600": true,
            "dark:hover:text-white": true,
            "dark:hover:bg-gray-700": true,
            "p-1": true,
          }}
          onClick={() => {
            removeService(props.service);
          }}
        >
          <FaSolidXmark size={16} />
        </button>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <For each={props.service.modules}>
            {(item) => {
              const simplifiedName = createMemo(() => {
                return item.split(".").pop() || "";
              });

              return (
                <li>
                  <div class="flex items-center">
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white peer">
                        {simplifiedName()}
                      </p>
                      <div
                        role="tooltip"
                        class="absolute z-10 invisible opacity-0 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 peer-hover:visible peer-hover:opacity-100"
                      >
                        {item}
                      </div>
                    </div>
                    <button
                      type="button"
                      class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 mr-0 ml-auto"
                      onClick={async () => {
                        await writeClipboard(item);
                      }}
                    >
                      <IoCopy />
                    </button>
                  </div>
                </li>
              );
            }}
          </For>
        </ul>
      </div>
    </div>
  );
};
export default ServiceCard;
