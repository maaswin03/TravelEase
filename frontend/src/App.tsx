import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { FourSquare } from "react-loading-indicators";
import AuthPage from "./Pages/AuthPage";
import Home from "./Pages/Home";
import TravelPackages from "./Pages/Packages";
import Destination from "./Pages/Destination";
import { ReactNode } from 'react';
import TravelPackageView from "./Pages/TravelPackageView";
import PaymentPage from "./Pages/Payment";
import AboutPage from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import ProfilePage from "./Pages/Profile";
import NotFound from "./Pages/Notfound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/authentication" element={<RedirectAuthenticated><AuthPage /></RedirectAuthenticated>} />
        <Route path="/" element={<Home/>} />
        <Route path="/destination" element={<Destination/>} />
        <Route path="/aboutus" element={<AboutPage/>} />
        <Route path="/contactus" element={<ContactUs/>} />

        <Route path="/packages/:stateId" element={<PrivateRoute><TravelPackages/></PrivateRoute>} />
        <Route path="/detailedview/:stateid/:encodedId" element={<PrivateRoute><TravelPackageView /></PrivateRoute>} />
        <Route path="/account/info" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path="/payment/:stateid/:encodedId" element={<PrivateRoute><PaymentPage/></PrivateRoute>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

function RedirectAuthenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  

  if (isAuthenticated === null) {
    return (
      <div>
        <FourSquare color="blue" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  console.log("private" ,isAuthenticated)

  if (isAuthenticated === null) {
    return (
      <div>
        <FourSquare color="blue" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/user/authentication" />;
  }

  return children;
}