import { useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import style from "./LandingPage.module.css";

const Home = () => {
  const { data: banners, isLoading, error } = useFetch("https://ghibliapi.herokuapp.com/films");
  useEffect(() => {
    document.title = "Unofficial Studio Ghibli Website";
    return () => {
      console.log("Component Home will unmounted");
    };
  }, []);

  return (
    <>
      <div className={style.landing}>
        {error && <h3 className="loading">{error}</h3>}
        {isLoading && <h3 className={`loading ${style.fade}`}>Loading...</h3>}
      </div>
      {banners && (
        <div id="home">
          <div className={style.fade}>
            <Carousel controls={false} indicators={false} interval={3000} fade>
              {banners.map((banner) => (
                <Carousel.Item key={banner.id} interval={3000}>
                  <img src={banner.movie_banner} className="d-block w-100" alt="..." />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div id="event" className={`${style.content} ${style.fade}`}>
            <Container>
              <h5 className={style.title}>Celebrating 20 years of Spirited Away</h5>
              <h4>Hayao Miyazaki’s Academy Award®-winning masterpiece returns to cinemas for a limited time in celebration of its 20th Anniversary.</h4>
              <p>
                Chihiro thinks she is on another boring trip with her parents. But when they stop at a village that is not all that it seems, her parents undergo a mysterious transformation, and
                Chihiro is whisked into a world of fantastic spirits, shape-shifting dragons and a witch who never wants to see her leave. She must call on the courage she never knew she had to free
                herself and return her family to the outside world.
              </p>
              <p>The second biggest box office hit of all time in Japan, Spirited Away helped redefine the possibilities of animation for Western audiences and a generation of new filmmakers.</p>
              <p>Combining Japanese mythology with Alice in Wonderland-type whimsy, Spirited Away cemented Miyazaki’s reputation as an icon of animation and storytelling.</p>

              <button className={style.button}>Buy Spirited Away Cinema Tickets</button>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
