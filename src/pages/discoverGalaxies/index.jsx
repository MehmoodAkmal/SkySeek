import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";
import { IoIosStar } from "react-icons/io";
import {
  TbRulerMeasure,
  TbTriangleSquareCircleFilled,
  TbWorldSearch,
} from "react-icons/tb";
import StarryBackground from "../../components/background";
import axios from "axios";
import { FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DiscoverGalaxies = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [galaxy, setGalaxy] = useState(null);
  const navigate = useNavigate();

  const getListGalaxies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/galaxies/get-galaxies`
      );
      console.log("🚀 ~ getListGalaxies ~ response:", response.data[0]);
      if (response.status === 200) {
        setList(response.data);
        setGalaxy(response.data[0]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (id) => {
    navigate(`/galaxy-details/${id}`);
  };

  useEffect(() => {
    getListGalaxies();
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-950 to-stone-900 relative overflow-hidden">
      <StarryBackground />
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <img
            src="/earth-19822_256.gif"
            className="animate-[spin_30s_linear_infinite]"
          />
        </div>
      ) : (
        <div className="w-full h-screen bg-black/70 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Left side */}
          <div className="w-full md:p-6 lg:p-10 h-screen z-50 hidden md:block">
            <div className="w-full h-full p-4 md:p-6 flex flex-col gap-6 border border-cyan-400/30 shadow-[0_0_10px_cyan]/50 rounded-2xl hover:shadow-[0_0_40px_cyan]/50 transition duration-500 bg-stone-500/10 overflow-hidden overflow-y-scroll">
              <p className="font-space text-slate-50 text-2xl">
                {galaxy?.name}
              </p>
              <div className="w-full flex items-center justify-center animate-[spin_50s_linear_infinite]">
                <div className="w-[200px] h-[200px] rounded-full flex items-center justify-center relative">
                  <div className="w-[10px] h-[10px] rounded-full absolute -top-5 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute -bottom-5 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute -left-5 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute -right-5 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute right-4 top-4 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute left-4 bottom-4 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute right-4 bottom-4 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <div className="w-[10px] h-[10px] rounded-full absolute left-4 top-4 shadow-[0_0_5px_white]/80 bg-white"></div>
                  <img
                    src={galaxy?.image}
                    className="w-[180px] h-[180px] shadow-[0_0_80px_cyan] rounded-full object-center"
                  />
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-3 font-poppins text-white font-light">
                <div className="w-1/2 flex items-center justify-center py-2 px-3 gap-2 rounded-full bg-cyan-600">
                  <TbTriangleSquareCircleFilled />
                  <p className="truncate">{galaxy?.type}</p>
                </div>
                <div className="w-1/2 text-slate-50 font-poppins font-light flex items-center justify-center py-2 px-3 gap-2 rounded-full bg-purple-600">
                  <FaLocationDot />
                  <p className="truncate">{galaxy?.constellation}</p>
                </div>
              </div>
              <div className="w-full rounded-2xl border p-3 border-blue-600/50 bg-blue-600/10 shadow-[0_0_10px_blue]/20">
                <p className="font-space text-slate-50 text-lg">
                  About this Galaxy
                </p>
                <p className="text-slate-200 font-extralight font-poppins text-[12px] text-justify">
                  {galaxy?.description}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-slate-50 font-space font-light text-xl">
                  Galaxy Statistics
                </p>
                <div className="flex flex-col gap-3">
                  <div className="w-full flex items-center justify-center gap-3">
                    <div className="w-[60%] h-[100px] p-2 border flex flex-col justify-start gap-2 border-blue-600 bg-blue-600/10 rounded-2xl">
                      <div className="text-blue-600 flex items-center gap-2">
                        <TbWorldSearch className="text-2xl" />
                        <p className="font-space font-bold text-[18px]">
                          Distance
                        </p>
                      </div>
                      <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                        {galaxy?.distanceFromEarth}
                      </p>
                    </div>
                    <div className="w-[40%] p-2 h-[100px] flex flex-col justify-start gap-2 border border-green-600 bg-green-600/10 rounded-2xl">
                      <div className="text-green-600 flex items-center gap-2">
                        <TbRulerMeasure className="text-2xl" />
                        <p className="font-space font-bold text-[18px]">
                          Diameter
                        </p>
                      </div>
                      <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                        {galaxy?.diameter}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center gap-3">
                    <div className="w-[40%] p-2 h-[100px] flex flex-col justify-start gap-2 border border-yellow-600 bg-yellow-600/10 rounded-2xl">
                      <div className="text-yellow-600 flex items-center gap-2">
                        <IoIosStar className="text-2xl" />
                        <p className="font-space font-bold text-[18px]">
                          Stars
                        </p>
                      </div>
                      <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                        {galaxy?.numberOfStars}
                      </p>
                    </div>
                    <div className="w-[60%] p-2 h-[100px] flex flex-col justify-start gap-2 border border-purple-600 bg-purple-600/10 rounded-2xl">
                      <div className="text-purple-600 flex items-center gap-3">
                        <GiBackwardTime className="text-2xl" />
                        <p className="font-space font-bold text-[18px]">
                          Discovered
                        </p>
                      </div>
                      <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                        {galaxy?.discovered}
                      </p>
                    </div>
                  </div>
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
            <div className="w-full grid md:grid-cols-1 gap-3 lg:grid-cols-2 mt-3">
              {list.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      handleNavigation(item?.id);
                    } else {
                      setGalaxy(item);
                    }
                  }}
                  className={`flex h-[180px] rounded-2xl items-center gap-7 bg-black/30 p-3 border ${
                    galaxy.id === item.id
                      ? "border-cyan-400/50 shadow-[0_0_10px_cyan]/20 bg-cyan-400/5 transition duration-500"
                      : "border-stone-500/50"
                  }`}
                >
                  <div className="w-1/3 h-full">
                    <img
                      src={item?.image}
                      className="rounded-2xl h-full object-center object-cover"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col gap-1.5">
                    <p className="text-slate-50 font-semibold md:text-[14px] lg:text-[16px] font-space">
                      {item?.name}
                    </p>
                    <p className="flex items-center gap-3 text-slate-300 font-poppins font-light text-[12px] lg:text-[14px]">
                      <span>
                        <TbTriangleSquareCircleFilled className="text-[16px] text-stone-400" />
                      </span>{" "}
                      {item?.type}
                    </p>
                    <p className="flex items-center gap-3 text-slate-300 font-poppins font-light text-[12px] lg:text-[14px]">
                      <span>
                        <FaLocationDot className="text-[16px] text-stone-400" />
                      </span>{" "}
                      {item?.constellation}
                    </p>
                    <p className="flex items-center gap-3 text-slate-300 font-poppins font-light text-[12px] lg:text-[14px]">
                      <span>
                        <TbRulerMeasure className="text-[16px] text-stone-400" />
                      </span>{" "}
                      {item?.diameter}
                    </p>
                    <p className="flex items-center gap-3 text-slate-300 font-poppins font-light text-[10px] mt-2 font-">
                      <span>
                        <FaCompass className="text-[16px] text-stone-400" />
                      </span>{" "}
                      Tap to explore
                    </p>
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

export default DiscoverGalaxies;
