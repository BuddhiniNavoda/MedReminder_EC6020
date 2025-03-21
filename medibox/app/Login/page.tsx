"use client";
import React from 'react';
import Link from 'next/link'

const Login = () => {
  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://pplx-res.cloudinary.com/image/upload/v1741025174/user_uploads/HAIFgchUvKZQFQS/image.jpg')` }}
    >
      {/* Login Form (Left Side) */}
      <div className="flex justify-center items-center w-1/2 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
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
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            

            <Link href="/fonts/TimeSchedule">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
