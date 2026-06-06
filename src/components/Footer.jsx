import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useTheme } from './ThemeContext';
import Logo from './Logo';

const QUICK_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Contact',  to: '/contact' },
];

export default function Footer() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Helper inside component to render icons safely via string lookup
  const renderIcon = (iconName, tailwindClasses = '') => {
    const Component = Icons[iconName] || Icons.HelpCircle;
    return <Component className={tailwindClasses} size={16} strokeWidth={1.8} />;
  };

  return (
    <footer
      id="main-footer"
      className={`new_footer_area border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-[#030308] text-slate-300 border-slate-900' 
          : 'bg-[#fbfbfd] text-slate-700 border-slate-200'
      }`}
    >
      {/* ── Top accent line ── */}
      <div className="h-[2px] w-full bg-linear-to-r from-indigo-500 via-purple-500 to-amber-500" />

      {/* ── Animated Footer Top Content ── */}
      <div className="new_footer_top">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

            {/* ── Column 1: Get in Touch & Brand ── */}
            <div className="space-y-4">
              <Link to="/" id="footer-logo-target" className="flex items-center group w-fit cursor-pointer">
                <Logo withTagline={true} />
              </Link>
              <p className={`text-sm leading-relaxed font-light ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Don’t miss any updates. Subscribe now to receive curated digital releases, SaaS product launches, and infrastructure insights.
              </p>
              
              <div className="pt-3">
                {subscribed ? (
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono font-medium p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 max-w-xs">
                    {renderIcon('CheckCircle', 'w-4 h-4 text-emerald-500')}
                    <span>Voucher Routed Successfully!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Corporate Email Address"
                      className={`w-full px-3.5 py-2 text-xs rounded-lg outline-none transition-all font-sans border ${
                        isDark 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:bg-slate-950' 
                          : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer font-sans"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Column 2: Quick Navigation ── */}
            <div className="flex flex-col gap-4 pl-0 lg:pl-6">
              <h3 className={`text-sm font-semibold tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
                Navigation Map
              </h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'HOME', to: '/' },
                  { label: 'ABOUT', to: '/about' },
                  { label: 'PRODUCTS', to: '/products' },
                  { label: 'SERVICE', to: '/services' },
                  { label: 'CONTACTS', to: '/contact' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.to}
                      className={`text-xs font-semibold tracking-wider transition-colors duration-200 group inline-flex items-center gap-1.5 ${
                        isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-650 hover:text-indigo-600'
                      }`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-500">•</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Team Solutions / Socials ── */}
            <div className="flex flex-col gap-4 pl-0 lg:pl-6">
              <h3 className={`text-sm font-semibold tracking-wider font-mono ${isDark ? 'text-slate-400' : 'text-slate-800'}`}>
                Team Solutions
              </h3>
              <p className={`text-sm leading-relaxed font-light ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Connect with our coordinate vectors across developer nodes and social architectures:
              </p>
              
              <div className="flex gap-2 pt-2">
                {[
                  { name: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/' },
                  { name: 'Github', icon: 'Github', url: 'https://github.com/' },
                  { name: 'Linkedin', icon: 'Linkedin', url: 'https://www.linkedin.com/feed/' }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    className={`flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-350 hover:scale-105 ${
                      isDark 
                        ? 'bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white border-slate-800 hover:border-indigo-600' 
                        : 'bg-white hover:bg-indigo-600 text-slate-600 hover:text-white border-slate-200 hover:border-indigo-600'
                    }`}
                  >
                    {renderIcon(item.icon, 'w-4 h-4')}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Animated Background Illustration Assets ── */}
        <div className="footer_bg">
          <div className="footer_bg_one"></div>
          <div className="footer_bg_two"></div>
        </div>
      </div>

      {/* ── Footer Bottom Credit Coordinates ── */}
      <div className={`border-t transition-colors duration-300 relative z-20 ${
        isDark 
          ? 'border-slate-900/60 bg-[#020205]' 
          : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs text-center sm:text-left font-light ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            © {currentYear} Zyvone Technologies. All rights reserved.
          </p>
          <p className="text-xs text-center sm:text-right font-light flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
            <span>Made by</span>
            <a 
              href="https://www.linkedin.com/in/nirupathunga-m-46b744322/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
            >
              Nirupathunga_M
            </a>
            <span>and</span>
            <a 
              href="https://krishnakanth-portfolio47.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
            >
              Krishnakanth_J
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
