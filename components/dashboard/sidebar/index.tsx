import SideWallet from "./wallet";
import SideAddWallet from "./addWallet";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function Sidebar() {
  const { wallets } = useSelector((state: RootState) => state.customer);

  return (
    <div className="absolute overflow-hidden top-[10vh] left-0 w-[15rem] h-[90vh] shadow-2xl flex flex-col justify-between">
      <div>
        {wallets.map((wallet, i: number) => {
          const walletName = `wallet ${i + 1}`;
          return <SideWallet walletName={walletName} balance={0} />;
        })}
      </div>

      <div className="h-[40%]">
        <SideAddWallet />
      </div>
    </div>
  );
}
