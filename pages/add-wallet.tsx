import { useEffect } from "react";
import useUser from "lib/useUser";
import AddWallet from "components/dashboard/action-boxes/addWallet";
import { ReactElement } from "react";
import Layout from "components/dashboard/layout";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useDispatch } from "react-redux";
import { loadWallets } from "redux/actions/walletsAction";

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
      } transition-[margin-left] duration-500 flex gap-1 flex-wrap justify-center items-center`}
    >
      <AddWallet />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
