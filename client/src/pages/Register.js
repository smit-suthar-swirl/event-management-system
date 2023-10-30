import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { registerUser } from '../services/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData).then((res) => {
        dispatch(setUser(res.user));
        e.target.reset()
        toast.success(res.message)
        navigate("/")
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      })

    } catch (error) {
      console.error('Registration failed:', error);
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='row'>
      <div className='main_div col-lg-5 m-auto'>
        <div className='card p-4 mt-5'>
          <h2>Register here</h2>
          <hr />
          <form onSubmit={handleRegister}>
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
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Role</label>
              <select className='form-control' onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>

              </select>

            </div>

            <button type="submit" className="btn btn-primary float-right">
              Submit
            </button>
          </form>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
