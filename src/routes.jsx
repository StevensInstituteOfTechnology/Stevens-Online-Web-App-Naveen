import { Navigate, useParams } from "react-router-dom";
import "@/data/blogs.json";

// Page imports
import Home from "@/pages/Home";
import {
  ASAP,
  AcceleratedApplication,
  Admissions,
  Tuition,
  TuitionOutcomes,
  RequestInfo,
  CorporatePartners,
  CorporateStudents,
  AlumniPGC,
  EmployerSponsorship,
  WorkforceDevelopmentHub,
  SiemensPage,
  PSEGPage,
  PSEGEnterpriseAIPage,
} from "@/pages/discover";
import { MBA, MSCS, MEM, MEADS, ComparePrograms } from "@/pages/degrees";
import {
  ExploreMBA,
  ExploreMEM,
  ExploreMEADS,
  ExploreMSCS,
  ExploreMSAI,
  ExploreCertEnterpriseAI,
  ExploreCertAppliedDataScience,
} from "@/pages/explore";
import {
  CertificateEnterpriseAI,
  CertificateAppliedDataScience,
  Certificates,
} from "@/pages/certificates";
import {
  Blog,
  AIEmergingTechnology,
  EngineeringEssentials,
  MasteringComputerScience,
  OnlineMBASuccess,
  OtherPrograms,
} from "@/pages/blog";
import { OnlineExperience, Events, StudentOutcomes } from "@/pages/about";
import ProfessionalEducation from "@/pages/ProfessionalEducation";
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
    path: "/blog/",
    element: <Blog />,
  });

  // Individual blog posts - use parameterized route
  routes.push({
    path: "/blog/:slug/",
    element: <Blog />,
  });

  // Blog detail without trailing slash - redirect
  routes.push({
    path: "/blog/:slug",
    element: <BlogNoSlashRedirect />,
  });

  return routes;
};

// Generate topic/category routes dynamically
const generateTopicRoutes = () => {
  const routes = [];

  // AI & Emerging Technology topic routes
  routes.push({
    path: "/topics/ai-emerging-technology/",
    element: <AIEmergingTechnology />,
  });

  routes.push({
    path: "/topics/ai-emerging-technology/:slug/",
    element: <AIEmergingTechnology />,
  });

  // Engineering Essentials topic routes
  routes.push({
    path: "/topics/engineering-essentials/",
    element: <EngineeringEssentials />,
  });

  routes.push({
    path: "/topics/engineering-essentials/:slug/",
    element: <EngineeringEssentials />,
  });

  // Mastering Computer Science topic routes
  routes.push({
    path: "/topics/mastering-computer-science/",
    element: <MasteringComputerScience />,
  });

  routes.push({
    path: "/topics/mastering-computer-science/:slug/",
    element: <MasteringComputerScience />,
  });

  // Online MBA Success topic routes
  routes.push({
    path: "/topics/online-mba-success/",
    element: <OnlineMBASuccess />,
  });

  routes.push({
    path: "/topics/online-mba-success/:slug/",
    element: <OnlineMBASuccess />,
  });

  // Uncategorized/Other Programs topic routes
  routes.push({
    path: "/topics/uncategorized/",
    element: <OtherPrograms />,
  });

  routes.push({
    path: "/topics/uncategorized/:slug/",
    element: <OtherPrograms />,
  });

  return routes;
};

// Main routes configuration
export const routes = [
  // Home page
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Home",
    element: <Home />,
  },

  // ASAP page
  {
    path: "/asap/",
    element: <ASAP />,
  },
  {
    path: "/ASAP/",
    element: <Navigate to="/asap/" replace />,
  },
  {
    path: "/asap",
    element: <Navigate to="/asap/" replace />,
  },
  {
    path: "/ASAP",
    element: <Navigate to="/asap/" replace />,
  },

  // Accelerated Application page
  {
    path: "/accelerated-application/",
    element: <AcceleratedApplication />,
  },
  {
    path: "/accelerated-application",
    element: <Navigate to="/accelerated-application/" replace />,
  },

  // Tuition pages
  {
    path: "/tuition-and-financial-aid/",
    element: <Tuition />,
  },
  {
    path: "/Tuition",
    element: <Navigate to="/tuition-and-financial-aid/" replace />,
  },
  {
    path: "/tuition",
    element: <Navigate to="/tuition-and-financial-aid/" replace />,
  },

  // Request Info
  {
    path: "/request-information/",
    element: <RequestInfo />,
  },
  {
    path: "/RequestInfo",
    element: <Navigate to="/request-information/" replace />,
  },
  {
    path: "/requestinfo",
    element: <Navigate to="/request-information/" replace />,
  },

  // MBA program
  {
    path: "/online-mba/",
    element: <MBA />,
  },
  {
    path: "/MBA",
    element: <Navigate to="/online-mba/" replace />,
  },

  // MSCS program
  {
    path: "/online-masters-computer-science-mscs/",
    element: <MSCS />,
  },
  {
    path: "/MSCS",
    element: <Navigate to="/online-masters-computer-science-mscs/" replace />,
  },

  // MEM program
  {
    path: "/online-masters-engineering-management/",
    element: <MEM />,
  },
  {
    path: "/MEM",
    element: <Navigate to="/online-masters-engineering-management/" replace />,
  },

  // MSDSE program
  {
    path: "/online-masters-engineering-applied-data-science/",
    element: <MEADS />,
  },
  {
    path: "/MEADS",
    element: (
      <Navigate
        to="/online-masters-engineering-applied-data-science/"
        replace
      />
    ),
  },

  // Certificate Programs
  {
    path: "/certificates/enterprise-ai/",
    element: <CertificateEnterpriseAI />,
  },
  {
    path: "/certificates/applied-data-science-foundations/",
    element: <CertificateAppliedDataScience />,
  },

  // Explore Programs (formerly Compare Programs)
  {
    path: "/explore-programs/",
    element: <ComparePrograms />,
  },
  {
    path: "/compare-our-programs/",
    element: <Navigate to="/explore-programs/" replace />,
  },
  {
    path: "/ComparePrograms",
    element: <Navigate to="/explore-programs/" replace />,
  },

  // Events
  {
    path: "/events/",
    element: <Events />,
  },
  {
    path: "/Events",
    element: <Navigate to="/events/" replace />,
  },
  {
    path: "/events",
    element: <Navigate to="/events/" replace />,
  },

  // Blog routes (dynamically generated)
  ...generateBlogRoutes(),

  // Topic routes (dynamically generated)
  ...generateTopicRoutes(),

  // Blog redirects - redirect old URLs to new 2025 version
  {
    path: "/blog/computer-science-salaries-outlook-for-2023/",
    element: (
      <Navigate to="/blog/computer-science-salary-outlook-2025/" replace />
    ),
  },
  {
    path: "/blog/computer-science-salaries-outlook-for-2023",
    element: (
      <Navigate to="/blog/computer-science-salary-outlook-2025/" replace />
    ),
  },
  {
    path: "/blog/explore-computer-science-salary-and-job-outlook-2024/",
    element: (
      <Navigate to="/blog/computer-science-salary-outlook-2025/" replace />
    ),
  },
  {
    path: "/blog/explore-computer-science-salary-and-job-outlook-2024",
    element: (
      <Navigate to="/blog/computer-science-salary-outlook-2025/" replace />
    ),
  },

  // Professional Education
  {
    path: "/professionaleducation/",
    element: <ProfessionalEducation />,
  },
  {
    path: "/ProfessionalEducation",
    element: <Navigate to="/professionaleducation/" replace />,
  },
  {
    path: "/professionaleducation",
    element: <Navigate to="/professionaleducation/" replace />,
  },

  // Certificates
  {
    path: "/Certificates",
    element: <Certificates />,
  },

  // Student Outcomes
  {
    path: "/student-outcomes/",
    element: <StudentOutcomes />,
  },
  {
    path: "/student-outcomes",
    element: <Navigate to="/student-outcomes/" replace />,
  },

  // Online Experience
  {
    path: "/online-learning-experience/",
    element: <OnlineExperience />,
  },
  {
    path: "/OnlineExperience",
    element: <Navigate to="/online-learning-experience/" replace />,
  },
  {
    path: "/OnlineLearning",
    element: <Navigate to="/online-learning-experience/" replace />,
  },

  // Tuition Outcomes
  {
    path: "/TuitionOutcomes",
    element: <TuitionOutcomes />,
  },

  // Admissions
  {
    path: "/admissions/",
    element: <Admissions />,
  },
  {
    path: "/Admissions",
    element: <Navigate to="/admissions/" replace />,
  },
  {
    path: "/admissions",
    element: <Navigate to="/admissions/" replace />,
  },

  // Employer Sponsorship
  {
    path: "/employer-sponsorship/",
    element: <EmployerSponsorship />,
  },
  {
    path: "/employer-sponsorship",
    element: <Navigate to="/employer-sponsorship/" replace />,
  },

  // Workforce Development Hub
  {
    path: "/workforce-development/",
    element: <WorkforceDevelopmentHub />,
  },
  {
    path: "/workforce-development",
    element: <Navigate to="/workforce-development/" replace />,
  },

  // Corporate Partnership Pages
  {
    path: "/siemens-pgcsef/",
    element: <SiemensPage />,
  },
  {
    path: "/siemens-pgcsef",
    element: <Navigate to="/siemens-pgcsef/" replace />,
  },
  {
    path: "/siemens/",
    element: <Navigate to="/siemens-pgcsef/" replace />,
  },
  {
    path: "/siemens",
    element: <Navigate to="/siemens-pgcsef/" replace />,
  },
  {
    path: "/pseg-inquiry/",
    element: <PSEGPage />,
  },
  {
    path: "/pseg-inquiry",
    element: <Navigate to="/pseg-inquiry/" replace />,
  },
  {
    path: "/pseg-pgceai/",
    element: <PSEGEnterpriseAIPage />,
  },
  {
    path: "/pseg-pgceai",
    element: <Navigate to="/pseg-pgceai/" replace />,
  },
  {
    path: "/corporate-partners/",
    element: <CorporatePartners />,
  },
  {
    path: "/corporate-partners",
    element: <Navigate to="/corporate-partners/" replace />,
  },
  {
    path: "/corporate-students/",
    element: <CorporateStudents />,
  },
  {
    path: "/corporate-students",
    element: <Navigate to="/corporate-students/" replace />,
  },
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
  {
    path: "/alumni-pgc/",
    element: <AlumniPGC />,
  },
  {
    path: "/alumni-pgc",
    element: <Navigate to="/alumni-pgc/" replace />,
  },

  // Explore program pages
  {
    path: "/explore/online-mba/",
    element: <ExploreMBA />,
  },
  {
    path: "/explore/online-masters-engineering-management/",
    element: <ExploreMEM />,
  },
  {
    path: "/explore/online-masters-eng-applied-data-science/",
    element: <ExploreMEADS />,
  },
  {
    path: "/explore/online-masters-computer-science/",
    element: <ExploreMSCS />,
  },
  {
    path: "/explore/ai-masters-computer-science/",
    element: <ExploreMSAI />,
  },

  // Explore certificate pages
  {
    path: "/explore/certificates/enterprise-ai/",
    element: <ExploreCertEnterpriseAI />,
  },
  {
    path: "/explore/certificates/applied-data-science-foundations/",
    element: <ExploreCertAppliedDataScience />,
  },

  // 404 Not Found page
  {
    path: "/page-not-found/",
    element: <NotFound />,
  },

  // Catch-all route - must be last
  {
    path: "*",
    element: <Navigate to="/page-not-found/" replace />,
  },
];

export default routes;
