import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

const createScaleY = (x1, y1, x2, y2) => {
  const slope = (y2 - y1) / (x2 - x1);
  return (y3) => {
    if (slope === 0) return x1;
    return ((y3 - y1) / slope) + x1;
  };
};

export function ParallaxBackground() {
  const { isDark } = useTheme();
  
  // Create refs for each parallax layer
  const floorRef = useRef(null);
  const layer4Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer1Ref = useRef(null);
  const layer0Ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Current smoothed interpolation values
    let curFloor = 1.0;
    let curL4 = 0.0;
    let curL3 = 0.0;
    let curL2 = 0.0;
    let curL1 = 0.0;
    let curL0 = 0.0;

    // Linear mapping scales
    const floorScale = createScaleY(1, 0, -1, 914);
    const l4Scale = createScaleY(0, 0, 410, 914);
    const l3Scale = createScaleY(0, 0, 165, 914);
    const l2Scale = createScaleY(0, 0, -130, 914);
    const l1Scale = createScaleY(0, 0, -475, 914);
    const l0Scale = createScaleY(0, 0, -900, 914);

    const interpolation = (end, start) => (end - start) * 0.15; // smooth lag factor

    let animationFrameId;

    const updateParallax = () => {
      // Get exact scroll position
      const scrollYPos = window.scrollY;

      // Calculate target styles for each layer at current window position
      const targetFloor = floorScale(scrollYPos);
      const targetL4 = l4Scale(scrollYPos);
      const targetL3 = l3Scale(scrollYPos);
      const targetL2 = l2Scale(scrollYPos);
      const targetL1 = l1Scale(scrollYPos);
      const targetL0 = l0Scale(scrollYPos);

      // Lerp (exponential average) to achieve premium organic easing
      curFloor += interpolation(targetFloor, curFloor);
      curL4 += interpolation(targetL4, curL4);
      curL3 += interpolation(targetL3, curL3);
      curL2 += interpolation(targetL2, curL2);
      curL1 += interpolation(targetL1, curL1);
      curL0 += interpolation(targetL0, curL0);

      // Apply GPU-accelerated transforms directly to safety-avoid React re-render overhead
      if (floorRef.current) {
        floorRef.current.style.transform = `translate3d(0px, 0px, 0px) scaleY(${curFloor.toFixed(4)})`;
      }
      if (layer4Ref.current) {
        layer4Ref.current.style.transform = `translate3d(-50%, ${curL4.toFixed(2)}px, 0px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translate3d(-50%, ${curL3.toFixed(2)}px, 0px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translate3d(-50%, ${curL2.toFixed(2)}px, 0px)`;
      }
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translate3d(-50%, ${curL1.toFixed(2)}px, 0px)`;
      }
      if (layer0Ref.current) {
        layer0Ref.current.style.transform = `translate3d(-50%, ${curL0.toFixed(2)}px, 0px)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    // Begin raf loop
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 select-none transition-opacity duration-500`}
    >
      <div 
        className="relative w-full h-full origin-bottom"
        style={{
          // Apply filters to make sure they are gorgeously visible & perfectly colored for active light/dark themes
          filter: isDark 
            ? "brightness(1) contrast(1.05) drop-shadow(0 0 12px rgba(255, 255, 255, 0.25)) opacity(0.8)" 
            : "invert(1) sepia(0.9) saturate(2.8) hue-rotate(125deg) brightness(0.5) contrast(1.3) opacity(0.85)"
        }}
      >
        {/* Layer 0 (Type 6): Front landscape wave/grids - closest/fastest parallax */}
        <div 
          ref={layer0Ref}
          className="absolute left-1/2 rounded-b-md"
          style={{
            width: "3194px",
            height: "958px",
            top: "395px",
            opacity: 0.9,
            backgroundImage: "url('https://ucarecdn.com/125b69a3-b60c-44fc-aece-f6a3829f9058/layer0new.png')",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
            zIndex: 60,
          }}
        />

        {/* Layer 1 (Type 5): Mid-ground wave lines */}
        <div 
          ref={layer1Ref}
          className="absolute left-1/2"
          style={{
            width: "2560px",
            height: "790px",
            top: "270px",
            opacity: 1.0,
            backgroundImage: "url('https://ucarecdn.com/b9bfe089-6faf-4f96-a7df-37bba7543552/layer1new.png')",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
            zIndex: 50,
          }}
        />

        {/* Layer 2 (Type 4): Higher frequency background wave nodes */}
        <div 
          ref={layer2Ref}
          className="absolute left-1/2"
          style={{
            width: "2561px",
            height: "276px",
            top: "530px",
            opacity: 0.85,
            backgroundImage: "url('https://ucarecdn.com/179da4ab-4ea6-4d9d-aed7-adc22eccd11e/layer2new.png')",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
            zIndex: 40,
          }}
        />

        {/* Layer 3 (Type 3): Far landscape outlines */}
        <div 
          ref={layer3Ref}
          className="absolute left-1/2"
          style={{
            width: "2560px",
            height: "324px",
            top: "325px",
            opacity: 0.8,
            backgroundImage: "url('https://ucarecdn.com/7258c13b-37d7-4a16-a3d4-9b170af26ab4/layer3new.png')",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
            zIndex: 30,
          }}
        />

        {/* Layer 4 (Type 2): Furthest skyline outlines */}
        <div 
          ref={layer4Ref}
          className="absolute left-1/2"
          style={{
            width: "2560px",
            height: "201px",
            top: "290px",
            opacity: 0.5,
            backgroundImage: "url('https://ucarecdn.com/2e109c0b-770d-4f4d-9e1c-5d9c948e2ea5/layer4new.png')",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
            zIndex: 20,
          }}
        />

        {/* Floor Horizon grid layer */}
        <div 
          ref={floorRef}
          className="absolute left-0 right-0 w-full"
          style={{
            height: "786px",
            top: "250px",
            backgroundImage: "url('https://ucarecdn.com/0f8cc77a-d43a-449b-b89f-f09a5f321d14/floornew.png')",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "repeat-x",
            willChange: "transform",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
