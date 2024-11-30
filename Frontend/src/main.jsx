import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import MentifyStore from "../src/store/index.js";
import { Provider } from "react-redux";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SignupPage from "./pages/Login/SignupPage.jsx";
import MainUserPanel from "./pages/UserPanel/MainUserPanel.jsx";
import ForgetPassword from "./pages/Password/ForgetPassword.jsx";
import ResetPassword from "./pages/Password/ResetPassword.jsx";

import HomePage from "./pages/Home/HomePage.jsx";
import Dashboard from "./pages/UserPanel/Dashboard.jsx";
import History from "./pages/UserPanel/History.jsx";
import Notifications from "./pages/UserPanel/Notifications.jsx";
import Settings from "./pages/UserPanel/Settings.jsx";
import ScheduleMeeting from "./pages/UserPanel/ScheduleMeeting.jsx";
import Support from "./pages/UserPanel/Support.jsx";
import FeedBackAndRatings from "./pages/UserPanel/FeedBackAndRatings.jsx";
import UserRoute from "./pages/Auth/UserRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/index.js";
import Unauthorized from "./pages/Auth/Unauthorized.jsx";
import AdminRoute from "./pages/Auth/AdminRoute.jsx";
import AdminPanel from "./pages/Admin/AdminPanel.jsx";
import ManageUser from "./pages/Admin/ManageUser.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateUser from "./pages/Admin/CreateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },

  {
    path: "/user",
    element: <App />,
    children: [
      {
        path: "/user/login",
        element: <LoginPage />,
      },
      {
        path: "/user/dashboard",
        element: (
          <UserRoute>
            <MainUserPanel />
          </UserRoute>
        ),
        children: [
          {
            path: "/user/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/user/dashboard/history",
            element: <History />,
          },
          {
            path: "/user/dashboard/notifications",
            element: <Notifications />,
          },
          {
            path: "/user/dashboard/settings",
            element: <Settings />,
          },
          {
            path: "/user/dashboard/scheduledmeetings",
            element: <ScheduleMeeting />,
          },
          {
            path: "/user/dashboard/support",
            element: <Support />,
          },
          {
            path: "/user/dashboard/feedback",
            element: <FeedBackAndRatings />,
          },
        ],
      },
      {
        path: "/user/signup",
        element: <SignupPage />,
      },
      {
        path: "/user/forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "/user/api/v1/password/reset/:token",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard/manageusers",
        element: <ManageUser />,
      },
      {
        path: "/admin/dashboard/create-user",
        element: <CreateUser />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={MentifyStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
