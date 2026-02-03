'use client'
import React from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { Card } from "@radix-ui/themes";

interface Prop {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Prop) => {
  const data = [
    { name: "Open", value: open, gradient: "greenGradient" },
    { name: "In Progress", value: inProgress, gradient: "orangeGradient" },
    { name: "Closed", value: closed, gradient: "redGradient" },
  ];

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, value, gradient, index } = props;
    
    return (
      <g>
        {/* Only render defs once for the first element */}
        {index === 0 && (
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
            </linearGradient>
            
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        )}
        
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={`url(#${gradient})`}
          stroke="#fff"
          strokeWidth={2}
        />
        {width > 60 && height > 40 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 8}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
              fontWeight="bold"
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 12}
              textAnchor="middle"
              fill="#fff"
              fontSize={16}
              fontWeight="600"
            >
              {value}
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={data}
          dataKey="value"
          nameKey="name"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomContent />}
        />
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
