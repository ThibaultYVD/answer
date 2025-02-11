import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiLogOut, FiUserPlus, FiLogIn } from "react-icons/fi";
import NavButton from "./NavButton";

const DesktopNav = ({ isLoggedIn, onLogout }) => (
  <nav className="hidden md:flex items-center gap-4">
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.div
          key="logged-in"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex gap-4"
        >
          <Link to="/quizz/create">
            <NavButton>
              <span className="flex items-center gap-2">
                Créer un Quiz
                <FiPlus className="text-lg" />
              </span>
            </NavButton>
          </Link>
          <NavButton onClick={onLogout} variant="danger">
            <span className="flex items-center gap-2">
              Se déconnecter
              <FiLogOut className="text-lg" />
            </span>
          </NavButton>
        </motion.div>
      ) : (
        <motion.div
          key="logged-out"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex gap-4"
        >
          <Link to="/auth/register">
            <NavButton>
              <span className="flex items-center gap-2">
                Créer un compte
                <FiUserPlus className="text-lg" />
              </span>
            </NavButton>
          </Link>
          <Link to="/auth/login">
            <NavButton>
              <span className="flex items-center gap-2">
                Se connecter
                <FiLogIn className="text-lg" />
              </span>
            </NavButton>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);

export default DesktopNav;