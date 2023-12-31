import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const history = useNavigate();
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const handleChange = (e) => {
    value = e.target.value;
    name = e.target.name;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const PostData = (e) => {
    e.preventDefault();

    const { email, password } = user;

    axios
      .post(
        "http://127.0.0.1:8000/auth/login/",
        `email=${email}&password=${password}`
      )
      .then((res) => {
        console.log(res);
        
       if (res.status === 200) {
          // toast.success("You have been successfully login ! ");
          alert("welcome to shorthills.ai!!");
          history("/question");
        }
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.status === 400) {
          // toast.dark("Invalid Credentials");
        }
      });
  };

  return (
    <>
      <div style={{ height: "90px" }}></div>
      <body className="login-container">
        <div id="login-div" className="">
          <div className="fields ">
            <span style={{ width: "100%" }} className="fields-span">
              Welcome back!
            </span>
            <span
              style={{
                display: "block",
                width: "100%",
                marginBottom: 1 + "rem",
              }}
            >
              Sign in and continue your journey.
            </span>
          </div>
          <div className="md:max-w-sm md:mx-auto login-box">
            <span style={{ display: "block" }} className="fields-span">
              Login
            </span>
            <form className="login-form" onSubmit={handleSubmit} method="POST">
              <div className="field md:w-full">
                <label for="email" className=" label">
                  Username or Email
                </label>
                <div className="inputt">
                  <PersonIcon />
                  <input
                    className="inputt-area"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Username or Email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field md:w-full">
                <label for="password" className="label">
                  Password
                </label>
                <div
                  className="inputt"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LockIcon />
                  <input
                    className="inputt-area"
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <IconButton
                    style={{ height: "5px" }}
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>
            </form>

            <p style={{ cursor: "pointer", textAlign: "right" }}>
              <NavLink to="/forgotpassword" className="links">
                Forgot password?
              </NavLink>
            </p>

              <div className="field" style={{
                textAlign: "center"}}>
                <button
                  style={{ cursor: "pointer", textAlign: "center" }}
                  value="login"
                  onClick={PostData}
                  className="field form-button mr-20"
                >
                  Login
                </button>
              </div>
                
            <p style={{ cursor: "pointer", textAlign: "center" }}>
              Don't Have An Account ?{" "}
              <NavLink to="/signup" className="links">
                SignUp <i class="fa fa-arrow-right"></i>
              </NavLink>
            </p>

            <br />
          </div>
        </div>
      </body>
      {/* <ToastContainer autoClose={5000}/> */}
      
      
    </>
  );
}

export default Login;