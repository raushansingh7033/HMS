import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { data } from "../../../data/DashBoardData";

const Visits = () => {
  const getSum = (data, key) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  return (
    <div
      className="bg-orange-50 rounded-xl orange p-3"
      style={{ height: "280px" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-semibold">Visits</div>
          <div className="text-xs text-gray-500">Last 7 days</div>
        </div>
        <div className="text-2xl font-bold text-orange-700">
          {getSum(data, "appointments")}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="gradient-appointments"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="orange" stopOpacity={0.5} />
              <stop offset="100%" stopColor="orange" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            height={160}
            type="monotone"
            dataKey="appointments"
            stroke="violet"
            strokeWidth={2}
            fill="url(#gradient-appointments)"
          />

          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visits;
