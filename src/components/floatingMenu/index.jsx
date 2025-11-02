import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { IoMdHeart, IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const FloatingMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      to: "/home",
      icon: <BiWorld className="text-md" />,
      gradient: "from-sky-500 to-blue-700",
      shadow: "shadow-[0_0_8px_skyblue]",
    },
    {
      to: "/favourit",
      icon: <IoMdHeart className="text-md" />,
      gradient: "from-pink-500 to-pink-700",
      shadow: "shadow-[0_0_8px_pink]",
    },
    {
      to: "/settings",
      icon: <IoMdSettings className="text-md" />,
      gradient: "from-green-500 to-green-700",
      shadow: "shadow-[0_0_8px_green]",
    },
    {
      to: "/profile",
      icon: <FaUser className="text-md" />,
      gradient: "from-purple-500 to-purple-700",
      shadow: "shadow-[0_0_8px_purple]",
    },
  ];

  return (
    <div className="flex w-full py-3 bg-black border-0 border-t border-gray-400/10 bottom-0 lg:flex-col text-white absolute md:w-[240px] lg:w-auto lg:h-[240px] items-center justify-evenly md:justify-between md:px-6 md:py-3 lg:px-3 lg:py-6 md:border md:border-cyan-400/20 md:bg-black/30 md:bottom-20 lg:bottom-10 lg:left-10 z-[1100] md:rounded-full">
      {menuItems.map((item, i) => (
        <Link
          key={i}
          to={item.to}
          className={`bg-gradient-to-br ${item.gradient} ${
            item.shadow
          } h-[30px] w-[30px] rounded-full flex items-center justify-center transition-all duration-300 ${
            currentPath === item.to ? "scale-110 ring-2 ring-cyan-300" : ""
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default FloatingMenu;
