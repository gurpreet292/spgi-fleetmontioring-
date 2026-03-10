import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/Dashboard";
import Overview from "../pages/Overview";
import Reports from "../pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);