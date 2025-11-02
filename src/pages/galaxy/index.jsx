import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";
import { IoIosStar } from "react-icons/io";
import {
  TbRulerMeasure,
  TbTriangleSquareCircleFilled,
  TbWorldSearch,
} from "react-icons/tb";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import StarryBackground from "../../components/background";

const Galaxy = () => {
  const [galaxy, setGalaxy] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleGalaxy = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/galaxies/get-galaxies`
      );
      if (response.status === 200) {
        const newGalaxy = response.data.find((item) => item.id === id);
        setGalaxy(newGalaxy);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleGalaxy();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-950 to-stone-900 relative">
      <StarryBackground />
      <div className="w-full h-screen bg-black/60 z-[100] absolute flex items-center justify-center">
        {loading ? (
          <img
            src="/earth.png"
            className="w-[150px] animate-[spin_30s_linear_infinite]"
          />
        ) : (
          <div className="z-[100] w-full h-full p-4 md:p-6 flex flex-col gap-10 hover:shadow-[0_0_40px_cyan]/50 transition duration-500 overflow-hidden overflow-y-scroll">
            <p className="font-space text-slate-50 text-2xl">{galaxy?.name}</p>
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
                  <div className="w-1/2 h-[100px] p-2 border flex flex-col justify-center border-blue-600 bg-blue-600/10 rounded-2xl">
                    <div className="text-blue-600 flex items-center gap-2">
                      <TbWorldSearch className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">
                        Distance
                      </p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light text-[12px] lg:text-[14px]">
                      {galaxy?.distanceFromEarth}
                    </p>
                  </div>
                  <div className="w-1/2 p-2 h-[100px] flex flex-col justify-center border border-green-600 bg-green-600/10 rounded-2xl">
                    <div className="text-green-600 flex items-center gap-2">
                      <TbRulerMeasure className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">
                        Diameter
                      </p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light text-[12px] lg:text-[14px]">
                      {galaxy?.diameter}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                  <div className="w-1/2 p-2 h-[100px] flex flex-col justify-center border border-yellow-600 bg-yellow-600/10 rounded-2xl">
                    <div className="text-yellow-600 flex items-center gap-2">
                      <IoIosStar className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">Stars</p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light text-[12px] lg:text-[14px]">
                      {galaxy?.numberOfStars}
                    </p>
                  </div>
                  <div className="w-1/2 p-2 h-[100px] flex flex-col justify-center border border-purple-600 bg-purple-600/10 rounded-2xl">
                    <div className="text-purple-600 flex items-center gap-2">
                      <GiBackwardTime className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">
                        Discovered
                      </p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light text-[12px] md:text-[12px] lg:text-[14px]">
                      {galaxy?.discovered}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Galaxy;
