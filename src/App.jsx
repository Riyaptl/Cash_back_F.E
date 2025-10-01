// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/authPage";
import WinnersPage from "./pages/winnerPage";
import SerialPage from "./pages/serialPage";
import ClaimRewardPage from "./pages/rewardPage";
import TermsAndConditions from "./pages/Terms&Conditions"
import MaintenancePage from "./pages/maintenance"

function App() {
  const { user } = useSelector((state) => state.auth); // use user instead of token

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/winners" replace /> : <Navigate to="/auth" replace />}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/winners"
          element={user ? <WinnersPage /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/serials"
          element={user ? <SerialPage /> : <Navigate to="/auth" replace />}
        />
        {/* <Route path="/claim" element={user? <ClaimRewardPage/> : <MaintenancePage/>} /> */}
        <Route path="/claim" element={<ClaimRewardPage/>} />
        <Route path="/t&c" element={<TermsAndConditions />} />

        {/* Catch all */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
