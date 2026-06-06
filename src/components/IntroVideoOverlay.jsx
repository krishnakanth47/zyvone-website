import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import mobileVideo from "../assets/intro/mobile.mp4";
import desktopVideo from "../assets/intro/desktop.mp4";

export default function IntroVideoOverlay({ onComplete }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState("loading"); // "loading" | "positioning" | "expanding" | "playing" | "fading" | "done"
  
  // Rect state to track dimensions during transition
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 120,
    height: 55,
    borderRadius: "12px",
    opacity: 1
  });

  const [shrinkCoords, setShrinkCoords] = useState(null);

  const videoRefDesktop = useRef(null);
  const videoRefMobile = useRef(null);

  // Replay event handler integration
  useEffect(() => {
    const handleReplay = () => {
      setPhase("loading");
      setIsVisible(true);
    };
    window.addEventListener("play-intro-video", handleReplay);
    return () => {
      window.removeEventListener("play-intro-video", handleReplay);
    };
  }, []);

  // Main state machine orchestration
  useEffect(() => {
    if (!isVisible) return;

    if (phase === "loading") {
      // Step 1: Wait a short frame to ensure Footer is fully rendered in the DOM
      const timer = setTimeout(() => {
        setPhase("positioning");
      }, 100);
      return () => clearTimeout(timer);
    }

    if (phase === "positioning") {
      // Step 2: Align with the brand logo in the header (no scroll on entrance)
      const logoEl = document.getElementById("brand-logo");
      if (logoEl) {
        const rect = logoEl.getBoundingClientRect();
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;

        // Save starting coords matched perfectly to brand logo's exact position
        setCoords({
          top: rect.top + currentScrollY,
          left: rect.left + currentScrollX,
          width: rect.width || 120,
          height: rect.height || 50,
          borderRadius: "8px",
          opacity: 1
        });

        // Trigger expand transition
        setPhase("expanding");
      } else {
        // Fallback directly to playing if the logo isn't rendered
        setPhase("playing");
      }
    }

    if (phase === "expanding") {
      // Step 3: Animate the overlay up to fill the whole screen
      const timer = setTimeout(() => {
        setPhase("playing");
        // Start playing the videos once expansion is finished
        if (videoRefDesktop.current) {
          videoRefDesktop.current.play().catch(() => {});
        }
        if (videoRefMobile.current) {
          videoRefMobile.current.play().catch(() => {});
        }
      }, 1500); // match ease-out transition time
      return () => clearTimeout(timer);
    }
  }, [phase, isVisible]);

  const handleFinish = () => {
    if (phase === "fading" || phase === "done") return;

    // Scroll nicely to the top of the page so they see the top of the homepage
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Capture the exact absolute position of the header brand logo as the destination
    const logoEl = document.getElementById("brand-logo");
    let targetCoords = null;
    if (logoEl) {
      const rect = logoEl.getBoundingClientRect();
      targetCoords = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width || 120,
        height: rect.height || 50,
      };
    } else {
      // Direct viewport mockup coords near the top of the page
      targetCoords = {
        top: 16,
        left: window.innerWidth / 2 - 60,
        width: 120,
        height: 50,
      };
    }

    setShrinkCoords(targetCoords);
    setPhase("fading");

    // Provide 1.8 seconds for a magnificent, slow movement transition
    setTimeout(() => {
      setPhase("done");
      setIsVisible(false);
      navigate("/");
      if (onComplete) {
        onComplete();
      }
    }, 1800);
  };

  if (!isVisible) return null;

  // Compute CSS styles and motion values based on the current state machine phase
  const isFullscreen = phase === "playing";
  
  // Determine inline styles for raw position coordinates during the expansion mode
  const getContainerStyle = () => {
    if (phase === "loading" || phase === "positioning") {
      return {
        position: "absolute",
        visibility: "hidden"
      };
    }
    if (isFullscreen) {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh"
      };
    }
    if (phase === "fading") {
      return {
        position: "absolute",
        zIndex: 9999,
        top: window.scrollY,
        left: window.scrollX,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    // "expanding" state
    return {
      position: "absolute",
      top: coords.top,
      left: coords.left,
      width: coords.width,
      height: coords.height
    };
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          id="intro-video-overlay"
          initial={false}
          animate={
            phase === "expanding"
              ? {
                  top: window.scrollY,
                  left: window.scrollX,
                  width: window.innerWidth,
                  height: window.innerHeight,
                  borderRadius: "0px",
                }
              : phase === "fading"
              ? {
                  top: shrinkCoords ? shrinkCoords.top : 16,
                  left: shrinkCoords ? shrinkCoords.left : window.innerWidth / 2 - 60,
                  width: shrinkCoords ? shrinkCoords.width : 120,
                  height: shrinkCoords ? shrinkCoords.height : 50,
                  borderRadius: "28px",
                  opacity: 0,
                  scale: 0.15,
                  pointerEvents: "none"
                }
              : {
                  opacity: 1,
                  top: 0,
                  left: 0,
                  width: window.innerWidth,
                  height: window.innerHeight,
                  borderRadius: "0px",
                  scale: 1,
                }
          }
          transition={{
            duration: phase === "fading" ? 1.8 : (phase === "expanding" ? 1.5 : 0.8),
            ease: [0.16, 1, 0.3, 1] // high-quality exponential feel
          }}
          className="z-[9999] flex items-center justify-center bg-[#030303] overflow-hidden select-none cursor-pointer"
          style={{
            ...getContainerStyle(),
            borderRadius: phase === "expanding" ? coords.borderRadius : "0px"
          }}
          onClick={handleFinish}
        >
          {/* Subtle high tech scanning lines overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(3,3,3,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(3,3,3,0.15)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

          {/* Desktop Intro Video */}
          <video
            ref={videoRefDesktop}
            src={desktopVideo}
            playsInline
            muted
            onEnded={handleFinish}
            className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
            referrerPolicy="no-referrer"
          />

          {/* Mobile Intro Video */}
          <video
            ref={videoRefMobile}
            src={mobileVideo}
            playsInline
            muted
            onEnded={handleFinish}
            className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
