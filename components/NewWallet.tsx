import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faAngleRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

export default function NewWallet() {
  const [status, setStatus] = useState<string>("initial");

  const handleCreateNewWallet = () => {
    setStatus("loading");
    axios
      .post("/api/wallet/new")
      .then(() => {
        Router.push("/dashboard");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <div
      onClick={handleCreateNewWallet}
      className={`flex items-center justify-between mx-auto w-[90%] h-[20%]  px-3 border-2 shadow-md rounded-md cursor-pointer hover:bg-blue-50 md:w-[70%] lg:w-[25%] lg:flex-col lg:h-[30%] lg:justify-around ${status ===
        "error" && "bg-red-400"} `}
    >
      <FontAwesomeIcon className="" icon={faWallet} size={"3x"} />
      <div className="text-center w-[50%]">
        <h4>New Wallet</h4>
        <p className="text-sm mt-2">Create a new randomly generated wallet</p>
      </div>
      <FontAwesomeIcon className="lg:hidden" icon={faAngleRight} />
      {status === "loading" && <FontAwesomeIcon icon={faCircle} />}
    </div>
  );
}
