import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const CountdownTimer = ({ targetDate }) => {
  const getTimeLeft = () => {
    const now = dayjs(); 
    const target = dayjs(targetDate); 
    const diff = target.diff(now); 
    return dayjs.duration(diff);
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-[16px]">
      {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => {
        let value;

        if (index === 0) value = timeLeft.days();
        if (index === 1) value = timeLeft.hours();
        if (index === 2) value = timeLeft.minutes();
        if (index === 3) value = timeLeft.seconds();

        return (
          <div className="flex flex-col justify-center items-center">
          <div key={unit} className="bg-gray-100 py-[11px]  px-[9px]  text-center text-footbg font-poppins text-[34px]  font-medium leading-[38px] tracking-[-0.6px] ">
            <div className="text-3xl">{String(value).padStart(2, "0")}</div>
          </div>
                      <div className="text-[12px] text-old font-inter font-normal leading-[20px]" >{unit}</div>
</div>
        );
      })}
    </div>
  );
};
