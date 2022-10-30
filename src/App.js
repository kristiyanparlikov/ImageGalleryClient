import Gallery from "./Pages/Gallery";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Favourites from "./Pages/Favourites";
import UploadImage from "./Pages/UploadImage";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";
import { ImageContext, FavouriteContext } from "./Contexts/ImageContext";
import { getFavourites } from "./api/apis/favourite";
import React, { useState, useMemo, useEffect } from "react";
import PrivateRoute from "./Components/PrivateRoute";
import Carousel from "./Pages/Carousel";

function App() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const imagesValue = useMemo(
    () => ({ images, setImages }),
    [images, setImages]
  );
  const favouritesValue = useMemo(
    () => ({ favourites, setFavourites }),
    [favourites, setFavourites]
  );

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={userValue}>
        <ImageContext.Provider value={imagesValue}>
          <FavouriteContext.Provider value={favouritesValue}>
            <NavBar />
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/carousel/:id" element={<Carousel />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/favourites"
                  element={
                    <PrivateRoute>
                      <Favourites />
                    </PrivateRoute>
                  }
                />
                <Route path="/uploadImage" element={<UploadImage />} />
              </Routes>
            </div>
          </FavouriteContext.Provider>
        </ImageContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
