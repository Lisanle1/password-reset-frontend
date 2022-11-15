import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import images from "../assets/images/img-01.png";
import { API_URL } from "./API_URL";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  let [error, setError] = useState("");
  const validateForm = (formData) => {
    const errors = {};
    if (formData.email === "") errors.email = "Email is Required";
    if (formData.password === "") errors.password = "Password is Required";
    return errors;
  };
  let handleSubmit = async (values) => {
    const res = await axios.post(`${API_URL}/login`, {
      email: values.email,
      password: values.password,
    });
    if (res.data.statusCode === 400) {
      setError(res.data.msg);
    } else {
      localStorage.setItem("token", res.data);
      navigate("/dashboard");
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
                email: "",
                password: "",
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
                  onSubmit={handleSubmit}
                >
                  <span className="login100-form-title ">Login</span>

                  <div className="wrap-input100">
                    <input
                      className="input100"
                      type="text"
                      id="name"
                      value={values.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
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
                      {touched.email && errors.email}
                    </span>
                  </div>
                  <div className="wrap-input100">
                    <input
                      className="input100"
                      type="password"
                      id="password"
                      value={values.password}
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  {error ? (
                    <span
                      style={{
                        color: "red",
                        marginLeft: "23px",
                        marginTop: "23px",
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
                      {touched.password && errors.password}
                    </span>
                  )}
                  <div className="container-login100-form-btn ">
                    <button
                      className="login100-form-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center p-t-12 m-l-160 ">
                    {/* <span className="txt1">
							Forgot
						</span> */}
                    <Link to="/forgotpassword" className="txt2">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="text-center p-t-30">
                    <Link to="/signup" className="txt2">
                      Create your Account
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

export default Login;
