import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, MapPin } from 'lucide-react';

function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3 sm:gap-6 justify-center text-center mt-6 mb-2" dir="ltr">
      <TimeUnit value={timeLeft.days} label="يوم" />
      <span className="text-2xl sm:text-3xl text-[#d4af37] mt-0.5 sm:mt-1">:</span>
      <TimeUnit value={timeLeft.hours} label="ساعة" />
      <span className="text-2xl sm:text-3xl text-[#d4af37] mt-0.5 sm:mt-1">:</span>
      <TimeUnit value={timeLeft.minutes} label="دقيقة" />
      <span className="text-2xl sm:text-3xl text-[#d4af37] mt-0.5 sm:mt-1">:</span>
      <TimeUnit value={timeLeft.seconds} label="ثانية" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center w-12 sm:w-16">
      <div className="text-2xl sm:text-3xl font-serif text-[#1a1a1a] mb-2">{value.toString().padStart(2, '0')}</div>
      <div className="text-[10px] sm:text-xs text-[#8a702d] tracking-[1px] sm:tracking-[2px] uppercase">{label}</div>
    </div>
  );
}

const CornerOrnament = ({ className }: { className: string }) => (
  <svg className={`absolute w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] fill-[#d4af37] ${className}`} viewBox="0 0 100 100">
    <path d="M0 0 L100 0 L100 2 L2 2 L2 100 L0 100 Z" />
    <circle cx="15" cy="15" r="3" />
  </svg>
);

const Divider = () => (
  <svg className="w-[150px] h-[20px] mx-auto my-[20px]" viewBox="0 0 100 10">
    <path d="M0 5 Q25 0 50 5 T100 5" fill="none" stroke="#d4af37" strokeWidth="1" />
  </svg>
);

const BotanicalBranch = ({ className }: { className?: string }) => (
  <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 450 Q 250 400 450 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    {/* Upper leaves */}
    <path d="M 120 375 Q 80 300 150 250 Q 180 320 120 375 Z" fill="currentColor" />
    <path d="M 220 285 Q 180 210 250 160 Q 280 230 220 285 Z" fill="currentColor" />
    <path d="M 320 195 Q 280 120 350 70 Q 380 140 320 195 Z" fill="currentColor" />
    {/* Lower leaves */}
    <path d="M 150 395 Q 250 430 300 360 Q 220 330 150 395 Z" fill="currentColor" />
    <path d="M 250 305 Q 350 340 400 270 Q 320 240 250 305 Z" fill="currentColor" />
    <path d="M 350 215 Q 450 250 500 180 Q 420 150 350 215 Z" fill="currentColor" />
  </svg>
);

export default function App() {
  const weddingDate = new Date('2026-05-08T17:00:00');
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Playback prevented:", err);
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((err) => {
          console.error("Playback error:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      {/* Audio Element: Using Dropbox direct link for custom wedding track */}
      <audio 
        ref={audioRef} 
        src="https://www.dropbox.com/scl/fi/4wobwa9mny91w5r5m047b/alimanar.mp3?rlkey=4pcvskzfwcrglu1veeompdhcd&st=ppm1f2cp&raw=1" 
        loop 
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio Control (only visible after opening) */}
      <motion.button
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: isOpened ? 1 : 0, scale: isOpened ? 1 : 0 }}
         onClick={togglePlay}
         aria-label="Toggle music"
         className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[100] p-3 sm:p-4 bg-[#fffefc] border border-[#d4af37] rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.2)] text-[#d4af37] flex items-center justify-center hover:bg-[#fdfcf8] transition-all duration-300 outline-none ${!isOpened ? 'pointer-events-none' : ''}`}
      >
         {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>

      <div className="min-h-screen bg-[#fdfcf8] flex items-center justify-center font-serif text-[#2c2c2c] p-4 sm:p-8 relative overflow-hidden selection:bg-[#d4af37]/20">
        
        {/* Background Texture & Botanical Leaves */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/floral-motif.png")', backgroundRepeat: 'repeat' }}></div>
        <BotanicalBranch className="w-80 h-80 sm:w-[500px] sm:h-[500px] text-[#d4af37] opacity-20 top-[-50px] left-[-50px] sm:top-[-100px] sm:left-[-100px] rotate-[-20deg]" />
        <BotanicalBranch className="w-80 h-80 sm:w-[500px] sm:h-[500px] text-[#d4af37] opacity-20 bottom-[-50px] right-[-50px] sm:bottom-[-100px] sm:right-[-100px] rotate-[160deg]" />
        <BotanicalBranch className="w-72 h-72 sm:w-[400px] sm:h-[400px] text-[#d4af37] opacity-15 -bottom-10 -left-10 sm:-bottom-20 sm:-left-20 -scale-x-100 rotate-[30deg]" />
        <BotanicalBranch className="w-72 h-72 sm:w-[400px] sm:h-[400px] text-[#d4af37] opacity-15 -top-10 -right-10 sm:-top-20 sm:-right-20 -scale-x-100 rotate-[210deg]" />

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 text-center flex flex-col items-center bg-[#fffefc]/90 backdrop-blur-md p-10 sm:p-16 rounded-2xl border border-[#d4af37]/40 shadow-2xl relative"
            >
              <div className="flex flex-col items-center gap-2 mb-6 sm:mb-8">
                <h1 className="text-[3rem] sm:text-[4rem] text-[#1a1a1a] leading-none font-normal -tracking-[1px] m-0">الدكتور علي</h1>
                <span className="text-[2rem] sm:text-[2.5rem] text-[#d4af37] font-serif leading-none opacity-90 my-1">♥</span>
                <h1 className="text-[3rem] sm:text-[4rem] text-[#1a1a1a] leading-none font-normal -tracking-[1px] m-0">المهندسة منار</h1>
              </div>
              <p className="text-[1.1rem] sm:text-[1.3rem] text-[#8a702d] tracking-[3px] uppercase mb-10">دعوة حفل زفاف</p>
              <button
                onClick={handleOpen}
                className="group relative px-10 py-3 sm:py-4 bg-[#fdfcf8] border border-[#d4af37] text-[#d4af37] rounded-full text-[1.2rem] sm:text-[1.3rem] tracking-[1px] hover:bg-[#d4af37] hover:text-[#fffefc] transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl outline-none"
              >
                <span className="relative z-10 flex items-center gap-3 font-serif">
                  افتح الدعوة
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="z-10 w-full max-w-[900px] bg-[#fffefc] border border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.1)] p-8 sm:p-[60px] text-center relative flex flex-col items-center justify-center min-h-[640px]"
            >
        {/* Inner Border & Ornaments */}
        <div className="absolute inset-[10px] sm:inset-[15px] border-2 border-[#d4af37] pointer-events-none"></div>
        <CornerOrnament className="top-0 left-0" />
        <CornerOrnament className="top-0 right-0 rotate-90" />
        <CornerOrnament className="bottom-0 left-0 -rotate-90" />
        <CornerOrnament className="bottom-0 right-0 rotate-180" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 w-full flex flex-col items-center"
        >
          <div className="text-[1.2rem] sm:text-[1.4rem] text-[#8a702d] mb-6 italic tracking-[1px]">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <p className="text-[1.1rem] sm:text-[1.3rem] leading-[1.8] text-[#555] mb-[20px] max-w-lg mx-auto">
            ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
          </p>

          <div className="text-[1.1rem] sm:text-[1.3rem] leading-[2] tracking-[1px] text-[#8a702d] mb-[15px] text-center">
            بكل حب ومودة يتشرف بدعوتكم<br />
            <span className="font-bold text-[#1a1a1a] text-[1.3rem] sm:text-[1.5rem] my-1 block">الأستاذ ايوب خليل الجاف</span>
            <span className="font-bold text-[#1a1a1a] text-[1.3rem] sm:text-[1.5rem] my-1 block">والأستاذ بادي عباس الحياني</span>
            لحضور حفل زفاف ابنائهم
          </div>

          {/* Names */}
          <div className="flex items-center justify-center gap-[20px] sm:gap-[30px] mb-[20px] mt-[10px]">
            <motion.h1 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.8, duration: 0.8 }}
               className="text-[4rem] sm:text-[5.5rem] font-normal text-[#1a1a1a] -tracking-[2px] m-0 leading-none"
            >
              علي
            </motion.h1>

            <motion.span 
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.2, duration: 0.5 }}
               className="text-[2.5rem] sm:text-[3rem] text-[#d4af37] font-serif leading-none mt-2"
            >
              ♥
            </motion.span>

            <motion.h1 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1.0, duration: 0.8 }}
               className="text-[4rem] sm:text-[5.5rem] font-normal text-[#1a1a1a] -tracking-[2px] m-0 leading-none"
            >
              منار
            </motion.h1>
          </div>

          <Divider />

          {/* Details Grid (Preserving the content but changing the style & layout) */}
          <div className="w-full text-center border-y border-[#e0e0e0] py-[20px] sm:py-[30px] px-4 sm:px-[60px] my-[20px]">
            <div className="text-[1.8rem] sm:text-[2.2rem] font-semibold mb-[15px] text-[#1a1a1a]" dir="ltr">
              الجمعة 8-5-2026
            </div>
            <div className="text-[1.1rem] sm:text-[1.3rem] leading-[1.8] text-[#555]">
              من الساعة الخامسة إلى التاسعة مساءً
              <br />
              <span className="font-bold text-[#1a1a1a] text-[1.3rem] sm:text-[1.5rem] mt-2 block">
                بغداد - قرب نفق الشرطة - قاعة الأميرات
              </span>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=33°18'22.6%22N+44°19'34.5%22E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-8 py-2.5 bg-[#fdfcf8] border border-[#d4af37] text-[#8a702d] hover:bg-[#d4af37] hover:text-[#fffefc] transition-all duration-300 rounded-full text-sm sm:text-base tracking-[1px]"
              >
                <MapPin size={18} />
                الذهاب للموقع
              </a>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="mt-4">
            <div className="text-[#8a702d] mb-[15px] text-[1rem] sm:text-[1.1rem] tracking-[2px] uppercase">
              متبقي على موعد الحفل
            </div>
            <Countdown targetDate={weddingDate} />
          </div>

          <div className="text-[1rem] sm:text-[1.1rem] mt-[30px] text-[#8a702d] tracking-[2px] uppercase">
            دامت دياركم بالأفراح عامرة
          </div>

        </motion.div>
      </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
