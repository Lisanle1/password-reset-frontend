import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import images from "../assets/images/img-01.png";
import { API_URL } from "./API_URL";
import { Link } from "react-router-dom";
function ForgotPassword() {
  let [error, setError] = useState();
  let [show, setShow] = useState(false);
  let [status, setStatus] = useState("");
  const validateForm = (formData) => {
    const errors = {};
    if (formData.email === "") errors.email = "Email is Required";
    return errors;
  };
  let handleSubmit = async (values) => {
    const res = await axios.post(`${API_URL}/forgotpassword`, {
      email: values.email,
    });
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
                email: "",
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
                  <span className="login100-form-title">FORGOT PASSWORD</span>

                  <div className="wrap-input100">
                    <input
                      className="input100"
                      id="email"
                      type="text"
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
                      {touched.email && errors.email}
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
                        Send Link
                      </button>
                    ) : (
                      <button
                        className="login100-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Send Link
                      </button>
                    )}{" "}
                  </div>

                  <div className="text-center p-t-12 ">
                    <span className="txt1">Don't have an account? </span>
                    <Link to="/signup" className="txt2">
                      Sign up
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

export default ForgotPassword;
