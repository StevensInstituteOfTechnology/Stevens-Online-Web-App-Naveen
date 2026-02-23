
// Mock storage for development (replace with real API endpoint later)
const mockLeads = [];

export const LeadSubmission = {
  create: async (leadData) => {
    return new Promise((resolve, reject) => {
      try {
        // Validate required fields
        const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'zip_code', 'program_interest'];
        const missingFields = requiredFields.filter(field => !leadData[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Create lead object
        const lead = {
          id: Date.now().toString(),
          ...leadData,
          created_date: new Date().toISOString(),
          status: 'new'
        };
        
        // Store lead (mock storage for now)
        mockLeads.push(lead);
        
        // Log for development
        console.log('Lead submission captured:', lead);
        
        // Simulate API delay
        setTimeout(() => {
          resolve(lead);
        }, 500);
        
        // In production, you would:
        // 1. Send to your backend API
        // 2. Use Formspree, Netlify Forms, or similar service
        // 3. Send email notifications
        // 4. Integrate with CRM system
        
        // Example with fetch to your API:
        /*
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lead)
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit lead');
        }
        
        const result = await response.json();
        resolve(result);
        */
        
      } catch (error) {
        reject(error);
      }
    });
  },
  
  // Additional methods for future use
  list: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockLeads]), 100);
    });
  },
  
  get: (id) => {
    return new Promise((resolve, reject) => {
      const lead = mockLeads.find(l => l.id === id);
      setTimeout(() => {
        if (lead) {
          resolve(lead);
        } else {
          reject(new Error(`Lead with id ${id} not found`));
        }
      }, 100);
    });
  }
};

// Alternative form submission options for production:

// Option 1: Formspree integration
export const submitToFormspree = async (formData) => {
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  
  if (!FORMSPREE_ENDPOINT) {
    throw new Error('Formspree endpoint not configured');
  }
  
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  
  return response.json();
};

// Option 2: EmailJS integration (install with: npm install @emailjs/browser)
export const submitViaEmailJS = async (_formData) => {
  // This function is available but requires EmailJS to be installed
  // To use: npm install @emailjs/browser
  throw new Error('EmailJS not installed. Run: npm install @emailjs/browser');
  
  /* Uncomment after installing @emailjs/browser:
  try {
    const emailjs = await import('@emailjs/browser');
    
    const SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID;
    const USER_ID = process.env.VITE_EMAILJS_USER_ID;
    
    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      throw new Error('EmailJS configuration missing');
    }
    
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID);
  } catch (error) {
    console.error('EmailJS error:', error);
    throw new Error('Email service failed');
  }
  */
};

// Option 3: Netlify Forms (if deploying to Netlify)
export const submitToNetlify = async (formData) => {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'form-name': 'lead-capture',
      ...formData
    }).toString()
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  
  return response;
};
