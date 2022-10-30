import axiosClient from "../apiClient";

const options = {
  headers: { "Content-Type": "application/json", Accept: "application/json" },
};

const uploadImageOptions = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const getImagesPageUnauthenticated = async (currentPage, pageSize) => {
  const response = await axiosClient.get(
    `/images?pageNumber=${currentPage}&pageSize=${pageSize}`,
    options
  );
  const paginationHeader = JSON.parse(response.headers.get("X-Pagination"));
  return { images: response.data, pagination: paginationHeader };
};

export const getImagesPageAuthenticated = async (currentPage, pageSize, userId) => {
  const response = await axiosClient.get(
    `/images?pageNumber=${currentPage}&pageSize=${pageSize}&userId=${userId}`,
    options
  );
  const paginationHeader = JSON.parse(response.headers.get("X-Pagination"));
  return { images: response.data, pagination: paginationHeader };
};

export const getImagePageUnauthenticated = async (currentPage) => {
  const response = await axiosClient.get(`/images?pageNumber=${currentPage}&pageSize=1`, options)
  const paginationHeader = JSON.parse(
      response.headers.get("X-Pagination")
    );
  return { image: response.data, pagination: paginationHeader}
}

export const getImagePageAuthenticated = async (currentPage, userId) => {
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


