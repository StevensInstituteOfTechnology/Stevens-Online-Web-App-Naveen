import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Briefcase,
  Target,
  ArrowDown,
  Info,
  Sparkles,
  Home,
  Building,
  Calculator,
  X,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import PageHero from '@/components/shared/PageHero';
import ApplicationModal from '@/components/shared/ApplicationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// Removed ProgramCard import - using custom implementation
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl, createPageUrl } from '@/utils';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { PROGRAMS_DATA } from '@/data/programsData';
import { calculateProgramCost, getDiscountConfig, DiscountCalculator } from '@/utils/discountCalculator';
import { BOOKING_URLS } from '@/config/constants';
import EmployerFaqSection from '@/components/corporate/EmployerFaqSection';

const StudentSuccessCarousel = ({ stories }) => {
  const buttonGradientLeft = 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(237,242,247,0.85))';
  const buttonGradientRight = 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.95), rgba(237,242,247,0.85))';
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: false,
    slidesToScroll: 1
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const containerRef = useRef(null);
  
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi?.off('select', onSelect);
      emblaApi?.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);
  
  return (
    <section className="py-stevens-section bg-gradient-to-b from-stevens-gray-50 via-white to-stevens-gray-50">
      <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
        <div className="text-center mb-stevens-3xl">
          <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-stevens-bold text-stevens-primary mb-stevens-lg">
            Success Stories from Corporate-Sponsored Alumni
          </h2>
          <p className="text-stevens-lg md:text-stevens-xl text-stevens-gray-600 max-w-4xl mx-auto leading-relaxed">
            Hear how working professionals balanced life, work, and Stevens Online to earn transformative outcomes powered by their employer benefits.
          </p>
        </div>
        
        <div
          className="relative group w-full overflow-hidden"
          ref={containerRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Student success stories carousel. Use arrow keys to navigate."
        >
          <div
            className="overflow-hidden py-8 w-full relative z-0"
            ref={emblaRef}
            role="list"
          >
            <div className="flex gap-stevens-xl rounded-stevens-xl ">
              {stories.map((story, index) => {
                const [leadSentence, ...restSentences] = story.quote.split('. ');
                const leadText = restSentences.length ? `${leadSentence}.` : leadSentence;
                const restBody = restSentences.join('. ');
                const restText = restBody
                  ? `${restBody}${restBody.trim().endsWith('.') ? '' : '.'}`
                  : '';
                
                return (
                  <div
                    key={story.name}
                    className="flex-none w-full lg:w-[calc(33.333%-2rem)] min-w-[300px]"
                    style={{ minWidth: '300px' }}
                    role="listitem"
                    aria-label={`Testimonial ${index + 1} of ${stories.length}: ${story.name}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full bg-[#F9FAFB] shadow-stevens-lg transition-all duration-300 hover:shadow-stevens-2xl hover:-translate-y-1 border border-stevens-gray-100/60 rounded-stevens-xl overflow-hidden">
                        <CardContent className="p-stevens-xl flex flex-col h-full">
                          <div className="flex-grow">
                            <div className="-mx-stevens-xl -mt-stevens-xl mb-stevens-lg rounded-t-stevens-xl overflow-hidden h-[350px] w-[calc(100%+theme(spacing.stevens-xl)*2)]">
                              <img
                                src={story.image || '/assets/avatars/student-placeholder.webp'}
                                alt={`${story.name} portrait`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <blockquote className="mb-stevens-xl leading-relaxed">
                              <span className="block text-stevens-xl md:text-stevens-2xl font-stevens-semibold text-stevens-primary mb-stevens-md leading-tight">
                                {leadText}
                              </span>
                            </blockquote>
                          </div>
                          
                          <div className="pt-stevens-lg mt-auto border-t-2 border-stevens-gray-100">
                            <p className="font-stevens-bold text-stevens-base text-stevens-gray-900 mb-stevens-xs">{story.name}</p>
                            <p className="text-stevens-xs text-stevens-gray-600 uppercase tracking-wide mb-stevens-sm">{story.company}</p>
                            <p className="text-stevens-sm text-stevens-gray-500">
                              Program: <span className="font-stevens-bold text-stevens-gray-900">{story.program}</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {canScrollPrev && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-stevens-md pointer-events-none">
              <motion.button
                onClick={scrollPrev}
                className="z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none pointer-events-auto opacity-0 group-hover:opacity-90 hover:opacity-100 cursor-pointer shadow-stevens-lg border border-stevens-gray-100 bg-white/90 backdrop-blur"
                style={{ background: buttonGradientLeft }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-7 h-7 text-stevens-primary" aria-hidden="true" />
              </motion.button>
            </div>
          )}
          
          {canScrollNext && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-stevens-md pointer-events-none">
              <motion.button
                onClick={scrollNext}
                className="z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none pointer-events-auto opacity-0 group-hover:opacity-90 hover:opacity-100 cursor-pointer shadow-stevens-lg border border-stevens-gray-100 bg-white/90 backdrop-blur"
                style={{ background: buttonGradientRight }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-7 h-7 text-stevens-primary" aria-hidden="true" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const CorporateStudents = () => {
  const [searchParams] = useSearchParams();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState('all');
  const [companyName, setCompanyName] = useState(null);
  const [corporateCode, setCorporateCode] = useState(null);
  
  // Cost Calculator States
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [applyCPEDiscount, setApplyCPEDiscount] = useState(true); // Default checked
  const [isHobokenResident, setIsHobokenResident] = useState(false);
  const [isStevensAlumni, setIsStevensAlumni] = useState(false);
  const [customReimbursement, setCustomReimbursement] = useState('');
  const [calculatedCost, setCalculatedCost] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  usePageTracking({
    pageType: 'landing',
    additionalData: {
      page_name: 'Corporate Students',
      has_form: true,
      landing_page_type: 'b2c',
      company: companyName || 'unknown'
    }
  });

  // Set SEO meta tags
  useEffect(() => {
    const canonical = buildCanonicalUrl('/corporate-students/');
    setPageTitle('Employee Tuition Benefits | Advance Your Career | Stevens Online');
    setMetaDescription('Take advantage of your employer tuition benefits. Earn a Stevens Online degree with accelerated admissions, dedicated support, and career-aligned programs.');
    setOpenGraphTags({
      title: 'Employee Tuition Benefits | Stevens Online',
      description: 'Advance your career with Stevens Online using your company tuition benefits. Accelerated applications and dedicated support.',
      image: buildCanonicalUrl('/assets/images/corporate-students/corporate-students-1.webp'),
      url: canonical,
      type: 'website'
    });
  }, []);

  // Detect company from URL parameters
  useEffect(() => {
    const company = searchParams.get('company');
    const code = searchParams.get('code');
    
    if (company) {
      setCompanyName(decodeURIComponent(company));
    }
    if (code) {
      setCorporateCode(code);
      sessionStorage.setItem('corporate_code', code);
    }

    // Track landing with company info
    trackEvent('corporate_student_landing', {
      company: company || 'direct',
      has_code: !!code
    });
  }, [searchParams]);

  // Calculate cost whenever inputs change
  useEffect(() => {
    if (selectedProgram && selectedCompany) {
      const options = {
        applyCPEDiscount,
        isHobokenResident,
        isStevensAlumni,
        customReimbursement: customReimbursement ? parseFloat(customReimbursement) : undefined
      };
      
      const result = calculateProgramCost(selectedProgram.code, selectedCompany.id, options);
      setCalculatedCost(result);
      
      // Track calculator usage
      trackEvent('cost_calculator_used', {
        program: selectedProgram.code,
        company: selectedCompany.id,
        has_cpe_discount: applyCPEDiscount,
        has_hoboken: isHobokenResident,
        has_alumni: isStevensAlumni,
        has_custom_reimbursement: !!customReimbursement
      });
    }
  }, [selectedProgram, selectedCompany, applyCPEDiscount, isHobokenResident, isStevensAlumni, customReimbursement]);

  // Partner benefits
  const partnerBenefits = [
    {
      icon: Zap,
      title: "Accelerated Application",
      description: "Skip essays and recommendation letters — apply in minutes, not weeks."
    },
    {
      icon: DollarSign,
      title: "Tuition Reimbursement Friendly",
      description: "We work directly with your HR team to ensure seamless tuition assistance processing."
    },
    {
      icon: Users,
      title: "Dedicated Corporate Care Team",
      description: "From application to graduation, our Corporate Care Advisors are your single point of contact."
    },
    {
      icon: Target,
      title: "Customized Learning Pathways",
      description: "Programs and courses built around your company's real-world projects and skill needs."
    },
    {
      icon: TrendingUp,
      title: "Immediate Career Impact",
      description: "Apply new skills right away and gain credentials that enhance your role and open opportunities."
    },
    
  ];

  // Career paths and programs
  const careerPaths = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      programs: ['mscs', 'meads', 'cert-eai']
    },
    {
      id: 'data-science',
      name: 'Data Science',
      programs: ['meads', 'cert-ads']
    },
    {
      id: 'business',
      name: 'Business & Management',
      programs: ['mba', 'mem']
    },
    {
      id: 'engineering',
      name: 'Engineering Leadership',
      programs: ['mem', 'meads']
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      programs: ['mscs']
    }
  ];

  // Filter programs based on selected career path
  const filteredPrograms = selectedCareerPath === 'all' 
    ? PROGRAMS_DATA.filter(p => !p.isHidden) // Show all programs including certificates
    : PROGRAMS_DATA.filter(p => {
        const path = careerPaths.find(cp => cp.id === selectedCareerPath);
        return path && path.programs.includes(p.code);
      });

  // Success stories
  const successStories = [
    {
      name: "Sarah Mitchell",
      title: "Data Science Manager",
      company: "Fortune 500 Tech Company",
      program: "MS in Data Science & Engineering",
      quote: "Stevens' program helped me transition from analyst to manager in just 18 months. The corporate care team made balancing work and study seamless.",
      outcome: "Promoted twice, 40% salary increase",
      image: "/assets/avatars/mscs-avatar/Reza_Peyrovian.webp"
    },
    {
      name: "James Chen",
      title: "Senior Software Engineer",
      company: "Global Financial Services",
      program: "MS in Computer Science",
      quote: "The AI concentration perfectly aligned with my company's strategic direction. I'm now leading our machine learning initiatives.",
      outcome: "Leading AI initiatives, received innovation award",
      image: "/assets/avatars/mscs-avatar/Patrick_Hill-768x768.webp"
    },
    {
      name: "Maria Rodriguez",
      title: "Product Manager",
      company: "Healthcare Technology",
      program: "Online MBA",
      quote: "The flexibility of Stevens Online allowed me to earn my MBA while working full-time. My company covered 100% of the tuition.",
      outcome: "Transitioned to product management, managing $10M portfolio",
      image: "/assets/avatars/mscs-avatar/Samuel_Kim.webp"
    }
  ];

  // Learning journey steps - Application & Benefits
  const applicationSteps = [
    {
      step: 1,
      actionNeeded: "Select your program or certificate",
      forYourPlan: "Explore our specially designed graduate programs and professional certificates, crafted to advance your career and support your professional development goals.",
      linkText: "View Programs",
      linkTarget: "#programs-section"
    },
    {
      step: 2,
      actionNeeded: "Use the cost calculator to estimate your investment",
      forYourPlan: "Click 'Calculate Your Cost' on your selected program to access our interactive calculator. This tool helps you understand the total program cost before applying.",
      linkText: "Start",
      linkTarget: "#cost-calculator"
    },
    {
      step: 3,
      actionNeeded: "Select your company to view partnership benefits",
      forYourPlan: "In the calculator, choose your company from the dropdown menu to see available corporate partnership benefits, discounts, and special programs tailored to your organization."
    },
    {
      step: 4,
      actionNeeded: "Apply eligible discounts",
      forYourPlan: "Select any applicable discounts and enter your employer reimbursement amount. The calculator will show your final out-of-pocket cost after all discounts and benefits."
    },
    {
      step: 5,
      actionNeeded: "Start your application",
      forYourPlan: "Click the 'Apply Now' button on your selected program page to begin your application. If you have any questions or need assistance, feel free to ",
      linkText: "schedule a call with an advisor",
      linkTarget: BOOKING_URLS.SCHEDULE_CALL,
      isExternal: true
    }
  ];

  // Handle scroll to section
  const scrollToSection = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Tuition savings calculator data
  const tuitionData = {
    averageProgramCost: 45000,
    corporateDiscount: 0.1, // 10%
    employerContribution: 5250, // Annual IRS limit
    typicalDuration: 2 // years
  };

  const calculateSavings = () => {
    const discountAmount = tuitionData.averageProgramCost * tuitionData.corporateDiscount;
    const employerTotal = tuitionData.employerContribution * tuitionData.typicalDuration;
    const totalSavings = discountAmount + employerTotal;
    const outOfPocket = tuitionData.averageProgramCost - totalSavings;
    
    return {
      programCost: tuitionData.averageProgramCost,
      corporateDiscount: discountAmount,
      employerContribution: employerTotal,
      totalSavings: totalSavings,
      outOfPocket: outOfPocket,
      percentSaved: (totalSavings / tuitionData.averageProgramCost * 100).toFixed(0)
    };
  };

  const savings = calculateSavings();

  const handleApplicationStart = () => {
    trackEvent('corporate_application_started', {
      company: companyName || 'unknown',
      has_code: !!corporateCode
    });
    trackConversion(CONVERSION_LABELS.APPLICATION_STARTED);
    setShowApplicationModal(true);
  };

  return (
    <PageContextProvider pageType="landing" pageName="Corporate Students">
      <div className="min-h-screen bg-stevens-white">
        {/* Hero Section */}
        <PageHero
          titleLines={["Advance Your Career", "with Stevens Online"]}
          subtitle={
            companyName 
              ? `As a ${companyName} employee, you have exclusive access to flexible online programs, simplified admissions, and dedicated support — designed to help you gain in-demand skills and achieve your career goals faster.`
              : "As an employee of a Stevens corporate partner, you have exclusive access to flexible online programs, simplified admissions, and dedicated support — designed to help you gain in-demand skills and achieve your career goals faster."
          }
          bgImage="/assets/images/corporate-students/corporate-students-1.webp"
          primaryCta={{
            label: "Start Your Accelerated Application",
            onClick: handleApplicationStart
          }}
          secondaryCta={{
            label: "Talk to a Corporate Care Advisor",
            href: "#contact"
          }}
          badges={companyName ? [
            { text: `Exclusive benefits for ${companyName} employees`, variant: "secondary" }
          ] : []}
        />

        {/* Partner Benefits Overview */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Exclusive Benefits for Partner Employees
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-5xl mx-auto">
                Through your employer's partnership with Stevens Online, you can access a fast, flexible, 
                and career-aligned path to earn a graduate certificate, master's degree, or professional credential.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-stevens-md lg:gap-stevens-lg">
              {partnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={benefit.title} 
                    className="text-center p-stevens-md rounded-stevens-lg transition-all duration-300 hover:bg-stevens-white hover:shadow-stevens-md group border border-transparent hover:border-stevens-gray-200 flex flex-col"
                  >
                    {/* Icon Container */}
                    <div className="mb-stevens-md flex justify-center">
                      <div className="w-16 h-16 bg-stevens-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-stevens-primary/90 group-hover:scale-105">
                        <Icon className="w-8 h-8 text-stevens-white" />
                      </div>
                    </div>

                    {/* Title - Fixed height to align descriptions */}
                    <h3 className="font-stevens-display text-stevens-base lg:text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors min-h-[90px] flex items-center justify-center">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-stevens-sm text-stevens-gray-600 leading-relaxed group-hover:text-stevens-gray-700 transition-colors">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Stevens Online */}
        <section className="bg-stevens-primary">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden">
              <img
                src="/assets/images/shared/accreditation.webp"
                alt="Stevens Online students and professionals"
                className="w-full h-full object-cover"
                style={{ objectPosition: '20% center' }}
              />
            </div>

            {/* Right Side - Text Content */}
            <div className="bg-stevens-primary text-stevens-white flex flex-col justify-center px-stevens-md sm:px-stevens-lg lg:px-stevens-2xl py-stevens-xl lg:aspect-square lg:min-h-0">
              <div className="space-y-stevens-lg lg:space-y-stevens-xl">
                {/* Title and Description */}
                <div className="space-y-stevens-sm lg:space-y-stevens-md">
                  <h2 className="font-stevens-display text-stevens-xl sm:text-stevens-2xl lg:text-stevens-3xl font-stevens-bold text-stevens-white leading-tight">
                    A Top-Ranked University Built for Working Professionals
                  </h2>
                  <p className="text-stevens-sm sm:text-stevens-base lg:text-stevens-lg text-stevens-white/90 leading-relaxed">
                    Stevens brings together industry-leading faculty, cutting-edge technology, and a focus on 
                    career outcomes, empowering professionals to thrive in the future of work.
                  </p>
                </div>

                {/* Large Quote Icon */}
                <div className="pt-stevens-sm lg:pt-stevens-md">
                  <Quote className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-stevens-white/80" />
                </div>

                {/* Student Quote */}
                {successStories.slice(0, 1).map((story, index) => (
                  <div key={index} className="space-y-stevens-md lg:space-y-stevens-lg">
                    <blockquote className="text-stevens-lg sm:text-stevens-xl lg:text-stevens-2xl text-stevens-white leading-relaxed">
                      {story.quote}
                    </blockquote>
                    
                    {/* Divider */}
                    <div className="border-t border-stevens-white/30 pt-stevens-md lg:pt-stevens-lg">
                      <p className="text-stevens-sm sm:text-stevens-base font-stevens-medium text-stevens-white">
                        {story.name}, {story.title}
                      </p>
                      {story.company && (
                        <p className="text-xs sm:text-stevens-sm text-stevens-white/80 mt-stevens-xs">
                          {story.company}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Career-Aligned Programs */}
        <section id="programs-section" className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-stevens-xl"
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Explore Career-Aligned Programs
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-4xl mx-auto mb-stevens-lg">
                Choose from flexible graduate certificates, degrees, and short courses designed to 
                strengthen your expertise and leadership potential.
              </p>
            </div>

            {/* Career Path Filter */}
            <div className="flex flex-wrap justify-center gap-stevens-sm mb-stevens-xl">
              <Button
                variant={selectedCareerPath === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCareerPath('all')}
                className="mb-stevens-sm"
              >
                All Programs
              </Button>
              {careerPaths.map(path => (
                <Button
                  key={path.id}
                  variant={selectedCareerPath === path.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCareerPath(path.id)}
                  className="mb-stevens-sm"
                >
                  {path.name}
                </Button>
              ))}
            </div>

            {/* Program Cards */}
            <AnimatePresence mode="wait">
              <div
                key={selectedCareerPath}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg"
              >
                {filteredPrograms.slice(0, 6).map((program, index) => (
                  <div
                    key={program.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <Badge className="mb-stevens-sm w-fit bg-stevens-primary text-stevens-white">
                          {program.degree}
                        </Badge>
                        <CardTitle className="text-stevens-xl font-stevens-bold text-stevens-gray-900">
                          {program.shortName || program.name}
                        </CardTitle>
                        {program.tagline && (
                          <p className="text-stevens-gray-600 text-stevens-sm mt-stevens-xs">
                            {program.tagline}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-stevens-md">
                        <p className="text-stevens-gray-700">
                          {program.description}
                        </p>

                        {/* Program Stats */}
                        {program.stats && (
                          <div className="space-y-stevens-sm">
                            {program.stats.duration && (
                              <div className="flex items-center text-stevens-sm text-stevens-gray-600">
                                <Clock className="w-4 h-4 mr-stevens-xs" />
                                <span>{program.stats.duration}</span>
                              </div>
                            )}
                            {program.stats.credits && (
                              <div className="flex items-center text-stevens-sm text-stevens-gray-600">
                                <Award className="w-4 h-4 mr-stevens-xs" />
                                <span>{program.stats.credits} credits</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Key Highlights */}
                        {program.highlights && (
                          <div className="space-y-stevens-xs">
                            {program.highlights.slice(0, 3).map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-stevens-primary mr-stevens-xs mt-0.5 flex-shrink-0" />
                                <span className="text-stevens-sm text-stevens-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="space-y-stevens-sm mt-stevens-md">
                          <Button 
                            className="w-full"
                            variant="outline"
                            onClick={() => {
                              setSelectedProgram(program);
                              // Reset discount checkboxes to default
                              setApplyCPEDiscount(true); // Default checked
                              setIsHobokenResident(false); // Default unchecked
                              setIsStevensAlumni(false); // Default unchecked
                              setCustomReimbursement(''); // Clear reimbursement
                              
                              // Auto-select company if available from URL
                              if (companyName && !selectedCompany) {
                                const config = getDiscountConfig();
                                const company = config.corporatePartners.find(
                                  c => c.name.toLowerCase().includes(companyName.toLowerCase())
                                );
                                if (company) setSelectedCompany(company);
                              }
                              setShowCalculator(true);
                              // Scroll to calculator
                              setTimeout(() => {
                                document.getElementById('cost-calculator')?.scrollIntoView({ 
                                  behavior: 'smooth',
                                  block: 'start'
                                });
                              }, 100);
                              
                              trackEvent('calculate_cost_clicked', {
                                program_code: program.code,
                                source: 'program_card'
                              });
                            }}
                          >
                            <Calculator className="mr-2 w-4 h-4" />
                            Calculate Your Cost
                          </Button>
                          
                        <Link 
                          to={program.programPage || `${createPageUrl('/')}${program.code}/`}
                          onClick={() => {
                            trackEvent('program_card_clicked', {
                              program_code: program.code,
                              source: 'corporate_students',
                              has_corporate_code: !!corporateCode,
                              action: 'view_detail'
                            });
                          }}
                        >
                            <Button className="w-full text-stevens-white">
                            View Detail
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </AnimatePresence>

            {filteredPrograms.length > 6 && (
              <div className="text-center mt-stevens-xl">
                <Link to="/compare-our-programs">
                  <Button variant="outline" size="lg">
                    View All Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Cost Calculator */}
        <section 
          id="cost-calculator"
          className="py-stevens-section-sm lg:py-stevens-section bg-gradient-to-b from-stevens-white to-stevens-gray-50"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Your Education, Made More Affordable
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-5xl mx-auto">
                Calculate your actual cost with corporate discounts and employer benefits. 
                Select a program above to get started.
              </p>
            </div>

            {showCalculator && selectedProgram ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-stevens-lg">
                {/* Left side - Calculator Inputs */}
                <div className="lg:col-span-2 space-y-stevens-md">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-stevens-lg">
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate Your Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-stevens-lg">
                      {/* Selected Program */}
                      <div>
                        <label className="text-sm font-semibold text-stevens-gray-900 mb-2 block">
                          Selected Program
                        </label>
                        <Card className="bg-blue-50 border-blue-200">
                          <CardContent className="p-stevens-md">
                            <div className="flex items-start justify-between">
                              <div>
                                <Badge className="mb-2 bg-stevens-primary">
                                  {selectedProgram.degree}
                                </Badge>
                                <p className="font-semibold text-stevens-gray-900">
                                  {selectedProgram.name}
                                </p>
                                <p className="text-xs text-stevens-gray-600 mt-1">
                                  {selectedProgram.stats?.credits} credits
                        </p>
                      </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedProgram(null);
                                  setCalculatedCost(null);
                                  // Reset discount options
                                  setApplyCPEDiscount(true);
                                  setIsHobokenResident(false);
                                  setIsStevensAlumni(false);
                                  setCustomReimbursement('');
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                    </div>

                      {/* Company Selection */}
                      <div>
                        <label className="text-sm font-semibold text-stevens-gray-900 mb-2 block">
                          Your Company
                        </label>
                        <Select
                          value={selectedCompany?.id}
                          onValueChange={(value) => {
                            const config = getDiscountConfig();
                            const company = config.corporatePartners.find(c => c.id === value);
                            setSelectedCompany(company);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your company" />
                          </SelectTrigger>
                          <SelectContent>
                            {getDiscountConfig().corporatePartners.map(company => (
                              <SelectItem key={company.id} value={company.id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedCompany && selectedCompany.hasSpecialCohort && (
                          <Alert className="mt-2 bg-green-50 border-green-200">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <AlertDescription className="text-xs text-green-800">
                              {selectedCompany.benefits}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      {selectedCompany && calculatedCost && (
                        <>
                          {/* CPE 30% Retail Discount (only show if eligible and before deadline) */}
                          {(() => {
                            const discountAvailability = DiscountCalculator.getDiscountAvailability(selectedProgram.code, selectedCompany.id);
                            if (!discountAvailability?.show30Percent) return null;
                            
                            // Format date from "2026-12-25" to "December 25, 2026"
                            const formatDate = (dateString) => {
                              const date = new Date(dateString);
                              return date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              });
                            };
                            
                            const validUntilDate = discountAvailability.cpeValidUntil 
                              ? formatDate(discountAvailability.cpeValidUntil)
                              : 'December 25, 2026';
                            
                            return (
                              <div className="flex items-start space-x-3 p-stevens-md bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                                <Checkbox
                                  id="cpe-discount"
                                  checked={applyCPEDiscount}
                                  onCheckedChange={setApplyCPEDiscount}
                                  className="mt-0.5"
                                />
                                <div className="flex-1">
                                  <label
                                    htmlFor="cpe-discount"
                                    className="text-sm font-medium text-blue-900 cursor-pointer flex items-center"
                                  >
                                    <Sparkles className="w-4 h-4 mr-1.5 text-blue-600" />
                                    Apply CPE 30% Retail Student Discount
                                  </label>
                                  <p className="text-xs text-blue-800 mt-1">
                                    Special limited-time offer for new online retail students
                                  </p>
                                  <p className="text-xs text-blue-700 mt-1 font-semibold">
                                    ⏰ Apply by {validUntilDate} to qualify
                        </p>
                      </div>
                    </div>
                            );
                          })()}

                          {/* Hoboken Resident (only show if eligible) */}
                          {DiscountCalculator.getDiscountAvailability(selectedProgram.code, selectedCompany.id)?.showHoboken && (
                            <div className="flex items-start space-x-3 p-stevens-md bg-stevens-gray-50 rounded-lg">
                              <Checkbox
                                id="hoboken"
                                checked={isHobokenResident}
                                onCheckedChange={setIsHobokenResident}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="hoboken"
                                  className="text-sm font-medium text-stevens-gray-900 cursor-pointer"
                                >
                                  I am a Hoboken resident
                                </label>
                                <p className="text-xs text-stevens-gray-600 mt-1">
                                  5% additional discount for Hoboken residents
                        </p>
                      </div>
                    </div>
                          )}

                          {/* Stevens Alumni (only show if eligible) */}
                          {DiscountCalculator.getDiscountAvailability(selectedProgram.code, selectedCompany.id)?.showAlumni && (
                            <div className="flex items-start space-x-3 p-stevens-md bg-stevens-gray-50 rounded-lg">
                              <Checkbox
                                id="alumni"
                                checked={isStevensAlumni}
                                onCheckedChange={setIsStevensAlumni}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="alumni"
                                  className="text-sm font-medium text-stevens-gray-900 cursor-pointer"
                                >
                                  I am a Stevens Institute of Technology alumni
                                </label>
                                <p className="text-xs text-stevens-gray-600 mt-1">
                                  5% alumni discount for Stevens graduates
                                </p>
                  </div>
                </div>
                          )}

                          {/* Employer Reimbursement - Required Input */}
                <div>
                            <label className="text-sm font-semibold text-stevens-gray-900 mb-2 flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              Your Employer Reimbursement
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stevens-gray-600 font-medium">
                                $
                              </span>
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                value={customReimbursement}
                                onChange={(e) => setCustomReimbursement(e.target.value)}
                                className="w-full pl-8"
                              />
                              {customReimbursement && (
                                <button
                                  onClick={() => setCustomReimbursement('')}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stevens-gray-400 hover:text-stevens-gray-600"
                                  aria-label="Clear"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Right side - Cost Breakdown */}
                <div className="lg:col-span-3">
                  {calculatedCost ? (
                    <Card className="sticky top-4">
                      <CardHeader className="bg-gradient-to-r from-stevens-primary to-red-700 text-stevens-white">
                        <CardTitle className="text-stevens-2xl">
                          Your Investment Breakdown
                      </CardTitle>
                        <p className="text-stevens-white/90 text-sm">
                          {calculatedCost.programName}
                        </p>
                    </CardHeader>
                      <CardContent className="p-stevens-lg">
                        {/* Base Price */}
                        <div className="mb-stevens-lg pb-stevens-md border-b-2">
                          <div className="flex justify-between items-center">
                            <span className="text-stevens-gray-700">
                              {calculatedCost.credits.type === 'variable' ? 'Program Cost' : 'Standard Program Price'}
                            </span>
                            <span className="text-stevens-2xl font-bold text-stevens-gray-900">
                              ${calculatedCost.basePrice.toLocaleString()}
                            </span>
                      </div>
                          {calculatedCost.credits.type === 'fixed' && (
                            <p className="text-xs text-stevens-gray-600 mt-1">
                              {calculatedCost.credits.value} credits
                            </p>
                          )}
                          {calculatedCost.credits.type === 'variable' && !calculatedCost.cohortPricing && (
                            <p className="text-xs text-stevens-gray-600 mt-1">
                              Based on typical {calculatedCost.credits.typical} credits
                            </p>
                          )}
                        </div>


                        {/* Variable Credit Info - WITHOUT Cohort Pricing (Use Case 4) */}
                        {!calculatedCost.cohortPricing && 
                         calculatedCost.credits.type === 'variable' && (
                          <div className="mb-stevens-lg">
                            <Alert className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                              <Info className="w-5 h-5 text-blue-600" />
                              <AlertTitle className="text-blue-900 font-semibold mb-2">
                                Variable Credit Program
                              </AlertTitle>
                              <AlertDescription>
                                <p className="text-sm text-blue-800 mb-2">
                                  {calculatedCost.programName} requires {calculatedCost.credits.min}-{calculatedCost.credits.max} credits 
                                  based on concentration. Estimate uses {calculatedCost.credits.typical} credits.
                                </p>
                                <p className="text-xs text-blue-700 flex items-center">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Cost range: ${Math.round(calculatedCost.basePrice * calculatedCost.credits.min / calculatedCost.credits.typical).toLocaleString()} - 
                                  ${Math.round(calculatedCost.basePrice * calculatedCost.credits.max / calculatedCost.credits.typical).toLocaleString()}
                                  {' '}({calculatedCost.credits.min}-{calculatedCost.credits.max} credits at standard rate)
                                </p>
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {/* MEADS Special Pricing Message (Use Case 5) */}
                        {calculatedCost.programCode === 'meads' && !calculatedCost.hasSpecialCohort && (
                          <div className="mb-stevens-lg">
                            <Alert className="bg-blue-50 border-blue-200">
                              <Info className="w-5 h-5 text-blue-600" />
                              <AlertTitle className="text-blue-900 font-semibold mb-2">
                                MEADS Special Pricing
                              </AlertTitle>
                              <AlertDescription>
                                <p className="text-sm text-blue-800">
                                  This program has fixed pricing at ${calculatedCost.basePrice.toLocaleString()}.
                                  The 30% retail discount is not applicable.
                                </p>
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {/* Certificate Program Benefits Message (Use Case 7) */}
                        {calculatedCost.programCode.startsWith('cert-') && (
                          <div className="mb-stevens-lg">
                            <Alert className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                              <Sparkles className="w-5 h-5 text-green-600" />
                              <AlertTitle className="text-green-900 font-semibold mb-2">
                                Certificate Program Benefits
                              </AlertTitle>
                              <AlertDescription>
                                <p className="text-sm text-green-800 mb-2">
                                  Professional certificates are priced at ${calculatedCost.basePrice.toLocaleString()} 
                                  ({calculatedCost.credits.value} credits) to align with IRS Section 127 annual limits.
                                </p>
                                <p className="text-xs text-green-700 flex items-center">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  This certificate can stack toward a full master's degree!
                                </p>
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {/* Discount Steps */}
                        <div className="space-y-stevens-md mb-stevens-lg">
                          {calculatedCost.steps.map((step, index) => {
                            const Icon = step.icon === 'building' ? Building :
                                        step.icon === 'sparkles' ? Sparkles :
                                        step.icon === 'home' ? Home :
                                        step.icon === 'graduation-cap' ? GraduationCap :
                                        step.icon === 'briefcase' ? Briefcase : CheckCircle;
                            
                            const isCohortVariable = step.type === 'cohort-variable';
                            const isCohortFixed = step.type === 'cohort-fixed';
                            
                            return (
                              <div key={index}>
                                <div className="flex items-start space-x-3 p-stevens-md bg-green-50 rounded-lg border border-green-200">
                                  <Icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-stevens-gray-900 text-sm">
                                          {step.name}
                                        </p>
                                        <p className="text-xs text-stevens-gray-600 mt-0.5">
                                          {step.description}
                                        </p>
                                        {step.percentage && (
                                          <Badge variant="secondary" className="mt-1 text-xs">
                                            {step.percentage}% off
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-right ml-4 flex-shrink-0">
                                        <p className="font-bold text-green-700">
                                          -${step.discountAmount.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    {/* Cohort Fixed: Show per credit calculation */}
                                    {isCohortFixed && calculatedCost.cohortPricing && (
                                      <div className="mt-stevens-sm">
                                        <div className="bg-white rounded-lg px-3 py-2 border border-green-200">
                                          <p className="text-xs font-medium text-stevens-gray-900">
                                            ${calculatedCost.cohortPricing.perCredit} per credit × {calculatedCost.cohortPricing.credits} credits
                                          </p>
                                          <p className="text-sm font-bold text-stevens-primary mt-1">
                                            Cohort Price: ${calculatedCost.cohortPricing.totalPrice.toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Embedded Pricing Table for Cohort Variable */}
                                    {isCohortVariable && calculatedCost.cohortPricing?.credits && (
                                      <div className="mt-stevens-md">
                                        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-green-200">
                                          <div className="bg-blue-50 px-3 py-2 border-b border-green-200">
                                            <p className="text-xs font-semibold text-blue-900 flex items-center">
                                              <Info className="w-3 h-3 mr-1" />
                                              📊 Credit-based pricing ({calculatedCost.credits.min}-{calculatedCost.credits.max} credits):
                                            </p>
                                          </div>
                                          <div className="divide-y divide-gray-200">
                                            {Object.entries(calculatedCost.cohortPricing.credits).map(([key, data]) => {
                                              const isTypical = key === 'typical';
                                              return (
                                                <div 
                                                  key={key}
                                                  className={`flex justify-between items-center px-3 py-2 ${isTypical ? 'bg-blue-50' : 'bg-white'}`}
                                                >
                                                  <span className="text-xs">
                                                    <Badge variant={isTypical ? "default" : "outline"} className="text-xs mr-1">
                                                      {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </Badge>
                                                    {data.credits} credits
                                                  </span>
                                                  <span className="text-sm font-bold text-stevens-primary">
                                                    ${data.price.toLocaleString()}
                        </span>
                      </div>
                                              );
                                            })}
                                          </div>
                                          <div className="bg-blue-50 px-3 py-2 border-t border-green-200">
                                            <p className="text-xs text-blue-700 flex items-center">
                                              <Sparkles className="w-3 h-3 mr-1" />
                                              💡 Actual credits depend on your chosen concentration
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Final Price */}
                        <div className="bg-gradient-to-r from-stevens-primary to-red-700 text-stevens-white p-stevens-lg rounded-lg">
                          {/* Variable credit: Show COST RANGE */}
                          {calculatedCost.credits.type === 'variable' ? (() => {
                             const employerReimbursement = calculatedCost.steps.find(s => s.type === 'reimbursement')?.discountAmount || 0;
                             const hasReimbursement = employerReimbursement > 0;
                             
                             let minCost, maxCost;
                             
                             if (calculatedCost.cohortPricing?.credits) {
                               // WITH cohort: Use cohort pricing directly
                               minCost = Math.max(0, calculatedCost.cohortPricing.credits.min.price - employerReimbursement);
                               maxCost = Math.max(0, calculatedCost.cohortPricing.credits.max.price - employerReimbursement);
                             } else {
                               // WITHOUT cohort: Calculate proportionally
                               const otherDiscounts = calculatedCost.basePrice - calculatedCost.finalPrice - employerReimbursement;
                               
                               const minCreditsBase = Math.round(calculatedCost.basePrice * calculatedCost.credits.min / calculatedCost.credits.typical);
                               const maxCreditsBase = Math.round(calculatedCost.basePrice * calculatedCost.credits.max / calculatedCost.credits.typical);
                               
                               const minCreditsDiscount = Math.round(otherDiscounts * calculatedCost.credits.min / calculatedCost.credits.typical);
                               const maxCreditsDiscount = Math.round(otherDiscounts * calculatedCost.credits.max / calculatedCost.credits.typical);
                               
                               minCost = Math.max(0, minCreditsBase - minCreditsDiscount - employerReimbursement);
                               maxCost = Math.max(0, maxCreditsBase - maxCreditsDiscount - employerReimbursement);
                             }
                             
                             return (
                               <>
                                 <div className="mb-stevens-md pb-stevens-md border-b border-stevens-white/20">
                                   <span className="text-sm font-medium text-stevens-white/90">YOUR COST RANGE</span>
                                   <div className="text-stevens-3xl font-bold mt-1">
                                     ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
                                   </div>
                                 </div>
                                 <div className="flex justify-between items-center">
                                   <span className="text-sm font-medium text-stevens-white/90">
                                     Based on {calculatedCost.credits.typical} credits:
                                   </span>
                                   <span className="text-stevens-2xl font-bold">
                                     ${calculatedCost.finalPrice.toLocaleString()}
                        </span>
                      </div>
                                 {!hasReimbursement && (
                                   <p className="text-xs text-stevens-white/70 mt-2 italic">
                                     * Before employer reimbursement
                                   </p>
                                 )}
                               </>
                             );
                           })() : (
                             /* Fixed credits: Show single price */
                             <>
                               <div className="flex justify-between items-center mb-2">
                                 <span className="text-lg font-semibold">
                                   {calculatedCost.steps.find(s => s.type === 'reimbursement') ? 'YOUR FINAL COST' : 'YOUR COST'}
                                 </span>
                                 <span className="text-stevens-4xl font-bold">
                                   ${calculatedCost.finalPrice.toLocaleString()}
                                 </span>
                               </div>
                               {!calculatedCost.steps.find(s => s.type === 'reimbursement') && (
                                 <p className="text-xs text-stevens-white/70 italic">
                                   * Before employer reimbursement
                                 </p>
                               )}
                             </>
                           )}
                          
                          <div className="flex items-center mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                            <Star className="w-5 h-5 mr-2 fill-current" />
                            <span className="text-lg">
                              You save {calculatedCost.percentSaved}%!
                            </span>
                          </div>
                          
                          {/* Prompt to add reimbursement if not entered */}
                          {!calculatedCost.steps.find(s => s.type === 'reimbursement') && (
                            <div className="mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <div className="flex items-start text-stevens-white/90">
                                <Briefcase className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-semibold mb-1">Add your employer reimbursement above</p>
                                  <p className="text-xs text-stevens-white/80">
                                    Most employers offer up to ${getDiscountConfig().employerReimbursement.defaultAnnual.toLocaleString()}/year
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Certificate FREE message */}
                          {calculatedCost.programCode.startsWith('cert-') && calculatedCost.finalPrice === 0 && (
                            <div className="mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <div className="flex items-center text-stevens-white">
                                <CheckCircle className="w-6 h-6 mr-2 fill-current" />
                                <span className="text-lg font-bold">
                                  💯 Fully covered by employer benefits!
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="mt-stevens-lg space-y-stevens-sm">
                          <Link 
                            to={`${createPageUrl('/accelerated-application/')}?program=${selectedProgram.code}${corporateCode ? `&code=${corporateCode}` : ''}`}
                          >
                            <Button size="lg" className="w-full text-stevens-white">
                              Start Your Application
                             
                            </Button>
                          </Link>
                          <p className="text-center text-xs text-stevens-gray-600">
                            Questions? <a href="#" className="text-stevens-primary hover:underline font-semibold">Talk to an advisor</a>
                          </p>
                      </div>
                    </CardContent>
                  </Card>
                  ) : (
                    <Card className="h-full flex items-center justify-center p-stevens-2xl">
                      <div className="text-center text-stevens-gray-500">
                        <Calculator className="w-16 h-16 mx-auto mb-stevens-md opacity-50" />
                        <p className="text-lg font-semibold mb-2">Select a company to see your personalized pricing</p>
                        <p className="text-sm">Choose your employer from the dropdown to calculate your actual cost</p>
                </div>
                    </Card>
                  )}
              </div>
            </div>
            ) : (
              /* Default view - select a program message */
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-stevens-2xl pt-stevens-2xl text-center">
                  <Calculator className="w-16 h-16 mx-auto mb-stevens-xl text-stevens-gray-400" />
                  <h3 className="font-stevens-display text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg">
                    Ready to see your actual cost?
                  </h3>
                  <p className="text-stevens-base lg:text-stevens-lg text-stevens-gray-700 mb-stevens-xl max-w-xl mx-auto leading-relaxed">
                    Click "Calculate Your Cost" on any program above to see how corporate discounts 
                    and employer benefits can make your education more affordable.
                  </p>
                  <Button
                    className="text-stevens-white"
                    size="lg"
                    onClick={() => {
                      // Scroll to programs section
                      document.getElementById('programs-section')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    
                    Explore Programs Above
                    <ArrowRight className="mr-2 w-5 h-5 rotate-[-90deg]" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Your Learning Journey */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                How to Apply for Admission & Receive Your Benefits
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Follow these steps to start your journey with Stevens and unlock your corporate benefits.
              </p>
            </div>

            {/* Table Layout for Desktop, Card Layout for Mobile */}
            <div className="bg-stevens-white rounded-stevens-lg overflow-hidden shadow-stevens-md">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-stevens-gray-800 text-stevens-white">
                      <th className="px-stevens-lg py-stevens-md text-left font-stevens-bold text-stevens-base uppercase tracking-wide">
                        Action Needed
                      </th>
                      <th className="px-stevens-lg py-stevens-md text-left font-stevens-bold text-stevens-base uppercase tracking-wide">
                        For Your Corporate Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationSteps.map((step, index) => (
                      <tr 
                        key={step.step}
                        className={`border-b border-stevens-gray-200 ${index % 2 === 0 ? 'bg-stevens-white' : 'bg-stevens-gray-50'}`}
                      >
                        <td className="px-stevens-lg py-stevens-lg align-top w-2/5">
                          <p className="font-stevens-semibold text-stevens-gray-900">
                            <span className="text-stevens-primary font-stevens-bold">Step {step.step}</span> - {step.actionNeeded}
                          </p>
                        </td>
                        <td className="px-stevens-lg py-stevens-lg align-top w-3/5">
                          <p className="text-stevens-gray-700 leading-relaxed">
                            {step.forYourPlan}
                            {step.linkText && step.linkTarget && (
                              <>
                                {' '}
                                {step.isExternal ? (
                                  <a
                                    href={step.linkTarget}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stevens-primary font-stevens-semibold hover:text-stevens-primary/80 underline transition-colors"
                                  >
                                    {step.linkText}
                                  </a>
                                ) : (
                                  <button
                                    onClick={() => scrollToSection(step.linkTarget)}
                                    className="text-stevens-primary font-stevens-semibold hover:text-stevens-primary/80 underline transition-colors"
                                  >
                                    {step.linkText}
                                  </button>
                                )}
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-stevens-gray-200">
                {applicationSteps.map((step) => (
                  <div key={step.step} className="p-stevens-lg">
                    <div className="mb-stevens-md">
                      <p className="font-stevens-bold text-stevens-primary text-stevens-sm uppercase mb-stevens-xs">
                        Step {step.step}
                      </p>
                      <p className="font-stevens-semibold text-stevens-gray-900 text-stevens-base">
                        {step.actionNeeded}
                      </p>
                    </div>
                    <p className="text-stevens-gray-700 text-stevens-sm leading-relaxed">
                      {step.forYourPlan}
                      {step.linkText && step.linkTarget && (
                        <>
                          {' '}
                          {step.isExternal ? (
                            <a
                              href={step.linkTarget}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-stevens-primary font-stevens-semibold hover:text-stevens-primary/80 underline transition-colors"
                            >
                              {step.linkText}
                            </a>
                          ) : (
                            <button
                              onClick={() => scrollToSection(step.linkTarget)}
                              className="text-stevens-primary font-stevens-semibold hover:text-stevens-primary/80 underline transition-colors"
                            >
                              {step.linkText}
                            </button>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StudentSuccessCarousel stories={successStories} />

        {/* FAQ Section */}
        <EmployerFaqSection accordionPrefix="corporate-students" />

        {/* Final CTA Section */}
        <section id="contact" className="py-stevens-section-sm lg:py-stevens-section bg-stevens-primary text-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md">
                Ready to Take the Next Step?
              </h2>
              <p className="text-stevens-lg mb-stevens-xl max-w-2xl mx-auto opacity-90">
                Join thousands of professionals advancing their careers through Stevens Online 
                with the exclusive benefits available to partner employees.
              </p>
              

              <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 w-full sm:w-auto min-w-[280px]"
                  onClick={handleApplicationStart}
                >
                  Start Your Accelerated Application
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-stevens-white text-stevens-white bg-transparent hover:bg-stevens-white hover:text-stevens-primary transition-all duration-stevens-normal w-full sm:w-auto min-w-[280px]"
                  onClick={() => {
                    trackEvent('corporate_advisor_contact', {
                      company: companyName || 'unknown'
                    });
                  }}
                >
                  Talk to Corporate Care Advisor
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Application Modal */}
        {showApplicationModal && (
          <ApplicationModal
            isOpen={showApplicationModal}
            onClose={() => setShowApplicationModal(false)}
            corporateCode={corporateCode}
            programCode={searchParams.get('program')}
          />
        )}
      </div>
    </PageContextProvider>
  );
};

export default CorporateStudents;
