import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, PlayCircle, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LeadCaptureForm from '../components/forms/LeadCaptureForm';
import { BOOKING_URLS, KEY_DATES } from '@/config/constants';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';
import ProgramFilterGrid from '../components/admissions/ProgramFilterGrid';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

export default function Admissions() {
  usePageTracking({
    pageType: 'admissions',
    additionalData: {
      page_name: 'Admissions Hub'
    }
  });

  const location = useLocation();

  // Smooth scroll to explore-programs section if hash is present
  useEffect(() => {
    if (location.hash === '#explore-programs') {
      setTimeout(() => {
        const element = document.getElementById('explore-programs');
        if (element) {
          const yOffset = -100; // Offset for fixed header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Graduate Admissions & Application Requirements | Stevens Online');
    setMetaDescription('Learn about graduate admissions requirements, application deadlines, and how to apply to Stevens Online master\'s programs.');
    setOpenGraphTags({
      title: 'Graduate Admissions & Application Requirements | Stevens Online',
      description: 'Learn about graduate admissions requirements, application deadlines, and how to apply to Stevens Online master\'s programs.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/admissions/'),
      type: 'website'
    });
  }, []);

  const keyDates = {
    headers: ["Term", "Early Submit", "Priority Submit", "Final Submit", "Start of Classes"],
    rows: [
      {
        event: KEY_DATES.TERM.name,
        date: KEY_DATES.EARLY_SUBMIT.date,
        details: KEY_DATES.EARLY_SUBMIT.details,
        priorityDate: KEY_DATES.PRIORITY_SUBMIT.date,
        priorityDetails: KEY_DATES.PRIORITY_SUBMIT.details,
        finalDate: KEY_DATES.FINAL_SUBMIT.date,
        startDate: KEY_DATES.START_OF_CLASSES.date
      }
    ],
    footnote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive education assistance from employers or other tuition discounts are not eligible. Other eligibility conditions may apply."
  };

  const faqs = [
    {
      q: "What is the difference between the standard application and the ASAP application?",
      a: "The standard application requires prospective students to complete and submit a full application, including all necessary documents such as transcripts, recommendation letters and personal statements, before being considered for admission. The ASAP application allows students to bypass parts of the traditional process by successfully completing two preliminary courses, which can fast-track their admission into the program. Bachelor's degree is required for both applications."
    },
    {
      q: "How does the ASAP application benefit prospective students?",
      a: "The ASAP application benefits students by providing a more flexible and expedited route to program admission. By focusing on successfully completing two trial courses, students can demonstrate their capability and commitment to the program, allowing them to start their educational journey more quickly without waiting for the standard application review process to conclude. This option is especially advantageous for those who wish to begin their studies immediately and showcase their readiness through academic performance."
    },
    {
      q: "Are there scholarships available to students?",
      a: "Students may be eligible for scholarship support, based on academic merit. Contact your enrollment advisor to learn more about eligibility."
    }
  ];

  const events = [
    {
      title: "On Demand Application Overview: Online MBA",
      type: "Ongoing",
      duration: "18 minutes",
      url: "https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE?pg=2"
    }
  ];

  return (
    <PageContextProvider pageType="admissions" pageName="Admissions">
    <div>
      <PageHero 
        title="We Put Our Strengths Behind Your Career"
        subtitle="Admissions"
        bgImage="/assets/images/admissions/1-hero-admissions-scaled.webp"
      />

      {/* Admissions Overview */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-xl text-center">
              Admissions Overview
            </h2>
            <div className="prose prose-lg max-w-none text-stevens-dark-gray leading-relaxed space-y-stevens-lg">
              <p>
                Stevens is technology driven. Our faculty are experts in their fields and experienced in industry. We deliver that expertise and experience to you. Stevens takes theory and links it to practical applications that have societal impact. That's the DNA at Stevens.
              </p>
              <p>
                We offer multiple application options for students interested in our graduate programs, ensuring flexible entry points to match your needs and goals. Learn more below about application requirements for a multi-disciplinary, design-based, 100% online education from Stevens Institute of Technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Dates & Deadlines */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">
              Key Dates & Deadlines
            </h2>
            <p className="text-stevens-lg text-stevens-dark-gray">
              Plan your application for the upcoming {KEY_DATES.TERM.name} term.
            </p>
          </div>
          
          <Card className="shadow-xl border-0 overflow-hidden max-w-stevens-content-max mx-auto">
            <div className="overflow-x-auto">
              <Table className="w-full text-left border-collapse border border-stevens-light-gray">
                <TableHeader>
                  <TableRow>
                    {keyDates.headers.map((header, index) => (
                      <TableHead key={header} className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-red border border-stevens-light-gray">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keyDates.rows.map((row, i) => (
                    <TableRow key={i} className="bg-white">
                      <TableCell className="p-4 font-bold text-base whitespace-nowrap align-top border border-stevens-light-gray">
                        {row.event}
                      </TableCell>
                      <TableCell className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">{row.date}</div>
                        {row.details && (
                          <div className="text-stevens-dark-gray mt-1 text-stevens-sm">{row.details}</div>
                        )}
                      </TableCell>
                      <TableCell className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">{row.priorityDate || ''}</div>
                        {row.priorityDetails && (
                          <div className="text-stevens-dark-gray mt-1 text-stevens-sm">{row.priorityDetails}</div>
                        )}
                      </TableCell>
                      <TableCell className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">{row.finalDate || ''}</div>
                      </TableCell>
                      <TableCell className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">{row.startDate || ''}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          
          {keyDates.footnote && (
            <p className="text-center text-stevens-sm text-stevens-dark-gray mt-stevens-lg italic">
              {keyDates.footnote}
            </p>
          )}
        </div>
      </div>

      {/* Explore Our Programs - NEW DYNAMIC SECTION */}
      <div id="explore-programs" className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-lg">
              Explore Our Graduate Programs
            </h2>
            <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed max-w-4xl mx-auto">
              Choose a program to explore or apply directly. Each program page provides detailed information about curriculum, career outcomes, and admission requirements.
            </p>
          </div>

          <ProgramFilterGrid />

          {/* Consultation CTA */}
          <div className="border-t border-stevens-light-gray py-stevens-xl mt-stevens-2xl">
            <div className="grid stevens-md:grid-cols-2 gap-stevens-lg items-center">
              <div>
                <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-dark-gray">
                  Wondering Which Application Is Right for You?
                </h3>
                <p className="text-stevens-lg text-stevens-dark-gray mt-stevens-xs">
                  Schedule a one-on-one consultation with the enrollment team today.
                </p>
              </div>
              <div className="stevens-md:text-right">
                <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}>
                  <Button variant="outline" className="text-stevens-red px-stevens-xl py-stevens-md rounded-stevens-md">
                    Get In Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-headers text-stevens-3xl md:text-stevens-4xl font-bold text-stevens-dark-gray mb-stevens-lg">
              Events
            </h2>
          </div>
          
          <div className="grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg">
            {events.map((event, index) => (
              <Card key={index} className="h-full border-stevens-light-gray">
                <CardContent className="p-stevens-lg flex flex-col h-full pt-stevens-lg">
                  <h5 className="font-stevens-semibold text-stevens-dark-gray uppercase font-bold mb-stevens-xs hover:text-stevens-red transition-colors duration-stevens-normal">
                    {event.title}
                  </h5>
                  <div className="text-stevens-sm text-stevens-dark-gray mb-stevens-md">
                    {event.type}
                  </div>
                  <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-dark-gray mb-stevens-lg">
                    <Clock className="w-4 h-4"/> {event.duration}
                  </div>
                  <div className="mt-auto">
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      <Button className="btn-stevens-outline text-stevens-white">Watch Now</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-stevens-xl">
            <Link to="/events/">
              <Button variant="outline" className="btn-outline-maroon">
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Admissions FAQ */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-lg">
              Admissions FAQ
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-stevens-semibold text-stevens-lg text-stevens-dark-gray">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-stevens-base text-stevens-dark-gray">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Request Information */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-red">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-stevens-xl items-center">
              <div className="text-stevens-white">
                <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md text-stevens-white">
                  Request Information
                </h2>
                <p className="text-stevens-lg text-stevens-white mb-stevens-lg">
                  Ready to take the next step? Get more information about our programs and start your application today.
                </p>
                
                {/* <div className="flex flex-col stevens-sm:flex-row gap-stevens-md">
                  <a href="https://gradadmissions.stevens.edu/apply/?pk=GRNP" target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.APPLY_NOW)}>
                    <Button className="btn-stevens-outline bg-stevens-white text-stevens-red">
                      Apply Now
                    </Button>
                  </a>
                </div> */}
              </div>
              <LeadCaptureForm 
                programOfInterest=""
                sourcePage="admissions_page"
                title="Request Information"
                subtitle="Get more information about our programs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageContextProvider>
  );
}
