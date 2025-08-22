// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CRMLayout from "./CRMLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import RequestPlatform from "./pages/RequestPlatform";
import RequestTraining from "./pages/RequestTraining";
import Settings from "./pages/Settings";
import TermsofUse from "./components/TermsofUse";
import PlatformRegis from "./pages/PlatformRegis";
import PlatformTracking from "./pages/PlatformTracking";
import VerifyEmail from "./components/VerifyEmail";
import SentEmail from "./components/SentEmail";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="termsofUse" element={<TermsofUse />} />
      <Route path="platformRegis" element={<PlatformRegis />} />
      <Route path="platformTracking" element={<PlatformTracking />} />
      <Route path="verifyEmail" element={<VerifyEmail />} />
      <Route path="sentEmail" element={<SentEmail />} />

      {/* CRM Layout with Nested Routes */}
      <Route path="/crm-sme" element={<CRMLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="company" element={<Company />} />
        <Route path="platform" element={<RequestPlatform />} />
        <Route path="training" element={<RequestTraining />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
