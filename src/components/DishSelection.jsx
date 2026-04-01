import React from 'react';
import { motion } from 'framer-motion';

const DESSERT_DETAILS = {
    romantik: [
        {
            id: 'tiramisu',
            name: 'TİRAMİSU',
            img: 'tiramisu.png',
            desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            id: 'sufle',
            name: 'SUFLE',
            img: 'sufle.png',
            desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
        {
            id: 'waffle',
            name: 'WAFFLE',
            img: 'waffle.png',
            desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
        },
    ],
};

export default function DishSelection({ mood, onBack }) {
    const currentMoodId = DESSERT_DETAILS[mood.id] ? mood.id : 'romantik';
    const desserts = DESSERT_DETAILS[currentMoodId];

    const isYorgun = mood.id === 'yorgun';
    const primaryColor = isYorgun ? '#7bc4f4' : mood.color;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#F0F0EC] overflow-y-auto px-4"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
            {/* --- ARKA PLAN --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-5%] left-[-10%] w-[80%] h-[40%] rounded-full opacity-30 blur-[80px]" style={{ backgroundColor: primaryColor }}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[40%] rounded-full opacity-20 blur-[100px]" style={{ backgroundColor: '#A0C4D9' }}></div>
            </div>

            {/* --- ÜST ANA GERİ DÖN BUTONU --- */}
            <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed top-6 left-6 z-[110] w-10 h-10 flex items-center justify-center bg-white/40 backdrop-blur-md rounded-full shadow-sm border border-white/10"
            >
                <img src="/duygu-image/ok.png" alt="Back" className="w-5 h-5 object-contain opacity-70" />
            </motion.button>

            <div className="relative z-10 flex flex-col items-center pt-4 pb-5 mt-6 md:mt-2">

                {/* --- SLOGAN --- */}
                <header className="mb-4 mt-2">
                    <img src="/duygu-image/slogan.png" alt="Slogan" className="max-w-[220px] md:max-w-[340px] h-auto object-contain" />
                </header>

                {/* --- İKON --- */}
                <div className="mb-2 scale-[1.2]">
                    {mood.icon({ className: "w-14 h-14", style: { stroke: primaryColor, strokeWidth: 1.2 } })}
                </div>

                {/* --- DUYGU BAŞLIĞI --- */}
                <div className="text-center mb-8">
                    <h3 className="text-xl font-light tracking-[0.4em] uppercase mb-2" style={{ color: primaryColor }}>
                        {mood.label}
                    </h3>
                </div>

                {/* --- TATLI KARTLARI --- */}
                <div className="flex flex-col space-y-12 w-full max-w-lg">
                    {desserts.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex items-center justify-between group"
                        >
                            {/* SOL TARAF: Görsel ve Metinler */}
                            <div className="flex items-center space-x-6">
                                {/* Tatlı Görseli */}
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[4px] p-1 shadow-inner bg-white/20 flex-shrink-0" style={{ borderColor: primaryColor + '30' }}>
                                    <img src={`/duygu-image/${item.img}`} alt={item.name} className="w-full h-full object-cover rounded-full" />
                                </div>

                                {/* İsim ve Açıklama */}
                                <div className="text-left">
                                    <h4 className="text-[14px] font-light tracking-[0.3em] uppercase mb-1" style={{ color: primaryColor }}>
                                        {item.name}
                                    </h4>
                                    <p className="text-[10px] font-light text-[#3D3028]/50 italic leading-relaxed max-w-[180px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* SAĞ TARAF: BÜYÜTÜLMÜŞ OK.PNG BUTONU (Yönü Değiştirildi) */}
                            <motion.button
                                whileHover={{ x: 10, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex-shrink-0 ml-4 p-2 cursor-pointer"
                                onClick={() => console.log(`${item.name} seçildi`)}
                            >
                                <img
                                    src="/duygu-image/ok.png"
                                    alt="Select"
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain" // -rotate-180 kaldırıldı, ok artık sağa/ileri bakıyor
                                    style={{
                                        filter: `drop-shadow(0px 0px 8px ${primaryColor}40)`,
                                        opacity: 0.8
                                    }}
                                />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                {/* --- LOGO --- */}
                <div className="mt-8 opacity-60 scale-75">
                    <img src="/duygu-image/logo.png" alt="Logo" className="w-40 h-30 object-contain" />
                </div>
            </div>
        </motion.div>
    );
}