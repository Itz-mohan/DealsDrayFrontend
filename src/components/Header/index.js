import { Height } from '@mui/icons-material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const header = location.pathname !== '/';

  const username = sessionStorage.getItem('username');

  return (
    <>
      {header && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
            color: '#081a53',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' /* Add box shadow */,
          }}
        >
          <img
            src='/images/logo.png'
            width='200px'
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          />

          <a
            style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Home
          </a>
          <a
            style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/employee')}
          >
            Employee
          </a>
          <a
            style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => window.location.replace('/')}
          >{`${username} - Logout`}</a>
        </div>
      )}
    </>
  );
}
