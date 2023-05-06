import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./ViewMovie.css";

function ViewMovie() {
  const [movie, setMovie] = useState([]);

  const [videoSrc, setVideoSrc] = useState("");

  const { id } = useParams();

  const loadMovie = async () => {
    let result = await axios.get(`http://localhost:8000/results/${id}`);
    setMovie(result.data);
    setVideoSrc(result.data.video); // update video source here
  };
  useEffect(() => {
    loadMovie();
  }, []);

  const [isHistoryExist, setIsHistoryExist] = useState(false);
  const [historyMovie, setHistoryMovie] = useState([]);
  const loadHistoryMovie = async () => {
    let history = await axios.get(`http://localhost:8000/historymovies`);
    setHistoryMovie(history.data);
    setIsHistoryExist(
      history.data.some(
        (item) => item.movie_id === id && item.user_id === flaguser
      )
    );
  };
  useEffect(() => {
    loadHistoryMovie();
  }, []);

  let flaguser = localStorage.getItem("flaguser");
  let dateNow = new Date().toLocaleDateString();
  const [history, setHistory] = useState({
    title: movie.title,
    movie_id: id,
    user_id: flaguser,
    backdrop_path: movie.backdrop_path,
    date: dateNow,
    continue: "",
  });
  useEffect(() => {
    setHistory((prevState) => ({
      ...prevState,
      title: movie.title,
      movie_id: id,
      user_id: flaguser,
      backdrop_path: movie.backdrop_path,
      date: dateNow,
      continue: "",
    }));
  }, [movie.title, id, flaguser, dateNow]);
  const addHistory = async () => {
    if (!isHistoryExist) {
      await axios.post(`http://localhost:8000/historymovies`, history);
    }
  };
  const [color, setColor] = useState("");
  const [isFav, setIsFav] = useState("");
  const handleFav = () => {
    if (color === "") {
      setColor("red");
      setIsFav(true);
    } else {
      setColor("");
      setIsFav(false);
    }
    let heartIcon = document.querySelector(".fa-solid.fa-heart");
    if (heartIcon) {
      if (color === "") {
        heartIcon.classList.add("big-heart");
      } else {
        heartIcon.classList.remove("big-heart");
      }
    }
  };
  return (
    <div className="container">
      <div className="movie-details" style={{ color: "white" }}>
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="info">
          <h1>{movie.title}</h1>
          <h4>Ngày ra mắt: {movie.release_date}</h4>
          <h3>Mô tả:</h3>
          <p>{movie.overview}</p>
          <p>
            Lượt xem: <b>{movie.popularity} views</b>
          </p>
          <h3>Trailer</h3>
          <video src={videoSrc} controls></video>{" "}
          <div className="buttonMovie">
            <NavLink to={`/watchmovie/${movie.id}`}>
              <button className="buttonWatchMovie" onClick={() => addHistory()}>
                Xem phim
              </button>
            </NavLink>
            <button type="button" className="buttonAddFav" onClick={handleFav}>
              <i
                className="fa-solid fa-heart big-heart"
                style={{ color: color }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMovie;
