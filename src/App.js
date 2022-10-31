import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";
import Gallery from "./Pages/Gallery";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Favourites from "./Pages/Favourites";
import UploadImage from "./Pages/UploadImage";
import PrivateRoute from "./Components/PrivateRoute";
import Carousel from "./Pages/Carousel";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery/:id" element={<Gallery />} />
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
      </UserContext.Provider>
    </>
  );
}

export default App;
