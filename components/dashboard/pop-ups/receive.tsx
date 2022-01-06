import QrCode from "qrcode.react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import algo from "components/icons/algo";
import { pushNotification } from "redux/actions/notificationsAction";
import {useDispatch} from 'react-redux'

type Props = {
  setReceiveActive: (state: boolean) => void;
};

export default function QrCodeScan({ setReceiveActive }: Props) {
  const dispatch = useDispatch()
  const { currentWallet } = useSelector((state: RootState) => state.customer);
  const [amount, setAmount] = useState<number>(0);

  const handleExit = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains("pop-up")) {
      setReceiveActive(false);
    }
  };


  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentWallet.address);
    dispatch(pushNotification("info", "address copied to clipboard"));
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setAmount(Number(target.value));
  };

  return (
    <div
      onClick={handleExit}
      className="pop-up fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white w-[30rem] h-[30rem] rounded-3xl flex flex-col justify-around items-center">
        <h3>Receive</h3>

        <div className="w-[95%]">
          <p className="mb-2">Address</p>
          <div className="py-4 px-2 border-2 rounded-md flex items-center justify-between ">
            <p className="overflow-hidden text-sm truncate w-[90%]">
              {currentWallet.address}
            </p>

            <div onClick={handleCopyAddress} className="cursor-pointer rounded-md  border-2 border-black px-2 hover:bg-black hover:text-white transition-all">
              <FontAwesomeIcon icon={faCopy} />
            </div>
          </div>
        </div>

        <div className="w-[95%]">
          <p className="mb-2">Amount</p>
          <div className="border-2 border-sky-300 rounded-md flex h-14">
            <div className="w-[40%] bg-sky-100 mr-2 flex justify-around items-center">
              <p>balance</p>
              <p className="flex items-center gap-1">
                {algo({ width: 10, height: 10 })}
                {currentWallet.balance}
              </p>{" "}
            </div>
            <input
              className="border-none p-0 w-[70%] focus:ring-0"
              placeholder="0.0"
              onChange={handleAmount}
              type="number"
              name=""
              id=""
            />
          </div>
        </div>

        <QrCode
          size={150}
          value={`algorand://${currentWallet.address}?amount=${amount}`}
        />
      </div>
    </div>
  );
}
