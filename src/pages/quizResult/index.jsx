import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const QuizResult = () => {
  const [result, setResult] = useState([]);
  const [averagePercentage, setAveragePercentage] = useState(0);

  // ⚙️ Fetch results and calculate average percentage
  const handleQuizResult = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/result/getResults`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setResult(response.data);

        // ✅ Calculate average percentage
        const total = response.data.reduce(
          (acc, curr) => {
            acc.totalMarks += curr.totalMarks;
            acc.obtainMarks += curr.obtainMarks;
            return acc;
          },
          { totalMarks: 0, obtainMarks: 0 }
        );

        const avg =
          total.totalMarks > 0
            ? ((total.obtainMarks / total.totalMarks) * 100).toFixed(2)
            : 0;

        setAveragePercentage(avg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load results");
    }
  };

  useEffect(() => {
    handleQuizResult();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[url(/homebg.png)] bg-cover bg-center">
      <div className="w-full min-h-screen bg-black/70 p-3 flex flex-col items-center gap-3">
        <div className="w-full p-6 border border-cyan-700 rounded-xl text-center">
          <h2 className="text-slate-50 font-space text-2xl font-semibold mb-6">
            Performance Summary
          </h2>

          {/* 📊 Stats Row */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-stone-400 text-xl font-space">Total Quizzes</p>
              <p className="text-slate-50 font-bold text-3xl">
                {result.length}
              </p>
            </div>
            <div>
              <p className="text-stone-400 text-xl font-space">
                Average Percentage
              </p>
              <p
                className={`text-3xl font-bold ${
                  averagePercentage < 40
                    ? "text-red-500"
                    : averagePercentage < 70
                    ? "text-yellow-400"
                    : "text-green-500"
                }`}
              >
                {averagePercentage}%
              </p>
            </div>
          </div>

          {/* 🟩 Animated Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden mt-3">
            <div
              className={`h-5 rounded-full transition-all duration-700 ease-in-out ${
                averagePercentage < 40
                  ? "bg-red-500"
                  : averagePercentage < 70
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              style={{ width: `${averagePercentage}%` }}
            ></div>
          </div>

          <p className="text-gray-400 mt-3 text-sm font-space italic">
            {averagePercentage < 40
              ? "😔 Keep practicing, you’ll improve!"
              : averagePercentage < 70
              ? "💪 You’re doing good, keep it up!"
              : "🔥 Excellent performance!"}
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {result.map((item, index) => (
            <div
              key={index}
              className="w-full border border-cyan-400/50 rounded-xl p-3 flex flex-col items-left justify-center gap-3 bg-black/50 backdrop-blur-lg"
            >
              <h1
                className={`${
                  item.level === "Easy"
                    ? "text-green-600 border border-green-600/30 bg-green-600/20"
                    : item.level === "Medium"
                    ? "text-yellow-600 border border-yellow-600/30 bg-yellow-600/20"
                    : "text-red-600 border border-red-600/30 bg-red-600/20"
                } text-center px-4 py-2 rounded-full w-[100px]`}
              >
                {item.level}
              </h1>
              <div className="flex items-center justify-between w-full">
                <p className="text-slate-50 text-2xl">Score</p>
                <p
                  className={`${
                    item.obtainMarks <= 3
                      ? "text-red-600"
                      : item.obtainMarks <= 7
                      ? "text-yellow-600"
                      : "text-green-600"
                  } font-space font-bold text-2xl`}
                >
                  {item.obtainMarks}
                  <span className="text-lg text-stone-400 font-light">
                    /{item.totalMarks}
                  </span>{" "}
                  <span className="text-lg">
                    ({(item.obtainMarks / item.totalMarks) * 100}%)
                  </span>
                </p>
              </div>
              <div className="w-full h-[5px] bg-stone-400 rounded-full overflow-hidden">
                <div
                  className={`${
                    (item.obtainMarks / item.totalMarks) * 100 <= 30
                      ? "bg-red-600"
                      : (item.obtainMarks / item.totalMarks) * 100 <= 70
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  } h-full rounded-full`}
                  style={{
                    width: `${(item.obtainMarks / item.totalMarks) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
