// Static events data based on Stevens Institute of Technology information sessions
// Source: https://online.stevens.edu/

export const events = [
  {
    id: "info-session-1",
    title: "Online MBA Information Session",
    subtitle: "Learn about our AACSB-accredited Online MBA program",
    description: "Join us for an interactive information session to learn about the Stevens Online MBA program. Discover curriculum details, admission requirements, and career outcomes.",
    date: "2026-01-15T19:00:00Z",
    duration: 60,
    type: "webinar",
    status: "upcoming",
    registration_url: "https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled",
    program: "mba",
    presenter: {
      name: "Dr. Sarah Johnson",
      title: "Director of Online MBA Program",
      bio: "Dr. Johnson has over 15 years of experience in business education and online learning."
    },
    agenda: [
      "Program overview and curriculum",
      "Admission requirements and process",
      "Career services and outcomes",
      "Q&A session"
    ]
  },
  {
    id: "info-session-2",
    title: "M.S. Computer Science Program Overview",
    subtitle: "Explore our top-ranked online computer science program",
    description: "Discover the Stevens M.S. in Computer Science program, ranked #11 in New Jersey. Learn about specializations, faculty, and career opportunities.",
    date: "2026-01-22T18:30:00Z",
    duration: 60,
    type: "webinar",
    status: "upcoming",
    registration_url: "https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled",
    program: "mscs",
    presenter: {
      name: "Prof. Michael Chen",
      title: "Graduate Program Director",
      bio: "Prof. Chen is a leading researcher in artificial intelligence and machine learning."
    },
    agenda: [
      "Program specializations and tracks",
      "Faculty research and expertise",
      "Industry partnerships and internships",
      "Alumni success stories"
    ]
  },
  {
    id: "info-session-3",
    title: "Engineering Management Program Session",
    subtitle: "Bridge technology and business with our M.Eng. program",
    description: "Learn how the Stevens M.Eng. in Engineering Management can advance your career at the intersection of technology and business leadership.",
    date: "2026-01-29T19:00:00Z",
    duration: 60,
    type: "webinar",
    status: "upcoming",
    registration_url: "https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled",
    program: "mem",
    presenter: {
      name: "Dr. Robert Martinez",
      title: "Engineering Management Faculty",
      bio: "Dr. Martinez brings 20 years of industry experience in engineering leadership roles."
    },
    agenda: [
      "Technology-business interface skills",
      "Leadership and management training",
      "Capstone project opportunities",
      "Career advancement paths"
    ]
  }
];

export const Event = {
  list: (sortBy = "-date", limit = null) => {
    return new Promise((resolve) => {
      let sortedEvents = [...events];
      
      // Sort logic
      if (sortBy === "-date") {
        sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === "date") {
        sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      
      // Apply limit
      if (limit) {
        sortedEvents = sortedEvents.slice(0, limit);
      }
      
      // Simulate API delay
      setTimeout(() => resolve(sortedEvents), 100);
    });
  },
  
  filter: (filters = {}, sortBy = "-date", limit = null) => {
    return new Promise((resolve) => {
      let filteredEvents = [...events];
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        filteredEvents = filteredEvents.filter(event => event[key] === filters[key]);
      });
      
      // Sort logic
      if (sortBy === "-date") {
        filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === "date") {
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      
      // Apply limit
      if (limit) {
        filteredEvents = filteredEvents.slice(0, limit);
      }
      
      // Simulate API delay
      setTimeout(() => resolve(filteredEvents), 100);
    });
  },
  
  get: (id) => {
    return new Promise((resolve, reject) => {
      const event = events.find(e => e.id === id);
      setTimeout(() => {
        if (event) {
          resolve(event);
        } else {
          reject(new Error(`Event with id ${id} not found`));
        }
      }, 100);
    });
  }
};
