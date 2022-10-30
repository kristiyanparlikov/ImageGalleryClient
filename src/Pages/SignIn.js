import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../Contexts/UserContext";
import { signIn } from "../api/apis/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email)
      .then((response) => {
        if (response.status === 200)
          toast.success("Successfully signed in", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });

        setUser(response.data);
        window.localStorage.setItem("user", JSON.stringify(response.data));
        setEmail("");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("No user with such email", {
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
        <h1 className="text-center mb-4">Sign In</h1>
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
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
