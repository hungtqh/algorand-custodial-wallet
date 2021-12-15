import type { NextPage } from "next";
import Nav from "components/Nav";
import Signup from "components/Signup";

const SignUp: NextPage = () => {
  return (
    <div>
      <Nav />
      <Signup />
    </div>
  );
};

export default SignUp;
