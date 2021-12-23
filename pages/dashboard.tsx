import { NextPage } from "next";
import useUser from "lib/useUser";
import { useDispatch } from "react-redux";
import React, { ReactElement, useEffect } from "react";
import { loadWallets } from "redux/actions/walletsAction";
import Layout from "components/dashboard/layout";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Page = () => {
  const { user } = useUser({ redirectTo: "/signin" });
  const { sideActive } = useSelector((state: RootState) => state.navbar);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("here");
    console.log("user:", user);

    if (user?.isLoggedIn) {
      dispatch(loadWallets());
    }
  }, [user]);

  return (
    <div
      className={`h-[94vh] w-[100%] ${
        sideActive ? "ml-[15rem]" : ""
      } bg-red-400 flex flex-col justify-center items-center transition-[margin-left] duration-500`}
    >
      <p>wallet transactions</p>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
