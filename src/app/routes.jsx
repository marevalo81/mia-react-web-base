import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "@features/dashboard";
import { Example } from "@features/example";
import MainLayout from "@layouts/MainLayout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/example" element={<Example />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
