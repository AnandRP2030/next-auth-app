"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
export default function UserProfile() {
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("res me", res);
      if (res.data.status === 200) {
        setUserData(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("Error on get user data: ", error);
    }
  };
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("logout resp", res);
      if (res.data.status === 200) {
        toast.success("Logout successful");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-between px-5 h-11 align-middle">
        <h1 className="mt-3">Profile Page </h1>
        <h2>Name: {userData?.username}</h2>
        <button onClick={logout} className="bg-red-600 w-36 ">
          Logout{" "}
        </button>
      </div>
    </>
  );
}
