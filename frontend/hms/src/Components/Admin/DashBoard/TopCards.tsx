import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { data } from "../../../data/DashBoardData";
import {
  IconFileReport,
  IconStethoscope,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

const TopCards = () => {
  const cards = [
    {
      name: "Appointments",
      id: "appointments",
      color: "#8b5cf6", // violet
      bgColor: "bg-violet-100",
      icon: <IconFileReport />,
      data: data,
    },
    {
      name: "Patients",
      id: "appointments", // using same data key for demo
      color: "#f97316", // orange
      bgColor: "bg-orange-100",
      icon: <IconUsers />,
      data: data,
    },
    {
      name: "Doctors",
      id: "appointments", // using same data key for demo
      color: "#22c55e", // green
      bgColor: "bg-green-100",
      icon: <IconStethoscope />,
      data: data,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

type CardProps = {
  name: string;
  id: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  data: any[];
};

const Card = ({ name, id, color, bgColor, icon, data }: CardProps) => {
  const getSum = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-gray-500 text-sm">{name}</p>
          <h2 className="text-2xl font-bold">{getSum(data, id)}</h2>
        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${bgColor}`}
          style={{ background: color }}
        >
          {icon}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={`gradient-${name}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey={id}
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${name})`}
            />

            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCards;
