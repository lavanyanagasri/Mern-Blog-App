import React, { useContext } from 'react'
import { useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';
const Login = () => {
  const [user,setuser]=useState('');
  const [password,setpassword]=useState('');
  const [redirect,setredirect]=useState(false);
  const {setuserinfo}=useContext(UserContext);
  async function login(e){
    e.preventDefault();
    const response=await fetch('http://localhost:4000/login',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, password }),
        credentials:'include',
    })

    if(response.ok){
      response.json().then(userinfo=>{
          setuserinfo(userinfo);
          setredirect(true);
      })
      
    }
  }

  if(redirect){
    return <Navigate to={'/'}
    />
  }
  return (
    <form onSubmit={login}>
    <div className='pt-12'>
      
    <div className='pl-72 pr-48 space-y-6'>
        <h1 className='text-center text-3xl font-semibold'>Login</h1>
     <input type='text' placeholder='Username'
       value={user}
       onChange={e=>setuser(e.target.value)}
     />
     <input type='password' placeholder='Password'
       value={password}
       onChange={e=>setpassword(e.target.value)}
     />
     <button>login</button>
    </div>
    </div>
    </form>
  )
}

export default Login
