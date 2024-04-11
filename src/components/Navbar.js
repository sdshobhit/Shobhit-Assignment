import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ token }) => {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className='flex justify-between items-center bg-red-800 h-24'>
    <div className='flex items-center'>
      
      <Link to='/dashboard'>
        <li className={`text-white mx-10 font-bold text-base list-none ${!localStorage.getItem('token') && 'cursor-not-allowed'}`} onClick={localStorage.getItem('token') ? null : (e) => e.preventDefault()}>
          Dashboard
        </li>
      </Link>
      
      
    </div>

    <ul className='m-5 p-4 flex cursor-pointer'>
{localStorage.getItem('token') ? (
  // If token is present, show Logout button and logged-in user name
  <>
    
    <li onClick={handleLogout} className='px-3 text-white font-bold text-base'>
      Logout
    </li>

    
  </>
) : (
  // If no token, show SignIn and SignUp buttons
  <>
    <Link to='/'>
      <li className='px-3 text-white font-bold text-base'>SignIn</li>
    </Link>
    <Link to='/SignUp'>
      <li className='px-3 text-white font-bold text-base'>SignUp</li>
    </Link>
  </>
)}
</ul>

  </div>
  );
};

export default Navbar;
