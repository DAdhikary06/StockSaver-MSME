import React from "react";
import { Link } from "react-router-dom";
import Config from "../utils/Config";
// import MainComponent from "./MainComponent";

function Navbar({ setSidebarOpen,lowStockMedicines}) {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a
          className="sidebar-toggle js-sidebar-toggle"
          onClick={() => setSidebarOpen((prevState) => !prevState)}
        >
          <i className="hamburger align-self-center"></i>
        </a>

        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
            
             {/* Notification Feature */ }
            <li className="nav-item dropdown">
              <a
                className="nav-icon dropdown-toggle show"
                href="#"
                id="alertsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <div className="position-relative">
                <i className="bi bi-bell"></i>
                  <span className="indicator">{lowStockMedicines.length}</span>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <div className="list-group">
                  {lowStockMedicines.length === 0 ? (
                    <div className="list-group-item">No notifications</div>
                  ) : (
                    lowStockMedicines.map((medicine, index) => (
                      <Link to={'/manageMedicine'} className="list-group-item" key={index}>
                        <div className="row g-0 align-items-center">
                          <div className="col-10">
                            <div className="text-dark">{medicine.name}</div>
                            <div className="text-muted small mt-1">
                              Only {medicine.in_stock_total} left in stock.
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
                {/* <div className="dropdown-menu-footer">
                  <a href="#" className="text-muted">
                    Show all notifications
                  </a>
                </div> */}
              </div>
            </li>
            <li className="nav-item">
              <Link to={Config.logoutUrl}>
                <button className="btn btn-outline-danger"> Logout</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
