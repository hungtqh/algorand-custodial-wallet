import { useEffect, useState } from "react";
import axios from "axios";
import SideWallet from "./Wallet";
import SideAddWallet from "./AddWallet";

export default function SideBar() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    axios.get("/api/wallet").then((res) => {
      console.log(res.data);
      setWallets(res.data);
    });
  }, []);

  return (
    <div className="absolute overflow-hidden top-[10vh] left-0 w-[15rem] h-[90vh] shadow-2xl flex flex-col justify-between">
      <div>
        {wallets.map((wallet, i) => {
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
