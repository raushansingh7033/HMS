import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "../../../data/DashBoardData";

const TopCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Appointments" value="1,245" color="#4c6ef5" />
      <Card title="Patients" value="820" color="#12b886" />
      <Card title="Revenue" value="₹45,200" color="#fa5252" />
    </div>
  );
};

const Card = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
          style={{ background: color }}
        >
          +
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={`gradient-${title}`}
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
              dataKey="appointments"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
            />

            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCards;
