import { useRecoilState } from "recoil";
import { drawings as drwngs } from "../../../recoil/drawing";
import "./typeOptions.css";

const TypeOptions = () => {
  const [drawings, setDrawings] = useRecoilState(drwngs);
  const changeType = (type) => {
    setDrawings((obj) => {
      let updatedDrawings = obj;
      updatedDrawings = { ...obj, type };
      localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
      return updatedDrawings;
    });
  };
  return (
    <div className="type-options">
      <div className="head">Options</div>
      <div className="options-type">
        <div
          className="opt"
          onClick={() => changeType("brush")}
          style={{
            opacity: drawings.type === "brush" ? 1 : 0.6,
            cursor: "pointer",
          }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.5em"
            width="1.5em"
          >
            <path d="M15.825.12a.5.5 0 01.132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 01-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 01-3.078.132 3.659 3.659 0 01-.562-.135 1.382 1.382 0 01-.466-.247.714.714 0 01-.204-.288.622.622 0 01.004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 01.596.04zM4.705 11.912a1.23 1.23 0 00-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 01-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 00.126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 001.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04l.007-.005a.031.031 0 01-.007.004zm3.582-3.043l.002.001h-.002z" />
          </svg>
          <p>Brush</p>
        </div>
        <div
          className="opt"
          onClick={() => changeType("eraser")}
          style={{
            opacity: drawings.type === "eraser" ? 1 : 0.6,
            cursor: "pointer",
          }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.5em"
            width="1.5em"
          >
            <path d="M8.086 2.207a2 2 0 012.828 0l3.879 3.879a2 2 0 010 2.828l-5.5 5.5A2 2 0 017.879 15H5.12a2 2 0 01-1.414-.586l-2.5-2.5a2 2 0 010-2.828l6.879-6.879zm2.121.707a1 1 0 00-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 000-1.414l-3.879-3.879zM8.746 13.547L3.453 8.254 1.914 9.793a1 1 0 000 1.414l2.5 2.5a1 1 0 00.707.293H7.88a1 1 0 00.707-.293l.16-.16z" />
          </svg>
          <p>Eraser</p>
        </div>
      </div>
    </div>
  );
};
export default TypeOptions;
