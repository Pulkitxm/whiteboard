import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import WhiteBoard from "./components/WhiteBoard";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { drawings } from "./recoil/drawing";
import { darkMode as dm } from "./recoil/darkMode";
import { useCookies } from "react-cookie";
import { userAtom } from "./recoil/user";

const App = () => {
  const setUser= useResetRecoilState(userAtom);
  const [cookies] = useCookies([]);
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
    if(!cookies.token){
      setUser({
        _id: null,
        username: "",
        email: "",
    });
    }
  }, [cookies]);
  return (
    <div
      className="app"
      style={{
        color: !darkMode ? "#000" : "#fff",
      }}
    >
      <AppBar />
      <Routes>
        <Route path={"/"} element={<WhiteBoard />} />
        <Route path={"/:id"} element={<WhiteBoard />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"*"} element={<WhiteBoard />} />
      </Routes>
    </div>
  );
};

export default App;
