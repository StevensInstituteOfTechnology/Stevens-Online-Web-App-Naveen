import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
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
  Phone,
  Mail,
  Calendar,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  Wrench,
  BarChart3
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ImageTestimonial from '@/components/shared/ImageTestimonial';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl, createPageUrl } from '@/utils';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { PROGRAMS_DATA } from '@/data/programsData';
import { calculateProgramCost, getDiscountConfig, getDiscountInfo, getProgramRecommendations } from '@/utils/discountCalculator';
import { BOOKING_URLS, CONTACT_INFO } from '@/config/constants';
import EmployerFaqSection from '@/components/corporate/EmployerFaqSection';


const CorporateStudents = () => {
  const [searchParams] = useSearchParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showContactOptionsModal, setShowContactOptionsModal] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [corporateCode, setCorporateCode] = useState(null);
  
  // Questionnaire States
  const [questionnaireStep, setQuestionnaireStep] = useState(0); // 0: interest, 1: credential, 2: program selection
  const [selectedInterest, setSelectedInterest] = useState(null); // 'management' or 'engineering'
  const [selectedCredentialType, setSelectedCredentialType] = useState(null); // 'masters' or 'certificate'
  const [recommendedPrograms, setRecommendedPrograms] = useState([]);
  
  // Cost Calculator States
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isWorkforcePartner, setIsWorkforcePartner] = useState(false);
  const [isHobokenResident, setIsHobokenResident] = useState(false);
  const [isStevensAlumni, setIsStevensAlumni] = useState(false);
  const [annualReimbursement, setAnnualReimbursement] = useState('');
  const [calculatedCost, setCalculatedCost] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Get discount info for display
  const discountInfo = getDiscountInfo();

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

    trackEvent('corporate_student_landing', {
      company: company || 'direct',
      has_code: !!code
    });
  }, [searchParams]);

  // Update recommended programs when questionnaire answers change
  useEffect(() => {
    if (selectedInterest && selectedCredentialType) {
      const programCodes = getProgramRecommendations(selectedInterest, selectedCredentialType);
      const programs = programCodes
        .map(code => PROGRAMS_DATA.find(p => p.code === code))
        .filter(Boolean);
      setRecommendedPrograms(programs);
    }
  }, [selectedInterest, selectedCredentialType]);

  // Calculate cost whenever inputs change
  useEffect(() => {
    if (selectedProgram) {
      const options = {
        isWorkforcePartner,
        isHobokenResident,
        isStevensAlumni,
        annualReimbursement: annualReimbursement || undefined
      };
      
      const result = calculateProgramCost(selectedProgram.code, options);
      setCalculatedCost(result);
      
      trackEvent('cost_calculator_used', {
        program: selectedProgram.code,
        has_workforce_partner: isWorkforcePartner,
        has_hoboken: isHobokenResident,
        has_alumni: isStevensAlumni,
        has_reimbursement: !!annualReimbursement
      });
    }
  }, [selectedProgram, isWorkforcePartner, isHobokenResident, isStevensAlumni, annualReimbursement]);

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

  // Success stories / testimonials
  const testimonials = [
    {
      quote: "I can confidently say that enrolling in the Stevens MBA program was one of my best decisions. Stevens offers a comprehensive curriculum that helps students develop invaluable skills to navigate the complex business world and improve their professional capabilities.",
      author: "Rupinder Bhullar '21",
      title: "Director of Enterprise Automation Services, Pfizer",
    },
  ];

  // Learning journey steps - Application & Benefits
  const applicationSteps = [
    {
      step: 1,
      actionNeeded: "Answer two quick questions",
      forYourPlan: "Tell us about your career interests and credential preferences. We'll recommend the perfect program for you.",
      linkText: "Get Started",
      linkTarget: "#programs-section"
    },
    {
      step: 2,
      actionNeeded: "Select your recommended program",
      forYourPlan: "Choose from our personalized recommendations based on your interests—whether you're looking for a master's degree or a stackable certificate."
    },
    {
      step: 3,
      actionNeeded: "Calculate your actual cost",
      forYourPlan: "Use our interactive calculator to see your out-of-pocket cost after workforce partner discounts and employer reimbursement.",
      linkText: "Try Calculator",
      linkTarget: "#cost-calculator"
    },
    {
      step: 4,
      actionNeeded: "Start your application",
      forYourPlan: "Click the \"Apply Now\" button to begin your application. If you have any questions or need assistance, feel free to ",
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

  const handleCTAClick = (ctaType) => {
    trackEvent('corporate_student_cta_clicked', {
      page: 'corporate_students',
      cta_type: ctaType,
      company: companyName || 'unknown'
    });
    
    if (ctaType === 'request_info') {
      trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);
    }
  };

  // Handle questionnaire selection
  const handleInterestSelect = (interest) => {
    setSelectedInterest(interest);
    setQuestionnaireStep(1);
    trackEvent('questionnaire_interest_selected', { interest });
  };

  const handleCredentialSelect = (credentialType) => {
    setSelectedCredentialType(credentialType);
    setQuestionnaireStep(2);
    trackEvent('questionnaire_credential_selected', { credentialType });
  };

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setShowCalculator(true);
    // Reset discount options
    setIsWorkforcePartner(false);
    setIsHobokenResident(false);
    setIsStevensAlumni(false);
    setAnnualReimbursement('');
    
    setTimeout(() => {
      document.getElementById('cost-calculator')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
    
    trackEvent('program_selected_from_questionnaire', {
      program_code: program.code,
      interest: selectedInterest,
      credential_type: selectedCredentialType
    });
  };

  const resetQuestionnaire = () => {
    setQuestionnaireStep(0);
    setSelectedInterest(null);
    setSelectedCredentialType(null);
    setRecommendedPrograms([]);
  };
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (showContactModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showContactModal) {
        setShowContactModal(false);
      }
    };
    
    if (showContactModal) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showContactModal]);

  // Questionnaire Component
  const ProgramQuestionnaire = () => (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 0: Interest Selection */}
        {questionnaireStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-stevens-xl">
              <Badge className="mb-stevens-md bg-stevens-primary/10 text-stevens-primary border-none">
                Step 1 of 2
              </Badge>
              <h3 className="font-stevens-display text-stevens-2xl md:text-stevens-3xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
                What area interests you most?
              </h3>
              <p className="text-stevens-lg text-stevens-gray-600">
                Select your primary career focus to see personalized program recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stevens-lg">
              {/* Management Option */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInterestSelect('management')}
                className="group relative bg-stevens-white rounded-stevens-xl p-stevens-xl border-2 border-stevens-gray-200 hover:border-stevens-primary hover:shadow-stevens-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start gap-stevens-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-stevens-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors">
                      Management & Business
                    </h4>
                    <p className="text-stevens-gray-600 text-stevens-sm leading-relaxed">
                      Leadership, strategy, operations, and business analytics for career advancement
                    </p>
                    <div className="mt-stevens-md flex flex-wrap gap-stevens-xs">
                      <Badge variant="secondary" className="text-xs">MBA</Badge>
                      <Badge variant="secondary" className="text-xs">Engineering Management</Badge>
                    </div>
                  </div>
                </div>
                <ArrowRight className="absolute top-1/2 right-stevens-lg -translate-y-1/2 w-6 h-6 text-stevens-gray-300 group-hover:text-stevens-primary group-hover:translate-x-1 transition-all" />
              </motion.button>

              {/* Engineering Option */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInterestSelect('engineering')}
                className="group relative bg-stevens-white rounded-stevens-xl p-stevens-xl border-2 border-stevens-gray-200 hover:border-stevens-primary hover:shadow-stevens-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start gap-stevens-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-stevens-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors">
                      Engineering & Technology
                    </h4>
                    <p className="text-stevens-gray-600 text-stevens-sm leading-relaxed">
                      Computer science, data science, AI, and technical engineering skills
                    </p>
                    <div className="mt-stevens-md flex flex-wrap gap-stevens-xs">
                      <Badge variant="secondary" className="text-xs">Computer Science</Badge>
                      <Badge variant="secondary" className="text-xs">Data Science</Badge>
                    </div>
                  </div>
                </div>
                <ArrowRight className="absolute top-1/2 right-stevens-lg -translate-y-1/2 w-6 h-6 text-stevens-gray-300 group-hover:text-stevens-primary group-hover:translate-x-1 transition-all" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Credential Type Selection */}
        {questionnaireStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-stevens-xl">
              <button 
                onClick={() => setQuestionnaireStep(0)}
                className="inline-flex items-center text-stevens-primary hover:text-stevens-primary/80 mb-stevens-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <Badge className="mb-stevens-md bg-stevens-primary/10 text-stevens-primary border-none ml-4">
                Step 2 of 2
              </Badge>
              <h3 className="font-stevens-display text-stevens-2xl md:text-stevens-3xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
                What type of credential are you looking for?
              </h3>
              <p className="text-stevens-lg text-stevens-gray-600">
                Choose between a full master's degree or a stackable certificate.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stevens-lg">
              {/* Master's Degree Option */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCredentialSelect('masters')}
                className="group relative bg-stevens-white rounded-stevens-xl p-stevens-xl border-2 border-stevens-gray-200 hover:border-stevens-primary hover:shadow-stevens-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start gap-stevens-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-stevens-primary to-red-700 rounded-stevens-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors">
                      Master's Degree
                    </h4>
                    <p className="text-stevens-gray-600 text-stevens-sm leading-relaxed">
                      Complete graduate degree program with comprehensive curriculum
                    </p>
                    <div className="mt-stevens-md space-y-1 text-xs text-stevens-gray-500">
                      <p>• 30-48 credits</p>
                      <p>• 18-24 months typical completion</p>
                      <p>• Full master's credential</p>
                    </div>
                  </div>
                </div>
                <ArrowRight className="absolute top-1/2 right-stevens-lg -translate-y-1/2 w-6 h-6 text-stevens-gray-300 group-hover:text-stevens-primary group-hover:translate-x-1 transition-all" />
              </motion.button>

              {/* Certificate Option */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCredentialSelect('certificate')}
                className="group relative bg-stevens-white rounded-stevens-xl p-stevens-xl border-2 border-stevens-gray-200 hover:border-stevens-primary hover:shadow-stevens-xl transition-all duration-300 text-left"
              >
                <div className="flex items-start gap-stevens-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-stevens-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors">
                      Stackable Certificate
                    </h4>
                    <p className="text-stevens-gray-600 text-stevens-sm leading-relaxed">
                      Immediate credential that counts toward a master's degree
                    </p>
                    <div className="mt-stevens-md space-y-1 text-xs text-stevens-gray-500">
                      <p>• 9 graduate credits</p>
                      <p>• 8-20 weeks to complete</p>
                      <p>• Stacks toward full degree</p>
                    </div>
                  </div>
                </div>
                <ArrowRight className="absolute top-1/2 right-stevens-lg -translate-y-1/2 w-6 h-6 text-stevens-gray-300 group-hover:text-stevens-primary group-hover:translate-x-1 transition-all" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Program Recommendations */}
        {questionnaireStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-stevens-xl">
              <button 
                onClick={() => setQuestionnaireStep(1)}
                className="inline-flex items-center text-stevens-primary hover:text-stevens-primary/80 mb-stevens-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <Badge className="mb-stevens-md bg-green-100 text-green-700 border-none ml-4">
                <CheckCircle className="w-3 h-3 mr-1" />
                Personalized Recommendations
              </Badge>
              <h3 className="font-stevens-display text-stevens-2xl md:text-stevens-3xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
                {recommendedPrograms.length === 1 ? 'Your Perfect Match' : 'Programs Recommended for You'}
              </h3>
              <p className="text-stevens-lg text-stevens-gray-600">
                Based on your interest in <span className="font-semibold text-stevens-primary">{selectedInterest === 'management' ? 'Management & Business' : 'Engineering & Technology'}</span> and preference for a <span className="font-semibold text-stevens-primary">{selectedCredentialType === 'masters' ? "Master's Degree" : 'Stackable Certificate'}</span>
              </p>
            </div>
            
            <div className={`grid gap-stevens-lg ${recommendedPrograms.length === 1 ? 'max-w-xl mx-auto' : recommendedPrograms.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {recommendedPrograms.map((program, index) => (
                <motion.div
                  key={program.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-stevens-white rounded-stevens-xl shadow-stevens-lg hover:shadow-stevens-2xl border-2 border-stevens-gray-200 hover:border-stevens-primary overflow-hidden transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-stevens-gray-100 to-stevens-gray-200">
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover transition-transform duration-stevens-slow group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-stevens-primary/20 to-stevens-primary/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute top-stevens-md left-stevens-md">
                      <div className="bg-stevens-primary/90 backdrop-blur-sm text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-stevens-semibold text-stevens-sm">
                        {program.degree}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-stevens-lg">
                    <h4 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors">
                      {program.shortName || program.name}
                    </h4>
                    
                    {program.stats && (
                      <div className="flex flex-wrap gap-stevens-sm text-xs text-stevens-gray-600 mb-stevens-md">
                        {program.stats.duration && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {program.stats.duration}
                          </span>
                        )}
                        {program.stats.credits && (
                          <span className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {program.stats.credits} credits
                          </span>
                        )}
                      </div>
                    )}

                    <Button 
                      className="w-full bg-stevens-primary hover:bg-stevens-maroon-dark text-stevens-white"
                      onClick={() => handleProgramSelect(program)}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Your Cost
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-stevens-xl">
              <button 
                onClick={resetQuestionnaire}
                className="text-stevens-primary hover:text-stevens-primary/80 underline text-sm transition-colors"
              >
                Start over with different preferences
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );


  return (
    <PageContextProvider pageType="landing" pageName="Corporate Students">
      <div className="min-h-screen bg-stevens-white">
        {/* Hero Section */}
        <PageHero
          titleLines={["Advance Your Career", "with Stevens Online"]}
          subtitle={
            companyName 
              ? `As a ${companyName} employee, you have exclusive access to flexible online programs, simplified admissions, and dedicated support designed to help you gain in-demand skills and achieve your career goals faster.`
              : "As an employee of a Stevens corporate partner, you have exclusive access to flexible online programs, simplified admissions, and dedicated support designed to help you gain in-demand skills and achieve your career goals faster."
          }
          bgImage="/assets/images/corporate-students/JV4_7586_4258.webp"
          bgImagePosition="center 30%"
          primaryCta={{
            label: "Request Information",
            onClick: () => {
              handleCTAClick('request_info');
              setShowContactModal(true);
            }
          }}
          secondaryCta={{
            label: "Contact Us",
            onClick: () => {
              handleCTAClick('contact_us');
              setShowContactOptionsModal(true);
            }
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
              {partnerBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={benefit.title} 
                    className="text-center p-stevens-md rounded-stevens-lg transition-all duration-300 hover:bg-stevens-white hover:shadow-stevens-md group border border-transparent hover:border-stevens-gray-200 flex flex-col"
                  >
                    <div className="mb-stevens-md flex justify-center">
                      <div className="w-16 h-16 bg-stevens-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-stevens-primary/90 group-hover:scale-105">
                        <Icon className="w-8 h-8 text-stevens-white" />
                      </div>
                    </div>

                    <h3 className="font-stevens-display text-stevens-base lg:text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm group-hover:text-stevens-primary transition-colors min-h-[90px] flex items-center justify-center">
                      {benefit.title}
                    </h3>

                    <p className="text-stevens-sm text-stevens-gray-600 leading-relaxed group-hover:text-stevens-gray-700 transition-colors">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Stevens Online - Full-bleed image section */}
        <section className="w-full">
          <div className="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[700px] overflow-hidden">
            <img
              src="/assets/images/shared/accreditation.webp"
              alt="Stevens Online students and professionals"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '20% center' }}
            />
            <div 
              className="absolute inset-0 hidden lg:block"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)'
              }}
            />

            <div className="hidden lg:flex relative z-10 h-full min-h-[700px] flex-col justify-end items-end">
              <div className="px-16 xl:px-20 pb-16 lg:pb-20 max-w-3xl text-left">
                <div className="flex items-center mb-6 w-full">
                  <svg className="w-6 h-6 mx-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#D4A843" />
                  </svg>
                  <div className="flex-grow h-[1px] bg-[#D4A843]" />
                </div>

                <h2 className="font-stevens-display text-4xl lg:text-stevens-4xl font-stevens-bold text-white leading-tight mb-6">
                  A Top-Ranked University Built for Working Professionals
                </h2>
                
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  Stevens brings together industry-leading faculty, cutting-edge technology, and a focus on 
                  career outcomes, empowering professionals to thrive in the future of work.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:hidden bg-stevens-primary px-6 sm:px-8 md:px-12 py-10 sm:py-12 md:py-16">
            <div className="flex items-center mb-4 sm:mb-6 w-full max-w-2xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#D4A843" />
              </svg>
              <div className="flex-grow h-[1px] bg-[#D4A843]" />
            </div>

            <h2 className="font-stevens-display text-2xl sm:text-3xl md:text-4xl font-stevens-bold text-white leading-tight mb-4 sm:mb-6">
              A Top-Ranked University Built for Working Professionals
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
              Stevens brings together industry-leading faculty, cutting-edge technology, and a focus on 
              career outcomes, empowering professionals to thrive in the future of work.
            </p>
          </div>
        </section>

        {/* Program Selection Questionnaire */}
        <section id="programs-section" className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-stevens-xl"
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Find Your Perfect Program
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-4xl mx-auto">
                Answer two quick questions and we'll recommend the best programs for your career goals.
              </p>
            </motion.div>

            <ProgramQuestionnaire />
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
                Calculate your actual cost with workforce partner discounts and employer benefits.
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
                                  {selectedProgram.stats?.credits} credits • {calculatedCost?.durationYears === 1 ? '1 year' : `${calculatedCost?.durationYears} years`}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedProgram(null);
                                  setCalculatedCost(null);
                                  setShowCalculator(false);
                                  setIsWorkforcePartner(false);
                                  setIsHobokenResident(false);
                                  setIsStevensAlumni(false);
                                  setAnnualReimbursement('');
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Workforce Partner Discount */}
                      <div className="flex items-start space-x-3 p-stevens-md bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                        <Checkbox
                          id="workforce-partner"
                          checked={isWorkforcePartner}
                          onCheckedChange={setIsWorkforcePartner}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="workforce-partner"
                            className="text-sm font-medium text-blue-900 cursor-pointer flex items-center"
                          >
                            <Building className="w-4 h-4 mr-1.5 text-blue-600" />
                            Is your employer a Stevens workforce development partner?
                          </label>
                          <p className="text-xs text-blue-800 mt-1">
                            {discountInfo.workforcePartner.percentage}% discount (average savings of ~20%)
                          </p>
                        </div>
                      </div>

                      {/* Hoboken Resident Discount */}
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
                            className="text-sm font-medium text-stevens-gray-900 cursor-pointer flex items-center"
                          >
                            <Home className="w-4 h-4 mr-1.5 text-stevens-gray-600" />
                            I am a Hoboken resident
                          </label>
                          <p className="text-xs text-stevens-gray-600 mt-1">
                            {discountInfo.hobokenResident.percentage}% additional discount for Hoboken residents
                          </p>
                        </div>
                      </div>

                      {/* Stevens Alumni Discount */}
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
                            className="text-sm font-medium text-stevens-gray-900 cursor-pointer flex items-center"
                          >
                            <GraduationCap className="w-4 h-4 mr-1.5 text-stevens-gray-600" />
                            I am a Stevens Institute of Technology alumni
                          </label>
                          <p className="text-xs text-stevens-gray-600 mt-1">
                            {discountInfo.alumniDiscount.percentage}% alumni discount for Stevens graduates
                          </p>
                        </div>
                      </div>

                      {/* Annual Employer Reimbursement */}
                      <div>
                        <label className="text-sm font-semibold text-stevens-gray-900 mb-2 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Annual Employer Tuition Reimbursement
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stevens-gray-600 font-medium">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder={`e.g., ${discountInfo.employerReimbursement.defaultAnnual}`}
                            value={annualReimbursement}
                            onChange={(e) => setAnnualReimbursement(e.target.value)}
                            className="w-full pl-8"
                          />
                          {annualReimbursement && (
                            <button
                              onClick={() => setAnnualReimbursement('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-stevens-gray-400 hover:text-stevens-gray-600"
                              aria-label="Clear"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-stevens-gray-500 mt-1">
                          {discountInfo.employerReimbursement.description}
                        </p>
                        {annualReimbursement && calculatedCost?.durationYears && (
                          <p className="text-xs text-blue-600 mt-1 font-medium">
                            ${parseFloat(annualReimbursement).toLocaleString()}/year × {calculatedCost.durationYears} year{calculatedCost.durationYears > 1 ? 's' : ''} = ${(parseFloat(annualReimbursement) * calculatedCost.durationYears).toLocaleString()} total
                          </p>
                        )}
                      </div>
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
                              {calculatedCost.credits.value} credits • {calculatedCost.durationYears} year{calculatedCost.durationYears > 1 ? 's' : ''}
                            </p>
                          )}
                          {calculatedCost.credits.type === 'variable' && (
                            <p className="text-xs text-stevens-gray-600 mt-1">
                              Based on typical {calculatedCost.credits.typical} credits
                            </p>
                          )}
                        </div>

                        {/* Variable Credit Info */}
                        {calculatedCost.credits.type === 'variable' && (
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
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {/* Certificate Program Benefits Message */}
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
                        {calculatedCost.steps.length > 0 && (
                          <div className="space-y-stevens-md mb-stevens-lg">
                            {calculatedCost.steps.map((step, index) => {
                              const Icon = step.icon === 'building' ? Building :
                                          step.icon === 'sparkles' ? Sparkles :
                                          step.icon === 'home' ? Home :
                                          step.icon === 'graduation-cap' ? GraduationCap :
                                          step.icon === 'briefcase' ? Briefcase : CheckCircle;
                              
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
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Final Price */}
                        <div className="bg-gradient-to-r from-stevens-primary to-red-700 text-stevens-white p-stevens-lg rounded-lg">
                          {calculatedCost.credits.type === 'variable' ? (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold">
                                  {calculatedCost.steps.find(s => s.type === 'reimbursement') ? 'YOUR FINAL COST' : 'YOUR COST'}
                                </span>
                                <span className="text-stevens-3xl font-bold">
                                  ${calculatedCost.finalPrice.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-stevens-white/80">
                                Based on {calculatedCost.credits.typical} credits
                              </p>
                            </>
                          ) : (
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
                          
                          {calculatedCost.percentSaved > 0 && (
                            <div className="flex items-center mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <Star className="w-5 h-5 mr-2 fill-current" />
                              <span className="text-lg">
                                You save {calculatedCost.percentSaved}%!
                              </span>
                            </div>
                          )}
                          
                          {/* Prompt to add reimbursement if not entered */}
                          {!calculatedCost.steps.find(s => s.type === 'reimbursement') && (
                            <div className="mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <div className="flex items-start text-stevens-white/90">
                                <Briefcase className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-semibold mb-1">Add your annual employer reimbursement above</p>
                                  <p className="text-xs text-stevens-white/80">
                                    Most employers offer up to ${discountInfo.employerReimbursement.defaultAnnual.toLocaleString()}/year
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
                                  Fully covered by employer benefits!
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
                            Questions? <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" className="text-stevens-primary hover:underline font-semibold">Talk to an advisor</a>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-full flex items-center justify-center p-stevens-2xl">
                      <div className="text-center text-stevens-gray-500">
                        <Calculator className="w-16 h-16 mx-auto mb-stevens-md opacity-50" />
                        <p className="text-lg font-semibold mb-2">Calculating your personalized pricing...</p>
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
                    Complete the questionnaire above to get personalized program recommendations, 
                    then calculate your cost with discounts and employer benefits.
                  </p>
                  <Button
                    className="text-stevens-white"
                    size="lg"
                    onClick={() => {
                      document.getElementById('programs-section')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Find Your Program
                    <ArrowRight className="ml-2 w-5 h-5 rotate-[-90deg]" />
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

            <div className="bg-stevens-white rounded-stevens-lg overflow-hidden shadow-stevens-md hover:shadow-stevens-lg transition-shadow duration-300">
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
                        className={`border-b border-stevens-gray-200 transition-all duration-300 cursor-default group ${index % 2 === 0 ? 'bg-stevens-white hover:bg-stevens-gray-50' : 'bg-stevens-gray-50 hover:bg-stevens-white'}`}
                      >
                        <td className="px-stevens-lg py-stevens-lg align-top w-2/5">
                          <p className="font-stevens-semibold text-stevens-gray-900 group-hover:text-stevens-primary transition-colors duration-300">
                            <span className="text-stevens-primary font-stevens-bold">Step {step.step}</span> - {step.actionNeeded}
                          </p>
                        </td>
                        <td className="px-stevens-lg py-stevens-lg align-top w-3/5">
                          <p className="text-stevens-gray-700 leading-relaxed group-hover:text-stevens-gray-900 transition-colors duration-300">
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
                  <div 
                    key={step.step} 
                    className="p-stevens-lg transition-all duration-300 hover:bg-stevens-gray-50 group"
                  >
                    <div className="mb-stevens-md">
                      <p className="font-stevens-bold text-stevens-primary text-stevens-sm uppercase mb-stevens-xs">
                        Step {step.step}
                      </p>
                      <p className="font-stevens-semibold text-stevens-gray-900 text-stevens-base group-hover:text-stevens-primary transition-colors duration-300">
                        {step.actionNeeded}
                      </p>
                    </div>
                    <p className="text-stevens-gray-700 text-stevens-sm leading-relaxed group-hover:text-stevens-gray-900 transition-colors duration-300">
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

        {/* Success Stories / Testimonials */}
        <ImageTestimonial
          testimonial={testimonials[0]}
          imageSrc="/assets/images/corporate-students/corporate-students-2.avif"
          imageAlt="Rupinder Bhullar, Director of Enterprise Automation Services at Pfizer"
          imageRatio={40}
        />

        {/* FAQ Section */}
        <EmployerFaqSection accordionPrefix="corporate-students" />

        {/* Final CTA Section */}
        <section id="contact" className="py-stevens-section-sm lg:py-stevens-section bg-stevens-primary text-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <motion.div
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
                  onClick={() => {
                    handleCTAClick('request_info_footer');
                    setShowContactModal(true);
                  }}
                >
                  Request Information
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 w-full sm:w-auto min-w-[280px]"
                  onClick={() => {
                    handleCTAClick('schedule_consultation_footer');
                    setShowContactOptionsModal(true);
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Modal */}
        {showContactModal && (
          <div 
            className="fixed inset-0 z-[99999] overflow-y-auto p-2 sm:p-4 bg-black/60 animate-in fade-in duration-300"
            onClick={() => setShowContactModal(false)}
          >
            <div className="min-h-full flex items-center justify-center py-4 sm:py-8">
              <div
                className="relative w-full max-w-2xl bg-stevens-white rounded-stevens-lg shadow-stevens-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white px-3 sm:px-stevens-md py-3 sm:py-stevens-lg rounded-t-stevens-lg">
                  <h2 className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-center pr-6 sm:pr-8 leading-tight">
                    Take the Next Step in Your Career
                  </h2>
                  <p className="text-center text-stevens-white/90 mt-1 sm:mt-stevens-xs text-xs sm:text-stevens-sm leading-tight">
                    Connect with Stevens Online to explore your options
                  </p>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="absolute top-2 right-2 z-50 text-stevens-gray-400 hover:text-stevens-gray-600 transition-colors duration-stevens-fast bg-white rounded-full p-1 sm:p-stevens-xs shadow-stevens-md hover:shadow-stevens-lg"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                
                <div className="p-stevens-sm sm:p-stevens-md md:p-stevens-lg bg-stevens-white">
                  <LeadCaptureForm
                    formType="rfi"
                    source="corporate_students_page"
                    programCode={searchParams.get('program') || "CORP"}
                    hideHeader={true}
                    onSuccess={() => {
                      trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);
                      setShowContactModal(false);
                    }}
                    additionalUrlParams={{
                      company: companyName || 'unknown'
                    }}
                  />
                </div>

                <div className="bg-stevens-gray-50 px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm border-t border-stevens-gray-200 rounded-b-stevens-lg">
                  <p className="text-stevens-xs sm:text-stevens-sm text-stevens-gray-600 text-center leading-tight">
                    Have questions? <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" className="text-stevens-primary hover:underline font-stevens-semibold">Schedule a call</a> with an advisor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Options Modal */}
        <Dialog open={showContactOptionsModal} onOpenChange={(open) => {
          setShowContactOptionsModal(open);
          if (!open) setCopiedItem(null);
        }}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 !top-[50%] !left-[50%] !-translate-x-1/2 !-translate-y-1/2 mx-4">
            <div className="bg-stevens-primary text-white px-6 py-5 rounded-t-lg">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white">
                  Get in Touch
                </DialogTitle>
              </DialogHeader>
            </div>
            
            <div className="p-6 space-y-4">
              <button
                onClick={() => {
                  trackEvent('contact_option_selected', {
                    option: 'schedule_call',
                    page: 'corporate_students'
                  });
                  window.open(BOOKING_URLS.SCHEDULE_CALL, '_blank', 'noopener,noreferrer');
                  setShowContactOptionsModal(false);
                }}
                className="w-full p-5 rounded-xl bg-stevens-primary text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg mb-1">
                      Schedule a Call
                    </h3>
                    <p className="text-sm text-white/80">
                      Book a convenient time for a personalized consultation
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stevens-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-stevens-gray-500">or reach us directly</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.PHONE_LINK}
                  onClick={() => {
                    trackEvent('contact_option_selected', {
                      option: 'phone',
                      page: 'corporate_students'
                    });
                  }}
                  className="flex flex-col items-center p-4 rounded-xl border-2 border-stevens-gray-200 hover:border-stevens-primary hover:bg-stevens-primary/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center mb-3 transition-colors">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs text-stevens-gray-500 mb-1">Call Us</span>
                  <span className="font-bold text-stevens-gray-900 group-hover:text-stevens-primary transition-colors">
                    {CONTACT_INFO.PHONE_DISPLAY}
                  </span>
                </a>

                <button
                  onClick={() => {
                    trackEvent('contact_option_selected', {
                      option: 'email',
                      page: 'corporate_students'
                    });
                    navigator.clipboard.writeText(CONTACT_INFO.EMAIL);
                    setCopiedItem('email');
                    setTimeout(() => setCopiedItem(null), 2000);
                  }}
                  className="flex flex-col items-center p-4 rounded-xl border-2 border-stevens-gray-200 hover:border-stevens-primary hover:bg-stevens-primary/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mb-3 transition-colors">
                    {copiedItem === 'email' ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <Mail className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <span className="text-xs text-stevens-gray-500 mb-1">
                    {copiedItem === 'email' ? 'Copied!' : 'Email Us'}
                  </span>
                  <span className="font-bold text-stevens-gray-900 group-hover:text-stevens-primary transition-colors text-sm break-all">
                    {CONTACT_INFO.EMAIL}
                  </span>
                  <span className="text-xs text-stevens-gray-400 mt-1 flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Click to copy
                  </span>
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageContextProvider>
  );
};

export default CorporateStudents;
