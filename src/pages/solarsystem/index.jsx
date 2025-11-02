import React from "react";
import StarryBackground2 from "../../components/backgroundanimation";

const SolarSystem = () => {
  return (
    <div className="relative bg-black flex items-center justify-center h-screen w-full overflow-hidden">
      <div className="h-[4000px] w-[4000px] absolute">
        <StarryBackground2 />
      </div>
      {/* Nimation part */}

      <div className="absolute top-0 w-full h-[90%] lg:h-screen flex items-center justify-center">
        <div className="z-100 h-[450px] w-[450px] md:h-[720px] md:w-[720px] lg:h-[900px] lg:w-[900px] rounded-full border animate-[spin_50s_linear_infinite] border-white/14 flex items-center justify-center absolute">
          <div className="absolute -right-[20px] flex flex-col items-center justify-center animate-[spin_50s_linear_infinite_reverse]">
            <img src="/naptune.png" className="w-[40px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-cyan-500/10 rounded-full px-2 border border-cyan-500/20">
              Neptune
            </p>
          </div>
        </div>

        <div className="z-100 h-[400px] w-[400px] md:h-[640px] md:w-[640px] lg:h-[800px] lg:w-[800px] rounded-full border animate-[spin_60s_linear_infinite] border-white/14 flex items-center justify-center absolute">
          <div className="absolute -right-[15px] md:-right-[20px] flex flex-col items-center justify-center animate-[spin_60s_linear_infinite_reverse]">
            <img src="/urinus.png" className="w-[30px] md:w-[40px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-blue-600/10 rounded-full px-2 border border-blue-600/20">
              Uranus
            </p>
          </div>
        </div>

        <div className="z-100 h-[350px] w-[350px] md:h-[560px] md:w-[560px] lg:h-[700px] lg:w-[700px] rounded-full border animate-[spin_80s_linear_infinite] border-white/14 flex items-center justify-center absolute">
          <div className="absolute -right-[25px] md:-right-[35px] flex flex-col items-center justify-center animate-[spin_80s_linear_infinite_reverse]">
            <img src="/satrun.png" className="w-[50px] md:w-[70px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-orange-700/10 rounded-full px-2 border border-orange-700/20">
              Saturn
            </p>
          </div>
        </div>

        <div className="h-[300px] w-[300px] md:h-[480px] md:w-[480px] lg:h-[600px] lg:w-[600px] rounded-full border border-white/14 flex animate-[spin_40s_linear_infinite] items-center justify-center absolute">
          <div className="absolute -right-[15px] md:-right-[20px] flex flex-col items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
            <img src="/jupitar.png" className="w-[30px] md:w-[40px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-yellow-500/10 rounded-full px-2 border border-yellow-500/20">
              Jupitar
            </p>
          </div>
        </div>

        <div className="h-[250px] w-[250px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] rounded-full border border-white/14 animate-[spin_20s_linear_infinite] flex items-center justify-center absolute">
          <div className="absolute -right-[15px] flex flex-col items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
            <img src="/mars.png" className="w-[30px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-red-500/10 rounded-full px-2 border border-red-500/20">
              Mars
            </p>
          </div>
        </div>

        <div className="h-[200px] w-[200px] md:h-[320px] md:w-[320px] lg:h-[400px] lg:w-[400px] rounded-full border border-white/14 animate-[spin_30s_linear_infinite] flex items-center justify-center absolute">
          <div className="absolute -right-[20px] flex flex-col items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
            <img src="/earthPlanet.png" className="w-[40px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-blue-500/10 rounded-full px-2 border border-blue-500/20">
              Earth
            </p>
          </div>
        </div>

        <div className="h-[150px] w-[150px] md:h-[240px] md:w-[240px] lg:h-[300px] lg:w-[300px] rounded-full border border-white/14 animate-[spin_50s_linear_infinite] flex items-center justify-center absolute">
          <div className="absolute -right-[12px] md:-right-[15px] flex flex-col items-center justify-center animate-[spin_50s_linear_infinite_reverse]">
            <img src="/venus.png" className="w-[25px] md:w-[30px]" />
            <p className="absolute -bottom-10 text-center text-slate-50 bg-yellow-500/10 rounded-full px-2 border border-yellow-500/20">
              Venus
            </p>
          </div>
        </div>

        <div className="h-[100px] w-[100px] md:h-[160px] md:w-[160px] lg:h-[200px] lg:w-[200px] rounded-full border border-white/14 animate-[spin_60s_linear_infinite] flex items-center justify-center absolute">
          <div className="absolute -right-[7px] md:-right-[10px] flex flex-col items-center justify-center animate-[spin_60s_linear_infinite_reverse]">
            <img src="/mercury.png" className="w-[15px] md:w-[20px]" />
            <span className="absolute -bottom-10 z-[2000] text-center text-sm md:text-base text-slate-50 bg-slate-500/10 rounded-full px-2 border border-slate-500/20">
              Mercury
            </span>
          </div>
        </div>

        <div className="z-100 h-[60px] w-[60px] md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px] rounded-full flex items-center justify-center bg-radial from-10% from-yellow-400 via-40% via-orange-400 to-65% to-orange-700 shadow-[0_0_50px_yellow]/50"></div>
      </div>
      <div className="absolute w-[90%] md:w-[60%] lg:w-1/3 gap-3 flex flex-col items-start justify-center border border-yellow-500/40 rounded-2xl bg-black/80 bottom-5 left-5 z-[1000] p-4">
        <p className="text-xl text-slate-50 font-poppins">Solar System</p>
        <ul className="text-slate-300 list-disc flex flex-col gap-1 text-xs md:text-sm lg:text-md font-poppins  px-4">
          <li>The Sun contains 99.86% of the mass in the solar system</li>
          <li>
            Jupiter is the largest planet, over 1000 Earths could fit inside it
          </li>
          <li>It takes 8 minuts for light from the Sun to raech Earth</li>
        </ul>
      </div>
    </div>
  );
};

export default SolarSystem;
