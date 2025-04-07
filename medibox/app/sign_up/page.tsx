"use client";

import React, { useState } from "react";
import rdb from "@/lib/database";
import { ref, push, set, query, orderByChild, equalTo, get } from "firebase/database";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      const usersRef = ref(rdb, "users");
      const q = query(usersRef, orderByChild("email"), equalTo(email));
      const snapshot = await get(q);

      if (snapshot.exists()) {
        setError("Email already exists!");
        return;
      }

      // Add new user to Realtime Database
      const newUserRef = push(usersRef);
      await set(newUserRef, { email, password });

      // Create an empty schedule for the user
      const scheduleRef = ref(rdb, `schedule/${newUserRef.key}`);
      await set(scheduleRef, {});

      // Redirect to schedule page with userId as query parameter
      window.location.href = `/schedule?userId=${newUserRef.key}`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Error fetching users from DB:", err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://pplx-res.cloudinary.com/image/upload/v1741025174/user_uploads/HAIFgchUvKZQFQS/image.jpg')`,
      }}
    >
      <div className="flex justify-center items-center w-full backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
