import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PricingChatbot from './components/PricingChatbot';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import IntroVideoOverlay from './components/IntroVideoOverlay';

function AnimatedRoutes() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <GridBackgroundWrapper />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex-grow flex flex-col"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function GridBackgroundWrapper() {
  return (
    <div 
      className="fixed inset-0 -z-[15] pointer-events-none bg-grid-gradient transition-all duration-300"
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Cinematic Responsive Intro Video Splash Screen */}
        <IntroVideoOverlay />
        
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#030303] text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
          {/* Responsive Navigation Header */}
          <Navbar />

          {/* Dynamic Transition Area for Pages */}
          <main className="flex-grow flex flex-col">
            <AnimatedRoutes />
          </main>

          {/* Floating Pricing Chatbot Widget in Bottom Right */}
          <PricingChatbot />

          {/* General Brand Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
