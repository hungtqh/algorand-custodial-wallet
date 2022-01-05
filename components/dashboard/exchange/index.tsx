import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faSync } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Send from "../pop-ups/send";
import Receive from "../pop-ups/receive";
import WalletSetting from "../pop-ups/walletSetting";
import { useDispatch, useSelector } from "react-redux";
import { loadWallets } from "redux/actions/walletsAction";
import { RootState } from "redux/store";
import Wallet from "components/dashboard/nav/wallet";

export default function Exchange() {
  const [sendActive, setSendActive] = useState(false);
  const [receiveActive, setReceiveActive] = useState(false);
  const { currentWallet } = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();

  const syncTransactions = () => {
    dispatch(loadWallets(false));
  };

  const currentWalletLoaded = Object.keys(currentWallet).length > 0;

  return currentWalletLoaded ? (
    <div>
      {sendActive && <Send setSendActive={setSendActive} />}
      {receiveActive && <Receive setReceiveActive={setReceiveActive} />}
      <div className=" w-full h-[30vh] md:h-[12vh] flex flex-col md:flex-row items-center justify-around mb-2">
        <Wallet styles="w-[90%] my-4 md:hidden" />
        <div className="relative">
          <button className="cursor-pointer peer  bg-gray-100 w-6 h-6 rounded-full hover:bg-gray-800 hover:text-white">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <WalletSetting />
        </div>
        <div className="flex items-center gap-2 ">
          <h3>Transactions</h3>
          <FontAwesomeIcon
            onClick={syncTransactions}
            className="cursor-pointer"
            icon={faSync}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSendActive(true);
            }}
            className="bg-blue-600 text-white py-3 w-40 rounded-md"
          >
            Send
          </button>

          <button
            onClick={() => {
              setReceiveActive(true);
            }}
            className="bg-gray-100 text-blue-600 py-3  w-40 rounded-md"
          >
            Receive
          </button>
        </div>
      </div>

      <hr />
    </div>
  ) : null;
}
