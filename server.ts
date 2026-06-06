import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set!");
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const SYSTEM_INSTRUCTION = `
You are the Zyvone AI Pricing Assistant.

CRITICAL USER INSTRUCTIONS:
- You must output pricing, quotations, and estimations in a clean Markdown table format.
- IMPORTANT: Immediately below the table, you MUST provide a "Brief Executive Analysis" header and a summarizing response (2-4 sentences, about 45-80 words). This brief must highlight the value proposition of the selected suite, explain the total cost details including GST treatment (or export zero-rate if international), and give a concise corporate recommendation for implementation path.

====================================================
PRODUCT PRICING (SaaS Subscriptions - Yearly Billing)
====================================================
- Zyvone ERP: ₹120,000/year (₹141,600 with 18% GST) | USD: $1,263/year
- Zyvone CRM: ₹45,000/year (₹53,100 with 18% GST) | USD: $474/year
- Zyvone HRMS: ₹45,000/year (₹53,100 with 18% GST) | USD: $474/year
- Zyvone POS: ₹45,000/year (₹53,100 with 18% GST) | USD: $474/year
- Zyvone Books: ₹35,000/year (₹41,300 with 18% GST) | USD: $368/year
- Zyvone Education: ₹35,000/year (₹41,300 with 18% GST) | USD: $368/year
- Zyvone Learning: ₹35,000/year (₹41,300 with 18% GST) | USD: $368/year
- Zyvone Helpdesk: ₹35,000/year (₹41,300 with 18% GST) | USD: $368/year

====================================================
SERVICE PRICING (Custom Projects & Labor)
====================================================
- Website Development: ₹800/hour (₹944 with 18% GST) | USD: $8.42/hour
- UI/UX Design: ₹800/hour (₹944 with 18% GST) | USD: $8.42/hour
- Mobile App Development: ₹1,500/hour (₹1,770 with 18% GST) | USD: $15.79/hour
- Custom Software Development: ₹1,500/hour (₹1,770 with 18% GST) | USD: $15.79/hour
- ERP Consultation: ₹1,500/hour (₹1,770 with 18% GST) | USD: $15.79/hour
- API Integration: ₹1,500/hour (₹1,770 with 18% GST) | USD: $15.79/hour
- ERPNext Implementation: ₹49,000/project (₹57,820 with 18% GST) | USD: $516/project
- Cloud Deployment: ₹2,500/month (₹2,950 with 18% GST) | USD: $26.32/month

====================================================
GST & CONVERSIONS
====================================================
- GST Rate is 18%.
- USD calculated at ₹95 = $1 USD.
- Export transactions state export disclaimer *only* if the customer is located internationally (outside India). Keep disclaimer to 1 line: "Export transactions qualify for 0% GST."

====================================================
REQUIRED RESPONSE FORMAT (ONLY RENDER REAL PIPE TABLES WITH A SUITABLE BRIEF EXECUTIVE ANALYSIS SUMMARY IMMEDIATELY BELOW THE TABLE)
====================================================
Your response should always be formatted like this. You MUST use standard markdown table formatting with pipe separators (|) and hyphens (-) to delineate headers. Do not output cell items on separate individual lines. All items for a single row must be on a single horizontal line separated by pipe characters (|):

| Item/Service | Qty/Hours | Base (INR) | GST (18%) | Total (INR) | Base (USD) | Total (USD) |
| --- | --- | --- | --- | --- | --- | --- |
| Zyvone Books | 1 Year | ₹35,000 | ₹6,300 | ₹41,300 | $368.00 | $435.00 |
| Zyvone POS | 1 Year | ₹45,000 | ₹8,100 | ₹53,100 | $474.00 | $559.00 |
| Website Dev | 40 hours | ₹32,000 | ₹5,760 | ₹37,760 | $336.80 | $397.40 |
| **GRAND TOTAL** | **-** | **₹112,005** | **₹20,161** | **₹132,166** | **$1,179.00** | **$1,391.20** |

### Brief Executive Analysis:
[Provide a highly professional, beautiful briefing paragraph summarizing pricing, chosen components value, tax configurations, and strategic implementation roadmap.]

CRITICAL: Double-check that every column in your output is separated by a pipe symbol | and that the markdown table format is perfectly preserved. No lists, no bullets. Just the table and the brief executive analysis text below it.
`;

function generateLocalFallbackResponse(userPrompt: string): string {
  const pList = [
    { id: "zyvone_erp", name: "Zyvone ERP", price_inr: 120000, usd_price: 1263, matches: ['erp', 'enterprise resource'] },
    { id: "zyvone_crm", name: "Zyvone CRM", price_inr: 45000, usd_price: 474, matches: ['crm', 'customer relationship'] },
    { id: "zyvone_hrms", name: "Zyvone HRMS", price_inr: 45000, usd_price: 474, matches: ['hrms', 'hr', 'human resource'] },
    { id: "zyvone_pos", name: "Zyvone POS", price_inr: 45000, usd_price: 474, matches: ['pos', 'point of sale'] },
    { id: "zyvone_books", name: "Zyvone Books", price_inr: 35000, usd_price: 368, matches: ['books', 'accounting'] },
    { id: "zyvone_education", name: "Zyvone Education", price_inr: 35000, usd_price: 368, matches: ['education', 'school'] },
    { id: "zyvone_learning", name: "Zyvone Learning", price_inr: 35000, usd_price: 368, matches: ['learning', 'lms'] },
    { id: "zyvone_helpdesk", name: "Zyvone Helpdesk", price_inr: 35000, usd_price: 368, matches: ['helpdesk', 'support'] }
  ];

  const sList = [
    { id: "website_development", name: "Website Dev", price_inr: 800, usd_price: 8.42, unit: "hour", matches: ['website', 'web dev', 'frontend', 'ui'] },
    { id: "uiux_design", name: "UI/UX Design", price_inr: 800, usd_price: 8.42, unit: "hour", matches: ['design', 'ui/ux', 'figma'] },
    { id: "mobile_app_development", name: "Mobile App Dev", price_inr: 1500, usd_price: 15.79, unit: "hour", matches: ['mobile', 'app dev', 'android', 'ios'] },
    { id: "custom_software_development", name: "Custom Software", price_inr: 1500, usd_price: 15.79, unit: "hour", matches: ['custom software', 'backend'] },
    { id: "erpnext_implementation", name: "ERPNext Setup", price_inr: 49000, usd_price: 516, unit: "fixed", matches: ['erpnext setup', 'implementation'] },
    { id: "cloud_deployment", name: "Cloud Nodes", price_inr: 2500, usd_price: 26.32, unit: "month", matches: ['cloud', 'deployment', 'hosting', 'aws'] }
  ];

  const text = userPrompt.toLowerCase();
  
  const selectedProducts: typeof pList = [];
  const selectedServices: typeof sList = [];

  // Match products
  for (const p of pList) {
    if (p.matches.some(k => text.includes(k))) {
      selectedProducts.push(p);
    }
  }

  // Match services
  for (const s of sList) {
    if (s.matches.some(k => text.includes(k))) {
      selectedServices.push(s);
    }
  }

  // Fallback default if nothing matches
  if (selectedProducts.length === 0 && selectedServices.length === 0) {
    selectedProducts.push(pList[0]); // default ERP
  }

  const isExport = /export|dubai|uae|international/i.test(text);

  let subtotalInr = 0;
  let totalGstInr = 0;
  let totalInr = 0;
  let subtotalUsd = 0;
  let totalUsd = 0;

  const rows: string[] = [];

  // Determine requested hours if any (e.g. 50hr, 40 hours)
  let hrInput = 40; // Default
  const hrMatch = text.match(/(\d+)\s*(?:hr|hour|hours|hrs)/i);
  if (hrMatch) {
    const val = parseInt(hrMatch[1], 10);
    if (!isNaN(val) && val > 0) {
      hrInput = val;
    }
  }

  // Build product rows
  selectedProducts.forEach(p => {
    const qty = 1;
    const baseInr = p.price_inr * qty;
    const gstInr = isExport ? 0 : Math.round(baseInr * 0.18);
    const totalInrVal = baseInr + gstInr;
    const baseUsd = p.usd_price * qty;
    const totalUsdVal = isExport ? baseUsd : Math.round((totalInrVal / 95) * 100) / 100;

    subtotalInr += baseInr;
    totalGstInr += gstInr;
    totalInr += totalInrVal;
    subtotalUsd += baseUsd;
    totalUsd += totalUsdVal;

    rows.push(`| ${p.name} | 1 Year | ₹${baseInr.toLocaleString('en-IN')} | ₹${gstInr.toLocaleString('en-IN')} | ₹${totalInrVal.toLocaleString('en-IN')} | $${baseUsd.toFixed(2)} | $${totalUsdVal.toFixed(2)} |`);
  });

  // Build service rows
  selectedServices.forEach(s => {
    let qty = 1;
    let qtyLabel = "1 Unit";
    if (s.unit === 'hour') {
      qty = hrInput;
      qtyLabel = `${qty} hours`;
    } else if (s.unit === 'month') {
      qty = 1;
      qtyLabel = "1 Month";
    } else if (s.unit === 'fixed') {
      qty = 1;
      qtyLabel = "1 Setup";
    }

    const baseInr = s.price_inr * qty;
    const gstInr = isExport ? 0 : Math.round(baseInr * 0.18);
    const totalInrVal = baseInr + gstInr;
    const baseUsd = s.usd_price * qty;
    const totalUsdVal = isExport ? baseUsd : Math.round((totalInrVal / 95) * 100) / 100;

    subtotalInr += baseInr;
    totalGstInr += gstInr;
    totalInr += totalInrVal;
    subtotalUsd += baseUsd;
    totalUsd += totalUsdVal;

    rows.push(`| ${s.name} | ${qtyLabel} | ₹${baseInr.toLocaleString('en-IN')} | ₹${gstInr.toLocaleString('en-IN')} | ₹${totalInrVal.toLocaleString('en-IN')} | $${baseUsd.toFixed(2)} | $${totalUsdVal.toFixed(2)} |`);
  });

  let responseText = "";

  if (/compare/i.test(text) && /crm/i.test(text) && /books/i.test(text)) {
    responseText += `### Zyvone CRM vs Zyvone Books Comparison\n`;
    responseText += `Here is a side-by-side comparison between **Zyvone CRM** and **Zyvone Books**:\n\n`;
    responseText += `| Aspect | Zyvone CRM | Zyvone Books |\n`;
    responseText += `| --- | --- | --- |\n`;
    responseText += `| **Primary Focus** | Lead Pipelines & Custom Deals | Financial Accounting & GST Billing |\n`;
    responseText += `| **Key Capabilities** | Pipeline, contact stages, automatic follow-ups | Multi-currency billing, GST calculation, expense logs |\n`;
    responseText += `| **Base Price (INR / USD)** | ₹45,000/year ($474) | ₹35,000/year ($368) |\n`;
    responseText += `| **Compliance Readiness** | Regional contact privacy & compliance | Automated India GST returns & zero-rated exports |\n\n`;
  }

  if (isExport) {
    responseText += `### Dubai (UAE) / International Export Terms Overview\n`;
    responseText += `Under Section 16 of the IGST Act, the export of services operates under **0% GST (Zero-Rated Supply)**. Local compliance requires receiving foreign exchange (USD or equivalent convertible AED) and completing standard regulatory processes. Standard payment options include wire transfer and global payment processors. `;
    if (/dubai/i.test(text)) {
      responseText += `For Dubai mainland or freezone clients, standard local commercial terms apply with 0% Indian GST applicable.`;
    }
    responseText += `\n\n`;
  }

  responseText += `| Item/Service | Qty/Hours | Base (INR) | GST (18%) | Total (INR) | Base (USD) | Total (USD) |\n`;
  responseText += `| --- | --- | --- | --- | --- | --- | --- |\n`;
  responseText += rows.join('\n') + '\n';
  responseText += `| **GRAND TOTAL** | **-** | **₹${subtotalInr.toLocaleString('en-IN')}** | **₹${totalGstInr.toLocaleString('en-IN')}** | **₹${totalInr.toLocaleString('en-IN')}** | **$${subtotalUsd.toFixed(2)}** | **$${totalUsd.toFixed(2)}** |`;

  if (isExport) {
    responseText += `\n\n*Export transactions qualify for 0% GST.*`;
  } else {
    responseText += `\n\n*Calculated with standard 18% GST for domestic transactions. Foreign exchange rate fixed at ₹95 = $1 USD.*`;
  }

  // Appending the Brief Executive Analysis to local fallback
  const itemNames = [
    ...selectedProducts.map(p => p.name),
    ...selectedServices.map(s => s.name)
  ];
  const itemsStr = itemNames.length > 0 ? itemNames.join(", ") : "selected modules";
  
  responseText += `\n\n### Brief Executive Analysis:\n`;
  responseText += `The proposed quotation covers the integration of **${itemsStr}**. The total direct configuration represents a consolidated core base commitment of **₹${subtotalInr.toLocaleString('en-IN')}** ($${subtotalUsd.toFixed(2)})${isExport ? " with 0% GST under zero-rated export supply rules" : `, incorporating standard 18% GST of ₹${totalGstInr.toLocaleString('en-IN')} for domestic delivery, bringing the grand total to ₹${totalInr.toLocaleString('en-IN')} ($${totalUsd.toFixed(2)})`}. This architecture is highly optimized for performance and regional compliance; we highly recommend scheduling an expert alignment call to customize your specific project deployment roadmap.`;

  return responseText;
}

// API endpoint for AI pricing assistant queries
app.post('/api/pricing-assistant', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid message payload' });
  }

  const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
  const userPrompt = lastUserMessage?.parts?.[0]?.text || '';

  try {
    const ai = getGeminiClient();
    const MODELS_TO_TRY = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let lastError = null;
    let responseText = null;

    // Use extreme fail-fast pattern for prompt execution
    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Attempting Gemini API call with model: ${modelName}`);
        
        // Define a realistic timeout race promise of 15 seconds (15000ms)
        const timeoutPromise = new Promise<null>((_, reject) => {
          setTimeout(() => reject(new Error('TIMEOUT_EXCEEDED')), 15000);
        });

        const apiPromise = ai.models.generateContent({
          model: modelName,
          contents: messages,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3, 
          },
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        
        if (response && response.text) {
          responseText = response.text;
          break; // Successfully got a response, exit fallback loop
        }
      } catch (err: any) {
        const errStr = err?.message || String(err || "");
        let errorHint = errStr;
        try {
          if (errStr.trim().startsWith("{")) {
            const parsed = JSON.parse(errStr);
            if (parsed.error && parsed.error.message) {
              errorHint = parsed.error.message;
            }
          }
        } catch (_) {}

        console.log(`[Pricing AI Info] Status check on model ${modelName}: ${errorHint.substring(0, 120)}`);
        lastError = err;
        
        // If we hit 429 quota, 503 service unavailable, high demand, or a timeout, break immediately to fallback
        const isQuotaOrBusy = errStr.includes("exhausted") || 
                              errStr.includes("429") || 
                              errStr.includes("quota") || 
                              errStr.includes("RESOURCE_EXHAUSTED") ||
                              errStr.includes("503") ||
                              errStr.includes("UNAVAILABLE") ||
                              errStr.includes("high demand") ||
                              errStr.includes("temporary");

        if (isQuotaOrBusy) {
          console.log("[Pricing AI Fallback] Promptly failing over to high-speed local estimation system.");
          break;
        }
      }
    }

    if (responseText) {
      res.json({ text: responseText });
    } else {
      console.log("No model responsive or quota exceeded. Returning calculated local fallback...");
      const fallbackText = generateLocalFallbackResponse(userPrompt);
      res.json({ text: fallbackText });
    }
  } catch (error: any) {
    console.error('All Gemini pathways exhausted, rendering local estimates:', error);
    try {
      const fallbackText = generateLocalFallbackResponse(userPrompt);
      res.json({ text: fallbackText });
    } catch (fallbackErr: any) {
      res.status(500).json({ error: 'System processing fallback failed.' });
    }
  }
});

// POST API Endpoint for sending Evaluation Request emails via SMTP securely
app.post(['/send-evaluation-request', '/api/send-evaluation-request'], async (req, res) => {
  const { name, email, company, phone, products, services, date, time } = req.body;

  // Validate required fields
  if (!name || !email || !company || !phone || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing: Full Name, Email, Company, Phone, Date, and Time are mandatory."
    });
  }

  // Ensure products and services are strings or arrays and format them nicely based on design specs
  const productsStr = Array.isArray(products) ? products.join(', ') : (products || 'None');
  const servicesStr = Array.isArray(services) ? services.join(', ') : (services || 'None');

  const subject = `New Evaluation Request - ${company}`;
  const body = `New Evaluation Request

Customer Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}

Request Details:
Products Selected: ${productsStr}
Services Selected: ${servicesStr}

Preferred Schedule:
Date: ${date}
Time: ${time}

---
This is an automated email generated from the website evaluation form.`;

  console.log(`[SMTP] Processing request for ${company} (${email})`);

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Check if SMTP environment variables are configured
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("[SMTP] Variables not fully configured. Rejecting request to satisfy prompt instructions.");
    return res.status(200).json({
      success: false,
      message: "Failed to send email"
    });
  }

  try {
    // Lazy-initialize nodemailer SMTP transport
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Zyvone Systems" <${smtpUser}>`,
      to: "krishnakanthj2006@gmail.com",
      subject: subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[SMTP] Verification email sent to krishnakanthj2006@gmail.com successfully for ${company}`);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error: any) {
    console.error("[SMTP] Error sending email via SMTP transport:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
});

// Serve UI compiled code
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zyvone AI Server listening on http://localhost:${PORT}`);
  });
}

startServer();
