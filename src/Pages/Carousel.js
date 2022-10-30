import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getImagePageAuthenticated,
  getImagePageUnauthenticated,
} from "../api/apis/image";
import { ImageContext } from "../Contexts/ImageContext";
import { UserContext } from "../Contexts/UserContext";
import "../index.css";
import { removeFavourite, addFavourite } from "../api/apis/favourite";
import { toast } from "react-toastify";

const Carousel = () => {
  const imageBaseUrl = "https://localhost:7255/";
  const navigate = useNavigate();
  const { id } = useParams();
  const pageId = parseInt(id);
  const { images, setImages } = useContext(ImageContext);
  const { user, setUser } = useContext(UserContext);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const getPageAuthenticated = async () => {
      const { image, pagination } = await getImagePageAuthenticated(
        pageId,
        user.userId
      );
      setImages(image);
      setPagination(pagination);
    };
    const getPageUnauthenticated = async () => {
      const { image, pagination } = await getImagePageUnauthenticated(pageId);
      setImages(image);
      setPagination(pagination);
    };
    if (user != null) getPageAuthenticated();
    else getPageUnauthenticated();
  }, [user]);

  const handlePageChange = async (pageId) => {
    if (user != null) {
      const { image, pagination } = await getImagePageAuthenticated(
        pageId,
        user.userId
      );
      setImages(image);
      setPagination(pagination);
    } else {
      const { image, pagination } = await getImagePageUnauthenticated(pageId);
      setImages(image);
      setPagination(pagination);
    }
  };

  const previousPage = () => {
    if (pagination.HasPrevious) {
      navigate(`/carousel/${pageId - 1}`);
      handlePageChange(pageId - 1);
    }
  };

  const nextPage = () => {
    if (pagination.HasNext) {
      navigate(`/carousel/${pageId + 1}`);
      handlePageChange(pageId + 1);
    }
  };

  const handleRemoveFavourite = async () => {
    await removeFavourite(images[0].imageId, user.userId)
      .then((response) => {
        setImages(
          images.map((img) => {
            if (img.imageId === images[0].imageId)
              return { ...img, favourite: false };
            else return img;
          })
        );
        toast.success(`${response.data}`, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Image could not be removed from favourites", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        }
      });
  };

  const handleAddFavourite = async () => {
    await addFavourite(images[0].imageId, user.userId)
      .then((response) => {
        setImages(
          images.map((img) => {
            if (img.imageId === images[0].imageId)
              return { ...img, favourite: true };
            else return img;
          })
        );
        toast.success(`${response.data}`, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Image could not be added to favourites", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        }
      });
  };

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    if (images[0].favourite) await handleRemoveFavourite();
    else await handleAddFavourite();
  };

  return (
    <>
      <nav className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={previousPage}>
          Previous
        </button>
        {pagination && (
          <h4>
            Page: {pageId} of {pagination.TotalPages}
          </h4>
        )}

        <button className="btn btn-primary" onClick={nextPage}>
          Next
        </button>
      </nav>
      {images.map((image) => (
        <>
          <div>
            <h2 className="text-center">{image.imageName}</h2>
          </div>
          <div className="d-flex justify-content-center">
          {user ? (
            <i
              onClick={handleHeartClick}
              className={
                image.favourite === true
                  ? "heart-button-carousel bi bi-heart-fill"
                  : "heart-button-carousel bi bi-heart"
              }

            ></i>
          ) : (
            <></>
          )}
          </div>
          
          <div className="img-container">
            <img
            key={image.imageId}
              className="img-fluid w-100"
              src={imageBaseUrl + image.imagePath}
              alt={image.imageName}
            />
          </div>
        </>
      ))}
    </>
  );
};

export default Carousel;
