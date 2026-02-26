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
import { StackabilityGraph } from "@/components/corporate";

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

const skillMap = {
  careerPaths: [
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      icon: "🤖",
      description: "Build intelligent systems, automate decisions, and deploy production-grade AI.",
      skills: ["Machine Learning", "Deep Learning", "MLOps", "Generative AI"],
      avgSalary: "$150,000",
      growth: "+22%",
      category: "technical",
    },
    {
      id: "data-science",
      name: "Data Science & Analytics",
      icon: "📊",
      description: "Turn complex data into clear, decision-ready insights for your organization.",
      skills: ["Python", "SQL", "Statistics", "Data Visualization"],
      avgSalary: "$130,000",
      growth: "+35%",
      category: "technical",
    },
    {
      id: "business",
      name: "Business & Leadership",
      icon: "💼",
      description: "Lead teams, manage change, and align strategy with measurable outcomes.",
      skills: ["Leadership", "Strategy", "Financial Analysis", "Change Management"],
      avgSalary: "$125,000",
      growth: "+15%",
      category: "business",
    },
    {
      id: "engineering",
      name: "Applied Engineering & Systems",
      icon: "⚙️",
      description: "Bridge technical depth with systems thinking and cross-functional collaboration.",
      skills: ["Systems Design", "Project Management", "Innovation", "Stakeholder Communication"],
      avgSalary: "$140,000",
      growth: "+18%",
      category: "technical",
    },
    {
      id: "cloud-devops",
      name: "Cloud & DevOps",
      icon: "☁️",
      description: "Modernize infrastructure and delivery pipelines across cloud-native environments.",
      skills: ["Cloud Architecture", "CI/CD", "Containers", "Infrastructure as Code"],
      avgSalary: "$145,000",
      growth: "+20%",
      category: "technical",
    },
    {
      id: "cyber-risk",
      name: "Cybersecurity & Risk",
      icon: "🔒",
      description: "Protect critical systems, data, and operations from evolving cyber threats.",
      skills: ["Risk Assessment", "Security Architecture", "Governance", "Incident Response"],
      avgSalary: "$140,000",
      growth: "+28%",
      category: "technical",
    },
    {
      id: "product-innovation",
      name: "Product & Innovation Leadership",
      icon: "💡",
      description: "Lead cross-functional teams to design, launch, and scale new digital products.",
      skills: ["Product Strategy", "Roadmapping", "Customer Discovery", "Experimentation"],
      avgSalary: "$135,000",
      growth: "+19%",
      category: "business",
    },
  ],
  programs: [
    {
      code: "mc-ai-foundations",
      title: "Micro-Credential in AI Foundations",
      subtitle: "Rapid AI fluency for teams",
      description:
        "Build practical AI literacy quickly with low-lift coursework that prepares learners for certificate-level study.",
      duration: "3 credits · 1 course",
      credits: 3,
      badge: "Graduate Certificate",
      level: "entry",
      careerPaths: ["ai-ml", "business"],
      stackTargets: ["pgc-eai"],
      link: "/certificates/enterprise-ai/",
    },
    {
      code: "mc-data-essentials",
      title: "Micro-Credential in Data Essentials",
      subtitle: "Core data skills for business and technical teams",
      description:
        "Learn data fundamentals quickly and prepare for deeper data science certificate pathways.",
      duration: "3 credits · 1 course",
      credits: 3,
      badge: "Graduate Certificate",
      level: "entry",
      careerPaths: ["data-science", "business"],
      stackTargets: ["pgc-ads"],
      link: "/certificates/applied-data-science-foundations/",
    },
    {
      code: "mc-cloud-practitioner",
      title: "Micro-Credential in Cloud Operations",
      subtitle: "Hands-on cloud and delivery foundations",
      description:
        "Get practical cloud architecture and DevOps fundamentals that stack into systems pathways.",
      duration: "3 credits · 1 course",
      credits: 3,
      badge: "Graduate Certificate",
      level: "entry",
      careerPaths: ["cloud-devops", "engineering"],
      stackTargets: ["pgc-sys"],
      link: "/certificates/systems-engineering-foundations/",
    },
    {
      code: "mscs",
      title: "Online M.S. in Computer Science",
      subtitle: "Future-focused computer science for AI and software careers",
      description:
        "Build advanced skills in algorithms, software engineering, and artificial intelligence to lead technical teams and innovation initiatives.",
      duration: "30 credits · typically 2 years part-time",
      credits: 30,
      badge: "Master’s Degree",
      level: "advanced",
      careerPaths: ["ai-ml", "data-science"],
      features: [
        "AI, machine learning, and cloud-native development",
        "Designed for working software and IT professionals",
        "Project-based learning aligned to industry use cases",
      ],
      link: "/online-masters-computer-science-mscs/",
    },
    {
      code: "meads",
      title: "Online M.Eng. in Applied Data Science",
      subtitle: "Hands-on data science for decision-makers and builders",
      description:
        "Combine modern data engineering, analytics, and AI techniques to solve real business problems and scale data capabilities.",
      duration: "30 credits · typically 2 years part-time",
      credits: 30,
      badge: "Master’s Degree",
      level: "advanced",
      careerPaths: ["data-science", "engineering"],
      features: [
        "Python, SQL, and modern data science tooling",
        "Applied projects tied to real-world datasets",
        "Ideal for analysts, engineers, and technical leaders",
      ],
      link: "/online-masters-engineering-applied-data-science/",
    },
    {
      code: "msyseng",
      title: "Online M.Eng. in Systems Engineering",
      subtitle: "End-to-end systems thinking for complex enterprises",
      description:
        "Design, integrate, and manage complex socio-technical systems across large organizations.",
      duration: "30 credits · typically 2 years part-time",
      credits: 30,
      badge: "Master’s Degree",
      level: "advanced",
      careerPaths: ["engineering", "cloud-devops"],
      features: [
        "Model-based systems engineering and architecture",
        "Focus on large-scale, mission-critical systems",
        "Ideal for technical leads and engineering managers",
      ],
      link: "/online-masters-systems-engineering/",
    },
    {
      code: "mem",
      title: "Online M.Eng. in Engineering Management",
      subtitle: "Technical leadership at scale",
      description:
        "Blend engineering depth with business acumen to lead teams, portfolios, and transformations.",
      duration: "30 credits · typically 2 years part-time",
      credits: 30,
      badge: "Master’s Degree",
      level: "advanced",
      careerPaths: ["engineering", "business", "product-innovation"],
      features: [
        "Data-driven decision-making for engineering leaders",
        "Covers operations, finance, and project leadership",
        "Designed for emerging and current engineering managers",
      ],
      link: "/online-masters-engineering-management/",
    },
    {
      code: "mba",
      title: "Online MBA",
      subtitle: "Technology-forward leadership for a data-driven economy",
      description:
        "Develop leadership, strategy, and analytics capabilities to guide complex organizations through digital and AI transformation.",
      duration: "36 credits · typically 2–3 years part-time",
      credits: 36,
      badge: "Master’s Degree",
      level: "advanced",
      careerPaths: ["business"],
      features: [
        "AACSB-accredited, tech-infused curriculum",
        "Two in-person immersions to deepen networks",
        "Focus on analytics, innovation, and leadership",
      ],
      link: "/online-mba/",
    },
    {
      code: "pgc-eai",
      title: "Professional Graduate Certificate in Enterprise AI",
      subtitle: "End-to-end AI workflows for the enterprise",
      description:
        "Design, deploy, and govern AI solutions across the enterprise – from problem framing to production monitoring.",
      duration: "12 credits · typically 2–3 courses per term",
      credits: 12,
      badge: "Graduate Certificate",
      level: "bridge",
      careerPaths: ["ai-ml", "business"],
      features: [
        "Full lifecycle AI: strategy, build, and scale",
        "Ideal for product owners, architects, and data leaders",
        "Can stack into a full master’s degree",
      ],
      stackTargets: ["mba", "meads"],
      link: "/certificates/enterprise-ai/",
    },
    {
      code: "pgc-ads",
      title: "Professional Graduate Certificate in Applied Data Science Foundations",
      subtitle: "Core data skills that power every team",
      description:
        "Gain the essential Python, statistics, and data storytelling skills professionals need to contribute to analytics initiatives.",
      duration: "12 credits · typically 2–3 courses per term",
      credits: 12,
      badge: "Graduate Certificate",
      level: "bridge",
      careerPaths: ["data-science", "business"],
      features: [
        "Python, statistics, and foundational machine learning",
        "Great starting point for broader data upskilling",
        "Stacks into the Applied Data Science master’s",
      ],
      stackTargets: ["meads"],
      link: "/certificates/applied-data-science-foundations/",
    },
    {
      code: "pgc-sys",
      title: "Professional Graduate Certificate in Systems Engineering Foundations",
      subtitle: "Core systems engineering tools and methods",
      description:
        "Learn to model, analyze, and manage complex systems as a foundation for advanced engineering leadership.",
      duration: "9–12 credits · typically 2–3 courses",
      credits: 12,
      badge: "Graduate Certificate",
      level: "bridge",
      careerPaths: ["engineering", "cloud-devops"],
      features: [
        "Model-based systems engineering foundations",
        "Great on-ramp to systems-focused master’s degrees",
        "Ideal for engineers stepping into systems roles",
      ],
      stackTargets: ["msyseng", "mem"],
      link: "/certificates/systems-engineering-foundations/",
    },
    {
      code: "pgc-lead",
      title: "Professional Graduate Certificate in Technical Leadership",
      subtitle: "Lead high-performing technical teams",
      description:
        "Build people leadership, communication, and change management skills tailored for engineers and technologists.",
      duration: "9–12 credits · typically 2–3 courses",
      credits: 12,
      badge: "Graduate Certificate",
      level: "bridge",
      careerPaths: ["business", "product-innovation"],
      features: [
        "Focus on coaching, feedback, and stakeholder alignment",
        "Designed for emerging tech leads and managers",
        "Stacks cleanly into engineering management degrees",
      ],
      stackTargets: ["mem", "mba"],
      link: "/certificates/technical-leadership/",
    },
  ],
};

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

        {/* Stackability & Skill Map Graph */}
        <section className="py-16 md:py-20 bg-stevens-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-8 max-w-4xl mx-auto">
              <p className="text-stevens-base md:text-stevens-lg text-stevens-dark-gray">
                Explore a live credential map: click any skill path or credential
                node to see stackable routes, connected pathways, and recommended
                next steps in the detail panel.
              </p>
            </div>
            <StackabilityGraph
              careerPaths={skillMap.careerPaths}
              programs={skillMap.programs}
            />
            <div className="mt-8 text-center">
              <button
                className="inline-flex items-center justify-center h-11 px-6 bg-stevens-red text-white font-stevens-body font-semibold tracking-wide uppercase text-sm hover:bg-white hover:text-stevens-red border border-stevens-red transition-all duration-300"
                onClick={() => setShowContactModal(true)}
              >
                Talk to us about mapping your workforce credentials
              </button>
            </div>
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
