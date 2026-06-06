import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Sparkles,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  GraduationCap,
  Calculator,
  BookOpen,
  HelpCircle,
  Target,
  Users,
  Layers,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";
import { GlobeBackground } from "../components/GlobeBackground";
import { useTheme } from "../components/ThemeContext";
import {
  PRODUCTS_DATA,
  SERVICES_DATA,
  STATS_DATA,
  FAQS_DATA,
} from "../data/mockData";

/* ── Animation configurations ───────────────────────────── */
const cubicBezier = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: cubicBezier } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: cubicBezier } },
};

/* ── Reusable viewport intersection tracker ──────────────── */
function useReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  return { ref, inView: isInView };
}

function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 mb-3 rounded-full border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#0f172a] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-black dark:text-white">
          <Sparkles size={10} strokeWidth={2.5} className="text-[#662D91] dark:text-[#c084fc] animate-twinkle-purple" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>

      {/* Dynamic Glowing Page Scroll Indicator Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F295E] via-indigo-500 to-amber-500 origin-left z-[100] shadow-[0_2px_12px_rgba(79,70,229,0.4)]"
        style={{ scaleX }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="min-h-screen bg-transparent overflow-x-hidden"
      >
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <ProductsSection />
        <FAQSection />
      </motion.div>
    </>
  );
}

/* ────────────────────────────────────────────────────────
    1. HERO
170: ─── */
function HeroSection() {
  const { isDark } = useTheme();

  return (
    <section 
      className={`
        relative isolate flex flex-col items-center justify-center text-center min-h-[85vh] sm:min-h-screen px-5 sm:px-8 pt-20 pb-12 sm:pt-28 sm:pb-20 overflow-hidden 
        transition-colors duration-300
        bg-transparent ${isDark ? 'text-white' : 'text-slate-900'}
      `}
    >
      
      {/* ── Interactive 3D Digital Rotating Globe Network Background ── */}
      <GlobeBackground />

      {/* Subtle overlays for extra negative space contrast at the top */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Soft, rich dynamic gradient shield on top for perfect legibility */}
        <div className={`
          absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b 
          transition-all duration-300
          ${isDark 
            ? 'from-[#030303] via-[#030303]/80 to-transparent' 
            : 'from-white via-white/80 to-transparent'}
        `} />


      </div>

      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: cubicBezier }}
        className="z-10"
      >
        <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-slate-700 dark:text-slate-300 shadow-sm mb-5 sm:mb-8">
          <TrendingUp size={12} strokeWidth={2.5} className="text-slate-500 dark:text-neutral-300" />
          Product · Design · Engineering
        </span>
      </motion.div>

      {/* Headlines */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: cubicBezier }}
        className="max-w-4xl text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight sm:leading-[1.08] font-sans z-10"
      >
        <span className="text-slate-900 dark:text-white">We build </span>
        <span className="text-slate-900 dark:text-white">
          digital experiences
        </span>
        <br className="hidden sm:block" />
        <span className="text-slate-900 dark:text-white"> that </span>
        <span className="relative inline-block">
          <span className="text-slate-900 dark:text-white">
            define categories.
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.75, ease: cubicBezier }}
            className={`
              absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full opacity-90 
              ${isDark 
                ? 'bg-gradient-to-r from-white via-slate-200 to-slate-400 shadow-[0_0_12px_rgba(255,255,255,0.45)]' 
                : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 shadow-[0_0_12px_rgba(79,70,229,0.35)]'}
            `}
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.38, ease: cubicBezier }}
        className="mt-5 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-white/85 leading-relaxed font-light px-2 sm:px-0 z-10"
      >
        Zyvone Technologies is an elite product agency — we design systems, engineer
        performance, and craft brand identities that turn ambitious visions into
        living, breathing digital platforms.
      </motion.p>

      {/* Trigger buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.52, ease: cubicBezier }}
        className="mt-6 sm:mt-10 flex flex-row flex-nowrap items-center justify-center gap-2.5 sm:gap-4 z-10 w-full max-w-md px-4 sm:px-0"
      >
        <Link
          to="/products"
          className="
            group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2
            rounded-xl px-3.5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold
            bg-black hover:bg-slate-900 text-white
            dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200
            cursor-pointer
            shadow-lg shadow-black/10 dark:shadow-white/5
            hover:-translate-y-0.5
            transition-all duration-200
            text-center whitespace-nowrap
          "
        >
          Explore Products
          <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <Link
          to="/contact"
          className="
            group flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2
            rounded-xl px-3.5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold
            border border-slate-300 dark:border-white/10
            bg-white/40 dark:bg-white/5 backdrop-blur-sm
            text-slate-700 dark:text-slate-300 cursor-pointer
            hover:border-slate-400 dark:hover:border-white/30
            hover:bg-white/80 dark:hover:bg-white/10
            hover:text-black dark:hover:text-white
            hover:-translate-y-0.5 shadow-sm
            transition-all duration-200
            text-center whitespace-nowrap
          "
        >
          <CalendarCheck size={14} strokeWidth={2} className="text-slate-500 dark:text-slate-400 transition-colors duration-200 group-hover:text-black dark:group-hover:text-white flex-shrink-0" />
          <span>Book a <span className="hidden sm:inline">Strategy </span>Call</span>
        </Link>
      </motion.div>

    </section>
  );
}
/* ────────────────────────────────────────────────────────
    2. SERVICES GRID
──────────────────────────────────────────────────────── */
function ServicesSection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-24 px-5 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="What we do"
              title="Every discipline you need, under one roof."
              subtitle="From research to release — Zyvone covers the full product lifecycle with dedicated specialists who care about the craft."
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {SERVICES_DATA.slice(0, 4).map((service) => {
              return (
                <motion.div key={service.id} variants={scaleIn}>
                  <ServiceCard service={service} strokeColor="#662D91" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
    3. STATISTICS (CONSOLIDATED METRICS RIBBON)
 ──────────────────────────────────────────────────────── */
function StatsSection() {
  const { ref, inView } = useReveal();

  // Duplicate STATS_DATA for seamless infinite looping
  const duplicatedStats = [...STATS_DATA, ...STATS_DATA];

  return (
    <section ref={ref} className="py-16 px-5 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[#0F295E] dark:bg-white/[0.03] rounded-3xl py-10 shadow-xl relative overflow-hidden isolate border border-slate-700/40"
        >
          <div aria-hidden="true" className="absolute top-0 right-1/4 h-56 w-56 rounded-full bg-blue-500/10 dark:bg-white/5 blur-[80px] pointer-events-none" />
          
          <div className="stats-slider select-none">
            <div className="stats-slide-track">
              {duplicatedStats.map((stat, sIdx) => (
                <div
                  key={`${stat.id}-${sIdx}`}
                  className="stats-slide gap-1"
                >
                  <span className="text-3xl sm:text-4xl font-black text-white dark:text-white tracking-tight font-sans block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-300 dark:text-slate-400 uppercase tracking-widest leading-relaxed block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
    4. PRODUCTS CATALOG LOOP (MINIMAL PRODUCT ICONS)
──────────────────────────────────────────────────────── */
function ProductsSection() {
  const { ref, inView } = useReveal();

  const ICON_COMPONENTS = {
    "ShoppingCart": ShoppingCart,
    "GraduationCap": GraduationCap,
    "Calculator": Calculator,
    "BookOpen": BookOpen,
    "HelpCircle": HelpCircle,
    "Target": Target,
    "Users": Users,
    "Layers": Layers
  };

  return (
    <section ref={ref} className="py-24 px-5 sm:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Featured products"
              title="Tools built by architects, for teams."
              subtitle="Every Zyvone tool is battle-tested across real enterprise setups before it ships out."
            />
            <Link
              to="/products"
              className="
                group mb-[3px] inline-flex flex-shrink-0 items-center gap-1.5
                text-sm font-semibold text-black dark:text-white cursor-pointer
                hover:text-slate-700 dark:hover:text-slate-300
                transition-colors duration-200 self-start sm:self-auto
              "
            >
              View all products
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS_DATA.map((product) => {
              const IconComp = ICON_COMPONENTS[product.iconName] ?? ShoppingCart;
              return (
                <Link
                  key={product.id}
                  to={`/products?product=${product.id}`}
                  className="
                    group flex items-center gap-4 p-5 rounded-2xl
                    border border-slate-200 dark:border-slate-800
                    bg-white/40 dark:bg-white/[0.02] backdrop-blur-md
                    hover:border-slate-300 dark:hover:border-slate-700
                    shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                    hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.03)]
                    hover:-translate-y-0.5
                    hover:bg-white/60 dark:hover:bg-white/5
                    transition-all duration-300
                  "
                >
                  <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-slate-300 flex items-center justify-center group-hover:bg-[#0F295E] dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-250 icon-shimmer">
                    <IconComp size={18} />
                  </div>
                  <div className="min-w-0 flex-1 border-r border-transparent pr-2">
                    <h3 className="text-xs font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-sans truncate">
                      {product.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 font-light truncate mt-0.5 uppercase tracking-wider">
                      {product.coreModule || product.category}
                    </p>
                  </div>
                  <ChevronDown size={14} className="opacity-0 -rotate-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-slate-400 dark:text-slate-400" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
    5. FAQ SECTION (REPLACES READY TO START EMAIL MODULE)
──────────────────────────────────────────────────────── */
function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { ref, inView } = useReveal();

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-24 px-5 sm:px-8 bg-transparent border-t border-slate-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16 space-y-3"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/5 text-black dark:text-slate-300 border border-slate-200 dark:border-white/10 uppercase tracking-wider">
            <Sparkles size={11} className="text-indigo-500 dark:text-indigo-400 animate-twinkle-indigo" />
            Support Pathways
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-none text-center block w-full">
            Find answers to architectural integration, deployment options, licensing structures, and routine operations here.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="
                  rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-white/[0.02]
                  overflow-hidden transition-all duration-300 shadow-sm
                "
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="
                    w-full flex items-center justify-between gap-4 p-5 text-left
                    font-sans text-sm font-semibold text-slate-900 dark:text-white cursor-pointer
                    hover:bg-slate-50 dark:hover:bg-white/5 transition-colors
                  "
                >
                  <span>{faq.question}</span>
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
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-slate-450 dark:text-slate-500 mb-4">
            Still have outstanding technical questions or customization scope requirements?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#0F295E] dark:text-white hover:text-blue-600 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <CalendarCheck size={14} />
            Book an engineering briefing call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

