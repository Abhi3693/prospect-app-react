import React from "react";
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-dark pt-4"> 
      <div className="container">
        <nav className="row">
          <span className="col col-5 col-sm-2 col-md-3 text-light fs-4">Logo</span>
          <div className="col col-7 col-sm-6 col-md-8">
            <ul className="d-flex justify-content-between">
              <li>
                <NavLink
                  to="/event"
                  className={({ isActive }) =>
                    isActive ? "btn btn-light" : "btn btn-purple"
                  }
                >
                  Trigger Event
                </NavLink>
              </li>
              <li>
                <NavLink to="/email">
                  {({ isActive }) => (
                    <span
                      className={
                        isActive ? "btn btn-light" : "btn btn-purple"
                      }
                    >
                      Email Template
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  {({ isActive }) => (
                    <span
                      className={
                        isActive ? "btn btn-light" : "btn btn-purple"
                      }
                    >
                      Prospect Set
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/compaign">
                  {({ isActive }) => (
                    <span
                      className={
                        isActive ? "btn btn-light" : "btn btn-purple"
                      }
                    >
                      Compaign
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="">
                <span className="btn btn-purple user d-flex gap-2 align-items-center">
                  <FaUserCircle className=""/>
                  User
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

  )
}

export default Header;