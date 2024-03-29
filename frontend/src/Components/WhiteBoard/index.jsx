import Canvas from "../Canvas";
import Options from "../Options";
import useWindow from "../../hooks/useWindow";
import SaveModal from "../SaveModal";

const WhiteBoard = () => {
  const { width } = useWindow();
  return (
    <>
      <SaveModal />
      <div
        className="whiteBoard"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: width < 700 ? "column" : "row",
        }}
      >
        {width < 700 ? (
          <>
            <Canvas />
            <Options />
          </>
        ) : (
          <>
            <Options />
            <Canvas />
          </>
        )}
      </div>
    </>
  );
};

export default WhiteBoard;
