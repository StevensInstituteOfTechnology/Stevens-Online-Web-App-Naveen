import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Collapsible Section Component
 * 
 * A reusable component for creating collapsible/expandable sections with:
 * - Smooth animations using Framer Motion
 * - Full keyboard accessibility (Enter/Space)
 * - ARIA labels for screen readers
 * - Optional localStorage persistence
 * - Customizable styling
 * 
 * @param {string} id - Unique identifier for the section (required for accessibility)
 * @param {string} title - Section title/header text
 * @param {React.ReactNode} children - Content to be collapsed/expanded
 * @param {boolean} defaultOpen - Whether section is open by default (default: true)
 * @param {boolean} persist - Whether to save state in localStorage (default: false)
 * @param {string} className - Additional CSS classes for the container
 * @param {string} headerClassName - Additional CSS classes for the header
 * @param {string} contentClassName - Additional CSS classes for the content
 * @param {React.ReactNode} icon - Optional icon to display before title
 * @param {React.ReactNode} badge - Optional badge/element to display in header
 */
const CollapsibleSection = ({
  id,
  title,
  children,
  defaultOpen = true,
  persist = false,
  className = '',
  headerClassName = '',
  contentClassName = '',
  icon = null,
  badge = null,
}) => {
  // Initialize state from localStorage if persist is enabled
  const [isOpen, setIsOpen] = useState(() => {
    if (persist && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`collapsible-${id}`);
      return saved !== null ? JSON.parse(saved) : defaultOpen;
    }
    return defaultOpen;
  });

  // Toggle function with optional localStorage persistence
  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (persist && typeof window !== 'undefined') {
      localStorage.setItem(`collapsible-${id}`, JSON.stringify(newState));
    }
  };

  // Handle keyboard events (Enter and Space)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`collapsible-section ${className}`}>
      {/* Header / Toggle Button */}
      <motion.button
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`collapsible-content-${id}`}
        id={`collapsible-header-${id}`}
        className={`w-full flex items-center justify-between py-5 px-6 backdrop-blur-xl bg-white/[0.12] hover:bg-white/[0.20] rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stevens-maroon focus:ring-offset-2 focus:ring-offset-gray-900 border border-white/20 hover:border-white/30 ${headerClassName}`}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <h3 className="text-lg md:text-xl font-semibold text-white text-left">
            {title}
          </h3>
          {badge && <span className="ml-2">{badge}</span>}
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-white" aria-hidden="true" />
        </motion.div>
      </motion.button>

      {/* Content with Animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`collapsible-content-${id}`}
            role="region"
            aria-labelledby={`collapsible-header-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: 'easeInOut'
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.1,
                  ease: 'easeInOut'
                }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: 'easeInOut'
                },
                opacity: {
                  duration: 0.2,
                  ease: 'easeInOut'
                }
              }
            }}
            className="overflow-hidden"
          >
            <div className={`pt-4 ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleSection;

CollapsibleSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  persist: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.node,
};

CollapsibleSection.defaultProps = {
  defaultOpen: true,
  persist: false,
  className: '',
  headerClassName: '',
  contentClassName: '',
  icon: null,
  badge: null,
};

