import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  Star
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ProgramCard from '@/components/admissions/ProgramCard';
import { Button } from '@/components/ui/button';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { getAllPrograms } from '@/data/programsData';

const AlumniPGC = () => {
  usePageTracking({
    pageType: 'landing',
    additionalData: {
      page_name: 'Alumni PGC',
      has_form: true,
      landing_page_type: 'alumni'
    }
  });

  // Set SEO meta tags
  useEffect(() => {
    const canonical = buildCanonicalUrl('/alumni-pgc/');
    setPageTitle('Alumni Professional Graduate Certificate | Stevens Online');
    setMetaDescription('Advance your career with Stevens Online Professional Graduate Certificates. Build on your Stevens education with specialized programs designed for alumni.');
    setOpenGraphTags({
      title: 'Alumni Professional Graduate Certificate | Stevens Online',
      description: 'Advance your career with Stevens Online Professional Graduate Certificates. Build on your Stevens education with specialized programs designed for alumni.',
      image: buildCanonicalUrl('/assets/images/hero-default.webp'),
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

  // Get certificate programs
  const certificatePrograms = getAllPrograms().filter(
    program => program.degree === 'Certificate'
  );

  return (
    <PageContextProvider pageType="landing" pageName="Alumni PGC">
      <div className="min-h-screen bg-stevens-white">
        {/* Hero Section */}
        <PageHero
          titleLines={["Continue Your Journey", "with Stevens Online"]}
          subtitle="As a Stevens alumnus, take the next step in your career with our specialized Professional Graduate Certificate programs. Build on your foundation with cutting-edge skills in high-demand fields."
          bgImage="/assets/images/alumni-pgc/martin-mom_20web.webp"
          primaryCta={{
            label: "Request Information",
            to: "RequestInfo"
          }}
          secondaryCta={{
            label: "Apply In Minutes",
            href: "/accelerated-application/"
          }}
          useRequestInfoModal={true}
          requestInfoProgramCode="ALUMNI-PGC"
          requestInfoSourcePage="alumni_pgc"
          badges={[
            { text: "Exclusive Alumni Benefits", variant: "secondary" }
          ]}
        />

        {/* Certificate Programs Section */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-md">
                Professional Graduate Certificates
              </h2>
              <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
                Build on your Stevens foundation with specialized certificate programs designed to advance your career in high-demand fields.
              </p>
            </div>

            {/* Certificate Cards Grid */}
            <div className="grid stevens-md:grid-cols-2 gap-stevens-lg">
              {certificatePrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageContextProvider>
  );
};

export default AlumniPGC;
