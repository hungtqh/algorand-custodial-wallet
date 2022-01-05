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
      className={`absolute z-20 overflow-hidden top-[6vh]  ${
        sideActive ? "left-0" : "-left-[20rem] w-0"
      } bg-white w-full md:w-[15rem] h-[94vh] shadow-2xl flex flex-col items-center justify-between transition-all duration-500`}
    >
      <div className="h-[50%] w-full overflow-y-scroll">
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

      <div className="h-[45%] w-full">
        <AddWallet />

        <Settings />
      </div>
    </div>
  );
}
