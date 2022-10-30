import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { FavouriteContext } from "../Contexts/ImageContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);
  return (
    <>
      <h2>Home</h2>
      User:<pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Home;
