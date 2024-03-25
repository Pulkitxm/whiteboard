import { useRecoilValue } from "recoil";
import "./style.css";
import { darkMode as dm } from "../../recoil/darkMode";
import useWindow from "../../hooks/useWindow";

const Canvas = () => {
  const darkMode= useRecoilValue(dm);
  const {width}= useWindow();
  return (
    <div className="app-bar" style={{
      backgroundColor: darkMode ? "#333" : "#f5f5f5",
      padding:width>700?"0 10%":"0 20px",
    }}>
      WhiteBoard
    </div>
  );
};

export default Canvas;