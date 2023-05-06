import React, { useEffect, useState } from "react";
import "./admin.css";
import Table from "react-bootstrap/Table";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

function AdminAddMv() {
  const [data, setData] = useState([]);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/results");
    setData(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);
  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:8000/results/${id}`);
    loadUser();
  };
  return (
    <>
      <div className="containerAdmin" style={{ color: "white" }}>
        <div className="navbarAdmin">
          <h1>Navbar Admin</h1>
          <Link to="/user/admin/users">
            <div>
              <h4>Quản lý User</h4>
            </div>
          </Link>
          <Link to="/user/admin/movie">
            <div>
              {" "}
              <h4>Quản lý Movie</h4>
            </div>
          </Link>
          <Link to="/user/admin/addmovie">
            <div>
              {" "}
              <h4>Add Movie</h4>
            </div>
          </Link>
        </div>
        <div className="contentAdmin">
          <h1>Admin Movie</h1>
          <div className="container-fluid">
            <Table style={{ color: "white" }}>
              <thead>
                <tr className="bg-dark text-white">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Date</th>
                  <th>Desciption</th>
                  <th colSpan={3}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((movie, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{movie.title}</td>
                    <td>
                      {" "}
                      <img
                        className="product-img"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt="photo"
                      ></img>
                    </td>
                    <td>{movie.release_date}</td>
                    <td>{movie.overview}</td>
                    <td>
                      <Link>
                        {" "}
                        <Button variant="outline-info">Edit</Button>{" "}
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteMovie(movie.id)}
                        >
                          Delete
                        </Button>{" "}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAddMv;
