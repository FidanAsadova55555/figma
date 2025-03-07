import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const target = dayjs(targetDate);
    const diff = target.diff(now);

    return dayjs.duration(diff);
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-center text-gray-800 font-bold text-2xl">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
        const timeValue =
          i === 0
            ? timeLeft.days().toString().padStart(2, "0")
            : i === 1
            ? timeLeft.hours().toString().padStart(2, "0")
            : i === 2
            ? timeLeft.minutes().toString().padStart(2, "0")
            : timeLeft.seconds().toString().padStart(2, "0");

        return (
          <div key={label} className="bg-gray-100 p-4 rounded-md">
            <div className="text-3xl">{timeValue}</div>
            <div className="text-sm">{label}</div>
          </div>
        );
      })}
    </div>
  );
};


    