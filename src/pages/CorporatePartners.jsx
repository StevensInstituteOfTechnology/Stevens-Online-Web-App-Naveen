import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Building2, 
  Briefcase, 
  Award, 
  Globe, 
  CheckCircle,
  Star,
  Target,
  BarChart3,
  GraduationCap,
  Lightbulb,
  Shield,
  DollarSign,
  X
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import TopCompaniesSection from '@/components/shared/TopCompaniesSection';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { trackEvent } from '@/utils/analytics/vercelTracking';

const CorporatePartners = () => {
  usePageTracking({
    pageType: 'landing',
    additionalData: {
      page_name: 'Corporate Partners',
      has_form: true,
      landing_page_type: 'b2b'
    }
  });

  const [showContactModal, setShowContactModal] = useState(false);

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

  // Set SEO meta tags
  useEffect(() => {
    const canonical = buildCanonicalUrl('/corporate-partners/');
    setPageTitle('Corporate Partnerships | Workforce Development | Stevens Online');
    setMetaDescription('Partner with Stevens Online to upskill your workforce. Flexible, career-aligned education with accelerated admissions, dedicated support, and customized learning pathways.');
    setOpenGraphTags({
      title: 'Corporate Partnerships | Stevens Online',
      description: 'Transform your workforce with Stevens Online education programs. Customized learning solutions for corporate partners.',
      image: buildCanonicalUrl('/assets/images/corporate-partners/corporate-partners-1.webp'),
      url: canonical,
      type: 'website'
    });
  }, []);

  // Partner benefits data
  const partnerBenefits = [
    {
      icon: Building2,
      title: "Built for Employers",
      description: "Streamlined partnership setup, custom cohort onboarding, and flexible corporate billing options.",
      color: "stevens-primary"
    },
    {
      icon: Users,
      title: "Integrated Talent Solutions",
      description: "Learning pathways aligned with your HR and L&D systems for seamless integration.",
      color: "stevens-secondary"
    },
    {
      icon: Lightbulb,
      title: "Co-Developed Education",
      description: "Collaborate directly with Stevens faculty to create skills-based programs that meet your workforce goals.",
      color: "stevens-tertiary"
    },
    {
      icon: TrendingUp,
      title: "Agile by Design",
      description: "Quickly develop and deploy courses or credentials aligned with the latest industry demands.",
      color: "stevens-accent"
    }
  ];

  // Statistics for Why Stevens section
  const stevensStats = [
    {
      value: "#1",
      label: "Online MBA in New Jersey",
      source: "U.S. News 2025",
      icon: Award
    },
    {
      value: "129%",
      label: "ROI on Tuition Programs",
      source: "Industry Study",
      icon: TrendingUp
    },
    {
      value: "93%",
      label: "Employee Skill Development",
      source: "Partner Survey",
      icon: Star
    },
    {
      value: "$5,250",
      label: "Annual Tax Deduction",
      source: "IRS Code Section 127",
      icon: DollarSign
    }
  ];

  // What We Offer features
  const offerings = [
    {
      icon: Target,
      title: "Customized Learning Pathways",
      description: "Curate role-specific programs for data analysts, engineers, project managers, and other key teams."
    },
    {
      icon: Briefcase,
      title: "Interactive Learning Studios",
      description: "Co-create project-based learning built around your company's real data and challenges."
    },
    {
      icon: Shield,
      title: "Dedicated Corporate Care",
      description: "Receive one-on-one support from a corporate advisor who manages onboarding and student success."
    },
    {
      icon: BarChart3,
      title: "HR Systems Integration",
      description: "Map completions, credentials, and skill outcomes directly into your HR or L&D systems."
    },
    {
      icon: Users,
      title: "Tailored Info Sessions",
      description: "Engage employees through customized sessions co-hosted with your subject matter experts."
    },
    {
      icon: CheckCircle,
      title: "Accelerated Admissions",
      description: "Streamlined application process designed for working professionals — no essays or recommendations required."
    }
  ];

  // Areas of expertise
  const expertiseAreas = [
    "Artificial Intelligence",
    "Machine Learning", 
    "Data Science",
    "Computer Science",
    "Cybersecurity",
    "Business Intelligence"
  ];

  // Success stories / testimonials
  const testimonials = [
    {
      quote: "Stevens' flexible online programs have been instrumental in helping our engineers stay ahead of technology trends while maintaining their work responsibilities.",
      author: "Sarah Johnson",
      title: "L&D Director",
      company: "Tech Fortune 500",
      logo: "/assets/company_logo/pfizer-logo.png"
    },
    {
      quote: "The customized learning pathways Stevens created for our data science team directly aligned with our business objectives and delivered immediate ROI.",
      author: "Michael Chen",
      title: "VP of Talent Development",
      company: "Global Financial Services",
      logo: "/assets/company_logo/jpmorgan-logo.png"
    },
    {
      quote: "Our partnership with Stevens has reduced turnover by 40% and created a culture of continuous learning within our organization.",
      author: "Lisa Thompson",
      title: "Chief People Officer",
      company: "Healthcare Leader",
      logo: "/assets/company_logo/johnson-and-johnson-logo.png"
    }
  ];

  // Company logos for trust signals - using actual filenames from company_logo folder
  const partnerCompanies = [
    { name: "Pfizer", logo: "/assets/company_logo/Pfizer_(2021).png", industry: "Healthcare" },
    { name: "JPMorgan Chase", logo: "/assets/company_logo/Logo_of_JPMorganChase_2024.svg.png", industry: "Finance" },
    { name: "Johnson & Johnson", logo: "/assets/company_logo/The_new_logo_of_Johnson_&_Johnson.png", industry: "Healthcare" },
    { name: "IBM", logo: "/assets/company_logo/IBM_logo.svg.png", industry: "Technology" },
    { name: "Merck", logo: "/assets/company_logo/Merck_Logo.svg.png", industry: "Healthcare" },
    { name: "EY", logo: "/assets/company_logo/EY_logo_2019.svg.png", industry: "Consulting" }
  ];

  const handleCTAClick = (ctaType) => {
    trackEvent('corporate_cta_clicked', {
      page: 'corporate_partners',
      cta_type: ctaType
    });
    
    if (ctaType === 'schedule_consultation') {
      trackConversion(CONVERSION_LABELS.CORPORATE_INQUIRY);
    }
  };

  return (
    <PageContextProvider pageType="landing" pageName="Corporate Partners">
      <div className="min-h-screen bg-stevens-white">
        {/* Hero Section */}
        <PageHero
          titleLines={["Partner with Stevens to Transform Your Workforce"]}
          subtitle="Flexible, career-aligned education designed for your employees — with accelerated admissions, dedicated corporate support, and customized learning pathways."
          bgImage="/assets/images/corporate-partners/corporate-partners-1.webp"
          primaryCta={{
            label: "Schedule a Consultation",
            onClick: () => {
              handleCTAClick('schedule_consultation');
              setShowContactModal(true);
            }
          }}
          secondaryCta={{
            label: "Contact Us",
            href: "#contact"
          }}
        />

        {/* Trust Signals - Company Logos */}
        <section className="bg-stevens-gray-50 py-stevens-section-sm lg:py-stevens-section">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Trusted by leading organizations
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Stevens Online partners with Fortune 500 companies and industry leaders to deliver workforce development solutions
              </p>
            </div>
            <TopCompaniesSection
              description=""
              companies={partnerCompanies}
            />
          </div>
        </section>

        {/* Why Partner with Stevens */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Education That Moves at the Speed of Industry
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Stevens' College of Professional Education (CPE) reimagines how universities collaborate with employers. 
                Built to be flexible, fast-moving, and interdisciplinary, CPE removes the barriers that slow corporate 
                partnerships — helping you launch impactful learning initiatives that drive real results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stevens-lg">
              {partnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title}>
                    <Card className="h-full hover:shadow-stevens-xl transition-all duration-stevens-normal transform hover:-translate-y-1">
                      <CardHeader className="pb-stevens-md">
                        <div className="w-12 h-12 bg-stevens-primary/10 rounded-stevens-md flex items-center justify-center mb-stevens-md">
                          <Icon className="w-6 h-6 text-stevens-primary" />
                        </div>
                        <CardTitle className="text-stevens-lg font-stevens-bold text-stevens-gray-900">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-stevens-gray-700">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Stevens - Statistics */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-primary text-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md">
                A University Built for the Future of Work
              </h2>
              <p className="text-stevens-lg max-w-3xl mx-auto opacity-90">
                At Stevens, academic rigor meets real-world application. Our online programs empower professionals 
                to lead with confidence in a technology-driven world and deliver measurable results for your organization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stevens-lg">
              {stevensStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center"
                  >
                    <div className="bg-stevens-white/10 backdrop-blur rounded-stevens-lg p-stevens-lg">
                      <Icon className="w-10 h-10 mx-auto mb-stevens-sm opacity-80" />
                      <div className="text-stevens-4xl font-stevens-display font-stevens-bold mb-stevens-xs">
                        {stat.value}
                      </div>
                      <div className="text-stevens-base font-stevens-medium mb-stevens-xs">
                        {stat.label}
                      </div>
                      <div className="text-stevens-sm opacity-70">
                        {stat.source}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Co-Design Workforce Education That Fits Your Organization
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Every organization's needs are unique. Stevens partners with you to build tailored learning 
                experiences that align directly to your talent strategy and business goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
              {offerings.map((offering, index) => {
                const Icon = offering.icon;
                return (
                  <div
                    key={offering.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-stevens-white rounded-stevens-lg p-stevens-lg h-full shadow-stevens-md hover:shadow-stevens-xl transition-all duration-stevens-normal transform group-hover:-translate-y-1">
                      <div className="flex items-start space-x-stevens-md">
                        <div className="w-12 h-12 bg-stevens-primary/10 rounded-stevens-md flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-stevens-primary" />
                        </div>
                        <div>
                          <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm">
                            {offering.title}
                          </h3>
                          <p className="text-stevens-gray-700">
                            {offering.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Areas of Expertise */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Build Expertise in High-Demand Fields
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Develop your workforce's technical and leadership capabilities in disciplines shaping the future:
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-stevens-lg max-w-4xl mx-auto">
              {expertiseAreas.map((area, index) => (
                <div
                  key={area}
                  className="text-center p-stevens-lg border border-stevens-gray-200 rounded-stevens-lg"
                >
                  <h3 className="font-stevens-medium text-stevens-base text-stevens-gray-900">
                    {area}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories / Testimonials */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Success Stories from Our Partners
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-stevens-lg">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-stevens-white">
                    <CardContent className="p-stevens-lg flex flex-col h-full">
                      <div className="flex-grow">
                        <div className="flex items-start mb-stevens-md">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-stevens-gold text-stevens-gold" />
                          ))}
                        </div>
                        <blockquote className="text-stevens-gray-700 mb-stevens-lg italic">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                      <div className="pt-stevens-md border-t border-stevens-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-stevens-medium text-stevens-gray-900">
                              {testimonial.author}
                            </p>
                            <p className="text-stevens-sm text-stevens-gray-600">
                              {testimonial.title}
                            </p>
                            <p className="text-stevens-sm text-stevens-gray-600">
                              {testimonial.company}
                            </p>
                          </div>
                          <img 
                            src={testimonial.logo} 
                            alt={testimonial.company}
                            className="h-8 w-auto object-contain opacity-70"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-primary text-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md">
                Ready to Build the Future of Work Together?
              </h2>
              <p className="text-stevens-lg mb-stevens-xl max-w-2xl mx-auto opacity-90">
                Partner with Stevens Online to upskill your workforce in data science, AI, and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 w-full sm:w-auto min-w-[280px]"
                  onClick={() => {
                    handleCTAClick('schedule_consultation_footer');
                    setShowContactModal(true);
                  }}
                >
                  Schedule a Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-stevens-white text-stevens-white bg-transparent hover:bg-stevens-white hover:text-stevens-primary transition-all duration-stevens-normal w-full sm:w-auto min-w-[280px]"
                  onClick={() => handleCTAClick('download_guide_footer')}
                >
                  Download Partnership Guide
                </Button>
              </div>
            </div>
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
                {/* Header */}
                <div className="relative bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white px-3 sm:px-stevens-md py-3 sm:py-stevens-lg rounded-t-stevens-lg">
                  <h2 className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-center pr-6 sm:pr-8 leading-tight">
                    Let's Discuss Your Workforce Development Needs
                  </h2>
                  <p className="text-center text-stevens-white/90 mt-1 sm:mt-stevens-xs text-xs sm:text-stevens-sm leading-tight">
                    Partner with Stevens Online to transform your workforce
                  </p>
                  {/* Close Button */}
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="absolute top-2 right-2 z-50 text-stevens-gray-400 hover:text-stevens-gray-600 transition-colors duration-stevens-fast bg-white rounded-full p-1 sm:p-stevens-xs shadow-stevens-md hover:shadow-stevens-lg"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-stevens-sm sm:p-stevens-md md:p-stevens-lg bg-stevens-white">
                <LeadCaptureForm
                  formType="corporate_partnership"
                  source="corporate_partners_page"
                  programCode="CORP"
                    hideHeader={true}
                  onSuccess={() => {
                    trackConversion(CONVERSION_LABELS.CORPORATE_INQUIRY);
                    setShowContactModal(false);
                  }}
                />
                </div>

                {/* Footer */}
                <div className="bg-stevens-gray-50 px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm border-t border-stevens-gray-200 rounded-b-stevens-lg">
                  <p className="text-stevens-xs sm:text-stevens-sm text-stevens-gray-600 text-center leading-tight">
                    Have questions? <a href="https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="text-stevens-primary hover:underline font-stevens-semibold">Schedule a call</a> with our corporate partnerships team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContextProvider>
  );
};

export default CorporatePartners;
