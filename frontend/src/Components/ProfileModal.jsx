import { useRecoilValue } from "recoil";
import { darkMode as darkModeAtom } from "../recoil/darkMode";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import axios from "axios";

const ProfileModal = () => {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useername, setUseername] = useState("");
  const navigate = useNavigate();
  const darkMode = useRecoilValue(darkModeAtom);
  // eslint-disable-next-line no-unused-vars
  const [{ token }, setCookie] = useCookies(["token"]);
  const handleSignOut = () => {
    localStorage.clear();
    setCookie("token", "");
    navigate("/signin");
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!token) {
        navigate("/signin");
        return;
      }
      const response1 = await axios.get(`${apiUrl}/api/_v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response1.data);
      if (response1.data.username) {
        setUseername(response1.data.username);
      }
      const response = await axios.get(`${apiUrl}/api/_v1/me/drawings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.data) setDrawings(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
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
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {useername ? useername : "Profile"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{
            loading ? "Loading..." : drawings.map((drawing) => (
              <div key={drawing.id}>
                <Link
                  to={`/${drawing.id}`}
                  className="btn btn-primary m-2"
                >
                  {"test drawing"}
                </Link>
              </div>
            ))
          }</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              onClick={() => handleSignOut()}
              className="btn btn-danger"
            >
              <p>Sign Out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
