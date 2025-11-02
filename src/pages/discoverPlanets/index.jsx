import { useEffect, useState } from "react";
import StarryBackground from "../../components/background";
import { BiLeaf, BiWorld } from "react-icons/bi";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCircle,
  FaRegSnowflake,
} from "react-icons/fa";
import { FaArrowsRotate, FaCircleDot, FaClock } from "react-icons/fa6";
import {
  MdLightbulbOutline,
  MdLinearScale,
  MdOutlineVerticalAlignCenter,
} from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { PiMountainsFill } from "react-icons/pi";
import { GiCircleCage, GiFlamer, GiHeavyTimer } from "react-icons/gi";
import { IoMdMoon } from "react-icons/io";
import { IoCloudOutline, IoTimerOutline } from "react-icons/io5";
import { BsShieldFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { toast } from "sonner";

const DiscoverPlanets = () => {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);
  const [planet, setPlanet] = useState();
  const [loadins, setLoading] = useState(false);

  const handlePlanetsList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/get-planets`
      );
      if (response.status === 200) {
        toast.success("Planet list fetch successfuly");
        const sortedPlanets = [...response.data].sort(
          (a, b) => Number(a.position) - Number(b.position)
        );
        setList(sortedPlanets);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleFavourit = async (planetId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/add-to-favorite`,
        {
          planetId: planetId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log("🚀 ~ handleFavourit ~ error:", error);
      if (error.response.status === 400) {
        toast.info(error.response.data.msg);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const handlePage = (index) => {
    setPlanet(list[index]);
  };

  useEffect(() => {
    let isCalled = false;
    if (!isCalled) {
      handlePlanetsList();
    }
    isCalled = true;
  }, []);

  useEffect(() => {
    handlePage(index);
  }, [index, list]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-bl from-[#0B0C28] via-[#061a41] to-[#0B0C28] overflow-y-hidden">
      <StarryBackground />
      <div className="h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,1)_0%,rgba(168,85,247,0)_60%)] -top-[250px] -left-[250px] opacity-10 absolute"></div>
      {loadins ? (
        <div className="relative h-screen w-full flex items-center justify-center bg-black/40">
          <div className="relative">
            <img
              src="/earth-19822_256.gif"
              className="w-80 animate-[spin_20s_linear_infinite] bg-blend-normal"
              alt="Rotating Earth"
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-[rgba(0,0,0,0.7)] z-100">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 z-100">
            {/* Left Side */}
            <div className="md:p-10 lg:p-12 col-span-1 md:h-screen flex flex-col gap-3">
              {/* left card */}
              <div className="relative h-[80%] md:h-[90%] w-full p-3 md:p-6 bg-[rgba(255,255,255,0.05)] md:border border-cyan-400/30 md:shadow-[0_0_25px_rgba(34,211,238,0.25)] md:rounded-2xl flex flex-col justify-evenly md:justify-between transition-all duration-500 hover:shadow-[0_0_45px_rgba(34,211,238,0.5)] hover:border-cyan-400/60">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold font-poppins text-slate-50 tracking-wide">
                      {planet?.name}
                    </h1>
                    <p className="text-cyan-400 text-[12px] md:text-[16px] lg:text-sm tracking-widest">
                      {planet?.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 py-1 px-3 rounded-full border border-cyan-400/50 bg-[rgba(0,0,0,0.5)] shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    <BiLeaf
                      className={`${
                        planet?.name === "Earth"
                          ? "text-cyan-400"
                          : "text-gray-300"
                      } text-lg`}
                    />
                    <p
                      className={`text-xs font-light ${
                        planet?.name === "Earth"
                          ? "text-cyan-400"
                          : "text-slate-300"
                      }`}
                    >
                      {planet?.name === "Earth" ? "Habitable" : "Uninhabitable"}
                    </p>
                  </div>
                </div>

                {/* Planet Image */}
                <div className="w-full h-[50%]">
                  <div className="relative mx-auto h-[150px] w-[150px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] bg-[radial-gradient(circle,rgba(6,182,212,0.4)_20%,rgba(6,182,212,0)_70%)] rounded-full animate-pulse flex items-center justify-center">
                    <img
                      src={planet?.image}
                      className="absolute z-100 animate-[spin_15s_linear_infinite] rounded-full h-[100px] md:h-[150px] lg:h-[200px]"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-sm">
                      Position in Solar System
                    </p>
                    <div className="bg-[rgba(0,0,0,0.6)] border border-cyan-400/40 rounded-lg h-8 w-8 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                      <p className="text-cyan-400 font-semibold font-poppins">
                        {planet?.position}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <p>Distance from Sun:</p>
                    <p className="text-cyan-300 font-medium">
                      {planet?.distance_from_sun}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="z-100 flex gap-3 items-center justify-evenly h-[20%] md:h-[10%] py-2">
                <button
                  onClick={() => setIndex(index - 1)}
                  disabled={index === 0}
                  className={`bg-[rgba(26,255,244,0.05)] border border-cyan-400/30 rounded-md h-8 w-8 flex items-center justify-center ${
                    index === 0
                      ? "bg-white/10 border-white/20 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <FaChevronLeft
                    className={`text-2xl text-cyan-400 ${
                      index === 0 ? "text-slate-300" : ""
                    }`}
                  />
                </button>
                <div className="cursor-pointer w-[152px] h-[42px] md:w-[202px] md:h-[52px] flex items-center justify-center rounded-lg bg-gradient-to-bl from-blue-900 via-cyan-400 to-blue-900">
                  <button
                    onClick={() => handleFavourit(list[index].id)}
                    className="cursor-pointer w-[150px] h-[40px] md:w-[200px] md:h-[50px] text-xl text-slate-50 font-semibold rounded-lg bg-gradient-to-br from-blue-700 to-blue-700 flex items-center justify-center"
                  >
                    <p className="bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent w-28">
                      Favourite
                    </p>
                  </button>
                </div>
                <button
                  onClick={() => setIndex(index + 1)}
                  disabled={index === list.length - 1}
                  className={`bg-[rgba(26,255,244,0.05)] border border-cyan-400/30 rounded-md h-8 w-8 flex items-center justify-center ${
                    index === list.length - 1
                      ? "bg-white/20 border-white/20 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <FaChevronRight
                    className={`text-2xl text-cyan-400 ${
                      index === list.length - 1 ? "text-slate-300" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
            {/* Right Side */}
            <div className="col-span-1 lg:col-span-2 px-5 py-10 md:p-5 flex flex-col gap-4 md:h-screen overflow-y-scroll scrollbar-none">
              {/* Physical */}
              <div className="w-full flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-cyan-400"></div>
                <p className="text-slate-50 font-space font-semibold text-xl">
                  Physical
                </p>
                <div className="h-[1px] w-full bg-[rgba(255,255,255,0.5)]"></div>
              </div>
              {/* Physical Data Cards */}
              <div className="z-100 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <TbRulerMeasure className="text-cyan-400 text-md" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Planet
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.name}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <TbRulerMeasure className="text-cyan-400 text-md" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Diameter
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.diameter}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <BiWorld className="text-cyan-400 text-md" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Mass
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.mass}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <MdOutlineVerticalAlignCenter className="text-cyan-400 text-md" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Gravity
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.gravity}
                    </p>
                  </div>
                </div>

                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <FaArrowsRotate className="text-cyan-400 text-md" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Rotation Period
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.rotation_period_days}
                    </p>
                  </div>
                </div>

                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <FaClock className="text-cyan-400 text-md" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Solar Day
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.solar_day_days}
                    </p>
                  </div>
                </div>

                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <SlGraph className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Orbital Period
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.rotation_period_days}
                    </p>
                  </div>
                </div>

                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <FaRegCircle className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Symbol
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.symbol}
                    </p>
                  </div>
                </div>

                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <PiMountainsFill className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Surface
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.surface}
                    </p>
                  </div>
                </div>
              </div>
              {/* Orbital period */}
              <div className="w-full flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-cyan-400"></div>
                <p className="text-slate-50 w-[160px] font-space font-semibold text-xl">
                  Orbital Period
                </p>
                <div className="h-[1px] w-full bg-[rgba(255,255,255,0.5)]"></div>
              </div>
              {/* Orbital data cards */}
              <div className="z-100 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <MdLinearScale className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Distance from Sun
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.distance_from_sun}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <GiCircleCage className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Eccentricity
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.eccentricity}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <IoMdMoon className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Moons
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.moons}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <GiHeavyTimer className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Position
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.position}
                    </p>
                  </div>
                </div>
              </div>
              {/* Atmosphere */}
              <div className="w-full flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-cyan-400"></div>
                <p className="text-slate-50 w-[160px] font-space font-semibold text-xl">
                  Atmosphere
                </p>
                <div className="h-[1px] w-full bg-[rgba(255,255,255,0.5)]"></div>
              </div>
              {/* Atmosphere data cards */}
              <div className="z-100 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <IoCloudOutline className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Composition
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.atmosphere_composition}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <IoTimerOutline className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Pressure
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.atmosphere_pressure_bar}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <FaRegSnowflake className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Temperature Min
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.temperature_min}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <GiFlamer className="text-cyan-400 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      {planet?.temperature_max}
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      3.7 m/s
                    </p>
                  </div>
                </div>
              </div>
              {/* Other Features */}
              <div className="w-full flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-cyan-400"></div>
                <p className="text-slate-50 w-[180px] font-space font-semibold text-xl">
                  Other Features
                </p>
                <div className="h-[1px] w-full bg-[rgba(255,255,255,0.5)]"></div>
              </div>
              {/* Other Features Cards */}
              <div className="z-100 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <FaCircleDot className="text-gray-300 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Rings
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.rings ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <BsShieldFill className="text-blue-500 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Magnetic Field
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.magnetic_field ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="w-full py-2 px-3 bg-[rgba(0,0,0,0.6)] rounded-xl border border-slate-100/30 flex items-center gap-3">
                  <AiFillHeart className="text-gray-300 text-xl" />
                  <div>
                    <p className="text-slate-300 text-sm font-extralight font-space">
                      Supports Life
                    </p>
                    <p className="text-slate-100 text-md font-poppins">
                      {planet?.supports_life ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
              {/* Trivia */}
              <div className="w-full flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-cyan-400"></div>
                <p className="text-slate-50 w-[180px] font-space font-semibold text-xl">
                  Trivia
                </p>
                <div className="h-[1px] w-full bg-[rgba(255,255,255,0.5)]"></div>
              </div>
              {/* Intresting Fects */}
              <div className="w-full rounded-xl border border-amber-400/20 p-2 bg-amber-400/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-amber-400/10 flex items-center justify-center">
                    <MdLightbulbOutline className="text-amber-400" />
                  </div>
                  <p className="text-amber-400 font-space">Intresting Fects</p>
                </div>
                <p className="text-slate-50 font-extralight text-sm">
                  {planet?.trivia}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Content Screen main*/}
    </div>
  );
};

export default DiscoverPlanets;
