export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  ANALYST: "Analyst",
};

export const roleAccess = {
  admin: {
    dashboard: "full",
    wasteAnalytics: "full",
    fleetMonitoring: "full",
    recyclingMetrics: "full",
    reports: "full",
    settings: "full",
  },
  manager: {
    dashboard: "full",
    wasteAnalytics: "full",
    fleetMonitoring: "full",
    recyclingMetrics: "full",
    reports: "full",
    settings: "none",
  },
  analyst: {
    dashboard: "full",
    wasteAnalytics: "full",
    fleetMonitoring: "view",
    recyclingMetrics: "full",
    reports: "view",
    settings: "none",
  },
};

export const normalizeRole = (role) => (role || "").toLowerCase();

export const canAccessFeature = (role, featureKey) => {
  const accessMap = roleAccess[normalizeRole(role)];
  if (!accessMap) return false;
  const level = accessMap[featureKey];
  return level === "full" || level === "view";
};