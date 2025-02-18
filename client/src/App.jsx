import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "@components/layout/Layout";
import Admin from "@/admin/page";
import AuthRegister from "@/auth/register/page";
import AuthLogin from "@/auth/login/page";
import Home from "@/home/page";
import QuizzDetailPage from "@/quizz/[id]/page";
import CreateQuizzPage from "@/quizz/create/page";
import EditQuizzPage from "@/quizz/edit/page";
import QuizzListPage from "@/quizz/page";
import Rgpd from "@/rgpd/page";
import { ProtectedRoute } from "@components/layout/ProtectedRoute";
import { PublicRoute } from "@components/layout/PublicRoute";
import { AdminRoute } from "@components/layout/AdminRoute";
import { AuthProvider } from "@contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/rgpd" element={<Rgpd />} />
            <Route
              path="/auth/register"
              element={
                <PublicRoute>
                  <AuthRegister />
                </PublicRoute>
              }
            />
            <Route
              path="/auth/login"
              element={
                <PublicRoute>
                  <AuthLogin />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/quizz"
              element={
                <ProtectedRoute>
                  <QuizzListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizz/:id"
              element={
                <ProtectedRoute>
                  <QuizzDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizz/create"
              element={
                <ProtectedRoute>
                  <CreateQuizzPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizz/:id/edit"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <EditQuizzPage />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
