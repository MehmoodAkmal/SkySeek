import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ComparePlanets = () => {
  const [list, setList] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPlanets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/planets/get-planets`
      );
      if (response.status === 200) setList(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch planets");
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (!first || !second) {
      toast.error("Please select two planets");
      return;
    }
    navigate(`/compare-result?first=${first}&second=${second}`);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 to-stone-900">
        <img
          src="/earth-19822_256.gif"
          className="animate-spin-slow"
          alt="Loading"
        />
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-950 to-stone-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-black/50 backdrop-blur-md border border-cyan-400/20 rounded-3xl shadow-lg flex flex-col gap-6">
        <h1 className="text-slate-50 text-center font-bold text-2xl md:text-3xl font-poppins">
          Compare Planets
        </h1>
        <p className="text-slate-300 text-center">
          Select two planets to compare their features
        </p>

        <form onSubmit={handleCompare} className="flex flex-col gap-4">
          {/* First Planet */}
          <fieldset className="w-full border border-cyan-400/30 px-3 py-2 rounded-xl hover:border-cyan-500 transition-all duration-300">
            <legend className="px-2 text-cyan-400 font-medium">
              First Planet
            </legend>
            <div className="flex items-center gap-2">
              <BiWorld className="text-cyan-400 text-xl" />
              <select
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className="w-full bg-transparent text-slate-50 outline-none py-1"
              >
                <option value="" disabled>
                  --Select Planet--
                </option>
                {list.map((item, index) => (
                  <option value={item.name} key={index} className="text-black">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          {/* VS */}
          <div className="w-full flex justify-center items-center my-2">
            <h2 className="text-cyan-400 font-bold text-2xl animate-pulse">
              VS
            </h2>
          </div>

          {/* Second Planet */}
          <fieldset className="w-full border border-cyan-400/30 px-3 py-2 rounded-xl hover:border-cyan-500 transition-all duration-300">
            <legend className="px-2 text-cyan-400 font-medium">
              Second Planet
            </legend>
            <div className="flex items-center gap-2">
              <BiWorld className="text-cyan-400 text-xl" />
              <select
                value={second}
                onChange={(e) => setSecond(e.target.value)}
                className="w-full bg-transparent text-slate-50 outline-none py-1"
              >
                <option value="" disabled>
                  --Select Planet--
                </option>
                {list.map((item, index) => (
                  <option value={item.name} key={index} className="text-black">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          {/* Compare Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-xl transition-all duration-300"
          >
            Compare Planets
          </button>
        </form>

        {/* Optional extra design: small footer */}
        <p className="text-slate-400 text-center text-sm mt-2">
          🌌 Explore the universe, one planet at a time
        </p>
      </div>
    </div>
  );
};

export default ComparePlanets;
