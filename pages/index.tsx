import Welcome from "components/welcome";
import { ReactElement } from "react";
import Layout from "components/layout";

const HomePage = () => {
  return <Welcome />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
