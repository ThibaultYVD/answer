import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import { AuthProvider } from "@contexts/AuthContext";

function Layout({ children }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default Layout;
