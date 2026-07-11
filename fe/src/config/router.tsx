import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import MainLayout from "@/layouts/MainLayout";
import Attendance from "@/pages/Attendance";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    element: <Login />,
    path: '/'
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/attendance',
        element: <Attendance />
      }
    ]
  },
]);
