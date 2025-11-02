import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompareResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const first = queryParams.get("first");
  const second = queryParams.get("second");

  const [firstPlanet, setFirstPlanet] = useState(null);
  const [secondPlanet, setSecondPlanet] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPlanets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/get-planets`
      );
      if (response.status === 200) {
        const allPlanets = response.data;
        setFirstPlanet(allPlanets.find((p) => p.name === first));
        setSecondPlanet(allPlanets.find((p) => p.name === second));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch planets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlanets();
  }, [first, second]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 to-stone-950">
        <img
          src="/earth.png"
          alt="Loading"
          className="w-[100px] animate-spin-slow"
        />
      </div>
    );

  if (!firstPlanet || !secondPlanet)
    return (
      <div className="w-full h-screen flex items-center justify-center text-white bg-gradient-to-b from-blue-950 to-stone-950">
        <p className="text-lg">No data found for selected planets.</p>
      </div>
    );

  const sections = [
    {
      title: "Physical Characteristics",
      fields: [
        { label: "Position", key: "position" },
        { label: "Diameter", key: "diameter" },
        { label: "Mass", key: "mass" },
        { label: "Gravity", key: "gravity" },
      ],
    },
    {
      title: "Orbital Properties",
      fields: [
        { label: "Distance from Sun", key: "distance_from_sun" },
        { label: "Orbital Period", key: "orbital_period_days" },
        { label: "Rotation Period", key: "rotation_period_days" },
        { label: "Moons", key: "moons" },
      ],
    },
    {
      title: "Atmosphere & Environment",
      fields: [
        { label: "Atmosphere", key: "atmosphere_composition" },
        { label: "Min Temperature", key: "temperature_min" },
        { label: "Max Temperature", key: "temperature_max" },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-950 to-stone-950 p-4 font-space">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Planet Images Side by Side */}
        <div className="flex flex-wrap justify-center items-center gap-10">
          {[firstPlanet, secondPlanet].map((planet, idx) => (
            <div
              key={idx}
              className="relative w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[220px] rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan-400/30 to-blue-900/30 shadow-lg"
            >
              <img
                src={planet.image}
                alt={planet.name}
                className="w-[80px] sm:w-[100px] md:w-[140px] lg:w-[160px] animate-spin-slow"
              />
              <span className="absolute bottom-[-30px] text-center text-white font-semibold text-sm sm:text-base md:text-lg">
                {planet.name}
              </span>
            </div>
          ))}
        </div>

        {/* Comparison Sections */}
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-4 md:p-6 shadow-lg flex flex-col gap-4"
          >
            <h2 className="text-cyan-400 font-bold text-xl md:text-2xl mb-2">
              {section.title}
            </h2>
            {section.fields.map((field, fidx) => (
              <div
                key={fidx}
                className="grid grid-cols-3 text-center py-1 border-b border-white/10 last:border-b-0"
              >
                <p className="text-slate-400 font-light">{field.label}</p>
                <p className="text-cyan-200">{firstPlanet[field.key]}</p>
                <p className="text-cyan-200">{secondPlanet[field.key]}</p>
              </div>
            ))}
          </div>
        ))}

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-xl transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareResult;
