import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdWarning } from "react-icons/md";
import StarryBackground from "../../components/background";
import { toast } from "sonner";

const DeleteAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🧨 Handle Account Deletion
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isConfirmed)
      return toast.error("Please confirm before deleting your account ❌");

    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/delete-profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Your account has been deleted successfully 🗑️");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to delete account ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-stone-900 via-blue-900 to-stone-900 overflow-hidden">
      <StarryBackground />

      {/* 🔴 Red & Cyan Glow Background */}
      <div className="absolute top-[10%] left-[10%] w-[200px] h-[200px] bg-red-500/30 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[180px] h-[180px] bg-cyan-400/20 blur-[120px] rounded-full"></div>

      {/* 🌌 Main Overlay */}
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center px-6 sm:px-10 py-12 z-10">
        <div className="relative w-full max-w-md bg-white/10 border border-red-400/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_25px_rgba(239,68,68,0.3)] backdrop-blur-md text-center">
          {/* ⚠️ Warning Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-red-500/20 p-4 rounded-full mb-3 text-red-400 text-4xl shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
              <MdWarning />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-red-400 font-space">
              Delete Account
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-sm">
              This action{" "}
              <span className="text-red-400 font-semibold">
                cannot be undone
              </span>
              . Once deleted, all your data will be permanently removed.
            </p>
          </div>

          {/* 🧾 Data Deletion Details */}
          <div className="text-left mt-4 mb-6">
            <p className="text-stone-300 text-[14px] sm:text-[15px] mb-3 font-space">
              The following will be erased forever:
            </p>
            <ul className="text-stone-300 text-sm font-space pl-6 space-y-2">
              {[
                "Your profile information",
                "Your quiz results and progress",
                "Your saved preferences or planets",
                "Your activity history",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Confirmation Section */}
          <form onSubmit={handleDelete} className="flex flex-col gap-4 mt-6">
            <label className="flex items-center gap-3 text-slate-200 text-sm sm:text-base cursor-pointer font-space">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
                className="w-4 h-4 accent-red-500 cursor-pointer"
              />
              I understand that my account and all data will be deleted
              permanently.
            </label>

            {/* 🧨 Delete Button */}
            <button
              type="submit"
              disabled={!isConfirmed || loading}
              className={`w-full py-3 rounded-xl font-semibold font-poppins transition duration-300 ${
                isConfirmed
                  ? "bg-red-500 hover:bg-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Deleting..." : "Delete My Account"}
            </button>

            {/* 🩵 Cancel Button */}
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="w-full py-3 bg-cyan-400/90 hover:bg-cyan-300 rounded-xl text-stone-900 font-semibold font-poppins transition duration-300 hover:scale-[1.02] shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              Cancel
            </button>
          </form>

          {/* ✨ Divider */}
          <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
          <p className="text-center text-stone-500 text-[13px] mt-3">
            Be cautious — this process is irreversible ❗
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
