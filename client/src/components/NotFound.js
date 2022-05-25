import { useEffect } from "react";
import style from "./Loading.module.css";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found";
    return () => {
      console.log("Component Not Found will unmount");
    };
  }, []);

  return (
    <div className={style.loading}>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
