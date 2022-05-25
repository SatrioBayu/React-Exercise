import Card from "./components/Card";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Protected from "./components/Protected";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import Shop from "./components/Shop";
import Add from "./components/Add";
import Edit from "./components/Edit";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "607923967612-ntl6m5lubldtlhlqorgusotabgqa4ahi.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animeList" element={<Card />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/create"
            element={
              <Protected>
                <Add />
              </Protected>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Protected>
                <Edit />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
