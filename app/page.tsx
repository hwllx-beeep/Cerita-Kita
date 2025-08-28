"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import NotesContent from "@/components/NotesContent";
import AddSectionDialog from "@/components/AddSectionDialog";
import { Plus } from "lucide-react";

interface Item {
  id: string;
  text: string;
  checked: boolean;
}

interface Section {
  title: string;
  items: Item[];
}

interface AppData {
  [key: string]: Section;
}

const initialData: AppData = {
  "museum-date": {
    title: "Museum Date",
    items: [
      { id: "geologi", text: "Geologi Bandung", checked: false },
      { id: "asia-afrika", text: "Asia Afrika (Gedung Merdeka)", checked: false },
      { id: "sri-baduga", text: "Sri Baduga", checked: false },
      { id: "gedung-sate", text: "Gedung Sate", checked: false },
      { id: "art-gallery", text: "Art Gallery", checked: false },
      { id: "museum-3d", text: "Museum 3D", checked: false },
      { id: "wot-batu", text: "Wot Batu", checked: false },
    ],
  },
  "art-space": {
    title: "Art Space",
    items: [
      { id: "selasar", text: "Selasar Sunaryo Art Space", checked: false },
      { id: "lawangwangi", text: "Lawangwangi Creative Space", checked: false },
      { id: "nuart", text: "NuArt Sculpture Park", checked: false },
    ],
  },
  "beach-date": {
    title: "Beach Date",
    items: [
      { id: "pangandaran", text: "Pantai Pangandaran", checked: false },
      { id: "batu-karas", text: "Pantai Batu Karas", checked: false },
      { id: "santolo", text: "Santolo", checked: false },
      { id: "rancabuaya", text: "Rancabuaya", checked: false },
      { id: "sayang-heulang", text: "Sayang Heulang", checked: false },
    ],
  },
  "fun-date": {
    title: "Fun Date",
    items: [
      { id: "pasar-malem", text: "Pasar malem", checked: false },
      { id: "karaoke", text: "karaoke", checked: false },
      { id: "mall", text: "Mall", checked: false },
      { id: "aquarium", text: "Aquarium Date", checked: false },
      { id: "dufan", text: "Dufan Date", checked: false },
      { id: "dago-dreampark", text: "Dago Dreampark", checked: false },
      { id: "sukawana", text: "Perkebunan Teh Sukawana", checked: false },
      { id: "sudut-pandang", text: "Sudut Pandang", checked: false },
      { id: "trans-studio", text: "Trans Studio Bandung", checked: false },
      { id: "braga", text: "Braga Street", checked: false },
      { id: "kawah-rengganis", text: "Kawah Rengganis Ciwidey", checked: false },
      { id: "situ-patenggang", text: "Situ Patenggang", checked: false },
      { id: "kebun-teh", text: "Kebun Teh Rancabali", checked: false },
      { id: "kawah-putih", text: "Kawah Putih Ciwidey", checked: false },
      { id: "petik-stroberi", text: "Petik Stroberi Ciwidey", checked: false },
      { id: "offroad", text: "Offroad/Rafting", checked: false },
    ],
  },
};

export default function Home() {
  const [data, setData] = useState<AppData>(initialData);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);

  const handleCheckboxChange = (sectionKey: string, itemId: string) => {
    setData(prevData => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        items: prevData[sectionKey].items.map(item =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      }
    }));
  };

  const handleAddSection = (title: string) => {
    const key = title.toLowerCase().replace(/\s+/g, '-');
    setData(prevData => ({
      ...prevData,
      [key]: {
        title,
        items: []
      }
    }));
  };

  const handleDeleteSection = (sectionKey: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      delete newData[sectionKey];
      return newData;
    });
  };

  const handleAddItem = (sectionKey: string, text: string) => {
    const itemId = text.toLowerCase().replace(/\s+/g, '-');
    setData(prevData => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        items: [
          ...prevData[sectionKey].items,
          { id: itemId, text, checked: false }
        ]
      }
    }));
  };

  const handleDeleteItem = (sectionKey: string, itemId: string) => {
    setData(prevData => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        items: prevData[sectionKey].items.filter(item => item.id !== itemId)
      }
    }));
  };

  return (
    <>
      <motion.div 
        className="min-h-screen bg-[#2a2a2a] text-gray-200 flex flex-col lg:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Sidebar 
          sections={Object.keys(data).map(key => ({
            key,
            title: data[key].title
          }))} 
          onDeleteSection={handleDeleteSection}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold text-white"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Tambahkan Ide Date 
              </motion.h1>
              <motion.button
                onClick={() => setIsAddSectionOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Section</span>
              </motion.button>
            </div>
            
            <NotesContent 
              data={data} 
              onCheckboxChange={handleCheckboxChange}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
              onDeleteSection={handleDeleteSection}
            />
          </div>
        </main>
      </motion.div>

      <AddSectionDialog
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        onAdd={handleAddSection}
      />
    </>
  );
}