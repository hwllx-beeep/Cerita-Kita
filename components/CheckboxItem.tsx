"use client";

import { motion, Variants } from "framer-motion";
import { Check, Trash2 } from "lucide-react";

interface CheckboxItemProps {
  item: {
    id: string;
    text: string;
    checked: boolean;
  };
  index: number;
  onChange: () => void;
  onDelete: () => void;
}

const CheckboxItem = ({ item, index, onChange, onDelete }: CheckboxItemProps) => {
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.05
      }
    }
  };

  const checkboxVariants: Variants = {
    checked: {
      backgroundColor: "#3B82F6",
      borderColor: "#3B82F6",
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    unchecked: {
      backgroundColor: "transparent",
      borderColor: "#6B7280",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  const textVariants: Variants = {
    checked: {
      color: "#9CA3AF",
      textDecoration: "line-through",
      transition: { duration: 0.2 }
    },
    unchecked: {
      color: "#E5E7EB",
      textDecoration: "none",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center space-x-3 group"
      whileHover={{ 
        x: 5,
        transition: { type: "spring", stiffness: 400, damping: 30 }
      }}
    >
      {/* Checkbox */}
      <motion.div
        onClick={onChange}
        className="relative w-5 h-5 border-2 rounded flex items-center justify-center"
        variants={checkboxVariants}
        animate={item.checked ? "checked" : "unchecked"}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: item.checked ? 1 : 0, 
            scale: item.checked ? 1 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      </motion.div>
      
      {/* Text */}
      <motion.span
        onClick={onChange}
        variants={textVariants}
        animate={item.checked ? "checked" : "unchecked"}
        className="flex-1 text-base sm:text-lg select-none group-hover:text-white transition-colors cursor-pointer"
      >
        {item.text}
      </motion.span>
      
      {/* Delete Button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-200 p-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default CheckboxItem;
