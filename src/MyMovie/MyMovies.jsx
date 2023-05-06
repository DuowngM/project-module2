import Table from "react-bootstrap/Table";
import React from "react";

function MyMovies() {
  return (
    <div className="container" style={{ color: "white" }}>
      <h1>Phim yêu thích của bạn</h1>
      <Table style={{ color: "white" }}>
        <thead>
          <tr className="bg-dark text-white">
            <th>ID phim</th>
            <th>Poster</th>
            <th>Title phim</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
}

export default MyMovies;
