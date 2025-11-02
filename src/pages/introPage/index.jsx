import { useEffect } from "react";
import { useNavigate } from "react-router";
import StarryBackground from "../../components/background";

const IntroPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full bg-[url(/bg.jpg)] bg-cover bg-center overflow-hidden">
      <div className="relative min-h-screen w-full bg-[rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center overflow-hidden">
        <StarryBackground />

        {/* 🔥 Glowing Red Orb */}
        <div className="absolute bottom-[-45%] md:bottom-[-100%] lg:bottom-[-100%] w-[500px] sm:w-[800px] md:w-[900px] lg:w-[1100px] aspect-square bg-[radial-gradient(circle,rgba(159,47,6,1)_50%,rgba(159,47,6,0)_70%)] rounded-full blur-[90px] opacity-90"></div>

        {/* 🌞 Sun Image */}
        <img
          src="/sun1.png"
          alt="sun"
          className="absolute bottom-[-40%] md:bottom-[-90%] lg:bottom-[-110%] w-[500px] sm:w-[800px] md:w-[900px] lg:w-[1100px] z-10 animate-slow-pulse"
        />

        {/* 💡 Upper Light */}
        <img
          src="/setlight.png"
          alt="light"
          className="absolute top-6 right-6 sm:top-10 sm:right-10 w-16 sm:w-24 md:w-28 opacity-70 animate-float"
        />

        {/* 🌌 Title */}
        <h1
          data-aos="fade-up"
          data-aos-duration="3000"
          className="bg-gradient-to-r from-[#4182FF] to-white font-space font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text z-20 tracking-wide leading-tight px-3"
        >
          SkySeek
        </h1>

        {/* ✨ Tagline */}
        <p className="text-gray-300 mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-space z-20 animate-slide-up max-w-[90%] sm:max-w-[600px]">
          Discover the Universe Beyond the Stars ✨
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
