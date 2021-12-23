import { NextPage } from "next";
import useUser from "lib/useUser";
import SideBar from "components/sidebar/SideBar";

const Wallet: NextPage = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  return (
    <div className="h-[90%] w-[100%] flex flex-col justify-center items-center">
      <p>wallet transactions</p>
    </div>
  );
};

export default Wallet;
