import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import style from "./LandingPage.module.css";

const Card = () => {
  const { data: animes, isLoading, error } = useFetch("https://ghibliapi.herokuapp.com/films");

  useEffect(() => {
    document.title = "Anime List";
    return () => {
      console.log("Component AnimeList will unmounted");
    };
  }, []);

  const handleClick = (anime) => {
    setAnim(anime.title);
  };

  return (
    <Container>
      {error && <h3 className="loading">{error}</h3>}
      {isLoading && <h3 className={`loading ${style.fade}`}>Loading...</h3>}
      {animes && (
        <div className={`d-flex justify-content-center ${style.fade}`}>
          <h3 className="display-4">Anime List</h3>
        </div>
      )}
      <div className={`row row-cols-1 row-cols-md-5 g-4 p-4`}>
        {animes &&
          animes.map((anime) => (
            <div className={`col ${style.fade}`} key={anime.id}>
              <a href={`#${anime.title}`} onClick={() => handleClick(anime)} data-bs-toggle="modal" data-bs-target={`#exampleModal${anime.id}`}>
                <div className="card p-2 h-100">
                  <img src={anime.image} className="card-img-top" width="10em" />
                </div>
              </a>
              <div className="modal fade" id={`exampleModal${anime.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title" id="exampleModalLabel">
                        {anime.title}
                      </h3>
                      <button type="button" onClick={() => handleClick({ title: "Anime List" })} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex justify-content-center">
                        <img src={anime.movie_banner} className="img-fluid" alt="" />
                      </div>
                      <div className="row">
                        <div className="p-3 col-md-6">
                          <h5>Description</h5>
                          <p>{anime.description}</p>
                        </div>
                        <div className="p-3 col-md-6">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <span className="fw-bold">Original Name: </span>
                              {anime.original_title_romanised}
                            </li>
                            <li className="list-group-item">
                              <span className="fw-bold">Release: </span>
                              {anime.release_date}
                            </li>
                            <li className="list-group-item">
                              <span className="fw-bold">Director: </span>
                              {anime.director}
                            </li>
                            <li className="list-group-item">
                              <span className="fw-bold">Producer: </span>
                              {anime.producer}
                            </li>
                            <li className="list-group-item">
                              <span className="fw-bold">Duration: </span>
                              {anime.running_time} minutes
                            </li>
                            <li className="list-group-item">
                              <span className="fw-bold">Rating: </span>
                              {anime.rt_score}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Card;
