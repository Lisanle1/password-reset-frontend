import React, { useState } from "react";
import images from "../assets/images/img-01.png";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { API_URL } from "./API_URL";
function Signup() {
  let [error, setError] = useState();
  let [show, setShow] = useState(false);
  let [status, setStatus] = useState("");
  const validateForm = (formData) => {
    const errors = {};
    if (formData.name === "") errors.name = "Name is Required";
    if (formData.email === "") errors.email = "Email is Required";
    if (formData.password === "") errors.password = "Password is Required";
    if (formData.confirmPassword === "")
      errors.confirmPassword = "Confirm Password is Required";
    return errors;
  };
  let handleSubmit = async (values) => {
    const res = await axios.post(
      `${API_URL}/signup`,
      {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
      {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      }
    );
    if (res.data.statusCode === 400) {
      setError(res.data.msg);
      setStatus(res.data.statusCode);
    } else {
      setError(res.data.msg);
      setStatus(res.data.statusCode);
      setShow(true);
    }
  };
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={images} alt="" />
            </div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={(formData) => validateForm(formData)}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  className="login100-form"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <span className="login100-form-title">Signup</span>
                  <div className="wrap-input100">
                    <input
                      className="input100"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100">
                    <span
                      style={{
                        color: "red",
                        marginLeft: "23px",
                        fontSize: "14px",
                      }}
                    >
                      {touched.name && errors.name}
                    </span>
                  </div>
                  <div className="wrap-input100">
                    <input
                      className="input100"
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "23px",
                      fontSize: "14px",
                    }}
                  >
                    {touched.email && errors.email}
                  </span>
                  <div className="wrap-input100">
                    <input
                      className="input100"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "23px",
                      fontSize: "14px",
                    }}
                  >
                    {touched.password && errors.password}
                  </span>
                  <div className="wrap-input100">
                    <input
                      className="input100"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  {status === 200 ? (
                    <span
                      style={{
                        color: "green",
                        marginLeft: "23px",
                        fontSize: "14px",
                      }}
                    >
                      {error}
                    </span>
                  ) : (
                    <></>
                  )}
                  {status === 400 ? (
                    <span
                      style={{
                        color: "red",
                        marginLeft: "23px",
                        fontSize: "14px",
                      }}
                    >
                      {error}
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "red",
                        marginLeft: "23px",
                        fontSize: "14px",
                      }}
                    >
                      {touched.confirmPassword && errors.confirmPassword}
                    </span>
                  )}
                  <div className="container-login100-form-btn">
                    {show ? (
                      <button
                        className="login100-form-btn"
                        type="submit"
                        style={{ backgroundColor: "grey" }}
                        disabled={show}
                      >
                        Sign up
                      </button>
                    ) : (
                      <button
                        className="login100-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign up
                      </button>
                    )}
                  </div>

                  <div className="text-center p-t-13">
                    <Link to="/" className="txt2">
                      Sign In
                      <i
                        className="fa fa-long-arrow-right m-l-5"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
