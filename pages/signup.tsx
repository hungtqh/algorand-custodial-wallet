import Signup from "components/user/signup";
import { ReactElement } from "react";
import Layout from "components/layout";

const Page = () => {
  return <Signup />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
