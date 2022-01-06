import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AlgoLogo from "components/icons/algo";
import { useDispatch } from "react-redux";
import Wallet from "./wallet";
import Link from "next/link";

export default function Nav() {
  const dispatch = useDispatch();

  const handleSideBarActive = () => {
    dispatch({ type: "TOGGLE_BURGER" });
  };

  return (
    <div className="flex items-center shadow-md  mx-auto justify-between h-[6vh] px-5">
      <div className="flex items-center">
        <FontAwesomeIcon
          onClick={handleSideBarActive}
          className="text-slate-500 mr-4 cursor-pointer"
          size={"2x"}
          icon={faBars}
        />

        <Link href="/dashboard">
          <div className="cursor-pointer flex items-center">
            <div className="w-9 h-9 bg-sky-500 rounded-full flex justify-center items-center">
              <AlgoLogo fill="white" height="1.3rem" />
            </div>
            <p className="ml-2 text-sky-500">Wallet</p>
          </div>
        </Link>
      </div>

      <Wallet styles="hidden md:flex" />

      <button className="px-3 border-2 rounded-md">testnet</button>
    </div>
  );
}
