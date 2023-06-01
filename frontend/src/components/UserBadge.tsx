import { useStore } from "@nanostores/solid";
import { CurrentUserStore } from "@stores/current-user.store";
import { computed } from "nanostores";
import { FaSolidXmark } from "solid-icons/fa";
import { Component, createMemo, createSignal, Show } from "solid-js";
import { createEventListenerMap } from "@solid-primitives/event-listener";
import { UserModalOpen } from "@stores/user-modal-open.store";

const UserBadge: Component = () => {
  const [isHover, setIsHover] = createSignal(false);

  const currentUser = useStore(
    computed(CurrentUserStore, (id) => {
      return id || "";
    })
  );

  const splittedId = createMemo(() => {
    const [first, ...rest] = currentUser().split("-");
    return [first, rest.join("-")];
  });

  return (
    <>
      <div
        ref={(el) => {
          createEventListenerMap(el, {
            click: () => {
              setIsHover(!isHover());
            },
          });
        }}
        class="inline-flex items-center px-2 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300 cursor-pointer overflow-hidden"
      >
        <div class="flex-shrink-0">
          <span>{splittedId()[0]}</span>
          <span class="hidden sm:inline-block">-{splittedId()[1]}</span>
        </div>
        <Show when={isHover()}>
          <button
            type="button"
            class="inline-flex items-center p-0.5 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300 ml-2"
            aria-label="Remove"
            onClick={() => {
              UserModalOpen.set(true);
            }}
          >
            <FaSolidXmark />
          </button>
        </Show>
      </div>
    </>
  );
};
export default UserBadge;
