import { useEffect } from "react";
import "./App.css";

import axios from "axios";
import AppBar from "./components/AppBar";
import WhiteBoard from "./components/WhiteBoard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { drawings } from "./recoil/drawing";
import { darkMode as dm } from "./recoil/darkMode";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const setDrawings = useSetRecoilState(drawings);
  const [darkMode, setDarkMode] = useRecoilState(dm);
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("drawings"));
    const darkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (obj != null) {
      setDrawings(obj);
    }
    if (darkMode != null) {
      setDarkMode(darkMode);
    }
  }, [setDarkMode, setDrawings]);
  useEffect(() => {
    console.log(cookies);
  }, [cookies]);
  return (
    <div
      className="app"
      style={{
        color: !darkMode ? "#000" : "#fff",
      }}
    >
      <AppBar />
      <WhiteBoard />
    </div>
  );
};

export default App;
