import React, { useEffect, useState } from "react";
import "./admin.css";
import Table from "react-bootstrap/Table";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AdminUser() {
  const [data, setData] = useState([]);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setData(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    loadUser();
  };
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (user) => {
    setShow(true);
    setSelected(user);
  };

  useEffect(() => {}, [selected]);
  const [selectedType, setSelectedType] = useState("");
  const handleSave = async () => {
    console.log(selectedType);
    if (selected) {
      await axios.patch(`http://localhost:8000/users/${selected}`, {
        type: selectedType,
      });
      setShow(false);
      setSelected(null);
      loadUser();
    }
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
          <h1>Admin User</h1>
          <div className="container-fluid">
            <Table style={{ color: "white" }}>
              <thead>
                <tr className="bg-dark text-white">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th colSpan={3}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.type}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShow(user.id)}
                      >
                        Edit
                      </Button>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        style={{
                          color: "white",
                          zIndex: 99999,
                        }}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Thay đổi quyền</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <select
                            name=""
                            id=""
                            style={{ color: "white" }}
                            onChange={(e) => setSelectedType(e.target.value)}
                          >
                            <option value="">Phân quyền</option>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                          </select>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={handleSave}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                    <td>
                      <Link>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteUser(user.id)}
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

export default AdminUser;
