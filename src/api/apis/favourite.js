import axiosClient from "../apiClient";

const options = {
  headers: { "Content-Type": "application/json", Accept: "application/json" },
};

export const getFavouritesPage = async (currentPage, userId) => {
  const response = await axiosClient.get(
    `/favourites?userId=${userId}&pageNumber=${currentPage}&pageSize=30`,
    options
  );
  const paginationHeader = JSON.parse(response.headers.get("X-Pagination"));
  return { favourites: response.data, pagination: paginationHeader };
};

export const getFavourites = async (userId) => {
  const response = await axiosClient.get(`/favourites?userId=${userId}`, options);
  return response;
}

export const addFavourite = async (imageId, userId) => {
  const response = await axiosClient.post(
    "/favourites",
    { imageId: imageId, userId: userId },
    options
  );
  return response;
}

export const removeFavourite = async (imageId, userId) => {
  const response = await axiosClient.delete(
    "/favourites",
    { data: {imageId: imageId, userId: userId }},
    options
  );
  return response;
}

