// import React, { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaClock, FaHeart, FaRegCircle } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineVerticalAlignCenter } from "react-icons/md";
import { PiMountainsFill } from "react-icons/pi";
import { SlGraph } from "react-icons/sl";
import { TbRulerMeasure } from "react-icons/tb";
import { toast } from "sonner";

const Favourite = () => {
  const [list, setList] = useState([]);
  const [planet, setPlanet] = useState();

  const handleFavouritList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/get-favorite-planets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const favoritesWithFlag = response.data.favorites.map((p) => ({
          ...p,
          isFavorite: true,
        }));
        setList(favoritesWithFlag);
        setPlanet(favoritesWithFlag[0]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddFavourite = async (planetId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/add-to-favorite`,
        { planetId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
        setList((prev) =>
          prev.map((p) => (p.id === planetId ? { ...p, isFavorite: true } : p))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding favorite");
    }
  };

  const handleDeleteFavourite = async (planetId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/removeFavorite`,
        { planetId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
        setList((prev) =>
          prev.map((p) => (p.id === planetId ? { ...p, isFavorite: false } : p))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing favorite");
    }
  };

  useEffect(() => {
    handleFavouritList();
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-bl from-[#0B0C28] via-[#061a41] to-[#0B0C28]">
      {/* Overlaping Glass */}
      <div className="w-full h-full bg-black/70 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Left Card */}
        <div className="hidden md:block h-screen md:px-5 lg:px-10 py-5 col-span-1">
          {/* inner card */}
          <div className="w-full h-full overflow-hidden overflow-y-scroll flex flex-col gap-2 rounded-2xl border md:p-2 lg:p-4 border-cyan-400/20 shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_0_45px_rgba(34,211,238,0.5)] hover:border-cyan-400/60 transition-all duration-500 bg-[rgba(255,255,255,0.05)]">
            {/* Card content */}
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col items-start">
                <p className="font-space font-semibold text-2xl text-slate-50">
                  {planet?.name}
                </p>
                <p className="font-space font-extralight text-xs text-slate-50 bg-[#013C38] px-2 py-1 rounded-full text-center">
                  Terrestrial
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="w-full md:h-[160px] lg:h-[300px]">
              <div className="md:h-[140px] md:w-[140px] lg:h-[260px] lg:w-[260px] bg-green-950/20 rounded-full border border-[#013C38]/80 mx-auto flex items-center justify-center">
                <div className="md:h-[120px] md:w-[120px] lg:w-[240px] lg:h-[240px] rounded-full flex items-center justify-center border border-green-500/30">
                  <img
                    src={planet?.image}
                    className="md:w-[100px] lg:w-[240px] rounded-full animate-[spin_15s_linear_infinite]"
                  />
                </div>
              </div>
            </div>
            {/* Planet Details */}
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <TbRulerMeasure className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Planet:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.name}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <TbRulerMeasure className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Diameter:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.diameter}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <BiWorld className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Mass:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.mass}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <MdOutlineVerticalAlignCenter className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Gravity:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.gravity}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <FaArrowsRotate className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Rotational Period:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.rotation_period_days}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <FaClock className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Solar Day:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.solar_day_days}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <SlGraph className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[18px] font-poppins leading-3">
                    Orbital Period:{" "}
                    <span className="text-slate-50 text-[16px] font-poppins font-light">
                      {planet?.orbital_period_days}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <FaRegCircle className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[16px] font-poppins leading-3">
                    Symbol:{" "}
                    <span className="text-slate-50 text-[18px] font-poppins font-light">
                      {planet?.symbol}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center gap-3 bg-black/20 border border-white/10 px-3 py-3 rounded-xl">
                <PiMountainsFill className="text-cyan-300 text-xl" />
                <div>
                  <p className="text-slate-400 text-[16px] font-poppins leading-3">
                    Surface:{" "}
                    <span className="text-slate-50 text-[18px] lg:text-[16px] font-poppins leading-5">
                      {planet?.surface}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="h-screen col-span-1 lg:col-span-2 py-5 px-3 flex flex-col gap-3 overflow-y-scroll">
          {/* Heading */}
          <div className="w-full flex items-center gap-2">
            <div className="h-[20px] w-[3px] bg-cyan-400 rounded-full"></div>
            <p className="text-slate-50 font-semibold w-[335px] md:w-[300px] lg:w-[190px] font-space">
              My Favourit Planets
            </p>
            <div className="w-full h-[1px] bg-slate-400/50"></div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Favourit card */}
            {list.map((item, index) => (
              <div
                key={index}
                onClick={() => setPlanet(item)}
                className="relative flex items-center justify-center rounded-2xl border border-white/20 bg-[#042B20]/20 shadow-[0_0_10px_cyan]/20 p-3 overflow-hidden"
              >
                <div className="h-[100px] w-[100px] rounded-full border border-slate-400/30 -left-[30px] absolute"></div>
                {/* Card Image */}
                <div className="w-1/3 z-100">
                  <div className="mx-auto h-[90px] w-[90px] md:h-[100px] md:w-[100px] lg:h-[140px] lg:w-[140px] rounded-full flex items-center justify-center border border-[#054742]/50 ">
                    <div className="h-[80px] w-[80px] md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px] rounded-full flex items-center justify-center border border-[#039f68]/60 bg-[#039f68]/10">
                      <img
                        src={item.image}
                        className="w-[80px] md:w-[70px] lg:w-[110px]"
                      />
                    </div>
                  </div>
                </div>
                {/* Card content */}
                <div className="w-2/3 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-space text-slate-50 md:text-xl lg:text-2xl">
                        {item.name}
                      </p>
                      <p className="font-space text-slate-50 font-extralight text-[12px] bg-[#013C38] rounded-full px-2 py-1 ">
                        Terrestrial
                      </p>
                    </div>
                    {item.isFavorite ? (
                      <IoMdHeart
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFavourite(item.id);
                        }}
                        className="text-red-500 text-lg cursor-pointer"
                      />
                    ) : (
                      <IoMdHeartEmpty
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddFavourite(item.id);
                        }}
                        className="text-slate-400 text-lg cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="w-full bg-black/50 rounded-xl px-4 py-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <BiWorld className="text-slate-400 lg:text-xl" />
                      <p className="text-[14px] md:text-sm lg:text-md font-light font-poppins text-slate-400">
                        Position:{" "}
                        <span className="text-slate-50 md:text-sm lg:text-md font-light">
                          {item.position}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TbRulerMeasure className="text-slate-400 lg:text-xl" />
                      <p className="font-light font-poppins text-slate-400 text-[14px] md:text-sm lg:text-md">
                        Distance:{" "}
                        <span className="text-slate-50 font-light">
                          {item.distance_from_sun}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
