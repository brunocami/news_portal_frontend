import React from "react";
import { Link } from "react-router-dom";

const Items = ({Show}) => (
  <div className="container">
    <div className="row d-flex justify-content-between">
      <h5 className="col-auto d-flex align-items-center m-0">One Minute News</h5>
      <button className="btn col-2" onClick={Show}>X</button>
    </div>
    <ul className="list-group list-group-flush">
      <Link className=" list-group-item" to='/'>Home</Link>
      <Link className=" list-group-item" to='/news/ar'>Argentina</Link>
      <Link className=" list-group-item" to='/news/technology'>Tecnologia</Link>
    </ul>
  </div>
);

export default Items;
