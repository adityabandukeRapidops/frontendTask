import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email , password)
        try {
            const response = await axios.post('http://localhost:8000/rapidops/api/users/signin', {
                email: email,
                password: password
            });

            console.log(response.data);
            console.log(response.data.data._id);
            localStorage.setItem('uid' , response.data.data._id);
            localStorage.setItem('token' , response.data.data.token);
            // You can handle success response here, such as redirecting to another page
        } catch (error) {
            console.error('Error occurred:', error);
            // You can handle error here, such as displaying an error message to the user
        }
    };

    return (
        <div className='mainDiv'>
            <div className='title'>
                <p className='ptitle'>Rapidops Page Builder</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default Login;
