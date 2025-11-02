import React from "react";
import { FaChevronRight, FaUser } from "react-icons/fa";
import { MdDelete, MdEdit, MdLock, MdShield } from "react-icons/md";
import StarryBackground from "../../components/background";
import { Link } from "react-router-dom";
import FloatingMenu from "../../components/floatingMenu";

const Settings = () => {
  const settingsItems = [
    { title: "Edit Profile", icon: <MdEdit />, link: "/settings/profile" },
    {
      title: "Edit Password",
      icon: <MdLock />,
      link: "/settings/edit-password",
    },
    {
      title: "Delete Account",
      icon: <MdDelete />,
      link: "/settings/delete-account",
    },
    {
      title: "Privacy & Policies",
      icon: <MdShield />,
      external: true,
      link: "https://skyseek.dgexpense.com/deleteAccount",
    },
    { title: "About Us", icon: <FaUser />, link: "/settings/about-us" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-stone-900 via-blue-900 to-stone-900 overflow-hidden">
      <StarryBackground />
      <FloatingMenu />

      {/* ✨ Glowing floating circles */}
      <div className="absolute top-20 left-10 w-36 h-36 bg-cyan-400/20 blur-[100px] rounded-full animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/20 blur-[120px] rounded-full animate-[pulse_8s_ease-in-out_infinite]"></div>

      {/* 🟣 Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-start lg:justify-center px-6 py-12 md:py-16 lg:py-20 min-h-screen bg-black/70">
        {/* 🧭 Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space text-cyan-300 mb-3 drop-shadow-lg">
            Settings ⚙️
          </h1>
          <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Manage your profile, passwords, and privacy preferences. Keep your
            account secure and customized to your liking.
          </p>
          <div className="w-28 h-[2px] bg-cyan-400 mx-auto mt-5 rounded-full shadow-md"></div>
        </div>

        {/* 🧩 Settings Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-20">
          {settingsItems.map((item, i) =>
            item.external ? (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group border border-cyan-400/30 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center justify-between px-6 py-6 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-300 text-lg group-hover:bg-cyan-500/30 transition">
                    {item.icon}
                  </div>
                  <h1 className="text-slate-50 font-semibold text-[15px] sm:text-[16px]">
                    {item.title}
                  </h1>
                </div>
                <FaChevronRight className="text-stone-400 group-hover:text-cyan-300 transition" />
              </a>
            ) : (
              <Link
                key={i}
                to={item.link}
                className="group border border-cyan-400/30 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center justify-between px-6 py-6 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-300 text-lg group-hover:bg-cyan-500/30 transition">
                    {item.icon}
                  </div>
                  <h1 className="text-slate-50 font-semibold text-[15px] sm:text-[16px]">
                    {item.title}
                  </h1>
                </div>
                <FaChevronRight className="text-stone-400 group-hover:text-cyan-300 transition" />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
