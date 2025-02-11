import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

const Logo = () => (
  <Link to="/">
    <motion.div
      className="flex items-center gap-2 text-xl font-bold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiAward className="text-2xl" />
      <span>Answer</span>
    </motion.div>
  </Link>
);

export default Logo;