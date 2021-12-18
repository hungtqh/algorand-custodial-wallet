import type { NextPage } from "next";
import Nav from "components/Nav";
import Welcome from "components/Welcome";
import useUser from "lib/useUser";

const Home: NextPage = () => {
  const { user } = useUser();

  console.log(user);

  return <Welcome />;
};

export default Home;
