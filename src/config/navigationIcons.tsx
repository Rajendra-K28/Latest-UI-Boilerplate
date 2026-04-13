// Navigation icon components
export const NavigationIcons = {
  // Top-level client nav
  securityDashboard: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axis */}
      <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bars */}
      <rect x="4" y="9" width="2" height="5" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="7" width="2" height="7" rx="0.5" fill="currentColor" />
      <rect x="13" y="5" width="2" height="9" rx="0.5" fill="currentColor" />
      {/* Trend line */}
      <path
        d="M3.5 10.5L7 8L10.5 9.5L14 6.5L16.5 7.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  
  vulnerabilities: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2L3 5.5V10C3 13.5 5.5 16.9 10 18C14.5 16.9 17 13.5 17 10V5.5L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 7V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="13" r="0.9" fill="currentColor" />
    </svg>
  ),

  scanComponents: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top block */}
      <rect x="4" y="4" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="5.5" r="0.6" fill="currentColor" />
      <circle cx="8" cy="5.5" r="0.6" fill="currentColor" />
      {/* Middle block */}
      <rect x="4" y="8.5" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="10" r="0.6" fill="currentColor" />
      <circle cx="8" cy="10" r="0.6" fill="currentColor" />
      {/* Bottom block */}
      <rect x="4" y="13" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="14.5" r="0.6" fill="currentColor" />
      <circle cx="8" cy="14.5" r="0.6" fill="currentColor" />
    </svg>
  ),

  scans: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 12L15.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  projects: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 8L10 5L16 8L10 11L4 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 11L10 14L16 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14L10 17L16 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  
  dashboard: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  consultants: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  analytics: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10L7 5L12 10L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  overview: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  timeline: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10L7 5L12 10L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  compliance: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16L5 12L6.5 10.5L9 13L14.5 7.5L16 9L9 16Z" fill="currentColor"/>
    </svg>
  ),
  evidence: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3H12L17 8V17C17 17.5523 16.5523 18 16 18H5C4.44772 18 4 17.5523 4 17V5C4 4.44772 4.44772 4 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3V8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  actionPoints: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="3" fill="currentColor"/>
    </svg>
  ),
  
  vulnerabilityMgmt: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2L3 6V10C3 14.5 6.5 18.5 10 19C13.5 18.5 17 14.5 17 10V6L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 7V11M10 13.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  reports: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  exposureMonitor: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2L3 6V10C3 14.5 6.5 18.5 10 19C13.5 18.5 17 14.5 17 10V6L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 7V11M10 13.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  settings: (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
} as const;

export type NavigationIconId = keyof typeof NavigationIcons;
