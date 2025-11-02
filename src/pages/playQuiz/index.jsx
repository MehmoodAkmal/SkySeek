import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { CgSmileNeutral, CgSmileSad } from "react-icons/cg";
import { Link } from "react-router-dom";
import StarryBackground from "../../components/background";

const Quiz = () => {
  const levels = [
    {
      name: "Easy",
      icon: <FaRegSmile />,
      bg: "bg-[#177245]",
      border: "border-[#269949]",
      link: "/quiz/level?level=Easy",
    },
    {
      name: "Medium",
      icon: <CgSmileNeutral />,
      bg: "bg-[#2072AF]",
      border: "border-[#3f92d1]",
      link: "/quiz/level?level=Medium",
    },
    {
      name: "Hard",
      icon: <CgSmileSad />,
      bg: "bg-[#BF4F51]",
      border: "border-[#f46769]",
      link: "/quiz/level?level=Hard",
    },
  ];

  return (
    <div className="w-full h-screen relative bg-[url(/homebg.png)] bg-center bg-cover">
      <StarryBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col items-center justify-center gap-8 z-50 px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-space font-bold text-white drop-shadow-lg">
            Select Your <span className="text-teal-400">Challenge</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl mt-2">
            Choose your quiz difficulty level
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {levels.map((level) => (
            <Link
              key={level.name}
              to={level.link}
              className={`${level.bg} ${level.border} border rounded-lg w-[150px] md:w-[180px] py-4 flex items-center justify-center gap-2 font-semibold text-slate-50 font-space transform transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,200,0.4)]`}
            >
              {level.icon}
              {level.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
