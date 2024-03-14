import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './home.css';

const Home = () => {
    return (
        <div className='homeContainer'>
            <div className='sideBar'>sideBar</div>
            <div className='contentContainer'>
                <div className='navBar'>
                    <div className='buttonDiv'>

                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>
                        <button type="button">Cancel</button>
                        <button type="button">Save</button>
                        <button type="button">Publish</button>

                    </div>
                    </div>
                </div>
                <div className='mainContent'>
                    <div className='container'>container</div>
                    <div className='rightBar'>rightBar</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
