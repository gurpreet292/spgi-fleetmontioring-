import React from 'react';
import { Truck, Trash2, Recycle, Clock } from 'lucide-react';

const recentActivities = [
  { id: 1, type: 'Collection Request', location: 'University Campus', time: 'in 26 minutes', status: 'pending' },
  { id: 2, type: 'Disposal Request', location: 'Industrial Area, Tihara', time: 'in about 6 hours', status: 'pending' },
  { id: 3, type: 'Recycling Request', location: 'Railway Station Area', time: 'about 22 hours ago', status: 'pending' },
  { id: 4, type: 'Collection Request', location: 'Sector 7, Chhibramau', time: 'in about 19 hours', status: 'pending' },
  { id: 5, type: 'Collection Request', location: 'University Campus', time: 'about 9 hours ago', status: 'pending' },
  { id: 6, type: 'Collection Request', location: 'Commercial Complex', time: 'in 2 days', status: 'in-progress' },
  { id: 7, type: 'Collection Request', location: 'Residential Block B', time: 'in 2 days', status: 'pending' },
  { id: 8, type: 'Disposal Request', location: 'Railway Station Area', time: 'in 2 days', status: 'pending' },
];

const typeIcon = (type) => {
  if (type === 'Recycling Request') return <Recycle size={18} className="text-green-600 dark:text-green-400" />;
  if (type === 'Disposal Request') return <Trash2 size={18} className="text-orange-500 dark:text-orange-400" />;
  return <Truck size={18} className="text-blue-500 dark:text-blue-400" />;
};

const statusBadge = (status) => {
  if (status === 'in-progress') {
    return (
      <span className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
        <Clock size={11} /> in-progress
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-red-300 text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700">
      <Clock size={11} /> pending
    </span>
  );
};

const RecentActivity = () => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Recent Activity</h3>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-700">
        {recentActivities.map((activity) => (
          <li key={activity.id} className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                {typeIcon(activity.type)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{activity.type}</p>
                <p className="text-xs text-blue-500 dark:text-blue-400">{activity.location}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              {statusBadge(activity.status)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
