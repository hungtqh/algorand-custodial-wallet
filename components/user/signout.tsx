import axios from "axios";
import Router from "next/router";

export default function Signout() {
  axios.get("/api/user/logout").then(() => {
    Router.push("/signin");
  });

  return <div>Sign out...</div>;
}
