import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import "./SettingUser.css";
function SettingUser() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  // State lấy url ảnh về
  const [imageUrls, setImageUrls] = useState([]);

  // Bước 1: Upload ảnh
  // Bước 2: Lấy ảnh về
  // Bước 3: Hiển thị ảnh

  // Tạo storage lưu trữ từ dịch vụ của firebase
  const imagesListRef = ref(storage, "images/");

  // Viết hàm upload
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };
  
  const [imgUploaded, setImgUploaded] = useState(false);

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  useEffect(() => {
    const loadUser = async () => {
      let response = await axios.get(`http://localhost:8000/users/${id}`);
      setUserInfo(response.data);
      setName(response.data.name);
      setUsername(response.data.username);
      setEmail(response.data.email);
    };
    loadUser();
  }, [id]);

  const handleSaveInfo = async () => {
    await axios.patch(`http://localhost:8000/users/${id}`, {
      ...userInfo,
      avatarUrl: imageUrls[imageUrls.length - 1],
    });
    alert("Thay doi thong tin thanh cong");
  };

  return (
    <div style={{ color: "white" }} className="saveInfo">
      <div className="container">
        <h1>Thay đổi thông tin cá nhân</h1>
        <table style={{ fontSize: 20, color: "#fff" }} className="tableMV">
          <tbody>
            <tr>
              <td style={{ paddingBottom: 20 }}>Tên người dùng: </td>
              <td style={{ paddingBottom: 20 }}>
                <input
                  type="text"
                  id="nameProduct"
                  style={{ outline: "none" }}
                  name="name"
                  className="inputMV"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <td style={{ paddingBottom: 20 }}>Username:</td>
              <td style={{ paddingBottom: 20 }}>
                <input
                  type="text"
                  id="priceProduct"
                  style={{ outline: "none" }}
                  name="username"
                  className="inputMV"
                  value={userInfo.username}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, username: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: 20 }}>Poster: </td>
              <td style={{ paddingBottom: 20 }}>
                <div>
                  {imgUploaded && (
                    <img
                      src={imageUrls[imageUrls.length - 1]}
                      alt="Last uploaded image"
                      height="200"
                    />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => {
                    uploadFile();
                    setImgUploaded(true);
                  }}
                >
                  Upload Image
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: 20 }}>Email: </td>
              <td style={{ paddingBottom: 20 }}>
                <input
                  type="text"
                  id="priceProduct"
                  style={{ outline: "none" }}
                  name="username"
                  className="inputMV"
                  value={userInfo.username}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, username: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttonChange">
          <button className="buttonSave" onClick={handleSaveInfo}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingUser;
