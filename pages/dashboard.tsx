import { NextPage } from "next";
import useUser from "lib/useUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadWallets } from "redux/actions/walletsAction";

const Wallet: NextPage = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isLoggedIn) {
      dispatch(loadWallets());
    }
  }, [user]);

  return (
    <div className="h-[90%] w-[100%] flex flex-col justify-center items-center">
      <p>wallet transactions</p>
    </div>
  );
};

export default Wallet;
