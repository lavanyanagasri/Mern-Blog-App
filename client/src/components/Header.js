import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { userinfo, setuserinfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userinfo => {
        setuserinfo(userinfo);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [setuserinfo]); // ✅ Added dependency

  function logout() {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setuserinfo(null);
    });
  }

  const user = userinfo?.user;

  return (
    <div className="flex justify-between pt-11 pb-10 items-center">
      <Link to="/">
        <h1 className="text-2xl font-medium">My Blog</h1>
      </Link>
      <nav>
        {user ? (
          <div className="space-x-2 flex items-center pl-12">
           
            <Link to="/create" className='w-44'>Create new post</Link>
            <button onClick={logout} className='w-20'>Logout</button>
          </div>
        ) : (
          <div className="space-x-12">
            <Link to="/login" className="text-lg font-medium">Login</Link>
            <Link to="/register" className="text-lg font-medium">Register</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
