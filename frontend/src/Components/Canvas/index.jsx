import "./style.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { expand as exp } from "../../recoil/options";
import useWindow from "../../hooks/useWindow";
import { useEffect, useRef, useState } from "react";
import { drawings as drwng } from "../../recoil/drawing";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config";
import { useCookies } from "react-cookie";

const Canvas = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ token }] = useCookies(["token"]);
  const [undoItems, setUndoItems] = useState([]);
  const [currElementData, setCurrElementData] = useState([]);
  const canvasRef = useRef();
  const contextRef = useRef();
  const expand = useRecoilValue(exp);
  const { width } = useWindow();
  const [drawings, setDrawings] = useRecoilState(drwng);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (id && token) {
      try {
        axios
          .get(`${apiUrl}/api/_v1/me/drawings/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDrawings((prev) => {
              const updated = { ...prev };
              updated.data = res.data.drawing;
              console.log(updated.data);
              redrawCanvas(updated.data);
              return updated;
            });
          });
      } catch (err) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const drawSegment = (segment) => {
    const { points, color, size } = segment;
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = size * 5;
    contextRef.current.beginPath();
    if (!points.length || !points[0].fromX || !points[0].fromY) return;
    contextRef.current.moveTo(points[0].fromX, points[0].fromY);
    for (let i = 1; i < points.length; i++) {
      contextRef.current.lineWidth = points[i].size * 5;
      contextRef.current.lineTo(points[i].x, points[i].y);
    }
    contextRef.current.stroke();
    contextRef.current.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = drawings.color;
      contextRef.current.lineWidth = drawings.size * 5;
    }
  }, [drawings, canvasRef]);
  const handleSave = async () => {
    const { data } = drawings;
    if (id) {
      const res = await axios.put(
        `${apiUrl}/api/_v1/me/drawings/${id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        }
      );
      console.log(res.data);
    } else {
      const res = await axios.post(
        `${apiUrl}/api/_v1/me/drawings`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        }
      );
      // eslint-disable-next-line no-unsafe-optional-chaining
      const id = res.data?.data?.id;
      if (id) {
        navigate(`/${id}`);
      }
    }
  };
  useEffect(() => {
    const storedDrawings = JSON.parse(localStorage.getItem("drawings"));
    if (storedDrawings && storedDrawings.data) {
      const points = storedDrawings.data;
      if (!points.length) return;
      points.forEach((segment) => {
        drawSegment(segment);
      });
    }
  }, []);

  const handleUndo = () => {
    setDrawings((prev) => {
      if (!prev.data || prev.data.length === 0) return prev;
      const updated = { ...prev };
      setUndoItems((prevUndo) => {
        let updatedUndo = [...prevUndo];
        const data = prev.data;
        console.log(data);
        if (data[data.length - 1])
          updatedUndo = updatedUndo.concat(data[data.length - 1]);
        return updatedUndo;
      });
      updated.data = updated.data.slice(0, updated.data.length - 1)
        ? updated.data.slice(0, updated.data.length - 1)
        : [];
      localStorage.setItem("drawings", JSON.stringify(updated));
      redrawCanvas(updated.data);
      return updated;
    });
  };

  const handleRedo = () => {
    setDrawings((prev) => {
      const updated = { ...prev };
      if (!undoItems.length) return updated;

      if (undoItems[undoItems.length - 1])
        updated.data = updated.data.concat(undoItems[undoItems.length - 1]);

      setUndoItems((prev) => {
        let updatedUndo = [...prev];
        updatedUndo = updatedUndo.slice(0, updatedUndo.length - 1);
        return updatedUndo ? updatedUndo : [];
      });

      localStorage.setItem("drawings", JSON.stringify(updated));
      redrawCanvas(updated.data);

      return updated;
    });
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        handleUndo();
      } else if (e.ctrlKey && e.key === "y") {
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undoItems]);

  const redrawCanvas = (data) => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    data.forEach((segment) => {
      drawSegment(segment);
    });
  };

  const appendLine = (positions) => {
    setCurrElementData((prev) => {
      const obj = {
        x: positions.x,
        y: positions.y,
        fromX: positions.fromX,
        fromY: positions.fromY,
        size: drawings.size,
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
