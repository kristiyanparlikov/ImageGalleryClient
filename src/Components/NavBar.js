import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <Link className="nav-item nav-link" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link" to="/gallery/1">
              Gallery
            </Link>
            <Link className="nav-item nav-link" to="/carousel/1">
              Carousel
            </Link>

            <Link className="nav-item nav-link" to="/favourites">
              Favourites
            </Link>
          </ul>
          {!user ? (
            <ul className="navbar-nav">
              <Link className="nav-item nav-link" to="/signin">
                Sign In
              </Link>
              <Link className="nav-item nav-link" to="/signup">
                Sign Up
              </Link>
            </ul>
          ) : (
            <div className="d-flex">
              <div className="align-self-center me-sm-2 rounded">
                {user.email}
              </div>

              <button
                className="btn btn-primary my-2 my-sm-0 rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
