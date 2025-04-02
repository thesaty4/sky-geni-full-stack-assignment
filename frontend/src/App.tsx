import { Navigate, Route, Routes } from "react-router-dom";
import ChartInfo from "./pages/chart-info/chart-info";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./pages/dashboard/dashboard-layout";
import NotFound from "./pages/page-not-found/pnf";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard with Nested Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="customer-type" element={<ChartInfo />} />
        <Route path="account-industry" element={<ChartInfo />} />
      </Route>

      {/* Catch All - 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
