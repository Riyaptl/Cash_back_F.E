// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/authPage";
import WinnersPage from "./pages/winnerPage";
import SerialPage from "./pages/serialPage";
import ClaimRewardPage from "./pages/rewardPage";
import TermsAndConditions from "./pages/Terms&Conditions";
import MaintenancePage from "./pages/maintenance";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Toaster position="top-center" />

      {!user ? (
        // 🚧 If NOT logged in → show only Maintenance Page
        <MaintenancePage />
      ) : (
        // ✅ If logged in → allow full app access
        <Routes>
          <Route path="/" element={<Navigate to="/winners" replace />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="/serials" element={<SerialPage />} />
          <Route path="/claim" element={<ClaimRewardPage />} />
          <Route path="/t&c" element={<TermsAndConditions />} />

          {/* Catch all */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10 text-2xl">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;