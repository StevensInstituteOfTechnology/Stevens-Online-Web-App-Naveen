import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { PageHero, RequestInfoModal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { BOOKING_URLS } from "@/config/constants";

const rankings = [
  {
    number: "#1",
    label: "In NJ for Graduate Earnings",
    source: "U.S. Dept. of Education 2025",
    link: "https://www.stevens.edu/news/stevens-ranks-no-1-in-new-jersey-for-graduate-earnings-in-new-federal-salary",
  },
  {
    number: "#7",
    label: "Online Graduate Engineering Management",
    source: "No. 1 in N.J. - U.S. News 2026",
  },
  {
    number: "#16",
    label: "Online MBA Business Analytics",
    source: "No. 1 in N.J. - U.S. News 2026",
  },
  {
    number: "7x",
    label: "Winner of 21st Century Award",
    source: "USDLA Distance Learning",
  },
  {
    number: "#12",
    label: "Best Career Placement",
    source: "The Princeton Review 2025",
  },
  {
    number: "99%",
    label: "Graduate Employment Rate",
    source: "Class of 2023",
  },
];

const outcomes = [
  {
    icon: TrendingUp,
    title: "Career Advancement",
    description:
      "Our graduates consistently report salary increases, promotions, and expanded career opportunities within months of completing their programs.",
  },
  {
    icon: Briefcase,
    title: "Employer Connections",
    description:
      "Located in the heart of the New York tech corridor, Stevens connects graduates to leading employers across engineering, finance, pharma, defense, and healthcare.",
  },
  {
    icon: Award,
    title: "Proven ROI",
    description:
      "Consistently ranked among the top schools for return on investment by PayScale and The Princeton Review, Stevens delivers education that pays for itself.",
  },
  {
    icon: GraduationCap,
    title: "Job-Ready Skills",
    description:
      "Market-driven curriculum developed with employer input ensures graduates have the practical, in-demand skills that today's organizations need most.",
  },
];

const topCompanies = [
  "Amazon", "JPMorgan Chase", "Google", "PwC", "Deloitte",
  "Boeing", "Lockheed Martin", "Verizon", "IBM", "Microsoft",
  "Pfizer", "PSEG", "Cisco", "Exxon",
];

export default function StudentOutcomes() {
  usePageTracking({
    pageType: "content",
    additionalData: {
      page_name: "Student Outcomes",
      has_rfi_modal: true,
    },
  });

  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);

  useEffect(() => {
    setPageTitle("Student Outcomes & Career Success | Stevens Online");
    setMetaDescription(
      "Stevens graduates are #1 in NJ for graduate earnings with 99% employment rates. See rankings, career outcomes, and ROI data from Stevens programs."
    );
    setOpenGraphTags({
      title: "Student Outcomes & Career Success | Stevens Online",
      description:
        "Stevens graduates are #1 in NJ for graduate earnings with 99% employment rates. See rankings, career outcomes, and ROI data from Stevens programs.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/student-outcomes/"),
      type: "website",
    });
  }, []);

  return (
    <PageContextProvider pageType="content" pageName="StudentOutcomes">
      <div>
        <PageHero
          title="Student Outcomes"
          subtitle="Delivering the outcomes that drive career success - because we only succeed when our students excel."
          bgImage="/assets/images/shared/stevens-campus.webp"
        />

        {/* Rankings Grid */}
        <section className="py-16 md:py-20 bg-stevens-black">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-white mb-4">
                By the Numbers
              </h2>
              <p className="text-lg text-stevens-light-gray max-w-2xl mx-auto">
                Rankings and results that reflect our commitment to student
                success and measurable career impact.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {rankings.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="text-center py-8 px-4 border border-white/10 rounded-lg"
                >
                  <p className="font-stevens-display text-5xl md:text-6xl font-bold text-stevens-red leading-none mb-3">
                    {stat.number}
                  </p>
                  <p className="font-stevens-headers text-sm font-bold text-white uppercase tracking-wider leading-tight mb-2">
                    {stat.label}
                  </p>
                  <p className="text-xs text-white/60 italic">
                    {stat.source}
                  </p>
                  {stat.link && (
                    <a
                      href={stat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-stevens-red hover:text-white transition-colors mt-2"
                    >
                      Read more
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Outcomes Matter */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-stevens-dark-gray mb-4">
                What Sets Stevens Apart
              </h2>
              <p className="text-lg text-stevens-dark-gray max-w-2xl mx-auto">
                Education is a commitment where outcomes matter. At Stevens,
                career advancement is the true measure of our success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {outcomes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-6 rounded-lg border border-stevens-light-gray"
                  >
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-stevens-red/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-stevens-red" />
                    </div>
                    <div>
                      <h3 className="font-stevens-display text-xl font-semibold text-stevens-dark-gray mb-2">
                        {item.title}
                      </h3>
                      <p className="text-stevens-dark-gray leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Where Our Graduates Work */}
        <section className="py-16 md:py-20 bg-stevens-dark-gray">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-white mb-4">
                Where Our Graduates Work
              </h2>
              <p className="text-lg text-stevens-light-gray max-w-2xl mx-auto">
                Stevens graduates are hired by the world's leading organizations
                across technology, finance, engineering, and beyond.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {topCompanies.map((company) => (
                <span
                  key={company}
                  className="px-5 py-2.5 bg-white/10 border border-white/15 rounded-full text-white text-sm font-medium"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-stevens-dark-gray mb-4">
              Ready to invest in your career?
            </h2>
            <p className="text-lg text-stevens-dark-gray mb-8 max-w-2xl mx-auto">
              Explore our programs and discover how Stevens can help you build
              the skills, credentials, and connections to move your career
              forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore-programs/#explore-programs">
                <Button variant="default" className="uppercase">
                  Explore Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline-dark"
                className="uppercase"
                onClick={() => {
                  trackConversion(CONVERSION_LABELS.REQUEST_INFO);
                  setShowRequestInfoModal(true);
                }}
              >
                Request Information
              </Button>
            </div>
          </div>
        </section>

        <RequestInfoModal
          isOpen={showRequestInfoModal}
          onClose={() => setShowRequestInfoModal(false)}
          sourcePage="student_outcomes"
          programOfInterest=""
        />
      </div>
    </PageContextProvider>
  );
}
