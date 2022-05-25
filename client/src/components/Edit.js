import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onUploadChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/shops/${id}`).then((res) => {
      const item = res.data;
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setFile(item.image);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const item = (await axios.get(`http://localhost:5000/api/shops/${id}`)).data;
    if (file !== item.image) {
      const data = new FormData();
      data.append("file", file);
      const fileName = (await axios.post("http://localhost:5000/api/shops/upload", data)).data;
      const datas = { name, description, price, fileName };
      await axios.put(`http://localhost:5000/api/shops/${id}`, datas);
      navigate("/shop");
    } else {
      const datas = { name, description, price, fileName: file };
      await axios.put(`http://localhost:5000/api/shops/${id}`, datas);
      navigate("/shop");
    }
  };

  useEffect(() => {
    document.title = "Shop";
  }, []);

  return (
    <div className="container my-5 content">
      <h1 className="my-5 text-center">Edit Item</h1>
      <form onSubmit={onSubmit}>
        <div className="form-add">
          <div className="row align-items-center">
            <div className="col-md-3">
              <h6>Nama</h6>
            </div>
            <div className="col-md-6">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required name="name" placeholder="Nama Item" />
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-md-3">
              <h6>Harga</h6>
            </div>
            <div className="col-md-6">
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required name="price" placeholder="Rp.0,-" />
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-md-3">
              <h6>Description</h6>
            </div>
            <div className="col-md-6">
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required name="description" placeholder="Description ..." />
            </div>
          </div>
          <div className="row align-items-center my-3">
            <div className="col-md-3">
              <h6>Gambar</h6>
            </div>
            <div className="col-md-6">
              <input type="file" onChange={onUploadChange} name="image" className="form-control" />
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
