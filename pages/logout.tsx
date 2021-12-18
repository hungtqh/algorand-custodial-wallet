import type { NextPage } from "next";
import Router from "next/router";
import axios from "axios";

const Logout: NextPage = () => {
  axios.get("/api/user/logout").then(() => {
    Router.push("/");
  });

  return <div></div>;
};

export default Logout;
