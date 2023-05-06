import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { NavLink } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  const loadMovie = async () => {
    const result = await axios.get("http://localhost:8000/results");
    setData(result.data);
  };
  useEffect(() => {
    loadMovie();
  }, []);
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(text);
  }, [text]);
  const handleSearchInput = (e) => {
    setText(e.target.value);
  };
  const handleSearch = async () => {
    return await axios
      .get(`http://localhost:8000/results?q=${text}`)
      .then((response) => {
        setData(response.data);
        setText("");
      })
      .catch((error) => setText(error.message));
  };
  const handleView = (e) => {};
  return (
    <div style={{ backgroundColor: "#222" }}>
      <div className="hero"></div>
      <div className="searchMovies">
        <div className="search-box">
          <div>
            <button className="btn-search" onClick={handleSearch}>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "white" }}
              ></i>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
              value={text}
              onChange={(e) => handleSearchInput(e)}
            />
          </div>
        </div>
      </div>
      <div className="title">
        <h1 className="titleh1" style={{ color: "white" }}>
          Phim đang được chiếu
        </h1>
      </div>
      <div className="products-center">
        {data
          .sort((a, b) => {
            return b.vote_count - a.vote_count;
          })
          .map((e, index) => {
            return (
              <>
                <div className="img-container">
                  <NavLink
                    to={`/detailmovie/${e.id}`}
                    onClick={() => handleView(e.id)}
                  >
                    <img
                      className="product-img"
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      alt="photo"
                    ></img>
                  </NavLink>
                  <h3 style={{ color: "white", textAlign: "center" }}>
                    {e.original_title}
                  </h3>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
