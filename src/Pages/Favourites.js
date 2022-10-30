import React, { useState, useEffect, useContext } from "react";
import PaginatedImageList from "../Components/PaginatedImageList";
import { UserContext } from "../Contexts/UserContext";
import { FavouriteContext } from "../Contexts/ImageContext";
import { getFavouritesPage } from "../api/apis/favourite";

const Favourites = () => {
  const { user } = useContext(UserContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 30;

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const { favourites } = await getFavouritesPage(currentPage, user.userId);
    setFavourites(favourites);
    
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getFirstPage = async () => {
      const { favourites, pagination } = await getFavouritesPage(1, user.userId);
      setFavourites(favourites);
      setPageCount(Math.ceil(pagination.TotalCount / pageSize));
      console.log(favourites)
    };
    getFirstPage();
  }, []);

  return (
    <>
      <div className="d-flex mb-4 justify-content-between">
        <h1>Favourite images</h1>
        <button
          className="btn btn-danger"
          onClick={() => alert("To be implemented")}
        >
          Remove all
        </button>
      </div>
      <PaginatedImageList
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        images={favourites}
        setImages={setFavourites}
      />
    </>
  );
};

export default Favourites;
