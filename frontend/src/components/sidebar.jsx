import React from 'react';
import './sidebar.css'; // assuming sidebar.css contains your CSS styles for the sidebar
import groupImg from '../assets/Group.png';
import dashboardImg from '../assets/dashboard.png';
import contentImg from '../assets/content.png';
import notification from '../assets/notification.png'
import avatar from '../assets/avatar.png'

const Sidebar = () => {
  return (
    <div className='sideContainer'>
      <div className='upperLogos'>
        <div className="logo">
          <img src={groupImg} alt="Group Logo" />
        </div>
        <div className="logo">
          <img src={dashboardImg} alt="Dashboard Logo" />
        </div>
        <div className="logo">
          <img src={contentImg} alt="Content Logo" />
        </div>
      </div>
      <div className='lowerLogos'>
        <div className="logo">
          <img src={notification} alt="Group Logo" />
        </div>
        <div className="logo">
          <img src={avatar} alt="Dashboard Logo" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
