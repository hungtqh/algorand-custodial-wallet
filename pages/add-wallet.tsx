import useUser from "lib/useUser";
import AddWallet from "components/dashboard/action-boxes/addWallet";
import { ReactElement } from "react";
import Layout from "components/dashboard/layout";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Page = () => {
  const { user } = useUser({ redirectTo: "/signin" });
  const { sideActive } = useSelector((state: RootState) => state.navbar);

  return (
    <div
      className={`h-[94vh] w-[100%] ${
        sideActive ? "ml-[15rem]" : ""
      } transition-[margin-left] duration-500 flex gap-1 flex-wrap justify-center items-center`}
    >
      <AddWallet />
      <AddWallet />
      <AddWallet />
      <AddWallet />
      <AddWallet />
      <AddWallet />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
