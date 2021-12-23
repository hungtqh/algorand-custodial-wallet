import type { NextPage } from "next";
import useUser from "lib/useUser";
import NewWallet from "components/NewWallet";

const Wallet: NextPage = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  return (
    <div className="h-[90%] w-[90%] flex gap-4 flex-wrap">
      <NewWallet />
    </div>
  );
};

export default Wallet;
