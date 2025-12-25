import React, { useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import LeadCaptureForm from '../components/forms/LeadCaptureForm';
import { BOOKING_URLS, CONTACT_INFO } from '@/config/constants';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';

export default function RequestInfo() {
  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Request Information About Graduate Programs | Stevens Online');
    setMetaDescription('Request information about Stevens Online graduate programs and connect with an enrollment advisor today.');
    setOpenGraphTags({
      title: 'Request Information About Graduate Programs | Stevens Online',
      description: 'Request information about Stevens Online graduate programs and connect with an enrollment advisor today.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/request-information/'),
      type: 'website'
    });
  }, []);

  return (
    <div className="bg-stevens-white font-stevens-body">
      <PageHero 
        title="Request Information"
        subtitle="Let's connect. Complete the form below and an enrollment advisor will be in touch to answer your questions."
        bgImage="/assets/images/request-info/stevens-campus.webp"
      />
      <div className="py-stevens-section">
        <div className="max-w-7xl mx-auto px-stevens-lg">
          <div className="grid stevens-md:grid-cols-2 gap-stevens-2xl items-start">
            <div className="space-y-stevens-lg">
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-dark-gray">We look forward to hearing from you.</h2>
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                Our enrollment advisors are here to help you find the right program and answer any questions about admissions, curriculum, or financial aid.
              </p>
              
              <div className="bg-stevens-white rounded-stevens-lg p-stevens-lg shadow-stevens-md border border-stevens-light-gray">
                <h3 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">Contact Support</h3>
                <div className="space-y-stevens-sm text-stevens-dark-gray">
                  <div>
                    <p className="font-stevens-semibold text-stevens-dark-gray text-stevens-sm mb-stevens-xs">Graduate Enrollment</p>
                    <p className="flex items-center gap-stevens-sm text-stevens-base">
                      <svg className="w-4 h-4 text-stevens-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {CONTACT_INFO.PHONE_DISPLAY}
                    </p>
                    <p className="flex items-center gap-stevens-sm text-stevens-base">
                      <svg className="w-4 h-4 text-stevens-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {CONTACT_INFO.EMAIL}
                    </p>
                  </div>
                  
                  <div className="border-t border-stevens-light-gray pt-stevens-md mt-stevens-md">
                    <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                      <span className="btn-stevens-red w-full text-center inline-block">
                        <svg className="w-5 h-5 inline-block mr-stevens-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule a Consultation
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-stevens-light-gray rounded-stevens-lg p-stevens-md">
                <p className="font-stevens-semibold text-stevens-dark-gray mb-stevens-xs">Financial Aid Questions?</p>
                <p className="text-stevens-sm text-stevens-dark-gray mb-stevens-xs">Contact our Financial Aid team:</p>
                <p className="text-stevens-sm text-stevens-dark-gray">{CONTACT_INFO.FINANCIAL_AID.PHONE}</p>
                <p className="text-stevens-sm text-stevens-dark-gray">{CONTACT_INFO.FINANCIAL_AID.EMAIL}</p>
              </div>
            </div>
            <div>
              <LeadCaptureForm 
                title="Get Program Details"
                subtitle="An admissions advisor will contact you shortly."
                showEducationLevel={true}
                sourcePage="request_info_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}