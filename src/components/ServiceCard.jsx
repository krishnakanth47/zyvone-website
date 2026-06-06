import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { Check, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  const { id, title, icon, price, description, features = [] } = service;
  const navigate = useNavigate();

  const [featuresExpanded, setFeaturesExpanded] = useState(false);

  /* ── Dynamically resolve the Lucide icon from its string name ── */
  const IconComponent = Icons[icon] ?? Icons.HelpCircle;

  const category = id.includes("dev") 
    ? "Development" 
    : id.includes("erp") 
    ? "Enterprise ERP" 
    : "Consulting & Support";

  return (
    <article
      className="
        group relative flex flex-col h-full
        rounded-2xl overflow-hidden
        bg-white/40 dark:bg-slate-900/40 backdrop-blur-md
        border border-slate-200 dark:border-slate-800
        shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]
        hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
        transition-all duration-300 hover:scale-[1.02]
        hover:border-slate-300 dark:hover:border-slate-700
        hover:bg-white/60 dark:hover:bg-slate-900/50
      "
    >
      {/* Minimal Placeholder Dummy Icon Block instead of Large Imagery */}
      <div className="relative h-32 w-full flex items-center justify-center bg-gradient-to-br from-indigo-50/50 to-slate-100/30 dark:from-slate-900/40 dark:to-slate-950/80 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="h-14 w-14 rounded-2xl bg-[#0F295E]/5 dark:bg-white/5 text-[#0F295E] dark:text-indigo-400 flex items-center justify-center border border-[#0F295E]/10 dark:border-white/10 shadow-sm icon-shimmer">
          <IconComponent size={28} />
        </div>
        {/* Category overlay badge */}
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-250 dark:border-slate-755">
          {category}
        </span>
      </div>

      {/* Service Details Area */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex flex-col flex-1">
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-1.5 min-h-[44px]">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light flex-1">
            {description}
          </p>
        </div>

        {/* Features list loop inside Card with expandable design */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={() => setFeaturesExpanded(!featuresExpanded)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-650 dark:text-indigo-400 hover:underline outline-none cursor-pointer whitespace-nowrap"
          >
            <span>{featuresExpanded ? 'Hide Deliverables' : 'Show Deliverables'}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${featuresExpanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {featuresExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 mt-2 border-t border-slate-100 dark:border-slate-800/60 pt-3"
                role="list"
              >
                {features.map((feat, idx) => (
                  <motion.li
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-305 font-light"
                  >
                    <Check size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Row showing individual prices separate */}
        <div className="flex items-baseline justify-between py-4 border-t border-slate-150 dark:border-slate-800/80 mt-auto">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-400">
              Engagement Cost
            </span>
            <span className="text-lg font-extrabold text-[#0F295E] dark:text-indigo-400 font-sans tracking-tight animate-fade-in">
              {price}
            </span>
          </div>

          <button
            onClick={() => navigate("/contact", { state: { selectedServiceIds: [id] } })}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-205 cursor-pointer"
          >
            <span>Inquire</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
