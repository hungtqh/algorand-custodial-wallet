import { NextPage } from "next";
import useUser from "lib/useUser";
import { useDispatch } from "react-redux";
import React, { ReactElement, useEffect } from "react";
import { loadWallets } from "redux/actions/walletsAction";
import Layout from "components/dashboard/layout";

const Page = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("here");
    console.log("user:", user);

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

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
