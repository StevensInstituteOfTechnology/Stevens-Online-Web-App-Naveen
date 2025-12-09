import React, { useState } from 'react';
import { GraduationCap, Award, Percent, BookOpen, Check, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Program details sections (similar to corporate pages)
  const programDetails = [
    {
      title: "Alumni Benefits",
      content: "<p>As a Stevens alumnus, you have access to exclusive benefits designed to help you continue your professional development:</p>",
      items: [
        "15% tuition discount on all Professional Graduate Certificates",
        "Streamlined application process - no letters of recommendation required",
        "Credits stack toward advanced degrees (MBA, M.Eng. in Applied Data Science)",
        "Dedicated support from our enrollment advisors",
        "Flexible 100% online format to fit your schedule"
      ]
    },
    {
      title: "Why Earn a Certificate?",
      content: `
        <p>Professional Graduate Certificates offer a fast, focused way to gain in-demand skills without committing to a full degree program.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Quick completion:</strong> Earn your certificate in as few as 8-16 weeks</li>
          <li><strong>Immediate ROI:</strong> Apply new skills directly to your current role</li>
          <li><strong>Stackable credits:</strong> All 9 credits can be applied toward a master's degree</li>
          <li><strong>Cost-effective:</strong> Aligns with your employer's tuition benefit</li>
        </ul>
      `
    },
    {
      title: "Application Process",
      content: `
        <p>Getting started is easy with our accelerated application process:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>No letters of recommendation required</li>
          <li>Upload unofficial transcripts to begin</li>
          <li>Official transcripts due within <strong>2 months</strong> of enrollment</li>
          <li>Apply your 15% alumni discount automatically</li>
        </ul>
      `
    }
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
          title={
            <div className="flex flex-col gap-4">
              <span className="inline-block w-fit px-6 py-2.5 rounded-full bg-stevens-maroon/90 text-white text-lg font-bold tracking-wide uppercase shadow-md border border-white/20">
                Exclusive for Stevens Alumni
              </span>
              <span>Continue Your Journey with Stevens Online</span>
            </div>
          }
          subtitle="As a Stevens alumnus, take the next step in your career with our specialized Professional Graduate Certificate programs. Enjoy 15% off tuition and build on your foundation with cutting-edge skills in high-demand fields."
          bgImage="/assets/images/alumni-pgc/martin-mom_20web.webp"
          primaryCta={{
            label: "Request Information",
            onClick: () => {
              handleCTAClick('request_info');
              setIsRFIModalOpen(true);
            }
          }}
          secondaryCta={{
            label: "Apply In Minutes",
            href: "#apply-now"
          }}
        />

        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl py-stevens-section-sm lg:py-stevens-section relative z-10">
          <div className="space-y-12">
            
            {/* Alumni Welcome Card */}
            <Card className="border-t-4 border-t-stevens-maroon shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <GraduationCap className="w-8 h-8 text-stevens-maroon" />
                  <h2 className="font-display text-3xl font-bold text-gray-900">
                    Welcome Back, <span className="text-stevens-maroon">Stevens Alumni</span>
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Your Stevens degree opened doors. Now, take the next step with a Professional Graduate Certificate 
                  designed to advance your career in Leadership, AI and data science. As a valued member of the Stevens community, 
                  you'll receive a <strong className="text-stevens-primary">15% tuition discount</strong> on all certificate programs.
                </p>
              </CardContent>
            </Card>

            {/* Certificate Programs Section */}
            <div>
              <h3 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-stevens-secondary" />
                Available Certificate Programs
              </h3>
              <div className="grid stevens-md:grid-cols-2 gap-stevens-lg">
                {certificatePrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </div>

            {/* Program Details Sections */}
            {programDetails.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {index === 0 && <Percent className="w-6 h-6 text-stevens-secondary" />}
                  {index === 1 && <Award className="w-6 h-6 text-stevens-secondary" />}
                  {index === 2 && <Check className="w-6 h-6 text-stevens-secondary" />}
                  {section.title}
                </h3>
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />

                {/* Optional List Items */}
                {section.items && (
                  <ul className="grid gap-3 mt-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <Check className="w-5 h-5 text-stevens-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Pricing Section */}
            <Card className="bg-stevens-gray-50 border-stevens-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-stevens-primary" />
                  Alumni Tuition & Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {pricing.items.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg shadow-sm ${index === 1 ? 'bg-stevens-primary/10 border-2 border-stevens-primary' : 'bg-white'}`}>
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{item.label}</p>
                      <p className={`text-2xl font-bold mt-1 ${index === 1 ? 'text-stevens-primary' : 'text-gray-400 line-through'}`}>{item.value}</p>
                      {item.note && <p className="text-xs text-gray-600 mt-2 italic">{item.note}</p>}
                    </div>
                  ))}
                </div>
                {pricing.description && (
                  <p className="text-sm text-gray-600 mt-4 border-t pt-4 border-gray-200">
                    {pricing.description}
                  </p>
                )}
                <div className="text-center mt-6">
                  <p className="text-lg font-semibold text-stevens-primary mb-2">
                    Save $787.50 with your alumni discount!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Body Accelerated App Section */}
            <div id="apply-now" className="scroll-mt-24">
              <div className="text-center mb-8">
                <h3 className="font-display text-3xl font-bold text-stevens-primary mb-2">Ready to Apply?</h3>
                <p className="text-gray-600 text-lg">
                  Complete the accelerated application form below to secure your 15% alumni discount.
                </p>
              </div>
              <div className="max-w-3xl mx-auto lg:sticky lg:top-8">
                <AcceleratedFormEmbed 
                  title={formConfig.acceleratedFormTitle}
                  subtitle="Exclusive application for Stevens alumni"
                  urlParams={acceleratedFormParams}
                />
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
          mode: "ALUMNI-PGC",
          utm_campaign: "/alumni-pgc-inquiry"
        }}
      />
    </PageContextProvider>
  );
};

export default AlumniPGC;
