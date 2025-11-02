import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const StartQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");
  const navigate = useNavigate();

  // Fetch quiz questions
  const handleQuiz = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/getQuiz`,
        { level },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status) {
        setQuiz(response.data);
        localStorage.setItem(`quiz_${level}`, JSON.stringify(response.data));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load quiz");
    }
  };

  const handleSaveResult = async ({ totalMarks, obtainMarks }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/result/saveResult`,
        { level, totalMarks, obtainMarks },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        toast.success("Quiz result saved successfully");
        localStorage.removeItem(`quiz_${level}`);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // ✅ Load quiz from localStorage if available
  useEffect(() => {
    const storedQuiz = localStorage.getItem(`quiz_${level}`);
    if (storedQuiz) {
      setQuiz(JSON.parse(storedQuiz));
    } else {
      handleQuiz();
    }
  }, [level]);

  const handleOptionChange = (value) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
  };

  const handleNext = () => {
    const selected = answers[currentIndex];
    if (!selected) {
      toast.warning("Please select an answer before continuing!");
      return;
    }
    if (currentIndex + 1 < quiz.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const calculateScore = () => {
    let total = 0;
    quiz.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) total++;
    });
    setScore(total);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setShowReview(false);
  };

  const handleReviewIncorrect = () => {
    setShowReview(true);
  };

  if (!quiz.length)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-linear-to-bl from-stone-950 via-blue-900 to-stone-950">
        <div className="w-full h-full bg-black/70 flex items-center justify-center">
          <img src="/earth-19822_256.gif" alt="" />
        </div>
      </div>
    );

  // Review Incorrect Answers
  if (showReview) {
    const incorrect = quiz.filter((q, i) => answers[i] !== q.correctAnswer);
    return (
      <div className="w-full min-h-screen bg-[url(/homebg.png)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div className="relative z-20 flex flex-col items-center py-10 px-4 gap-6">
          <h1 className="text-4xl font-space font-bold text-teal-400">
            ❌ Review Incorrect Answers
          </h1>
          {incorrect.length === 0 ? (
            <p className="text-xl text-green-400 font-semibold">
              🎉 Wow! You got all answers correct!
            </p>
          ) : (
            <div className="flex flex-col gap-6 w-full md:w-[80%] lg:w-[60%]">
              {incorrect.map((q, index) => {
                const actualIndex = quiz.findIndex(
                  (item) => item.questionText === q.questionText
                );
                return (
                  <div
                    key={index}
                    className="bg-black/70 border border-red-600 rounded-lg p-4 shadow-md"
                  >
                    <h2 className="font-space text-lg mb-2 text-yellow-400">
                      Q{actualIndex + 1}. {q.questionText}
                    </h2>
                    <p className="text-red-400">
                      ❌ Your Answer:{" "}
                      <span className="font-semibold">
                        {answers[actualIndex] || "Not Answered"}
                      </span>
                    </p>
                    <p className="text-green-400">
                      ✅ Correct Answer:{" "}
                      <span className="font-semibold">{q.correctAnswer}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <button
            onClick={handleRestart}
            className="mt-6 bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg font-space"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  // Final Result
  if (showResult)
    return (
      <div className="w-full h-screen bg-[url(/homebg.png)] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full gap-6 text-white">
          <h1 className="text-4xl font-space font-bold text-teal-400">
            Quiz Completed!
          </h1>
          <p className="text-xl">
            Your Score:{" "}
            <span
              className={`${
                score < 4
                  ? "text-red-500"
                  : score < 8
                  ? "text-yellow-400"
                  : "text-green-500"
              } font-semibold`}
            >
              {score}
            </span>{" "}
            / {quiz.length}
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() =>
                handleSaveResult({
                  totalMarks: quiz.length,
                  obtainMarks: score,
                })
              }
              className="bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg font-space"
            >
              Go to Home
            </button>
            <button
              onClick={handleReviewIncorrect}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-space"
            >
              Review Incorrect Answers
            </button>
          </div>
        </div>
      </div>
    );

  // Quiz screen
  const question = quiz[currentIndex];
  const number = currentIndex + 1;
  const selectedAnswer = answers[currentIndex] || "";

  return (
    <div className="w-full h-screen bg-[url(/homebg.png)] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4">
        <div className="w-full md:w-[80%] lg:w-[60%] bg-black/80 border border-cyan-400/80 shadow-[0_0_15px_cyan]/50 rounded-2xl p-6 flex flex-col gap-5">
          <p className="text-white font-semibold font-space text-2xl text-center">
            Quiz: {level} Level
          </p>

          <h1 className="text-slate-50 text-center font-space bg-blue-800 rounded-lg border border-blue-500 w-[220px] py-2 shadow-[0_0_10px_skyblue]/50">
            Question {number} of {quiz.length}
          </h1>

          <div className="text-slate-50 flex flex-col items-start gap-2">
            <h1 className="text-cyan-400 font-semibold text-2xl">Question:</h1>
            <p className="p-3 rounded-lg font-space bg-black/50 border border-cyan-400/50 w-full">
              {question.questionText}
            </p>
          </div>

          <div className="text-slate-50 flex flex-col items-start gap-2 w-full">
            <h1 className="text-cyan-400 font-semibold text-2xl">Options:</h1>
            <div className="flex flex-col gap-2 w-full">
              {question.options.map((item, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer bg-black/40 border p-2 rounded-md transition-all duration-300
                    ${
                      selectedAnswer === item
                        ? "border-cyan-400 bg-teal-900/30"
                        : "border-gray-600"
                    }`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition-all duration-300
                      ${
                        selectedAnswer === item
                          ? "border-cyan-400 bg-cyan-400 text-black"
                          : "border-gray-500 bg-transparent"
                      }`}
                  >
                    {selectedAnswer === item && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="black"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    value={item}
                    checked={selectedAnswer === item}
                    onChange={() => handleOptionChange(item)}
                    className="hidden"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mt-6 w-full">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white font-space disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className={`px-6 py-2 rounded-lg font-space transition-all duration-300 ${
                answers[currentIndex]
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "bg-yellow-500 hover:bg-yellow-600 text-black animate-pulse"
              }`}
            >
              {answers[currentIndex]
                ? currentIndex + 1 === quiz.length
                  ? "Finish"
                  : "Next"
                : "Select an Answer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;
