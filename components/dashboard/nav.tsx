import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faWallet,
  faCopy,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import AlgoLogo from "components/icons/algo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import QrCodeScan from "./pop-ups/qrcodeScan";
import { useState } from "react";

export default function Nav() {
  const dispatch = useDispatch();
  const [qrCodeActive, setQrCodeActive] = useState(false);
  const { currentWallet } = useSelector((state: RootState) => state.customer);

  const handleSideBarActive = () => {
    dispatch({ type: "TOGGLE_BURGER" });
  };

  const handleCopyAddress = () => {
    if (currentWallet) {
      navigator.clipboard.writeText(currentWallet.address);
    }
  };

  const handleQrCode = () => {
    setQrCodeActive(true);
  };

  return (
    <div className="flex items-center shadow-md  mx-auto justify-between h-[6vh] px-5">
      {qrCodeActive ? <QrCodeScan setQrCodeActive={setQrCodeActive} /> : ""}
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

      <div className="bg-gray-100 rounded-md px-2 h-[80%] hidden md:flex md:w-[65%] lg:w-[60%] justify-between items-center">
        <div className="text-sm">
          <p className="text-sky-400">
            <FontAwesomeIcon icon={faWallet} /> {currentWallet?.name}
          </p>
          <p className="text-sky-500 w-[30vw] truncate">
            {currentWallet?.address}
          </p>
        </div>

        <div className="text-gray-400 flex gap-2 ">
          <FontAwesomeIcon
            className="cursor-pointer hover:text-gray-900"
            onClick={handleCopyAddress}
            icon={faCopy}
          />
          <FontAwesomeIcon
            onClick={handleQrCode}
            className="cursor-pointer hover:text-gray-900"
            icon={faQrcode}
          />
          <div className="w-[0.12rem]  bg-sky-500"></div>
        </div>

        <div className=" w-[30%] flex justify-between">
          <p>Balance</p>
          <p>{currentWallet?.balance}</p>
        </div>
      </div>

      <button className="px-3 border-2 rounded-md">testnet</button>
    </div>
  );
}
