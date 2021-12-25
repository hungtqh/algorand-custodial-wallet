import QrCode from "qrcode.react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

type Props = {
  setQrCodeActive: (state: boolean) => void;
};

export default function QrCodeScan({ setQrCodeActive }: Props) {
  const { currentWallet } = useSelector((state: RootState) => state.customer);

  const handleExit = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains("pop-up")) {
      setQrCodeActive(false);
    }
  };

  return (
    <div
      onClick={handleExit}
      className="pop-up fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white w-[25rem] h-[25rem] rounded-md flex flex-col justify-around items-center">
        <h2>Wallet address</h2>
        {currentWallet && <QrCode size={250} value={currentWallet?.address} />}
      </div>
    </div>
  );
}
