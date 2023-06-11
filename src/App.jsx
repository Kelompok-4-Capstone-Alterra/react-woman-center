import "./App.css";
import Dashboard from "./layouts/Dashboard";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Report from "./pages/Report";
import Login from "./pages/Login";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Career from "./pages/Career";
import UserAndCounselor from "./pages/UserCounselorPage";

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

//const UserAndCounselor = () => {
  //return <h1>User and Counselor Page</h1>;
  // return <UserAndCounselorPage/>
//};

const Counseling = () => {
  return <h1>Counseling Page</h1>;
  // return <CounselingPage/>
};

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
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        element: <DashboardPage />,
        index: true,
      },
    ],
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
  },
  {
    path: "/user-counselor",
    element: <Dashboard page="UserAndCounselor" />,
    children: [
      {
        element: <UserAndCounselor />,
        index: true,
      },
    ],
  },
  {
    path: "/counseling",
    element: <Dashboard />,
    children: [
      {
        element: <Counseling />,
        index: true,
      },
    ],
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
