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

  const keyDates = {
    headers: ["Term", "Early Submit", "Priority Submit", "Final Submit", "Start of Classes"],
    rows: [
      {
        event: "Spring 2026",
        date: "October 14, 2025",
        details: "Deposit Waiver* and Application Fee Waiver Available.",
        priorityDate: KEY_DATES.PRIORITY_SUBMIT.date,
        priorityDetails: KEY_DATES.PRIORITY_SUBMIT.details,
        finalDate: "January 5, 2026",
        startDate: "January 20, 2026"
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
        bgImage="/assets/images/1-hero-admissions-scaled.webp"
      />

      {/* Admissions Overview */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-xl text-center">
              Admissions Overview
            </h2>
            <div className="prose prose-lg max-w-none text-stevens-gray-700 leading-relaxed space-y-stevens-lg">
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
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-100">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
              Key Dates & Deadlines
            </h2>
            <p className="text-stevens-lg text-stevens-gray-600">
              Plan your application for the upcoming Spring 2026 term.
            </p>
          </div>
          
          <Card className="shadow-xl border-0 overflow-hidden max-w-stevens-content-max mx-auto">
            <div className="overflow-x-auto">
              <Table className="w-full text-left border-collapse border border-gray-300">
                <TableHeader>
                  <TableRow>
                    {keyDates.headers.map((header, index) => (
                      <TableHead key={header} className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keyDates.rows.map((row, i) => (
                    <TableRow key={i} className="bg-white">
                      <TableCell className="p-4 font-bold text-base whitespace-nowrap align-top border border-gray-300">
                        {row.event}
                      </TableCell>
                      <TableCell className="p-4 align-top border border-gray-300">
                        <div className="font-bold text-gray-900">{row.date}</div>
                        {row.details && (
                          <div className="text-stevens-gray-900 mt-1 text-stevens-sm">{row.details}</div>
                        )}
                      </TableCell>
                      <TableCell className="p-4 align-top border border-gray-300">
                        <div className="font-bold text-gray-900">{row.priorityDate || ''}</div>
                        {row.priorityDetails && (
                          <div className="text-stevens-gray-900 mt-1 text-stevens-sm">{row.priorityDetails}</div>
                        )}
                      </TableCell>
                      <TableCell className="p-4 align-top border border-gray-300">
                        <div className="font-bold text-gray-900">{row.finalDate || ''}</div>
                      </TableCell>
                      <TableCell className="p-4 align-top border border-gray-300">
                        <div className="font-bold text-gray-900">{row.startDate || ''}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          
          {keyDates.footnote && (
            <p className="text-center text-stevens-sm text-stevens-gray-600 mt-stevens-lg italic">
              {keyDates.footnote}
            </p>
          )}
        </div>
      </div>

      {/* Explore Our Programs - NEW DYNAMIC SECTION */}
      <div id="explore-programs" className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg">
              Explore Our Graduate Programs
            </h2>
            <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed max-w-4xl mx-auto">
              Choose a program to explore or apply directly. Each program page provides detailed information about curriculum, career outcomes, and admission requirements.
            </p>
          </div>

          <ProgramFilterGrid />

          {/* Consultation CTA */}
          <div className="border-t border-stevens-gray-200 py-stevens-xl mt-stevens-2xl">
            <div className="grid stevens-md:grid-cols-2 gap-stevens-lg items-center">
              <div>
                <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-gray-900">
                  Wondering Which Application Is Right for You?
                </h3>
                <p className="text-stevens-lg text-stevens-gray-700 mt-stevens-xs">
                  Schedule a one-on-one consultation with the enrollment team today.
                </p>
              </div>
              <div className="stevens-md:text-right">
                <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}>
                  <Button variant="outline" className="text-stevens-primary px-stevens-xl py-stevens-md rounded-stevens-md">
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
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-50">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-headers text-stevens-3xl md:text-stevens-4xl font-bold text-stevens-gray-900 mb-stevens-lg">
              Events
            </h2>
          </div>
          
          <div className="grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg">
            {events.map((event, index) => (
              <Card key={index} className="h-full border-stevens-gray-100">
                <CardContent className="p-stevens-lg flex flex-col h-full pt-stevens-lg">
                  <h5 className="font-stevens-semibold text-stevens-gray-900 uppercase font-bold mb-stevens-xs hover:text-stevens-primary transition-colors duration-stevens-normal">
                    {event.title}
                  </h5>
                  <div className="text-stevens-sm text-stevens-gray-700 mb-stevens-md">
                    {event.type}
                  </div>
                  <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-gray-700 mb-stevens-lg">
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
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-100">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg">
              Admissions FAQ
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-stevens-semibold text-stevens-lg text-stevens-gray-900">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-stevens-base text-stevens-gray-700">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Request Information */}
      <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-primary">
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
                    <Button className="btn-stevens-secondary bg-stevens-white text-stevens-primary">
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
