import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";
import QuizzDetailPage from "@/quizz/[id]/page";
import CreateQuizzPage from "@/quizz/create/page";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/quizz/:id" element={<QuizzDetailPage />} />

          <Route path="/quizz/create" element={<CreateQuizzPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;