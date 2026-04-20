import { motion } from 'framer-motion';

/**
 * PageWrapper — wraps every page for smooth fade+slide transitions.
 * Used inside AnimatePresence in App.jsx.
 */
export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
