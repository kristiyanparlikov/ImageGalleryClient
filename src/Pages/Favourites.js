import React, { useState, useEffect, useContext } from "react";
import PaginatedImageList from "../Components/PaginatedImageList";
import { UserContext } from "../Contexts/UserContext";
import { getFavouritesPage } from "../api/apis/favourite";

const Favourites = () => {
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const { favourites } = await getFavouritesPage(currentPage, user.userId);
    setImages(favourites);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getFirstPage = async () => {
      const { favourites, pagination } = await getFavouritesPage(
        1,
        user.userId
      );
      setImages(favourites);
      setPageCount(Math.ceil(pagination.TotalCount / pagination.PageSize));
    };
    getFirstPage();
  }, [user.userId]);

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
        images={images}
        setImages={setImages}
      />
    </>
  );
};

export default Favourites;
