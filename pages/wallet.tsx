import type { NextPage } from "next";
import useUser from "lib/useUser";

const Wallet: NextPage = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  return <div>wallet</div>;
};

export default Wallet;
