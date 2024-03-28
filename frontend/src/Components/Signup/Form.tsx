import React, { useState } from "react";

import { apiUrl } from "../../config";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const username = e.target.username.value;
      const password = e.target.password.value;
      const email = e.target.email.value;
      const data = { username, password, email };
      if (username && password && email) {
        const res = await axios.post(`${apiUrl}/api/_v1/signup`, data, {
          withCredentials: true,
        });
        navigate("/signin");
      } else {
        setLoading(false);
      }
    } catch (e) {
      alert("Try different username");
      setLoading(false);
    }
  };
  return (
    <form
    className="w-3/5 flex flex-col justify-center"
    onSubmit={handleSubmit}
  >
    <label htmlFor="username" className="m-1 mt-5 font-bold text-lg">
      Username
    </label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="Enter your username"
      className="outline-none border-b-2 border-gray-400 m-1 text-lg p-3 text-gray-950"
    />

    <label htmlFor="email" className="m-1 mt-5 font-bold text-lg">
      Email
    </label>
    <input
      type="text"
      id="email"
      name="email"
      placeholder="Enter your email"
      className="outline-none border-b-2 border-gray-400 m-1 text-lg p-3 text-gray-950"
    />

    <label htmlFor="password" className="m-1 mt-5 font-bold text-lg">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter your password"
      className="outline-none border-b-2 border-gray-400 m-1 text-lg p-3 text-gray-950"
    />

    <button
      type="submit"
      className="m-5 w-full bg-gray-900 text-white h-14 rounded  mx-auto"
    >
      {loading ? (
        <div className="m-auto w-7 h-7 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      ) : (
        "Sign Up"
      )}
    </button>
  </form>
);
};

export default Form;