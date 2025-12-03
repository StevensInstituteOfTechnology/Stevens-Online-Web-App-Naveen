import React, { useEffect, useState } from 'react';
import PageHero from '../shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeadCaptureForm from '../forms/LeadCaptureForm';
import AcceleratedFormEmbed from '../forms/AcceleratedFormEmbed';
import RequestInfoModal from '../shared/RequestInfoModal';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';
import { Check, ArrowRight, Building, Users, BookOpen, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

/**
 * CorporateLandingPageTemplate
 * 
 * A reusable template for corporate partner landing pages.
 * 
 * @param {Object} props
 * @param {string} props.partnerName - Name of the corporate partner (e.g., "Siemens", "PSEG")
 * @param {string} props.heroTitle - Title for the hero section
 * @param {string} props.heroSubtitle - Subtitle for the hero section
 * @param {string} props.heroImage - Background image for hero
 * @param {Object} props.heroPrimaryCta - Primary CTA config (optional)
 * @param {Object} props.heroSecondaryCta - Secondary CTA config (optional)
 * @param {Object} props.formConfig - Configuration for forms
 * @param {string} props.formConfig.mode - Slate form mode (e.g., "SIEMENS-PGCSEF", "PSEG")
 * @param {string} props.formConfig.campaignUrl - UTM campaign URL (e.g., "/siemens-pgcsef-inquiry")
 * @param {string} props.formConfig.corporateCode - Corporate code for accelerated app (e.g., "S01E02NS")
 * @param {string} props.formConfig.programCode - Program code (optional, for RFI pre-fill)
 * @param {string} props.formConfig.acceleratedFormTitle - Title for body accelerated app form
 * @param {boolean} props.showBodyAcceleratedApp - Show accelerated app in body (default: false)
 * @param {Array} props.programDetails - Array of program content sections
 * @param {Object} props.pricing - Pricing information object
 * @param {React.ReactNode} props.customContent - Additional custom content
 */
export default function CorporateLandingPageTemplate({
    partnerName,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroPrimaryCta,
    heroSecondaryCta,
    formConfig,
    showBodyAcceleratedApp = false,
    programDetails = [],
    pricing,
    customContent
}) {
    const [isRFIModalOpen, setIsRFIModalOpen] = useState(false);

    // Set SEO meta tags
    useEffect(() => {
        const title = `${partnerName} Partnership Program | Stevens Online`;
        const description = `Exclusive educational opportunities for ${partnerName} employees at Stevens Institute of Technology.`;

        setPageTitle(title);
        setMetaDescription(description);
        setOpenGraphTags({
            title: title,
            description: description,
            image: buildCanonicalUrl(heroImage),
            url: window.location.href,
            type: 'website'
        });
    }, [partnerName, heroImage]);

    const acceleratedFormTitle = formConfig.acceleratedFormTitle || 'Apply Now';
    
    // Build URL params for accelerated form
    const acceleratedFormParams = {
        ...(formConfig.mode && { display_mode: formConfig.mode }),
        ...(formConfig.campaignUrl && { utm_campaign: formConfig.campaignUrl }),
        ...(formConfig.corporateCode && { corporate_code: formConfig.corporateCode })
    };

    // Create hero CTAs with RFI modal trigger
    const effectiveHeroPrimaryCta = heroPrimaryCta || {
        label: "Request Information",
        onClick: () => setIsRFIModalOpen(true)
    };

    // If heroPrimaryCta doesn't have onClick, add it to trigger modal
    if (effectiveHeroPrimaryCta && !effectiveHeroPrimaryCta.onClick) {
        effectiveHeroPrimaryCta.onClick = () => setIsRFIModalOpen(true);
    }

    return (
        <>
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <PageHero
                title={
                    <div className="flex flex-col gap-4">
                        <span className="inline-block w-fit px-6 py-2.5 rounded-full bg-stevens-maroon/90 text-white text-lg font-bold tracking-wide uppercase shadow-md border border-white/20">
                            A Stevens × {partnerName} Partnership
                        </span>
                        <span>{heroTitle}</span>
                    </div>
                }
                subtitle={heroSubtitle}
                bgImage={heroImage}
                className="min-h-[500px]"
                primaryCta={effectiveHeroPrimaryCta}
                secondaryCta={heroSecondaryCta}
                primaryButtonClassName="text-[1.3em] px-[31px] py-[21px] min-h-[57px]"
                secondaryButtonClassName="text-[1.3em] px-[31px] py-[21px] min-h-[57px]"
            />

            <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl py-stevens-section-sm lg:py-stevens-section relative z-10">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Main Content Column */}
                    <div className="lg:col-span-12">
                        <div className="space-y-12">
                            {/* Partner Welcome / Intro */}
                            <Card className="border-t-4 border-t-stevens-maroon shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Building className="w-8 h-8 text-stevens-maroon" />
                                        <h2 className="font-display text-3xl font-bold text-gray-900">
                                            Stevens <span className="text-stevens-maroon">×</span> {partnerName}
                                        </h2>
                                    </div>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Stevens Institute of Technology is proud to partner with {partnerName} to offer exclusive professional education opportunities.
                                        This program is designed to advance your technical expertise and leadership skills through our world-class curriculum.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Custom Content (e.g. Program List for PSEG) */}
                            {customContent && (
                                <div className="space-y-8">
                                    {customContent}
                                </div>
                            )}

                            {/* Program Details Sections */}
                            {programDetails.map((section, index) => (
                                <div key={index} className="space-y-4">
                                    <h3 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        {section.icon || <BookOpen className="w-6 h-6 text-stevens-secondary" />}
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
                            {pricing && (
                                <Card className="bg-stevens-gray-50 border-stevens-gray-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="w-6 h-6 text-stevens-primary" />
                                            Tuition & Billing
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {pricing.items.map((item, index) => (
                                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">{item.label}</p>
                                                    <p className="text-2xl font-bold text-stevens-primary mt-1">{item.value}</p>
                                                    {item.note && <p className="text-xs text-gray-600 mt-2 italic">{item.note}</p>}
                                                </div>
                                            ))}
                                        </div>
                                        {pricing.description && (
                                            <p className="text-sm text-gray-600 mt-4 border-t pt-4 border-gray-200">
                                                {pricing.description}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Body Accelerated App Section */}
                            {showBodyAcceleratedApp && (
                                <div id="apply-now" className="scroll-mt-24">
                                    <div className="text-center mb-8">
                                        <h3 className="font-display text-3xl font-bold text-stevens-primary mb-2">Ready to Apply?</h3>
                                        <p className="text-gray-600 text-lg">
                                            Complete the accelerated application form below to join the cohort.
                                        </p>
                                    </div>
                                    <div className="max-w-3xl mx-auto lg:sticky lg:top-8">
                                        <AcceleratedFormEmbed 
                                            title={acceleratedFormTitle}
                                            subtitle={`Exclusive application for ${partnerName} employees`}
                                            urlParams={acceleratedFormParams}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </div>

        {/* RFI Modal */}
        <RequestInfoModal
            isOpen={isRFIModalOpen}
            onClose={() => setIsRFIModalOpen(false)}
            sourcePage={`corporate-${partnerName.toLowerCase()}`}
            programOfInterest={formConfig.programCode || ''}
            additionalUrlParams={{
                mode: formConfig.mode,
                utm_campaign: formConfig.campaignUrl
            }}
        />
        </>
    );
}
