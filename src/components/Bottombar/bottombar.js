import React, { useState } from 'react'
import { BsColumnsGap } from 'react-icons/bs'
import { IconContext } from "react-icons";
import Sidebar from "../Navbar/sidebar";

function Bottombar() {
    const [status, setStatus] = useState(false);

    const Show = () => {
        setStatus(status => !status)
    }

    return (
        <>
            <Sidebar show={status} Show={Show} />
            <div class="container-fluid d-flex d-lg-none fixed-bottom bg-light p-3">
                <div class="d-flex justify-content-center container-fluid">
                    <button type="button" class="btn btn-light">
                        <IconContext.Provider value={{ className: "shared-class", size: 30 }}>
                            <button className='btn' onClick={Show}>
                                <BsColumnsGap />
                            </button>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Bottombar