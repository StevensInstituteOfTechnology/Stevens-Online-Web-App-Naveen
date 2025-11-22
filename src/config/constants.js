// Booking and scheduling URLs
export const BOOKING_URLS = {
  SCHEDULE_CALL: 'https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled',
};

// Contact information for Stevens Online programs
export const CONTACT_INFO = {
  PHONE: '201-216-3805',
  PHONE_DISPLAY: '201.216.3805', // formatted for display
  PHONE_LINK: 'tel:+12012163805', // formatted for tel: links
  EMAIL: 'onlineadmissions@stevens.edu',
  EMAIL_LINK: 'mailto:onlineadmissions@stevens.edu',
  
  // Keep Financial Aid separate as it uses different contact
  FINANCIAL_AID: {
    PHONE: '201.216.3400',
    PHONE_LINK: 'tel:+12012163400',
    EMAIL: 'financialaid@stevens.edu',
    EMAIL_LINK: 'mailto:financialaid@stevens.edu'
  }
};

// Key Dates & Deadlines constants
export const KEY_DATES = {
  TERM: {
    name: 'Spring 2026',
    nameUppercase: 'SPRING 2026',
    year: '2026',
    season: 'Spring'
  },
  EARLY_SUBMIT: {
    date: 'November 20, 2025',
    details: 'Deposit Waiver* and Application Fee Waiver Available.'
  },
  PRIORITY_SUBMIT: {
    date: 'December 15, 2025',
    details: 'Application Fee Waiver Available and Early Application Review.'
  },
  FINAL_SUBMIT: {
    date: 'January 10, 2026',
    details: 'Final application deadline for Spring 2026 term.'
  },
  START_OF_CLASSES: {
    date: 'January 20, 2026',
    details: 'Start of classes for Spring 2026 term.'
  }
};
