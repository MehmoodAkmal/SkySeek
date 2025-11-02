import React, { useState } from "react";
import StarryBackground from "../../components/background";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        { firstName, lastName, email, password, confirmPassword, gender }
      );
      if (responce.status === 201) {
        toast.success("User signup successfully.", {
          className: "space-toast space-toast-success",
        });
        localStorage.setItem("token", responce.data.token);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong", {
        className: "space-toast space-toast-success",
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-[url(/bg.jpg)] bg-cover overflow-hidden">
      <img
        src="/earth.png"
        className="absolute -bottom-50 md:-bottom-160 z-10 opacity-50 w-[1000px] md:w-[1000px]"
      />
      <div className="z-9 opacity-20 h-[1100px] w-[900px] bg-[radial-gradient(circle,rgba(65,130,255,1)_60%,rgba(65,130,255,0)_70%)] absolute -bottom-170"></div>

      <div className="relative min-h-screen w-full bg-[rgba(0,0,0,0.8)] flex items-center justify-center p-4">
        <StarryBackground />
        <img
          src="/setlight.png"
          className="absolute z-10 top-10 right-10 w-30 md:w-40 animate-[ping_s_linear_infinite] ease-in-out"
        />

        <form
          onSubmit={handleSignup}
          className="w-[800px] max-w-full sm:w-[90%] md:w-[700px] bg-[rgba(0,0,0,0.7)] z-100 rounded-2xl border border-[#4182FF] shadow-md shadow-[#4182FF]/50 flex flex-col md:flex-row items-center justify-center gap-6 py-6 px-7"
        >
          {/* Left Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="bg-gradient-to-r from-[#4182FF] to-white font-bold text-4xl text-transparent bg-clip-text py-2">
              SkySeek
            </h1>
            <p className="text-white font-semibold text-xl">
              Let’s create account
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Already have an account?
              <Link
                to="/login"
                className="text-[#4182FF] font-semibold ml-1 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <fieldset className="relative w-full h-16 rounded-xl border-2 border-gray-400 focus-within:border-[#4182FF] transition-colors duration-300 p-0">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm font-medium">
                First Name
              </legend>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full h-8 bg-transparent px-4 text-white outline-none text-sm sm:text-base"
              />
            </fieldset>

            <fieldset className="relative w-full h-16 rounded-xl border-2 border-gray-400 focus-within:border-[#4182FF] transition-colors duration-300 p-0">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm font-medium">
                Last Name
              </legend>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full h-8 bg-transparent px-4 text-white outline-none text-sm sm:text-base"
              />
            </fieldset>

            <fieldset className="relative w-full h-16 rounded-xl border-2 border-gray-400 focus-within:border-[#4182FF] transition-colors duration-300 p-0">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm font-medium">
                Email
              </legend>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-8 bg-transparent px-4 text-white outline-none text-sm sm:text-base"
              />
            </fieldset>

            <fieldset className="relative w-full h-16 rounded-xl border-2 border-gray-400 focus-within:border-[#4182FF] transition-colors duration-300 p-0">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm font-medium">
                Gender
              </legend>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-8 bg-transparent px-4 text-white outline-none text-sm sm:text-base"
              >
                <option className="text-slate-400" value="">
                  Select gender
                </option>
                <option className="text-slate-400" value="Male">
                  Male
                </option>
                <option className="text-slate-400" value="Female">
                  Female
                </option>
              </select>
            </fieldset>

            <fieldset className="relative w-full h-16 rounded-xl border-2 border-gray-400 focus-within:border-[#4182FF] transition-colors duration-300 p-0">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm font-medium">
                Password
              </legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-8 bg-transparent px-4 text-white outline-none text-sm sm:text-base"
              />
            </fieldset>

            <fieldset className="relative w-full h-16 rounded-xl border-2 border-gray-400 focus-within:border-[#4182FF] transition-colors duration-300 p-0">
              <legend className="mx-5 px-2 text-[#4182FF] text-sm font-medium">
                Confirm Password
              </legend>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full h-8 bg-transparent px-4 text-white outline-none text-sm sm:text-base"
              />
            </fieldset>

            <button
              type="submit"
              className="cursor-pointer w-full h-12 rounded-xl bg-gradient-to-bl from-[#042667] via-[#275ABD] to-[#4182FF] hover:from-[#4182FF] hover:via-[#275ABD] hover:to-[#042667] transition-all duration-400 text-lg sm:text-xl text-white font-medium"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
