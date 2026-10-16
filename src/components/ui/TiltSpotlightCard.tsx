"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltSpotlightCard({ children, className = "" }: TiltSpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), {
    stiffness: 150,
    damping: 20
  });

  const spotlightX = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const spotlightY = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });

  function onMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
    
    spotlightX.set(x);
    spotlightY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative group rounded-[32px] border border-line bg-white/[0.03] transition-colors hover:border-lilac/30 ${className}`}
    >
      {/* 3D Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(196, 181, 253, 0.14), transparent 80%)`
          ),
        }}
      />
      
      {/* Content wrapper with Z-translation for depth */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full">
        {children}
      </div>

      {/* Internal shine effect */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
}
