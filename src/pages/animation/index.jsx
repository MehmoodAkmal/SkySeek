import StarryBackground from "../../components/background";
import { BiWorld } from "react-icons/bi";
import { BsBrightnessHighFill, BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";

const Animation = () => {
  return (
    <div className="w-full h-screen bg-[url(/homebg.png)] bg-cover bg-center relative">
      <StarryBackground />
      {/* Glass overlay */}
      <div className="w-full h-screen p-4 bg-black/50 flex flex-col items-start justify-start md:items-center md:justify-center gap-8 z-100">
        {/* Content */}
        <div className="w-full flex flex-col md:items-center gap-1.5">
          <p className="text-slate-50 font-poppins font-light text-lg md:text-2xl lg:text-4xl">
            Explore Cosmic Animation
          </p>
          <p className="text-slate-400 font-poppins text-[12px]">
            Click to experiance interactive space simulations
          </p>
        </div>
        <div className="w-full flex items-center justify-start md:items-center md:justify-center flex-wrap gap-7 z-100">
          <Link
            to="/moonanimation"
            className="cursor-pointer h-[120px] w-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-2xl border border-[#1854BF]/50 shadow-[0_0_20px_#1854BF]/40 bg-gradient-to-br from-[#0A4B9F] to-60% to-[#0D2D66] flex flex-col items-center justify-center gap-1.5"
          >
            <BiWorld className="text-4xl text-slate-50" />
            <p className="text-slate-50 font-poppins font-semibold text-md md:text-xl lg:text-2xl">
              Earth & Moon
            </p>
            <p className="text-slate-400 text-[10px] md:text-md lg:text-lg font-poppins ">
              Rotation Simulation
            </p>
          </Link>

          <Link
            to="/Solarsystem"
            className="cursor-pointer h-[120px] w-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-2xl border border-[#691A99]/50 shadow-[0_0_20px_#691A99]/40 bg-gradient-to-br from-[#691A99] to-60% to-[#4C158D] flex flex-col items-center justify-center gap-1.5"
          >
            <BsBrightnessHighFill className="text-4xl text-slate-50" />
            <p className="text-slate-50 font-poppins font-semibold text-md md:text-xl lg:text-2xl">
              Solar System
            </p>
            <p className="text-slate-400 text-[10px] md:text-md lg:text-lg font-poppins ">
              Planetary orbits
            </p>
          </Link>

          <Link className="cursor-pointer h-[120px] w-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-2xl border border-[#840E4B]/50 shadow-[0_0_20px_#840E4B]/40 bg-gradient-to-br from-[#840E4B] to-60% to-[#590129] flex flex-col items-center justify-center gap-1.5">
            <BsStars className="text-4xl text-slate-50" />
            <p className="text-slate-50 font-poppins font-semibold text-md md:text-xl lg:text-2xl">
              Star Fields
            </p>
            <p className="text-slate-400 text-[10px] md:text-md lg:text-lg font-poppins">
              Interactive stargazing
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Animation;
