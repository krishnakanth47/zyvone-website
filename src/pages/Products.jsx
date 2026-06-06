import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { Search, ShoppingBag, SlidersHorizontal, X, User, Mail, Phone, Calendar, Shield, CheckCircle, Info, Star, Layers, Box, ArrowUpRight } from "lucide-react";
import { PRODUCTS_DATA } from "../data/mockData";

const CATEGORIES = ["All", "Vertical SaaS", "Accounting SaaS", "LMS", "Support SaaS", "CRM SaaS", "HR SaaS", "Full ERP"];

const ARCHITECTURES = [
  { id: "zyvone-education", label: "Zyvone Education (ERPNext Vertical SaaS)" },
  { id: "zyvone-books", label: "Zyvone Books (ERPNext Accounting SaaS)" },
  { id: "zyvone-learning", label: "Zyvone Learning (ERPNext LMS)" },
  { id: "zyvone-helpdesk", label: "Zyvone Helpdesk (ERPNext Support SaaS)" },
  { id: "zyvone-crm", label: "Zyvone CRM (ERPNext CRM SaaS)" },
  { id: "zyvone-hrms", label: "Zyvone HRMS (ERPNext HR SaaS)" },
  { id: "zyvone-erp", label: "Zyvone ERP (ERPNext Full ERP)" },
  { id: "zyvone-pos", label: "Zyvone POS (ERPNext Point of Sale SaaS)" },
];

const getPricing = (product, isINR) => {
  if (isINR) {
    switch (product.id) {
      case "zyvone-pos":
        return { base: "₹55,000 / year", offer: "₹45,000 / year" };
      case "zyvone-education":
        return { base: "₹45,000 / year", offer: "₹35,000 / year" };
      case "zyvone-books":
        return { base: "₹45,000 / year", offer: "₹35,000 / year" };
      case "zyvone-learning":
        return { base: "₹45,000 / year", offer: "₹35,000 / year" };
      case "zyvone-helpdesk":
        return { base: "₹45,000 / year", offer: "₹35,000 / year" };
      case "zyvone-crm":
        return { base: "₹55,000 / year", offer: "₹45,000 / year" };
      case "zyvone-hrms":
        return { base: "₹55,000 / year", offer: "₹45,000 / year" };
      case "zyvone-erp":
        return { base: "₹1,50,000 / year", offer: "₹120,000 / year" };
      default:
        return { base: "₹45,000 / year", offer: "₹35,000 / year" };
    }
  } else {
    return { base: `${product.basePrice || "$49/mo"}`, offer: `${product.offerPrice || "$39/mo"}` };
  }
};

export default function Products() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isINR, setIsINR] = useState(true);

  // Modal Interactive States
  const [activeProduct, setActiveProduct] = useState(null);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleOpenLearnMore = (product) => {
    setActiveProduct(product);
    setIsLearnMoreOpen(true);
  };

  const handleOpenDemoModal = (product) => {
    navigate("/contact", { state: { selectedProductIds: product ? [product.id] : [] } });
  };


  // ── Dynamic Filtering Calculus ─────────────────────────
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.targetSegment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.coreModule?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features?.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-transparent pb-24"
    >
      {/* ── Header Section ── */}
      <div className="relative isolate pt-24 pb-12 border-b border-slate-200/65 dark:border-slate-800 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-black dark:text-white border border-slate-300 dark:border-slate-700 uppercase tracking-wider animate-pulse">
            <ShoppingBag size={12} />
            Zyvone SaaS Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-sans text-center mx-auto" style={{ textAlign: "center" }}>
            Modular ERPNext-Based SaaS Systems
          </h1>
          <p 
            className="max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400 font-light text-center block w-full"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            Each system operates as an isolated vertical solution with predictable flat-rate monthly pricing. Highly secure, cloud-hosted, and designed for modular deployment.
          </p>
        </div>
      </div>

      {/* ── Toolbar Section (Search & Filter in Centre) ── */}
      <div className="max-w-xl mx-auto px-6 mt-12 relative z-[45]">
        <div className="relative z-20 flex flex-row gap-3 items-center justify-center border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-[#080B13] p-3 sm:p-4 rounded-2xl backdrop-blur-sm shadow-sm mb-6 w-full">
          
          {/* Search bar and Filter control group wrapper */}
          <div className="flex flex-row gap-3 items-center w-full">
            {/* Real-time Search Box Input with elegant compact styling */}
            <div className="relative flex-1 md:w-80 group">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modular systems, features, industries..."
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200 shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Clear Search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Filtering Dropdown Button with elegant dynamic indicator */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                title={selectedCategory === "All" ? "Filter Categories" : `Filter: ${selectedCategory}`}
                className={`
                  w-10 h-10 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm
                  ${isMobileFilterOpen || selectedCategory !== "All"
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white animate-pulse-subtle"
                    : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"}
                `}
              >
                <SlidersHorizontal size={16} className="text-current" />
              </button>

              {/* Dropdown Options List */}
              <AnimatePresence>
                {isMobileFilterOpen && (
                  <>
                    {/* Overlay to catch clicks and close the dropdown */}
                    <div 
                      className="fixed inset-0 z-40 bg-transparent" 
                      onClick={() => setIsMobileFilterOpen(false)} 
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 mt-2.5 w-60 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-2 text-left"
                    >
                      <div className="px-3 py-2 flex items-center justify-between text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-900 mb-1">
                        <span>Filter Categories</span>
                        {selectedCategory !== "All" && (
                          <button
                            onClick={() => {
                              setSelectedCategory("All");
                              setIsMobileFilterOpen(false);
                            }}
                            className="text-indigo-500 dark:text-indigo-400 font-bold hover:underline capitalize tracking-normal text-xs"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 max-h-72 overflow-y-auto scrollbar-none">
                        {CATEGORIES.map((category) => {
                          const isActive = selectedCategory === category;
                          return (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsMobileFilterOpen(false);
                              }}
                              className={`
                                w-full text-left px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-between
                                ${isActive 
                                  ? "bg-black dark:bg-white text-white dark:text-black font-bold" 
                                  : "hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350"}
                              `}
                            >
                              <span>{category}</span>
                              {isActive && <CheckCircle size={13} className="text-current" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products & Features Section (High Performance Widescreen Max Width 7xl) ── */}
      <div className="max-w-7xl mx-auto px-6 relative z-[40]">
        {/* ── Pricing Selector Trigger Ribbon (matches high quality design guidelines) ── */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredProducts.length}</span> SaaS platforms
          </p>
        </div>

        {/* ── Desktop & Tablet High Fidelity Table View ── */}
        <div className="relative z-10 hidden lg:block w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/35 backdrop-blur-md shadow-lg dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] mb-12">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/30 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-sm font-sans">
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
                    Saas Platform Code
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
                    Core ERPNext Module
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
                    Sub Target Segment
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
                    Base Subscription
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
                    Discounted Offer
                  </th>
                  <th className="px-6 py-4.5 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase text-right pr-12">
                    Actions Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredProducts.map((product) => {
                  const IconComp = Icons[product.iconName] ?? Icons.Box;
                  const pricing = getPricing(product, isINR);
                  const offerParts = pricing.offer.split('/');

                  return (
                    <tr 
                      key={product.id}
                      className="hover:bg-white/50 dark:hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-200 group/row border-b border-slate-100/60 dark:border-slate-800/45"
                    >
                      {/* Column 1: SaaS Platform Code Logo, Name, Category */}
                      <td className="px-6 py-3 align-middle">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-xl bg-[#0F295E]/5 dark:bg-white/5 border border-[#0F295E]/10 dark:border-white/15 text-[#0F295E] dark:text-indigo-400 flex items-center justify-center shadow-sm group-hover/row:scale-105 transition-transform duration-200 icon-shimmer">
                            <IconComp size={20} />
                          </div>
                          <div className="space-y-0.5">
                            <h3 
                              onClick={() => handleOpenLearnMore(product)}
                              className="font-bold text-slate-900 dark:text-white font-sans text-sm hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                            >
                              {product.title}
                            </h3>
                            <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Core ERPNext Module */}
                      <td className="px-6 py-3 align-middle text-sm font-semibold text-slate-900 dark:text-white">
                        {product.coreModule}
                      </td>

                      {/* Column 3: Sub Target Segment */}
                      <td className="px-6 py-3 align-middle text-sm font-semibold text-slate-900 dark:text-white max-w-[260px] leading-relaxed">
                        {product.targetSegment}
                      </td>

                      {/* Column 4: Base Subscription with line through */}
                      <td className="px-6 py-3 align-middle text-sm font-semibold text-slate-900 dark:text-white line-through decoration-slate-400 dark:decoration-slate-500">
                        {pricing.base}
                      </td>

                      {/* Column 5: Discounted Offer in exact matching style */}
                      <td className="px-6 py-3 align-middle text-sm font-semibold text-slate-900 dark:text-white font-sans whitespace-nowrap">
                        {pricing.offer}
                      </td>

                      {/* Column 6: Actions Action Button */}
                      <td className="px-6 py-3 align-middle text-right pr-6">
                        <button
                          onClick={() => handleOpenDemoModal(product)}
                          className="inline-flex items-center justify-center bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 text-white text-[10px] font-bold tracking-wider uppercase py-1.5 px-3.5 rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:translate-y-[-1px] font-sans"
                        >
                          Request Demo
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
        <div className="relative z-10 block lg:hidden space-y-3">
          {filteredProducts.map((product) => {
            const IconComp = Icons[product.iconName] ?? Icons.Box;
            const pricing = getPricing(product, isINR);
            const offerParts = pricing.offer.split('/');

            return (
              <div 
                key={product.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/35 backdrop-blur-md p-4 space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-705 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-900/45"
              >
                {/* Header info bar */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#0F295E]/5 dark:bg-white/5 border border-[#0F295E]/10 text-[#0F295E] dark:text-indigo-400 flex items-center justify-center icon-shimmer">
                    <IconComp size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 
                      onClick={() => handleOpenLearnMore(product)}
                      className="font-bold text-slate-900 dark:text-white text-sm cursor-pointer hover:underline"
                    >
                      {product.title}
                    </h3>
                    <div className="text-[9px] font-bold text-slate-400 dark:text-white/80 uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                </div>

                {/* Sub details */}
                <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-800 dark:text-slate-200">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-white/90 uppercase tracking-wider mb-1.5 font-sans">
                      Core ERPNext Module
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {product.coreModule}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-end text-right">
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-white/90 uppercase tracking-wider mb-1.5 font-sans">
                      Target Segment
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {product.targetSegment}
                    </span>
                  </div>
                </div>

                {/* Pricing values */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex flex-col justify-start">
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-white/90 uppercase tracking-wider mb-1.5 font-sans leading-none">
                      Base Subscription
                    </span>
                    <span className="text-xs line-through text-slate-400 dark:text-white/70 font-light font-mono leading-none py-0.5">
                      {pricing.base}
                    </span>
                  </div>

                  <div className="flex flex-col justify-start items-end text-right">
                    <span className="block text-[9px] font-bold text-slate-400 dark:text-white/95 uppercase tracking-wider mb-1.5 font-sans leading-none">
                      Discounted Offer
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white font-sans leading-none py-0.5">
                      {pricing.offer}
                    </span>
                  </div>
                </div>

                {/* Actions dual buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  <button
                    onClick={() => handleOpenLearnMore(product)}
                    className="w-full py-2 text-[11px] font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800 text-center cursor-pointer font-sans transition-all duration-200"
                  >
                    Learn More
                  </button>
                  <button
                    onClick={() => handleOpenDemoModal(product)}
                    className="w-full py-2 text-[11px] font-bold rounded-xl bg-black hover:bg-slate-905 dark:bg-white dark:hover:bg-slate-50 text-white dark:text-black text-center cursor-pointer shadow-sm font-sans transition-all duration-200"
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Empty Fallback Error Box ── */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 max-w-sm mx-auto bg-slate-50/50 dark:bg-slate-900/30"
          >
            <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 flex items-center justify-center mx-auto mb-4">
              <Search size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No items found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1 mb-6">
              {searchQuery 
                ? `We couldn't find any products matching "${searchQuery}" in our modular catalogue.`
                : `We couldn't locate any products in the "${selectedCategory}" category.`}
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-black hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 dark:text-black rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* ── Standard Platform Features Section ── */}
        <div className="mt-24 border-t border-slate-200 dark:border-slate-800/80 pt-16">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans text-center block w-full mx-auto" style={{ textAlign: "center" }}>
              Uniform Platform Core Assets
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-light max-w-xl mx-auto text-center block w-full" style={{ textAlign: "center", margin: "0 auto" }}>
              Every system deployed in the Zyvone Suite inherits elite-tier cloud features, ensuring security compliance, performance, and responsive interfaces natively.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Cloud Based Hosting", desc: "Always available, zero local hardware overhead, multi-zone hosting options.", icon: "Cloud" },
              { title: "Real-Time Analytics", desc: "Instant data pipelines, up-to-the-minute dashboards and charts built natively.", icon: "TrendingUp" },
              { title: "Secure Access SSL", desc: "Data encrypted in-transit and at-rest. Active threat monitoring and SSL standards.", icon: "Shield" },
              { title: "Mobile Friendly UI", desc: "Adaptive CSS fluid breakpoints and layout grids supporting field-workers or mobile offices.", icon: "Smartphone" },
              { title: "Scalable Architecture", desc: "Scale resources instantly. Sub-second read/writes managed securely.", icon: "Database" },
              { title: "Role-Based Permissions", desc: "Granular access matrices. Define department nodes and user roles perfectly.", icon: "Key" }
            ].map((node, nIdx) => {
              const IconComponent = Icons[node.icon] ?? Icons.CheckSquare;
              return (
                <div key={nIdx} className="p-5 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-805 shadow-sm flex flex-col gap-3">
                  <div className="h-9 w-9 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center text-slate-800 dark:text-white icon-shimmer">
                    <IconComponent size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{node.title}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-400 font-light leading-relaxed">{node.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MODAL 1: LEARN MORE COMPACT POPUP ── */}
      <AnimatePresence>
        {isLearnMoreOpen && activeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLearnMoreOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm shadow-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10 text-indigo-950 dark:text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLearnMoreOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer z-20"
              >
                <X size={16} />
              </button>

              {/* Banner Details Header */}
              <div className="relative aspect-[21/9] w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                    {(() => {
                      const ProductIcon = Icons[activeProduct.iconName] ?? Icons.Box;
                      return <ProductIcon size={24} />;
                    })()}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-200 px-2.5 py-0.5 rounded bg-black/60 border border-white/10">
                      {activeProduct.category}
                    </span>
                    <h2 className="text-xl font-extrabold text-white dark:text-white drop-shadow-md mt-1">
                      {activeProduct.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Central Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-white/80 mb-2">
                    Scope of Application
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {activeProduct.description} Fully integrated as a complete core <span className="font-semibold text-black dark:text-white">{activeProduct.coreModule}</span> SaaS node supporting <span className="font-semibold">{activeProduct.targetSegment}</span> operations.
                  </p>
                </div>

                {/* Comparative pricing cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <span className="text-[10px] text-slate-400 dark:text-white/80 uppercase font-semibold tracking-wider">Base Cost</span>
                    <p className="text-base text-slate-400 dark:text-white/70 line-through font-light mt-0.5">{getPricing(activeProduct, isINR).base}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-[10px] text-indigo-500 dark:text-indigo-400 uppercase font-bold tracking-wider">Discounted Proposal cost</span>
                    <p className="text-lg font-black text-[#0F295E] dark:text-indigo-400 mt-0.5">{getPricing(activeProduct, isINR).offer}</p>
                  </div>
                </div>

                {/* Capabilities feature check list */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-white/80">
                    Key Features Pack ({activeProduct.features?.length || 0})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(activeProduct.features || []).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60">
                        <CheckCircle size={15} className="text-[#0f295e] dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-700 dark:text-slate-300 leading-normal font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common suite checklist features */}
                <div className="border-t border-slate-200 dark:border-slate-800/85 pt-5 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-white/85 flex items-center gap-1.5 font-sans">
                    <Layers size={13} className="text-indigo-450" />
                    Standard Cloud-Platform Capabilities
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-light pl-1 leading-relaxed">
                    {[
                      "Cloud Based hosting",
                      "Real-Time Analytics charts",
                      "Secure Access (Role, SSL)",
                      "Mobile Friendly design",
                      "Scalable Architecture",
                      "Role-Based Permissions controls"
                    ].map((common, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span>{common}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer sticky bottom drawer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-light text-center sm:text-left">
                  Schedule a private evaluation sandbox using your organization data.
                </span>
                <button
                  onClick={() => {
                    setIsLearnMoreOpen(false);
                    handleOpenDemoModal(activeProduct);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-black hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 shadow-md transition-all cursor-pointer w-full sm:w-auto text-center"
                >
                  Book Demo Now &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
