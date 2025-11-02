import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const WindChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Wind (kph)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="avg_wind_kph"
            stroke="#ff9800"
            fill="#ffe0b2"
            name="Wind (kph)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
    