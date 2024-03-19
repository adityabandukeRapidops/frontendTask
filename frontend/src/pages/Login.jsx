import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './login.css';
import {useNavigate} from 'react-router-dom'
import group from '../assets/Group.png'


const Login = () => {
    const navigate = useNavigate();

    

    useEffect(()=>{
        const uid = localStorage.getItem('uid');
    console.log(uid);
    if(uid){
        navigate('/dashboard')
    }
    },[])
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
            navigate('/dashboard')
            // You can handle success response here, such as redirecting to another page
        } catch (error) {
            console.error('Error occurred:', error);
            // You can handle error here, such as displaying an error message to the user
        }
    };

    return (
        // <div className='mainDiv'>
        //     <div className='title'>
        //         <p className='ptitle'>Rapidops Page Builder</p>
        //     </div>

        //     <form onSubmit={handleSubmit}>
        //         <div className="form-group">
        //             <label htmlFor="exampleInputEmail1">Email address</label>
        //             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleEmailChange} />
        //             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="exampleInputPassword1">Password</label>
        //             <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handlePasswordChange} />
        //         </div>
        //         <div className="form-check">
        //             <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        //             <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        //         </div>
        //         <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        //     </form>
        // </div>
        <div className='container mt-5'>
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-8">
                <div className=" justify-content-center text-center mb-4 py-3 " style={{display:'flex' , justifyContent : 'center' , alignItems:'center'}}>
                    <img src={group} className='img-fluid logo' alt=""  style={{display:'flex' ,width : '50px'}}/>
                    <h1>Rapid Page Builder</h1>
                </div>
                <form className='px-5 pb-3 grey-border ' style={{border:'1px solid #E5E7EB'}} onSubmit={handleSubmit}>
                    <h3 className='my-5 fs-2 '>Login</h3>
                   
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Username or email address <span className='text-danger'>*</span></label>
                        <input value={email} onChange={handleEmailChange} type="email" className="p-2 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email address' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span></label>
                        <input value={password} onChange={handlePasswordChange} type="password" className="p-2 form-control" id="exampleInputPassword1" autoComplete="on" placeholder='Enter password' />
                    </div>
                    
                    <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='text-primary'>privacy policy</span>.</p>
                    <div className="">
                        <button type="submit" className="btn bg-primary  my-4 ">Login</button>
                    </div>

                    
                </form>
            </div>
        </div>
    </div>

    );
};

export default Login;
