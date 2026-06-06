import aldrinImage from "../assets/members/aldrinanaahath.jpg";
import ganapathyImage from "../assets/members/ganapathyram.jpg";
import kanishkaImage from "../assets/members/kanishka.jpg";
import keekuImage from "../assets/members/keeku.jpg";
import lobanaImage from "../assets/members/lobana.jpg";
import mohanImage from "../assets/members/mohankumar.jpg";
import punithaImage from "../assets/members/punithaayilya.jpg";
import sibiImage from "../assets/members/sibilokeshanandhapadmanapan.jpg";

export const PRODUCTS_DATA = [
  {
    id: "zyvone-erp",
    title: "Zyvone ERP",
    category: "Full ERP",
    description: "Unified engine for physical warehouses, production order tracks, procurement pipelines, and asset depreciation.",
    price: "$249/mo",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "Layers",
    targetSegment: "Manufacturing, Enterprises",
    coreModule: "Full ERPNext Suite",
    basePrice: "$349/mo",
    offerPrice: "$249/mo",
    features: [
      "Multi-Store Warehouse Control",
      "Raw Material Production Pipelines",
      "Vendor Procurement Orders",
      "Asset Maintenance & Logistics",
      "Global Multi-Entity Consolidated Sheets",
      "Sub-Second Production Audits"
    ]
  },
  {
    id: "zyvone-crm",
    title: "Zyvone CRM",
    category: "CRM SaaS",
    description: "Streamlined pipeline track with deal tagging, automated lead routing, call logs, and revenue estimations.",
    price: "$49/mo",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "Target",
    targetSegment: "Sales Teams, B2B Companies",
    coreModule: "CRM",
    basePrice: "$79/mo",
    offerPrice: "$49/mo",
    features: [
      "Interactive Deal Flow Pipeline",
      "Automated Lead Assignment Engine",
      "SLA & Activity Logs Track",
      "Advanced Revenue Win Estimation",
      "Email and Contact Integrations",
      "Territory & Team Management"
    ]
  },
  {
    id: "zyvone-hrms",
    title: "Zyvone HRMS",
    category: "HR SaaS",
    description: "Full employee lifecycle automation incorporating attendance, salary processing, contracts, and benefit plans.",
    price: "$89/mo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=600",
    iconName: "Users",
    targetSegment: "All Organizations",
    coreModule: "HR & Payroll",
    basePrice: "$129/mo",
    offerPrice: "$89/mo",
    features: [
      "Biometric Attendance Sync Engine",
      "Automated Salary Slips Calculation",
      "Asset Handover & Lifecycle Logs",
      "Employee Appraisal Settings",
      "Company Policy Distribution Hub",
      "Staff Reimbursement Claims"
    ]
  },
  {
    id: "zyvone-pos",
    title: "Zyvone POS",
    category: "Vertical SaaS",
    description: "Cloud-hosted modern Point of Sale system with instant touch billing, offline synchronization, custom templates, and real-time inventory adjustments.",
    price: "$49/mo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "ShoppingCart",
    targetSegment: "Retail Stores, Supermarkets, Restaurants",
    coreModule: "Point of Sale (POS)",
    basePrice: "$79/mo",
    offerPrice: "$49/mo",
    features: [
      "Offline-First Billing Sync",
      "Real-Time Inventory Stock Depletion",
      "Custom Graphic Receipt Printer Templates",
      "Multi-Register Store Cash Register Controls",
      "Integrated Payment Gateway Terminals",
      "Touch Screen POS Interface"
    ]
  },
  {
    id: "zyvone-books",
    title: "Zyvone Books",
    category: "Accounting SaaS",
    description: "Elegant double-entry accounting with automated invoicing, real-time ledger syncs, and tax filing modules.",
    price: "$39/mo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "Calculator",
    targetSegment: "SMEs, Retail, Freelancers",
    coreModule: "Accounting / Finance",
    basePrice: "$59/mo",
    offerPrice: "$39/mo",
    features: [
      "Double-Entry Accounting Ledger",
      "Automated Client Invoicing",
      "Real-Time Profit & Loss Sheets",
      "Tax Calculation & General Ledger",
      "SME Multi-Currency Payments",
      "Expense & Receipt Tracking"
    ]
  },
  {
    id: "zyvone-education",
    title: "Zyvone Education",
    category: "Vertical SaaS",
    description: "Comprehensive system for managing student records, fees, schedules, courses, and portal access.",
    price: "$79/mo",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "GraduationCap",
    targetSegment: "Schools, Colleges, Institutions",
    coreModule: "Education Management",
    basePrice: "$120/mo",
    offerPrice: "$79/mo",
    features: [
      "Student Records Management",
      "Fee Collection & Invoicing",
      "Exam & Grade Sheets",
      "Timetable Scheduler",
      "Parent & Student Portals",
      "Teacher Assignment Dashboards"
    ]
  },
  {
    id: "zyvone-learning",
    title: "Zyvone Learning",
    category: "LMS",
    description: "Rich learning management portal with video lectures, interactive quizzes, progress tracks, and certification engines.",
    price: "$59/mo",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "BookOpen",
    targetSegment: "Training Centers, Online Education",
    coreModule: "LMS",
    basePrice: "$89/mo",
    offerPrice: "$59/mo",
    features: [
      "Interactive Video Lectures",
      "Structured Quiz & Assessment Engine",
      "Student Progress Dashboard",
      "Certification Creation tool",
      "Instructor Feedback portal",
      "Course Content Builder"
    ]
  },
  {
    id: "zyvone-helpdesk",
    title: "Zyvone Helpdesk",
    category: "Support SaaS",
    description: "Collaborative desk featuring ticket routing pipelines, SLA warnings, feedback grids, and automatic responses.",
    price: "$45/mo",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=600&h=400",
    iconName: "HelpCircle",
    targetSegment: "Customer-facing Businesses",
    coreModule: "Helpdesk & Ticketing",
    basePrice: "$69/mo",
    offerPrice: "$45/mo",
    features: [
      "Dynamic Ticket Route Pipelines",
      "SLA Deadline Warn Indicators",
      "Customer Feedback Grids",
      "Automated Knowledge Base Sync",
      "Interactive Agent Live Chats",
      "Full Resolution Reports"
    ]
  }
];

export const SERVICES_DATA = [
  {
    id: "website-dev",
    title: "Website Development",
    icon: "Globe",
    price: "₹800 / hour",
    description: "Build gorgeous, lightning-fast static or dynamic corporate frontends using state-of-the-art Web frameworks.",
    features: [
      "Tailwind Styling Framework",
      "Vite/Next.js Architecture",
      "Sub-second Load Times"
    ]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development (iOS & Android)",
    icon: "Smartphone",
    price: "₹1,500 / hour",
    description: "Design and write high-performance native-feel Android & iOS applications using React Native and Flutter.",
    features: [
      "React Native / Flutter Stack",
      "Zero-lag Touch Interaction",
      "Apple & Play Store Deployments"
    ]
  },
  {
    id: "custom-dev",
    title: "Custom Software Development",
    icon: "Code",
    price: "₹1,500 / hour",
    description: "Develop high-performance backend, API endpoints, microservices, and unique enterprise systems.",
    features: [
      "Express & Node.js Rest backends",
      "Secure JWT Authorization",
      "Clean Layered Code Paths"
    ]
  },
  {
    id: "erpnext-implementation",
    title: "ERPNext Implementation",
    icon: "Layers",
    price: "₹49,000 / project",
    description: "Provision, configure, customize, and self-host tailored ERPNext servers for various industry scales.",
    features: [
      "Custom DocTypes & Scripts",
      "Legacy Database Migrations",
      "Direct ERPNext Module Syncs"
    ]
  },
  {
    id: "erp-consultation",
    title: "ERP Consultation",
    icon: "Target",
    price: "₹1,500 / hour",
    description: "Assess operational workflows to design optimal system flows, workflows, and database schemas.",
    features: [
      "Operational Workflows Audit",
      "Bottleneck Assessment Records",
      "Standard ERP Resource Maps"
    ]
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    icon: "Palette",
    price: "₹800 / hour",
    description: "Create highly professional design systems and prototypes in Figma with extreme visual taste.",
    features: [
      "Figma Component Libraries",
      "Dark/Light Design Tokens",
      "Interactive Prototype Storyboards"
    ]
  },
  {
    id: "api-integration",
    title: "API Integration & Third-Party Systems",
    icon: "Cpu",
    price: "₹1,500 / hour",
    description: "Securely connect your core databases, CRM accounts, Stripe gateways, or warehouse APIs.",
    features: [
      "Secure Payment Gateways Sync",
      "Custom Webhooks Event Pipelines",
      "Third-Party OAuth Adapters"
    ]
  },
  {
    id: "cloud-deployment",
    title: "Cloud Deployment & Support",
    icon: "Cloud",
    price: "₹2,500 / month",
    description: "Deploy your systems to AWS, GCP, Vercel, or Cloud Run using secure, production-grade infrastructure.",
    features: [
      "AWS & GCP Cloud Containers",
      "Modern Dockerization",
      "24/7 Automated System Monitors"
    ]
  }
];

export const TEAM_DATA = [
  {
    name: "Ganapathy Ram",
    role: "Founding Partner / Solutions Architect",
    bio: "Overlooking system architectures, robust cloud design patterns, and enterprise ERPNext setups.",
    image: ganapathyImage
  },
  {
    name: "Punitha ayilya",
    role: "VP of Experience Design",
    bio: "Sculpting visual languages, custom user grids, and elegant interface micro-interactions.",
    image: punithaImage
  },
  {
    name: "Mohan kumar",
    role: "Head of Platform Engineering",
    bio: "Pioneering highly reliable client-side state engines, API proxies, and secure real-time syncs.",
    image: mohanImage
  },
  {
    name: "Sibi Lokesh Anandhapadmanapan",
    role: "Lead Software Craftsman",
    bio: "Writing clean functional React components, responsive grids, and bulletproof native app layers.",
    image: sibiImage
  },
  {
    name: "Kanishka",
    role: "Product Quality Specialist",
    bio: "Securing end-to-end continuous integrity across database migrations, core schemas, and deployments.",
    image: kanishkaImage
  }
];

export const STATS_DATA = [
  { id: "stat-1", value: "99.99%", label: "Uptime SLA" },
  { id: "stat-2", value: "340+", label: "Products Shipped" },
  { id: "stat-3", value: "<15ms", label: "Consensus Syncs" },
  { id: "stat-4", value: "SOC-2", label: "Compliance Certified" },
  { id: "stat-5", value: "1.2M+", label: "Lines Audited" },
  { id: "stat-6", value: "Zero", label: "Leaks Detected" }
];

export const TESTIMONIALS_DATA = [
  {
    id: "test-rajesh",
    name: "Rajesh Kumar",
    company: "Principal, Sunrise Academy",
    quote: "Zyvone completely transformed how we manage our school operations. The Zyvone Education platform is intuitive, fast, and the support team is exceptional.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: "test-priya",
    name: "Priya Sundaram",
    company: "COO, TechFab Industries",
    quote: "We implemented Zyvone ERP for our manufacturing unit and the results exceeded our expectations. Inventory tracking and reporting are now seamless.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
  },
  {
    id: "test-arjun",
    name: "Arjun Mehta",
    company: "Sales Director, GrowthBridge Consulting",
    quote: "The Zyvone CRM helped our sales team close 40% more deals in the first quarter. Highly recommended for any growing business.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120"
  }
];

export const FAQS_DATA = [
  {
    question: "Why choose Zyvone?",
    answer: "Zyvone is a dual-model technology company focused on delivering pristine, tailor-made SaaS modules built on ERPNext alongside custom enterprise designs, animations, frontends, and native-grade mobile apps of extreme craftsmanship."
  },
  {
    question: "Do you provide ERP customization?",
    answer: "Yes, we specialize in complete ERPNext setups. We extend ERPNext by writing python backend overrides, robust JavaScript controllers, custom printing workflows, and connecting legacy accounting databases cleanly."
  },
  {
    question: "Do you develop mobile apps?",
    answer: "Yes, we design and deploy responsive, native-feeling Android & iOS applications using React Native and Flutter, integrating smoothly with your backend APIs, device sensors, and notifications."
  },
  {
    question: "Can you support existing ERP systems?",
    answer: "Absolutely. We offer complete migration from older installations, performance audit tune-ups, container orchestration setups, and priority hosting SLAs."
  },
  {
    question: "What industries do you serve?",
    answer: "We deliver specialized digital infrastructure to startups, small-to-medium enterprises, heavy manufacturing companies, academic institutions, retail businesses, and medical healthcare networks."
  },
  {
    question: "Do you offer post-deployment support?",
    answer: "Yes, we prioritize extreme service availability with monthly SLAs, critical security patching, server scaling, automated backup monitors, and emergency Discord/Slack dev pipelines."
  }
];

export const productsData = PRODUCTS_DATA;
export const servicesData = SERVICES_DATA;
export const teamMembers = TEAM_DATA;
export const testimonialsData = TESTIMONIALS_DATA;
