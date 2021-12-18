import type { NextPage } from "next";
import Nav from "components/Nav";
import Signin from "components/Signin";

const SignUp: NextPage = () => {
  return (
    <div>
      <Nav />
      <Signin />
    </div>
  );
};

export default SignUp;
