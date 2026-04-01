import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DishSelection from './components/DishSelection';

const MOODS = [
  // STRESLİ -> Senin gönderdiğin görseldeki Bold (Kalın) Fırtına Bulutu
  {
    id: 'stresli',
    label: 'Stresli',
    color: '#780c0c',
    icon: (props) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Ana Bulut Gövdesi */}
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        {/* Görseldeki üstteki küçük bulut/katman çizgisi */}
        <path d="M13.5 6c-1.5-1.5-3.5-1.5-5 0" className="opacity-70" />
        {/* Bulutun içindeki kalın şimşek simgesi */}
        <path d="M11 13l-1.5 3h3.5l-1.5 3.5" />
      </svg>
    )
  },

  // YORGUN -> Sönen Mum
  { id: 'yorgun', label: 'Yorgun', color: '#7bc4f4', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6" /><path d="M10 21V10a2 2 0 0 1 2-2 2 2 0 0 1 2 2v11" /><path d="M12 8V6" /><path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Z" className="opacity-40" /></svg> },

  // MUTLU -> Güneş
  { id: 'mutlu', label: 'Mutlu', color: '#FFD930', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg> },

  // KEYİFLİ -> Origami Kağıt Uçak
  { id: 'keyifli', label: 'Keyifli', color: '#4E944F', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg> },

  // YALNIZ -> Deniz Feneri
  { id: 'yalniz', label: 'Yalnız', color: '#4F4A45', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 4h-4l2-4z" /><path d="M11 6h2l2 16H9L11 6z" /><circle cx="12" cy="10" r="1" className="opacity-20" /></svg> },

  // ROMANTİK -> Kalp
  { id: 'romantik', label: 'Romantik', color: '#F47C7C', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.04 3 5.5L12 21l7-7z" /></svg> },

  // ENERJİK -> Şimşek
  { id: 'enerjik', label: 'Enerjik', color: '#FF8400', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },

  // GECE KUŞU -> Ay
  { id: 'gece', label: 'Gece Kuşu', color: '#1A237E', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg> },

  // HÜZÜNLÜ -> Origami Kağıt Gemi
  { id: 'huzunlu', label: 'Hüzünlü', color: '#607EAA', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16l3-11 7 8 7-8 3 11-10 4-10-4z" /><path d="M12 13v8" /></svg> },
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#F0F0EC] font-sans px-4">

      {/* --- 1. PANTONE ARKA PLAN DEGRADE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-15%] w-[80%] h-[60%] rounded-full bg-[#FDE992] opacity-40 blur-[100px]"></div>
        <div className="absolute top-[-15%] right-[-10%] w-[70%] h-[50%] rounded-full bg-[#C9E9E9] opacity-50 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] rounded-full bg-[#B9D9EB] opacity-40 blur-[90px]"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[80%] h-[60%] rounded-full bg-[#F2D0B1] opacity-55 blur-[110px]"></div>
        <div className="absolute inset-0 backdrop-blur-[25px] opacity-30"></div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedMood ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full flex flex-col items-center max-w-sm md:max-w-none py-10">

            {/* --- 2. LOGO --- */}
            <div className="mb-4">
              <motion.img
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 0.85, y: 0 }}
                src="/duygu-image/logo.png"
                alt="Logo"
                className="w-40 md:w-56 h-auto object-contain select-none"
              />
            </div>

            {/* --- 3. EL YAZISI SLOGAN --- */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="my-6 md:my-8 flex flex-col items-center select-none pointer-events-none px-6 text-center"
            >
              <span
                style={{ fontFamily: "'Dancing Script', cursive" }}
                className="text-[18px] md:text-[24px] text-[#3D3028] italic"
              >
                "Every emotion has an aroma, every moment has a flavor"
              </span>
            </motion.div>

            {/* --- 4. DUYGU IZGARASI --- */}
            <div className="grid grid-cols-3 gap-y-12 gap-x-6 md:gap-y-16 md:gap-x-14 relative mt-4">
              {MOODS.map((m, index) => (
                <div key={m.id} className="relative flex flex-col items-center justify-center">
                  <motion.button
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedMood(m)}
                    animate={{ y: [0, -6, 0], scale: hoveredId === m.id ? 1.2 : 1 }}
                    transition={{ y: { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" } }}
                    className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center active:scale-95"
                  >
                    {/* Glow Parlama */}
                    <AnimatePresence>
                      {hoveredId === m.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 0.4, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          style={{ backgroundColor: m.color }}
                          className="absolute inset-0 rounded-full blur-[30px] pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* İkon */}
                    <motion.div
                      className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center relative z-10"
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
                    className="mt-3 text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium select-none text-center"
                  >
                    {m.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <DishSelection mood={selectedMood} onBack={() => setSelectedMood(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}