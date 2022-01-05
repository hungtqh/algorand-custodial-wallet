import useUser from "lib/useUser";
import { useDispatch } from "react-redux";
import React, { ReactElement, useEffect } from "react";
import { loadWallets } from "redux/actions/walletsAction";
import Layout from "components/dashboard/layout";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import BackButton from "components/dashboard/action-boxes/backButton";
import SignOut from "components/dashboard/settings/signout";

const Page = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  const { sideActive, isWalletsLoading } = useSelector((state: RootState) => {
    return {
      sideActive: state.navbar.sideActive,
      isWalletsLoading: state.customer.isWalletsLoading,
    };
  });

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
      } transition-[margin-left] duration-500 relative`}
    >
      <BackButton />

      <div className="h-[10vh] w-full bg-gray-200 flex items-center justify-center">
        <h4>Settings</h4>
      </div>

      <div className="flex justify-center items-start mt-[10rem] h-[90vh]"></div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
