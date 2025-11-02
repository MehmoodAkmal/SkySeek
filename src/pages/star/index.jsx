import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegCircle, FaTemperatureHigh } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import StarryBackground from "../../components/background";

const Star = () => {
  const [star, setStar] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getStar = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/stars/get-stars`
      );
      if (response.status === 200) {
        const newSatellite = response.data.find((item) => item.id === id);
        console.log("🚀 ~ handleSatellites ~ newSatellite:", newSatellite);
        setStar(newSatellite);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getStar();
    }
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-950 to-stone-900 relative">
      <StarryBackground />
      <div className="w-full h-screen overflow-hidden overflow-y-scroll bg-black/50 absolute z-[100] flex items-center justify-center">
        {loading ? (
          <img
            src="/earth.png"
            className="w-[120px] animate-[spin_30s_linear_infinite]"
          />
        ) : (
          <div className="w-full md:p-6 lg:p-10 h-screen z-50 md:block">
            <div className="w-full h-full p-4 md:p-6 flex flex-col gap-3 hover:shadow-[0_0_40px_purple]/50 transition duration-500 bg-stone-900/40 overflow-hidden overflow-y-scroll">
              <p className="font-space text-slate-50 text-2xl">{star?.name}</p>
              <div className="w-full h-[250px] mx-auto rounded-xl flex items-center justify-center relative">
                <img
                  src={star?.image}
                  className="h-[250px] w-full object-center object-cover rounded-xl"
                />
              </div>
              <div className="w-full flex items-center justify-center gap-3 font-poppins text-white font-light bg-black/50 py-2 px-2 rounded-xl">
                <TbTriangleSquareCircleFilled className="text-3xl text-yellow-400" />
                <p className="text-stone-400 font-space text-[14px] w-[120px]">
                  Star Type
                </p>
                <p className="text-slate-50 font-space text-[14px]">
                  {star?.type}
                </p>
              </div>
              <div className="w-full flex items-center justify-center rounded-2xl border p-3 border-yellow-600/50 bg-black/50 shadow-[0_0_10px_yellow]/20">
                <div className="w-1/3 flex flex-col items-center gap-1 justify-center font-poppins">
                  <FaTemperatureHigh className="text-yellow-500" />
                  <p className="text-[12px] font-light text-stone-400">Temp</p>
                  <p className="text-[14px] font-light text-slate-50 text-center">
                    {star?.surfaceTemperature}
                  </p>
                </div>
                <div className="w-1/3 flex flex-col items-center gap-1 justify-center font-poppins">
                  <FaRegCircle className="text-blue-500" />
                  <p className="text-[12px] font-light text-stone-400">Size</p>
                  <p className="text-[14px] font-light text-slate-50 text-center">
                    {star?.surfaceTemperature}
                  </p>
                </div>
                <div className="w-1/3 flex flex-col items-center gap-1 justify-center font-poppins">
                  <GiSandsOfTime className="text-purple-500" />
                  <p className="text-[12px] font-light text-stone-400">Mass</p>
                  <p className="text-[14px] font-light text-slate-50 text-center">
                    {star?.surfaceTemperature}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-slate-50 font-space text-[18px]">Overview</p>
                <div className="w-[50px] h-[2px] bg-gradient-to-r from-purple-500 to-transparent"></div>
                <div className="w-full rounded-xl border border-stone-400/30 p-2 text-[14px] mt-1 font-poppins font-light text-slate-50 bg-black/50">
                  {star?.description}
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-slate-50 font-space text-[18px]">
                  Stellar Details
                </p>
                <div className="w-[50px] h-[2px] bg-gradient-to-r from-purple-500 to-transparent"></div>
                <div className="w-full rounded-xl border border-stone-400/30 p-2 text-[14px] mt-1 font-poppins font-light text-slate-50 bg-black/50">
                  <p className="text-stone-400">Distance from Earth:</p>
                  {star?.distanceFromEarth}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Star;
