import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [title, setTitle] = useState(document.title);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate("");

  const handleClick = (judul) => {
    setTitle(judul);
  };
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    if (document.title === "404 Not Found") {
      handleClick("404 Not Found");
    } else if (document.title === "Anime List") {
      handleClick("Anime List");
    } else if (document.title === "Login Page") {
      handleClick("Login Page");
    }
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);

    return () => {
      console.log("Component Navbar will unmount");
    };
  }, [token]);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link onClick={() => handleClick("Unofficial Studio Ghibli Website")} className="navbar-brand" to="/">
          Unofficial Studio Ghibli Web
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            {(title === "Unofficial Studio Ghibli Website" || title === "Event") && (
              <>
                <li className="nav-item">
                  <a onClick={() => handleClick("Unofficial Studio Ghibli Website")} className={`nav-link ${title === "Unofficial Studio Ghibli Website" ? "active" : ""}`} href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => handleClick("Event")} className={`nav-link ${title === "Event" ? "active" : ""}`} href="#event">
                    Join Us On 20th Spirited Away!
                  </a>
                </li>
                <li className="nav-item">
                  <Link onClick={() => handleClick("Anime List")} className={`nav-link ${title === "Anime List" ? "active" : ""}`} to="/animeList">
                    Anime List
                  </Link>
                </li>
              </>
            )}
            {(title === "Anime List" || title === "404 Not Found" || title === "Login Page") && (
              <>
                <li className="nav-item">
                  <Link onClick={() => handleClick("Unofficial Studio Ghibli Website")} className={`nav-link ${title === "Unofficial Studio Ghibli Website" ? "active" : ""}`} to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={() => handleClick("Anime List")} className={`nav-link ${title === "Anime List" || title === "Login Page" ? "active" : ""}`} to="/animeList">
                    Anime List
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isLoggedIn && (
            // <ul className="navbar-nav">
            //   <button onClick={handleLogout} className="btn btn-primary">
            //     Logout
            //   </button>
            // </ul>
            <div className="dropdown px-5">
              <a href="#" className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                {token.email}
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
