import "./style.css";

import Canvas from "../Canvas";
import Options from "../Options";

const WhiteBoard = () => {
  return (
    <div className="whiteBoard">
      <Options />
      <Canvas />
    </div>
  );
};

export default WhiteBoard;