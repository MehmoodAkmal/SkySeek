import React, { useEffect, useState } from "react";
import { FaUser, FaMars, FaEnvelope, FaGlobe, FaRocket } from "react-icons/fa";
import StarryBackground from "../../components/background";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("🚀 ~ getProfile ~ response:", response);
      if (response.status === 200) setUser(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      toast.success("Logout successfully.");
      navigate("/login");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-bl from-stone-900 via-blue-950 to-black text-white overflow-hidden flex items-center justify-center">
      <StarryBackground />

      {/* 🌌 Main Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 py-12 w-full max-w-6xl overflow-hidden">
        {/* 🪐 Profile Card */}
        <div className="w-full sm:w-[380px] md:w-[350px] bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-cyan-500/20 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_25px_#00ffff40] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_35px_#00ffff60]">
          {/* 🧑 Avatar */}
          <div className="relative">
            {user?.gender === "Male" ? (
              <img
                src="/male.png"
                alt="User Avatar"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#00ffff60] object-cover"
              />
            ) : (
              <img
                src="/femal.png"
                alt="User Avatar"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#00ffff60] object-cover"
              />
            )}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-black rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold font-space flex items-center justify-center gap-2 mt-4">
            <FaGlobe className="text-cyan-400" />
            {user?.firstName + " " + user?.lastName}
          </h2>

          <p className="text-gray-300 mt-1 flex items-center justify-center gap-2 text-sm">
            <FaEnvelope className="text-cyan-400" /> {user?.email}
          </p>

          <button className="mt-5 bg-cyan-600 hover:bg-cyan-500 text-sm font-medium px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-[0_0_15px_#00ffff50]">
            <FaRocket /> Space Explorer
          </button>
        </div>

        {/* 🌠 Profile Details Card */}
        <div className="w-full sm:w-[400px] md:w-[450px] bg-gradient-to-br from-gray-900/50 to-slate-900/50 border border-cyan-400/10 rounded-3xl p-8 shadow-[0_0_25px_#00ffff25] backdrop-blur-md">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-5 border-b border-cyan-500/20 pb-2">
            <FaUser className="text-cyan-400" /> Profile Details
          </h3>

          <div className="flex flex-col gap-4">
            {/* 🩵 First Name */}
            <div className="flex items-center bg-gradient-to-r from-blue-950 to-blue-900 rounded-xl px-4 py-3 border border-cyan-500/20">
              <FaUser className="text-cyan-400 text-lg" />
              <div className="ml-3">
                <p className="text-xs text-gray-400">First Name</p>
                <p className="font-semibold text-white">{user.firstName}</p>
              </div>
            </div>

            {/* 🩵 Last Name */}
            <div className="flex items-center bg-gradient-to-r from-cyan-950 to-cyan-900 rounded-xl px-4 py-3 border border-cyan-500/20">
              <FaUser className="text-cyan-400 text-lg" />
              <div className="ml-3">
                <p className="text-xs text-gray-400">Last Name</p>
                <p className="font-semibold text-white">{user.lastName}</p>
              </div>
            </div>

            {/* 🩵 Gender */}
            <div className="flex items-center bg-gradient-to-r from-blue-950 to-blue-900 rounded-xl px-4 py-3 border border-cyan-500/20">
              <FaMars className="text-cyan-400 text-lg" />
              <div className="ml-3">
                <p className="text-xs text-gray-400">Gender</p>
                <p className="font-semibold text-white">{user.gender}</p>
              </div>
            </div>

            {/* 🩵 Email */}
            <div className="flex items-center bg-gradient-to-r from-cyan-950 to-cyan-900 rounded-xl px-4 py-3 border border-cyan-500/20">
              <FaEnvelope className="text-cyan-400 text-lg" />
              <div className="ml-3">
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-semibold text-white break-all">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* 🔴 Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_#ff3b3b80]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
