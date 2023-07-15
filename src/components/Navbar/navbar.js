import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFilterLeft } from 'react-icons/bs'
import { IconContext } from "react-icons";
import Sidebar from "./sidebar";
import "./styles.css";

function Navbar() {
  // const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState(false);
  // const navigate = useNavigate();

  const Show = () => {
    setStatus(status => !status)
  }

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   navigate(`/news/search?keyword=${keyword}`);
  // };

  return (
    <nav className="navbar navbar-expand-lg bg-light bg-light" data-bs-theme="light">
      <Sidebar show={status} Show={Show} />
      <div className="container-fluid">
        <div className="d-flex w-100" id="navbarColor02">
          <div className="navbar-nav me-auto col d-none d-lg-flex">
            <IconContext.Provider value={{ className: "shared-class", size: 30 }}>
              <button className='btn' onClick={Show}>
                <BsFilterLeft />
              </button>
            </IconContext.Provider>
          </div>
          <Link className="navbar-brand container d-flex justify-content-center col-lg-6 m-auto" to="/">On Minute News</Link>
          <div className='col d-none d-lg-flex'></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
