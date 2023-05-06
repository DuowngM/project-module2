import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

// import "./SignInSignUp.css";
function SignIn() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { username, password } = user;
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [data, setData] = useState([]);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setData(result.data);
  };
  useEffect(() => {
    loadUser();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = data.find(
      (user) => user.username === username && user.password === password
    );  
    if (!foundUser) {
      alert("Sai thông tin đăng nhập, vui lòng kiểm tra lại!");
      return;
    }
    localStorage.getItem("flaguser");
    localStorage.getItem("typeuser");
    const flaguser = foundUser.username;
    const typeuser = foundUser.type;
    localStorage.setItem("flaguser", flaguser);
    localStorage.setItem("typeuser", typeuser);
    window.location.href = "/";
  };
  return (
    <div className="containerUser" style={{ color: "white" }}>
      <div className="w-75 mx-auto shadow p-5">
        <h1>DANG NHAP</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputUser">
            <label className="labelName"> Username: </label>
            <input
              type="text"
              name="username"
              value={username}
              onInput={(e) => handleInputChange(e)}
              className="inputText"
            />
          </div>
          <div className="inputUser">
            <label> Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onInput={(e) => handleInputChange(e)}
              className="inputText"
            />
          </div>
          <button variant="outline-success" type="submit" className="buttonDK">
            Success
          </button>{" "}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
