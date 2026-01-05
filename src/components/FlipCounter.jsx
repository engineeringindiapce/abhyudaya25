const FlipCounter = ({ value }) => {
  const paddedValue = String(value).padStart(2, "0");
  const prevValue = usePrevious(paddedValue);

  return (
    <div className="flex gap-1">
      {paddedValue.split("").map((digit, i) => (
        <FlipDigit key={i} current={digit} previous={prevValue ? prevValue[i] : digit} />
      ))}
    </div>
  );
};

// Custom hook to track previous value
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// Single digit flip animation
const FlipDigit = ({ current, previous }) => {
  const isChanging = current !== previous;

  return (
    <div className="relative w-10 sm:w-14 md:w-20 h-16 sm:h-20 md:h-28 overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono"
        initial={false}
        animate={{
          y: isChanging ? [-40, 0] : 0,
          rotateX: isChanging ? [-90, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center top" }}
      >
        {current}
      </motion.div>

      {/* Top half of previous digit (flips up) */}
      {isChanging && (
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 flex items-start justify-center overflow-hidden text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 90 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom" }}
        >
          <span className="mt-1">{previous}</span>
        </motion.div>
      )}

      {/* Bottom half of current digit (flips down) */}
      {isChanging && (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 flex items-end justify-center overflow-hidden text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono"
          initial={{ rotateX: -90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        >
          <span className="mb-1">{current}</span>
        </motion.div>
      )}

      {/* Static current digit (fallback when not changing) */}
      {!isChanging && (
        <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono">
          {current}
        </div>
      )}
    </div>
  );
};