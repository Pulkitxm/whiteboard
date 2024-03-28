import React from "react";
import { Link } from "react-router-dom";

import Form from "./Form";

const SigninRight = () => {
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Create an account</h1>
      <h1 className="opacity-40 text-xl">
        Create a new account?&nbsp;
        <Link to={"/signup"} className="inline underline">Sign Up</Link>
      </h1>
      <Form />
    </div>
  );
};
export default SigninRight;