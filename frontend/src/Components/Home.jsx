import React, { useEffect, useState } from "react";
import { getLoggedinUser, logoutUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  useEffect(() => {
    async function fetchLoggedinUser() {
      let fetchLoggedinUserRes = await getLoggedinUser();
        setuser(fetchLoggedinUserRes.data);
    
    }
    fetchLoggedinUser();
  }, []);

  async function handleLogout() {
    let logoutUserRes = await logoutUser();
    if (logoutUserRes.status === 200) {
        toast.success("Logout Success")
        localStorage.removeItem("token")
        navigate("/login")
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          Hello, {user && user.username}
        </h1>
        <span onClick={handleLogout} className="text-red-600 cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
}

export default Home;
