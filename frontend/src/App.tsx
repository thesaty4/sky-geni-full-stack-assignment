import { Navigate, Route, Routes } from "react-router-dom";
import ChartInfo from "./pages/chart-info/ChartInfo";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import NotFound from "./pages/page-not-found/PageNotFound";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard with Nested Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="customer-type" element={<ChartInfo />} />
        <Route path="user-type" element={<ChartInfo />} />
      </Route>

      {/* Catch All - 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
