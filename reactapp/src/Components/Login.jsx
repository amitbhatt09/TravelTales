import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import baseUrl from '../apiConfig';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!validEmail.test(formData.email)) {
            formErrors.email = "Please enter a valid email.";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`${baseUrl}/login`, formData);
                const token = response.data.Token;
                console.log('Token:', token);

                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);
                const username = decodedToken.name;
                const role = decodedToken.role;

                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
                navigate('/home');
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                setErrors({ apiError: "Invalid email or password." });
            }
        }
    };

    return (
       
        <div class="login">
        <div className='login-container bo'>
            <div className='left-side'>

                <h1>Travel Tales</h1>
                <p>Welcome to Travel Tales, your gateway to exploring stunning travel destinations around the world. Discover curated itineraries and find your perfect gateway, and receive personalized recommendations tailored to your travel style and budget!</p>
            </div>
            <div className='right-side'>
                <h1>Login</h1>
                <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
                    <fieldset className="custom-fieldset">
                        <legend>Email Id</legend>
                        <div className="input-container">
                            <i className="bi bi-envelope-at-fill icon"></i> {/* Add 'icon' class */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                        <legend>Password</legend>
                        <div className="input-container">
                            <i className="bi bi-key-fill icon"></i> {/* Add 'icon' class */}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </fieldset>
                    {errors.apiError && <div className="text-danger">{errors.apiError}</div>}
                    <div className="btn-container">
                        <button type="submit">LOGIN</button>
                    </div>
                    
                </form>
                <h5>
                        <p>
                            Don't have an account?{' '}
                            <span className="linking" onClick={() => navigate('/signup')}>
                                Signup
                            </span>
                        </p>
                    </h5>
                </div>
            </div>
        </div>  
    );
};

export default Login;