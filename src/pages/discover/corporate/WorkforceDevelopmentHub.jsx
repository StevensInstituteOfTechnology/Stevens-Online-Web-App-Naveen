import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Users,
  Layers,
  TrendingUp,
  Target,
} from "lucide-react";
import { PageHero, RequestInfoModal } from "@/components/shared";
import SkillTree from "@/components/workforce-hub/SkillTree";
import { Button } from "@/components/ui/button";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
  createPageUrl,
} from "@/utils";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import ContactOptionsModal from "@/components/shared/modals/ContactOptionsModal";

const pathways = [
  {
    icon: Building2,
    title: "Corporate Partners",
    description:
      "Partner with Stevens to build scalable workforce development solutions. We collaborate with your organization to design custom learning pathways, co-branded programs, and talent pipelines aligned to your strategic objectives.",
    link: "/corporate-partners/",
    cta: "Explore partnerships",
  },
  {
    icon: GraduationCap,
    title: "Corporate Students",
    description:
      "Advance your career with employer-sponsored education. Access flexible, market-driven programs designed for working professionals - from stackable certificates to full master's degrees - with dedicated corporate student support.",
    link: "/corporate-students/",
    cta: "Get started",
  },
  {
    icon: Users,
    title: "Stevens Alumni",
    description:
      "Continue your Stevens journey with exclusive alumni benefits. Build on your degree with professional graduate certificates at a preferred rate, and stay connected to the Stevens network and employer ecosystem.",
    link: "/alumni-pgc/",
    cta: "View alumni programs",
  },
];

const valueProps = [
  {
    icon: Layers,
    title: "Stackable Credentials",
    description:
      "Our modular approach lets learners build competencies over time. Start with a professional certificate and stack credits toward a full master's degree - creating a continuous learning pathway that grows with your career.",
  },
  {
    icon: Target,
    title: "Skill-Mapped Programs",
    description:
      "Every course maps to specific, in-demand competencies identified through our close industry partnerships. Organizations and learners can see exactly which skills each program develops.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description:
      "Track real outcomes - from skill acquisition to career advancement. Our programs deliver measurable ROI for both organizations investing in their teams and professionals investing in themselves.",
  },
];

export default function WorkforceDevelopmentHub() {
  usePageTracking({
    pageType: "landing",
    additionalData: {
      page_name: "Workforce Development Hub",
      has_rfi_modal: true,
    },
  });

  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    setPageTitle(
      "Workforce Development Hub | Stevens College of Professional Education"
    );
    setMetaDescription(
      "Stevens Workforce Development Hub - lifelong learning solutions for organizations, employees, and alumni. Stackable credentials, skill-mapped programs, and measurable career impact."
    );
    setOpenGraphTags({
      title:
        "Workforce Development Hub | Stevens College of Professional Education",
      description:
        "Stevens Workforce Development Hub - lifelong learning solutions for organizations, employees, and alumni. Stackable credentials, skill-mapped programs, and measurable career impact.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/workforce-development/"),
      type: "website",
    });
  }, []);

  return (
    <PageContextProvider pageType="landing" pageName="WorkforceDevelopmentHub">
      <div>
        <PageHero
          title="Workforce Development Hub"
          subtitle="Lifelong learning that builds competitive advantage - for professionals, organizations, and the future of work."
          bgImage="/assets/images/corporate-partners/corporate-partners-hero.webp"
        />

        {/* Core Value Proposition */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-stevens-dark-gray mb-6">
                Training talent to meet the demands of today's market - and
                tomorrow's
              </h2>
              <p className="text-lg text-stevens-dark-gray leading-relaxed">
                The Stevens Workforce Development Hub is your gateway to
                flexible, market-driven education that delivers lifetime value.
                Whether you're an organization looking to upskill your team, a
                professional advancing through employer-sponsored learning, or a
                Stevens alum continuing your education - we provide the
                programs, pathways, and support to keep you ahead.
              </p>
            </div>

            {/* Stackability & Skill Mapping */}
            <div className="grid md:grid-cols-3 gap-8">
              {valueProps.map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={prop.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-stevens-red/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-stevens-red" />
                    </div>
                    <h3 className="font-stevens-display text-xl font-semibold text-stevens-dark-gray mb-3">
                      {prop.title}
                    </h3>
                    <p className="text-stevens-dark-gray leading-relaxed">
                      {prop.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Roadmap */}
        <section className="py-16 md:py-20 bg-stevens-dark-gray">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-12 text-center">
              <span className="text-stevens-red font-bold tracking-widest uppercase text-sm mb-2 block">
                Interactive Roadmap
              </span>
              <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-white mb-4">
                Stackable Credentials
              </h2>
              <p className="text-stevens-light-gray max-w-2xl mx-auto">
                Visualize how your learning journey evolves. Start with a
                specialized{" "}
                <span className="text-stevens-red">Graduate Certificate</span>{" "}
                and stack your credits directly into a full{" "}
                <span className="text-yellow-400">Master&apos;s Degree</span>.
              </p>
            </div>
            <SkillTree />
          </div>
        </section>

        {/* Pathways Section */}
        <section className="py-16 md:py-20 bg-stevens-black">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-white">
                Find Your Pathway
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pathways.map((pathway, index) => {
                const Icon = pathway.icon;
                return (
                  <motion.div
                    key={pathway.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-stevens-dark-gray border border-white/10 rounded-lg p-8 flex flex-col"
                  >
                    <div className="w-12 h-12 mb-6 rounded-full bg-stevens-red/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-stevens-red" />
                    </div>
                    <h3 className="font-stevens-display text-2xl font-light text-white mb-4">
                      {pathway.title}
                    </h3>
                    <p className="text-stevens-light-gray leading-relaxed mb-8 flex-grow">
                      {pathway.description}
                    </p>
                    <Link
                      to={pathway.link}
                      className="block w-full mt-auto"
                    >
                      <span className="inline-flex items-center justify-center w-full h-12 px-6 bg-stevens-red text-white font-stevens-body font-semibold tracking-wider uppercase text-sm hover:bg-white hover:text-stevens-red transition-all duration-300 group">
                        {pathway.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Stevens WDH */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-stevens-dark-gray mb-6">
                  A partner in lifelong professional growth
                </h2>
                <div className="space-y-4 text-stevens-dark-gray leading-relaxed">
                  <p>
                    Stevens' College of Professional Education sits within one
                    of the world's most dynamic technology corridors, with deep
                    partnerships across engineering, finance, pharma, defense,
                    and healthcare. This proximity to industry means our programs
                    are continuously informed by real market needs.
                  </p>
                  <p>
                    Membership in the Workforce Development Hub means more than
                    access to courses. It means a sustained relationship with a
                    trusted institution that understands how the market is
                    shifting, what skills your workforce needs next, and how to
                    deliver education that drives measurable results.
                  </p>
                  <p>
                    From individual certificate programs to enterprise-wide
                    talent development solutions, we work alongside you to build
                    the capabilities that keep your people - and your
                    organization - one step ahead.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-stevens-light-gray rounded-lg shadow-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="/assets/images/workforce-development/wdh-hero.png"
                    alt="Professionals collaborating in a modern workspace"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-stevens-dark-gray">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="font-stevens-display text-3xl md:text-4xl font-light text-white mb-4">
              Ready to build the future of your workforce?
            </h2>
            <p className="text-lg text-stevens-light-gray mb-8 max-w-2xl mx-auto">
              Whether you're exploring options for your organization, starting
              your own professional development journey, or returning to Stevens
              as an alum - we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                className="uppercase"
                onClick={() => {
                  trackConversion(CONVERSION_LABELS.REQUEST_INFO);
                  setShowRequestInfoModal(true);
                }}
              >
                Request Information
              </Button>
              <button
                className="inline-flex items-center justify-center h-12 px-8 bg-stevens-red text-white font-stevens-body font-semibold tracking-wider uppercase text-lg hover:bg-white hover:text-stevens-red transition-all duration-300"
                onClick={() => setShowContactModal(true)}
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        <RequestInfoModal
          isOpen={showRequestInfoModal}
          onClose={() => setShowRequestInfoModal(false)}
          sourcePage="workforce_development_hub"
          programOfInterest=""
        />
        <ContactOptionsModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </div>
    </PageContextProvider>
  );
}
