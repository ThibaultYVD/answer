import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";
import AuthRegister from "@/auth/register/page";
import AuthLogin from "@/auth/login/page";
import QuizzDetailPage from "@/quizz/[id]/page";
import CreateQuizzPage from "@/quizz/create/page";
import EditQuizzPage from "@/quizz/edit/page";
import QuizzListPage from "@/quizz/page";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/quizz" element={<QuizzListPage />} />
          <Route path="/quizz/:id" element={<QuizzDetailPage />} />
          <Route path="/quizz/create" element={<CreateQuizzPage />} />
          <Route path="/quizz/:id/edit" element={<EditQuizzPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;