import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {

  return (
    <footer className="page-footer font-small bg-dark">

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
            <li>
                <a href="mailto: softwaredevelopmentacademy@gmail.com">
                Contact-Us
                </a>
            </li>

            <li className="nav-item">
                <Link to="/bot" className="nav-link">
                    Chat-Bot
                </Link>
            </li>
        </ul>
      </div>
    </footer>
  );
}

