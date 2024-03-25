import { useRecoilValue } from "recoil";
import "./style.css";
import { darkMode as dm } from "../../recoil/darkMode";
import useWindow from "../../hooks/useWindow";

const Canvas = () => {
  const darkMode = useRecoilValue(dm);
  const { width } = useWindow();
  return (
    <div
      className="app-bar"
      style={{
        backgroundColor: darkMode ? "#333" : "#f5f5f5",
        padding: width > 700 ? "0 10%" : "0 20px",
        fontSize: width > 700 ? "1.5em" : "1em",
      }}
    >
      <p style={{cursor:"text",userSelect:"none"}}>WhiteBoard</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        style={{
          width: width > 700 ? "1.5em" : "1em",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
};

export default Canvas;
