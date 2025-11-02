import React from "react";
import { FaRocket, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import StarryBackground from "../../components/background";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen lg:h-screen bg-gradient-to-bl from-stone-900 via-blue-900 to-stone-900 text-white overflow-hidden">
      <StarryBackground />

      {/* ✨ Overlay Container */}
      <div className="relative z-10 flex flex-col justify-center lg:h-screen items-center px-4 sm:px-6 md:px-10 py-12 bg-black/70 backdrop-blur-md">
        {/* 🌟 Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
            About Sky Seek 🚀
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
            Unveiling the mysteries of the universe — making space exploration
            accessible, inspiring, and visually stunning for everyone. ✨
          </p>
          <div className="w-24 h-[2px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
        </div>

        {/* 🌌 Content Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* 🪐 Left Column - Mission */}
          <div className="bg-white/10 border border-cyan-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            <div className="flex flex-col items-center gap-4 mb-6">
              <img
                src="/logo.svg"
                alt="Sky Seek Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              />
              <h2 className="text-2xl font-semibold font-space text-cyan-300">
                Sky Seek
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Explore the Universe
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaRocket className="text-cyan-400 text-xl" />
                <h3 className="text-lg sm:text-xl font-semibold font-space text-slate-100">
                  Our Mission
                </h3>
              </div>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-space">
                To inspire curiosity about the cosmos by blending data, design,
                and discovery. Sky Seek brings you closer to stars, planets, and
                galaxies — one tap at a time.
              </p>
            </div>
          </div>

          {/* 🪐 Right Column - About & Contact */}
          <div className="flex flex-col gap-6">
            {/* About the App */}
            <div className="bg-white/10 border border-cyan-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <FaInfoCircle className="text-cyan-400 text-xl" />
                <h3 className="text-lg sm:text-xl font-semibold font-space text-slate-100">
                  About the App
                </h3>
              </div>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-space">
                Sky Seek transforms the cosmos into an interactive experience.
                Browse galaxies, observe satellites, and uncover space mysteries
                through real-time data and breathtaking visuals.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white/10 border border-cyan-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <FaEnvelope className="text-cyan-400 text-xl" />
                <h3 className="text-lg sm:text-xl font-semibold font-space text-slate-100">
                  Contact Us
                </h3>
              </div>
              <p className="text-stone-300 text-sm sm:text-base font-space">
                <span className="text-cyan-400 font-semibold">Email:</span>{" "}
                devsouqtechnologies@gmail.com
              </p>
              <p className="text-stone-300 text-sm sm:text-base font-space mt-2">
                <span className="text-cyan-400 font-semibold">Website:</span>{" "}
                <a
                  href="https://devsouq.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  https://devsouq.com/
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-stone-400 font-space mt-12 text-center">
          © 2025 Sky Seek. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
