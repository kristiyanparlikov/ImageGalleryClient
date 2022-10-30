import React  from "react";
import ReactPaginate from "react-paginate";
import Image from "./Image";
import { deleteImage } from "../api/apis/image";
import { toast } from "react-toastify";

const PaginatedImageList = ({
  images,
  setImages,
  handlePageClick,
  pageCount,
}) => {
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

  return (
    <>
      <div className="row">
        {images.map((image) => {
          return (
            <Image
              image={image}
              key={image.imageId}
              handleDelete={handleDelete}
              images={images}
              setImages={setImages}
            ></Image>
          );
        })}
      </div>

      <div className="mx-auto w-50 fixed-bottom">
        <ReactPaginate
          previousLabel={<>&laquo;</>}
          nextLabel={<>&raquo;</>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={
            "pagination justify-content-center shadow-lg p-3 mb-5 bg-white rounded"
          }
          pageClassName={"page-item"}
          pageLinkClassName={"page-link shadow-none"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link shadow-none"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link shadow-none"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link shadow-none"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default PaginatedImageList;
