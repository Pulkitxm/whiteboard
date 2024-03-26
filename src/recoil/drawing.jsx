import { atom } from "recoil";

export const drawings = atom({
    key: "drawings",
    default: {
        data:[],
        shape:"",
        options:"brush",
        color:"black",
        size:10,
        fill:false
    }
});