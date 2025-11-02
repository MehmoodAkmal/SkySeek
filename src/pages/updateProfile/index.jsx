import React, { useEffect, useState } from "react";
import StarryBackground from "../../components/background";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setFirstName(response.data.firstName || "");
        setLastName(response.data.lastName || "");
        setGender(response.data.gender || "");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to load profile ❌");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/edit-profile`,
        { firstName, lastName, gender },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully 🎉");
        navigate("/settings");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Update failed ❌");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-stone-900 via-blue-900 to-stone-900 overflow-hidden">
      <StarryBackground />

      {/* ✨ Glowing Orbs */}
      <div className="absolute top-[10%] left-[5%] w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] bg-cyan-400/20 blur-[120px] rounded-full animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[120px] sm:w-[180px] h-[120px] sm:h-[180px] bg-blue-500/20 blur-[100px] rounded-full animate-[pulse_8s_ease-in-out_infinite]"></div>

      {/* 🌌 Content Container */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-5 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16 z-10">
        {/* 🪐 Header */}
        <div className="text-center mb-10 sm:mb-12 px-2 py-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-space text-cyan-300 mb-3 drop-shadow-lg">
            Update Your Profile 🚀
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-[16px] max-w-md mx-auto">
            Keep your personal details shining bright among the stars ✨
          </p>
          <div className="w-20 sm:w-24 h-[2px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse"></div>
        </div>

        {/* 🌙 Profile Form Card */}
        <div className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-[500px] bg-gradient-to-b from-black/70 to-black/90 border border-cyan-400/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-md">
          {/* 🧑‍🚀 Avatar */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-[spin_8s_linear_infinite]"></div>
              <div className="h-[70px] w-[70px] sm:h-[80px] sm:w-[80px] rounded-full flex items-center justify-center bg-cyan-400/10 border border-cyan-300/40">
                <FaUserAstronaut className="text-cyan-300 text-2xl sm:text-3xl" />
              </div>
            </div>
          </div>

          {/* 🧾 Form */}
          <form
            onSubmit={updateProfile}
            className="flex flex-col gap-4 sm:gap-5 w-full"
          >
            <fieldset className="border border-cyan-400/30 bg-black/20 rounded-xl text-[13px] sm:text-[14px] px-3 focus-within:border-cyan-400 transition">
              <legend className="text-stone-400 px-2">First Name</legend>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter your first name"
                className="w-full outline-none px-3 sm:px-4 py-2 sm:py-2.5 text-slate-50 bg-transparent focus:ring-1 focus:ring-cyan-400 rounded transition"
              />
            </fieldset>

            <fieldset className="border border-cyan-400/30 bg-black/20 rounded-xl text-[13px] sm:text-[14px] px-3 focus-within:border-cyan-400 transition">
              <legend className="text-stone-400 px-2">Last Name</legend>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter your last name"
                className="w-full outline-none px-3 sm:px-4 py-2 sm:py-2.5 text-slate-50 bg-transparent focus:ring-1 focus:ring-cyan-400 rounded transition"
              />
            </fieldset>

            <fieldset className="border border-cyan-400/30 bg-black/20 rounded-xl text-[13px] sm:text-[14px] px-3 focus-within:border-cyan-400 transition">
              <legend className="text-stone-400 px-2">Gender</legend>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full outline-none px-3 sm:px-4 py-2 sm:py-2.5 text-slate-50 bg-transparent focus:ring-1 focus:ring-cyan-400 rounded transition"
              >
                <option className="text-black" value="">
                  Select Gender
                </option>
                <option className="text-black" value="Male">
                  Male
                </option>
                <option className="text-black" value="Female">
                  Female
                </option>
              </select>
            </fieldset>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 mt-2 bg-cyan-400/90 rounded-xl text-stone-900 font-semibold font-poppins hover:bg-cyan-300 transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
