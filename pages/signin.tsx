import Signin from "components/user/signin";
import Layout from "components/layout";
import { ReactElement } from "react";

const Page = () => {
  return <Signin />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
