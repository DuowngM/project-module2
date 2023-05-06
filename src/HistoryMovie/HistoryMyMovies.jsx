import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";

function HistoryMyMovies() {
  const flaguser = localStorage.getItem("flaguser");
  const [historyMovie, setHistoryMovie] = useState([]);

  const loadHistoryMovie = async () => {
    let history = await axios.get(`http://localhost:8000/historymovies`);
    const filteredMovies = history.data.filter(
      (movie) => movie.user_id === flaguser
    );
    setHistoryMovie(filteredMovies);
  };
  useEffect(() => {
    loadHistoryMovie();
  }, []);
  return (
    <div style={{ backgroundColor: "#222" }}>
      <div className="container" style={{ backgroundColor: "#222" }}>
        <h1 style={{ color: "white" }}>Danh sách phim đã xem</h1>
        <Table style={{ color: "white" }}>
          <thead>
            <tr className="bg-dark text-white">
              <th>ID phim</th>
              <th>Poster</th>
              <th>Title phim</th>
              <th>Username</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {historyMovie.map((movie, index) => (
              <tr key={index}>
                <td>{movie.movie_id}</td>
                <td>
                  <img
                    className="product-backdrop"
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt="photo"
                    width="300px"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.user_id}</td>
                <td>{movie.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default HistoryMyMovies;
