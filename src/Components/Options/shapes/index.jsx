import "./shapes.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { drawings as drwngs } from "../../../recoil/drawing";
import { darkMode as dm } from "../../../recoil/darkMode";

const Shapes = () => {
    const darkMode = useRecoilValue(dm);
  const drawings = useRecoilValue(drwngs);
  const setDrawings = useSetRecoilState(drwngs);
  const changeFill = () => {
    let updatedDrawings = drawings;
    updatedDrawings = { ...drawings, fill: !drawings.fill };
    setDrawings(() => updatedDrawings);
    localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
  };
  const changeShape = (shape) => {
    let updatedDrawings = drawings;
    updatedDrawings = { ...drawings, shape: shape };
    setDrawings(() => updatedDrawings);
    localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
  };
  return (
    <div className="shapes">
      <div className="head">Shapes</div>
      <div className="opts">
        <div className="opt" onClick={() => changeShape("rectangle")}>
          <div
            className={"rectangle"}
            style={{
              border:
                drawings.shape == "rectangle"
                  ? darkMode
                    ? "solid 5px rgb(255, 251, 0)"
                    : "solid 5px red"
                  : darkMode
                  ? "solid 5px white"
                  : "solid 5px black",
              backgroundColor: drawings.fill
                ? drawings.shape == "rectangle"
                  ? darkMode
                    ? "rgb(255, 251, 0)"
                    : "red"
                  : darkMode
                  ? "white"
                  : "black"
                : null,
            }}
          ></div>
        </div>
        <div className="opt" onClick={() => changeShape("circle")}>
          <div
            className={`circle ${drawings.shape == "circle" ? "selected" : ""}`}
            style={{
              border:
                drawings.shape == "circle"
                  ? darkMode
                    ? "solid 5px rgb(255, 251, 0)"
                    : "solid 5px red"
                  : darkMode
                  ? "solid 5px white"
                  : "solid 5px black",
              backgroundColor: drawings.fill
                ? drawings.shape == "circle"
                  ? darkMode
                    ? "rgb(255, 251, 0)"
                    : "red"
                  : darkMode
                  ? "white"
                  : "black"
                : null,
            }}
          ></div>
        </div>
        <div className="opt" onClick={() => changeShape("triangle")}>
          {drawings.fill ? (
            <svg width="2em" height="2em" viewBox="0 0 512 512" version="1.1">
              <title>triangle-filled</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="drop"
                  fill={
                    !darkMode
                      ? drawings.shape == "triangle"
                        ? "red"
                        : "black"
                      : drawings.shape == "triangle"
                      ? "rgb(255, 251, 0)"
                      : "white"
                  }
                  transform="translate(32.000000, 42.666667)"
                >
                  <path
                    d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </svg>
          ) : (
            <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0001 5.94363L4.76627 18H19.2339L12.0001 5.94363ZM10.7138 4.20006C11.2964 3.22905 12.7037 3.22905 13.2863 4.20006L21.4032 17.7282C22.0031 18.728 21.2829 20 20.117 20H3.88318C2.71724 20 1.99706 18.728 2.59694 17.7282L10.7138 4.20006Z"
                fill={
                  !darkMode
                    ? drawings.shape == "triangle"
                      ? "red"
                      : "black"
                    : drawings.shape == "triangle"
                    ? "rgb(255, 251, 0)"
                    : "white"
                }
              />
            </svg>
          )}
        </div>
        <div className="opt" style={{marginTop:"2em"}}>
          <input
            className="fill-color"
            type="checkbox"
            checked={drawings.fill}
            onChange={() => changeFill()}
            id="fill"
          />
          <label htmlFor="fill" className="desc">Fill</label>
        </div>
      </div>
    </div>
  );
};

export default Shapes;
