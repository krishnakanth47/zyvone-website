import React from "react";
import logoPng from "../assets/logo.png";

export function LogoIcon({ className = "h-11 w-auto" }) {
  return (
    <img
      src={logoPng}
      alt="Zyvone Logo"
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}

export default function Logo({ className = "", isDark = false, withTagline = false, iconOnly = false, taglineClassName = "" }) {
  if (iconOnly) {
    return <LogoIcon className="h-14 w-auto" />;
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Premium Image Logo from src/assets/logo.png */}
      <img
        src={logoPng}
        alt="Zyvone Technologies Logo"
        className="h-[36px] xs:h-[40px] sm:h-[46px] md:h-[56px] w-auto object-contain flex-shrink-0 transition-transform duration-300 hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Optional Tagline displayed on footer/detailed branding block */}
      {withTagline && (
        <div className={`flex flex-col justify-center leading-tight tracking-wider border-l border-slate-350 dark:border-slate-700 pl-2.5 ml-1.5 sm:pl-3 sm:ml-2 uppercase text-left ${taglineClassName}`}>
          <span className="font-sans font-black text-[12px] sm:text-[13px] md:text-[14px]">
            <span className="text-[#662D91]">ZYV</span>
            <span className="text-[#000000] dark:text-white">ONE</span>
          </span>
          <span className="font-sans font-bold text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.14em] text-[#662D91] mt-0.5">
            TECHNOLOGIES
          </span>
        </div>
      )}
    </div>
  );
}
