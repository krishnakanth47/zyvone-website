import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, MessageSquare, Plus, Trash2, Globe, FileText, Check, 
  Send, RefreshCw, Sparkles, Copy, FilePlus, ArrowRight, CheckCircle, HelpCircle
} from 'lucide-react';

const PRODUCTS_LIST = [
  {
    id: "zyvone_erp",
    name: "Zyvone ERP",
    category: "ERP",
    billing: "yearly",
    price_inr: 120000,
    price_inr_gst: 141600,
    usd_price: 1263,
    usd_price_gst: 1490,
    description: "Multi-Store Warehouse Control, Raw Material Production Pipelines, Vendor Procurement, Consolidated Financial Sheets."
  },
  {
    id: "zyvone_crm",
    name: "Zyvone CRM",
    category: "CRM",
    billing: "yearly",
    price_inr: 45000,
    price_inr_gst: 53100,
    usd_price: 474,
    usd_price_gst: 559,
    description: "Deal Flow Pipeline, Automated Lead Assignment Engine, Activity Logs, and Revenue Win Estimation."
  },
  {
    id: "zyvone_hrms",
    name: "Zyvone HRMS",
    category: "HRMS",
    billing: "yearly",
    price_inr: 45000,
    price_inr_gst: 53100,
    usd_price: 474,
    usd_price_gst: 559,
    description: "Employee lifecycle automation, biometric attendance sync, automatic payroll salary slips."
  },
  {
    id: "zyvone_pos",
    name: "Zyvone POS",
    category: "POS",
    billing: "yearly",
    price_inr: 45000,
    price_inr_gst: 53100,
    usd_price: 474,
    usd_price_gst: 559,
    description: "Offline-First Billing Sync, Point of Sale, multi-register cash control, real-time inventory stock depletion."
  },
  {
    id: "zyvone_books",
    name: "Zyvone Books",
    category: "Accounting",
    billing: "yearly",
    price_inr: 35000,
    price_inr_gst: 41300,
    usd_price: 368,
    usd_price_gst: 435,
    description: "Double-Entry Accounting Ledger, client invoicing, Profit & Loss reports, automated expense tracking."
  },
  {
    id: "zyvone_education",
    name: "Zyvone Education",
    category: "Education",
    billing: "yearly",
    price_inr: 35000,
    price_inr_gst: 41300,
    usd_price: 368,
    usd_price_gst: 435,
    description: "Student Records Management, fee collection, schedules, courses, portals for parents & teachers."
  },
  {
    id: "zyvone_learning",
    name: "Zyvone Learning",
    category: "LMS",
    billing: "yearly",
    price_inr: 35000,
    price_inr_gst: 41300,
    usd_price: 368,
    usd_price_gst: 435,
    description: "Rich learning portal, video lectures, progress track, certification engines, structured quiz builder."
  },
  {
    id: "zyvone_helpdesk",
    name: "Zyvone Helpdesk",
    category: "Support",
    billing: "yearly",
    price_inr: 35000,
    price_inr_gst: 41300,
    usd_price: 368,
    usd_price_gst: 435,
    description: "Ticket route pipelines, SLA warnings, automated replies, customer feedback grids."
  }
];

const SERVICES_LIST = [
  {
    id: "website_development",
    name: "Website Development",
    pricing_type: "hourly",
    price_inr: 800,
    price_inr_gst: 944,
    usd_price: 8.42,
    usd_price_gst: 9.94,
    unit: "hour",
    description: "Fast corporate frontends using modern frameworks (React / Vite / Next.js) with premium layouts."
  },
  {
    id: "uiux_design",
    name: "UI/UX Design",
    pricing_type: "hourly",
    price_inr: 800,
    price_inr_gst: 944,
    usd_price: 8.42,
    usd_price_gst: 9.94,
    unit: "hour",
    description: "Stellar customer journey designs, wireframes, and prototypes in Figma with pixel-perfect rendering."
  },
  {
    id: "mobile_app_development",
    name: "Mobile App Development",
    pricing_type: "hourly",
    price_inr: 1500,
    price_inr_gst: 1770,
    usd_price: 15.79,
    usd_price_gst: 18.63,
    unit: "hour",
    description: "High-performance native Android and iOS mobile applications using Flutter or React Native."
  },
  {
    id: "custom_software_development",
    name: "Custom Software Development",
    pricing_type: "hourly",
    price_inr: 1500,
    price_inr_gst: 1770,
    usd_price: 15.79,
    usd_price_gst: 18.63,
    unit: "hour",
    description: "Tailored microservices, REST / GraphQL APIs, multi-tenant databases, and proprietary algorithms."
  },
  {
    id: "erp_consultation",
    name: "ERP Consultation",
    pricing_type: "hourly",
    price_inr: 1500,
    price_inr_gst: 1770,
    usd_price: 15.79,
    usd_price_gst: 18.63,
    unit: "hour",
    description: "Workflow auditing, bottleneck analysis, process mapping, and custom roadmap architectures."
  },
  {
    id: "api_integration",
    name: "API Integration",
    pricing_type: "hourly",
    price_inr: 1500,
    price_inr_gst: 1770,
    usd_price: 15.79,
    usd_price_gst: 18.63,
    unit: "hour",
    description: "Unifying third-party APIs, legacy databases, payment portals, delivery logistics, or messaging platforms."
  },
  {
    id: "erpnext_implementation",
    name: "ERPNext Implementation",
    pricing_type: "fixed",
    price_inr: 49000,
    price_inr_gst: 57820,
    usd_price: 516,
    usd_price_gst: 609,
    unit: "project",
    description: "Setup, deployment, configuration, customization and self-hosting of ready-to-run ERPNext instances."
  },
  {
    id: "cloud_deployment",
    name: "Cloud Deployment",
    pricing_type: "monthly",
    price_inr: 2500,
    price_inr_gst: 2950,
    usd_price: 26.32,
    usd_price_gst: 31.05,
    unit: "month",
    description: "Deploying and managing production cloud nodes on GCP, AWS or Cloud Run with 24/7 monitors."
  }
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('advisor'); // 'advisor' (Chat) or 'calculator' (Quoter)
  
  // Calculator States
  const [customerLocation, setCustomerLocation] = useState('IN'); // 'IN' or 'EXPORT'
  const [exportRegion, setExportRegion] = useState('USA'); // 'Dubai', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Europe'
  const [selectedItems, setSelectedItems] = useState([
    { type: 'product', id: 'zyvone_erp', quantity: 1, duration: 1 },
    { type: 'service', id: 'website_development', quantity: 40 } // hours
  ]);
  const [copiedId, setCopiedId] = useState(false);

  // AI Assistant States
  const [messages, setMessages] = useState([
    {
      role: 'model',
      parts: [{ text: "Hello! I am Zyvone AI Pricing Assistant. I can help you answer any questions regarding our pricing, generate accurate custom quotations, calculate GST or international USD conversion, and compare Zyvone's digital products and implementation services. How may I assist you today?" }]
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Conversion rate
  const USD_RATE = 95;
  const GST_RATE = 0.18;

  // Calculation helpers
  const handleAddItem = (type, id) => {
    const exists = selectedItems.find(item => item.type === type && item.id === id);
    if (exists) return;

    if (type === 'product') {
      setSelectedItems([...selectedItems, { type, id, quantity: 1, duration: 1 }]);
    } else {
      const item = SERVICES_LIST.find(s => s.id === id);
      const defaultQty = item.pricing_type === 'hourly' ? 40 : item.pricing_type === 'monthly' ? 12 : 1;
      setSelectedItems([...selectedItems, { type, id, quantity: defaultQty }]);
    }
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleUpdateQty = (index, value) => {
    const updated = [...selectedItems];
    updated[index].quantity = Math.max(1, parseInt(value) || 0);
    setSelectedItems(updated);
  };

  // Compute Invoice Math
  const isExport = customerLocation === 'EXPORT';
  const getGSTMultiplier = () => (isExport ? 0 : GST_RATE);

  const calculatedLines = selectedItems.map(item => {
    let baseItem;
    let title = "";
    let rateInr = 0;
    let rateUsd = 0;
    let totalPriceInr = 0;
    let totalPriceUsd = 0;
    let unitLabel = "";

    if (item.type === 'product') {
      baseItem = PRODUCTS_LIST.find(p => p.id === item.id);
      title = baseItem.name;
      rateInr = baseItem.price_inr;
      rateUsd = baseItem.usd_price;
      totalPriceInr = rateInr * item.quantity;
      totalPriceUsd = rateUsd * item.quantity;
      unitLabel = `${item.quantity} year${item.quantity > 1 ? 's' : ''}`;
    } else {
      baseItem = SERVICES_LIST.find(s => s.id === item.id);
      title = baseItem.name;
      rateInr = baseItem.price_inr;
      rateUsd = baseItem.usd_price;
      totalPriceInr = rateInr * item.quantity;
      totalPriceUsd = rateUsd * item.quantity;
      unitLabel = `${item.quantity} ${baseItem.unit || 'unit'}${item.quantity > 1 ? 's' : ''}`;
    }

    return {
      title,
      type: item.type,
      unitLabel,
      rateInr,
      rateUsd,
      totalInr: totalPriceInr,
      totalUsd: totalPriceUsd
    };
  });

  const subtotalInr = calculatedLines.reduce((acc, line) => acc + line.totalInr, 0);
  const gstInr = isExport ? 0 : subtotalInr * GST_RATE;
  const grandTotalInr = subtotalInr + gstInr;

  // USD Conversion Math based on INR Total (using rules provided or exact item USD conversion)
  // Let's match the system formula: usd_total = inr_total / usd_conversion_rate
  const grandTotalUsd = grandTotalInr / USD_RATE;
  const subtotalUsd = subtotalInr / USD_RATE;
  const gstUsd = gstInr / USD_RATE;

  // Handle Send Chat
  const handleChatSend = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || loading) return;

    const userMsg = userInput;
    setUserInput('');
    
    const nextMessages = [
      ...messages,
      { role: 'user', parts: [{ text: userMsg }] }
    ];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/pricing-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([
        ...nextMessages,
        { role: 'model', parts: [{ text: data.text }] }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...nextMessages,
        { role: 'model', parts: [{ text: "I apologize, but I encountered a network error communicating with Zyvone Technologies pricing core. Please check your context configurations or retry." }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyQuoteToClipboard = () => {
    let quoteText = `==================================================\n`;
    quoteText += `ZYVONE TECHNOLOGIES ESTIMATE & QUOTATION\n`;
    quoteText += `Location: ${isExport ? `International (Export - ${exportRegion})` : 'Domestic (India)'}\n`;
    quoteText += `Date: ${new Date().toLocaleDateString()}\n`;
    quoteText += `==================================================\n\n`;
    quoteText += `Selected Products & Services:\n`;
    calculatedLines.forEach((line, idx) => {
      quoteText += `${idx + 1}. ${line.title} (${line.unitLabel})\n`;
      if (isExport) {
        quoteText += `   Price: $${line.totalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD (₹${line.totalInr.toLocaleString('en-IN')} INR)\n`;
      } else {
        quoteText += `   Price: ₹${line.totalInr.toLocaleString('en-IN')} INR\n`;
      }
    });

    quoteText += `\n--------------------------------------------------\n`;
    if (isExport) {
      quoteText += `Subtotal: $${subtotalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD / ₹${subtotalInr.toLocaleString('en-IN')} INR\n`;
      quoteText += `GST Amount (0% Export): $0.00 USD / ₹0 INR\n`;
      quoteText += `Grand Total: $${grandTotalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD / ₹${grandTotalInr.toLocaleString('en-IN')} INR\n`;
      quoteText += `\nExport transactions qualify for 0% GST subject to applicable tax regulations.\n`;
    } else {
      quoteText += `Subtotal: ₹${subtotalInr.toLocaleString('en-IN')} INR\n`;
      quoteText += `GST Amount (18%): ₹${gstInr.toLocaleString('en-IN')} INR\n`;
      quoteText += `Grand Total: ₹${grandTotalInr.toLocaleString('en-IN')} INR\n`;
      quoteText += `USD Equivalent: $${(grandTotalInr / USD_RATE).toLocaleString('en-US', { maximumFractionDigits: 2 })} USD (at rate of ₹95/$1)\n`;
    }
    quoteText += `==================================================\n`;

    navigator.clipboard.writeText(quoteText);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const loadSuggestion = (question) => {
    setUserInput(question);
  };

  // Convert rich text headers/tables into JSX rendering for AI chat bubble
  const renderMessageContent = (text) => {
    // Basic Markdown table converter
    if (!text.includes('|')) {
      return <p className="whitespace-pre-line leading-relaxed text-sm text-slate-800 dark:text-slate-100">{text}</p>;
    }

    const lines = text.split('\n');
    return (
      <div className="space-y-3">
        {lines.map((line, idx) => {
          if (line.trim().startsWith('|')) {
            // Check if it's separator row
            if (line.includes('---')) return null;
            const cells = line.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
            const isHeader = idx === 0 || (lines[idx - 1] && lines[idx - 1].includes('ZYVONE QUOTATION')) || !lines[idx-1]?.includes('|');
            
            return (
              <div key={idx} className={`grid grid-cols-${cells.length} gap-2 p-2 border-b border-slate-200 dark:border-slate-800 text-xs ${isHeader ? 'bg-slate-100 dark:bg-slate-800 font-bold' : ''}`}>
                {cells.map((cell, cIdx) => (
                  <span key={cIdx} className="truncate">{cell}</span>
                ))}
              </div>
            );
          }
          return line.trim() ? <p key={idx} className="whitespace-pre-line text-sm text-slate-800 dark:text-slate-100">{line}</p> : <div key={idx} className="h-2" />;
        })}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#040112] text-slate-100 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative">
        {/* Page Titles */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/15 border border-violet-500/30 rounded-full text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} className="animate-twinkle-purple" /> Zyvone Sales advisor
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent"
          >
            Pricing & Contract Assister
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-base text-slate-400"
          >
            Instantly calculate official ERP SaaS packages, configure standard hourly designs or integrations, and generate quotations instantly guided by AI.
          </motion.p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/60 p-1.5 border border-slate-800 rounded-2xl flex gap-1 shadow-lg shadow-black/40 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('advisor')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-350 cursor-pointer ${
                activeTab === 'advisor'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare size={16} />
              AI Sales Assistant
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-350 cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator size={16} />
              Interactive Quotation Engine
            </button>
          </div>
        </div>

        {/* Outer Grid Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Display Pane based on selected Tab */}
          <div className="lg:col-span-8 min-h-[620px]">
            <AnimatePresence mode="wait">
              {activeTab === 'advisor' ? (
                // AI SALES CHAT
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col h-[650px] backdrop-blur-xl relative"
                >
                  {/* Assistant Header info */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/35 flex items-center justify-center text-indigo-400">
                        <Sparkles size={20} className="animate-twinkle-indigo" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white flex items-center gap-1.5">
                          Zyvone Advisor Engine
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </h3>
                        <p className="text-xs text-slate-400">Intelligent system sales & consultation bot</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMessages([{
                        role: 'model',
                        parts: [{ text: "Chat history cleared. I'm ready to answer pricing, comparison, and quotation questions. Ask me anything!" }]
                      }])}
                      title="Reset chat"
                      className="p-2 text-slate-500 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                    >
                      <RefreshCw size={15} />
                    </button>
                  </div>

                  {/* Messages Stream */}
                  <div className="flex-grow overflow-y-auto px-1 space-y-4 mb-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {messages.map((msg, index) => {
                      const isUser = msg.role === 'user';
                      return (
                        <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`
                            max-w-[85%] rounded-2xl p-4 border shadow-sm
                            ${isUser 
                              ? 'bg-indigo-600/90 border-indigo-500 text-white rounded-tr-none' 
                              : 'bg-slate-950/80 border-slate-800 text-slate-100 rounded-tl-none'
                            }
                          `}>
                            {renderMessageContent(msg.parts[0]?.text || '')}
                          </div>
                        </div>
                      );
                    })}

                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-slate-400 text-xs flex items-center gap-2">
                          <span className="inline-block w-4 h-4 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
                          Zyvone AI in consultation process...
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick suggestions shortcut */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2 font-medium">Frequently Asked Scenarios:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Quote estimation for Zyvone ERP + Books",
                        "Design 20 hours + Website 40 hours with GST",
                        "I am in Dubai. Explain ERP Next pricing",
                        "Compare Zyvone CRM and HRMS"
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => loadSuggestion(item)}
                          className="text-xs px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleChatSend} className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ask for custom quotes, comparative products, or system rules..."
                      className="flex-grow bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none placeholder-slate-500"
                    />
                    <button
                      type="submit"
                      disabled={loading || !userInput.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-40 text-white rounded-2xl px-5 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </motion.div>
              ) : (
                // INTERACTIVE CALCULATOR
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* Selectors configuration */}
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                    <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-2">
                      <Calculator size={18} className="text-indigo-400" />
                      Configure Estimate Items
                    </h3>

                    {/* Tabs of categories to add */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Products column builder */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">Add Software Products (Yearly)</h4>
                        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                          {PRODUCTS_LIST.map(p => {
                            const isAdded = selectedItems.some(item => item.type === 'product' && item.id === p.id);
                            return (
                              <div key={p.id} className="flex items-center justify-between bg-slate-950/50 p-3 border border-slate-850 rounded-xl hover:border-slate-800 transition-all">
                                <div className="pr-3">
                                  <p className="text-sm font-semibold text-slate-200">{p.name}</p>
                                  <p className="text-[10px] text-slate-500 line-clamp-1">{p.description}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className="text-xs font-mono text-slate-400">
                                    ₹{(p.price_inr/1000).toFixed(0)}k/yr
                                  </span>
                                  <button
                                    onClick={() => handleAddItem('product', p.id)}
                                    disabled={isAdded}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                      isAdded 
                                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                                        : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-600 text-white'
                                    }`}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Services column builder */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">Add Custom Services & Labor</h4>
                        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                          {SERVICES_LIST.map(s => {
                            const isAdded = selectedItems.some(item => item.type === 'service' && item.id === s.id);
                            return (
                              <div key={s.id} className="flex items-center justify-between bg-slate-950/50 p-3 border border-slate-850 rounded-xl hover:border-slate-800 transition-all">
                                <div className="pr-3">
                                  <p className="text-sm font-semibold text-slate-200">{s.name}</p>
                                  <p className="text-[10px] text-slate-500 line-clamp-1">{s.description}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className="text-xs font-mono text-slate-400">
                                    {s.pricing_type === 'hourly' ? `₹${s.price_inr}/h` : s.pricing_type === 'monthly' ? `₹${s.price_inr}/mo` : `₹49k/fix`}
                                  </span>
                                  <button
                                    onClick={() => handleAddItem('service', s.id)}
                                    disabled={isAdded}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                      isAdded 
                                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                                        : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-600 text-white'
                                    }`}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Configured Item List with adjusters */}
                  <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                    <h3 className="font-semibold text-lg text-white mb-4">Calculation Table Settings</h3>

                    {selectedItems.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-slate-850 rounded-2xl">
                        <FilePlus size={36} className="mx-auto text-slate-600 mb-2" />
                        <p className="text-sm text-slate-500">No products or services mapped in quotation workspace.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedItems.map((item, index) => {
                          let baseItem;
                          let unitsLabel = "";
                          if (item.type === 'product') {
                            baseItem = PRODUCTS_LIST.find(p => p.id === item.id);
                            unitsLabel = "License Years";
                          } else {
                            baseItem = SERVICES_LIST.find(s => s.id === item.id);
                            unitsLabel = baseItem.unit === 'hour' ? 'Service Hours' : baseItem.unit === 'month' ? 'Active Months' : 'Projects';
                          }

                          return (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-950/60 border border-slate-850 rounded-2xl">
                              <div className="flex-grow">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mb-1 inline-block ${
                                  item.type === 'product' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-cyan-500/10 text-cyan-400'
                                }`}>
                                  {item.type}
                                </span>
                                <p className="text-sm font-semibold text-white">{baseItem?.name}</p>
                                <p className="text-xs font-mono text-slate-500">
                                  Base Rate: {isExport ? `$${baseItem.usd_price}` : `₹${baseItem.price_inr.toLocaleString('en-IN')}`} per {baseItem.unit || 'year'}
                                </p>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="flex flex-col items-start gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{unitsLabel}</label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleUpdateQty(index, e.target.value)}
                                    className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-sm text-white font-mono"
                                  />
                                </div>
                                <button
                                  onClick={() => handleRemoveItem(index)}
                                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all h-max mt-4 cursor-pointer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column Layout: Persistent Quote & Comparison Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Client Settings Card */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Globe size={18} className="text-indigo-400" />
                Customer Jurisdictions
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-2 block">Customer Region Profile</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/85 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setCustomerLocation('IN')}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        customerLocation === 'IN' 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      India (Domestic)
                    </button>
                    <button
                      onClick={() => setCustomerLocation('EXPORT')}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        customerLocation === 'EXPORT' 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Export (Global)
                    </button>
                  </div>
                </div>

                {isExport && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-semibold text-slate-400 block">Deliverable Export Destination</label>
                    <select
                      value={exportRegion}
                      onChange={(e) => setExportRegion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {['Dubai', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Europe'].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>

                    <div className="text-[11px] p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl mt-3">
                      💡 <strong>Export Exemption Enabled:</strong> Export transactions qualify for <strong>0% GST</strong> terms under specific digital trade treaties.
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* 2. Official Estimate Visualizer */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-indigo-400" />
                  <span className="font-semibold text-white">Quotation summary</span>
                </div>
                <button
                  onClick={copyQuoteToClipboard}
                  className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white rounded-lg flex items-center gap-1.5 text-xs transition-all cursor-pointer"
                >
                  <Copy size={12} />
                  {copiedId ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Estimate Details */}
              <div className="space-y-4 text-xs font-mono">
                
                {calculatedLines.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">Select items to instantly calculate.</p>
                ) : (
                  <div className="divide-y divide-slate-850">
                    {calculatedLines.map((line, idx) => (
                      <div key={idx} className="py-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-slate-300 font-semibold">{line.title}</p>
                          <p className="text-[10px] text-slate-500">{line.unitLabel}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {isExport 
                              ? `$${line.totalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}` 
                              : `₹${line.totalInr.toLocaleString('en-IN')}`}
                          </p>
                          {isExport && (
                            <p className="text-[9px] text-slate-500">₹{line.totalInr.toLocaleString('en-IN')}</p>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Summary Totals */}
                    <div className="pt-3 space-y-2 font-semibold">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Subtotal</span>
                        <span>
                          {isExport 
                            ? `$${subtotalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} / ₹${subtotalInr.toLocaleString('en-IN')}` 
                            : `₹${subtotalInr.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>GST ({isExport ? '0% Export' : '18%'})</span>
                        <span className={isExport ? 'text-emerald-400' : ''}>
                          {isExport ? '$0.00' : `₹${gstInr.toLocaleString('en-IN')}`}
                        </span>
                      </div>

                      <div className="flex flex-col pt-2 border-t border-slate-800 text-right gap-1">
                        <span className="text-[10px] text-slate-500 uppercase font-bold text-left">Grand Estimated Total</span>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-300">Total:</span>
                          <span className="text-indigo-400 text-base font-extrabold">
                            {isExport 
                              ? `$${grandTotalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD` 
                              : `₹${grandTotalInr.toLocaleString('en-IN')} INR`}
                          </span>
                        </div>
                        {isExport ? (
                          <span className="text-[10px] text-slate-500">Exchange conversion rate base: ₹95/$1 USD</span>
                        ) : (
                          <div className="flex justify-between items-center text-[11px] text-slate-400">
                            <span>USD Convert:</span>
                            <span>${(grandTotalInr / USD_RATE).toLocaleString('en-US', { maximumFractionDigits: 2 })} USD</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {isExport && (
                  <p className="border-t border-slate-800/80 pt-3 text-[10px] text-slate-400 leading-normal italic">
                    * Export transactions may qualify for 0% GST subject to applicable tax regulations.
                  </p>
                )}
              </div>
            </div>

            {/* 3. Product Comparer Reference Box */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
              <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-1.5">
                <HelpCircle size={16} className="text-indigo-400" />
                Frequently Asked Rules
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold mt-0.5">•</span>
                  <span><strong>GST rates</strong> are set at a standard, transparent rate of 18%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold mt-0.5">•</span>
                  <span><strong>ERP packages</strong> are billed yearly. Direct self-hosted options are customizable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold mt-0.5">•</span>
                  <span><strong>Consolidated bundles</strong> with multiple modules receive optimized calculation totals.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
