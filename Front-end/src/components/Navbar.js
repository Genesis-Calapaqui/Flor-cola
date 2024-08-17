import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar({ isLoggedIn, userType }) {
  
  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Registrarse
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && userType === "Admin" ? (
          <>
            <li className="nav-item">
              <Link to="/admin-dashboard" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/usuarios" className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sucursales" className="nav-link">
                Sucursales
              </Link>
            </li>
          </>
        ) : (
          isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/userDetails" className="nav-link">
                  User Details
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Product
                </Link>
              </li>
            </>
          )
        )}

        <li className="nav-item">
          <Link to="/about" className="nav-link">
            Acerca de
          </Link>
        </li>

        {isLoggedIn && (
          <li className="nav-item nav-item-logout">
            <button
              onClick={logOut}
              className="btn btn-primary"
            >
              Cerrar sesión
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
