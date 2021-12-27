import { NextPage } from "next";
import useUser from "lib/useUser";
import { useDispatch } from "react-redux";
import React, { ReactElement, useEffect } from "react";
import { loadWallets } from "redux/actions/walletsAction";
import Layout from "components/dashboard/layout";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Exchange from "components/dashboard/exchange";
import Transactions from "components/dashboard/transactions";

const Page = () => {
  const { user } = useUser({ redirectTo: "/signin" });
  const { sideActive } = useSelector((state: RootState) => state.navbar);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isLoggedIn) {
      dispatch(loadWallets());
    }
  }, [user]);

  return (
    <div
      className={`h-[94vh] w-[100%] ${
        sideActive ? "ml-[15rem]" : ""
      } flex flex-col  transition-[margin-left] duration-500`}
    >
      <Exchange />
      <Transactions />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
