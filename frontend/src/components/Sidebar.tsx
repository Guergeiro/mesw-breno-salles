import { createSignal, Match, ParentComponent, Show, Switch } from "solid-js";
import { FaSolidBars, FaSolidXmark } from "solid-icons/fa";
import { OcChecklist2 } from "solid-icons/oc";
import { BiSolidSelectMultiple } from "solid-icons/bi";
import Button from "./Button";

const Sidebar: ParentComponent = (props) => {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    <>
      <div class="bg-gray-50 dark:bg-gray-800 z-40">
        <Button
          onClick={() => {
            setSidebarOpen(sidebarOpen() === false);
          }}
          classList={{
            "inline-flex": true,
            "items-center": true,
            "p-2": true,
            "my-2": true,
            "mx-3": true,
            "text-sm": true,
            "text-gray-500": true,
            "rounded-lg": true,
            "md:hidden": true,
            "hover:bg-gray-100": true,
            "focus:outline-none": true,
            "focus:ring-2": true,
            "focus:ring-gray-200": true,
            "dark:text-gray-400": true,
            "dark:hover:bg-gray-700": true,
            "dark:focus:ring-gray-600": true,
          }}
        >
          <span>
            <Switch>
              <Match when={sidebarOpen() === true}>
                <FaSolidXmark size={24} />
              </Match>
              <Match when={sidebarOpen() === false}>
                <FaSolidBars size={24} />
              </Match>
            </Switch>
            <span class="sr-only">Toggle Sidebar</span>
          </span>
        </Button>
      </div>
      <aside
        classList={{
          fixed: true,
          "top-0": true,
          "left-0": true,
          "z-40": true,
          "w-64": true,
          "h-screen": true,
          "mt-14": true,
          "sm:mt-0": true,
          "transition-transform": true,
          "-translate-x-full": sidebarOpen() === false,
          "transform-none": sidebarOpen(),
          "sm:translate-x-0": true,
        }}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2">
            <li>
              <a
                href="/"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BiSolidSelectMultiple size={24} />
                <span class="ml-3">Tool Selection</span>
              </a>
            </li>
            <li>
              <a
                href="/results"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <OcChecklist2 size={24} />
                <span class="ml-3">Results</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main
        classList={{
          "p-4": true,
          "sm:ml-64": true,
        }}
      >
        {props.children}
      </main>
      <Show when={sidebarOpen() === true}>
        <div
          onClick={() => {
            setSidebarOpen(false);
          }}
          class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 mt-14 sm:hidden"
        ></div>
      </Show>
    </>
  );
};
export default Sidebar;
