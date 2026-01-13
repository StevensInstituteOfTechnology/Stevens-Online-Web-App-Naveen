// Booking and scheduling URLs
export const BOOKING_URLS = {
  SCHEDULE_CALL:
    "https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled",
};

// Contact information for Stevens Online programs
export const CONTACT_INFO = {
  PHONE: "201-216-3805",
  PHONE_DISPLAY: "201.216.3805", // formatted for display
  PHONE_LINK: "tel:+12012163805", // formatted for tel: links
  EMAIL: "onlineadmissions@stevens.edu",
  EMAIL_LINK: "mailto:onlineadmissions@stevens.edu",

  // Keep Financial Aid separate as it uses different contact
  FINANCIAL_AID: {
    PHONE: "201.216.3400",
    PHONE_LINK: "tel:+12012163400",
    EMAIL: "financialaid@stevens.edu",
    EMAIL_LINK: "mailto:financialaid@stevens.edu",
  },
};

// Key Dates & Deadlines constants

// Spring 2, 2026 - For MEADS and PGCs (Certificates)
export const KEY_DATES_SPRING2 = {
  TERM: {
    name: "Spring 2 2026",
    nameUppercase: "SPRING 2 2026",
    year: "2026",
    season: "Spring 2",
  },
  EARLY_SUBMIT: {
    date: "January 31, 2026",
    details: "Deposit Waiver* and Application Fee Waiver Available.",
  },
  PRIORITY_SUBMIT: {
    date: "March 1, 2026",
    details: "Application Fee Waiver Available and Early Application Review.",
  },
  FINAL_SUBMIT: {
    date: "March 7, 2026",
    details: "Final application deadline for Spring 2 2026 term.",
  },
  START_OF_CLASSES: {
    date: "March 17, 2026",
    details: "Start of classes for Spring 2 2026 term.",
  },
};

// Summer 1, 2026 - For MSCS and MBA
export const KEY_DATES_SUMMER = {
  TERM: {
    name: "Summer 2026",
    nameUppercase: "SUMMER 2026",
    year: "2026",
    season: "Summer",
  },
  EARLY_SUBMIT: {
    date: "April 3, 2026",
    details: "Deposit Waiver* and Application Fee Waiver Available.",
  },
  PRIORITY_SUBMIT: {
    date: "May 1, 2026",
    details: "Application Fee Waiver Available and Early Application Review.",
  },
  FINAL_SUBMIT: {
    date: "May 8, 2026",
    details: "Final application deadline for Summer 2026 term.",
  },
  START_OF_CLASSES: {
    date: "May 19, 2026",
    details: "Start of classes for Summer 2026 term.",
  },
};

// Fall 1, 2026 - For MEM (Engineering Management)
export const KEY_DATES_FALL = {
  TERM: {
    name: "Fall 2026",
    nameUppercase: "FALL 2026",
    year: "2026",
    season: "Fall",
  },
  EARLY_SUBMIT: {
    date: "July 3, 2026",
    details: "Deposit Waiver* and Application Fee Waiver Available.",
  },
  PRIORITY_SUBMIT: {
    date: "July 31, 2026",
    details: "Application Fee Waiver Available and Early Application Review.",
  },
  FINAL_SUBMIT: {
    date: "August 21, 2026",
    details: "Final application deadline for Fall 2026 term.",
  },
  START_OF_CLASSES: {
    date: "September 1, 2026",
    details: "Start of classes for Fall 2026 term.",
  },
};

// Default KEY_DATES points to the soonest upcoming term (Spring 2)
// Used by Home page, Admissions page, and as fallback
export const KEY_DATES = KEY_DATES_SPRING2;
