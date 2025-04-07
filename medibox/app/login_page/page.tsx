"use client";
import React, { useState } from 'react';
import rdb from "@/lib/database";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Query the users node to find the user
      const usersRef = ref(rdb, "users");
      const q = query(usersRef, orderByChild("email"), equalTo(email));
      const snapshot = await get(q);

      if (!snapshot.exists()) {
        setError("Invalid email or password.");
        return;
      }

      let userId = null;
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().password === password) {
          userId = childSnapshot.key;
        }
      });

      if (!userId) {
        setError("Invalid email or password.");
        return;
      }

      // Redirect to schedule page with userId as query parameter
      window.location.href = `/schedule?userId=${userId}`;
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://pplx-res.cloudinary.com/image/upload/v1741025174/user_uploads/HAIFgchUvKZQFQS/image.jpg')` }}
    >
      {/* Login Form (Left Side) */}
      <div className="flex justify-center items-center w-1/2 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
          
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
