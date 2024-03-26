import { atom } from "recoil";

export const drawings = atom({
    key: "drawings",
    default: {
        data:[],
        shape:"",
        options:"brush",
        color:"#000000",
        size:5,
        fill:false
    }
});