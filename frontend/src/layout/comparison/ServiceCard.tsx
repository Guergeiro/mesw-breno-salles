import Button from "@components/Button";
import { Component, For } from "solid-js";
import { FaSolidXmark } from "solid-icons/fa";
import { removeService } from "./services-focused.store";
import { ServiceSchema } from "shared-schemas";
import { useStore } from "@nanostores/solid";
import {
  DecompositionsColoursStore,
  getRandomColor,
} from "./decompositions-colours.store";
import { computed } from "nanostores";

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
        <Button
          variant={"alternative"}
          classList={{
            "px-5": false,
            "py-2.5": false,
            "p-1": true,
          }}
          onClick={() => {
            removeService(props.service);
          }}
        >
          <FaSolidXmark size={16} />
        </Button>
      </div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          <For each={props.service.modules}>
            {(item) => {
              return (
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-4">
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white peer">
                        {item}
                      </p>
                      <div
                        role="tooltip"
                        class="absolute z-10 invisible opacity-0 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 lg:peer-hover:visible lg:peer-hover:opacity-100"
                      >
                        {item}
                      </div>
                    </div>
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
