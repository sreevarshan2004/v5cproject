import React from 'react';

export const DubaiIcon = ({ size = 64, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Burj Al Arab style icon */}
    <path d="M32 10C32 10 45 25 45 45H19C19 25 32 10 32 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 10V54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 54H49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 25H38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 35H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Sun and Clouds as in the image */}
    <circle cx="48" cy="15" r="3" stroke="currentColor" strokeWidth="1"/>
    <path d="M48 10V12" stroke="currentColor" strokeWidth="1"/>
    <path d="M48 18V20" stroke="currentColor" strokeWidth="1"/>
    <path d="M53 15H51" stroke="currentColor" strokeWidth="1"/>
    <path d="M45 15H43" stroke="currentColor" strokeWidth="1"/>
    <path d="M15 15C17 13 20 13 22 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M55 25C57 23 60 23 62 25" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

export const SharjahIcon = ({ size = 64, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Cityscape style icon */}
    <rect x="10" y="35" width="8" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="18" y="25" width="10" height="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="28" y="40" width="8" height="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="36" y="20" width="12" height="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="48" y="30" width="6" height="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Windows */}
    <line x1="13" y1="40" x2="13" y2="41" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="13" y1="45" x2="13" y2="46" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="22" y1="30" x2="22" y2="31" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="22" y1="35" x2="22" y2="36" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="22" y1="40" x2="22" y2="41" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="22" y1="45" x2="22" y2="46" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="41" y1="25" x2="41" y2="26" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="41" y1="30" x2="41" y2="31" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="41" y1="35" x2="41" y2="36" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="41" y1="40" x2="41" y2="41" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="41" y1="45" x2="41" y2="46" stroke="currentColor" strokeWidth="1.5"/>
    {/* Dome/Minaret */}
    <path d="M38 20L42 12L46 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MarjanIslandIcon = ({ size = 64, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Island/Land Base */}
    <path d="M15 45C15 45 20 48 32 48C44 48 49 45 49 45L45 52C45 52 40 54 32 54C24 54 19 52 19 52L15 45Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 45H49" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    
    {/* Buildings */}
    <rect x="25" y="25" width="6" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="31" y="32" width="4" height="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 38L25 38M22 42L25 42" stroke="currentColor" strokeWidth="1.5"/>
    
    {/* Building details (windows) */}
    <line x1="27" y1="28" x2="29" y2="28" stroke="currentColor" strokeWidth="1"/>
    <line x1="27" y1="31" x2="29" y2="31" stroke="currentColor" strokeWidth="1"/>
    <line x1="27" y1="34" x2="29" y2="34" stroke="currentColor" strokeWidth="1"/>
    <line x1="27" y1="37" x2="29" y2="37" stroke="currentColor" strokeWidth="1"/>
    <line x1="27" y1="40" x2="29" y2="40" stroke="currentColor" strokeWidth="1"/>

    {/* Cloud */}
    <path d="M42 22C44 22 46 24 46 26C46 28 44 30 42 30H40C38 30 37 28 37 26C37 24 38 22 40 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    
    {/* Stars/Sparkles */}
    <path d="M18 20L19 18L20 20L19 22L18 20Z" fill="currentColor" opacity="0.6"/>
    <path d="M14 25L15 24L16 25L15 26L14 25Z" fill="currentColor" opacity="0.6"/>
    <path d="M52 35L53 34L54 35L53 36L52 35Z" fill="currentColor" opacity="0.6"/>
  </svg>
);
