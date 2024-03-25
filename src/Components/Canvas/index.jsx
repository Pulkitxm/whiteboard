import "./style.css";
import { useRecoilValue } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";

const Canvas = () => {
  const expand = useRecoilValue(exp);
  const { width } = useWindow();

  const styles =
    width < 700
      ? {
          height: expand ? "80%" : "90%",
          width: "100%",
          transition: "height 0.5s",
        }
      : {
          width: width > 1000 ? "90%" : expand ? "80%" : "90%",
          transition: "width 0.5s",
        };
  return (
    <div className="canvas" style={styles}>
      Canvas
    </div>
  );
};

export default Canvas;
