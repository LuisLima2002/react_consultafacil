import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
const Dashboard = () => {
  // State to keep track of the active section
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: '85px', height: '100vh' }}>
        <div className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
          {/* Sidebar Items */}
          {/* <button 
            className="btn btn-link text-white mb-3 align-items-center"
            onClick={() => setActiveSection('home')}
            style={{ width: '100%' }}
          >
            <FontAwesomeIcon icon={faHome} size="2x" />
          </button> */}

          <Link
            to="professional"
            className="btn btn-link text-white mb-3 align-items-center"
            style={{ width: '100%' }}
          >
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Link>

          <div className="mt-auto">
            {/* Settings Icon at the bottom */}
            <Link
              to="settings"
              className="btn btn-link text-white mb-3"
              style={{ width: '100%' }}
            >
              <FontAwesomeIcon icon={faCog} size="2x" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
