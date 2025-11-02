import { useEffect, useState } from "react";

const StarryBackground2 = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const totalStars = 4000;
    const newStars = Array.from({ length: totalStars }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: `${Math.random() * 1}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden animate-[spin_200s_linear_infinite_reverse]">
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
    </div>
  );
};

export default StarryBackground2;
