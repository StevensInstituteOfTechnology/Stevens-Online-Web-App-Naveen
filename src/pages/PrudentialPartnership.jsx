import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { animate, motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ArrowRight, CheckCircle, 
  Award, TrendingUp, Globe, ChevronDown, Users, Briefcase 
} from 'lucide-react';
import { PRUDENTIAL_DATA, ROLE_PRESETS } from '@/data/prudential-pathways';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { 
  trackHeroView, 
  trackQuickNav, 
  trackConfiguratorOpen,
  trackStartDesignPilot 
} from '@/utils/prudentialAnalytics';

// Lazy load heavy components for better performance
const ProgramRails = lazy(() => import('@/components/prudential/ProgramRails'));
const PathwayConfigurator = lazy(() => import('@/components/prudential/PathwayConfigurator'));
const PathwayBuilder = lazy(() => import('@/components/prudential/PathwayBuilder'));
const ComplianceSection = lazy(() => import('@/components/prudential/ComplianceSection'));
const CaseStudyCard = lazy(() => import('@/components/prudential/CaseStudyCard'));
const LeaderCTA = lazy(() => import('@/components/prudential/LeaderCTA'));
const EmployeeCTA = lazy(() => import('@/components/prudential/EmployeeCTA'));
const LearningExcellenceSection = lazy(() => import('@/components/prudential/LearningExcellenceSection'));
const CollapsibleSection = lazy(() => import('@/components/prudential/CollapsibleSection'));

// Loading fallback component
const LoadingSection = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-12 h-12 border-4 border-stevens-maroon-strong border-t-transparent rounded-full animate-spin" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const outcomeChips = [
  { id: 'vulns', label: 'Reduce critical vulnerabilities', icon: Shield },
  { id: 'reliability', label: 'Improve release reliability', icon: TrendingUp },
  { id: 'audit', label: 'Audit-ready AI models', icon: CheckCircle },
];

const statsConfig = [
  { label: 'Years of Academic Excellence', value: 150, suffix: '+', description: 'Founded legacy in engineering innovation' },
  { label: 'Fortune 500 Partners', value: 35, suffix: '+', description: 'Collaborative corporate learning engagements' },
  { label: 'Specialized Pathways', value: 18, suffix: '', description: 'Curated programs mapped to Prudential roles' },
  { label: 'Completion Satisfaction', value: 96, suffix: '%', description: 'Learners recommend Stevens corporate cohorts' },
];

const featureCards = [
  {
    icon: CheckCircle,
    label: 'NIST Aligned',
    desc: 'Framework compliant programs for regulated industries',
    iconClass: 'text-emerald-400',
    borderGradient: 'from-emerald-500/40 to-emerald-500/10',
    glowBg: 'bg-emerald-500/20',
  },
  {
    icon: Globe,
    label: '100% Online',
    desc: 'Synchronous and asynchronous cohorts built for scale',
    iconClass: 'text-blue-400',
    borderGradient: 'from-blue-500/40 to-blue-500/10',
    glowBg: 'bg-blue-500/20',
  },
  {
    icon: Award,
    label: 'Stackable Credits',
    desc: 'Laddered modules leading to graduate credentials',
    iconClass: 'text-amber-400',
    borderGradient: 'from-amber-500/40 to-amber-500/10',
    glowBg: 'bg-amber-500/20',
  },
  {
    icon: TrendingUp,
    label: 'Career Growth',
    desc: 'Role-based pathways aligned to Prudential talent goals',
    iconClass: 'text-purple-400',
    borderGradient: 'from-purple-500/40 to-purple-500/10',
    glowBg: 'bg-purple-500/20',
  },
];

const sectionLinks = [
  { id: 'stats', label: 'Impact Metrics' },
  { id: 'programs', label: 'Programs' },
  { id: 'excellence', label: 'Learning Experience' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'configurator', label: 'Pathway Builder' },
  { id: 'leader-cta', label: 'Partner With Us' },
];

const AnimatedNumber = ({ value, isActive }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: latest => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isActive, value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const PrudentialPartnership = () => {
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [pathItems, setPathItems] = useState([]);
  const shouldReduceMotion = useReducedMotion();

  // Set document title and meta tags
  useEffect(() => {
    document.title = 'Prudential × Stevens Partnership | Corporate Learning Programs';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Strategic partnership page for Prudential and Stevens Institute of Technology - Corporate upskilling pathways');
    }
    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'noindex, nofollow');
    if (!document.querySelector('meta[name="robots"]')) {
      document.head.appendChild(metaRobots);
    }
    
    // Track hero view
    trackHeroView();
    
    return () => {
      document.title = 'Stevens Institute of Technology - Online Programs';
      if (metaRobots.parentNode) {
        metaRobots.remove();
      }
    };
  }, []);

  // Extract role and level from URL params
  useEffect(() => {
    const roleParam = searchParams.get('role');
    const levelParam = searchParams.get('level');
    
    if (roleParam) {
      const role = ROLE_PRESETS.find(r => r.id === roleParam);
      if (role) {
        setSelectedRole(role);
        setSelectedLevel(levelParam || role.defaultLevel);
      }
    }
  }, [searchParams]);

  // Smooth scroll to section with offset for navbar
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Add smooth scroll behavior globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Add program to path
  const addToPath = (program) => {
    if (!pathItems.find(p => p.id === program.id)) {
      setPathItems([...pathItems, program]);
    }
  };

  // Remove from path
  const removeFromPath = (programId) => {
    setPathItems(pathItems.filter(p => p.id !== programId));
  };

  const [statsActive, setStatsActive] = useState(false);
  const statsTriggeredRef = useRef(false);

  const handleStatsEnter = () => {
    if (statsTriggeredRef.current) return;
    statsTriggeredRef.current = true;
    setStatsActive(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-x-hidden">
      {/* Grain Texture Overlay for Depth */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-[1]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-stevens-maroon-strong focus:text-white focus:rounded-md focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Skip to main content
      </a>

      {/* Hero Section - Premium Animated Background */}
      <section id="main-content" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" role="banner">
          {/* Multi-layer Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-blue-950/20"></div>
          
          {/* Simplified 2-Orb System - Brand Colors Only */}
          {!shouldReduceMotion ? (
            <>
              {/* Stevens Maroon Orb */}
              <motion.div
                animate={{ 
                  x: [0, 80, 0], 
                  y: [0, -60, 0],
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-[#A32638]/25 to-[#A32638]/10 rounded-full blur-3xl"
              />
              
              {/* Prudential Blue Orb */}
              <motion.div
                animate={{ 
                  x: [0, -100, 0], 
                  y: [0, 80, 0],
                }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                className="absolute -bottom-40 -right-40 w-[900px] h-[900px] bg-gradient-to-tl from-[#0073CF]/20 to-[#0073CF]/8 rounded-full blur-3xl"
              />
            </>
          ) : (
            <>
              <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-[#A32638]/20 to-[#A32638]/8 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -right-40 w-[900px] h-[900px] bg-gradient-to-tl from-[#0073CF]/15 to-[#0073CF]/6 rounded-full blur-3xl" />
            </>
          )}
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }} 
          />
          
          {/* Noise Texture for Depth */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
            }}
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            {/* Opaque Content Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-12 md:p-16"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Partnership Logos - Large & Bold */}
              <motion.div 
                className="flex items-center justify-center gap-8 mb-12"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img 
                  src="/assets/logos/Stevens-Wordmark-RGB_WHT.png" 
                  alt="Stevens Institute" 
                  className="h-14 md:h-20"
                />
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
                {/* Prudential Logo - Replace src with actual logo path when available */}
                <div className="flex items-center">
                  <img 
                    src="/assets/logos/prudential-logo.png" 
                    alt="Prudential" 
                    className="h-12 md:h-16 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-3xl md:text-5xl font-bold text-[#0073CF] tracking-tight hidden">
                    Prudential
                  </span>
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stevens-maroon/40 border-2 border-stevens-maroon/70 mb-10 backdrop-blur-md shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ 
                  boxShadow: '0 4px 16px rgba(163, 38, 56, 0.4), 0 0 0 1px rgba(163, 38, 56, 0.2)',
                  background: 'linear-gradient(135deg, rgba(163, 38, 56, 0.5) 0%, rgba(163, 38, 56, 0.3) 100%)'
                }}
              >
                <Award className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">Corporate Learning Partnership</span>
              </motion.div>

              {/* Headline - Pure White, No Gradient */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1] text-white tracking-tight"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0.01 : 0.6 }}
              >
                Build resilient,
                <br />
                <span className="text-white">
                  AI-enabled teams
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.7, duration: shouldReduceMotion ? 0.01 : 0.6 }}
              >
                Stackable pathways aligned to Prudential&apos;s roles, standards, and schedules.
              </motion.p>

              {/* Outcome Chips - Subtle Gradient Borders */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-4 mb-14"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: shouldReduceMotion ? 0.01 : 0.5 }}
              >
                {outcomeChips.map((chip, idx) => (
                  <motion.div
                    key={chip.id}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 border border-gray-700 text-sm font-semibold text-white shadow-lg hover:border-[#A32638] transition-all duration-300"
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.9 + idx * 0.1, duration: shouldReduceMotion ? 0.01 : 0.3 }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  >
                    <chip.icon className="w-4 h-4 text-[#A32638]" />
                    <span>{chip.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs - Solid Stevens Maroon Primary */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 1.1, duration: shouldReduceMotion ? 0.01 : 0.6 }}
              >
                {/* Primary CTA - Solid Maroon */}
                <motion.button
                  onClick={() => {
                    trackStartDesignPilot();
                    scrollToSection('leader-cta');
                  }}
                  className="group relative px-14 py-5 rounded-full bg-[#A32638] text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-300"
                  style={{
                    boxShadow: '0 10px 30px rgba(163, 38, 56, 0.3)'
                  }}
                  whileHover={shouldReduceMotion ? {} : { 
                    y: -2,
                    boxShadow: '0 15px 40px rgba(163, 38, 56, 0.4)'
                  }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5" />
                    Design your pilot
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </motion.button>

                {/* Secondary CTA - Dark with Maroon Border */}
                <motion.button
                  onClick={() => {
                    trackConfiguratorOpen();
                    scrollToSection('configurator');
                  }}
                  className="group relative px-14 py-5 rounded-full bg-gray-800 border-2 border-[#A32638] text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-300 hover:bg-gray-750"
                  whileHover={shouldReduceMotion ? {} : { 
                    y: -2
                  }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    Build my path
                    <TrendingUp className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
                  </span>
                </motion.button>
              </motion.div>

              {/* Quick Section Navigation - Clean Hover */}
              <motion.div 
                className="mt-16 flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 1.3, duration: shouldReduceMotion ? 0.01 : 0.5 }}
                aria-label="Navigate to sections"
              >
                {sectionLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      trackQuickNav(link.id);
                      scrollToSection(link.id);
                    }}
                    className="px-5 py-2.5 rounded-full bg-gray-800 border border-gray-700 text-sm font-semibold text-white transition-all duration-200 hover:border-[#A32638] hover:bg-gray-750 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                    whileHover={shouldReduceMotion ? {} : { y: -1 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + idx * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { delay: 1.4, duration: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400" aria-label="Scroll down for more content" />
          </motion.div>
        </section>

        {/* Partnership Metrics */}
        <motion.section
          id="stats"
          className="py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          onViewportEnter={handleStatsEnter}
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-4 gap-6">
              {statsConfig.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                >
                  {/* Subtle Gradient Border on Hover */}
                  <div 
                    className="absolute -inset-[1px] bg-gradient-to-br from-[#A32638]/40 to-[#0073CF]/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  
                  <div 
                    className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 group-hover:border-transparent p-7 transition-all duration-300 h-full flex flex-col"
                    style={{
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <div className="text-5xl font-extrabold text-white mb-2">
                      <AnimatedNumber value={stat.value} isActive={statsActive} />
                      <span className="text-[#A32638]">{stat.suffix}</span>
                    </div>
                    <p className="text-sm text-white font-bold mb-2">{stat.label}</p>
                    <p className="text-xs text-gray-100 leading-relaxed flex-grow">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Key Features - Premium Glassmorphism */}
        <motion.section 
          id="features"
          className="py-24 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-4 gap-6">
              {featureCards.map((feature, idx) => (
                <motion.div
                  key={feature.label}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                >
                  <div 
                    className="relative rounded-2xl bg-gray-900 border border-gray-800 group-hover:border-gray-700 p-10 text-center transition-all duration-300 h-full flex flex-col"
                    style={{
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                      background: 'linear-gradient(135deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 100%)'
                    }}
                  >
                    {/* Static Diagonal Sheen */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)'
                      }}
                      aria-hidden="true"
                    />
                    
                    {/* Icon with Subtle Shadow */}
                    <div className="relative mb-6">
                      <feature.icon 
                        className={`w-16 h-16 ${feature.iconClass} mx-auto`}
                        style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}
                      />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{feature.label}</h3>
                    <p className="text-gray-100 text-sm leading-relaxed font-medium flex-grow">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Program Rails - With Animation */}
        <motion.section 
          id="programs" 
          className="py-24 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Suspense fallback={<LoadingSection />}>
            <ProgramRails 
              selectedRole={selectedRole}
              selectedLevel={selectedLevel}
              onAddToPath={addToPath}
              pathItems={pathItems}
              onRemoveFromPath={removeFromPath}
            />
          </Suspense>
        </motion.section>

        {/* Learning Excellence Section - Spacious */}
        <motion.section 
          id="excellence"
          className="py-24 bg-slate-800/50"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.7 }}
        >
          <Suspense fallback={<LoadingSection />}>
            <LearningExcellenceSection />
          </Suspense>
        </motion.section>

        {/* Compliance & Standards - Animated */}
        <motion.section 
          id="compliance"
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Suspense fallback={<LoadingSection />}>
              <CollapsibleSection
                id="compliance-standards"
                title="Compliance & Industry Standards"
                defaultOpen={false}
                icon={<Shield className="w-6 h-6 text-red-400" />}
                badge={<span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">NIST Aligned</span>}
              >
                <ComplianceSection />
              </CollapsibleSection>
            </Suspense>
          </div>
        </motion.section>

        {/* Case Studies - Animated Grid */}
        <motion.section 
          id="case-studies"
          className="py-24 bg-slate-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Suspense fallback={<LoadingSection />}>
              <CollapsibleSection
                id="case-studies"
                title="Proven Results"
                defaultOpen={false}
                icon={<TrendingUp className="w-6 h-6 text-green-400" />}
                badge={<span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">{PRUDENTIAL_DATA.caseStudies.length} Case Studies</span>}
              >
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {PRUDENTIAL_DATA.caseStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={shouldReduceMotion ? { duration: 0.01 } : { delay: index * 0.15, duration: 0.5 }}
                      whileHover={shouldReduceMotion ? {} : { y: -4 }}
                    >
                      <CaseStudyCard study={study} />
                    </motion.div>
                  ))}
                </div>
              </CollapsibleSection>
            </Suspense>
          </div>
        </motion.section>

        {/* Pathway Configurator - Spacious */}
        <motion.section 
          id="configurator" 
          className="py-20"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.7 }}
        >
          <Suspense fallback={<LoadingSection />}>
            <PathwayConfigurator 
              onAddToPath={addToPath}
              pathItems={pathItems}
              onRemoveFromPath={removeFromPath}
            />
          </Suspense>
        </motion.section>

        {/* New Pathway Builder - Enhanced Version */}
        <motion.section 
          id="pathway-builder" 
          className="py-20 bg-slate-800/30"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.7 }}
        >
          <Suspense fallback={<LoadingSection />}>
            <PathwayBuilder 
              onAddToPath={addToPath}
              pathItems={pathItems}
              onRemoveFromPath={removeFromPath}
            />
          </Suspense>
        </motion.section>

        {/* CTAs Section - Spacious & Animated */}
        <motion.section 
          id="leader-cta" 
          className="py-24 bg-slate-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0.01 } : { staggerChildren: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.5 }}
              >
                <Suspense fallback={<LoadingSection />}>
                  <LeaderCTA pathItems={pathItems} />
                </Suspense>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.5 }}
              >
                <Suspense fallback={<LoadingSection />}>
                  <EmployeeCTA pathItems={pathItems} />
                </Suspense>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Floating View Path Button - Only shows when items exist */}
        {pathItems.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => scrollToSection('configurator')}
            className="fixed bottom-40 right-6 bg-stevens-maroon hover:bg-stevens-maroon-dark text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 z-[9997] flex items-center gap-2"
            aria-label={`View learning path with ${pathItems.length} programs`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">{pathItems.length} Selected</span>
          </motion.button>
        )}
    </div>
  );
};

export default PrudentialPartnership;

