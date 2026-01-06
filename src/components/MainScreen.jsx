import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import coloredImg from "../assets/colored.png";

export default function MainScreen({ onNavigate }) {
  const [reveal, setReveal] = useState(false);
  const [showUi, setShowUi] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -120]);

  useEffect(() => {
    setTimeout(() => setReveal(true), 100);
    setTimeout(() => setShowUi(true), 600);
  }, []);

  useEffect(() => {
    const eventDate = new Date("2026-02-08T23:59:59").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-orange-900 via-amber-900 to-amber-950">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,191,36,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,140,0,0.2),transparent_50%)]" />
      </div>

      {/* Parallax Hero Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coloredImg})`, y }}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: reveal ? 1 : 0, scale: reveal ? 1 : 1.2 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
      </motion.div>

      {/* Header Navigation & Countdown */}
      <AnimatePresence>
        {showUi && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-0 left-0 right-0 z-50 pt-4 pb-6 px-4 sm:px-8 md:px-12"
          >
            <div className="max-w-7xl mx-auto">
              <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8">
                {["HOME", "EVENTS", "THEME", "ABOUT US", "CONTACT"].map((item, i) => (
                  <motion.button
                    key={item}
                    onClick={() => onNavigate(item.toLowerCase().replace(" ", ""))}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider hover:text-amber-300 transition-colors"
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>

              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                {countdownItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + index * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-gradient-to-br from-amber-600/50 to-orange-700/50 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 border border-amber-400/60 shadow-2xl shadow-amber-600/40">
                      <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono tracking-tight">
                        {String(item.value).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-amber-200 text-xs sm:text-sm md:text-base lg:text-lg font-bold mt-2 uppercase tracking-widest">
                      {item.label}
                    </div>
                  </motion.div>
                ))}

                {countdownItems.slice(0, 3).map((_, i) => (
                  <span
                    key={i}
                    className="text-3xl sm:text-5xl md:text-6xl font-black text-amber-400 hidden xs:inline"
                  >
                    :
                  </span>
                ))}
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Title + Sanskrit Tagline */}
      <AnimatePresence>
        {showUi && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5, type: "spring" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none px-6 gap-4 md:gap-8"
          >
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 drop-shadow-3xl tracking-tight text-center leading-none">
              ABHYUDAYA ’25
            </h1>

            {/* Sanskrit Tagline - Responsive & Flexible */}
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-amber-100/90 text-center leading-tight tracking-wide drop-shadow-2xl max-w-5xl px-4">
              परं वैभवं नेतुमेतत् स्वराष्ट्रम्
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REGISTER BUTTONS (mobile-centered + desktop/tablet variant) */}
      <AnimatePresence>
        {showUi && (
          <>
            {/* Mobile: centered friendly button (visible on xs only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6, type: "spring", stiffness: 130 }}
              className="fixed inset-x-0 bottom-8 flex justify-center z-50 px-4 sm:hidden"
            >
              <motion.button
                onClick={() => onNavigate("events")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-xs bg-amber-600/95 hover:bg-amber-500 text-white font-extrabold text-lg py-4 rounded-full shadow-2xl border-2 border-amber-400/60 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                aria-label="Register Now"
              >
                Register Now
              </motion.button>
            </motion.div>

            {/* Desktop/Tablet: original styled button (hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1, type: "spring", stiffness: 150 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:px-6 md:bottom-12 md:left-auto md:right-12 md:translate-x-0 md:w-auto md:px-0 hidden sm:block"
            >
              <motion.button
                onClick={() => onNavigate("events")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full max-w-sm mx-auto px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black uppercase tracking-widest text-white rounded-2xl border-4 border-amber-500 shadow-2xl overflow-hidden group focus:outline-none focus:ring-4 focus:ring-amber-400/70"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 group-hover:from-amber-500 group-hover:via-orange-400 group-hover:to-amber-500 transition-all duration-700" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 drop-shadow-2xl">Register Now</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}