import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>Home</h2>
      User:<pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Home;
