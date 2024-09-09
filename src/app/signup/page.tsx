"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <div>
      <h1 className="text-center mt-5 text-2xl">Signup</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-96 min-h-96 m-auto flex flex-col bg-slate-800 p-3 leading-loose rounded">
        <label htmlFor="username">Username</label>
        <input
          className="text-black"
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
        />

        <label htmlFor="username">Email</label>
        <input
          className="text-black"
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />

        <label htmlFor="username">Password</label>
        <input
          className="text-black"
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />

        <button
          className="bg-slate-600 mt-6 w-6/12 mx-auto text-white text-center"
          type="submit"
        >
          Signup
        </button>

        <div className="flex justify-center mt-5">
          <p className="">
            Already have an account?{" "}
            <span className="text-blue-600 ms-1">
              <Link href="/login">Login</Link>
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
