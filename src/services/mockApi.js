import { mockData } from './mockData';

export const fetchDashboardData = () => {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.floor(Math.random() * 1000); // 1s to 2s
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("Simulated Server Error: Failed to fetch dashboard data."));
      } else {
        resolve(mockData);
      }
    }, delay);
  });
};