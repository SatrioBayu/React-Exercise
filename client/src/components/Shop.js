import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Shop = () => {
  const [datas, setDatas] = useState(null);
  const [error, setError] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Shop";

    axios
      .get("http://localhost:5000/api/shops")
      .then((res) => setDatas(res.data))
      .catch((err) => setError(err.message));

    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isChange, token]);

  const onDelete = async (e) => {
    setIsChange(true);
    await axios.delete(`http://localhost:5000/api/shops/${e.target.value}`);
    setIsChange(false);
  };

  return (
    <div className="container">
      {error && <h3 className="text-center my-5">{error}</h3>}
      {datas && (
        <>
          <div className={`d-flex justify-content-center`}>
            <h3 className="display-4">Shop</h3>
          </div>
          {isLoggedIn && (
            <div className="d-flex justify-content-end">
              <Link to="/create">
                <button className="btn btn-primary">Add new item</button>
              </Link>
            </div>
          )}
        </>
      )}
      <div className="row row-cols-1 row-cols-md-4 g-4 p-4">
        {datas &&
          datas.map((data) => (
            <div className="col" key={data.id}>
              <div className="card h-100">
                <img src={`./images/${data.image}`} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{data.name}</h5>
                  <h6 className="card-subtitle mt-2 fw-bold">Rp. {data.price}</h6>
                  <p className="card-text mt-3">{data.description}</p>
                  {isLoggedIn && (
                    <div className="row">
                      <div className="col-md-6 d-flex-justify-content-center">
                        <Link to={`/edit/${data.id}`}>
                          <button className="btn btn-secondary">Edit</button>
                        </Link>
                      </div>
                      <div className="col-md-6 d-flex-justify-content-center">
                        <button value={data.id} onClick={onDelete} className="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
