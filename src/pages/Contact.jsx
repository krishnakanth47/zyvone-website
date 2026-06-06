import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { TESTIMONIALS_DATA } from "../data/mockData";
import { useTheme } from "../components/ThemeContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// List of products matching those in PRODUCTS_DATA
const PRODUCTS_LIST = [
  { id: "zyvone-pos", label: "Zyvone POS", desc: "Point of Sale SaaS" },
  { id: "zyvone-education", label: "Zyvone Education", desc: "Vertical School/College SaaS" },
  { id: "zyvone-books", label: "Zyvone Books", desc: "Accounting & General Ledgers" },
  { id: "zyvone-learning", label: "Zyvone Learning", desc: "Learning Management System (LMS)" },
  { id: "zyvone-helpdesk", label: "Zyvone Helpdesk", desc: "Support SLA Ticketing" },
  { id: "zyvone-crm", label: "Zyvone CRM", desc: "SaaS Sales Deal Pipelines" },
  { id: "zyvone-hrms", label: "Zyvone HRMS", desc: "Payroll & HR Lifecycle" },
  { id: "zyvone-erp", label: "Zyvone ERP", desc: "Full Operational ERP Suite" },
];

// List of services matching those in SERVICES_DATA
const SERVICES_LIST = [
  { id: "website-dev", label: "Website Development", desc: "Vite/Next.js UI Frontends" },
  { id: "mobile-dev", label: "Mobile App Development", desc: "iOS & Android Natives" },
  { id: "custom-dev", label: "Custom Software Development", desc: "Express & Node API Servers" },
  { id: "erpnext-implementation", label: "ERPNext Implementation", desc: "Custom DocTypes & Workflows" },
  { id: "erp-consultation", label: "ERP Consultation", desc: "Operational Alignment Maps" },
  { id: "uiux-design", label: "UI/UX Design", desc: "Figma Component tokens" },
  { id: "api-integration", label: "API Integration", desc: "Secure Webhook Gateways" },
  { id: "cloud-deployment", label: "Cloud Deployment", desc: "Dockerized Run Engines" },
];

export default function Contact() {
  const location = useLocation();
  const { isDark } = useTheme();

  // Form interactive states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    demoDate: "",
    demoTime: "10:00",
    message: "",
    captchaChecked: false,
    selectedProductIds: [],
    selectedServiceIds: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(1);
  const [testimonialRotation, setTestimonialRotation] = useState(360);

  // Dropdown open states
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // Sync state from location redirect (Product or Service click)
  useEffect(() => {
    // Read route state parameter
    const stateProducts = location.state?.selectedProductIds || [];
    const stateServices = location.state?.selectedServiceIds || [];

    // Check search URL parameters (fallback)
    const searchParams = new URLSearchParams(location.search);
    const pId = searchParams.get("product");
    const sId = searchParams.get("service");

    setFormData((prev) => {
      const mergedProducts = [...prev.selectedProductIds];
      const mergedServices = [...prev.selectedServiceIds];

      // Add state products
      stateProducts.forEach((id) => {
        if (!mergedProducts.includes(id)) mergedProducts.push(id);
      });

      // Add query param product
      if (pId && !mergedProducts.includes(pId)) {
        mergedProducts.push(pId);
      }

      // Add state services
      stateServices.forEach((id) => {
        if (!mergedServices.includes(id)) mergedServices.push(id);
      });

      // Add query param service
      if (sId && !mergedServices.includes(sId)) {
        mergedServices.push(sId);
      }

      return {
        ...prev,
        selectedProductIds: mergedProducts,
        selectedServiceIds: mergedServices,
      };
    });
  }, [location.state, location.search]);

  // Toggle helpers
  const handleToggleProduct = (id) => {
    setFormData((prev) => {
      const isSelected = prev.selectedProductIds.includes(id);
      const updated = isSelected
        ? prev.selectedProductIds.filter((item) => item !== id)
        : [...prev.selectedProductIds, id];
      return { ...prev, selectedProductIds: updated };
    });
  };

  const handleToggleService = (id) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServiceIds.includes(id);
      const updated = isSelected
        ? prev.selectedServiceIds.filter((item) => item !== id)
        : [...prev.selectedServiceIds, id];
      return { ...prev, selectedServiceIds: updated };
    });
  };

  const handleAnalyzePricing = () => {
    if (formData.selectedProductIds.length === 0 && formData.selectedServiceIds.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        selection: "Please select at least one Product module or Service architecture from the dropdowns above to analyze pricing details.",
      }));
      return;
    }
    setFormErrors((prev) => {
      const copy = { ...prev };
      delete copy.selection;
      return copy;
    });

    const event = new CustomEvent("zyvone-pricing-analyze", {
      detail: {
        productIds: formData.selectedProductIds,
        serviceIds: formData.selectedServiceIds,
      },
    });
    window.dispatchEvent(event);
  };

  // Live validators
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Full Name is required";
    } else if (formData.name.trim().length > 25) {
      errors.name = "Full Name must be at most 25 characters";
    }
    if (!formData.email.trim()) {
      errors.email = "Corporate Email Endpoint is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please specify a valid corporate email structure";
    }
    if (!formData.company.trim()) {
      errors.company = "Company / Organization Name is required";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone Number coordinates are required";
    } else if (!/^\+?[0-9\s\-()]{7,22}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone sequence";
    }
    if (formData.selectedProductIds.length === 0 && formData.selectedServiceIds.length === 0) {
      errors.selection = "Choose at least one Target Product or Service capability for comparison";
    }
    if (!formData.demoDate) {
      errors.demoDate = "Preferred slot date is required";
    }
    return errors;
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    const selectedProductsLabels = formData.selectedProductIds.map(id => {
      const found = PRODUCTS_LIST.find(p => p.id === id);
      return found ? found.label : id;
    });

    const selectedServicesLabels = formData.selectedServiceIds.map(id => {
      const found = SERVICES_LIST.find(s => s.id === id);
      return found ? found.label : id;
    });

    try {
      const response = await fetch('/send-evaluation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          products: selectedProductsLabels,
          services: selectedServicesLabels,
          date: formData.demoDate,
          time: formData.demoTime,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        const randHex = Math.floor(Math.random() * 900000 + 100000);
        setRefNumber(`ZTV-${randHex}-DEMO`);
      } else {
        setSubmitError(result.message || "Failed to send email");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("Network connectivity error during sandbox assembly. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      demoDate: "",
      demoTime: "10:00",
      message: "",
      captchaChecked: false,
      selectedProductIds: [],
      selectedServiceIds: [],
    });
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);
    setRefNumber("");
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
            <Icons.CalendarRange size={12} className="text-indigo-600 dark:text-indigo-400" />
            Central Demonstration Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-sans text-center mx-auto" style={{ textAlign: "center" }}>
            Modular Platform Evaluation
          </h1>
          <p 
            className="max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400 font-light text-center block w-full"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            Centralized intake engine for booking highly customized system audits, deployment checkups, and product sandbox demonstrations spanning both our SaaS tools and integration services.
          </p>
        </div>
      </div>

      {/* ── Split Channels & Dynamic Curved Form Box ── */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* ── Right Column (Bottom on Mobile): Corporate Info Channels ── */}
          <div className="lg:col-span-4 space-y-8 flex flex-col justify-between py-2 order-2 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                Our Channels
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Connect with our system architects. Fill out the blueprint selector to schedule an end-to-end walk-through tailored directly to your team’s timeline and stack requirements.
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-900 flex-1 my-8 lg:my-0">
              <a 
                href="mailto:info@zyvone.in"
                className="group flex items-center gap-4 py-4 transition-all duration-200"
              >
                <Icons.Mail size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-sans group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">info@zyvone.in</p>
                </div>
              </a>

              <a 
                href="tel:+919360339199"
                className="group flex items-center gap-4 py-4 transition-all duration-200"
              >
                <Icons.Phone size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-sans group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">+91 93603 39199</p>
                </div>
              </a>

              <div className="flex items-start gap-4 py-4">
                <Icons.MapPin size={20} className="text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 mt-0.5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white font-sans">Udumalaipettai, Tamil Nadu</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-light">Tamil Nadu, India</p>
                </div>
              </div>

              {/* Dynamic Interactive Google Map Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md bg-white dark:bg-slate-950 p-1 lg:p-1.5 h-60 relative group/map hover:shadow-lg transition-all duration-300">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52701.59081930127!2d77.21502297853046!3d10.580826200304235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9cc53593a4a43%3A0x2a25be82b1f743e9!2sUdumalaipettai%2C%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1779963636106!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zyvone Technologies Udumalaipettai office location map"
                  className="w-full h-full rounded-xl transition duration-500 saturate-[0.85] contrast-[0.95] dark:invert-[0.9] dark:hue-rotate-180 dark:opacity-85 dark:contrast-[1.1] ease-out hover:saturate-100 dark:hover:opacity-100"
                />
              </div>
            </div>

            </div>

          {/* ── Left Column (Top on Mobile): Central Extra-Curved Request Box ── */}
          <div className="lg:col-span-8 order-1 lg:order-1">
            <div className="p-6 sm:p-10 rounded-[2rem] bg-white dark:bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800 relative">
              
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="demo-contact-form"
                    onSubmit={handleDemoSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="space-y-1.5 text-center sm:text-left border-b border-slate-100 dark:border-slate-900 pb-4">
                      <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-[#0F295E] dark:text-indigo-400 px-3 py-1 rounded-full bg-[#0F295E]/5 dark:bg-indigo-950/40">
                        LIVE DEMO BOOKING CONTAINER
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-sans mt-2">
                        Customize Your Demonstration
                      </h2>
                      <p className="text-xs text-slate-400 dark:text-slate-400 font-light">
                        Select one or multiple Products and Services below to assemble a tailored evaluation package.
                      </p>
                    </div>

                    {/* Personal / Corporate Info block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.User size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Identified Name *</span>
                        </label>
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
                          placeholder="e.g. Anand Mahindra"
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-sans"
                        />
                        {formErrors.name && (
                          <p className="text-[10px] font-semibold text-rose-500">{formErrors.name}</p>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.Mail size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Corporate Email Endpoint *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@company.com"
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-sans"
                        />
                        {formErrors.email && (
                          <p className="text-[10px] font-semibold text-rose-500">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Company input */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.Building2 size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Enterprise Entity Name</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Mahindra Group"
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-sans"
                        />
                        {formErrors.company && (
                          <p className="text-[10px] font-semibold text-rose-500">{formErrors.company}</p>
                        )}
                      </div>

                      {/* Phone sequence input */}
                      <div className="space-y-1.5 zyvone-phone-field">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.PhoneCall size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Phone Coordinates *</span>
                        </label>
                        <PhoneInput
                          international
                          defaultCountry="IN"
                          value={formData.phone}
                          onChange={(val) => setFormData((prev) => ({ ...prev, phone: val || "" }))}
                          placeholder="Phone number"
                          className="zyvone-phone-input"
                        />
                        {formErrors.phone && (
                          <p className="text-[10px] font-semibold text-rose-500">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* ──── TWO MULTI-SELECT INTERACTIVE FIELDS FOR PRODUCTS AND SERVICES ──── */}
                    <div className="space-y-4 pt-2">
                      
                      {/* Products Multi-select with Popover */}
                      <div className="space-y-1.5 relative z-30">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.Boxes size={13} className="text-indigo-500" />
                          <span>TARGET PRODUCT ARCHITECTURE (CHOOSE MULTIPLE)</span>
                        </label>

                        {/* Trigger Input Panel */}
                        <div
                          onClick={() => {
                            setIsProductDropdownOpen(!isProductDropdownOpen);
                            setIsServiceDropdownOpen(false);
                          }}
                          className="w-full min-h-[46px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none cursor-pointer flex flex-wrap gap-1.5 items-center transition-all focus-within:border-indigo-400 relative"
                        >
                          {formData.selectedProductIds.length === 0 ? (
                            <span className="text-xs text-slate-400 font-light">Select one or more products...</span>
                          ) : (
                            formData.selectedProductIds.map((id) => {
                              const item = PRODUCTS_LIST.find((p) => p.id === id);
                              return (
                                <span
                                  key={id}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-600 text-white dark:bg-indigo-550 shadow-sm"
                                >
                                  <span>{item ? item.label : id}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleProduct(id);
                                    }}
                                    className="hover:bg-white/20 active:bg-white/30 rounded-full p-0.5 transition-colors cursor-pointer"
                                  >
                                    <Icons.X size={10} strokeWidth={2.5} />
                                  </button>
                                </span>
                              );
                            })
                          )}

                          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Icons.ChevronDown
                              size={14}
                              className={`transform transition-transform duration-250 ${
                                isProductDropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        </div>

                        {/* Dropdown Options List */}
                        <AnimatePresence>
                          {isProductDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setIsProductDropdownOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-[calc(100%+4px)] left-0 right-0 max-h-60 overflow-y-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-2xl z-30 space-y-1 scrollbar-thin"
                              >
                                <p className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 px-2.5 py-1 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900 mb-1 font-mono">
                                  AVAILABLE SAAS MODULES
                                </p>
                                {PRODUCTS_LIST.map((item) => {
                                  const isSelected = formData.selectedProductIds.includes(item.id);
                                  return (
                                    <button
                                      type="button"
                                      key={item.id}
                                      onClick={() => handleToggleProduct(item.id)}
                                      className={`
                                        flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer
                                        ${
                                          isSelected
                                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold"
                                            : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-300"
                                        }
                                      `}
                                    >
                                      <div
                                        className={`
                                          h-4 w-4 rounded-md border flex items-center justify-center transition-all shrink-0
                                          ${
                                            isSelected
                                              ? "bg-indigo-600 border-indigo-700 text-white"
                                              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                          }
                                        `}
                                      >
                                        {isSelected && <Icons.Check size={11} strokeWidth={3} />}
                                      </div>
                                      <div className="truncate">
                                        <p className="font-semibold leading-normal">{item.label}</p>
                                        <p className="text-[9px] text-slate-400 dark:text-slate-400 font-light">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Services Multi-select with Popover */}
                      <div className="space-y-1.5 relative z-20">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.CodeXml size={13} className="text-amber-500" />
                          <span>TARGET SERVICE ARCHITECTURE (CHOOSE MULTIPLE)</span>
                        </label>

                        {/* Trigger Input Panel */}
                        <div
                          onClick={() => {
                            setIsServiceDropdownOpen(!isServiceDropdownOpen);
                            setIsProductDropdownOpen(false);
                          }}
                          className="w-full min-h-[46px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none cursor-pointer flex flex-wrap gap-1.5 items-center transition-all focus-within:border-amber-400 relative"
                        >
                          {formData.selectedServiceIds.length === 0 ? (
                            <span className="text-xs text-slate-400 font-light">Select one or more services...</span>
                          ) : (
                            formData.selectedServiceIds.map((id) => {
                              const item = SERVICES_LIST.find((s) => s.id === id);
                              return (
                                <span
                                  key={id}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-600 text-white dark:bg-amber-550 shadow-sm"
                                >
                                  <span>{item ? item.label : id}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleService(id);
                                    }}
                                    className="hover:bg-white/20 active:bg-white/30 rounded-full p-0.5 transition-colors cursor-pointer"
                                  >
                                    <Icons.X size={10} strokeWidth={2.5} />
                                  </button>
                                </span>
                              );
                            })
                          )}

                          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Icons.ChevronDown
                              size={14}
                              className={`transform transition-transform duration-250 ${
                                isServiceDropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        </div>

                        {/* Dropdown Options List */}
                        <AnimatePresence>
                          {isServiceDropdownOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsServiceDropdownOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-[calc(100%+4px)] left-0 right-0 max-h-60 overflow-y-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-2xl z-20 space-y-1 scrollbar-thin"
                              >
                                <p className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 px-2.5 py-1 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900 mb-1 font-mono">
                                  AVAILABLE CONSULTATION ROADS
                                </p>
                                {SERVICES_LIST.map((item) => {
                                  const isSelected = formData.selectedServiceIds.includes(item.id);
                                  return (
                                    <button
                                      type="button"
                                      key={item.id}
                                      onClick={() => handleToggleService(item.id)}
                                      className={`
                                        flex items-center gap-3 w-full px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer
                                        ${
                                          isSelected
                                            ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-semibold"
                                            : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-300"
                                        }
                                      `}
                                    >
                                      <div
                                        className={`
                                          h-4 w-4 rounded-md border flex items-center justify-center transition-all shrink-0
                                          ${
                                            isSelected
                                              ? "bg-amber-650 border-amber-700 text-white"
                                              : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                          }
                                        `}
                                      >
                                        {isSelected && <Icons.Check size={11} strokeWidth={3} />}
                                      </div>
                                      <div className="truncate">
                                        <p className="font-semibold leading-normal">{item.label}</p>
                                        <p className="text-[9px] text-slate-400 dark:text-slate-400 font-light">
                                          {item.desc}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Analyze Button */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-900">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Instant AI Cost & Blueprint Analysis
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-light leading-relaxed">
                            Evaluate direct pricing rates, standard GST configurations, and foreign currency values instantly.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAnalyzePricing}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0F295E] hover:bg-[#1a3d82] dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer shadow transition-all duration-200 shrink-0 font-mono"
                        >
                          <Icons.Sparkles size={14} className="text-yellow-400 animate-twinkle-yellow" />
                          <span>ANALYZE PRICES</span>
                        </button>
                      </div>

                    </div>

                    {/* Combined selection generic validation message error */}
                    {formErrors.selection && (
                      <p className="text-[10px] font-bold text-rose-500 font-mono mt-0.5">{formErrors.selection}</p>
                    )}

                    {/* Preference Schedules Dates & Time slots */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.CalendarCheck size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Preferred Date</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.demoDate}
                          onChange={(e) => setFormData({ ...formData, demoDate: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all font-sans cursor-text"
                        />
                        {formErrors.demoDate && (
                          <p className="text-[10px] font-semibold text-rose-500">{formErrors.demoDate}</p>
                        )}
                      </div>

                      {/* Preferred Time slots */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider font-mono">
                          <Icons.Clock4 size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Preferred Time Slot (IST)</span>
                        </label>
                        <select
                          value={formData.demoTime}
                          onChange={(e) => setFormData({ ...formData, demoTime: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-800 bg-[#F5F5F7] dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 transition-all cursor-pointer font-sans"
                        >
                          <option value="10:00">10:00 AM (Morning Audit)</option>
                          <option value="11:30">11:30 AM (Midmorning Slate)</option>
                          <option value="14:00">02:00 PM (Early Afternoon Session)</option>
                          <option value="15:30">03:30 PM (Midafternoon Slot)</option>
                          <option value="17:00">05:00 PM (Evening Summary Wrap)</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Error Message display */}
                    {submitError && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-xl flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
                        <Icons.AlertTriangle size={15} className="shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Submitting Request Failed</p>
                          <p className="font-light mt-0.5 text-[11px] leading-relaxed">{submitError}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit control action */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-xs font-bold text-white bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 cursor-pointer shadow-lg tracking-widest uppercase transition-all flex items-center justify-center gap-2 font-mono"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white dark:text-black" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Assembling Sandbox Data...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Evaluation Request</span>
                          <Icons.ArrowRight size={12} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="demo-success-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <Icons.CheckCheck size={32} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
                        Evaluation Request Logged!
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-md mx-auto text-center">
                        Thank you <span className="font-semibold text-black dark:text-white">{formData.name}</span>. Your personalized platform demonstration is scheduled for <span className="font-bold text-black dark:text-white">{formData.demoDate}</span> at <span className="font-bold text-black dark:text-white">{formData.demoTime}</span> (IST coordinates). An interactive briefing voucher has been routed to <span className="font-semibold text-indigo-600 dark:text-indigo-400">{formData.email}</span>.
                      </p>
                    </div>

                    {/* Display selected products */}
                    {formData.selectedProductIds.length > 0 && (
                      <div className="space-y-2 max-w-md mx-auto text-center border-t border-slate-100 dark:border-slate-900 pt-4 w-full">
                        <span className="text-[9px] font-extrabold text-slate-455 dark:text-slate-500 uppercase tracking-widest font-mono block">
                          Preselected SaaS Products
                        </span>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {formData.selectedProductIds.map((id) => {
                            const item = PRODUCTS_LIST.find((p) => p.id === id);
                            return (
                              <span
                                key={id}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 shadow-sm"
                              >
                                {item ? item.label : id}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Display selected services */}
                    {formData.selectedServiceIds.length > 0 && (
                      <div className="space-y-2 max-w-md mx-auto text-center border-t border-slate-100 dark:border-slate-900 pt-4 w-full">
                        <span className="text-[9px] font-extrabold text-slate-455 dark:text-slate-500 uppercase tracking-widest font-mono block">
                          Preselected Service Solutions
                        </span>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {formData.selectedServiceIds.map((id) => {
                            const item = SERVICES_LIST.find((s) => s.id === id);
                            return (
                              <span
                                key={id}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-450 border border-amber-150 dark:border-amber-900/50 shadow-sm"
                              >
                                {item ? item.label : id}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* SLA Track Code */}
                    <div className="inline-block p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-center w-full sm:w-auto mx-auto">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">
                        Demonstration Tracking SLA ID
                      </span>
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                        {refNumber}
                      </p>
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        onClick={handleResetForm}
                        className="px-6 py-2.5 rounded-full text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer font-sans"
                      >
                        Book another evaluation
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* ── Client Stories (Testimonials) ── */}
      <div id="testimonials-section" className="max-w-7xl mx-auto px-6 mt-48 border-t border-slate-200 dark:border-slate-800 pt-28 pb-12 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16 max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight text-center w-full">
            What Clients Say
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-center block w-full">
            Pure professional verification of the Zyvone operational experience.
          </p>
        </div>

        {/* ── HIGH FIDELITY BENTO GRID IN BLACK AND WHITE ONLY (3-COLUMN LAYOUT) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS_DATA.map((t, idx) => {
            const layoutConfigs = [
              {
                span: "md:col-span-2",
                themeClass: "bg-black text-white dark:bg-zinc-950 dark:text-white border border-zinc-800/60 dark:border-zinc-800/80 shadow-2xl",
                quoteMarkColor: "text-white/10 dark:text-white/5",
                avatarBorderColor: "border-zinc-700",
                companyColor: "text-neutral-400",
                quoteColor: "text-white"
              },
              {
                span: "md:col-span-1 md:row-span-2",
                themeClass: "bg-white text-slate-900 dark:bg-zinc-900 dark:text-slate-100 border border-slate-200/80 dark:border-zinc-800/60 shadow-xl",
                quoteMarkColor: "text-slate-200/40 dark:text-white/5",
                avatarBorderColor: "border-slate-200 dark:border-zinc-700",
                companyColor: "text-slate-500 dark:text-slate-400",
                quoteColor: "text-slate-900 dark:text-white"
              },
              {
                span: "md:col-span-2",
                themeClass: "bg-white text-slate-900 dark:bg-zinc-900 dark:text-slate-100 border border-slate-200/80 dark:border-zinc-800/60 shadow-xl",
                quoteMarkColor: "text-slate-200/40 dark:text-white/5",
                avatarBorderColor: "border-slate-200 dark:border-zinc-700",
                companyColor: "text-slate-500 dark:text-slate-400",
                quoteColor: "text-slate-900 dark:text-white"
              }
            ];

            const cfg = layoutConfigs[idx % layoutConfigs.length];

            return (
              <div 
                key={t.id || idx}
                id={`testimonial-card-${t.id || idx}`}
                className={`
                  ${cfg.span} ${cfg.themeClass}
                  p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl
                `}
              >
                {/* Massive quote symbol background */}
                <div className={`absolute -top-6 right-6 ${cfg.quoteMarkColor} select-none text-[160px] font-serif leading-none pointer-events-none`}>
                  ”
                </div>

                <div className="space-y-6 z-10 flex-1 flex flex-col justify-between">
                  {/* Testimonial Quote */}
                  <p className={`text-base sm:text-lg font-medium tracking-tight leading-snug ${cfg.quoteColor} mb-6`}>
                    "{t.quote}"
                  </p>

                  {/* User Identity Header */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      id={`avatar-${t.id || idx}`}
                      src={t.avatar}
                      alt={t.name}
                      className={`w-12 h-12 rounded-full border-2 ${cfg.avatarBorderColor} object-cover shadow-md`}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-bold text-base tracking-tight font-sans">{t.name}</h3>
                      <p className={`text-xs ${cfg.companyColor} font-sans tracking-wide`}>
                        {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
