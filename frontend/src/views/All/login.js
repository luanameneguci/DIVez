import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../All/UserContext';
import logo from '../../images/logo-navbar.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('buyer');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) =>
        user.userEmail === email.trim() &&
        user.userPassword === password.trim() &&
        ((accountType === 'buyer' && user.idAccountType === 2) ||
          (accountType === 'manager' && user.idAccountType === 3) ||
          (accountType === 'admin' && user.idAccountType === 1))
    );

    if (foundUser) {
      console.log('Successful login:', foundUser);
      updateUser(foundUser.idUser, accountType);

      switch (accountType) {
        case 'buyer':
          navigate('/buyer-dashboard');
          break;
        case 'manager':
          navigate('/manager-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <section className="gradient-form d-flex align-items-center" style={{ height: '100vh' }}>
      <div className="container py-5 h-100 my-auto">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10 shadow roundbg px-0">
            <div className="text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} style={{ width: '185px' }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">We are The Divez Team</h4>
                    </div>

                    <form onSubmit={handleLogin}>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          name="password"
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>

                      <div className="col-12">
                        <p>Type of account</p>
                        <div>
                          <input
                            type="radio"
                            id="buyer"
                            name="type"
                            value="buyer"
                            checked={accountType === 'buyer'}
                            onChange={(e) => setAccountType(e.target.value)}
                          />
                          <label htmlFor="buyer" className="form-label">
                            Buyer
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="manager"
                            name="type"
                            value="manager"
                            checked={accountType === 'manager'}
                            onChange={(e) => setAccountType(e.target.value)}
                          />
                          <label htmlFor="manager" className="form-label">
                            Manager
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="admin"
                            name="type"
                            value="admin"
                            checked={accountType === 'admin'}
                            onChange={(e) => setAccountType(e.target.value)}
                          />
                          <label htmlFor="admin" className="form-label">
                            Admin
                          </label>
                        </div>
                      </div>

                      {error && <p className="text-danger">{error}</p>}

                      <div className="text-center pt-1 mb-5 pb-1 col-12">
                        <button className="btn btn-info btn-block fa-lg text-white hover col-12" type="submit">
                          <strong>Log in</strong>
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/register">
                          <button type="button" className="btn btn-outline-info hover">
                            Create new
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center Gradient roundbg shadow">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Divez is a leading provider of application development and management services. We specialize
                      in creating customized applications tailored to meet the unique needs of businesses and
                      individuals. Our comprehensive services ensure that clients not only receive high-quality
                      applications but also benefit from expert management and support to optimize their software use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
