import useUser from "lib/useUser";
import AddWallet from "components/dashboard/action-boxes/addWallet";
import { ReactElement } from "react";
import Layout from "components/dashboard/layout";

const Page = () => {
  const { user } = useUser({ redirectTo: "/signin" });

  return (
    <div className="h-[90%] w-[90%] flex gap-4 flex-wrap">
      <AddWallet />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
