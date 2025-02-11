import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "@components/layout/header/Logo";
import DesktopNav from "@components/layout/header/DesktopNav";
import MobileNav from "@components/layout/header/MobileNav";
import { useAuth } from "@hooks/useAuth";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-[var(--nexa)] text-white p-4 w-full sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <DesktopNav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <motion.button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <MobileNav
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;