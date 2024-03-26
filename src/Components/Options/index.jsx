import "./style.css";
import { useRecoilState } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";
import { useEffect } from "react";
import { darkMode as dm } from "../../recoil/darkMode";

import Shapes from "./Shapes";
import TypeOptions from "./TypeOptions";
import { drawings as drwng } from "../../recoil/drawing";

const Options = () => {
  const [drawings, setDrawings] = useRecoilState(drwng);
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

  useEffect(() => {
    const shortcut = (e) => {
      if (e.ctrlKey && e.key === "ArrowUp") {
        changeSize("+1");
      } else if (e.ctrlKey && e.key === "ArrowDown") {
        changeSize("-1");
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => {
      window.removeEventListener("keydown", shortcut);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeColor = (color) => {
    setDrawings((obj) => {
      let updatedDrawings = obj;
      updatedDrawings = { ...obj, color };
      localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
      return updatedDrawings;
    });
  };
  const changeSize = (size) => {
    if (size === "+1") {
      setDrawings((obj) => {
        let updatedDrawings = obj;
        const newSize = obj.size + 1 <= 10 ? obj.size + 1 : 10;
        updatedDrawings = { ...obj, size: newSize };
        localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
        return updatedDrawings;
      });
    } else if (size === "-1") {
      setDrawings((obj) => {
        let updatedDrawings = obj;
        const newSize = obj.size - 1 >= 0 ? obj.size - 1 : 0;
        updatedDrawings = { ...obj, size: newSize };
        localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
        return updatedDrawings;
      });
    } else {
      setDrawings((obj) => {
        let updatedDrawings = obj;
        updatedDrawings = { ...obj, size };
        localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
        return updatedDrawings;
      });
    }
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

      <div className="size">
        <input
          type="range"
          min="1"
          max="10"
          value={drawings.size}
          onChange={(e) => changeSize(e.target.value)}
          style={{
            width: "95%"
          }}
        />
      </div>

      <div className="colors">
        <input
          style={{ border: "none", cursor: "pointer" }}
          type="color"
          value={drawings.color}
          onChange={(e) => changeColor(e.target.value)}
        />
      </div>
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
          style={{ cursor: "pointer"}}
        />
      </div>
    </div>
  );
};

export default Options;
