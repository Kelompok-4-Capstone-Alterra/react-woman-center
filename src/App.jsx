import './App.css';
import Dashboard from './layouts/Dashboard';
import { Route, Routes } from 'react-router';

function App() {
  // Output return bisa diganti ke component sesuai page

  const Landingpage = () => {
    return <h1>Landing Page</h1>;
    // return <LandingPage />;
  };

  const Login = () => {
    return <h1>Login Page</h1>;
    // return <LoginPage />;
  };

  const Dashboardpage = () => {
    return <h1>Dashboard Page</h1>;
    // return <Dashboard />;
  };

  const Profile = () => {
    return <h1>Profile Page</h1>;
    // return <ProfilePage/>
  };

  const UserAndCounselor = () => {
    return <h1>UserAndCounselor Page</h1>;
    // return <UserAndCounselorPage/>
  };

  const Counseling = () => {
    return <h1>Counseling Page</h1>;
    // return <CounselingPage/>
  };

  const Career = () => {
    return <h1>Career Page</h1>;
    // return <CareerPage/>
  };

  const ArticleAndForum = () => {
    return <h1>ArticleAndForum Page</h1>;
    // return <ArticleAndForumPage/>
  };

  const Report = () => {
    return <h1>Report Page</h1>;
    // return <ReportPage/>
  };

  return (
    <Routes>
      <Route path="/landing-page" element={<Landingpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Dashboardpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-counselor" element={<UserAndCounselor />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/career" element={<Career />} />
        <Route path="/article-forum" element={<ArticleAndForum />} />
        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;
