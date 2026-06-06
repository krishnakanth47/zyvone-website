import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

export function GlobeBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Globe properties
    let radius = 400;
    let centerX = 0;
    let centerY = 0;

    // Angle of rotation
    let angleY = 0;
    let angleX = 0.35; // Elegant rotation tilt
    let angleZ = -0.12;

    // Rotation speeds (ultra-slow luxury motions)
    const speedY = 0.0022;

    // Points on the sphere (digital network nodes)
    const nodeCount = 90;
    const sphereNodes = [];

    // Generate beautifully distributed uniform points using the Golden Spiral spacing algorithm
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius of circle at y
      const theta = 2.39996 * i; // Golden angle in radians

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      sphereNodes.push({
        x,
        y,
        z,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        baseSize: 1.2 + Math.random() * 1.8,
      });
    }

    // Active digital data streams arcing beautifully off the surface
    const streamCount = 14;
    const activeStreams = [];

    const darkColors = [
      { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.25)" }, // Luminous Pure White
      { primary: "#cbd5e1", secondary: "rgba(203, 213, 225, 0.2)" }, // Slate Silver
      { primary: "#94a3b8", secondary: "rgba(148, 163, 184, 0.15)" }, // Graphite Grey
      { primary: "#f8fafc", secondary: "rgba(248, 250, 252, 0.2)" }, // Diamond Bright
    ];

    const lightColors = [
      { primary: "#4f46e5", secondary: "rgba(79, 70, 229, 0.35)" }, // Vivid Indigo
      { primary: "#2563eb", secondary: "rgba(37, 99, 235, 0.3)" }, // Luminous Blue
      { primary: "#7c3aed", secondary: "rgba(124, 58, 237, 0.3)" }, // Electric Violet
      { primary: "#1e293b", secondary: "rgba(30, 41, 59, 0.25)" }, // Deep Slate slate-800
    ];

    function createStream() {
      const idxA = Math.floor(Math.random() * sphereNodes.length);
      let idxB = Math.floor(Math.random() * sphereNodes.length);
      while (idxB === idxA) {
        idxB = Math.floor(Math.random() * sphereNodes.length);
      }

      return {
        nodeA: sphereNodes[idxA],
        nodeB: sphereNodes[idxB],
        progress: 0,
        speed: 0.0012 + Math.random() * 0.0025, // slow-motion tracking speed
        arcHeight: 0.08 + Math.random() * 0.16, // how far the stream swells off the globe surface
        colorIndex: Math.floor(Math.random() * 4),
        lineWidth: 1.2 + Math.random() * 1.8,
      };
    }

    for (let i = 0; i < streamCount; i++) {
      activeStreams.push(createStream());
    }

    // Floating particles (cinematic dust hovering and rising)
    const particleCount = 55;
    const backgroundParticles = [];

    for (let i = 0; i < particleCount; i++) {
      backgroundParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0002,
        vy: -0.0002 - Math.random() * 0.0004, // Slow upward drift
        size: 0.7 + Math.random() * 1.4,
        alpha: 0.05 + Math.random() * 0.22,
      });
    }

    // 3D Matrix/Euler Rotation Helper
    function rotate3D(point, rotX, rotY, rotZ) {
      // 1. Z axis rotation
      let x1 = point.x * Math.cos(rotZ) - point.y * Math.sin(rotZ);
      let y1 = point.x * Math.sin(rotZ) + point.y * Math.cos(rotZ);
      let z1 = point.z;

      // 2. X axis rotation
      let x2 = x1;
      let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

      // 3. Y axis rotation
      let x3 = x2 * Math.cos(rotY) + z2 * Math.sin(rotY);
      let y3 = y2;
      let z3 = -x2 * Math.sin(rotY) + z2 * Math.cos(rotY);

      return { x: x3, y: y3, z: z3 };
    }

    // High Density Pixel Grid Scaling for gorgeous 4K and Retina monitors
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = w;
        height = h;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        centerX = w / 2;
        centerY = h * 0.98; // Position at the very bottom to anchor readable layout

        // Reactive radius is scaled up significantly to enlarge the globe animation
        if (w < 640) {
          radius = Math.min(w * 1.15, 385);
        } else if (w < 1024) {
          radius = Math.min(w * 0.95, 580);
        } else if (w < 1440) {
          radius = Math.min(w * 0.78, 760);
        } else {
          radius = Math.min(w * 0.68, 920);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Main Canvas Render loop
    function animate() {
      const isDark = isDarkRef.current;

      // Clear the canvas each frame to preserve transparency and overlay on the page's grid background
      ctx.clearRect(0, 0, width, height);

      // Deep radial glow below the rotating network structures
      const radialGlow = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, radius * 1.5
      );
      if (isDark) {
        radialGlow.addColorStop(0, "rgba(255, 255, 255, 0.05)"); // Deep light grey core
        radialGlow.addColorStop(0.4, "rgba(148, 163, 184, 0.02)"); // Ambient soft slate/charcoal
        radialGlow.addColorStop(0.85, "rgba(203, 213, 225, 0.005)");
        radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        radialGlow.addColorStop(0, "rgba(99, 102, 241, 0.12)"); // Soft indigo core
        radialGlow.addColorStop(0.4, "rgba(59, 130, 246, 0.05)"); // Soft blue aura
        radialGlow.addColorStop(0.85, "rgba(148, 163, 184, 0.01)");
        radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Update lentement the angle rotation
      angleY += speedY;

      // ── Draw Volumetric Particle Dust ──
      for (const p of backgroundParticles) {
        p.x += p.vx;
        p.y += p.vy;

        // Clean wrapping
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const posX = p.x * width;
        const posY = p.y * height;

        if (isDark) {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.25})`;
        } else {
          ctx.fillStyle = `rgba(71, 85, 105, ${p.alpha * 0.22})`; // slate-600
        }
        ctx.beginPath();
        ctx.arc(posX, posY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Layer custom glowing embers
        if (p.size > 1.1) {
          ctx.shadowBlur = isDark ? 6 : 0;
          ctx.shadowColor = isDark ? "#ffffff" : "transparent";
          ctx.fillStyle = isDark
            ? `rgba(226, 232, 240, ${p.alpha * 0.35})`
            : `rgba(99, 102, 241, ${p.alpha * 0.3})`; // indigo-500
          ctx.beginPath();
          ctx.arc(posX, posY, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // instantly reset
        }
      }

      // Rotate and project all nodes
      const projectedNodes = sphereNodes.map((node) => {
        const rotated = rotate3D(node, angleX, angleY, angleZ);
        
        // Accurate perspective calculation
        const zValue = rotated.z; // ranges from -1 to 1
        const zoom = 550;
        const distance = 650;
        const scale = zoom / (distance + zValue * 220);

        const projX = centerX + rotated.x * radius * scale;
        const projY = centerY + rotated.y * radius * scale;

        return {
          projX,
          projY,
          z: zValue, // depth sorting reference
          original: node,
        };
      });

      // ── Draw BACK Meridians & Grid Lines (Z < 0) ──
      ctx.lineWidth = 0.5;
      
      const latGridCount = 8;
      for (let i = 0; i < latGridCount; i++) {
        const latVal = (i / (latGridCount + 1)) * Math.PI - Math.PI / 2;
        const cosLat = Math.cos(latVal);
        const yVal = Math.sin(latVal);

        ctx.beginPath();
        let init = false;
        for (let s = 0; s <= 32; s++) {
          const lonVal = (s / 32) * Math.PI * 2;
          const rotated = rotate3D(
            { x: cosLat * Math.sin(lonVal), y: yVal, z: cosLat * Math.cos(lonVal) },
            angleX, angleY, angleZ
          );

          if (rotated.z < 0) { // Render back components
            const scale = 550 / (650 + rotated.z * 220);
            const px = centerX + rotated.x * radius * scale;
            const py = centerY + rotated.y * radius * scale;

            if (!init) {
              ctx.moveTo(px, py);
              init = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            init = false;
          }
        }
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(79, 70, 229, 0.14)";
        ctx.stroke();
      }

      const lonGridCount = 12;
      for (let i = 0; i < lonGridCount; i++) {
        const lonVal = (i / lonGridCount) * Math.PI * 2;

        ctx.beginPath();
        let init = false;
        for (let s = 0; s <= 24; s++) {
          const latVal = (s / 24) * Math.PI - Math.PI / 2;
          const rotated = rotate3D(
            { x: Math.cos(latVal) * Math.sin(lonVal), y: Math.sin(latVal), z: Math.cos(latVal) * Math.cos(lonVal) },
            angleX, angleY, angleZ
          );

          if (rotated.z < 0) {
            const scale = 550 / (650 + rotated.z * 220);
            const px = centerX + rotated.x * radius * scale;
            const py = centerY + rotated.y * radius * scale;

            if (!init) {
              ctx.moveTo(px, py);
              init = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            init = false;
          }
        }
        ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.04)" : "rgba(79, 70, 229, 0.12)";
        ctx.stroke();
      }

      // Draw BACK data streams
      drawStreams(ctx, activeStreams, centerX, centerY, radius, angleX, angleY, angleZ, false);

      // Draw BACK nodes
      for (const node of projectedNodes) {
        if (node.z < 0) {
          const pulse = Math.sin(Date.now() * node.original.pulseSpeed + node.original.pulseOffset);
          const size = node.original.baseSize * (1 + pulse * 0.12) * 0.5;

          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(79, 70, 229, 0.16)";
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Draw FRONT Meridians & Grid Lines (Z >= 0) ──
      for (let i = 0; i < latGridCount; i++) {
        const latVal = (i / (latGridCount + 1)) * Math.PI - Math.PI / 2;
        const cosLat = Math.cos(latVal);
        const yVal = Math.sin(latVal);

        ctx.beginPath();
        let init = false;
        for (let s = 0; s <= 32; s++) {
          const lonVal = (s / 32) * Math.PI * 2;
          const rotated = rotate3D(
            { x: cosLat * Math.sin(lonVal), y: yVal, z: cosLat * Math.cos(lonVal) },
            angleX, angleY, angleZ
          );

          if (rotated.z >= 0) {
            const scale = 550 / (650 + rotated.z * 220);
            const px = centerX + rotated.x * radius * scale;
            const py = centerY + rotated.y * radius * scale;

            if (!init) {
              ctx.moveTo(px, py);
              init = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            init = false;
          }
        }
        
        // Equator ring is highlighted with a premium brand neon pulse
        if (i === 3 || i === 4) {
          ctx.strokeStyle = isDark ? "rgba(124, 58, 237, 0.45)" : "rgba(79, 70, 229, 0.65)";
          ctx.lineWidth = 1.3;
        } else {
          ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(79, 70, 229, 0.3)";
          ctx.lineWidth = 0.85;
        }
        ctx.stroke();
      }

      for (let i = 0; i < lonGridCount; i++) {
        const lonVal = (i / lonGridCount) * Math.PI * 2;

        ctx.beginPath();
        let init = false;
        for (let s = 0; s <= 24; s++) {
          const latVal = (s / 24) * Math.PI - Math.PI / 2;
          const rotated = rotate3D(
            { x: Math.cos(latVal) * Math.sin(lonVal), y: Math.sin(latVal), z: Math.cos(latVal) * Math.cos(lonVal) },
            angleX, angleY, angleZ
          );

          if (rotated.z >= 0) {
            const scale = 550 / (650 + rotated.z * 220);
            const px = centerX + rotated.x * radius * scale;
            const py = centerY + rotated.y * radius * scale;

            if (!init) {
              ctx.moveTo(px, py);
              init = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            init = false;
          }
        }

        // Selected prime/secondary meridians are accented with a soft neon glow
        if (i % 3 === 0) {
          ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.45)" : "rgba(37, 99, 235, 0.6)";
          ctx.lineWidth = 1.25;
        } else {
          ctx.strokeStyle = isDark ? "rgba(226, 232, 240, 0.14)" : "rgba(79, 70, 229, 0.28)";
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
      }

      // Connect proximal FRONT nodes to generate stylized networks
      ctx.lineWidth = 0.55;
      for (let i = 0; i < projectedNodes.length; i++) {
        const nodeA = projectedNodes[i];
        if (nodeA.z < 0) continue;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const nodeB = projectedNodes[j];
          if (nodeB.z < 0) continue;

          const dx = nodeA.original.x - nodeB.original.x;
          const dy = nodeA.original.y - nodeB.original.y;
          const dz = nodeA.original.z - nodeB.original.z;
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance3D < 0.28) {
            const alpha = (1 - distance3D / 0.28) * 0.35;
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${alpha * 0.75})`
              : `rgba(79, 70, 229, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.projX, nodeA.projY);
            ctx.lineTo(nodeB.projX, nodeB.projY);
            ctx.stroke();
          }
        }
      }

      // Draw FRONT data streams (flowing luminous lightning)
      drawStreams(ctx, activeStreams, centerX, centerY, radius, angleX, angleY, angleZ, true);

      // Draw FRONT nodes (glowing ports/terminals)
      for (const node of projectedNodes) {
        if (node.z >= 0) {
          const pulse = Math.sin(Date.now() * node.original.pulseSpeed + node.original.pulseOffset);
          const size = node.original.baseSize * (1 + pulse * 0.15);

          ctx.shadowBlur = isDark ? 4 : 3;
          ctx.shadowColor = isDark ? "#ffffff" : "rgba(79, 70, 229, 0.6)";
          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(67, 56, 202, 0.95)";
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0; // immediate reset

          // Subtle outward dynamic pulse aura
          ctx.fillStyle = isDark ? "rgba(226, 232, 240, 0.1)" : "rgba(99, 102, 241, 0.18)";
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update data streams
      for (let i = 0; i < activeStreams.length; i++) {
        activeStreams[i].progress += activeStreams[i].speed;
        if (activeStreams[i].progress >= 1.0) {
          activeStreams[i] = createStream();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // Mathematical utility drawing parametric arced trails through 3D space
    function drawStreams(ctx, streams, cx, cy, r, rotX, rotY, rotZ, drawFront) {
      const isDark = isDarkRef.current;
      for (const stream of streams) {
        const A = stream.nodeA;
        const B = stream.nodeB;
        
        const ptCount = 35;
        const points = [];
        let totalZ = 0;

        for (let s = 0; s <= ptCount; s++) {
          const t = s / ptCount;
          const ix = A.x * (1 - t) + B.x * t;
          const iy = A.y * (1 - t) + B.y * t;
          const iz = A.z * (1 - t) + B.z * t;
          
          const length = Math.sqrt(ix * ix + iy * iy + iz * iz);
          const nx = ix / length;
          const ny = iy / length;
          const nz = iz / length;

          const elevation = 1 + stream.arcHeight * Math.sin(Math.PI * t);
          const rotated = rotate3D(
            { x: nx * elevation, y: ny * elevation, z: nz * elevation },
            rotX, rotY, rotZ
          );
          points.push(rotated);
          totalZ += rotated.z;
        }

        const avgZ = totalZ / (ptCount + 1);
        const isSegmentFront = avgZ >= 0;
        if (isSegmentFront !== drawFront) continue;

        const progress = stream.progress;
        const trailSpan = 0.38; // stream trail length coverage

        for (let i = 1; i < points.length; i++) {
          const segmentVal = i / points.length;
          
          if (segmentVal > progress || segmentVal < progress - trailSpan) continue;

          const distanceToHead = (progress - segmentVal) / trailSpan; // 0 is head, 1 is tail
          const alphaFade = 1 - distanceToHead;

          const scaleA = 550 / (650 + points[i-1].z * 220);
          const xA = cx + points[i-1].x * r * scaleA;
          const yA = cy + points[i-1].y * r * scaleA;

          const scaleB = 550 / (650 + points[i].z * 220);
          const xB = cx + points[i].x * r * scaleB;
          const yB = cy + points[i].y * r * scaleB;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(xA, yA);
          ctx.lineTo(xB, yB);

          const colors = isDark ? darkColors : lightColors;
          const streamColor = colors[stream.colorIndex] || colors[0];

          ctx.globalAlpha = isDark ? alphaFade * 0.75 : alphaFade * 0.95;
          ctx.strokeStyle = streamColor.primary;

          if (distanceToHead < 0.08) {
            ctx.shadowBlur = isDark ? 8 : 4;
            ctx.shadowColor = streamColor.primary;
            ctx.lineWidth = stream.lineWidth * 1.8;
          } else {
            ctx.lineWidth = stream.lineWidth * alphaFade;
          }

          ctx.stroke();
          ctx.restore();
        }
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-transparent select-none pointer-events-none"
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, #000 35%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.12) 92%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 35%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.12) 92%, rgba(0,0,0,0) 100%)"
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
