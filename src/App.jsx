import "./App.css";
import Dashboard from "./layouts/Dashboard";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Report from "./pages/Report";
import Login from "./pages/Login";
import { RouterProvider, redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import CounselingPage from "./pages/CounselinPage/CounselingPage";
import Career from "./pages/Career";
import { getAuthCookie } from "./utils/cookies";

// element router bisa diganti ke component sesuai page

// const LandingPage = () => {
//   return <h1>Landing Page</h1>;
//   // return <LandingPage />;
// };

// const Login = () => {
//   return <h1>Login Page</h1>;
//   // return <LoginPage />;
// };

const Profile = () => {
  return <h1>Profile Page</h1>;
  // return <ProfilePage/>
};

const UserAndCounselor = () => {
  return <h1>User and Counselor Page</h1>;
  // return <UserAndCounselorPage/>
};

// const Counseling = () => {
//   return <h1>Counseling Page</h1>;
//   // return <CounselingPage/>
// };

// const Career = () => {
//   return <h1>Career Page</h1>;
// return <CareerPage/>
// };

const ArticleAndForum = () => {
  return <h1>ArticleAndForum Page</h1>;
  // return <ArticleAndForumPage/>
};

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
    path: "/profile",
    element: <Dashboard />,
    children: [
      {
        element: <Profile />,
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
    element: <Dashboard />,
    children: [
      {
        element: <UserAndCounselor />,
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
    element: <Dashboard />,
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
    element: <Dashboard />,
    children: [
      {
        element: <ArticleAndForum />,
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
