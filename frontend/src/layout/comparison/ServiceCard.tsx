import Button from "@components/Button";
import { Component, For } from "solid-js";
import { FaSolidXmark } from "solid-icons/fa";
import { removeService } from "./services-focused.store";
import { ServiceSchema } from "shared-schemas";

export type ServiceCardProps = {
  service: ServiceSchema;
};

const ServiceCard: Component<ServiceCardProps> = (props) => {
  return (
    <div class="w-full max-w-md p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item}
                      </p>
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
