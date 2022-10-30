import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PaginatedImageList from "../Components/PaginatedImageList";
import { ImageContext } from "../Contexts/ImageContext";
import { UserContext } from "../Contexts/UserContext";
import { getImagesPageAuthenticated, getImagesPageUnauthenticated } from "../api/apis/image";

const Gallery = () => {
  const { user } = useContext(UserContext);
  const { images, setImages } = useContext(ImageContext);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 30;

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    if(user != null){
      const { images } = await getImagesPageAuthenticated(currentPage, pageSize, user.userId);
      setImages(images);
    }else{
      const { images } = await getImagesPageUnauthenticated(currentPage, pageSize);
      setImages(images);
    }
    
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getFirstPageAuthenticated = async () => {
      const { images, pagination } = await getImagesPageAuthenticated(1, pageSize, user.userId);
      setImages(images);
      setPageCount(Math.ceil(pagination.TotalCount / pageSize));
    };
    const getFirstPageUnauthenticated = async () => {
      const { images, pagination } = await getImagesPageUnauthenticated(1, pageSize);
      setImages(images);
      setPageCount(Math.ceil(pagination.TotalCount / pageSize));
    };
    if(user != null) getFirstPageAuthenticated();
    else getFirstPageUnauthenticated();
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
