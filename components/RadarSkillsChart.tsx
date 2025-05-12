import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: [
    'Frontend',
    'Backend',
    'DevOps',
    'AI/ML',
    'Mobile',
    'UI/UX',
    'Cloud',
  ],
  datasets: [
    {
      label: 'Proficiency',
      data: [95, 90, 80, 75, 70, 85, 80],
      backgroundColor: 'rgba(30, 41, 59, 0.25)',
      borderColor: 'rgba(30, 41, 59, 0.7)',
      pointBackgroundColor: 'rgba(30, 41, 59, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(30, 41, 59, 1)',
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    r: {
      angleLines: { color: 'rgba(0,0,0,0.08)' },
      grid: { color: 'rgba(0,0,0,0.08)' },
      pointLabels: {
        color: '#222',
        font: { size: 14, weight: 'bold' as const },
      },
      min: 0,
      max: 100,
      ticks: {
        display: false,
      },
    },
  },
};

export default function RadarSkillsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="bg-white/50 backdrop-blur-md rounded-xl shadow border border-black/10 p-4 flex items-center justify-center w-full h-full"
      style={{ minHeight: 320, minWidth: 0 }}
    >
      <Radar data={data} options={options} style={{ maxWidth: 320, maxHeight: 320 }} />
    </motion.div>
  );
} 