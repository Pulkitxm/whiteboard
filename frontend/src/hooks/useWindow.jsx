import { useState } from "react";

const useWindow = () => {
    const [width, setwidth] = useState(window.innerWidth);
    const [height, setheight] = useState(window.innerHeight);

    window.addEventListener("resize", () => {
        window.innerWidth!=width && setwidth(window.innerWidth);
        window.innerHeight!=height && setheight(window.innerHeight);
    });
    
    return { width, height};
};

export default useWindow;