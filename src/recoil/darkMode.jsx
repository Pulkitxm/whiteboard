import { atom } from "recoil";

export const darkMode = atom({
    key: "darkMode",
    default: window.matchMedia("(prefers-color-scheme: dark)").matches,
});