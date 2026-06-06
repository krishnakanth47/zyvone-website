import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { Star, ArrowUpRight, Check, CheckCircle, X, Calendar, User, Mail, Phone, Info, Shield, Layers } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    id,
    title,
    category,
    description,
    rating,
    image,
    iconName,
    targetSegment,
    coreModule,
    basePrice,
    offerPrice,
    features,
  } = product;

  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Form states for Request Demo
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    demoDate: '',
    demoTime: '10:00',
    message: '',
    agreed: false,
    captchaChecked: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamically resolve the icon
  const IconComponent = Icons[iconName] ?? Icons.Box;

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required';
    } else if (formData.name.trim().length > 25) {
      errors.name = 'Full Name cannot exceed 25 characters';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email format';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.demoDate) errors.demoDate = 'Preferred demo date is required';
    if (!formData.captchaChecked) errors.captcha = 'Please check the anti-spam verification';
    return errors;
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      demoDate: '',
      demoTime: '10:00',
      message: '',
      agreed: false,
      captchaChecked: false,
    });
    setFormErrors({});
    setBookingSuccess(false);
  };

  return (
    <>
      <article
        className="
          group relative flex flex-col h-full
          rounded-2xl overflow-hidden
          bg-white dark:bg-slate-900/50
          border border-slate-200 dark:border-slate-800
          shadow-sm hover:shadow-xl dark:shadow-none
          transition-all duration-300 hover:scale-[1.02]
          hover:border-slate-300 dark:hover:border-slate-700
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

        {/* Product Details Area */}
        <div className="flex flex-col flex-1 p-6 gap-4">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              {title}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-light">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-medium">
                {coreModule}
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>For {targetSegment}</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            {description}
          </p>

          {/* Features Drawer inside Card (Minimum 4 features shown, expandable/collapsible) */}
          <div className="space-y-2 flex-1 pt-1">
            <button
              type="button"
              onClick={() => setFeaturesExpanded(!featuresExpanded)}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline outline-none cursor-pointer"
            >
              <span>{featuresExpanded ? 'Hide Core Features' : 'Show Core Features'}</span>
              <Icons.ChevronDown size={14} className={`transition-transform duration-200 ${featuresExpanded ? 'rotate-180' : ''}`} />
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
                  {features.slice(0, 4).map((feat, idx) => (
                    <motion.li
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 font-light"
                    >
                      <Check size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                  {features.length > 4 && (
                    <li className="text-[11px] text-slate-400 dark:text-slate-500 italic pl-4 font-light">
                      + {features.length - 4} more in depth features
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing Row showing base and discounted offer prices */}
          <div className="flex items-baseline justify-between py-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500">
                Predictable SaaS Pricing
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-slate-400 dark:text-slate-600 font-light">
                  {basePrice}
                </span>
                <span className="text-2xl font-black text-black dark:text-white font-sans tracking-tight">
                  {offerPrice}
                </span>
              </div>
            </div>

            {/* Rating Indicator */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800/50">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{rating}</span>
            </div>
          </div>

          {/* Dual CTAs: Request Demo & Learn More */}
          <div className="grid grid-cols-2 gap-2 mt-1.5">
            <button
              onClick={() => setIsLearnMoreOpen(true)}
              type="button"
              className="
                py-1.5 px-2.5 rounded-md text-[11px] font-bold tracking-wide cursor-pointer
                bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800
                text-slate-900 dark:text-slate-200 border border-slate-300/30 dark:border-slate-700/55
                transition-all duration-200 flex items-center justify-center gap-1 hover:-translate-y-0.5
              "
            >
              Learn More
              <Info size={12} />
            </button>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              type="button"
              className="
                py-1.5 px-2.5 rounded-md text-[11px] font-bold tracking-wide cursor-pointer
                bg-black hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100
                text-white dark:text-black shadow-md shadow-black/10 dark:shadow-white/5
                transition-all duration-200 flex items-center justify-center gap-1 hover:-translate-y-0.5
              "
            >
              Request Demo
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </article>

      {/* ── 1. LEARN MORE PRODUCT MODAL ── */}
      <AnimatePresence>
        {isLearnMoreOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLearnMoreOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setIsLearnMoreOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-105 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer z-10"
              >
                <X size={16} />
              </button>

              {/* Modal Banner */}
              <div className="relative aspect-[21/9] w-full bg-slate-100 dark:bg-slate-900">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-200 px-2 py-0.5 rounded bg-black/60 border border-white/10">
                      {category}
                    </span>
                    <h2 className="text-2xl font-black text-white dark:text-white drop-shadow-md mt-1">
                      {title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Scroll Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Scope of Application
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {description} Designed exclusively for <span className="font-semibold text-black dark:text-white">{targetSegment}</span>, implementing the core <span className="font-semibold text-black dark:text-white">{coreModule}</span> module under ERPNext architecture.
                  </p>
                                {/* Grid for parameters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Base Price Tag</span>
                    <p className="text-lg text-slate-400 dark:text-slate-500 line-through font-light mt-0.5">{basePrice}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-bold tracking-wider">Discounted Proposal price</span>
                    <p className="text-xl font-extrabold text-black dark:text-white mt-0.5">{offerPrice}</p>
                  </div>
                </div>

                {/* Comprehensive features */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                    Full Modular Features ({features.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800/40">
                        <CheckCircle size={15} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-700 dark:text-slate-355 leading-snug font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Platform-level Features block */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Layers size={13} className="text-indigo-400" />
                    Standard Cloud-Platform Capabilities
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-light pl-1">
                    {[
                      'Cloud Based hosting',
                      'Real-Time Analytics charts',
                      'Secure Access (Role, SSL)',
                      'Mobile Friendly design',
                      'Scalable Architecture',
                      'Role-Based Permissions controls'
                    ].map((common, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span>{common}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky bottom CTA */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-light">
                  Need a custom sandbox demo with your team data?
                </span>
                <button
                  onClick={() => {
                    setIsLearnMoreOpen(false);
                    setIsDemoModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 shadow-md transition-all cursor-pointer"
                >
                  Book Demo Now &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 2. REQUEST DEMO INTERACTIVE MODAL ── */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer z-10"
              >
                <X size={16} />
              </button>

              {/* Title Section */}
              <div className="space-y-1 mb-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40">
                  Interactive booking portal
                </span>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                  Schedule a Live Demo
                </h3>
                <p className="text-xs text-slate-400 font-light">
                  Pre-selected system: <span className="font-semibold text-black dark:text-white">{title}</span>
                </p>
              </div>

              {!bookingSuccess ? (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-755 dark:text-slate-300">
                      Full Name * <span className="text-[10px] text-slate-400 font-normal">(Mandatory, max 25 characters)</span>
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        maxLength={25}
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.length <= 25) {
                            setFormData({ ...formData, name: val });
                          }
                        }}
                        placeholder="e.g. Ganapathyram"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-[10px] font-semibold text-rose-500 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone fields in grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-755 dark:text-slate-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@company.com"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-[10px] font-semibold text-rose-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-755 dark:text-slate-300">
                        Phone Number * <span className="text-[10px] text-slate-400 font-normal">(Mandatory)</span>
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[10px] font-semibold text-rose-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-755 dark:text-slate-300">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.demoDate}
                        onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                      />
                      {formErrors.demoDate && (
                        <p className="text-[10px] font-semibold text-rose-500 mt-1">{formErrors.demoDate}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-755 dark:text-slate-300">
                        Time Slot
                      </label>
                      <select
                        value={formData.demoTime}
                        onChange={(e) => setFormData({ ...formData, demoTime: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all"
                      >
                        <option value="10:00">10:00 AM (IST)</option>
                        <option value="12:00">12:00 PM (IST)</option>
                        <option value="14:00">02:00 PM (IST)</option>
                        <option value="16:00">04:00 PM (IST)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message box */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-755 dark:text-slate-300">
                      Additional Requirements / Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. specific features you would like to test..."
                      className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                    />
                  </div>

                  {/* Anti-spam Verification Checkbox */}
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.captchaChecked}
                        onChange={(e) => setFormData({ ...formData, captchaChecked: e.target.checked })}
                        id={`captcha-${id}`}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <label htmlFor={`captcha-${id}`} className="text-[11px] text-slate-655 dark:text-slate-300 select-none cursor-pointer flex items-center gap-1">
                        <Shield size={12} className="text-emerald-500" />
                        <span>anti-spam compliance validation (Google reCAPTCHA v3)</span>
                      </label>
                    </div>
                    {formErrors.captcha && (
                      <p className="text-[10px] font-semibold text-rose-500">{formErrors.captcha}</p>
                    )}
                  </div>

                  {/* Button Submission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full py-3 rounded-xl text-xs font-bold text-white bg-black
                      hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-50
                      cursor-pointer shadow-lg tracking-wider uppercase
                      transition-all flex items-center justify-center gap-1.5 disabled:opacity-50
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Establishing Sandbox...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Demo Request</span>
                        <ArrowUpRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Demo Confirmed!
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                      Thank you <span className="font-semibold text-black dark:text-white">{formData.name}</span>. Your slot is registered for <span className="font-semibold">{formData.demoDate}</span> at <span className="font-semibold">{formData.demoTime} PM (IST)</span>. An invitation email has been routed to <span className="font-semibold">{formData.email}</span>.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        resetForm();
                        setIsDemoModalOpen(false);
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
