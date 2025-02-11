import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";
import AuthRegister from "@/auth/register/page";
import AuthLogin from "@/auth/login/page";
import Home from "@/home/page";
import QuizzDetailPage from "@/quizz/[id]/page";
import CreateQuizzPage from "@/quizz/create/page";
import EditQuizzPage from "@/quizz/edit/page";
import QuizzListPage from "@/quizz/page";
import { ProtectedRoute } from "@components/layout/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/" element={<Home />} />
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
                <EditQuizzPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
