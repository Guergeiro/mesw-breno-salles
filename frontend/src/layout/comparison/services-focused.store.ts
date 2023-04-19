import { atom } from "nanostores";
import { ServiceSchema } from "shared-schemas";
import { CanZoomResetStore } from "./can-zoom-reset.store";

export const ServicesFocusedStore = atom<ServiceSchema[]>([])

export function addService(service: ServiceSchema) {
  const current = ServicesFocusedStore.get()
  ServicesFocusedStore.set([...current, service])
}

export function removeService(service: ServiceSchema) {
  const current = ServicesFocusedStore.get();
  const filtered = current.filter(function (s) {
    return s.id !== service.id
  })
  ServicesFocusedStore.set(filtered);
}
