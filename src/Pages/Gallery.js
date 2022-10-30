import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PaginatedImageList from "../Components/PaginatedImageList";
import { UserContext } from "../Contexts/UserContext";
import { getImagesPage } from "../api/apis/image";

const Gallery = () => {
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 30;

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const userId = user ? user.userId : 0;
    const { images } = await getImagesPage(currentPage, pageSize, userId);
    setImages(images);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getFirstPage = async () => {
      const userId = user ? user.userId : 0;
      const { images, pagination } = await getImagesPage(1, pageSize, userId);
      setImages(images);
      setPageCount(Math.ceil(pagination.TotalCount / pageSize));
    };
    getFirstPage();
  }, []);

  return (
    <>
      <div className="d-flex mb-4 justify-content-between">
        <h1>Image Gallery</h1>
        <Link className="btn btn-primary" to="/uploadImage">
          Upload image
        </Link>
      </div>
      <PaginatedImageList
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        setImages={setImages}
        images={images}
      />
    </>
  );
};

export default Gallery;
