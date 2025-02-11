import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiPlus, FiLogOut, FiUserPlus, FiLogIn } from "react-icons/fi";
import Button from "@components/ui/Button";

const MobileNav = ({ isLoggedIn, onLogout, onClose }) => (
  <motion.div
    className="flex flex-col gap-2"
    variants={{
      open: { transition: { staggerChildren: 0.1 } },
      closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
    }}
  >
    <Link
      to="/"
      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--nexa-dark)] rounded transition-colors"
      onClick={onClose}
    >
      <FiHome /> Accueil
    </Link>
    
    {isLoggedIn ? (
      <>
        <Link
          to="/quizz/create"
          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--nexa-dark)] rounded transition-colors text-white"
          onClick={onClose}
        >
          <FiPlus /> Créer un Quiz
        </Link>
        <Button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="flex items-center gap-2 px-4 py-2 text-left hover:bg-red-600 rounded transition-colors border-red-600 text-white"
        >
          <FiLogOut /> Se déconnecter
        </Button>
      </>
    ) : (
      <>
        <Link
          to="/auth/register"
          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--nexa-dark)] rounded transition-colors text-white"
          onClick={onClose}
        >
          <FiUserPlus /> Créer un compte
        </Link>
        <Link
          to="/auth/login"
          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--nexa-dark)] rounded transition-colors text-white"
          onClick={onClose}
        >
          <FiLogIn /> Se connecter
        </Link>
      </>
    )}
  </motion.div>
);

export default MobileNav;