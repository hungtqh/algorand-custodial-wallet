import Layout from "components/layout";
import { ReactElement, useEffect } from "react";
import Signout from "components/user/signout";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_LOGOUT" });
  }, []);

  return <Signout />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
