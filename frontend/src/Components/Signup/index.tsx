import SignInRight from "./SignUpRight";
import SignInLeft from "./SignUpLeft";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/user";
import { useCookies } from "react-cookie";

const Signin = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const [{ token }] = useCookies(["token"]);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [user, []]);
  return (
    <div className="w-screen h-screen grid grid-rows-1 lg:grid-cols-2 grid-cols-1">
      <SignInLeft />
      <SignInRight />
    </div>
  );
};
export default Signin;
