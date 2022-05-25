import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import style from "./Loading.module.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Page";
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("token", JSON.stringify({ email, password }));
      setIsLoggedIn(true);
    }
  };

  const onSuccess = (responseGoogle) => {
    console.log("Login succes", responseGoogle.profileObj);
    localStorage.setItem("token", JSON.stringify(responseGoogle.profileObj));
    setIsLoggedIn(true);
    navigate("/login");
  };
  const onFailure = (responseGoogle) => {
    console.log("Login failed", responseGoogle.details);
  };

  // const onLogoutSuccess = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  // };

  return (
    <div className={`${style.loading}`}>
      {!isLoggedIn ? (
        <div>
          <h2 className="text-center mb-4">Login Page</h2>
          <form onSubmit={handleLogin}>
            <label className="form-label">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
            <p>{email}</p>
            <label className="form-label">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
            <p>{password}</p>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </div>
          </form>
          <div className="my-3 d-flex justify-content-center">
            <GoogleLogin
              clientId="607923967612-ntl6m5lubldtlhlqorgusotabgqa4ahi.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={(e) => onSuccess(e)}
              onFailure={(e) => onFailure(e)}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center">You've been logged in as {token.name}</h1>
        </>
      )}
    </div>
  );
};

export default Login;
