import React, { useEffect, useState } from "react";
import "./WatchMovie.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rate } from "antd";

function WatchMovie() {
  const [movie, setMovie] = useState({});
  const [videoSrc, setVideoSrc] = useState("");
  const [rating, setRating] = useState(0);
  const flaguser = localStorage.getItem("flaguser");
  const { id } = useParams();
  const [totalRating, setTotalRating] = useState([]);
  const [avgRate, setAvgRate] = useState({ total: 0, count: 0 });
  const loadMovie = async () => {
    let result = await axios.get(`http://localhost:8000/results/${id}`);
    setMovie(result.data);
    setVideoSrc(result.data.src);
  };

  const [historyMovie, setHistoryMovie] = useState([]);
  const loadHistoryMovie = async () => {
    let history = await axios.get(`http://localhost:8000/historymovies`);
    setHistoryMovie(history);
  };
  useEffect(() => {
    loadHistoryMovie();
  }, []);

  const [pausedTime, setPausedTime] = useState(0);
  const handlePauseVideo = (event) => {
    setPausedTime(event.target.currentTime);
  };
  useEffect(() => {
    console.log(pausedTime);
  }, [pausedTime]);

  const handlePlayVideo = () => {};

  const loadRate = async () => {
    let ratemovies = await axios.get(`http://localhost:8000/ratemovies`);
    let filteredRatings = ratemovies.data.filter(
      (comment) => comment.movie_id === id
    );
    let totalRate = filteredRatings.reduce(
      (sum, comment) => sum + comment.rate,
      0
    );
    let userCount = filteredRatings.length;
    setTotalRating(filteredRatings);
    setAvgRate({ total: totalRate, count: userCount });
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (!flaguser) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }
    const commentText = event.target.comment.value;
    if (!commentText) {
      alert("Vui lòng nhập bình luận và đánh giá");
      return;
    }
    const newComment = { text: commentText, rating: rating };
    setRating(0);
    event.target.reset();
    try {
      await axios.post("http://localhost:8000/ratemovies", {
        movie_id: id,
        user_id: flaguser,
        rate: rating,
        comment: commentText,
      });
      console.log("Đã lưu đánh giá thành công");
      loadRate(); // Cập nhật lại danh sách bình luận sau khi thêm bình luận mới
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
    }
  };

  useEffect(() => {
    loadMovie();
    loadRate();
  }, []);
  // Tính trung bình sao
  const avgRateValue =
    avgRate.count === 0 ? 0 : Math.round(avgRate.total / avgRate.count);
  //-----------------------------------------------------------------------
  return (
    <>
      <div className="container" style={{ color: "white" }}>
        <h1>{movie.title}</h1>
        <div className="srcMovie">
          <video
            src={videoSrc}
            onPlay={handlePlayVideo}
            onPause={handlePauseVideo}
            controls
          ></video>
        </div>
      </div>
      <div className="comment" style={{ color: "white" }}>
        <div>
          <Rate allowHalf value={avgRateValue} disabled />
          <span>{`${avgRateValue}/5`}</span>
          <p>{`${avgRate.count} người đánh giá`}</p>
        </div>
        <h1>Bình luận</h1>
        <form onSubmit={handleSubmitComment}>
          <textarea
            name="comment"
            placeholder="Bình luận đê"
            cols="100"
            rows="3"
            style={{ color: "white" }}
          ></textarea>
          <Rate
            allowHalf
            value={rating}
            onChange={(value) => setRating(value)}
            style={{
              position: "relative",
              left: "10px",
            }}
          />
          <button type="submit" className="buttonCMT">
            Bình luận
          </button>
        </form>
        <div>
          {totalRating.map((comment, index) => (
            <div key={index}>
              <b>{comment.user_id} :</b>
              <p>{comment.comment}</p>
              <Rate
                allowHalf
                value={comment.rate}
                disabled
                style={{ position: "relative", top: "-20px" }}
              />
              <span>{comment.rate}/5</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WatchMovie;
