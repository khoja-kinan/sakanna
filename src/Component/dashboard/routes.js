import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import DashboardApp from "./pages/DashboardApp";
import Specializations from "./pages/Specializations";
import Privileges from "./pages/Privileges";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import Medals from "./pages/Medals";
import Countries from "./pages/Countries";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";

// ----------------------------------------------------------------------

export default function Router() {
  console.log("i'm here");
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LogoOnlyLayout />}>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Protected Routes */}

      {/*  <Route element={<RequireAuth allowedRoles={[1, 5, 9, 13, 17]} />}> */}
      <Route path="/Dashboard" element={<DashboardLayout />}>
        <Route path="app" element={<DashboardApp />} />

        {/* <Route element={<RequireAuth allowedRoles={[1]} />}> */}
        <Route path="user" element={<User />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[13]} />}> */}
        <Route path="specializations" element={<Specializations />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[5]} />}> */}
        <Route path="privileges" element={<Privileges />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[17]} />}> */}
        <Route path="medals" element={<Medals />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[9]} />}> */}
        <Route path="countries" element={<Countries />} />
        {/*  </Route> */}
      </Route>
      {/*  </Route> */}

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/404" />} replace />
    </Routes>
  );
}
