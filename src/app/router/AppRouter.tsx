import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/app/layout/AppLayout";
import { ScenarioEditorPage } from "@/pages/scenario-editor/ScenarioEditorPage";
import { ScenariosListPage } from "@/pages/scenarios-list/ScenariosListPage";
import { ROUTES } from "@/shared/config/routes";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.scenarios} element={<ScenariosListPage />} />
        <Route path="/scenarios/:scenarioId/edit" element={<ScenarioEditorPage />} />
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.scenarios} replace />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.scenarios} replace />} />
    </Routes>
  );
}
