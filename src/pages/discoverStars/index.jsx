import React, { useEffect, useState } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import StarryBackground from "../../components/background";
import axios from "axios";
import { toast } from "sonner";
import { FaRegCircle, FaTemperatureHigh } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Stars = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState(null);
  const navigate = useNavigate();

  const getStars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/stars/get-stars`
      );
      console.log("🚀 ~ getListGalaxies ~ response:", response.data[0]);
      if (response.status === 200) {
        setList(response.data);
        setStars(response.data[0]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (id) => {
    navigate(`/star/${id}`);
  };

  useEffect(() => {
    getStars();
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-br from-stone-900 via-blue-500 to-stone-900 relative overflow-hidden">
      <StarryBackground />
      {loading ? (
        <div className="w-full h-screen bg-black/70 flex items-center justify-center">
          <img
            src="/earth.png"
            className="w-[150px] animate-[spin_30s_linear_infinite]"
          />
        </div>
      ) : (
        <div className="w-full h-screen bg-black/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Left side */}
          <div className="w-full md:p-6 lg:p-10 h-screen z-50 hidden md:block">
            <div className="w-full h-full p-4 md:p-6 flex flex-col gap-4 border border-cyan-400/80 shadow-[0_0_10px_cyan]/50 rounded-2xl hover:shadow-[0_0_40px_cyan]/50 transition duration-500 bg-stone-900/40 overflow-hidden overflow-y-scroll">
              <p className="font-space text-slate-50 text-2xl">{stars?.name}</p>
              <div className="w-full mx-auto rounded-xl flex items-center justify-center relative">
                <img src={stars?.image} className="w-full rounded-xl" />
              </div>
              <div className="w-full flex items-center justify-center gap-3 font-poppins text-white font-light bg-black/50 py-2 px-2 rounded-xl">
                <TbTriangleSquareCircleFilled className="text-3xl text-yellow-400" />
                <p className="text-stone-400 font-space text-[14px] w-[120px]">
                  Star Type
                </p>
                <p className="text-slate-50 font-space text-[14px]">
                  {stars?.type}
                </p>
              </div>
              <div className="w-full flex items-center justify-center rounded-2xl border p-3 border-yellow-600/50 bg-black/50 shadow-[0_0_10px_yellow]/20">
                <div className="w-1/3 flex flex-col items-center gap-1 justify-center font-poppins">
                  <FaTemperatureHigh className="text-yellow-500" />
                  <p className="text-[12px] font-light text-stone-400">Temp</p>
                  <p className="text-[14px] font-light text-slate-50 text-center">
                    {stars?.surfaceTemperature}
                  </p>
                </div>
                <div className="w-1/3 flex flex-col items-center gap-1 justify-center font-poppins">
                  <FaRegCircle className="text-blue-500" />
                  <p className="text-[12px] font-light text-stone-400">Size</p>
                  <p className="text-[14px] font-light text-slate-50 text-center">
                    {stars?.surfaceTemperature}
                  </p>
                </div>
                <div className="w-1/3 flex flex-col items-center gap-1 justify-center font-poppins">
                  <GiSandsOfTime className="text-cyan-500" />
                  <p className="text-[12px] font-light text-stone-400">Mass</p>
                  <p className="text-[14px] font-light text-slate-50 text-center">
                    {stars?.surfaceTemperature}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-slate-50 font-space text-[18px]">Overview</p>
                <div className="w-[50px] h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"></div>
                <div className="w-full rounded-xl border border-stone-400/30 p-2 text-[14px] mt-1 font-poppins font-light text-slate-50 bg-black/50">
                  {stars?.description}
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-slate-50 font-space text-[18px]">
                  Stellar Details
                </p>
                <div className="w-[50px] h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
                <div className="w-full rounded-xl border border-stone-400/30 p-2 text-[14px] mt-1 font-poppins font-light text-slate-50 bg-black/50">
                  <p className="text-stone-400">Distance from Earth:</p>
                  {stars?.distanceFromEarth}
                </div>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="md:col-span-1 lg:col-span-2 py-3 md:py-5 lg:py-10 px-3 md:px-2 z-[100] h-screen overflow-hidden overflow-y-scroll">
            <div className="w-full flex items-center gap-2">
              <div className="w-[4px] h-[30px] rounded-full bg-cyan-400"></div>
              <p className="text-slate-50 font-space md:text-lg lg:text-xl w-[230px] md:w-[260px] lg:w-[200px]">
                Explore Galaxies
              </p>
              <div className="w-full h-[1px] bg-slate-300"></div>
            </div>
            <div className="w-full grid md:grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-5 mt-3">
              {list.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      handleNavigation(item?.id);
                    } else {
                      setStars(item);
                    }
                  }}
                  className={`flex h-[120px] rounded-2xl items-center gap-7 bg-black/30 p-3 border ${
                    item.id === stars.id
                      ? "border-cyan-500/50 shadow-[0_0_10px_cyan]/20"
                      : "border-stone-500/50"
                  } `}
                >
                  <div className="w-1/3 h-full flex items-center justify-center">
                    <img
                      src={item?.image}
                      className="rounded-2xl h-full w-full object-center object-cover"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col gap-1.5">
                    <p className="text-slate-50 font-semibold md:text-[14px] lg:text-[16px] font-space">
                      {item?.name}
                    </p>
                    <p className="text-stone-400">{item?.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stars;
