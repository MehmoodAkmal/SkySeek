import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import IntroPage from "./pages/introPage";
import Login from "./pages/loginPage";
import Signup from "./pages/signup";
import Home from "./pages/homePage";
import AOS from "aos";
import "aos/dist/aos.css";
import DiscoverPlanets from "./pages/discoverPlanets";
import Favourite from "./pages/favourit";
import Animation from "./pages/animation";
import EarthMoon from "./pages/earth-moon";
import SolarSystem from "./pages/solarsystem";
import ComparePlanets from "./pages/comparePlanets";
import CompareResult from "./pages/compareResults";
import DiscoverGalaxies from "./pages/discoverGalaxies";
import Galaxy from "./pages/galaxy";
import Satellites from "./pages/discoverSatllites";
import Satellite from "./pages/satellite";
import Stars from "./pages/discoverStars";
import Star from "./pages/star";
import Quiz from "./pages/playQuiz";
import StartQuiz from "./pages/startQuiz";
import QuizResult from "./pages/quizResult";
import Settings from "./pages/settings";
import UpdateProfile from "./pages/updateProfile";
import EditPassword from "./pages/editPassword";
import DeleteAccount from "./pages/deleteAccount";
import AboutUs from "./pages/aboutUs";
import Profile from "./pages/profile";
import { Toaster } from "sonner";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          duration: 3000,
          classNames: {
            toast:
              "rounded-xl text-sm shadow-lg border border-white/10 font-poppins",
            success:
              "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none",
            error:
              "bg-gradient-to-r from-red-500 to-rose-600 text-white border-none",
            warning:
              "bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-none",
            info: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none",
          },
          style: {
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 25px rgba(0,0,0,0.3)",
            animation: "toastPop 0.4s ease-out",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {token && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/planets" element={<DiscoverPlanets />} />
            <Route path="/favourit" element={<Favourite />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/moonanimation" element={<EarthMoon />} />
            <Route path="/Solarsystem" element={<SolarSystem />} />
            <Route path="/comparePlanets" element={<ComparePlanets />} />
            <Route path="/compare-result" element={<CompareResult />} />
            <Route path="/discover-galaxies" element={<DiscoverGalaxies />} />
            <Route path="/galaxy-details/:id" element={<Galaxy />} />
            <Route path="/satellites" element={<Satellites />} />
            <Route path="/satellites/:id" element={<Satellite />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/star/:id" element={<Star />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/level" element={<StartQuiz />} />
            <Route path="/quizResult" element={<QuizResult />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<UpdateProfile />} />
            <Route path="/settings/edit-password" element={<EditPassword />} />
            <Route
              path="/settings/delete-account"
              element={<DeleteAccount />}
            />
            <Route path="/settings/about-us" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
