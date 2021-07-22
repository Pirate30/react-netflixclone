import React, { useEffect, useState } from 'react';
import './Navbar.css'

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                handleShow(true);
            }else{
                handleShow(false);
            }
        });
        return ()=>{
            window.removeEventListener("scroll");
        }
    },[])

    return (
        <div className={`navbar ${show && "navbar_black"}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
                alt="netflix logo"
            />
            <img
            className="nav__avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="nav avatar logo"
            />
        </div>
    )
}

export default Navbar
