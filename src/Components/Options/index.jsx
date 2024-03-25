import "./style.css";
import { useRecoilState } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";
import { useEffect } from "react";

const Options = () => {
  const [expand, setExpand] = useRecoilState(exp);
  const { width } = useWindow();

  const styles =
    width < 700
      ? {
          width: "100%",
          height: expand ? "20%" : "10%",
          transition: "height 0.5s",
        }
      : {
          width: width>1000?"10%":expand ? "20%" : "10%",
          height: "100%",
          transition: "width 0.5s",
        };

  return (
    <div
      className="options"
      style={styles}
      onClick={() => setExpand(!expand)}
      onMouseEnter={() => {
        setExpand(true);
      }}
      onMouseLeave={() => {
        setExpand(false);
      }}
    >
      Options
    </div>
  );
};

export default Options;
