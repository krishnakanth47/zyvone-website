import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, ShoppingBag, Briefcase, Mail, Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { AnimatePresence, motion } from 'motion/react';

const NAV_LINKS = [
  { label: 'Home',     to: '/',         icon: Home },
  { label: 'About',    to: '/about',    icon: Info },
  { label: 'Products', to: '/products', icon: ShoppingBag },
  { label: 'Services', to: '/services', icon: Briefcase },
  { label: 'Contact',  to: '/contact',  icon: Mail },
];

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: -16,
    rotateX: -12,
    transformPerspective: 1200,
    originY: 0,
    transition: {
      duration: 0.22,
      ease: [0.36, 0.07, 0.19, 0.97]
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 1200,
    originY: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 22,
      mass: 0.8,
      staggerChildren: 0.06,
      delayChildren: 0.04
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -12, filter: 'blur(3px)' },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const itemRefs = useRef([]);
  const menuRef = useRef(null);
  const [borderStyle, setBorderStyle] = useState({ transform: 'translate3d(0, 0, 0)' });

  // Find index of the currently active route
  const activeIndex = NAV_LINKS.findIndex(link => {
    if (link.to === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(link.to);
  });

  // Automatically update the sliding curve position on route or size adjustment
  useEffect(() => {
    const updateBorder = () => {
      const activeEl = itemRefs.current[activeIndex !== -1 ? activeIndex : 0];
      if (activeEl && menuRef.current) {
        const activeRect = activeEl.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        
        const borderEl = document.getElementById('navbar-menu-border');
        if (borderEl) {
          const borderWidth = borderEl.offsetWidth;
          const left = Math.floor(activeRect.left - menuRect.left - (borderWidth - activeRect.width) / 2);
          setBorderStyle({
            transform: `translate3d(${left}px, 0, 0)`
          });
        }
      }
    };

    updateBorder();
    const timer = setTimeout(updateBorder, 50);

    window.addEventListener('resize', updateBorder);
    return () => {
      window.removeEventListener('resize', updateBorder);
      clearTimeout(timer);
    };
  }, [activeIndex]);

  /* Adjust border header shadow on scroll and direction dynamics */
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 12) {
        setScrolled(false);
      } else {
        if (currentScrollY > lastScrollY) {
          setScrolled(true);
        } else if (currentScrollY < lastScrollY - 10) {
          setScrolled(false);
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock viewport scrolling while mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      id="main-header"
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500 ease-in-out
        ${scrolled && !open 
          ? 'w-[72px] sm:w-[80px] md:w-max' 
          : 'w-[92%] sm:w-[85%] md:w-max'
        }
      `}
    >
      <style>{`
        @keyframes textShimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .shimmer-title {
          background: linear-gradient(
            to right, 
            #662D91 0%, 
            #a855f7 25%, 
            #ec4899 50%, 
            #a855f7 75%, 
            #662D91 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 4s linear infinite;
        }
        .dark .shimmer-title {
          background: linear-gradient(
            to right, 
            #c084fc 0%, 
            #fdf4ff 25%, 
            #f472b6 50%, 
            #fdf4ff 75%, 
            #c084fc 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 4s linear infinite;
        }
      `}</style>
      <div
        className={`
          relative w-full
          transition-all duration-500
          bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-slate-800/80 shadow-md rounded-full
          ${scrolled ? 'shadow-lg bg-slate-50 dark:bg-[#0f172b] border-slate-300 dark:border-slate-700' : ''}
        `}
      >
        {/* Hidden SVG clipping path for Mauricio Bucardo wave */}
        <div className="svg-clip-container">
          <svg viewBox="0 0 202.9 45.5" width="0" height="0">
            <clipPath id="menu-clip" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
              <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
                c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
                c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
            </clipPath>
          </svg>
        </div>

        <div className={`
          flex items-center justify-between gap-6 lg:gap-10 h-14 sm:h-16 transition-all duration-500
          ${scrolled && !open ? 'px-2' : 'px-4 sm:px-6'}
        `}>

          {/* ── Brand Wordmark Link ── */}
          <Link
            id="brand-logo"
            to="/"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("play-intro-video"));
            }}
            className={`
              flex items-center group select-none cursor-pointer
              transition-all duration-700 ease-out
              md:relative md:left-0 md:top-auto md:translate-x-0 md:translate-y-0 md:rotate-0 md:scale-100
              ${scrolled && !open
                ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[720deg] scale-110 z-30'
                : 'absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 translate-x-0 rotate-0 scale-100 z-30'
              }
            `}
          >
            <Logo 
              withTagline={false} 
            />
          </Link>

          {/* Centered Mobile Title */}
          <div className={`
            absolute left-1/2 -translate-x-1/2 top-1/2 md:hidden flex items-center justify-center transition-all duration-500 z-20 select-none
            ${scrolled 
              ? 'opacity-0 scale-50 pointer-events-none translate-y-4 -translate-y-1/2' 
              : 'opacity-100 scale-100 pointer-events-auto -translate-y-1/2'
            }
          `}>
            <div className="flex flex-col justify-center items-center leading-tight tracking-wider uppercase text-center">
              <span className="font-sans font-black text-[15px] xs:text-[17px] sm:text-[19px]">
                <span className="text-[#662D91]">ZYV</span>
                <span className="text-[#000000] dark:text-white">ONE</span>
              </span>
              <span className="font-sans font-bold text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.14em] text-[#662D91] mt-0.5">
                TECHNOLOGIES
              </span>
            </div>
          </div>



          {/* ── Desktop Animated Bucardo Navigation ── */}
          <div 
            className="hidden md:block nav-menu-wrapper"
            style={{ '--timeOut': '0.15s' }}
          >
            <nav 
              ref={menuRef} 
              className="nav-menu-container" 
              aria-label="Animated Primary Navigation"
            >
              {NAV_LINKS.map((link, idx) => {
                const Icon = link.icon;
                const isActive = idx === activeIndex;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    ref={el => itemRefs.current[idx] = el}
                    className={`nav-menu-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="nav-menu-icon" />
                    <span className="nav-menu-label">{link.label}</span>
                  </Link>
                );
              })}
              <div 
                id="navbar-menu-border" 
                className="nav-menu-border" 
                style={borderStyle} 
              />
            </nav>
          </div>

          {/* ── Desktop Secondary Controls ── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              id="get-in-touch-desktop"
              to="/contact"
              className="
                inline-flex items-center gap-1.5
                rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide
                bg-black hover:bg-slate-900 active:bg-slate-950 dark:bg-white dark:hover:bg-slate-100 dark:active:bg-slate-200
                text-white dark:text-black
                shadow-md shadow-black/20 dark:shadow-white/10
                transition-all duration-200
                hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/20
                hover:-translate-y-0.5
                cursor-pointer
              "
            >
              Get in touch
            </Link>
          </div>

          {/* ── Mobile Layout Controls ── */}
          <div className={`
            flex md:hidden items-center gap-2 ml-auto
            transition-all duration-500 ease-in-out
            ${scrolled && !open 
              ? 'opacity-0 scale-50 pointer-events-none translate-x-10' 
              : 'opacity-100 scale-100 pointer-events-auto translate-x-0'
            }
          `}>
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="
                flex items-center justify-center
                h-8 w-8 rounded-full
                text-slate-700 dark:text-slate-200
                hover:bg-white/15 dark:hover:bg-white/10
                transition-colors duration-200
                cursor-pointer
              "
            >
              {open ? <X size={18} strokeWidth={2.2} /> : <Menu size={18} strokeWidth={2.2} />}
            </button>
          </div>

        </div>

        {/* ── Dropdown Slide Container (Mobile viewports) ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-white dark:bg-[#0f172b] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-black/25 overflow-hidden"
            >
              <nav className="flex flex-col px-4 pt-4 pb-5 gap-0.5" aria-label="Mobile Navigation">
                {NAV_LINKS.map(({ label, to, icon: Icon }, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <motion.div key={to} variants={itemVariants}>
                      <Link
                        to={to}
                        onClick={() => setOpen(false)}
                        className={`
                          flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold
                          transition-all duration-150 cursor-pointer
                          ${isActive
                            ? 'bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 text-purple-600 dark:text-purple-400 shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} className={isActive ? 'opacity-100' : 'opacity-60'} />
                          {label}
                        </div>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-sm" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div variants={itemVariants} className="mt-2 pt-3 border-t border-black/10 dark:border-white/15">
                  <Link
                    id="get-in-touch-mobile"
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="
                      flex items-center justify-center w-full
                      rounded-full px-4 py-2 text-sm font-semibold
                      bg-black hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100
                      text-white dark:text-black
                      transition-colors duration-200
                      shadow-md
                      cursor-pointer
                    "
                  >
                    Get in touch →
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
