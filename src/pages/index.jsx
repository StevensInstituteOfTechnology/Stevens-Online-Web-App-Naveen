import { useEffect } from "react";
import Layout from "./Layout.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import routes from "@/routes.jsx";

const PAGES = {
  Home: "Home",
  ASAP: "ASAP",
  AcceleratedApplication: "AcceleratedApplication",
  Tuition: "Tuition",
  RequestInfo: "RequestInfo",
  MBA: "MBA",
  MSCS: "MSCS",
  MEM: "MEM",
  CertificateEnterpriseAI: "CertificateEnterpriseAI",
  CertificateAppliedDataScience: "CertificateAppliedDataScience",
  ExploreMBA: "ExploreMBA",
  ExploreMEM: "ExploreMEM",
  ExploreMSCS: "ExploreMSCS",
  ExploreMSAI: "ExploreMSAI",
  ExploreCertEnterpriseAI: "ExploreCertEnterpriseAI",
  ExploreCertAppliedDataScience: "ExploreCertAppliedDataScience",
  ComparePrograms: "ComparePrograms",
  Events: "Events",
  Blog: "Blog",
  EngineeringEssentials: "EngineeringEssentials",
  MasteringComputerScience: "MasteringComputerScience",
  OnlineMBASuccess: "OnlineMBASuccess",
  OtherPrograms: "OtherPrograms",
  ProfessionalEducation: "ProfessionalEducation",
  Certificates: "Certificates",
  OnlineExperience: "OnlineExperience",
  TuitionOutcomes: "TuitionOutcomes",
  Admissions: "Admissions",
  EmployerSponsorship: "EmployerSponsorship",
  CorporatePartners: "CorporatePartners",
  CorporateStudents: "CorporateStudents",
  NotFound: "NotFound",
};

function _getCurrentPage(url) {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  let urlLastPart = url.split("/").pop();
  if (urlLastPart.includes("?")) {
    urlLastPart = urlLastPart.split("?")[0];
  }

  if (urlLastPart === '' || urlLastPart.toLowerCase() === 'home') {
    return 'Home';
  }
  const pageName = Object.keys(PAGES).find(
    (page) => page.toLowerCase() === urlLastPart.toLowerCase()
  );
  return pageName || 'Home';
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);
  
  useEffect(() => {
    // Scroll to top on route change - only if no hash is present
    // If hash is present, let the page component handle scrolling to the hash target
    if (typeof window !== 'undefined' && !location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <Layout currentPageName={currentPage}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={route.path || index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
