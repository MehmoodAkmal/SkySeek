import React from "react";
import StarryBackground from "../../components/background";

const EarthMoon = () => {
  return (
    <div className="w-full h-screen flex items-start justify-center bg-black relative p-4 overflow-y-hidden">
      <StarryBackground />
      <div className="h-[80%] flex items-center justify-center">
        <div className="z-100 w-[250px] h-[250px] md:w-[400px] md:h-[400px] flex items-center justify-center rounded-full animate-[spin_30s_linear_infinite] border border-white/10 relative">
          <img
            src="/moon.png"
            className="absolute -right-[30px] md:-right-[40px] w-[60px] md:w-[80px] animate-[spin_60s_linear_infinite_reverse]"
          />

          <img
            src="/earth3.png"
            className="w-[160px] md:w-[290px] rounded-full animate-[spin_60s_linear_infinite]"
          />
        </div>
      </div>
      <div className="z-200 w-[90%] md:w-[60%] lg:w-1/4 bg-black/70 absolute bottom-4 left-4 p-3 rounded-xl border border-cyan-500/30">
        <p className="text-slate-50 font-poppins text-lg">
          Earth & Moon System
        </p>
        <ul className="text-slate-300 list-disc px-5 text-[12px] md:text-[18px]">
          <li>Earth rotates on its exis once every 24 hours</li>
          <li>Moon orbits Earth once ecery 27.3 Days</li>
          <li>Moon is about 27% the size of Earth</li>
        </ul>
      </div>
    </div>
  );
};

export default EarthMoon;
