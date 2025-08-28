"use client";

import { motion } from "framer-motion";
import CheckboxItem from "./CheckboxItem";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface NotesContentProps {
  data: Record<string, {
    title: string;
    items: Array<{
      id: string;
      text: string;
      checked: boolean;
    }>;
  }>;
  onCheckboxChange: (sectionKey: string, itemId: string) => void;
  onAddItem: (sectionKey: string, text: string) => void;
  onDeleteItem: (sectionKey: string, itemId: string) => void;
  onDeleteSection: (sectionKey: string) => void;
}

const NotesContent = ({ data, onCheckboxChange, onAddItem, onDeleteItem, onDeleteSection }: NotesContentProps) => {
  const [newItemTexts, setNewItemTexts] = useState<Record<string, string>>({});
  const [showAddItem, setShowAddItem] = useState<Record<string, boolean>>({});

  const handleAddItem = (sectionKey: string) => {
    const text = newItemTexts[sectionKey]?.trim();
    if (text) {
      onAddItem(sectionKey, text);
      setNewItemTexts(prev => ({ ...prev, [sectionKey]: '' }));
      setShowAddItem(prev => ({ ...prev, [sectionKey]: false }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {Object.entries(data).map(([sectionKey, section]) => (
        <motion.section
          key={sectionKey}
          id={sectionKey}
          variants={sectionVariants}
          className="scroll-mt-8 lg:scroll-mt-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {section.title}
            </motion.h1>
            
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowAddItem(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }))}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Item</span>
              </motion.button>
              
              <motion.button
                onClick={() => onDeleteSection(sectionKey)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete Section</span>
              </motion.button>
            </div>
          </div>

          <div className="border-b border-gray-600 mb-6"></div>
          
          {showAddItem[sectionKey] && (
            <motion.div
              className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newItemTexts[sectionKey] || ''}
                  onChange={(e) => setNewItemTexts(prev => ({ ...prev, [sectionKey]: e.target.value }))}
                  placeholder="Enter new item..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem(sectionKey)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddItem(sectionKey)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddItem(prev => ({ ...prev, [sectionKey]: false }))}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="space-y-3 sm:space-y-4">
            {section.items.map((item, index) => (
              <CheckboxItem
                key={item.id}
                item={item}
                index={index}
                onChange={() => onCheckboxChange(sectionKey, item.id)}
                onDelete={() => onDeleteItem(sectionKey, item.id)}
              />
            ))}
            
            {section.items.length === 0 && (
              <motion.p
                className="text-gray-500 italic text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No items yet. Click "Add Item" to get started!
              </motion.p>
            )}
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
};

export default NotesContent;