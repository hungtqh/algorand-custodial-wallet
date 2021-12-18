import type { NextPage } from "next";
import Nav from "components/Nav";
import Welcome from "components/Welcome";
import useUser from "lib/useUser";

const Home: NextPage = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <div>
      <Welcome />
    </div>
  );
};

export default Home;
