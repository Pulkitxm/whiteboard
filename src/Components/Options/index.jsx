import "./style.css";
import { useRecoilState } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";
import { useEffect } from "react";
import { darkMode as dm } from "../../recoil/darkMode";

import Shapes from "./Shapes";
import TypeOptions from "./TypeOptions";

const Options = () => {
  const [expand, setExpand] = useRecoilState(exp);
  const { width } = useWindow();
  const [darkMode, setDarkMode] = useRecoilState(dm);

  useEffect(() => {
    setExpand(false);
  }, [expand, setExpand]);

  const styles =
    width < 700
      ? {
          width: "100%",
          height: expand ? "20%" : "10%",
          transition: "height 0.5s",
        }
      : {
          width: width > 1000 ? "5%" : expand ? "20%" : "10%",
          height: "100%",
          transition: "width 0.5s",
        };

  return (
    <div
      className="options"
      style={{
        ...styles,
        backgroundColor: darkMode ? "rgb(71 71 71)" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
      onClick={() => setExpand(!expand)}
      onMouseEnter={() => {
        setExpand(true);
      }}
      onMouseLeave={() => {
        setExpand(false);
      }}
    >
      <Shapes />
      <TypeOptions />
      <div className="colors"></div>
      <div className="actions"></div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={darkMode}
          onChange={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("darkMode", !darkMode);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Options;
