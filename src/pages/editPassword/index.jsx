import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import StarryBackground from "../../components/background";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import FloatingMenu from "../../components/floatingMenu";

const EditPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // ⚙️ Check Password Strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(newPassword);
  const strengthLabel =
    strength === 0
      ? ""
      : strength === 1
      ? "Weak ❌"
      : strength === 2
      ? "Fair ⚠️"
      : strength === 3
      ? "Good ✅"
      : "Strong 💪";

  const strengthColor =
    strength === 1
      ? "bg-red-500"
      : strength === 2
      ? "bg-yellow-500"
      : strength === 3
      ? "bg-green-400"
      : "bg-cyan-400";

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword)
      return toast.error("Please fill in both fields ❌");

    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters 🔒");

    if (strength < 3)
      return toast.error(
        "Password too weak. Try adding numbers, symbols, and uppercase letters ⚡"
      );

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match ❌");

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/updatePassword`,
        { newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully 🎉");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/settings");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to update password ❌");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-stone-900 via-blue-900 to-stone-900 overflow-hidden">
      <StarryBackground />
      <FloatingMenu />

      {/* 🩵 Overlay Section */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-6 sm:px-10 py-12 md:py-0 z-10">
        {/* 🩵 Glass Card */}
        <div className="relative w-full max-w-md bg-white/10 border border-cyan-400/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md">
          {/* 🔐 Icon Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="bg-cyan-400/20 p-4 rounded-full mb-4 text-cyan-400 text-3xl shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <FaLock />
            </div>
            <h1 className="font-space text-2xl sm:text-3xl font-bold text-cyan-300 mb-2">
              Update Password
            </h1>
            <p className="text-stone-400 text-sm sm:text-base max-w-xs">
              Keep your account safe by creating a strong and secure password.
            </p>
          </div>

          {/* 🩵 Form Section */}
          <form onSubmit={updatePassword} className="flex flex-col gap-4">
            <fieldset className="border border-cyan-400/30 bg-black/20 rounded-xl text-[14px] px-3 relative">
              <legend className="text-stone-400 px-2">New Password</legend>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full outline-none px-4 py-2 text-slate-50 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[50%] translate-y-[-30%] text-slate-400 hover:text-cyan-300 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </fieldset>

            {/* 🧠 Password Strength Bar */}
            {newPassword && (
              <div className="w-full mt-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[13px] text-stone-400 font-space">
                    Strength: {strengthLabel}
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strengthColor}`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <fieldset className="border border-cyan-400/30 bg-black/20 rounded-xl text-[14px] px-3 relative">
              <legend className="text-stone-400 px-2">Confirm Password</legend>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full outline-none px-4 py-2 text-slate-50 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-[50%] translate-y-[-30%] text-slate-400 hover:text-cyan-300 transition"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </fieldset>

            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-red-400 text-[13px] -mt-2 text-left">
                Passwords do not match
              </p>
            )}

            {/* 🌈 Button */}
            <button
              type="submit"
              className="w-full py-3 mt-3 bg-cyan-400/90 hover:bg-cyan-300 text-stone-900 font-semibold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] transition duration-300 font-space"
            >
              Save Changes
            </button>
          </form>

          {/* ✨ Subtle gradient line */}
          <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

          <p className="text-center text-stone-500 text-[13px] mt-4">
            Use at least 1 uppercase, 1 number, and 1 symbol 🔒
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
