import axios from 'axios';
import { toast } from 'react-toastify';

const errorHandler = (error) => {
  if (error.response.status === 500) {
    toast.error("Server Error", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      });  
  }
  return Promise.reject({ ...error })
}

const axiosClient = axios.create({
  baseURL: `https://localhost:7255/api`,
});

axiosClient.interceptors.response.use(
  (response) => {return response},
  (error) => errorHandler(error)
  );

export default axiosClient

  