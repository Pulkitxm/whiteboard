import { atom } from "recoil";

export const userAtom = atom({
    key: "user",
    default: {
        _id: null,
        username: "",
        email: "",
    },
});