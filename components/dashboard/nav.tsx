import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faWallet,
  faCopy,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import AlgoLogo from "components/icons/algo";
import { useDispatch } from "react-redux";

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

        <div className="w-9 h-9 bg-sky-500 rounded-full flex justify-center items-center">
          <AlgoLogo fill="white" height="1.3rem" />
        </div>
        <p className="ml-2 text-sky-500">Wallet</p>
      </div>

      <div className="bg-gray-100 rounded-md px-2 h-[80%] w-[50%] flex justify-between items-center">
        <div className="text-sm">
          <p className="text-sky-400">
            <FontAwesomeIcon icon={faWallet} /> Wallet #2
          </p>
          <p className="text-sky-500">
            ZRAAH4S4FEWNJO2J42DAXXO3K25FOEONGH5HYKCAX45CUC5WE6ROXQIOBA
          </p>
        </div>

        <div className="text-gray-400 flex gap-2">
          <FontAwesomeIcon icon={faCopy} />
          <FontAwesomeIcon icon={faQrcode} />
        </div>

        <div className="w-[0.1rem] h-[70%] bg-sky-500"></div>

        <div className=" w-[30%] flex justify-between">
          <p>Balance</p>
          <p>0</p>
        </div>
      </div>

      <button className="px-3 border-2 rounded-md">testnet</button>
    </div>
  );
}
