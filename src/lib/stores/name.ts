import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

export const userName = persist(writable("UserName. (edit me)"), createLocalStorage(), "user_name")