import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PaginatedImageList from "../Components/PaginatedImageList";
import { UserContext } from "../Contexts/UserContext";
import { getImagesPage } from "../api/apis/image";

const Gallery = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [pageId, setPageId] = useState(parseInt(id));
  const [pageCount, setPageCount] = useState(0);
  const [images, setImages] = useState([]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    navigate(`/gallery/${currentPage}`);
    setPageId(currentPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getPage = async () => {
      const userId = user ? user.userId : 0;
      const { images, pagination } = await getImagesPage(
        pageId,
        userId
      );
      setImages(images);
      setPageCount(Math.ceil(pagination.TotalCount / pagination.PageSize));
    };
    getPage();
  }, [user, pageId]);

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
