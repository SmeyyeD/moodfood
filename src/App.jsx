import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DishSelection from './components/DishSelection';

const MOODS = [
  // ... (Önceki MOODS dizisi aynı kalıyor)
  {
    id: 'stresli',
    label: 'Stresli',
    color: '#780c0c',
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="M13.5 6c-1.5-1.5-3.5-1.5-5 0" className="opacity-70" />
        <path d="M11 13l-1.5 3h3.5l-1.5 3.5" />
      </svg>
    )
  },
  { id: 'yorgun', label: 'Yorgun', color: '#7bc4f4', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6" /><path d="M10 21V10a2 2 0 0 1 2-2 2 2 0 0 1 2 2v11" /><path d="M12 8V6" /><path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Z" className="opacity-40" /></svg> },
  { id: 'mutlu', label: 'Mutlu', color: '#FFD930', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg> },
  { id: 'keyifli', label: 'Keyifli', color: '#4E944F', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg> },
  { id: 'yalniz', label: 'Yalnız', color: '#4F4A45', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 4h-4l2-4z" /><path d="M11 6h2l2 16H9L11 6z" /><circle cx="12" cy="10" r="1" className="opacity-20" /></svg> },
  { id: 'romantik', label: 'Romantik', color: '#F47C7C', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5L12 21l7-7z" /></svg> },
  { id: 'enerjik', label: 'Enerjik', color: '#FF8400', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
  { id: 'gece', label: 'Gece Kuşu', color: '#1A237E', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg> },
  { id: 'huzunlu', label: 'Hüzünlü', color: '#607EAA', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16l3-11 7 8 7-8 3 11-10 4-10-4z" /><path d="M12 13v8" /></svg> },
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Alt Navigasyon için Duygu İkonlarına Benzer Stilize İkonlar
  const navigationIcons = [
    { name: 'Ana Ekran', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" /></svg> },
    { name: 'Keşfet', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8a3 3 0 0 1 3 3" className="opacity-50" /></svg> },
    { name: 'Favoriler', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5L12 21l7-7z" /></svg> },
    { name: 'Profil', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" /><path d="M20.31 3c1.61.16 3.09.95 4.16 2.22a4 4 0 0 1 0 5.56C23.4 12.05 21.92 12.84 20.31 13" className="opacity-50" /><circle cx="9" cy="7" r="4" /><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /></svg> },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col bg-[#F0F0EC] font-sans">

      {/* --- 1. ARKA PLAN --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/p/background.table.jpeg" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#F0F0EC] opacity-80 backdrop-blur-[25px]"></div>
      </div>

      {/* --- ANA İÇERİK ALANI --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-between py-8">
        
        <AnimatePresence mode="wait">
          {!selectedMood ? (
            <motion.div 
              key="home" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="w-full flex flex-col items-center h-full"
            >
              {/* Logo Bölümü */}
              <div className="flex-none mb-2">
                <motion.img
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  src="/duygu-image/logo.png"
                  alt="Logo"
                  className="w-40 md:w-52 h-auto object-contain select-none"
                />
              </div>

              {/* Slogan Bölümü */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="flex-none mb-6 px-6 text-center"
              >
                <span
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                  className="text-[18px] md:text-[22px] text-[#3D3028] italic"
                >
                  "Every emotion has an aroma, every moment has a flavor"
                </span>
              </motion.div>

              {/* Duygu Izgarası */}
              <div className="flex-1 flex items-center justify-center w-full px-4">
                <div className="grid grid-cols-3 gap-y-10 gap-x-8 md:gap-x-12 max-w-sm">
                  {MOODS.map((m, index) => (
                    <div key={m.id} className="relative flex flex-col items-center">
                      <motion.button
                        onMouseEnter={() => setHoveredId(m.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedMood(m)}
                        animate={{ y: [0, -4, 0], scale: hoveredId === m.id ? 1.15 : 1 }}
                        transition={{ y: { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" } }}
                        className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center active:scale-95"
                      >
                        <AnimatePresence>
                          {hoveredId === m.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 0.4, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              style={{ backgroundColor: m.color }}
                              className="absolute w-[180%] h-[180%] -inset-[40%] rounded-full blur-[35px] pointer-events-none"
                            />
                          )}
                        </AnimatePresence>

                        <motion.div
                          className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center relative z-10"
                          animate={{
                            stroke: hoveredId === m.id ? m.color : "#3D3028",
                            opacity: hoveredId === m.id ? 1 : 0.4
                          }}
                        >
                          {m.icon({
                            className: "w-full h-full transition-all duration-300",
                            style: { stroke: hoveredId === m.id ? m.color : "#3D3028" }
                          })}
                        </motion.div>
                      </motion.button>

                      <motion.span
                        animate={{
                          opacity: hoveredId === m.id ? 0.8 : 0.35,
                          color: hoveredId === m.id ? m.color : "#3D3028"
                        }}
                        className="mt-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-medium select-none text-center"
                      >
                        {m.label}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <DishSelection mood={selectedMood} onBack={() => setSelectedMood(null)} />
          )}
        </AnimatePresence>
      </main>

      {/* --- ALT NAVİGASYON --- */}
      <nav className="relative z-50 bg-[#F0F0EC]/95 backdrop-blur-md border-t border-[#3D3028]/5 px-6 pt-3 pb-6 flex items-center justify-around">
        {navigationIcons.map((nav, index) => (
          <button key={nav.name} className="flex flex-col items-center gap-1 group">
            {/* İkonlar artık fill değil, stroke bazlı ve duygu ikonlarına benziyor */}
            <nav.icon className={`w-6 h-6 stroke-current ${index === 0 ? 'text-[#3D3028]' : 'text-[#3D3028]/40'} group-hover:text-[#3D3028] transition-colors duration-200`} />
            <span className={`text-[9px] uppercase tracking-widest font-bold ${index === 0 ? 'text-[#3D3028]' : 'text-[#3D3028]/40'} group-hover:text-[#3D3028]`}>
              {nav.name}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}