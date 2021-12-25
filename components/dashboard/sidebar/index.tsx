import Wallet from "./wallet";
import SideAddWallet from "./addWallet";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function Sidebar() {
  const { wallets, sideActive } = useSelector((state: RootState) => {
    return {
      wallets: state.customer.wallets,
      sideActive: state.navbar.sideActive,
    };
  });

  return (
    <div
      className={`absolute overflow-hidden top-[6vh]  ${
        sideActive ? "left-0" : "-left-[20rem]"
      } w-[15rem] h-[94vh] shadow-2xl flex flex-col justify-between transition-[left] duration-500`}
    >
      <div>
        {wallets.map((wallet: any, i: number) => {
          const walletName = `wallet ${i + 1}`;
          return (
            <Wallet
              key={wallet.id}
              id={wallet.id}
              walletName={wallet.name}
              balance={wallet.balance}
            />
          );
        })}
      </div>

      <div className="h-[40%]">
        <SideAddWallet />
      </div>
    </div>
  );
}
