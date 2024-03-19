import React, { useState } from 'react';
import axios from 'axios'
import group from '../assets/Group.png'

import {useNavigate} from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newsletter, setNewsletter] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username ,email , password)
        try {
            const res = await axios.post("https://backendtask-71g8.onrender.com/rapidops/api/users/signup", {
                name: username,
                email,
                password
            });
            console.log(res.data); 
            navigate('/login')// Assuming the response contains data
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
       

        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-8">
                <div className=" justify-content-center text-center mb-4 py-3 " style={{display:'flex' , justifyContent : 'center' , alignItems:'center'}}>
                    <img src={group} className='img-fluid logo' alt=""  style={{display:'flex' ,width : '50px'}}/>
                    <h1>Rapid Page Builder</h1>
                </div>
                    <form className='px-5 pb-3 grey-border ' style={{border:'1px solid #E5E7EB'}} onSubmit={handleSubmit}>
                        <h3 className='my-5 fs-2 '>Register</h3>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Full Name <span className='text-danger'>*</span></label>
                            <input value={username} onChange={handleUsernameChange} type="text" className="p-2 form-control" id="nameInput" autoComplete="on" placeholder='Enter Name' />
                        </div>
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label">Username or email address <span className='text-danger'>*</span></label>
                            <input value={email} onChange={handleEmailChange} type="email" className="p-2 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email address' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span></label>
                            <input value={password} onChange={handlePasswordChange} type="password" className="p-2 form-control" id="exampleInputPassword1" autoComplete="on" placeholder='Enter password' />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Subscribe to our newsletter</label>
                        </div>
                        <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='text-primary'>privacy policy</span>.</p>
                        <div className="">
                            <button type="submit" className="btn bg-primary  my-4 ">Register</button>
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
