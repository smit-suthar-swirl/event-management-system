import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { loginUser } from '../services/api';
import { Link, useNavigate } from "react-router-dom"
import { useIsAuthenticated } from '../utilFunctions';
import { toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch();
  const isAuthetiacate = useIsAuthenticated()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await loginUser(formData).then((res) => {
        dispatch(setUser(res.user));
        e.target.reset()
        toast.success(`Welcome back ${formData.username}`)
        navigate("/")
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      })
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  useEffect(() => {
    if (isAuthetiacate) {
      navigate("/")
    }
  }, [isAuthetiacate, navigate])


  return (
    <>
      <div className='row'>
        <div className='main_div col-lg-5 m-auto'>
          <div className='card p-4 mt-5'>
            <h2>Login here</h2>
            <hr />
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="Username"
                  placeholder="Enter username..."
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />

              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter password..."
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary float-right">
                Submit
              </button>
            </form>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
