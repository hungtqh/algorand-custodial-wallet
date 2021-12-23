import Layout from "components/layout";
import { ReactElement } from "react";
import Signout from "components/user/signout";

const Page = () => {
  return <Signout />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
