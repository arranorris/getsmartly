import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
}

export default function StatsCard({ name, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{name}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-[#D7092E]" />
      </div>
      <p
        className={`mt-2 text-sm ${
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {change}
      </p>
    </div>
  );
}