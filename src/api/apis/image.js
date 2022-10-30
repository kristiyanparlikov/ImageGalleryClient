import axiosClient from "../apiClient";

const options = {
  headers: { "Content-Type": "application/json", Accept: "application/json" },
};

const uploadImageOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const getImagesPage = async (currentPage, pageSize, userId) => {
  const response = await axiosClient.get(
    `/images?pageNumber=${currentPage}&pageSize=${pageSize}&userId=${userId}`,
    options
  );
  const paginationHeader = JSON.parse(response.headers.get("X-Pagination"));
  return { images: response.data, pagination: paginationHeader };
};

export const getImagePage = async (currentPage, userId) => {
  const response = await axiosClient.get(`/images?pageNumber=${currentPage}&pageSize=1&userId=${userId}`, options)
  const paginationHeader = JSON.parse(
      response.headers.get("X-Pagination")
    );
  return { image: response.data, pagination: paginationHeader}
}

export const uploadImage = async (formData) => {
  const response = await axiosClient.post("/images", formData, uploadImageOptions);
  return response;
}

export const deleteImage = async (id) => {
  const response = axiosClient.delete(`/images/${id}`, options)
}


