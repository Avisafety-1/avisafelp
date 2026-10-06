import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  webmSrc?: string;
  posterSrc?: string;
  bgImageSrc: string;
  mobileBgImageSrc?: string;
  titleTop: string;
  titleBottom: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaSrc,
  webmSrc,
  posterSrc,
  bgImageSrc,
  mobileBgImageSrc,
  titleTop,
  titleBottom,
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
      touchStartYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      const touchY = e.touches[0]?.clientY ?? 0;
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
      // If something (e.g. header nav click) scrolled the page while the hero
      // hasn't been "expanded" yet, treat it as fully expanded so navigation
      // to other sections isn't snapped back to the top.
      if (!expandedRef.current && window.scrollY > 0) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        setScrollProgress(1);
      }
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

    // Ensure attributes are set on the DOM element (Safari/iOS reliability)
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.controls = false;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x-webkit-airplay", "deny");
    video.setAttribute("autoplay", "");
    video.removeAttribute("controls");

    let userGestureCleanup: (() => void) | null = null;
    let retryTimers: number[] = [];

    const clearRetryTimers = () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      retryTimers = [];
    };

    const attemptPlay = () => {
      // Re-assert muted before each attempt (some browsers reset on src load)
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.controls = false;
      video.removeAttribute("controls");
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          // Apply slow playback only after successful play (some browsers
          // refuse to autoplay when playbackRate != 1 on initial load)
          try {
            video.playbackRate = 0.5;
          } catch {
            /* ignore */
          }
          clearRetryTimers();
          if (userGestureCleanup) userGestureCleanup();
        }).catch(() => {
          // Autoplay blocked — retry on any user interaction
          if (userGestureCleanup) return;
          const retry = () => {
            attemptPlay();
          };
          const events = [
            "pointerdown",
            "touchstart",
            "touchend",
            "mousedown",
            "mousemove",
            "keydown",
            "scroll",
            "wheel",
          ] as const;
          const opts: AddEventListenerOptions = { passive: true };
          events.forEach((ev) =>
            window.addEventListener(ev, retry, opts)
          );
          userGestureCleanup = () => {
            events.forEach((ev) =>
              window.removeEventListener(ev, retry)
            );
            userGestureCleanup = null;
          };
        });
      }
    };

    const onLoadedMetadata = () => attemptPlay();
    const onCanPlay = () => attemptPlay();
    const onLoadedData = () => attemptPlay();
    const onVisibility = () => {
      if (document.visibilityState === "visible" && video.paused) attemptPlay();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);
    document.addEventListener("visibilitychange", onVisibility);

    // Kick off load and an initial attempt
    if (video.readyState >= 1) onLoadedMetadata();
    else video.load();
    attemptPlay();
    retryTimers = [80, 200, 500, 1000, 1800, 3000].map((delay) =>
      window.setTimeout(() => {
        if (video.paused) attemptPlay();
      }, delay)
    );

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      document.removeEventListener("visibilitychange", onVisibility);
      clearRetryTimers();
      if (userGestureCleanup) userGestureCleanup();
    };
  }, [mediaSrc, webmSrc]);

  const headerHeightPx = isMobileState ? 64 : 80;
  const minHeightPx = headerHeightPx;
  const maxHeightVh = isMobileState ? 70 : 85;
  const textTranslateX = scrollProgress * (isMobileState ? 30 : 40);
  const videoHeight = `calc(${minHeightPx}px + ${scrollProgress} * (${maxHeightVh}vh - ${minHeightPx}px))`;

  return (
    <div className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center min-h-[100dvh]">
        {/* Desktop background image — full cover */}
        <motion.div
          className="hidden sm:block absolute inset-0 z-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 - scrollProgress }}
          transition={{ duration: 0.1 }}
        >
          <img
            src={bgImageSrc}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Mobile background image — full width, original size, edge to edge */}
        <motion.div
          className="sm:hidden absolute inset-0 z-0 overflow-hidden bg-[#0d0d0d] flex flex-col"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 - scrollProgress }}
          transition={{ duration: 0.1 }}
        >
          <img
            src={mobileBgImageSrc || bgImageSrc}
            alt=""
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Text lines — centered, moves upward on scroll */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl px-4 mix-blend-difference"
            style={{ marginTop: "50px" }}
            animate={{ y: -scrollProgress * 500 }}
            transition={{ duration: 0.3 }}
          >
            {titleBottom}
          </motion.h2>
        </div>

        {/* Video — starts at header height right under header, grows downward */}
        <div
          className="relative z-10 w-full mt-0 shrink-0"
          style={{ marginTop: `${headerHeightPx}px` }}
        >
          <div
            className="w-full overflow-hidden"
            style={{
              height: videoHeight,
              boxShadow: "0px 10px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate noremoteplayback"
                className="hero-autoplay-video w-full h-full object-cover"
              >
                <source src={mediaSrc} type="video/mp4" />
                {webmSrc && <source src={webmSrc} type="video/webm" />}
              </video>
              <motion.div
                className="absolute inset-0 bg-black/30"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>

        {/* titleTop — placed right under the video */}
        <motion.h2
          className="relative z-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-4 text-center pointer-events-none"
          style={{ marginTop: "30px" }}
          animate={{
            color: scrollProgress > 0.1 ? "hsl(210, 45%, 12%)" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {titleTop}
        </motion.h2>

        {/* Spacer that grows so the section stays at least 100dvh */}
        <div className="flex-1 min-h-0" />

        {/* Children — pushed down naturally by video growth */}
        <motion.section
          className="relative z-30 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.section>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
