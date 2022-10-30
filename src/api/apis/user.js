import axiosClient from "../apiClient";

const options = {
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
};

export const signIn = async (email) => {
  const response = await axiosClient.post(`/users/signIn`,{email: email}, options);
  return response
}

export const signUp = async (email) => {
  const response = await axiosClient.post("/users/signUp", {email: email}, options);
  return response
}

