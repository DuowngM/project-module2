import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import HistoryMyMovies from "./HistoryMovie/HistoryMyMovies";
import MyMovies from ".//MyMovie/MyMovies";
import NavbarHeader from "./Navbar/NavbarHeader";
import { Routes, Route } from "react-router-dom";
import SignIn from "./users/SignIn";
import SignUp from "./users/SignUp";
import ViewMovie from "./users/ViewMovie";
import WatchMovie from "./users/WatchMovie";
import AdminUser from "./users/Admin/AdminUser";
import AdminMovie from "./users/Admin/AdminMovie";
import AdminAddMv from "./users/Admin/AdminAddMv";
import SettingUser from "./users/SettingUser";
function App() {
  return (
    <>
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<HistoryMyMovies />} />
        <Route path="/mymovie" element={<MyMovies />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/setting/:id" element={<SettingUser />} />
        <Route path="/detailmovie/:id" element={<ViewMovie />} />
        <Route path="/watchmovie/:id" element={<WatchMovie />} />
        <Route path="/user/admin/users" element={<AdminUser />} />
        <Route path="/user/admin/movie" element={<AdminMovie />} />
        <Route path="/user/admin/addmovie" element={<AdminAddMv />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
