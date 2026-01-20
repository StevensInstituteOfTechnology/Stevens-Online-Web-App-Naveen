import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';
import RequestInfoModal from '@/components/shared/RequestInfoModal';
import AcceleratedFormEmbed from '@/components/forms/AcceleratedFormEmbed';
import ProgramCard from '@/components/admissions/ProgramCard';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { getAllPrograms } from '@/data/programsData';

const AlumniPGC = () => {
  const [isRFIModalOpen, setIsRFIModalOpen] = useState(false);

  usePageTracking({
    pageType: 'landing',
    additionalData: {
      page_name: 'Alumni PGC',
      has_form: true,
      landing_page_type: 'alumni'
    }
  });

  // Set SEO meta tags
  React.useEffect(() => {
    const canonical = buildCanonicalUrl('/alumni-pgc/');
    setPageTitle('Alumni Professional Graduate Certificate | Stevens Online');
    setMetaDescription('Stevens alumni receive 15% off Professional Graduate Certificates. Advance your career with specialized programs in Enterprise AI and Applied Data Science.');
    setOpenGraphTags({
      title: 'Alumni Professional Graduate Certificate | Stevens Online',
      description: 'Stevens alumni receive 15% off Professional Graduate Certificates. Advance your career with specialized programs in Enterprise AI and Applied Data Science.',
      image: buildCanonicalUrl('/assets/images/alumni-pgc/martin-mom_20web.webp'),
      url: canonical,
      type: 'website'
    });
  }, []);

  const handleCTAClick = (ctaType) => {
    trackEvent('alumni_pgc_cta_clicked', {
      page: 'alumni_pgc',
      cta_type: ctaType
    });
  };

  // Form configuration for accelerated application
  const formConfig = {
    mode: "ALUMNI-PGC",
    campaignUrl: "/alumni-pgc-inquiry",
    corporateCode: "ALUMNI",
    programCode: "pgc-alumni",
    acceleratedFormTitle: "Apply for Alumni Certificate Program"
  };

  // Build URL params for accelerated form
  const acceleratedFormParams = {
    ...(formConfig.mode && { display_mode: formConfig.mode }),
    ...(formConfig.campaignUrl && { utm_campaign: formConfig.campaignUrl }),
    ...(formConfig.corporateCode && { corporate_code: formConfig.corporateCode })
  };

  // Get certificate programs
  const certificatePrograms = getAllPrograms().filter(
    program => program.degree === 'Certificate'
  );

  // Program benefits for the combined section
  const programBenefits = [
    { label: "Quick completion", description: "Earn your certificate in as few as 16-24 weeks" },
    { label: "Immediate ROI", description: "Apply new skills directly to your current role" },
    { label: "Stackable credits", description: "All 9 credits can be applied toward a master's degree" },
    { label: "Cost-effective", description: "Aligned with many employer tuition benefit programs" }
  ];

  // Easy application benefits for alumni
  const applicationBenefits = [
    { label: "No letters of recommendation required" },
    { label: "No transcripts required. Your Stevens transcripts are already on file" },
    { label: "15% alumni discount applied automatically" }
  ];

  // Pricing information with 15% alumni discount
  const pricing = {
    items: [
      { label: "Standard Price", value: "$5,250", note: "Regular certificate cost" },
      { label: "Alumni Price", value: "$4,462.50", note: "15% alumni discount applied" }
    ],
    description: "Your 15% alumni discount is automatically applied when you complete the application. This exclusive rate is available only to Stevens alumni."
  };

  return (
    <PageContextProvider pageType="landing" pageName="Alumni PGC">
      <div className="min-h-screen bg-stevens-gray-50">
        {/* Hero Section */}
        <PageHero
          title="Build In-Demand Skills Now. Stack Toward a Stevens Master’s"
          subtitle="Whether you are looking to upskill or work toward a master’s degree, Stevens alumni can take advantage of Professional Graduate Certificates designed for flexibility and career growth. Build in-demand skills in AI and data science while earning credentials that deliver immediate value and stack seamlessly into a Stevens master’s degree when you are ready to take the next step."
          bgImage="/assets/images/alumni-pgc/martin-mom_20web.webp"
          primaryCta={{
            label: "Apply in Minutes!",
            onClick: () => {
              handleCTAClick('apply_now');
              document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          bottomContent={
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="bg-white px-4 sm:px-6 py-4 rounded-lg shadow-lg border-l-4 border-l-stevens-primary">
                <p className="text-xs sm:text-sm font-semibold text-stevens-primary uppercase tracking-wide">Tuition-Reimbursement Friendly</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                  Alumni discount: <span className="text-stevens-primary">15%</span>*
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Aligning with many employer tuition reimbursement programs
                </p>
                
              </div>
            </div>
          }
        />

        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl py-stevens-section-sm lg:py-stevens-section relative z-10">
          <div className="space-y-12">

            {/* Certificate Programs Section */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Available Certificate Programs
              </h2>
              <div className="grid stevens-md:grid-cols-2 gap-stevens-lg">
                {certificatePrograms.map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program} 
                    onApplyClick={() => {
                      handleCTAClick('apply_now_card');
                      document.getElementById('apply-now')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Alumni Tuition & Savings Section - Moved Up */}
            <Card className="border-stevens-gray-200 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl sm:text-2xl">
                  Alumni Tuition & Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {pricing.items.map((item, index) => (
                    <div key={index} className={`p-4 sm:p-5 rounded-lg ${index === 1 ? 'bg-stevens-primary/10 border-2 border-stevens-primary' : 'bg-white border border-gray-200'}`}>
                      <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-semibold">{item.label}</p>
                      <p className={`text-xl sm:text-2xl font-bold mt-1 ${index === 1 ? 'text-stevens-primary' : 'text-gray-400 line-through'}`}>{item.value}</p>
                      {item.note && <p className="text-xs text-gray-600 mt-2 italic">{item.note}</p>}
                    </div>
                  ))}
                </div>
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-base sm:text-lg font-semibold text-stevens-primary">
                    Save $787.50 with your alumni discount
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    {pricing.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Combined Section: Why a Certificate & How to Get Started */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-stevens-primary px-4 sm:px-8 py-4 sm:py-6">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Why a Professional Graduate Certificate and How to Get Started
                </h2>
                <p className="text-white/90 mt-2 text-sm sm:text-base">
                  Professional Graduate Certificates offer a fast, focused way to gain in-demand skills without committing to a full degree program, with a streamlined application process designed specifically for Stevens alumni.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
                {/* Program Benefits Column */}
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    Program Benefits
                  </h3>
                  <ul className="space-y-3">
                    {programBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-stevens-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">{benefit.label}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Easy Application Column */}
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    Easy Application for Alumni
                  </h3>
                  <ul className="space-y-3">
                    {applicationBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-stevens-primary mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800 text-sm sm:text-base">{benefit.label}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Form Section */}
            <div id="apply-now" className="scroll-mt-24">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-stevens-primary mb-2">Ready to Apply?</h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  Complete the accelerated application form below to secure your 15% alumni discount.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <AcceleratedFormEmbed 
                  title={formConfig.acceleratedFormTitle}
                  subtitle="Exclusive application for Stevens alumni"
                  urlParams={acceleratedFormParams}
                />
              </div>
            </div>

            {/* Secondary CTAs Section */}
            <div className="bg-stevens-gray-50 rounded-lg p-4 sm:p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-gray-900">
                  Need More Information?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  We're here to help you make the right decision for your career.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCTAClick('explore_certificate');
                    window.open('/certificates/enterprise-ai/', '_blank');
                  }}
                  className="w-full sm:w-auto border-stevens-primary text-stevens-primary hover:bg-stevens-primary hover:text-white font-semibold px-6 py-3 transition-colors"
                >
                  Explore Certificates
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCTAClick('request_info_secondary');
                    setIsRFIModalOpen(true);
                  }}
                  className="w-full sm:w-auto border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white hover:border-gray-700 font-semibold px-6 py-3 transition-colors"
                >
                  Request Information
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RFI Modal */}
      <RequestInfoModal
        isOpen={isRFIModalOpen}
        onClose={() => setIsRFIModalOpen(false)}
        sourcePage="alumni-pgc"
        programOfInterest=""
        additionalUrlParams={{
          display_mode: formConfig.mode,
          utm_campaign: formConfig.campaignUrl
        }}
      />
    </PageContextProvider>
  );
};

export default AlumniPGC;
