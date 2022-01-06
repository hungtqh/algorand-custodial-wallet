import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";

export default function Signout() {

  useEffect(()=> {

    axios.get("/api/user/logout").then(() => {
      Router.push("/signin");
    });


  },[])



  return <div>Sign out...</div>;
}
