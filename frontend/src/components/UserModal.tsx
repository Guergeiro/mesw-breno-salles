import { useStore } from "@nanostores/solid";
import { UserModalOpen } from "@stores/user-modal-open.store";
import { FaSolidXmark } from "solid-icons/fa";
import { IoWarningOutline } from "solid-icons/io";
import { Component, Show } from "solid-js";

const UserModal: Component = () => {
  const openModal = useStore(UserModalOpen);
  return (
    <Show when={openModal()}>
      <div
        tabindex="-1"
        classList={{
          "fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full":
            true,
          hidden: openModal() === false,
          "justify-center items-center flex": openModal() === true,
        }}
        aria-hidden={openModal() === false}
        aria-modal={openModal() === true}
        role="dialog"
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => {
                UserModalOpen.set(false);
              }}
            >
              <FaSolidXmark />
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <IoWarningOutline class="mx-auto" size={48} />
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this id?
              </h3>
              <button
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  localStorage.clear();
                  UserModalOpen.set(false);
                  location.reload();
                }}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  UserModalOpen.set(false);
                }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
    </Show>
  );
};
export default UserModal;
