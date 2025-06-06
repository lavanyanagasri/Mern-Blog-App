import React, { useState } from 'react';

const Register = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function register(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        setUser('');
        setPassword('');
      } else {
        setMessage(data.message || 'Registration failed.');
      }

    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred. Please try again.');
    }
  }

  return (
    <form onSubmit={register} className="flex flex-col items-center pt-12">
      <div className="w-full max-w-md space-y-6 px-8">
        <h1 className="text-center text-3xl font-semibold">Register</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user}
          onChange={e => setUser(e.target.value)}
          autoComplete="username"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Register
        </button>

        {message && <p className="text-center text-sm text-red-600">{message}</p>}
      </div>
    </form>
  );
};

export default Register;
