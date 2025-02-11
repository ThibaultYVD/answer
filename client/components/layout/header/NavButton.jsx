import React from "react";
import { motion } from "framer-motion";
import Button from "@components/ui/Button";

const NavButton = ({ onClick, variant = "default", children }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      onClick={onClick}
      extraClass={variant === "danger" ? "bg-red-500 hover:bg-red-600" : ""}
    >
      {children}
    </Button>
  </motion.div>
);

export default NavButton;