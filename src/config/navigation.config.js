import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Settings
} from "lucide-react";

export const navigation = [

{
  name: "Dashboard",
  path: "/dashboard",
  icon: LayoutDashboard,
  roles: ["Admin"],
  feature: "dashboard"
},

{
  name: "Operations",
  path: "/operations",
  icon: Zap,
  roles: ["Admin","Manager"],
  feature: "operations"
},

{
  name: "Analytics",
  path: "/analytics",
  icon: BarChart3,
  roles: ["Admin","Analyst"],
  feature: "analytics"
},

{
  name: "Settings",
  path: "/settings",
  icon: Settings,
  roles: ["Admin","Manager","Analyst"],
  feature: "settings"
}

];