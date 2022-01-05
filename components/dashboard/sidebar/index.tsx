import Wallet from "./wallet";
import AddWallet from "./addWallet";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Settings from "./settings";

export default function Sidebar() {
  const { wallets, sideActive } = useSelector((state: RootState) => {
    return {
      wallets: state.customer.wallets,
      sideActive: state.navbar.sideActive,
    };
  });

  return (
    <div
      className={`absolute z-30 overflow-hidden top-[6vh]  ${
        sideActive ? "left-0" : "-left-[20rem]"
      } bg-white w-[15rem] h-[94vh] shadow-2xl flex flex-col justify-between transition-[left] duration-500`}
    >
      <div className="h-[50%] overflow-y-scroll">
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

      <div className="h-[45%]">
        <AddWallet />

        <Settings />
      </div>
    </div>
  );
}
