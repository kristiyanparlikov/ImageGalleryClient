import React, { useState } from "react";
import { Link } from "react-router-dom";
import { uploadImage } from "../api/apis/image";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  imgPath: "",
  imgFile: null,
};
const UploadImage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    await uploadImage(formData)
      .then((response) => {
        navigate("/gallery");
        console.log(response);
        toast.success("Image uploaded successfully!", {
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
          toast.error("Image could not be uploaded.", {
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

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imgFile,
          imgPath: x.target.result,
        });
      };
      reader.readAsDataURL(imgFile);
    } else {
      setValues({
        ...values,
        imgFile: null,
        imgPath: "",
      });
    }
  };

  return (
    <div className="mt-4 p-5 bg-light rounded">
      <h1 className="text-center mb-4">Upload image</h1>
      <form
        className="d-flex justify-content-center mb-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group me-sm-2">
          <input
            type="file"
            accept="image/*"
            className="form-control form-control-file rounded shadow-none"
            placeholder="Enter email"
            required
            onChange={showPreview}
          />
        </div>

        <button type="submit" className="btn btn-primary my-2 my-sm-0 rounded">
          Upload
        </button>
        <Link className="btn btn-secondary my-2 my-sm-0 rounded" to="/gallery">
          Cancel
        </Link>
      </form>
      <img
        src={values.imgPath}
        className="img-fluid w-25 rounded mx-auto d-block"
      ></img>
    </div>
  );
};
export default UploadImage;
