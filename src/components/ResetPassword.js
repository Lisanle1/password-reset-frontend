import React, { useState } from "react";
import images from "../assets/images/img-01.png";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { API_URL } from "./API_URL";
function ResetPassword() {
  let params = useParams();
  let [error, setError] = useState();
  let [show, setShow] = useState(false);
  let [status, setStatus] = useState("");
  const validateForm = (formData) => {
    const errors = {};
    if (formData.newPassword === "")
      errors.newPassword = "New Password is Required";
    if (formData.confirmPassword === "")
      errors.confirmPassword = "Confirm Password is Required";
    return errors;
  }; 
  let handleSubmit = async (values) => {
    const res = await axios.put(
      `${API_URL}/resetpassword/${params.id}`,
      {
        newPassword: values.newPassword,
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
          <div className="wrap-login100 ">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={images} alt="" />
            </div>
            <Formik
              initialValues={{
                newPassword: "",
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
                  <span className="login100-form-title">RESET PASSWORD</span>

                  <div className="wrap-input100">
                    <input
                      className="input100"
                      id="newPassword"
                      type="password"
                      value={values.newPassword}
                      name="newPassword"
                      placeholder="New Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-lock" aria-hidden="true"></i>
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
                      {touched.newPassword && errors.newPassword}
                    </span>
                  </div>
                  <div className="wrap-input100">
                    <input
                      className="input100"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
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
                        reset
                      </button>
                    ) : (
                      <button
                        className="login100-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        reset
                      </button>
                    )}{" "}
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

export default ResetPassword;
