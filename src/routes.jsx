import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import "@/data/blogs.json";

// Page imports
import Home from "@/pages/Home";
import ASAP from "@/pages/ASAP";
import AcceleratedApplication from "@/pages/AcceleratedApplication";
import Tuition from "@/pages/Tuition";
import RequestInfo from "@/pages/RequestInfo";
import MBA from "@/pages/MBA";
import MSCS from "@/pages/MSCS";
import MEM from "@/pages/MEM";
import MEADS from "@/pages/MEADS";
import ExploreMBA from "@/pages/ExploreMBA";
import ExploreMEM from "@/pages/ExploreMEM";
import ExploreMEADS from "@/pages/ExploreMEADS";
import ExploreMSCS from "@/pages/ExploreMSCS";
import ExploreMSAI from "@/pages/ExploreMSAI";
import ComparePrograms from "@/pages/ComparePrograms";
import Events from "@/pages/Events";
import CertificateEnterpriseAI from "@/pages/CertificateEnterpriseAI";
import CertificateAppliedDataScience from "@/pages/CertificateAppliedDataScience";
import ExploreCertEnterpriseAI from "@/pages/ExploreCertEnterpriseAI";
import ExploreCertAppliedDataScience from "@/pages/ExploreCertAppliedDataScience";
import Blog from "@/pages/Blog";
import EngineeringEssentials from "@/pages/EngineeringEssentials";
import MasteringComputerScience from "@/pages/MasteringComputerScience";
import OnlineMBASuccess from "@/pages/OnlineMBASuccess";
import OtherPrograms from "@/pages/OtherPrograms";
import ProfessionalEducation from "@/pages/ProfessionalEducation";
import Certificates from "@/pages/Certificates";
import OnlineExperience from "@/pages/OnlineExperience";
import TuitionOutcomes from "@/pages/TuitionOutcomes";
import Admissions from "@/pages/Admissions";
import EmployerSponsorship from "@/pages/EmployerSponsorship";
// import CorporatePartners from "@/pages/CorporatePartners";
// import CorporateStudents from "@/pages/CorporateStudents";
import NotFound from "@/pages/NotFound";

// Redirect component for blog detail pages without trailing slash
function BlogNoSlashRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}/`} replace />;
}

// Generate blog routes dynamically
const generateBlogRoutes = () => {
  const routes = [];
  
  // Main blog listing
  routes.push({
    path: '/blog/',
    element: <Blog />
  });

  // Individual blog posts - use parameterized route
  routes.push({
    path: '/blog/:slug/',
    element: <Blog />
  });

  // Blog detail without trailing slash - redirect
  routes.push({
    path: '/blog/:slug',
    element: <BlogNoSlashRedirect />
  });

  return routes;
};

// Generate topic/category routes dynamically
const generateTopicRoutes = () => {
  const routes = [];
  
  // Engineering Essentials topic routes
  routes.push({
    path: '/topics/engineering-essentials/',
    element: <EngineeringEssentials />
  });
  
  routes.push({
    path: '/topics/engineering-essentials/:slug/',
    element: <EngineeringEssentials />
  });

  // Mastering Computer Science topic routes
  routes.push({
    path: '/topics/mastering-computer-science/',
    element: <MasteringComputerScience />
  });
  
  routes.push({
    path: '/topics/mastering-computer-science/:slug/',
    element: <MasteringComputerScience />
  });

  // Online MBA Success topic routes
  routes.push({
    path: '/topics/online-mba-success/',
    element: <OnlineMBASuccess />
  });
  
  routes.push({
    path: '/topics/online-mba-success/:slug/',
    element: <OnlineMBASuccess />
  });

  // Uncategorized/Other Programs topic routes
  routes.push({
    path: '/topics/uncategorized/',
    element: <OtherPrograms />
  });
  
  routes.push({
    path: '/topics/uncategorized/:slug/',
    element: <OtherPrograms />
  });

  return routes;
};

// Main routes configuration
export const routes = [
  // Home page
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Home',
    element: <Home />
  },

  // ASAP page
  {
    path: '/asap/',
    element: <ASAP />
  },
  {
    path: '/ASAP/',
    element: <Navigate to="/asap/" replace />
  },
  {
    path: '/asap',
    element: <Navigate to="/asap/" replace />
  },
  {
    path: '/ASAP',
    element: <Navigate to="/asap/" replace />
  },

  // Accelerated Application page
  {
    path: '/accelerated-application/',
    element: <AcceleratedApplication />
  },
  {
    path: '/accelerated-application',
    element: <Navigate to="/accelerated-application/" replace />
  },

  // Tuition pages
  {
    path: '/tuition-and-financial-aid/',
    element: <Tuition />
  },
  {
    path: '/Tuition',
    element: <Navigate to="/tuition-and-financial-aid/" replace />
  },
  {
    path: '/tuition',
    element: <Navigate to="/tuition-and-financial-aid/" replace />
  },

  // Request Info
  {
    path: '/request-information/',
    element: <RequestInfo />
  },
  {
    path: '/RequestInfo',
    element: <Navigate to="/request-information/" replace />
  },
  {
    path: '/requestinfo',
    element: <Navigate to="/request-information/" replace />
  },

  // MBA program
  {
    path: '/online-mba/',
    element: <MBA />
  },
  {
    path: '/MBA',
    element: <Navigate to="/online-mba/" replace />
  },

  // MSCS program
  {
    path: '/online-masters-computer-science-mscs/',
    element: <MSCS />
  },
  {
    path: '/MSCS',
    element: <Navigate to="/online-masters-computer-science-mscs/" replace />
  },

  // MEM program
  {
    path: '/online-masters-engineering-management/',
    element: <MEM />
  },
  {
    path: '/MEM',
    element: <Navigate to="/online-masters-engineering-management/" replace />
  },

  // MSDSE program
  {
    path: '/online-masters-engineering-applied-data-science/',
    element: <MEADS />
  },
  {
    path: '/MEADS',
    element: <Navigate to="/online-masters-engineering-applied-data-science/" replace />
  },

  // Certificate Programs
  {
    path: '/certificates/enterprise-ai/',
    element: <CertificateEnterpriseAI />
  },
  {
    path: '/certificates/applied-data-science-foundations/',
    element: <CertificateAppliedDataScience />
  },

  // Compare Programs
  {
    path: '/compare-our-programs/',
    element: <ComparePrograms />
  },
  {
    path: '/ComparePrograms',
    element: <Navigate to="/compare-our-programs/" replace />
  },

  // Events
  {
    path: '/events/',
    element: <Events />
  },
  {
    path: '/Events',
    element: <Navigate to="/events/" replace />
  },
  {
    path: '/events',
    element: <Navigate to="/events/" replace />
  },

  // Blog routes (dynamically generated)
  ...generateBlogRoutes(),

  // Topic routes (dynamically generated)
  ...generateTopicRoutes(),

  // Professional Education
  {
    path: '/professionaleducation/',
    element: <ProfessionalEducation />
  },
  {
    path: '/ProfessionalEducation',
    element: <Navigate to="/professionaleducation/" replace />
  },
  {
    path: '/professionaleducation',
    element: <Navigate to="/professionaleducation/" replace />
  },

  // Certificates
  {
    path: '/Certificates',
    element: <Certificates />
  },

  // Online Experience
  {
    path: '/online-learning-experience/',
    element: <OnlineExperience />
  },
  {
    path: '/OnlineExperience',
    element: <Navigate to="/online-learning-experience/" replace />
  },
  {
    path: '/OnlineLearning',
    element: <Navigate to="/online-learning-experience/" replace />
  },

  // Tuition Outcomes
  {
    path: '/TuitionOutcomes',
    element: <TuitionOutcomes />
  },

  // Admissions
  {
    path: '/admissions/',
    element: <Admissions />
  },
  {
    path: '/Admissions',
    element: <Navigate to="/admissions/" replace />
  },
  {
    path: '/admissions',
    element: <Navigate to="/admissions/" replace />
  },

  // Employer Sponsorship
  {
    path: '/employer-sponsorship/',
    element: <EmployerSponsorship />
  },
  {
    path: '/employer-sponsorship',
    element: <Navigate to="/employer-sponsorship/" replace />
  },

  // Corporate Partnership Pages
  // {
  //   path: '/corporate-partners/',
  //   element: <CorporatePartners />
  // },
  // {
  //   path: '/corporate-partners',
  //   element: <Navigate to="/corporate-partners/" replace />
  // },
  // {
  //   path: '/corporate-students/',
  //   element: <CorporateStudents />
  // },
  // {
  //   path: '/corporate-students',
  //   element: <Navigate to="/corporate-students/" replace />
  // },

  // Explore program pages
  {
    path: '/explore/online-mba/',
    element: <ExploreMBA />
  },
  {
    path: '/explore/online-masters-engineering-management/',
    element: <ExploreMEM />
  },
  {
    path: '/explore/online-masters-eng-applied-data-science/',
    element: <ExploreMEADS />
  },
  {
    path: '/explore/online-masters-computer-science/',
    element: <ExploreMSCS />
  },
  {
    path: '/explore/ai-masters-computer-science/',
    element: <ExploreMSAI />
  },
  
  // Explore certificate pages
  {
    path: '/explore/certificates/enterprise-ai/',
    element: <ExploreCertEnterpriseAI />
  },
  {
    path: '/explore/certificates/applied-data-science-foundations/',
    element: <ExploreCertAppliedDataScience />
  },
  
  // 404 Not Found page
  {
    path: '/page-not-found/',
    element: <NotFound />
  },
  
  // Catch-all route - must be last
  {
    path: '*',
    element: <Navigate to="/page-not-found/" replace />
  }
];

export default routes;

