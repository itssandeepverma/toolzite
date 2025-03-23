import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-04-01T00:00:00"); // Change to your launch date
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coming-soon-container">
      <h1 className="title">🚀 Something Amazing is Coming Soon! 🚀</h1>
      <p className="subtitle">We're working hard to bring you an exciting experience.</p>

      <div className="countdown">
        <div className="time-box">
          <span>{timeLeft.days}</span>
          <p>Days</p>
        </div>
        <div className="time-box">
          <span>{timeLeft.hours}</span>
          <p>Hours</p>
        </div>
        <div className="time-box">
          <span>{timeLeft.minutes}</span>
          <p>Minutes</p>
        </div>
        <div className="time-box">
          <span>{timeLeft.seconds}</span>
          <p>Seconds</p>
        </div>
      </div>

      <p className="footer">Stay tuned! 🚀</p>

      <style>
        {`
          .coming-soon-container {
            text-align: center;
            margin-top: 50px;
            font-family: 'Arial', sans-serif;
            color: white;
            background:rgba(28, 28, 28, 0.57);
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .title {
            font-size: 3rem;
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            animation: fadeIn 2s ease-in-out;
          }

          .subtitle {
            font-size: 1.5rem;
            margin-top: 10px;
            opacity: 0.8;
          }

          .countdown {
            display: flex;
            gap: 20px;
            margin-top: 30px;
          }

          .time-box {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            width: 80px;
            text-align: center;
          }

          .time-box span {
            font-size: 2rem;
            font-weight: bold;
            display: block;
          }

          .time-box p {
            font-size: 1rem;
            margin-top: 5px;
          }

          .footer {
            margin-top: 30px;
            font-size: 1.2rem;
            opacity: 0.7;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ComingSoon;
