import React, { useState } from "react";

import { apiUrl } from "../../config";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/user";

const Form = () => {
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      const username = (e.target as HTMLFormElement).username.value;
      const password = (e.target as HTMLFormElement).password.value;
      const data = { username, password };

      if (username && password) {
        const res = await axios.post(`${apiUrl}/api/_v1/signin`, data, {
          withCredentials: true,
        });
        const {email, username} = res?.data;
        if (email && username) {
          setUser({ email, username });
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      alert("Invalid username or password");
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
        className="outline-none border-b-2 border-gray-400 m-1 text-lg p-2 px-3 rounded-sm text-gray-950"
      />

      <label htmlFor="password" className="m-1 mt-5 font-bold text-lg">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        className="outline-none border-b-2 border-gray-400 m-1 text-lg p-2 px-3 rounded-sm text-gray-950"
      />

      <button
        type="submit"
        className="m-5 w-full bg-gray-900 text-white h-14 rounded  mx-auto"
      >
        {loading ? (
          <div className="m-auto w-7 h-7 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default Form;
