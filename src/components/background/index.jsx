import { useEffect, useState } from "react";

const StarryBackground = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const totalStars = 150;
    const totalShootingStars = 4;

    // 🌟 static twinkling stars
    const newStars = Array.from({ length: totalStars }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1 + 1,
      delay: `${Math.random() * 10}s`,
    }));
    setStars(newStars);

    // 🌠 glowing shooting stars (same angle)
    const newShootingStars = Array.from({ length: totalShootingStars }).map(
      () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 25}s`,
        angle: "45deg", // fixed same angle for all
      })
    );
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="absolute z-10 inset-0 overflow-hidden">
      {/* 💡 comet moving across sky */}
      {/* <img
        src="/setlight.png"
        alt="moving-light"
        className="absolute w-[100px] h-auto animate-lightFly pointer-events-none"
        style={{
          top: "10%",
          opacity: 0.9,
        }}
      /> */}

      {/* 🌟 static twinkling stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white star-blink"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            boxShadow: "0 0 6px rgba(255,255,255,0.7)",
          }}
        />
      ))}

      {/* 🌠 smooth glowing shooting stars */}
      {shootingStars.map((shoot, i) => (
        <div
          key={`shoot-${i}`}
          className="shooting-star"
          style={{
            top: shoot.top,
            left: shoot.left,
            animationDelay: shoot.delay,
            "--angle": shoot.angle,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
