import React from "react";
import ReactPaginate from "react-paginate";
import Image from "./Image";
import GridSystem from "./GridSystem";

const PaginatedImageList = ({
  images,
  setImages,
  handlePageClick,
  pageCount,
}) => {
  const pagination = (
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
  );

  const grid = (
    <GridSystem colCount={3} md={4}>
      {images.map((image) => {
        return (
          <>
            <Image
              image={image}
              key={image.imageId}
              images={images}
              setImages={setImages}
            ></Image>
          </>
        );
      })}
    </GridSystem>
  );

  return (
    <>
      {grid}
      {pagination}
    </>
  );
};

export default PaginatedImageList;
