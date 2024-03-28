import { useRecoilState, useRecoilValue } from "recoil";
import "./style.css";
import { darkMode as dm } from "../../recoil/darkMode";
import useWindow from "../../hooks/useWindow";
import { userAtom as userState } from "../../recoil/user";
import { Link } from "react-router-dom";
// import { DarkSun, LighSun } from "./Svgs";

const Canvas = () => {
  const [darkMode] = useRecoilState(dm);
  const { width } = useWindow();
  const user = useRecoilValue(userState);
  return (
    <div className="flex flex-row">
      <div
        className="app-bar"
        style={{
          backgroundColor: darkMode ? "#333" : "rgb(119 119 119)",
          padding: width > 700 ? "0 10%" : "0 20px",
          paddingRight: width > 700 ? "2%" : "8px",
          fontSize: width > 700 ? "1.5em" : "1em",
        }}
      >
        <p
          style={{
            cursor: "text",
            userSelect: "none",
            color: darkMode ? "white" : "black",
            margin: 0,
          }}
        >
          <Link to={"/"}>WhiteBoard</Link>
        </p>
        {user._id && user.email && user.username ? (
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
        ) : (
          <p style={{ margin: 0 }}>
            <Link
              style={{
                color: "#fff",
              }}
              to={"/signin"}
            >
              Signin
            </Link>{" "}
            /{" "}
            <Link
              style={{
                color: "#fff",
              }}
              to={"/signup"}
            >
              Signup
            </Link>
          </p>
        )}
      </div>
      {/* <div
        style={{
          backgroundColor: darkMode ? "#333" : "rgb(119 119 119)",
          flexGrow: 1,
        }}
        className="flex justify-center items-center user-select-none cursor-pointer"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        {!darkMode ? <DarkSun /> : <LighSun />}
      </div> */}
    </div>
  );
};

export default Canvas;
