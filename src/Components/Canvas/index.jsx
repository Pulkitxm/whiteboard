import "./style.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";
import { useEffect, useRef, useState } from "react";
import { drawings as drwng } from "../../recoil/drawing";

const Canvas = () => {
  // eslint-disable-next-line no-unused-vars
  const [currElementData, setCurrElementData] = useState([]);
  const canvasRef = useRef();
  const contextRef = useRef();
  const expand = useRecoilValue(exp);
  const { width } = useWindow();
  const [drawings, setDrawings] = useRecoilState(drwng);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = drawings.color;
      contextRef.current.lineWidth = drawings.size * 5;
    }
  }, [drawings, canvasRef]);
  useEffect(() => {
    const storedDrawings = JSON.parse(localStorage.getItem("drawings"));
    if (storedDrawings && storedDrawings.data) {
      const points = storedDrawings.data;
      points.forEach((segment) => {
        console.log(segment);
        contextRef.current.beginPath();
        contextRef.current.strokeStyle = segment.color;
        contextRef.current.lineWidth = segment.size * 5;
        contextRef.current.moveTo(segment.points[0].fromX, segment.points[0].fromY);
        for (let i = 0; i < segment.points.length; i++) {
          contextRef.current.lineTo(segment.points[i].x, segment.points[i].y);
          contextRef.current.stroke();
        }
        contextRef.current.closePath();
      });
    }
  }, [contextRef]);

  const appendLine = (positions) => {
    setCurrElementData((prev) => {
      const obj = {
        x: positions.x,
        y: positions.y,
        fromX: positions.fromX,
        fromY: positions.fromY,
      };
      const updated = prev.concat(obj);
      return updated;
    });
  };
  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setCurrentPosition({ x: offsetX, y: offsetY });
  };
  const onMouseUp = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setDrawings((prevDrawings) => {
      const updatedDrawings = { ...prevDrawings };
      if (!updatedDrawings.data || updatedDrawings.data.length === 0)
        updatedDrawings.data = [
          {
            points: currElementData,
            color: updatedDrawings.color,
            size: updatedDrawings.size,
          },
        ];
      else
        updatedDrawings.data = updatedDrawings.data.concat({
          points: currElementData,
          color: updatedDrawings.color,
          size: updatedDrawings.size,
        });
      localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
      return updatedDrawings;
    });
    setCurrElementData([]);
  };
  
  const draw = ({ fromX, fromY, x, y }) => {
    if (!isDrawing) {
      return;
    }
    const positions = { fromX, fromY, x, y };
    appendLine(positions);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const styles =
    width < 700
      ? {
          height: expand ? "80%" : "90%",
          width: "100%",
          transition: "height 0.5s",
        }
      : {
          width: width > 1000 ? "90%" : expand ? "80%" : "90%",
          transition: "width 0.5s",
        };

  return (
    <canvas
      className="canvas"
      style={styles}
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={(e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        draw({
          fromX: currentPosition.x,
          fromY: currentPosition.y,
          x: offsetX,
          y: offsetY,
        });
      }}
    />
  );
};

export default Canvas;