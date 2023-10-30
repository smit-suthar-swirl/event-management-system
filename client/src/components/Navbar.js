import React from 'react'
import { Link } from 'react-router-dom'
import { useIsAuthenticated, useNavigateToPath, useRoleCheck } from '../utilFunctions'
import { logoutUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import logo from "../assets/Images/Logo.png"
const Navbar = () => {
  const isAuthetiacate = useIsAuthenticated()
  const role = useRoleCheck()
  const navigateTo = useNavigateToPath()
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
    toast.success("See you next time")
    navigateTo("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/" >
        <img alt='brand_log' src={logo} className='brand_logo' />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link to="/" className="nav-link" >
              Home
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/my-booked-events">
              Booked Events
            </Link>
          </li>
          {
            role === "admin" && isAuthetiacate && <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/admin/create-event" className="dropdown-item">
                  Create Event
                </Link>

                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/admin/events">
                  Events List
                </Link>

                <div className="dropdown-divider" />
                <Link className="dropdown-item">
                  User Management
                </Link>

              </div>
            </li>
          }

        </ul>
        <div className="form-inline my-2 my-lg-0">
          {/* <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> */}
          {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button> */}
          {
            isAuthetiacate ? <>

              <button className="btn btn-outline-light my-2 my-sm-0 mr-2 disable" disabled>
                {role.toUpperCase()}
              </button>
              <div className="dropdown">
                <img
                  alt="Profile pic"
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                  className="img_prifile_icon dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                />
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" to="/profile">
                    My Profile
                  </Link>
                  <hr />
                  <Link className="dropdown-item" to="/my-booked-events">
                    Booked Events
                  </Link>
                  <hr />
                  <span className="dropdown-item">
                    <button className="btn btn-outline-danger  my-sm-0" onClick={handleLogout}>
                      Logout
                    </button>
                  </span>
                </div>
              </div>


            </> : <>
              <Link to="/login">
                <button className="btn btn-outline-primary my-2 my-sm-0">
                  Login
                </button>
              </Link>
            </>
          }




        </div>
      </div>
    </nav >

  )
}

export default Navbar