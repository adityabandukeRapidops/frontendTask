import React from 'react';
import Sidebar from '../components/sidebar.jsx';
import './landingPage.css'

const LandingPage = () => {
    return (
        <div className="mainWrapper">
            <Sidebar />
            <div className='remainContainer'>
                <div className='card'>
                   
                    <div className='cardText'>
                        <p>No Pages Found</p>
                        <p className='subdesc'>Looks like you don't have any pages yet. Let's add a new page</p>
                        <button type="button">+ Add Page</button>
                    </div>
                    <div className='girlImage'>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
