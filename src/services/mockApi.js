import { mockData } from './mockData';

export const fetchDashboardData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0) { 
        reject(new Error("Simulated Server Error: Failed to fetch dashboard data."));
      } else {
        resolve(mockData); 
      }
    }, 500);
  });
};