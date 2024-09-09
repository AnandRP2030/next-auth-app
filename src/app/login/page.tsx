"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
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
  };
  return (
    <div>
      <h1 className="text-center mt-5 text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-96 min-h-96 m-auto flex flex-col bg-slate-800 p-3 leading-loose rounded"
      >
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
          Login
        </button>

        <div className="flex justify-center mt-5">
          <p className="">
            Dont't have an account?{" "}
            <span className="text-blue-600 ms-1">
              <Link href="/signup">Signup</Link>
            </span>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
