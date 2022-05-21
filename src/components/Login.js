import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import style from "./Loading.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Login Page";
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);

  const handleLogin = (e) => {
    localStorage.setItem("token", JSON.stringify({ email, password }));
    setIsLoggedIn(true);
  };

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
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <Navigate to="/animeList" />
      )}
    </div>
  );
};

export default Login;
