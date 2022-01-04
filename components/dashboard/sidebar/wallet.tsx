import { useDispatch, useSelector } from "react-redux";
import { setCurrentWallet } from "redux/actions/walletsAction";
import { RootState } from "redux/store";
import algo from "components/icons/algo";

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
          <span className="flex items-center gap-2">
            {algo({ width: 10, height: 10 })}
            {balance}
          </span>
        </div>
      </div>
    </div>
  );
}
