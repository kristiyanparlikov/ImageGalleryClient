import React, { useState, useRef } from "react";
import { signUp } from "../api/apis/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email)
      .then((response) => {
        if (response.status === 200)
          toast.success("Successfully signed up", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        setEmail("");
        navigate("/signin");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Email already exists", {
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
      <div className="mt-4 p-5 bg-light">
        <h1 className="text-center mb-4">Sign Up</h1>
        <form
          className="d-flex justify-content-center mb-4"
          onSubmit={handleSubmit}
        >
          <div className="form-group me-sm-2">
            <input
              type="email"
              value={email}
              ref={emailRef}
              className="form-control rounded"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary my-2 my-sm-0 rounded">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
