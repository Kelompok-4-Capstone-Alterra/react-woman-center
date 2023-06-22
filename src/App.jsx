import { RouterProvider, redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { getAuthCookie } from "./utils/cookies";
import CounselingPage from "./pages/CounselinPage/CounselingPage";
import Dashboard from "./layouts/Dashboard";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Report from "./pages/Report";
import Login from "./pages/Login";
import Career from "./pages/Career";
import UserCounselorPage from "./pages/UserCounselorPage";
import ArticleForumPage from "./pages/ArticleForumPage";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const userAuth = getAuthCookie();

      if (userAuth) {
        return redirect("/dashboard");
      }

      return null;
    },
  },
  {
    path: "/dashboard",
    element: <Dashboard page="Hello, Admin!" />,
    children: [
      {
        element: <DashboardPage />,
        index: true,
      },
    ],
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/user-counselor",
    element: <Dashboard page="User & Counselor" />,
    children: [
      {
        element: <UserCounselorPage />,
        index: true,
      },
    ],
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/counseling",
    element: <Dashboard page="Counseling" />,
    children: [
      {
        element: <CounselingPage />,
        index: true,
      },
    ],
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/career",
    element: <Dashboard page="Career" />,
    children: [
      {
        element: <Career />,
        index: true,
      },
    ],
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/article-forum",
    element: <Dashboard page="Article & Discussion" />,
    children: [
      {
        element: <ArticleForumPage />,
        index: true,
      },
    ],
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/report",
    element: <Dashboard />,
    children: [
      {
        element: <Report />,
        index: true,
      },
    ],
    loader: () => {
      const userAuth = getAuthCookie();

      if (!userAuth) {
        return redirect("/login");
      }

      return null;
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
