import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ProjectsArchivePage } from "./pages/ProjectsArchivePage";
import { ProjectCaseStudyPage } from "./pages/ProjectCaseStudyPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useTheme } from "./hooks/useTheme";
import { useLocale } from "./hooks/useLocale";
import "./fonts.css";
import "./styles.css";

function App() {
  const { locale, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          element={<RootLayout locale={locale} onToggleLocale={toggleLocale} theme={theme} onToggleTheme={toggleTheme} />}
        >
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsArchivePage />} />
          <Route path="projects/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
