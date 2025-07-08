import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import "../components/Navbar.css"
import Logo from "../assets/log.png"


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return(
            <nav className='Navbar'>
                <img src={Logo} alt='Logo' className='Logodesign'/>
                
                <div className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/" activeclassname="active" onClick={closeMenu}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeclassname="active" onClick={closeMenu}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events" activeclassname="active" onClick={closeMenu}>Events</NavLink>
                    </li>
                </ul>
            </nav>

    );
};

export default Navbar;

