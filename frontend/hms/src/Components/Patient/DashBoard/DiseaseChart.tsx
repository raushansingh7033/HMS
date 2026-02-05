import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

const data = [
  { name: "Diabetes", value: 40, change: 5 },
  { name: "Heart Disease", value: 25, change: -3 },
  { name: "Cancer", value: 15, change: 2 },
  { name: "Other", value: 20, change: -1 },
];

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

const DiseaseChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <h3 className="text-lg font-semibold mb-4">Diseases Distribution</h3>

      <div className="grid grid-cols-2 gap-4 items-center ">
        {/* Donut Chart */}
        <div className="w-full h-[200px] flex items-center justify-center overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                dataKey="value"
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Percentage + Arrow List */}
        <div className="space-y-3">
          {data.map((item, index) => {
            const percent = ((item.value / total) * 100).toFixed(1);
            const isUp = item.change >= 0;

            return (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></span>
                  <span className="font-medium">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">{percent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiseaseChart;
