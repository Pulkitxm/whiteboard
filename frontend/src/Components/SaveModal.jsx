import { useRecoilValue } from "recoil";
import { darkMode as darkModeAtom } from "../recoil/darkMode";
import { drawings as drawingsAtom } from "../recoil/drawing";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import { useCookies } from "react-cookie";

const SaveModal = () => {
  const closeRef = useRef();
  const [loading, setLoading] = useState(false);
  const darkMode = useRecoilValue(darkModeAtom);
  const { id } = useParams();
  const [url, seturl] = useState("");
  const drawings = useRecoilValue(drawingsAtom);
  const [token] = useCookies(["token"]);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas === null) return "";
    seturl(canvas.toDataURL("image/png"));
  });

  const handleSave = async () => {
    setLoading(() => true);

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
      setLoading(() => false);
      closeRef.current.click();
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
      setLoading(() => false);
      closeRef.current.click();
    }
  };
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{
            backgroundColor: darkMode ? "#333" : "rgb(119 119 119)",
          }}
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Save Progress
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body bg-white">
            <img src={url} alt="" className="h-full w-full" />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
              style={{
                width: "70px",
              }}
            >
              {loading ? (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : id ? (
                "Update"
              ) : (
                "Save"
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={closeRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
