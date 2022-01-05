import { pushNotification } from "redux/actions/notificationsAction";
import algo from "components/icons/algo";
import { RootState } from "redux/store";
import QrCodeScan from "../pop-ups/qrcodeScan";
import { faWallet, faCopy, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  styles?: string;
};

export default function Wallet({ styles }: Props) {
  const dispatch = useDispatch();
  const [qrCodeActive, setQrCodeActive] = useState(false);
  const { currentWallet } = useSelector((state: RootState) => state.customer);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentWallet.address);
    dispatch(pushNotification("info", "address copied to clipboard"));
  };

  const handleQrCode = () => {
    setQrCodeActive(true);
  };

  const currentWalletLoaded = Object.keys(currentWallet).length > 0;

  return currentWalletLoaded ? (
    <div
      className={`bg-gray-100 rounded-md px-2 h-[80%] flex md:w-[65%] lg:w-[60%] justify-between items-center ${styles ||
        ""}`}
    >
      {qrCodeActive ? <QrCodeScan setQrCodeActive={setQrCodeActive} /> : ""}

      <div className="text-sm">
        <p className="text-sky-400">
          <FontAwesomeIcon icon={faWallet} /> {currentWallet.name}
        </p>
        <p className="text-sky-500 w-[30vw] truncate">
          {currentWallet.address}
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
        <p className="flex items-center gap-2">
          <span>{algo({ width: 10, height: 10 })}</span>
          <span>{currentWallet.balance}</span>
        </p>
      </div>
    </div>
  ) : null;
}
