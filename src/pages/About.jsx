import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Users, Award, ShieldCheck, Target, ChevronDown } from "lucide-react";
import { STATS_DATA } from "../data/mockData";

import sibiImg from "../assets/members/sibilokeshanandhapadmanapan.jpg";
import ganapathyImg from "../assets/members/ganapathyram.jpg";
import aldrinImg from "../assets/members/aldrinanaahath.jpg";
import lobanaImg from "../assets/members/lobana.jpg";
import mohanImg from "../assets/members/mohankumar.jpg";
import punithaImg from "../assets/members/punithaayilya.jpg";
import keekuImg from "../assets/members/keeku.jpg";
import kanishkaImg from "../assets/members/kanishka.jpg";

const LOCAL_TEAM_DATA = [
  {
    name: "Sibi Lokesh Anandhapadmanapan",
    role: "Founder",
    image: sibiImg
  },
  {
    name: "Ganapathy Ram",
    role: "CEO",
    image: ganapathyImg
  },
  {
    name: "Aldrin Anaahath",
    role: "COO",
    image: aldrinImg
  },
  {
    name: "Lobana",
    role: "HR & Public Relations Officer (PRO)",
    image: lobanaImg
  },
  {
    name: "Mohan Kumar",
    role: "Principal Software Architect",
    image: mohanImg
  },
  {
    name: "Punitha Ayilya",
    role: "Lead Frontend Engineer",
    image: punithaImg
  },
  {
    name: "Keeku",
    role: "Full Stack Developer",
    image: keekuImg
  },
  {
    name: "Kanishka",
    role: "UI/UX Engineer",
    image: kanishkaImg
  }
];

const CORE_VALUES = [
  {
    icon: Target,
    title: "Meticulous Execution",
    body: "No shortcuts. We obsess over performance, accessibility, and the details that separate good products from exceptional ones."
  },
  {
    icon: Award,
    title: "Design Excellence",
    body: "We create systems that are beautiful, purposeful, and scalable. Every interaction, color, and typeface choice serves a reason."
  },
  {
    icon: ShieldCheck,
    title: "Transparent Partnership",
    body: "We communicate clearly, deliver on time, and give you full ownership of everything we create—code, designs, and documentation."
  }
];

export default function About() {
  const [crewIndex, setCrewIndex] = useState(0);
  const [crewAnimating, setCrewAnimating] = useState(false);
  const [displayedMember, setDisplayedMember] = useState(LOCAL_TEAM_DATA[0]);
  const [textOpacity, setTextOpacity] = useState(1);
  const [activeValueIdx, setActiveValueIdx] = useState(null);
  const touchStart = useRef(0);

  const updateCrewCarousel = (newIndex) => {
    if (crewAnimating) return;
    setCrewAnimating(true);
    
    const nextIndex = (newIndex + LOCAL_TEAM_DATA.length) % LOCAL_TEAM_DATA.length;
    setCrewIndex(nextIndex);
    
    setTextOpacity(0);
    setTimeout(() => {
      setDisplayedMember(LOCAL_TEAM_DATA[nextIndex]);
      setTextOpacity(1);
    }, 200);

    setTimeout(() => {
      setCrewAnimating(false);
    }, 600);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        updateCrewCarousel(crewIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateCrewCarousel(crewIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [crewIndex, crewAnimating]);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        updateCrewCarousel(crewIndex + 1);
      } else {
        updateCrewCarousel(crewIndex - 1);
      }
    }
  };

  const getCardClass = (idx) => {
    const total = LOCAL_TEAM_DATA.length;
    const offset = (idx - crewIndex + total) % total;
    
    if (offset === 0) return "center";
    if (offset === 1) return "right-1";
    if (offset === 2) return "right-2";
    if (offset === total - 1) return "left-1";
    if (offset === total - 2) return "left-2";
    return "hidden";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-transparent pb-24"
    >
      {/* Dynamic Coverflow CSS Injection */}
      <style>{`
        .crew-carousel {
          width: 100%;
          max-width: 1200px;
          height: 440px;
          position: relative;
          perspective: 1200px;
          margin: 40px auto 0px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crew-track {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s ease;
        }

        .crew-card {
          position: absolute;
          width: 270px;
          height: 360px;
          left: 50%;
          top: 50%;
          margin-left: -135px;
          margin-top: -180px;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
        }

        .crew-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.8s ease, transform 0.8s ease;
        }

        /* Ambient subtle overlay inside each card to ensure text readability */
        .crew-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.65) 30%, rgba(0, 0, 0, 0.15) 60%, transparent 100%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          opacity: 0.4;
          transform: scale(0.98);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
        }

        .crew-card.center .crew-card-overlay {
          opacity: 1;
          transform: scale(1);
        }

        .crew-card:hover .crew-card-overlay {
          opacity: 1;
          transform: scale(1);
        }

        .crew-card-details {
          text-align: left;
          width: 100%;
        }

        .crew-card-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin-bottom: 2px;
        }

        .crew-card-role {
          font-size: 0.72rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.2;
        }

        .crew-card.center {
          z-index: 50;
          transform: translateX(0) scale(1.1);
          opacity: 1;
          filter: grayscale(0%);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
        }

        .crew-card.left-1 {
          z-index: 30;
          transform: translateX(-140px) scale(0.9);
          opacity: 0.75;
          filter: grayscale(15%);
        }

        .crew-card.left-2 {
          z-index: 10;
          transform: translateX(-250px) scale(0.8);
          opacity: 0.45;
          filter: grayscale(50%);
        }

        .crew-card.right-1 {
          z-index: 30;
          transform: translateX(140px) scale(0.9);
          opacity: 0.75;
          filter: grayscale(15%);
        }

        .crew-card.right-2 {
          z-index: 10;
          transform: translateX(250px) scale(0.8);
          opacity: 0.45;
          filter: grayscale(50%);
        }

        .crew-card.hidden {
          opacity: 0;
          transform: translateX(0) scale(0.5);
          pointer-events: none;
          z-index: 0;
        }

        .crew-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 36px;
        }

        .crew-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(120, 120, 120, 0.2);
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .crew-dot.active {
          background: #111111;
          width: 20px;
          border-radius: 6px;
        }

        .dark .crew-dot.active {
          background: #ffffff;
        }

        .crew-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(12, 12, 12, 0.6);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          font-size: 1.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, transform 0.2s ease;
          z-index: 65;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .crew-arrow:hover {
          background: rgba(12, 12, 12, 0.85);
          transform: translateY(-50%) scale(1.05);
        }

        .crew-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .crew-left {
          left: 15px;
        }

        .crew-right {
          right: 15px;
        }

        @media (max-width: 1024px) {
          .crew-carousel {
            height: 400px;
          }
          .crew-card {
            width: 230px;
            height: 310px;
            margin-left: -115px;
            margin-top: -155px;
          }
          .crew-card.left-1 {
            transform: translateX(-110px) scale(0.9);
          }
          .crew-card.left-2 {
            transform: translateX(-195px) scale(0.75);
          }
          .crew-card.right-1 {
            transform: translateX(110px) scale(0.9);
          }
          .crew-card.right-2 {
            transform: translateX(195px) scale(0.75);
          }
        }

        @media (max-width: 768px) {
          .crew-carousel {
            height: 350px;
          }
          .crew-card {
            width: 190px;
            height: 260px;
            margin-left: -95px;
            margin-top: -130px;
          }
          .crew-card.left-1 {
            transform: translateX(-85px) scale(0.85);
          }
          .crew-card.left-2 {
            transform: translateX(-150px) scale(0.7);
          }
          .crew-card.right-1 {
            transform: translateX(85px) scale(0.85);
          }
          .crew-card.right-2 {
            transform: translateX(150px) scale(0.7);
          }
          .crew-card-overlay {
            padding: 14px;
          }
          .crew-card-name {
            font-size: 0.95rem;
          }
          .crew-card-role {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .crew-carousel {
            height: 290px;
          }
          .crew-card {
            width: 150px;
            height: 210px;
            margin-left: -75px;
            margin-top: -105px;
          }
          .crew-card.left-1 {
            transform: translateX(-65px) scale(0.8);
          }
          .crew-card.left-2 {
            transform: translateX(-115px) scale(0.65);
          }
          .crew-card.right-1 {
            transform: translateX(65px) scale(0.8);
          }
          .crew-card.right-2 {
            transform: translateX(115px) scale(0.65);
          }
          .crew-card-overlay {
            padding: 10px;
          }
          .crew-card-name {
            font-size: 0.8rem;
          }
          .crew-card-role {
            font-size: 0.58rem;
          }
        }
      `}</style>
      {/* ── Page Header ── */}
      <div className="relative isolate pt-24 pb-12 border-b border-slate-200/65 dark:border-slate-800 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-black dark:text-white border border-slate-300 dark:border-slate-800 uppercase tracking-wider">
            <Users size={12} />
            Our Studio Narrative
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-sans text-center mx-auto" style={{ textAlign: "center" }}>
            Engineered For Visual Impact
          </h1>
          <p 
            className="max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400 font-light text-center block w-full"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            We are a compact collective of designers and technologists focused on replacing heavy legacy stacks with polished, interactive interfaces.
          </p>
        </div>
      </div>

      {/* ── Mission & Vision Section ── */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0F295E] text-white border border-slate-700/50 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/10 blur-[50px] pointer-events-none" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-white/10 text-white uppercase tracking-wider">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Blazing execution meets meticulous design.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed text-justify">
              Our mission is to build digital products of impeccable visual standard and performance execution, shifting ambitious teams off heavy legacy setups onto modern client-focused custom systems.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
              Our Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans text-slate-900 dark:text-white">
              Raising the universal standard for custom software.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed text-justify">
              We envision a future where high-impact enterprise stacks are built with architectural honesty—replacing low-resolution templates with clean systems that are exceptionally fast, responsive, and secure.
            </p>
          </div>
        </div>
      </div>

      {/* ── Core Value Propositions Cards ── */}
      <div className="max-w-3xl mx-auto px-6 mt-28">
        <div className="space-y-4">
          {CORE_VALUES.map((val, idx) => {
            const IconComp = val.icon;
            const isOpen = activeValueIdx === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/[0.02] overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setActiveValueIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-sans text-sm font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center">
                      <IconComp size={18} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white font-sans text-base">
                      {val.title}
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-300">
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/10 bg-slate-50/10 dark:bg-white/5">
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mt-4">
                          {val.body}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Context Metrics Bar Loop ── */}
      <div className="max-w-7xl mx-auto px-6 mt-28">
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden isolate">
          <div aria-hidden="true" className="absolute top-0 right-0 h-48 w-48 rounded-full bg-slate-500/[0.03] dark:bg-slate-500/5 blur-3xl pointer-events-none -z-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className="space-y-1">
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team Members Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-6 mt-28">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-black dark:text-white border border-slate-300 dark:border-slate-700 uppercase tracking-wider">
            <Sparkles size={10} className="text-[#662D91] dark:text-[#c084fc] animate-twinkle-purple" />
            The Engineers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-sans">Our Architecture Collective</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
            Meet the specialists running our design workflows, system modeling components, and edge application runtimes.
          </p>
        </div>

        <div 
          className="crew-carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            className="crew-arrow crew-left" 
            onClick={() => updateCrewCarousel(crewIndex - 1)}
            aria-label="Previous specialist"
          >
            ‹
          </button>
          
          <div className="crew-track">
            {LOCAL_TEAM_DATA.map((member, idx) => {
              const cardClass = getCardClass(idx);
              const isActive = cardClass === "center";
              return (
                <div 
                  key={idx} 
                  className={`crew-card ${cardClass}`}
                  onClick={() => !isActive && updateCrewCarousel(idx)}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Premium floating overlay directly on the card */}
                  <div className="crew-card-overlay">
                    <div className="crew-card-details">
                      <h3 className="crew-card-name font-sans">{member.name}</h3>
                      <p className="crew-card-role uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="crew-arrow crew-right" 
            onClick={() => updateCrewCarousel(crewIndex + 1)}
            aria-label="Next specialist"
          >
            ›
          </button>
        </div>

        {/* Navigation Indicators / Dots */}
        <div className="crew-dots pb-12">
          {LOCAL_TEAM_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => updateCrewCarousel(i)}
              className={`crew-dot ${i === crewIndex ? "active" : ""}`}
              aria-label={`Show specialist ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
