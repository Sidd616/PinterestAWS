import React from "react";
import { useAuth } from "react-oidc-context";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ signIn, signOut }) => {
  const auth = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <img src="/assets/pinterest_logo.png" alt="Pinterest" />
        </Link>

        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/explore" 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            Explore
          </NavLink>
        </div>

        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>

        <div className="navbar-actions">
          {auth.isAuthenticated ? (
            <>
              <h4>{`Hello, ${auth.user?.profile["cognito:username"]} `}</h4>
              <div className="icon-button">
                <FaBell />
              </div>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  isActive ? "profile-button active" : "profile-button"
                }
              >
                <FaUserCircle />
              </NavLink>
              <button className="sign-out-button" onClick={signOut}>
                Sign Out
              </button>
            </>
          ) : (
            <button className="sign-in-button" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;