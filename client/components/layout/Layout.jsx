import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

function Layout({ children }) {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
      </div>
  );
}

export default Layout;
