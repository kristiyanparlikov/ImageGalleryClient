import React, { useState, useContext } from "react";
import "../index.css";
import { Modal } from "react-bootstrap";
import { UserContext } from "../Contexts/UserContext";
import { removeFavourite, addFavourite } from "../api/apis/favourite";
import { toast } from "react-toastify";

const Image = ({ image, handleDelete, images, setImages }) => {
  const { user } = useContext(UserContext);
  const imageBaseUrl = "https://localhost:7255/";
  const [isImageHovered, setImageHover] = useState(false);
  const [isIconHovered, setIconHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleRemoveFavourite = async () => {
    await removeFavourite(image.imageId, user.userId)
      .then((response) => {
        setImages(
          images.map((img) => {
            if (img.imageId === image.imageId)
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
    await addFavourite(image.imageId, user.userId)
      .then((response) => {
        setImages(
          images.map((img) => {
            if (img.imageId === image.imageId)
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
    setIconHover(false);
    if (image.favourite) await handleRemoveFavourite();
    else await handleAddFavourite();
  };

  // const onComplete = after(images.length, () => {
  //   console.log("loaded");
  // });

  // function after(count, f) {
  //   let noOfCalls = 0;
  //   return function (...rest) {
  //     noOfCalls = noOfCalls + 1;
  //     if (count === noOfCalls) {
  //       f(...rest);
  //     }
  //   };
  // }

  return (
    <>
      <div
        className="img-container col-sm-6 col-md-4 mb-4 "
        key={image.imageId}
        onMouseOver={() => setImageHover(true)}
        onMouseOut={() => setImageHover(false)}
        onClick={handleModalOpen}
      >
        <img
          className="image-list img-fluid w-100"
          src={imageBaseUrl + image.imagePath}
          alt={image.imageName}
        />
        <div className="overlay"></div>
        {isImageHovered && user && (
          <i
            onMouseOver={() => setIconHover(true)}
            onMouseOut={() => setIconHover(false)}
            onClick={handleHeartClick}
            className={
              image.favourite && isIconHovered === false
                ? "heart-button-list bi bi-heart-fill"
                : !image.favourite && isIconHovered === false
                ? "heart-button-list bi bi-heart"
                : "heart-button-list bi bi-heart-half"
            }
          ></i>
        )}
      </div>
      <Modal size="lg" centered show={isModalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{image.imageName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="w-100"
            src={imageBaseUrl + image.imagePath}
            alt={image.imageName}
            onClick={() => handleModalOpen()}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(image.imageId).then(handleModalClose)}
          >
            Delete Image
          </button>{" "}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Image;
