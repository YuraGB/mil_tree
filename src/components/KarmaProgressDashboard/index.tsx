"use client";
import React, { useState } from "react";

export default function KarmaBar({
  valueDefault,
  saveWidget,
  widgetId,
}: {
  valueDefault: number;
  saveWidget: (
    widgetId: number,
    { karmaValue }: { karmaValue: number },
  ) => void;
  widgetId: number;
}) {
  const [value, setValue] = useState(valueDefault ?? 0); // від -100 до +100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    saveWidget(widgetId, { karmaValue: Number(e.target.value) });
  };

  const getColor = () => {
    if (value < 0) return "bg-red-500";
    if (value > 0) return "bg-green-500";
    return "bg-gray-400";
  };

  return (
    <div className="m-auto max-w-xl rounded border p-1">
      <p>Karma points</p>
      <div className="relative h-6 w-full rounded border bg-gradient-to-r from-red-100 via-gray-300 to-green-100">
        {/* заповнена частина */}

        <div
          className={`absolute top-0 h-6 ${getColor()}`}
          style={{
            left: value < 0 ? `${50 + value / 2}%` : "50%",
            width: `${Math.abs(value) / 2}%`,
          }}
        />
        {/* повзунок */}
        <input
          type="range"
          min={-100}
          max={100}
          value={value}
          onChange={handleChange}
          className="absolute h-6 w-full cursor-pointer opacity-0"
        />
      </div>
      <div className="mt-2 text-center font-semibold">{value}</div>
    </div>
  );
}
