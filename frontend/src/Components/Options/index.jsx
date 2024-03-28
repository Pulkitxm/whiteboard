import "./style.css";
import { useRecoilState } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";
import { useEffect, useState } from "react";
import { darkMode as dm } from "../../recoil/darkMode";
import jsPDF from "jspdf";

import Shapes from "./Shapes";
import TypeOptions from "./TypeOptions";
import { drawings as drwng } from "../../recoil/drawing";

const Options = () => {
  const [opt, setopt] = useState("img");
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
          width: width > 1000 ? "10%" : expand ? "20%" : "10%",
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
        console.log(obj.size);
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
  const download = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas || !drawings.data.length) return;
    if (opt === "img") {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "canvas_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (opt === "pdf") {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const aspectRatio = canvas.width / canvas.height;
      const pdfWidth = 210;
      const pdfHeight = pdfWidth / aspectRatio;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("whiteboard-pulkit.pdf");
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
            width: "95%",
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
          style={{ cursor: "pointer", transform: "scale(1)" }}
        />
      </div>
      <select
        name="opt"
        id="opt"
        value={opt}
        onChange={(e) => {
          setopt(e.target.value);
        }}
        style={{ cursor: "pointer", transform: "scale(.8)" }}
      >
        <option value="img">Image</option>
        <option value="pdf">PDF</option>
      </select>
      <button
        className="btn btn-primary"
        style={{ opacity: !drawings.data.length ? 0.4 : 1 }}
        onClick={() => download("pdf")}
      >
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="80%"
          width="80%"
        >
          <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" />
        </svg>
      </button>
    </div>
  );
};

export default Options;
