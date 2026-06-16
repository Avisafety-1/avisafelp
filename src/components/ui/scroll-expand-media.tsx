import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  webmSrc?: string;
  posterSrc?: string;
  bgImageSrc: string;
  titleTop: string;
  titleBottom: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaSrc,
  webmSrc,
  posterSrc,
  bgImageSrc,
  titleTop,
  titleBottom,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const touchStartYRef = useRef(0);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);
  useEffect(() => {
    expandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const updateProgress = (delta: number) => {
      const next = Math.min(Math.max(progressRef.current + delta, 0), 1);
      setScrollProgress(next);
      if (next >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (next < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        updateProgress(e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        updateProgress(deltaY * factor);
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
    };

    const handleScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay may be blocked until user interaction; attributes handle most cases.
    });
  }, [mediaSrc, webmSrc]);

  // Start as a thin horizontal line right under the header, then grow downward as user scrolls.
  const HEADER_OFFSET = 80; // approx header height in px
  const minHeightPx = 4;
  const maxHeightVh = isMobileState ? 70 : 85;
  const textTranslateX = scrollProgress * (isMobileState ? 30 : 40);

  return (
    <div className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt=""
              className="w-screen h-screen object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="fixed left-0 right-0 z-0 overflow-hidden rounded-b-2xl"
                style={{
                  top: `${HEADER_OFFSET}px`,
                  height: `calc(${minHeightPx}px + ${scrollProgress} * (${maxHeightVh}vh - ${minHeightPx}px))`,
                  boxShadow: "0px 10px 40px rgba(0,0,0,0.25)",
                }}
              >
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    ref={videoRef}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    {webmSrc && <source src={webmSrc} type="video/webm" />}
                    <source src={mediaSrc} type="video/mp4" />
                  </video>
                  <motion.div
                    className="absolute inset-0 bg-black/30"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {scrollToExpand && !mediaFullyExpanded && scrollProgress > 0.05 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
                    <p className="text-white/90 font-medium text-sm">
                      {scrollToExpand}
                    </p>
                  </div>
                )}
              </div>

              <div
                className="flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col mix-blend-difference"
                style={{ pointerEvents: "none" }}
              >
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-4"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {titleTop}
                </motion.h2>
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl px-4"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {titleBottom}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
