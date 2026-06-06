import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Sparkles, RefreshCw, Calculator, Globe, 
  Copy, Check, FileText, ChevronDown, Plus, Minus, Info
} from 'lucide-react';

const PRODUCTS_LIST = [
  { id: "zyvone_erp", name: "Zyvone ERP", price_inr: 120000, usd_price: 1263 },
  { id: "zyvone_crm", name: "Zyvone CRM", price_inr: 45000, usd_price: 474 },
  { id: "zyvone_hrms", name: "Zyvone HRMS", price_inr: 45000, usd_price: 474 },
  { id: "zyvone_pos", name: "Zyvone POS", price_inr: 45000, usd_price: 474 },
  { id: "zyvone_books", name: "Zyvone Books", price_inr: 35000, usd_price: 368 },
  { id: "zyvone_education", name: "Zyvone Education", price_inr: 35000, usd_price: 368 },
  { id: "zyvone_learning", name: "Zyvone Learning", price_inr: 35000, usd_price: 368 },
  { id: "zyvone_helpdesk", name: "Zyvone Helpdesk", price_inr: 35000, usd_price: 368 }
];

const SERVICES_LIST = [
  { id: "website_development", name: "Website Dev (Hourly)", price_inr: 800, usd_price: 8.42, unit: "hr" },
  { id: "uiux_design", name: "UI/UX Design (Hourly)", price_inr: 800, usd_price: 8.42, unit: "hr" },
  { id: "mobile_app_development", name: "Mobile App Dev (Hourly)", price_inr: 1500, usd_price: 15.79, unit: "hr" },
  { id: "custom_software_development", name: "Custom Software (Hourly)", price_inr: 1500, usd_price: 15.79, unit: "hr" },
  { id: "erpnext_implementation", name: "ERPNext Setup (Fixed)", price_inr: 49000, usd_price: 516, unit: "proj" },
  { id: "cloud_deployment", name: "Cloud Nodes (Monthly)", price_inr: 2500, usd_price: 26.32, unit: "mo" }
];

// Parse text into a sequence of standard text strings and contiguous table markdown strings
const preProcessTextToTable = (text) => {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim());
  let newLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if the current line and subsequent 6 lines match the 7 expected table headers sequence
    if (i + 6 < lines.length &&
        /item|service/i.test(lines[i]) &&
        /qty|hours/i.test(lines[i+1]) &&
        /base.*inr/i.test(lines[i+2]) &&
        /gst/i.test(lines[i+3]) &&
        /total.*inr/i.test(lines[i+4]) &&
        /base.*usd/i.test(lines[i+5]) &&
        /total.*usd/i.test(lines[i+6])) {

      const headers = [lines[i], lines[i+1], lines[i+2], lines[i+3], lines[i+4], lines[i+5], lines[i+6]];
      newLines.push("| " + headers.join(" | ") + " |");
      newLines.push("| --- | --- | --- | --- | --- | --- | --- |");

      i += 7;

      // Group subsequent cells in sets of 7
      while (i < lines.length) {
        // Skip empty lines between rows if any
        while (i < lines.length && lines[i] === "") {
          i++;
        }
        if (i >= lines.length) break;

        // Check if there are 7 cells remaining
        if (i + 6 < lines.length) {
          const rowCells = [];
          for (let j = 0; j < 7; j++) {
            rowCells.push(lines[i + j]);
          }
          newLines.push("| " + rowCells.join(" | ") + " |");
          i += 7;
        } else {
          // Less than 7 cells, go to normal line-by-line parsing
          break;
        }
      }
    } else {
      newLines.push(lines[i]);
      i++;
    }
  }
  return newLines.join('\n');
};

const parseMessageSections = (text) => {
  const lines = text.split('\n');
  const sections = [];
  let currentTableLines = [];
  let isInsideTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableLine = line.trim().startsWith('|') || (line.includes('|') && line.trim().endsWith('|'));

    if (isTableLine) {
      if (!isInsideTable) {
        isInsideTable = true;
      }
      currentTableLines.push(line);
    } else {
      if (isInsideTable) {
        sections.push({ type: 'table', content: currentTableLines.join('\n') });
        currentTableLines = [];
        isInsideTable = false;
      }
      // If the line is empty and we have a text section at the end, append it. Otherwise make a new text section
      if (sections.length > 0 && sections[sections.length - 1].type === 'text') {
        sections[sections.length - 1].content += '\n' + line;
      } else {
        sections.push({ type: 'text', content: line });
      }
    }
  }

  if (isInsideTable && currentTableLines.length > 0) {
    sections.push({ type: 'table', content: currentTableLines.join('\n') });
  }

  // Filter out completely empty text sections
  return sections.filter(s => s.content.trim() !== '' || s.type === 'table');
};

const ParsedTableVisualizer = ({ tableText }) => {
  const lines = tableText.split('\n').map(l => l.trim()).filter(l => l !== '');
  
  // Extract cells from each line
  const rows = lines.map(line => {
    return line
      .split('|')
      .map(c => c.trim())
      .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
  }).filter(row => row.length > 0);

  if (rows.length === 0) return null;

  // Filter out partition lines (like `| --- | --- |`)
  const cleanedRows = rows.filter(row => !row.some(cell => cell.includes('---')));

  if (cleanedRows.length === 0) return null;

  const headers = cleanedRows[0];
  const bodyRows = cleanedRows.slice(1);

  // Separate regular content rows from total/summary rows
  const regularRows = [];
  const totalRows = [];

  bodyRows.forEach(row => {
    const firstCellLower = row[0] ? row[0].toLowerCase() : '';
    const isTotal = firstCellLower.includes('total') || firstCellLower.includes('subtotal') || firstCellLower.includes('grand');
    if (isTotal) {
      totalRows.push(row);
    } else {
      regularRows.push(row);
    }
  });

  // Let's identify the price column in the headers:
  let priceColIndex = -1;
  headers.forEach((h, idx) => {
    const hLower = h.toLowerCase();
    if (priceColIndex === -1 && hLower.includes('total') && hLower.includes('inr')) {
      priceColIndex = idx;
    }
  });
  headers.forEach((h, idx) => {
    const hLower = h.toLowerCase();
    if (priceColIndex === -1 && hLower.includes('total') && hLower.includes('usd')) {
      priceColIndex = idx;
    }
  });
  headers.forEach((h, idx) => {
    const hLower = h.toLowerCase();
    if (priceColIndex === -1 && (hLower.includes('price') || hLower.includes('base') || hLower.includes('total')) && idx > 1) {
      priceColIndex = idx;
    }
  });

  if (priceColIndex === -1) {
    priceColIndex = headers.length - 1;
  }

  // Compile slice data for the chart!
  const chartData = [];
  regularRows.forEach(row => {
    const label = row[0] ? row[0].replace(/\*\*|\*/g, '').trim() : 'Item';
    const valueCell = row[priceColIndex] || '';
    
    // Extract numerical value by removing spaces, commas, symbols, keeping only digits/decimals
    const numericPart = valueCell.replace(/[^\d.]/g, '');
    const value = parseFloat(numericPart) || 0;
    
    if (value > 0) {
      chartData.push({
        label,
        value,
        originalStr: valueCell
      });
    }
  });

  // Calculate total of regular items
  const sumValues = chartData.reduce((acc, curr) => acc + curr.value, 0);

  // Using useState dynamically
  const [activeSubTab, setActiveSubTab] = useState('table');

  return (
    <div className="my-4 space-y-4 bg-slate-900/60 rounded-2xl border border-slate-800 p-4 shadow-xl text-sm sm:text-base">
      {/* Visual Subtabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <span className="text-xs font-bold tracking-widest text-violet-400 font-mono uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Zyvone Bid Analysis
        </span>
        <div className="flex gap-1 bg-slate-950 p-1 border border-slate-850 rounded-xl shrink-0">
          <button
            onClick={() => setActiveSubTab('table')}
            className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'table'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            TABLE VIEW
          </button>
          {chartData.length > 0 && (
            <button
              onClick={() => setActiveSubTab('chart')}
              className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'chart'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PIE CHART
            </button>
          )}
        </div>
      </div>

      {activeSubTab === 'table' ? (
        /* Render fully styled HTML Table */
        <div className="overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/80 shadow-lg" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full text-left border-collapse text-xs sm:text-sm leading-relaxed font-sans">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-850 text-violet-400 font-bold">
                {headers.map((h, i) => (
                   <th key={i} className={`p-3.5 font-bold tracking-wide whitespace-nowrap ${i === 0 ? 'text-left pl-4' : 'text-right pr-4'}`}>
                    {h.replace(/\*\*|\*/g, '').trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regularRows.map((row, rIdx) => (
                <tr 
                  key={rIdx} 
                  className={`border-b border-slate-900 hover:bg-slate-900/30 transition-colors ${
                    rIdx % 2 === 0 ? 'bg-slate-950/40' : 'bg-transparent'
                  }`}
                >
                  {row.map((cell, cIdx) => (
                     <td key={cIdx} className={`p-3.5 text-slate-300 ${cIdx === 0 ? 'text-left pl-4 font-normal' : 'text-right pr-4 font-mono font-medium'}`}>
                      {cell.replace(/\*\*|\*/g, '').trim()}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Grand Totals */}
              {totalRows.map((row, rIdx) => (
                <tr key={rIdx} className="bg-slate-900 text-white font-bold border-t border-violet-500/20">
                  {row.map((cell, cIdx) => (
                     <td key={cIdx} className={`p-3.5 text-violet-300 ${cIdx === 0 ? 'text-left pl-4 font-mono font-bold text-xs uppercase' : 'text-right pr-4 font-mono font-bold'}`}>
                      {cell.replace(/\*\*|\*/g, '').trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Dynamic SVG Donut Pie Chart */
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 shadow-lg flex flex-col items-center justify-center gap-3">
          <div className="relative w-40 h-40">
            <svg width="100%" height="100%" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0891B2" />
                </linearGradient>
                <linearGradient id="grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>
              <g transform="translate(100, 100)">
                <circle cx="0" cy="0" r="48" fill="#020617" />
                
                {(() => {
                  let startAngle = 0;
                  return chartData.map((item, idx) => {
                    const percent = item.value / sumValues;
                    const angleSweep = percent * 360;
                    const endAngle = startAngle + angleSweep;
                    
                    const outerRadius = 76;
                    const innerRadius = 52;
                    
                    const polarToCartesian = (r, angleInDegrees) => {
                      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                      return {
                        x: r * Math.cos(angleInRadians),
                        y: r * Math.sin(angleInRadians)
                      };
                    };

                    const drawDonutWedge = (start, end) => {
                      if (end - start >= 359.99) {
                        return [
                          "M", 0, -outerRadius,
                          "A", outerRadius, outerRadius, 0, 1, 1, -0.01, -outerRadius,
                          "L", -0.01, -innerRadius,
                          "A", innerRadius, innerRadius, 0, 1, 0, 0, -innerRadius,
                          "Z"
                        ].join(" ");
                      }
                      const p1 = polarToCartesian(outerRadius, start);
                      const p2 = polarToCartesian(outerRadius, end);
                      const p3 = polarToCartesian(innerRadius, end);
                      const p4 = polarToCartesian(innerRadius, start);
                      const largeArc = (end - start) > 180 ? 1 : 0;
                      
                      return [
                        "M", p1.x, p1.y,
                        "A", outerRadius, outerRadius, 0, largeArc, 1, p2.x, p2.y,
                        "L", p3.x, p3.y,
                        "A", innerRadius, innerRadius, 0, largeArc, 0, p4.x, p4.y,
                        "Z"
                      ].join(" ");
                    };

                    const dPath = drawDonutWedge(startAngle, endAngle);
                    const color = `url(#grad-${idx % 5})`;
                    startAngle = endAngle;

                    return (
                      <g key={idx} className="transition-all duration-300 hover:scale-[1.04] origin-center cursor-pointer">
                        <path 
                          d={dPath} 
                          fill={color} 
                          className="hover:opacity-90 transition-all"
                          stroke="#020617"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  });
                })()}

                {/* center text */}
                <text x="0" y="-8" textAnchor="middle" fill="#64748B" className="text-[9px] font-sans font-bold uppercase tracking-widest leading-none">
                  Total
                </text>
                <text x="0" y="10" textAnchor="middle" fill="#F8FAFC" className="text-[11px] font-mono font-bold tracking-tight leading-none">
                  {totalRows[0] ? totalRows[0][priceColIndex] || 'Cost' : `${chartData[0]?.originalStr.startsWith('$') ? '$' : '₹'}${sumValues.toLocaleString('en-IN')}`}
                </text>
              </g>
            </svg>
          </div>

          {/* Color legends */}
          <div className="w-full space-y-1 bg-slate-900/40 p-2 rounded-xl border border-slate-900/60">
            {chartData.map((item, idx) => {
              const bgColors = [
                'bg-gradient-to-r from-violet-500 to-indigo-600 bg-violet-600',
                'bg-gradient-to-r from-cyan-400 to-cyan-600 bg-cyan-500',
                'bg-gradient-to-r from-emerald-400 to-emerald-600 bg-emerald-500',
                'bg-gradient-to-r from-rose-400 to-rose-600 bg-rose-500',
                'bg-gradient-to-r from-amber-400 to-amber-600 bg-amber-500'
              ];
              const percent = Math.round((item.value / sumValues) * 100);
              return (
                <div key={idx} className="flex items-center justify-between text-[9px] font-sans text-slate-300">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-2 h-2 rounded-sm ${bgColors[idx % 5]} shrink-0`} />
                    <span className="font-medium text-slate-200 truncate pr-2">{item.label}</span>
                  </div>
                  <span className="font-mono text-slate-400 shrink-0 font-bold text-[10px]">
                    {item.originalStr} <span className="text-violet-400">({percent}%)</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};export default function PricingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      parts: [{ text: "Hello! Feed free to ask me anything regarding Zyvone product licensing, custom developer rates, and GST calculations. I can also estimate a full official quotation right here." }]
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current && isOpen) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  const mapIncomingId = (id) => {
    let normalized = id.replace(/-/g, '_');
    if (normalized === 'website_dev') return 'website_development';
    if (normalized === 'mobile_dev') return 'mobile_app_development';
    if (normalized === 'custom_dev') return 'custom_software_development';
    return normalized;
  };

  const sendMessage = async (messageText, currentMessages = messages) => {
    if (!messageText.trim() || loading) return;

    const nextMessages = [
      ...currentMessages,
      { role: 'user', parts: [{ text: messageText }] }
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
      if (data.error) throw new Error(data.error);

      setMessages([
        ...nextMessages,
        { role: 'model', parts: [{ text: data.text }] }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...nextMessages,
        { role: 'model', parts: [{ text: "Apologies, I encountered a communication error with Zyvone pricing systems. Please try again." }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendChat = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || loading) return;

    const userMsg = userInput;
    setUserInput('');
    await sendMessage(userMsg);
  };

  useEffect(() => {
    const handleAnalyzeEvent = (e) => {
      const { productIds, serviceIds } = e.detail;
      if (!productIds && !serviceIds) return;

      const promptItems = [];

      if (productIds && productIds.length > 0) {
        productIds.forEach((id) => {
          const normId = mapIncomingId(id);
          const found = PRODUCTS_LIST.find(p => p.id === normId);
          if (found) {
            promptItems.push(found.name);
          }
        });
      }

      if (serviceIds && serviceIds.length > 0) {
        serviceIds.forEach((id) => {
          const normId = mapIncomingId(id);
          const found = SERVICES_LIST.find(s => s.id === normId);
          if (found) {
            promptItems.push(found.name);
          }
        });
      }

      if (promptItems.length > 0) {
        setIsOpen(true);

        const itemsListStr = promptItems.join(", ");
        const customPrompt = `Hello, I'd like to analyze the pricing details, GST options, and USD equivalents for our selected combination: ${itemsListStr}. Please generate a clean comparison and quotation.`;
        
        // Use a slight timeout to let any mounting/opening animations play smoothly
        setTimeout(() => {
          sendMessage(customPrompt);
        }, 300);
      }
    };

    window.addEventListener('zyvone-pricing-analyze', handleAnalyzeEvent);
    return () => {
      window.removeEventListener('zyvone-pricing-analyze', handleAnalyzeEvent);
    };
  }, [messages, loading]);

  const formatMessageHTML = (text) => {
    const processedText = preProcessTextToTable(text);
    // If there are no markdown tables, just render default text layout
    if (!processedText.includes('|')) {
      return <p className="whitespace-pre-line text-sm sm:text-base font-sans leading-relaxed text-slate-200">{processedText}</p>;
    }

    const sections = parseMessageSections(processedText);

    return (
      <div className="space-y-3">
        {sections.map((sec, idx) => {
          if (sec.type === 'table') {
            return <ParsedTableVisualizer key={idx} tableText={sec.content} />;
          } else {
            // Emphasize the Brief Executive Analysis section header
            const isHeader = sec.content.trim().startsWith('###');
            const cleanContent = sec.content.replace('###', '').trim();
            if (isHeader) {
              return (
                <h5 key={idx} className="text-sm sm:text-base font-black text-violet-400 uppercase tracking-wider font-mono pt-3 border-t border-slate-800/40 mt-2">
                  {cleanContent}
                </h5>
              );
            }
            return (
              <p key={idx} className="whitespace-pre-line text-sm sm:text-base font-sans leading-relaxed text-slate-200 font-light">
                {sec.content}
              </p>
            );
          }
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Chat Widget Panel / Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full max-w-2xl lg:max-w-3xl h-[650px] bg-slate-950/95 border border-slate-850 rounded-3xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden backdrop-blur-xl relative z-10"
          >
            {/* Header section */}
            <div className="p-4 bg-gradient-to-r from-[#0d0728] via-[#05030f] to-[#04020a] border-b border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-violet-600/25 border border-violet-500/40 flex items-center justify-center text-violet-400">
                    <Sparkles size={16} className="animate-twinkle-purple" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase">Zyvone Pricing Advisor</h4>
                    <p className="text-[10px] text-slate-500 font-medium font-mono">Bids, Multi-currency & GST Analytics</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Central Frame Panels */}
            <div className="flex-grow overflow-hidden flex flex-col relative bg-slate-950/70">
              <div className="flex-grow flex flex-col overflow-hidden p-4">
                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto space-y-3 mb-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {messages.map((msg, index) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                          max-w-[85%] rounded-2xl p-3 border
                          ${isUser 
                            ? 'bg-violet-600/95 border-violet-500 text-white rounded-tr-none' 
                            : 'bg-slate-900/90 border-slate-850 text-slate-100 rounded-tl-none'
                          }
                        `}>
                          {formatMessageHTML(msg.parts[0]?.text || '')}
                        </div>
                      </div>
                    );
                  })}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900/90 border border-slate-850 rounded-2xl rounded-tl-none p-3 text-[10px] text-slate-400 flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-violet-500/30 border-t-violet-400 animate-spin" />
                        Advisor consulting tables...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input form */}
                <form onSubmit={handleSendChat} className="flex gap-2.5 pt-3 border-t border-slate-900">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Write a message to Zyvone Sales..."
                    className="flex-grow bg-slate-900 border border-slate-800 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !userInput.trim()}
                    className="bg-violet-600 hover:bg-violet-500 active:bg-violet-700 disabled:opacity-40 text-white rounded-xl px-4.5 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
