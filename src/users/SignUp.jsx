import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignInSignUp.css";
function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    type: "user",
    avatarUrl: "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    };
    getUsers();
  }, []);
  const { username, password, email, name } = user;
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUsernameExist = users.find((user) => user.username === username);
    const isEmailExist = users.find((user) => user.email === email);
    if (isUsernameExist) {
      alert("Username đã tồn tại");
      return;
    }
    if (isEmailExist) {
      alert("Email đã tồn tại");
      return;
    }
    if (username.length < 8 || password.length < 8) {
      alert("Username và password phải có ít nhất 8 kí tự");
      return;
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      alert("Email không đúng định dạng");
      return;
    }
    await axios.post("http://localhost:8000/users", user);
    window.location.href = "/user/signin";
  };
  return (
    <div className="containerUser" style={{ color: "white" }}>
      <div className="w-75 mx-auto shadow p-5">
        <h1>DANG KY</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputUser">
            {" "}
            <label> Username: </label>
            <br></br>
            <input
              type="text"
              name="username"
              value={username}
              onInput={(e) => handleInputChange(e)}
              className="inputText"
            />
          </div>
          <div className="inputUser">
            {" "}
            <label> Password: </label>
            <br></br>
            <input
              type="password"
              name="password"
              value={password}
              onInput={(e) => handleInputChange(e)}
              className="inputText"
            />
          </div>
          <div className="inputUser">
            {" "}
            <label> Email: </label>
            <br></br>
            <input
              type="text"
              name="email"
              value={email}
              onInput={(e) => handleInputChange(e)}
              className="inputText"
            />
          </div>
          <div className="inputUser">
            {" "}
            <label> Name: </label>
            <br></br>
            <input
              type="text"
              name="name"
              value={name}
              onInput={(e) => handleInputChange(e)}
              className="inputText"
            />
          </div>
          <button variant="outline-success" type="submit" className="buttonDK">
            Success
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
