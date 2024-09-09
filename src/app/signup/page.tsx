"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from 'react-hot-toast';

const Signup = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  useEffect(() => {
    const { username, email, password } = userDetails;
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
    
    console.log("userDetails", userDetails);
    try {
        const res = await axios.post("/api/users/signup", userDetails);
        if (res.status === 200) {
            toast.success("Registration successfull")
            router.push("/login");
        }
        console.log('res', res)
    } catch (error) {
        console.log("Error on signup", error);
    }
  };
  return (
    <div>
      <h1 className="text-center mt-5 text-2xl">Signup</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-96 min-h-96 m-auto flex flex-col bg-slate-800 p-3 leading-loose rounded"
      >
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
          disabled={isBtnDisabled}
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
