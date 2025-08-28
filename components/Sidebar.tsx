"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Menu, X, Trash2 } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  sections: Array<{
    key: string;
    title: string;
  }>;
  onDeleteSection: (sectionKey: string) => void;
}

const Sidebar = ({ sections, onDeleteSection }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToSection = (sectionKey: string) => {
    const element = document.getElementById(sectionKey);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMobileOpen(false); // Close mobile menu after navigation
    }
  };

  const sidebarVariants = {
    expanded: {
      width: "280px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    collapsed: {
      width: "60px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1e1e1e] text-white p-2 rounded-lg border border-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`
          bg-[#1e1e1e] border-r border-gray-700 flex flex-col
          lg:relative lg:translate-x-0
          fixed inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        initial="expanded"
      >
        <div className="p-4 border-b border-gray-700">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded && <span className="font-semibold">Navigation</span>}
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.key}
              className="group relative"
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={() => scrollToSection(section.key)}
                className="w-full text-left p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(75, 85, 99, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isExpanded ? (
                  <span className="block truncate pr-8">{section.title}</span>
                ) : (
                  <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {section.title.charAt(0)}
                    </span>
                  </div>
                )}
              </motion.button>
              
              {isExpanded && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSection(section.key);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {isExpanded && (
          <motion.div
            className="p-4 border-t border-gray-700 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="w-full text-left p-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileOpen(false);
              }}
              whileHover={{ x: 5 }}
            >
              Back to top
            </motion.button>
            <motion.button
              className="w-full text-left p-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                setIsMobileOpen(false);
              }}
              whileHover={{ x: 5 }}
            >
              Go to bottom
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Sidebar;