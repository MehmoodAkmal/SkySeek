import React, { useState } from "react";
import StarryBackground from "../../components/background";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        { email, password }
      );
      if (response.status === 200) {
        toast.success("Signin Successfully.");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-[url(/bg.jpg)] bg-cover bg-center overflow-hidden">
      {/* 🔥 Sun (unchanged position) */}
      <img
        src="/sun1.png"
        className="absolute -bottom-[650px] z-10 h-[1000px] object-cover"
        alt="Sun"
      />

      {/* 🔴 Radial Glow */}
      <div className="absolute h-[1100px] w-[1100px] z-0 bg-[radial-gradient(circle,rgba(159,47,6,1)_50%,rgba(159,47,6,0)_70%)] -bottom-[700px] rounded-full blur-[50px]"></div>

      {/* 🌌 Overlay & Stars */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
        <StarryBackground />
        <img
          src="/setlight.png"
          className="absolute z-20 top-6 right-6 sm:top-8 sm:right-8 h-16 sm:h-20 md:h-24 opacity-70"
          alt="light"
        />

        {/* 🪐 Login Form */}
        <form
          onSubmit={handleSignin}
          className="relative z-30 w-[90%] sm:w-[400px] bg-[rgba(0,0,0,0.7)] rounded-3xl border border-[#4182FF]/50 shadow-[0_0_25px_#4182FF70] backdrop-blur-md p-6 sm:p-8 flex flex-col gap-6 items-center text-white"
        >
          {/* 🌠 Header */}
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-[#4182FF] to-white bg-clip-text text-transparent font-space text-4xl sm:text-5xl font-bold mb-1">
              SkySeek
            </h1>
            <p className="text-slate-300 text-lg font-medium font-poppins">
              Get Login
            </p>
          </div>

          {/* 🧠 Inputs */}
          <div className="w-full flex flex-col gap-5">
            <fieldset className="relative w-full h-16 rounded-xl border border-gray-500 focus-within:border-[#4182FF] transition duration-300">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm">
                Email
              </legend>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-full px-4 bg-transparent text-white outline-none"
              />
            </fieldset>

            <fieldset className="relative w-full h-16 rounded-xl border border-gray-500 focus-within:border-[#4182FF] transition duration-300">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm">
                Password
              </legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-full px-4 bg-transparent text-white outline-none"
              />
            </fieldset>
          </div>

          {/* 🚀 Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-br from-[#042667] via-[#275ABD] to-[#4182FF] hover:from-[#4182FF] hover:via-[#275ABD] hover:to-[#042667] text-lg font-semibold transition-all duration-300 shadow-md shadow-[#4182FF]/40"
          >
            Login
          </button>

          {/* 📄 Footer */}
          <p className="text-slate-400 text-sm text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#4182FF] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
