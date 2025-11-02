import React, { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { IoPlayCircleOutline, IoStarSharp } from "react-icons/io5";
import { MdCompareArrows, MdQuiz, MdSatelliteAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import StarryBackground from "../../components/background";
import axios from "axios";
import { toast } from "sonner";
import FloatingMenu from "../../components/floatingMenu";

const Home = () => {
  const cards = [
    {
      title: "Discover Planets",
      icon: <BiWorld />,
      colors: ["#103069", "#0B4A97"],
      tag: "#3493D3",
      inner: "#0B3067",
      link: "/planets",
    },
    {
      title: "Play Quiz",
      icon: <MdQuiz />,
      colors: ["#4D168D", "#651A99"],
      tag: "#8F36AE",
      inner: "#46127E",
      link: "/quiz",
    },
    {
      title: "View Animation",
      icon: <IoPlayCircleOutline />,
      colors: ["#025043", "#00665B"],
      tag: "#11B592",
      inner: "#024A3E",
      link: "/animation",
    },
    {
      title: "Compare Planets",
      icon: <MdCompareArrows />,
      colors: ["#5E012D", "#820C49"],
      tag: "#D05186",
      inner: "#550329",
      link: "/comparePlanets",
    },
    {
      title: "Quiz Results",
      icon: <IoStarSharp />,
      colors: ["#CA4605", "#F27518"],
      tag: "#FAB130",
      inner: "#B64406",
      link: "/quizResult",
    },
    {
      title: "Discover Galaxies",
      icon: <BsStars />,
      colors: ["#002F35", "#00595F"],
      tag: "#01AEBF",
      inner: "#013438",
      link: "/discover-galaxies",
    },
    {
      title: "Discover Satellite",
      icon: <MdSatelliteAlt />,
      colors: ["#2C1716", "#BC2C2B"],
      tag: "#E84443",
      inner: "#441819",
      link: "/satellites",
    },
    {
      title: "Discover Stars",
      icon: <BsStars />,
      colors: ["#895800", "#BC8800"],
      tag: "#E6C400",
      inner: "#845801",
      link: "/stars",
    },
  ];

  const [gender, setGender] = useState("");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setGender(response.data.gender);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center w-full bg-[url(/homebg.png)] bg-cover overflow-hidden">
      <FloatingMenu />
      <div className="h-screen w-full bg-[rgba(0,0,0,0.7)] py-1">
        <StarryBackground />

        {/* glowing radial backgrounds */}
        <div className="absolute z-0 h-[400px] sm:h-[700px] w-[400px] sm:w-[700px] -top-20 sm:-top-72 -right-10 sm:-right-70 bg-[radial-gradient(circle,rgba(0,255,255,1)_0%,rgba(0,255,255,0)_70%)] opacity-10"></div>
        <div className="absolute z-0 h-[400px] sm:h-[700px] w-[400px] sm:w-[700px] -bottom-20 sm:-bottom-72 -left-10 sm:-left-70 bg-[radial-gradient(circle,rgba(0,255,255,1)_0%,rgba(0,255,255,0)_70%)] opacity-10"></div>

        {/* navbar */}
        <div
          data-aos="fade-down"
          data-aos-duration="2000"
          className="w-full h-[10%] sm:h-20 px-[7px] sm:px-[20px] flex items-center justify-between"
        >
          <div>
            <h1 className="text-white font-semibold text-lg sm:text-xl font-space text-shadow-sm text-shadow-[#b6b6b6]">
              Hey Akmal,
            </h1>
            <p className="text-white text-sm sm:text-base font-light font-poppins">
              You are on Earth
            </p>
          </div>
          <Link className="h-10 w-10 sm:h-12 sm:w-12 cursor-pointer rounded-full bg-gradient-to-br from-cyan-300 to-sky-600 flex items-center justify-center border-2 border-cyan-300">
            {gender === "Male" ? (
              <img
                src="/male.png"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full z-100"
              />
            ) : (
              <img
                src="/female.png"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full z-100"
              />
            )}
          </Link>
        </div>

        {/* cards section */}
        <div className="md:w-[90%] lg:w-full mx-auto h-[90%] flex flex-col items-center justify-evenly md:justify-between pb:20 z-[100]">
          <div className="w-full flex md:h-[85%] items-center justify-center">
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="z-[100] w-[95%] sm:w-full md:w-full lg:w-[60%] sm:h-full md:h-[40%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
            >
              {cards.map((card, i) => (
                <Link
                  key={i}
                  className={`relative w-full h-[90px] sm:h-[100px] mx-auto overflow-hidden rounded-2xl`}
                  style={{
                    backgroundImage: `linear-gradient(to left, ${card.colors[0]}, ${card.colors[1]})`,
                  }}
                  to={`${card.link}`}
                >
                  <div
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-sm absolute -top-3 sm:-top-4 -left-3 sm:-left-4"
                    style={{ backgroundColor: card.tag }}
                  ></div>
                  <div className="h-full flex items-center justify-between lg:justify-evenly px-2">
                    <p className="w-2/3 text-sm sm:text-md md:text-lg font-space text-white sm:w-[100px]">
                      {card.title}
                    </p>
                    <div
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: card.inner }}
                    >
                      {React.cloneElement(card.icon, {
                        className:
                          "text-slate-300 text-md sm:text-xl md:text-2xl",
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* marquee text */}
          <div className="w-[90%] sm:w-[80%] md:w-[70%] md:h-[15%] flex items-center justify-center sm:mt-0">
            <div className="marquee shadow-[0_0_15px_#22d3ee]/50 bg-[rgba(105,252,255,0.1)] px-3 py-2 rounded-md">
              <div className="marquee__item text-white font-space text-sm sm:text-base leading-relaxed">
                <p>
                  🪐 Jupiter’s new moon discovered! Astronomers have identified
                  a previously unseen moon orbiting Jupiter, expanding its total
                  moon count and offering fresh insights into our solar system’s
                  mysteries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
