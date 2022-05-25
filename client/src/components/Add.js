import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onUploadChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    const fileName = (await axios.post("http://localhost:5000/api/shops/upload", data)).data;
    const datas = { name, description, price, fileName };
    await axios.post("http://localhost:5000/api/shops", datas);
    navigate("/shop");
  };

  useEffect(() => {
    document.title = "Shop";
  }, []);

  return (
    <div className="container my-5 content">
      <button onClick={() => navigate(-1)} className="badge bg-secondary">
        back
      </button>
      <h1 className="my-5 text-center">Add New Item</h1>
      <form onSubmit={onSubmit}>
        <div className="form-add">
          <div className="row align-items-center">
            <div className="col-md-3">
              <h6>Nama</h6>
            </div>
            <div className="col-md-6">
              <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" required name="name" placeholder="Nama Item" />
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-md-3">
              <h6>Harga</h6>
            </div>
            <div className="col-md-6">
              <input type="text" onChange={(e) => setPrice(e.target.value)} className="form-control" required name="price" placeholder="Rp.0,-" />
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-md-3">
              <h6>Description</h6>
            </div>
            <div className="col-md-6">
              <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" required name="description" placeholder="Description ..." />
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-md-3">
              <h6>Gambar</h6>
            </div>
            <div className="col-md-6">
              <input type="file" onChange={onUploadChange} name="image" required className="form-control" />
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Add;
