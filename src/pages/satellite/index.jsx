import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import {
  TbRulerMeasure,
  TbTriangleSquareCircleFilled,
  TbWorldSearch,
} from "react-icons/tb";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import StarryBackground from "../../components/background";

const Satellite = () => {
  const [satellite, setSatellite] = useState();
  const { id } = useParams();

  const handleSatellites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/satellites/get-satellites`
      );
      if (response.status === 200) {
        const newSatellite = response.data.find((item) => item.id === id);
        console.log("🚀 ~ handleSatellites ~ newSatellite:", newSatellite);
        setSatellite(newSatellite);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (id) {
      handleSatellites();
    }
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-950 to-stone-900 relative">
      <StarryBackground />
      <div className="w-full h-screen overflow-hidden overflow-y-scroll bg-black/50 absolute z-[100]">
        <div className="w-full md:p-6 lg:p-10 h-screen z-50">
          <div className="w-full h-full p-4 md:p-6 flex flex-col gap-8 overflow-hidden overflow-y-scroll">
            <p className="font-space text-slate-50 text-2xl">
              {satellite?.name}
            </p>
            <div className="w-full flex items-center justify-center relative">
              <img
                src="/earth.png"
                className="absolute w-[100px] h-[100px] rounded-full object-center"
              />
              <div className="w-[200px] h-[200px] rounded-full flex items-center justify-center border border-gray-50/50 relative animate-[spin_30s_linear_infinite]">
                <img
                  src={satellite?.image}
                  className="w-[120px] absolute -right-[60px]"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-3 font-poppins text-white font-light">
              <div className="w-1/2 flex items-center justify-center py-2 px-3 gap-2 rounded-full bg-yellow-700">
                <TbTriangleSquareCircleFilled className="text-2xl" />
                <p className="truncate text-[14px]">{satellite?.type}</p>
              </div>
              <div className="w-1/2 text-slate-50 font-poppins font-light flex items-center justify-center py-2 px-3 gap-2 rounded-full bg-purple-600">
                <FaLocationDot className="text-lg" />
                <p className="truncate text-[14px]">{satellite?.launchedBy}</p>
              </div>
            </div>
            <div className="w-full rounded-2xl border p-3 border-blue-600/50 bg-blue-600/10 shadow-[0_0_10px_blue]/20">
              <p className="font-space text-slate-50 text-lg">
                About this Galaxy
              </p>
              <p className="text-slate-200 font-extralight font-poppins text-[12px] text-justify">
                {satellite?.description}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-slate-50 font-space font-light text-xl">
                Galaxy Statistics
              </p>
              <div className="flex flex-col gap-3">
                <div className="w-full flex items-center justify-center gap-3">
                  <div className="w-1/2 h-[100px] p-2 border flex flex-col justify-center border-yellow-600 bg-yellow-600/10 rounded-2xl">
                    <div className="text-yellow-600 flex items-center gap-2">
                      <TbWorldSearch className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">
                        Launch Date
                      </p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                      {satellite?.launchDate}
                    </p>
                  </div>
                  <div className="w-1/2 p-2 h-[100px] flex flex-col justify-center border border-blue-600 bg-blue-600/10 rounded-2xl">
                    <div className="text-blue-600 flex items-center gap-2">
                      <TbRulerMeasure className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">
                        Orbit Altitude
                      </p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                      {satellite?.orbitAltitude}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                  <div className="w-1/2 p-2 h-[100px] flex flex-col justify-center border border-green-600 bg-green-600/10 rounded-2xl">
                    <div className="text-green-600 flex items-center gap-2">
                      <GiSandsOfTime className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">Mass</p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                      {satellite?.mass}
                    </p>
                  </div>
                  <div className="w-1/2 p-2 h-[100px] flex flex-col justify-center border border-purple-600 bg-purple-600/10 rounded-2xl">
                    <div className="text-purple-600 flex items-center gap-2">
                      <TbTriangleSquareCircleFilled className="text-2xl" />
                      <p className="font-space font-bold text-[18px]">Type</p>
                    </div>
                    <p className="text-slate-50 font-poppins font-light md:text-[12px] lg:text-[14px]">
                      {satellite?.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Satellite;
