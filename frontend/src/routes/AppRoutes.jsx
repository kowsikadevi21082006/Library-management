import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Books from "../pages/Books";
import Issuance from "../pages/Issuance";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/members" element={<Members />} />

          <Route path="/books" element={<Books />} />

          <Route path="/issuance" element={<Issuance />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;