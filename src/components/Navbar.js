import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [title, setTitle] = useState(document.title);

  const handleClick = (judul) => {
    setTitle(judul);
  };

  useEffect(() => {
    if (document.title === "404 Not Found") {
      handleClick("404 Not Found");
    } else if (document.title === "Anime List") {
      handleClick("Anime List");
    }
    return () => {
      console.log("Component Navbar will unmount");
    };
  }, []);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link onClick={() => handleClick("Unofficial Studio Ghibli Website")} className="navbar-brand" to="/">
          Unofficial Studio Ghibli Web
        </Link>
        {/* <a className="navbar-brand">Unofficial Studio Ghibli Web</a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {(title === "Unofficial Studio Ghibli Website" || title === "Event") && (
              <>
                <li className="nav-item">
                  <a onClick={() => handleClick("Unofficial Studio Ghibli Website")} className={`nav-link ${title === "Unofficial Studio Ghibli Website" ? "active" : ""}`} href="#home">
                    Homepage
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
            {(title === "Anime List" || title === "404 Not Found") && (
              <>
                <li className="nav-item">
                  <Link onClick={() => handleClick("Unofficial Studio Ghibli Website")} className={`nav-link ${title === "Unofficial Studio Ghibli Website" ? "active" : ""}`} to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={() => handleClick("Anime List")} className={`nav-link ${title === "Anime List" ? "active" : ""}`} to="/animeList">
                    Anime List
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
