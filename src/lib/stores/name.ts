import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

export const userName = persist(writable("Northes"), createLocalStorage(), "user_name")