import { Container, Row } from "react-bootstrap";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <Container fluid className={style.footerContainer}>
      <img src="https://www.pngkey.com/png/full/773-7735867_mm-logo-madman-entertainment-logo.png" className={style.footerImageLeft} />
      <img src="https://upload.wikimedia.org/wikipedia/sco/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png" className={style.footerImageRight} />
    </Container>
  );
};

export default Footer;
