import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import * as Icons from "lucide-react";
import { Layers, HelpCircle, ChevronDown, Check, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA, FAQS_DATA } from "../data/mockData";
import strategyVideo from "../assets/our process/STRATEGY.mp4";
import discoveryVideo from "../assets/our process/DISCOVERY.mp4";
import designVideo from "../assets/our process/DESIGN.mp4";
import prototypeVideo from "../assets/our process/PROTOTYPING.mp4";
import developmentVideo from "../assets/our process/DEVELOPMENT.mp4";
import launchVideo from "../assets/our process/LAUNCH.mp4";

// Hardcoded pricing dataset following the requested structural spec
const PRICING_TIERS = [
  {
    id: "saas-launch-core",
    name: "SaaS Launch Core",
    price: "$1,899",
    period: "per release",
    desc: "Perfect for core module deployment and early sandbox verification.",
    features: [
      "Core ERPNext module setup & configuration",
      "Up to 3 standard workspace page templates",
      "Fluid Tailwind adaptive CSS styling elements",
      "Standard Lucide icon library system integration",
      "SLA Helpdesk transactional ticketing support"
    ],
    popular: false
  },
  {
    id: "growth-engine",
    name: "Growth Engine",
    price: "$3,899",
    period: "per release",
    desc: "Our most popular package for growth-stage companies scaling fast.",
    features: [
      "Complete custom design system with Figma tokens",
      "Up to 6 fully designed responsive page templates",
      "Custom framer-motion interactive micro-animations",
      "Performance optimization tuned for sub-second loads",
      "Priority SLA support with dedicated Discord channel"
    ],
    popular: true
  },
  {
    id: "enterprise-blueprint-strategy",
    name: "Enterprise Blueprint Strategy",
    price: "$7,499",
    period: "per release",
    desc: "Best for comprehensive multi-tenant scaling and dedicated developer scope.",
    features: [
      "Complete custom multi-module integration suite",
      "Unlimited design system page template expansions",
      "Continuous runtime audits & active security tunings",
      "Simulated reCAPTCHA v3 spam prevention structures",
      "Dedicated 24/7/365 direct priority dev-team phone line"
    ],
    popular: false
  }
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Strategy", body: "We analyze your business requirements, define key objectives, outline the project scope, and establish clear architectural goals." },
  { step: "02", title: "Discovery", body: "We audit your existing workflows, identify integration touchpoints, draft data schemas, and compile the system specifications." },
  { step: "03", title: "Design", body: "We architect user journeys, create high-fidelity wireframes, construct a cohesive brand identity, and define custom layout tokens." },
  { step: "04", title: "Prototyping", body: "We build interactive UI mockups, refine transitions, establish responsive feedback loops, and validate component layouts under simulated flows." },
  { step: "05", title: "Development", body: "We write modular, production-ready React code, configure database clusters, build robust API proxies, and optimize runtime performance." },
  { step: "06", title: "Launch", body: "We verify quality parameters through comprehensive audits, implement secure SSL hosting layers, execute automated deploy actions, and officially launch." }
];

const SUB_SERVICES_MAP = {
  "ERPNext Suite Integration Consultation": [
    "ERPNext CRM Core Integration",
    "Inventory, Warehousing & Store POS Synclogs",
    "HRMS Payroll & Employee Ledger Node Setup",
    "Complete Financial ERP General Ledgers Alignment"
  ],
  "Custom Web/Mobile App Blueprint Scope": [
    "Figma High-Fidelity Design System Tokens Setup",
    "Custom React SPA Setup with Vite & TypeScript",
    "Native Android / iOS Mobiles Packaging Pipeline",
    "Framer Motion Interactive Micro-animation Modules"
  ],
  "Dedicated Virtual CTO Engagement Setup": [
    "Cloud DevOps Deployments & Run Pipeline Tuning",
    "SOC-2 Cryptographic Auditing & Google reCAPTCHA",
    "Database Clusters & Sub-second Scaling Architecture",
    "Engineering Agile Sprint Handover training workshops"
  ],
  "Standard Technical Support SLA Activation": [
    "Transactional Helpdesk SLA Ticketing Systems Flow",
    "Continuous 365 Direct Developer Server Audits",
    "Multi-Zone Hot Backups Routing Configuration"
  ]
};

const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.94,
    rotateY: direction > 0 ? 10 : -10,
    filter: "blur(4px)"
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 28 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
      rotateY: { duration: 0.35 },
      filter: { duration: 0.25 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.94,
    rotateY: direction < 0 ? 10 : -10,
    filter: "blur(4px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 28 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
      rotateY: { duration: 0.25 },
      filter: { duration: 0.2 }
    }
  })
};

export default function Services() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const processContainerRef = useRef(null);
  
  // hook into vertical page scroll progression over the workspace container
  const { scrollYProgress } = useScroll({
    target: processContainerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Subscribe to scroll across all resolution viewports (including mobile)
    const handleScrollChange = (latest) => {
      const stepIndex = Math.min(
        Math.floor(latest * WORKFLOW_STEPS.length),
        WORKFLOW_STEPS.length - 1
      );
      if (stepIndex >= 0 && stepIndex !== activeStep) {
        setDirection(stepIndex > activeStep ? 1 : -1);
        setActiveStep(stepIndex);
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScrollChange);
    return () => unsubscribe();
  }, [scrollYProgress, activeStep]);

  const handleStepChange = (newIndex) => {
    if (newIndex === activeStep) return;
    setDirection(newIndex > activeStep ? 1 : -1);
    setActiveStep(newIndex);
  };

  const scrollToStep = (index) => {
    if (!processContainerRef.current) return;
    const containerTop = processContainerRef.current.offsetTop;
    const containerHeight = processContainerRef.current.clientHeight;
    const windowHeight = window.innerHeight;
    const scrollRange = containerHeight - windowHeight;
    const segmentSize = 1 / WORKFLOW_STEPS.length;
    // target Y is calculated at the mid point of the index segment
    const targetProgress = (index + 0.5) * segmentSize;
    const targetY = containerTop + targetProgress * scrollRange;
    
    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  const renderStepVisual = (idx) => {
    switch (idx) {
      case 0:
        return (
          <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem]">
            {/* Skeleton placeholder shown while loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-800 pointer-events-none">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-slate-700/60" />
            </div>

            <video
              src={strategyVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 1:
        return (
          <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem]">
            {/* Skeleton placeholder shown while loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-800 pointer-events-none">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-slate-700/60" />
            </div>

            <video
              src={discoveryVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 2:
        return (
          <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem]">
            {/* Skeleton placeholder shown while loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-800 pointer-events-none">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-slate-700/60" />
            </div>

            <video
              src={designVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 3:
        return (
          <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem]">
            {/* Skeleton placeholder shown while loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-800 pointer-events-none">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-slate-700/60" />
            </div>

            <video
              src={prototypeVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 4:
        return (
          <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem]">
            {/* Skeleton placeholder shown while loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-800 pointer-events-none">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-slate-700/60" />
            </div>

            <video
              src={developmentVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 5:
        return (
          <div className="relative w-full h-full bg-[#0b0f19] flex items-center justify-center overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem]">
            {/* Skeleton placeholder shown while loading */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-800 pointer-events-none">
              <Icons.Loader2 className="w-8 h-8 animate-spin text-slate-700/60" />
            </div>

            <video
              src={launchVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleGooeyItemClick = (index) => {
    setActiveStep(index);
    setIsGooeyOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-transparent pb-24"
    >
      {/* ── Page Header ── */}
      <div className="relative isolate pt-24 pb-12 border-b border-slate-200/65 dark:border-slate-800 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-black dark:text-white border border-slate-300 dark:border-slate-700 uppercase tracking-wider">
            <Layers size={12} />
            Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-sans text-center mx-auto" style={{ textAlign: "center" }}>
            Modular Consultation & Launch Packages
          </h1>
          <p 
            className="max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400 font-light text-center block w-full"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            We handle the entire integration spectrum: workflow discovery strategy, high-fidelity UI layout engineering, custom backend scripts, and 24/7 priority support.
          </p>
        </div>
      </div>

      {/* ── Capabilities Lists format as in the products page (At least 8 distinct services) ── */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Capabilities Catalogue</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">Our 8 Specialized Solutions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
            Compare target system architectures, key delivery workflows, and flat-rate costs side-by-side.
          </p>
        </div>

        {/* ── Desktop & Tablet High Fidelity Table View ── */}
        <div className="hidden lg:block w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/45 dark:bg-slate-900/40 backdrop-blur-md shadow-lg dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] mb-12">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/30 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-sm font-sans">
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-[#0F295E] dark:text-slate-300 uppercase">
                    Service Capability
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-[#0F295E] dark:text-slate-300 uppercase">
                    Definition & Scope
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-[#0F295E] dark:text-slate-300 uppercase">
                    Key Deliverables
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-[#0F295E] dark:text-slate-300 uppercase">
                    Engagement Cost
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-[#0F295E] dark:text-slate-300 uppercase text-right pr-12">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {SERVICES_DATA.map((service) => {
                  const IconComp = Icons[service.icon] ?? Icons.HelpCircle;
                  const category = service.id.includes("dev") 
                    ? "Development" 
                    : service.id.includes("erp") 
                    ? "Enterprise ERP" 
                    : "Consulting & Support";

                  return (
                    <tr 
                      key={service.id}
                      className="hover:bg-white/50 dark:hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-200 group/row border-b border-slate-100/60 dark:border-slate-800/45"
                    >
                      {/* Column 1: Icon, Title, and Category badge */}
                      <td className="px-6 py-3 align-middle">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-xl bg-[#0F295E]/5 dark:bg-white/5 border border-[#0F295E]/10 dark:border-white/15 text-[#0F295E] dark:text-indigo-400 flex items-center justify-center shadow-sm group-hover/row:scale-105 transition-transform duration-200 icon-shimmer">
                            <IconComp size={20} />
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="font-bold text-slate-900 dark:text-white font-sans text-sm">
                              {service.title}
                            </h3>
                            <div className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none mt-0.5">
                              {category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Definition and Scope */}
                      <td className="px-6 py-3 align-middle text-sm text-slate-800 dark:text-slate-200 font-normal max-w-[280px] leading-relaxed">
                        {service.description}
                      </td>

                      {/* Column 3: Key Deliverables Checklist */}
                      <td className="px-6 py-3 align-middle">
                        <div className="flex flex-col gap-1.5">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5 text-sm text-slate-800 dark:text-slate-200 font-normal">
                              <Icons.CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Column 4: Engagement Cost */}
                      <td className="px-6 py-3 align-middle">
                        <div className="flex flex-col">
                          <span className="text-sm font-extrabold text-[#0F295E] dark:text-indigo-400 font-sans tracking-tight leading-none">
                            {service.price}
                          </span>
                          <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-widest mt-1">
                            Flat Rate
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Action */}
                      <td className="px-6 py-3 align-middle text-right pr-6">
                        <button
                          onClick={() => navigate("/contact", { state: { selectedServiceIds: [service.id] } })}
                          className="inline-flex items-center justify-center bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 text-white text-[10px] font-bold tracking-wider uppercase py-1.5 px-3.5 rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:translate-y-[-1px] font-sans"
                        >
                          Inquire
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile & Tablet Styled View ── */}
        <div className="block lg:hidden space-y-3 mb-10">
          {SERVICES_DATA.map((service) => {
            const IconComp = Icons[service.icon] ?? Icons.HelpCircle;
            const category = service.id.includes("dev") 
              ? "Development" 
              : service.id.includes("erp") 
              ? "Enterprise ERP" 
              : "Consulting & Support";

            return (
              <div 
                key={service.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/35 backdrop-blur-md p-4 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-lg transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-900/45"
              >
                {/* Header block */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#0F295E]/5 dark:bg-white/5 border border-[#0F295E]/10 text-[#0F295E] dark:text-indigo-400 flex items-center justify-center icon-shimmer">
                    <IconComp size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {service.title}
                    </h3>
                    <div className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {category}
                    </div>
                  </div>
                </div>

                {/* Scope */}
                <p className="text-sm text-slate-800 dark:text-slate-200 font-normal leading-relaxed">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                  <span className="block text-[9px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-sans">
                    Key Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-sm text-slate-800 dark:text-slate-200 font-normal font-sans">
                        <Icons.CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Inquire */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Engagement Cost
                    </span>
                    <span className="text-sm font-extrabold text-[#0F295E] dark:text-indigo-400 font-sans leading-none">
                      {service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/contact", { state: { selectedServiceIds: [service.id] } })}
                    className="py-1.5 px-3.5 text-[11px] font-bold rounded-md bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 text-white text-center cursor-pointer shadow-sm font-sans uppercase tracking-medium inline-flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <Icons.ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Product Lifecycle STICKY SCROLL SECTION (RESPONSIVE) ── */}
      <div ref={processContainerRef} className="relative h-[480vh] w-full z-10 font-sans">
        
        {/* Sticky wrapper pinning item inside container */}
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-transparent">
          
          {/* Subtle background radial aura */}
          <div className="absolute inset-0 bg-transparent bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-25 pointer-events-none" />
          <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#662D91]/5 dark:bg-violet-950/5 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-[90vh] lg:h-[80vh] py-6 lg:py-0">
            
            {/* Header Area */}
            <div className="space-y-2 lg:space-y-3.5 shrink-0 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#662D91] bg-[#662D91]/10 border border-[#662D91]/25 uppercase tracking-widest">
                <Icons.Milestone size={13} className="animate-pulse" />
                Product Lifecycle blueprint
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                How We Craft Software.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto lg:mx-0">
                Explore our systematized operating blueprint, from initial alignment to global scaling. Built with absolute reliability, transparency, and precision.
              </p>
            </div>

            {/* Split layout: left column visuals, right column text content & slide controls */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-center justify-center lg:justify-between flex-grow py-4 lg:py-6 overflow-hidden">
              
              {/* Left visual representation card */}
              <div className="col-span-12 lg:col-span-5 w-full flex items-center justify-center relative select-none shrink-0 mt-8 sm:mt-10 lg:mt-0">
                <div className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-full aspect-[4/3] max-w-[420px] rounded-[1.5rem] lg:rounded-[2.5rem] bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.35)] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-gradient from-[#662D91]/20 to-transparent pointer-events-none opacity-80 animate-pulse" style={{ animationDuration: '4s' }} />
                  
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={activeStep}
                      custom={direction}
                      variants={sliderVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full h-full flex items-center justify-center"
                    >
                      {renderStepVisual(activeStep)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right text details */}
              <div className="col-span-12 lg:col-span-7 w-full flex items-center justify-center lg:items-start">
                <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12">
                  
                  {/* Slider details */}
                  <div className="flex-grow space-y-4 lg:space-y-6 text-center lg:text-left">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      <motion.div
                        key={activeStep}
                        custom={direction}
                        variants={sliderVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-4 lg:space-y-5"
                      >
                        <div className="space-y-1 lg:space-y-1.5">
                          <span className="text-[11px] lg:text-xs font-mono font-bold tracking-widest text-[#662D91] dark:text-violet-400 uppercase">
                            Phase {WORKFLOW_STEPS[activeStep].step}
                          </span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                            {WORKFLOW_STEPS[activeStep].title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-350 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                          {WORKFLOW_STEPS[activeStep].body}
                        </p>

                        <div className="pt-2 lg:pt-4">
                          <button
                            onClick={() => navigate("/contact", { state: { selectedServiceIds: [`lifecycle-${WORKFLOW_STEPS[activeStep].step}`] } })}
                            className="group relative inline-flex items-center justify-center py-2.5 px-6 lg:py-3.5 lg:px-8 text-[11px] font-bold font-sans tracking-widest rounded-full bg-black hover:bg-slate-900 text-white dark:bg-white dark:text-black dark:hover:bg-slate-100 transition-all duration-300 shadow-md cursor-pointer uppercase"
                          >
                            <span className="flex items-center gap-2">
                              Inquire Stage
                              <Icons.ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Horizontal Dots Tracker for Mobile/Tablet sizes */}
                    <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
                      {WORKFLOW_STEPS.map((_, idx) => {
                        const isActive = activeStep === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => scrollToStep(idx)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                              isActive ? "bg-[#662D91] w-6" : "bg-slate-300 dark:bg-slate-700 w-2"
                            }`}
                            aria-label={`Scroll to Phase ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Vertical Tracker Dots Track (Desktop design only) */}
                  <div className="relative hidden lg:flex flex-col items-center gap-6 py-6 border-l border-slate-150 dark:border-slate-800 pr-4 shrink-0 pl-8">
                    {WORKFLOW_STEPS.map((item, idx) => {
                      const isActive = activeStep === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => scrollToStep(idx)}
                          className="group relative flex items-center justify-center h-8 w-8 cursor-pointer focus:outline-none text-left"
                          title={`Click to scroll to Phase ${item.step}: ${item.title}`}
                        >
                          {/* Circle ring wrapper */}
                          <span className={`absolute h-7 w-7 rounded-full border transition-all duration-350 ${
                            isActive 
                              ? "border-[#662D91]/75 dark:border-violet-400/75 scale-100 shadow-[0_0_12px_rgba(102,45,145,0.25)]" 
                              : "border-transparent scale-50 group-hover:border-slate-300 dark:group-hover:border-slate-700 group-hover:scale-75"
                          }`} />
                          
                          {/* Inner Dot indicator */}
                          <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                            isActive 
                              ? "bg-[#662D91] dark:bg-violet-400 scale-125" 
                              : "bg-slate-350 dark:bg-slate-700 group-hover:bg-[#662D91]/55"
                          }`} />

                          {/* Hover Tooltip tag label */}
                          <span className="absolute right-10 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-slate-950 border border-slate-850 text-white text-[10px] uppercase font-bold font-mono tracking-wider py-1.5 px-3.5 rounded-full whitespace-nowrap pointer-events-none shadow-xl z-50">
                            {item.step} &bull; {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* ── CENTRAL CONSTRUCTOR GATEWAY PROMOTIONAL BANNER ── */}
      <div className="max-w-4xl mx-auto px-6 mt-28">
        <div className="p-8 sm:p-12 rounded-[2rem] bg-gradient-to-br from-indigo-50/15 via-slate-50/50 to-indigo-50/5 dark:from-indigo-950/20 dark:via-slate-900/40 dark:to-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase font-mono font-black tracking-widest text-indigo-600 dark:text-indigo-400">
              UNIFIED CONSTRUCTOR GATEWAY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              Experience the Zyvone Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Why requested separate item checklists? Our centralized scheduling system authorizes you to configure multiple dynamic products and professional integration services simultaneously inside a single high-fidelity interactive sandbox.
            </p>
          </div>

          <div className="pt-2">
            <button
               onClick={() => navigate("/contact")}
              className="px-8 py-4 rounded-full text-xs font-bold text-white bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 shadow-lg tracking-wider uppercase transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Build Request Constructor</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* SVG filter definition for Lucas Bebber's gooey menu */}
    </motion.div>
  );
}
