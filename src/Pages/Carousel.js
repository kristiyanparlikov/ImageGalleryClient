import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getImagePage } from "../api/apis/image";
import { UserContext } from "../Contexts/UserContext";
import Image from "../Components/Image";
import GridSystem from "../Components/GridSystem";
import { toast } from "react-toastify";
import { deleteImage } from "../api/apis/image";

const Carousel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pageId, setPageId] = useState(parseInt(id));
  const [images, setImages] = useState([]);
  const [pagination, setPagination] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const userId = user ? user.userId : 0;
    const getPage = async () => {
      const { image, pagination } = await getImagePage(pageId, userId);
      setImages(image);
      setPagination(pagination);
    };
    getPage();
  }, [user, pageId]);

  const handleDelete = async (id) => {
    await deleteImage(id)
      .then((response) => {
        setImages(images.filter((image) => image.imageId !== id));
        console.log(response);
        toast.success("Image deleted successfully!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Image could not be found.", {
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

  const previousPage = () => {
    if (pagination.HasPrevious) {
      navigate(`/carousel/${pageId - 1}`);
      setPageId(pageId - 1);
    }
  };

  const nextPage = () => {
    if (pagination.HasNext) {
      navigate(`/carousel/${pageId + 1}`);
      setPageId(pageId + 1);
    }
  };

  const nav = (
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
  );

  const grid = (
    <GridSystem colCount={1} md={12}>
      {images.map((image) => (
        <>
          <h2 className="text-center">{image.imageName}</h2>
          <Image
            image={image}
            key={image.imageId}
            handleDelete={handleDelete}
            images={images}
            setImages={setImages}
          />
        </>
      ))}
    </GridSystem>
  );

  return (
    <>
      {nav}
      {grid}
    </>
  );
};

export default Carousel;
