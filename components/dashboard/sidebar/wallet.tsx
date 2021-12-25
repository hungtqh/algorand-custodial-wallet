import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWallet } from "redux/actions/walletsAction";
import { RootState } from "redux/store";

type SideWalletProps = {
  walletName: string;
  balance: number;
  id: string;
};

export default function Wallet({ walletName, balance, id }: SideWalletProps) {
  const dispatch = useDispatch();

  const { currentWallet } = useSelector((state: RootState) => state.customer);

  const isCurrent = currentWallet.id === id;

  const handleSetCurrent = () => {
    dispatch(setCurrentWallet(id));
  };

  return (
    <div
      onClick={handleSetCurrent}
      className={`group h-[4rem] hover:bg-sky-100 hover:text-sky-700 flex items-center justify-between cursor-pointer ${
        isCurrent ? "bg-sky-100 text-sky-700" : ""
      }`}
    >
      <div className="flex items-center ml-2">
        <div
          className={`w-12 h-12 border-2 group-hover:border-sky-700 rounded-full flex items-center justify-center ${
            isCurrent ? "border-sky-700" : ""
          }`}
        >
          {walletName[0] + " " + walletName[walletName.length - 1]}
        </div>

        <div className="ml-2">
          <h4>{walletName}</h4>
          <span>{balance}$</span>
        </div>
      </div>

      <div className="text-gray-400 mr-2 w-5 h-5 rounded-full hover:bg-red-400 flex items-center justify-center hover:text-white">
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
}
