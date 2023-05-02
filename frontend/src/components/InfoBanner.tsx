import { HiSolidLightBulb } from "solid-icons/hi";
import { createSignal, ParentComponent } from "solid-js";
import { FaSolidXmark } from "solid-icons/fa";
import Button from "./Button";

const InfoBanner: ParentComponent = (props) => {
  const [isHidden, setIsHidden] = createSignal(false);
  return (
    <div
      tabindex="-1"
      classList={{
        "flex justify-between w-full p-4 border-y border-blue-200 bg-blue-50 dark:bg-blue-700 dark:border-blue-600":
          true,
        "opacity-0 hidden": isHidden(),
      }}
    >
      <div class="flex items-center mx-auto">
        <p class="flex items-center text-sm font-normal text-blue-500 dark:text-blue-400">
          <span class="inline-flex p-1 mr-3 bg-blue-200 rounded-full dark:bg-blue-600">
            <HiSolidLightBulb class="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span class="sr-only">Light bulb</span>
          </span>
          <span class="text-justify mx-8">{props.children}</span>
        </p>
      </div>
      <div class="flex items-center">
        <Button
          type="button"
          class="flex-shrink-0 inline-flex justify-center items-center text-blue-400 hover:bg-blue-200 hover:text-blue-900 rounded-lg text-sm p-1.5 dark:hover:bg-blue-600 dark:hover:text-white"
          onClick={() => {
            setIsHidden(true);
          }}
        >
          <FaSolidXmark class="w-4 h-4" />
          <span class="sr-only">Close banner</span>
        </Button>
      </div>
    </div>
  );
};
export default InfoBanner;
