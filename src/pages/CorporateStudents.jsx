import React, { useState, useEffect } from 'react';
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
  ArrowDown
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ApplicationModal from '@/components/shared/ApplicationModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Removed ProgramCard import - using custom implementation
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl, createPageUrl } from '@/utils';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { PROGRAMS_DATA } from '@/data/programsData';

const CorporateStudents = () => {
  const [searchParams] = useSearchParams();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState('all');
  const [companyName, setCompanyName] = useState(null);
  const [corporateCode, setCorporateCode] = useState(null);

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
    {
      icon: Shield,
      title: "Exclusive Partner Discounts",
      description: "Additional savings beyond tuition reimbursement through our corporate partnership."
    }
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
    ? PROGRAMS_DATA.filter(p => !p.isHidden && !p.code.startsWith('cert')) // Show only degree programs by default
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
      image: "/assets/avatars/student-sarah.webp"
    },
    {
      name: "James Chen",
      title: "Senior Software Engineer",
      company: "Global Financial Services",
      program: "MS in Computer Science",
      quote: "The AI concentration perfectly aligned with my company's strategic direction. I'm now leading our machine learning initiatives.",
      outcome: "Leading AI initiatives, received innovation award",
      image: "/assets/avatars/student-james.webp"
    },
    {
      name: "Maria Rodriguez",
      title: "Product Manager",
      company: "Healthcare Technology",
      program: "Online MBA",
      quote: "The flexibility of Stevens Online allowed me to earn my MBA while working full-time. My company covered 100% of the tuition.",
      outcome: "Transitioned to product management, managing $10M portfolio",
      image: "/assets/avatars/student-maria.webp"
    }
  ];

  // Learning journey steps
  const learningJourney = [
    {
      step: 1,
      title: "Start Your Application",
      description: "Use your corporate code for instant benefits and fee waivers",
      icon: BookOpen
    },
    {
      step: 2,
      title: "Get Admitted Fast",
      description: "Accelerated review process with no essays required",
      icon: Zap
    },
    {
      step: 3,
      title: "Connect with Advisor",
      description: "Your dedicated corporate care advisor guides your journey",
      icon: Users
    },
    {
      step: 4,
      title: "Begin Learning",
      description: "Start with courses aligned to your career goals",
      icon: GraduationCap
    },
    {
      step: 5,
      title: "Apply Skills Immediately",
      description: "Use new knowledge in your current role right away",
      icon: Briefcase
    },
    {
      step: 6,
      title: "Advance Your Career",
      description: "Graduate with credentials that open new opportunities",
      icon: TrendingUp
    }
  ];

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
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Through your employer's partnership with Stevens Online, you can access a fast, flexible, 
                and career-aligned path to earn a graduate certificate, master's degree, or professional credential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
              {partnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title}>
                    <Card className="h-full">
                      <CardContent className="p-stevens-lg">
                        <div className="flex items-start space-x-stevens-md">
                          <div className="w-12 h-12 bg-stevens-primary/10 rounded-stevens-md flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-stevens-primary" />
                          </div>
                          <div>
                            <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm">
                              {benefit.title}
                            </h3>
                            <p className="text-stevens-gray-700">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Stevens Online */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                A Top-Ranked University Built for Working Professionals
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Stevens brings together industry-leading faculty, cutting-edge technology, and a focus on 
                career outcomes, empowering professionals to thrive in the future of work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-lg mb-stevens-xl">
              {/* Ranking Cards */}
              <div className="text-center">
                <div className="bg-stevens-primary text-stevens-white rounded-stevens-lg p-stevens-lg">
                  <Award className="w-12 h-12 mx-auto mb-stevens-md" />
                  <div className="text-stevens-4xl font-stevens-display font-stevens-bold mb-stevens-sm">#1</div>
                  <p className="font-stevens-medium">Online MBA in New Jersey</p>
                  <p className="text-stevens-sm opacity-80">U.S. News 2025</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-stevens-secondary text-stevens-white rounded-stevens-lg p-stevens-lg">
                  <TrendingUp className="w-12 h-12 mx-auto mb-stevens-md" />
                  <div className="text-stevens-4xl font-stevens-display font-stevens-bold mb-stevens-sm">#9</div>
                  <p className="font-stevens-medium">Best ROI Colleges</p>
                  <p className="text-stevens-sm opacity-80">Princeton Review</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-stevens-tertiary text-stevens-white rounded-stevens-lg p-stevens-lg">
                  <Star className="w-12 h-12 mx-auto mb-stevens-md" />
                  <div className="text-stevens-4xl font-stevens-display font-stevens-bold mb-stevens-sm">7x</div>
                  <p className="font-stevens-medium">21st Century Award Winner</p>
                  <p className="text-stevens-sm opacity-80">Distance Learning</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Career-Aligned Programs */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
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
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto mb-stevens-lg">
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

                        {/* CTA Button */}
                        <Link 
                          to={`${createPageUrl('/accelerated-application/')}?program=${program.code}${corporateCode ? `&code=${corporateCode}` : ''}`}
                          onClick={() => {
                            trackEvent('program_card_clicked', {
                              program_code: program.code,
                              source: 'corporate_students',
                              has_corporate_code: !!corporateCode
                            });
                          }}
                        >
                          <Button className="w-full mt-stevens-md">
                            Apply Now
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
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

        {/* Tuition & Financial Support */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-xl text-center">
                Your Education, Made More Affordable
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-xl items-center">
                {/* Left side - Text content */}
                <div className="space-y-stevens-lg">
                  <p className="text-stevens-lg text-stevens-gray-700">
                    Your company's partnership with Stevens Online may make your education more accessible than ever. 
                    We'll help you maximize your benefits and minimize out-of-pocket costs.
                  </p>

                  <div className="space-y-stevens-md">
                    <div className="flex items-start space-x-stevens-md">
                      <CheckCircle className="w-6 h-6 text-stevens-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900">
                          Tuition Reimbursement Coordination
                        </h3>
                        <p className="text-stevens-gray-700">
                          We work directly with your HR team to streamline the reimbursement process
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-stevens-md">
                      <CheckCircle className="w-6 h-6 text-stevens-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900">
                          Corporate Partner Discounts
                        </h3>
                        <p className="text-stevens-gray-700">
                          Additional 10% discount exclusive to partner employees
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-stevens-md">
                      <CheckCircle className="w-6 h-6 text-stevens-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900">
                          Payment Flexibility
                        </h3>
                        <p className="text-stevens-gray-700">
                          Deferred payment plans aligned with your reimbursement schedule
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Savings Information */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-stevens-display text-stevens-xl">
                        Investment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-stevens-md">
                      <div className="flex justify-between items-center py-stevens-sm border-b">
                        <span className="text-stevens-gray-700">Average Program Cost</span>
                        <span className="font-stevens-medium">${savings.programCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-stevens-sm border-b">
                        <span className="text-stevens-gray-700">Corporate Discount</span>
                        <span className="font-stevens-medium text-stevens-primary">
                          -${savings.corporateDiscount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-stevens-sm border-b">
                        <span className="text-stevens-gray-700">Typical Employer Contribution</span>
                        <span className="font-stevens-medium text-stevens-primary">
                          -${savings.employerContribution.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-stevens-md font-stevens-bold">
                        <span>Estimated Out-of-Pocket</span>
                        <span className="text-stevens-primary">${savings.outOfPocket.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Learning Journey */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Start Your Journey with Stevens
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                From application to graduation, we make your path to success clear and achievable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
              {learningJourney.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="relative">
                    
                    <div className="bg-stevens-white rounded-stevens-lg p-stevens-lg shadow-stevens-md relative z-10">
                      <div className="flex items-start space-x-stevens-md">
                        <div className="w-12 h-12 bg-stevens-primary text-stevens-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-stevens-bold">{step.step}</span>
                        </div>
                        <div>
                          <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm">
                            {step.title}
                          </h3>
                          <p className="text-stevens-gray-700">
                            {step.description}
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

        {/* Alumni Success Stories */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Success Stories from Corporate-Sponsored Alumni
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                See how professionals like you leveraged their employer benefits to advance their careers.
              </p>
            </div>

            {/* Success Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-lg">
              {successStories.map((story, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-stevens-lg">
                    <div className="space-y-stevens-md">
                      <blockquote className="text-stevens-gray-700 italic">
                        "{story.quote}"
                      </blockquote>
                      
                      <div className="border-t pt-stevens-md">
                        <p className="font-stevens-medium text-stevens-gray-900">
                          {story.name}
                        </p>
                        <p className="text-stevens-sm text-stevens-gray-600">
                          {story.title}
                        </p>
                        <p className="text-stevens-sm text-stevens-gray-600">
                          {story.company}
                        </p>
                        <p className="text-stevens-sm text-stevens-primary font-stevens-medium mt-stevens-xs">
                          {story.program}
                        </p>
                      </div>

                      {story.outcome && (
                        <div className="bg-stevens-gray-50 rounded p-stevens-sm">
                          <p className="text-stevens-sm text-stevens-gray-700">
                            <span className="font-stevens-medium">Outcome:</span> {story.outcome}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}</div>
          </div>
        </section>

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
