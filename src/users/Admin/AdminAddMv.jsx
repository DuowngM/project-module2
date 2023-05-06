import React, { useEffect, useState } from "react";
import "./admin.css";
import { Link, NavLink } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import axios from "axios";
import "./admin.css";
function AdminMovie() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };
  //-------------------------------------------------------------
  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  let dateNow = new Date().toLocaleDateString();
  const [movie, setMovie] = useState({
    title: "",
    poster_path: "",
    src: "",
    video: "",
    overview: "",
    release_date: dateNow,
  });
  const { title, src, video, overview } = movie;

  const handleInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleButtonAdd = async (e) => {
    e.preventDefault();
    const newMovie = {
      ...movie,
      poster_path: imageUrls[imageUrls.length - 1],
    };
    await axios.post("http://localhost:8000/results", newMovie);
  };
  return (
    <>
      <div className="containerAdmin" style={{ color: "white" }}>
        <div className="navbarAdmin">
          <h1>Navbar Admin</h1>
          <NavLink to="/user/admin/users">
            <div>
              <h4>Quản lý User</h4>
            </div>
          </NavLink>
          <NavLink to="/user/admin/movie">
            <div>
              {" "}
              <h4>Quản lý Movie</h4>
            </div>
          </NavLink>
          <NavLink to="/user/admin/addmovie">
            <div>
              {" "}
              <h4>Add Movie</h4>
            </div>
          </NavLink>
        </div>
        <div className="contentAdmin">
          <div className="addMovieHere">
            <h1 style={{ paddingBottom: "50px" }}>Add Movies</h1>
            <table style={{ fontSize: 20, color: "#fff" }} className="tableMV">
              <tbody>
                <tr>
                  <td style={{ paddingBottom: 20 }}>Tên phim: </td>
                  <td style={{ paddingBottom: 20 }}>
                    <input
                      type="text"
                      id="nameProduct"
                      style={{ outline: "none" }}
                      name="title"
                      value={title}
                      className="inputMV"
                      onInput={(e) => handleInputChange(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: 20 }}>Poster: </td>
                  <td style={{ paddingBottom: 20 }}>
                    <input
                      type="file"
                      onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                      }}
                    />
                    <button
                      onClick={uploadFile}
                      style={{ position: "relative", left: "-100px" }}
                    >
                      {" "}
                      Upload Image
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: 20 }}>Source phim:</td>
                  <td style={{ paddingBottom: 20 }}>
                    <input
                      type="text"
                      id="priceProduct"
                      style={{ outline: "none" }}
                      name="src"
                      value={src}
                      className="inputMV"
                      onInput={(e) => handleInputChange(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: 20 }}>Trailer: </td>
                  <td style={{ paddingBottom: 20 }}>
                    <input
                      type="text"
                      id="sl"
                      className="inputMV"
                      name="video"
                      value={video}
                      onInput={(e) => handleInputChange(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: 20 }}>Description: </td>
                  <td style={{ paddingBottom: 20 }}>
                    <textarea
                      name="overview"
                      id=""
                      cols="24"
                      rows="3"
                      className="inputMV"
                      value={overview}
                      onInput={(e) => handleInputChange(e)}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button className="buttonSave" onClick={handleButtonAdd}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMovie;
