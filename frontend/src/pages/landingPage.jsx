import React from 'react';
import Sidebar from '../components/sidebar.jsx';
import './landingPage.css'
import girl from '../assets/girl.svg'
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="mainWrapper">
            <Sidebar />
            <div className='remainContainer'>
                <div className='card'>
                   
                    <div className='cardText'>
                        <p>No Pages Found</p>
                        <p className='subdesc'>Looks like you don't have any pages yet. Let's add a new page</p>
                        <button type="button" className='addButton' onClick={()=>{
                            navigate('/homePage')
                        }}>+ Add Page</button>
                    </div>
                    <div className='girlImage'>
                        <img src={girl} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
