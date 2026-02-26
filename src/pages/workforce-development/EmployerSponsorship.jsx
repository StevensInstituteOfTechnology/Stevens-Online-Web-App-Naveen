import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { getContentImageProps } from "@/utils/responsiveImage";
import { CheckCircle } from "lucide-react";
import { PageHero } from "@/components/shared";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import EmployerFaqSection from "@/components/corporate/EmployerFaqSection";

const EmployerSponsorship = () => {
  usePageTracking({
    pageType: "content",
    additionalData: {
      page_name: "Employer Sponsorship",
      has_form: true,
    },
  });

  const location = useLocation();
  const [activeSection, setActiveSection] = useState("for-students");
  const sectionRefs = useRef({});

  // Set SEO meta tags
  useEffect(() => {
    const canonical = buildCanonicalUrl("/employer-sponsorship/");
    setPageTitle("Employer Sponsorship & Tuition Assistance | Stevens Online");
    setMetaDescription(
      "Learn about employer sponsorship and tuition assistance programs for Stevens Online graduate programs. Discover how employers and students benefit from tuition reimbursement."
    );
    setOpenGraphTags({
      title: "Employer Sponsorship & Tuition Assistance | Stevens Online",
      description:
        "Learn about employer sponsorship and tuition assistance programs for Stevens Online graduate programs.",
      image: buildCanonicalUrl(
        "/assets/images/employer-sponsorship/1-employer-sponsorship.webp"
      ),
      url: canonical,
      type: "website",
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "for-students", label: "For Students" },
    { id: "for-employers", label: "For Employers" },
  ];

  useEffect(() => {
    const currentRefs = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    navItems.forEach((item) => {
      const el = currentRefs[item.id];
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = currentRefs[item.id];
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Handle hash navigation - scroll to section when page loads with hash
  useEffect(() => {
    if (!location.hash) return;

    // Remove the # from hash
    const hashId = location.hash.substring(1);

    // Wait for DOM to be ready and sections to be rendered
    const scrollToHash = () => {
      const element = sectionRefs.current[hashId];
      if (element) {
        // Use scrollIntoView with smooth behavior and offset for fixed header
        const yOffset = -100; // Offset for fixed header
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        return true; // Successfully scrolled
      }
      return false; // Element not found yet
    };

    // Try immediately
    if (scrollToHash()) return;

    // If element not found, try again after delays (sections may still be rendering)
    const timeout1 = setTimeout(() => {
      if (scrollToHash()) return;

      // Final attempt after longer delay
      setTimeout(scrollToHash, 200);
    }, 100);

    return () => clearTimeout(timeout1);
  }, [location.hash]);

  const studentBenefits = [
    "Master's degree holders earn median annual salaries $12,600 higher than those who hold only bachelor's degrees.",
    "More education leads to a lower likelihood of unemployment.",
    "Employer sponsorship reduces cost, lowering your debt over time.",
  ];

  const employerStats = [
    {
      number: "84%",
      description:
        "of employees cited tuition assistance as an important factor in their decision to join their companies.¹",
    },
    {
      number: "129%",
      description:
        "return on investment due in part to reduced employee turnover as a result of tuition reimbursement program.²",
    },
    {
      number: "$5,250",
      description:
        "Tax deduction per employee for tuition reimbursements made through qualified education assistance programs (EAPs) according to Internal Revenue Code Section 127.",
    },
    {
      number: "93%",
      description:
        "of participants said tuition assistance helped them develop skills they needed to grow in their current jobs.¹",
    },
  ];

  const applicationSteps = [
    {
      step: "Step 1",
      title: "Prove eligibility requirements",
      description:
        "Prove that you meet all eligibility requirements. These may include a certain amount of time in the job and a GPA threshold for your undergraduate degree.",
    },
    {
      step: "Step 2",
      title: "Describe degree benefits",
      description:
        "Describe how your intended degree can benefit the employer. This might take the form of both a written statement and an interview with HR or your manager.",
    },
    {
      step: "Step 3",
      title: "Sign contract agreement",
      description:
        "Sign a contract agreement stating that you agree to maintain a certain GPA and work for the employer for a specified period after earning the degree.",
    },
  ];

  const _employerBenefits = [
    "Talent development: Build a more skilled workforce that fosters innovation and growth.",
    "Higher recruitment and retention: Spend less time, money and effort recruiting new workers when you keep long-term employees.",
    "Employee engagement: Keep employees interested through new challenges while allowing them to turn their passions into productivity at work.",
    "Competitive edge: Attract talent by offering a valuable incentive. Companies like Walmart, McDonald's, T-Mobile and Amazon help cover the cost of going back to school.",
  ];

  return (
    <PageContextProvider pageType="content" pageName="Employer Sponsorship">
      <div className="min-h-screen bg-stevens-white">
        {/* Page Hero */}
        <PageHero
          title="Employer Sponsorship"
          subtitle="Benefits for all"
          description="Both students and employers benefit from employer sponsorship programs that help enrollees pay for degrees. Students earn a degree with less debt, while their employers get to retain newly upskilled workers and market this benefit to attract more talent."
          bgImage="/assets/images/employer-sponsorship/1-employer-sponsorship.webp" // Placeholder
        />

        {/* Intro Section */}
        <section className="bg-stevens-white py-stevens-3xl">
          <div className="max-w-7xl mx-auto px-stevens-md text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-stevens-display text-stevens-black sm:text-stevens-3xl md:text-stevens-3xl lg:text-stevens-4xl font-light uppercase tracking-wide mb-stevens-xl">
                Everyone Wins With Employer Tuition Sponsorship
              </h1>
              <div className="max-w-7xl space-y-stevens-lg">
                <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                  Both students and employers benefit from employer sponsorship
                  programs that help enrollees pay for degrees. Students earn a
                  degree with less debt, while their employers get to retain
                  newly upskilled workers and market this benefit to attract
                  more talent.
                </p>
                <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                  Learn how employer sponsorship works, and how you or your
                  organization can take advantage of it.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticky Navigation Bar */}
        <div className="sticky top-0 md:top-[63px] bg-stevens-white/90 backdrop-blur-sm z-[9990] shadow-stevens-md">
          <div className="max-w-7xl mx-auto px-stevens-md">
            <nav className="relative flex px-4 md:px-[100px] justify-start items-center -mb-px space-x-stevens-xs sm:space-x-stevens-sm md:space-x-stevens-md overflow-x-auto scrollbar-hide group">
              {/* Left scroll indicator */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-stevens-white/90 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal"></div>

              {/* Right scroll indicator */}
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-stevens-white/90 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal"></div>

              <div className="flex space-x-stevens-xs sm:space-x-stevens-sm md:space-x-stevens-md">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`py-stevens-md px-stevens-xs sm:px-stevens-sm md:px-stevens-md text-stevens-xs sm:text-stevens-sm md:text-stevens-base font-stevens-medium whitespace-nowrap border-b-2 transition-colors duration-stevens-normal flex-shrink-0 ${
                      activeSection === item.id
                        ? "border-stevens-red text-stevens-red"
                        : "border-transparent text-stevens-dark-gray hover:text-stevens-red"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-stevens-md py-stevens-3xl">
          {/* Students Section */}
          <motion.div
            id="for-students"
            ref={(el) => (sectionRefs.current["for-students"] = el)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-stevens-3xl scroll-mt-16 md:scroll-mt-20"
          >
            {/* What Is Employer Sponsorship */}
            <section className="bg-stevens-white rounded-stevens-lg shadow-stevens-md p-stevens-xl">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-start">
                {/* Left column - Text content */}
                <div className="space-y-stevens-lg">
                  <div>
                    <h2 className="font-stevens-display text-stevens-4xl text-stevens-black font-light uppercase tracking-wide mb-stevens-md">
                      Employer Sponsorship for Students
                    </h2>
                    <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                      Employer tuition assistance is not always as
                      straightforward as grants or scholarships. Here we cover
                      what employee sponsorship is, how to apply and why it
                      might benefit your career to save money on Stevens
                      Institute of Technology tuition.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-stevens-display text-stevens-2xl text-stevens-black font-light uppercase tracking-wide mb-stevens-lg">
                      What Is Employer Sponsorship?
                    </h3>
                    <div className="space-y-stevens-lg">
                      <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                        At root, employer sponsorship is an exchange agreement.
                        You agree to let your employing organization pay for a
                        portion of your tuition costs in exchange for a promise
                        to continue working for them for a set period after
                        graduation.
                      </p>
                      <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                        For example, your organization might offer the yearly
                        tax-deductible limit of $5,250 per academic year if you
                        agree to give them an additional two years of work with
                        your new degree in hand.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right column - Image */}
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-lg">
                    <img
                      {...getContentImageProps(
                        "/assets/images/employer-sponsorship/2-employer-sponsorship.webp"
                      )}
                      alt="Business professionals shaking hands during a meeting, representing employer sponsorship agreements"
                      className="w-full h-auto rounded-stevens-lg shadow-stevens-md object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* How Do You Apply */}
            <section className="bg-stevens-white rounded-stevens-lg shadow-stevens-md p-stevens-xl">
              <h2 className="font-stevens-display text-stevens-3xl text-stevens-black font-light uppercase tracking-wide mb-stevens-lg">
                How Do You Apply?
              </h2>
              <div className="prose prose-lg max-w-none text-stevens-dark-gray mb-stevens-xl">
                <p className="text-stevens-lg leading-relaxed">
                  You should first determine that your employer offers a tuition
                  assistance program. Large organizations are more likely to
                  offer this benefit than small employers, so ask an HR
                  representative at your organization to be sure.
                </p>

                <p className="text-stevens-lg leading-relaxed">
                  <br />
                  Every employer will have a slightly different application
                  process, but you'll typically need to take the following
                  steps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-xl">
                {applicationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-stevens-light-gray rounded-stevens-lg p-stevens-lg"
                  >
                    <div className="flex items-center mb-stevens-md">
                      <div className="w-10 h-10 bg-stevens-black rounded-full flex items-center justify-center text-stevens-white font-light mr-stevens-md">
                        {index + 1}
                      </div>
                      <h3 className="font-stevens-display text-stevens-lg text-stevens-dark-gray font-stevens-bold">
                        {step.step}
                      </h3>
                    </div>
                    <h4 className="font-stevens-display text-stevens-base text-stevens-dark-gray font-stevens-semibold mb-stevens-sm">
                      {step.title}
                    </h4>
                    <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Career Benefits */}
            <section className="bg-stevens-white rounded-stevens-lg shadow-stevens-md p-stevens-xl">
              <h2 className="font-stevens-display text-stevens-3xl text-stevens-black font-light uppercase tracking-wide mb-stevens-lg">
                What Are the Career Benefits?
              </h2>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-start">
                {/* Left column - Text content */}
                <div className="space-y-stevens-lg">
                  <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                    Each level of education you earn raises your lifetime
                    earnings potential. According to the U.S.{" "}
                    <a
                      href="https://www.bls.gov/emp/chart-unemployment-earnings-education.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stevens-red underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
                    >
                      Bureau of Labor Statistics (BLS)
                    </a>
                    , professionals with master's degrees earn median annual
                    salaries $12,600 higher than those who hold only bachelor's
                    degrees. More education also leads to a lower likelihood of
                    unemployment.
                  </p>
                  <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                    Employer sponsorship can help you access these benefits at
                    less cost, leaving you with less debt over time. The Stevens
                    Institution of Technology offers a range of degrees that
                    employers might be happy to help with, including online
                    master's degrees in business administration, computer
                    science and engineering management.
                  </p>
                </div>

                {/* Right column - Benefits list */}
                <div className="space-y-stevens-lg max-w-md mx-auto">
                  {studentBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-stevens-md"
                    >
                      <CheckCircle className="w-6 h-6 text-stevens-black flex-shrink-0 mt-1" />
                      <p className="text-stevens-lg font-bold text-stevens-dark-gray leading-relaxed font-stevens-medium">
                        {benefit}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>

          {/* Employers Section */}
          <motion.div
            id="for-employers"
            ref={(el) => (sectionRefs.current["for-employers"] = el)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-stevens-3xl mt-stevens-3xl scroll-mt-16 md:scroll-mt-20"
          >
            {/* Why Stevens */}
            <section className="bg-stevens-white rounded-stevens-lg shadow-stevens-md p-stevens-xl">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-start">
                {/* Left column - Text content */}
                <div className="space-y-stevens-lg">
                  <div>
                    <h2 className="font-stevens-display text-stevens-4xl text-stevens-black font-light uppercase tracking-wide mb-stevens-lg">
                      Tuition Reimbursement Benefits for Employers
                    </h2>
                    <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                      Fostering a culture of lifelong learning is essential to
                      navigating changes and embracing innovation, and education
                      reimbursement can play a vital role in that.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-stevens-display text-stevens-2xl text-stevens-black font-light uppercase tracking-wide mb-stevens-lg">
                      Why Stevens?
                    </h3>
                    <div className="space-y-stevens-lg">
                      <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                        From our nationally recognized stature, to studying with
                        experienced faculty, to connecting with over 50,000
                        global alumni, we offer unique advantages to support our
                        students' success beyond graduation.
                      </p>
                      <p className="text-stevens-lg leading-relaxed text-stevens-dark-gray">
                        Our faculty members produce groundbreaking research that
                        enables better planning and policy, improves healthcare
                        and treatment, builds our understanding of critical
                        questions, shares useful insight, and makes life safer,
                        more secure and more comfortable. The researchers,
                        practitioners and entrepreneurs that comprise the
                        Stevens Institute of Technology faculty bring innovation
                        and insight to students across disciplines and around
                        the world.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right column - Image */}
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-xl mx-auto">
                    <img
                      {...getContentImageProps(
                        "/assets/images/employer-sponsorship/3-employer-sponsorship.webp"
                      )}
                      alt="Professional business executive in a modern office environment, representing the benefits of employer tuition reimbursement programs"
                      className="w-full h-auto rounded-stevens-lg shadow-stevens-md object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Statistics */}
            <section className="bg-stevens-light-gray rounded-stevens-lg p-stevens-xl">
              <h3 className="font-stevens-display uppercase font-light text-stevens-4xl text-stevens-black mb-stevens-xl text-center tracking-wide">
                At a Glance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stevens-xl">
                {employerStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-stevens-4xl font-light text-stevens-black mb-stevens-md">
                      {stat.number}
                    </div>
                    <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                      {stat.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <EmployerFaqSection accordionPrefix="employer-sponsorship" />
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="bg-stevens-light-gray py-stevens-xl">
          <div className="max-w-7xl mx-auto px-stevens-md text-left">
            <p className="text-stevens-sm text-stevens-dark-gray">
              <sup>1</sup>
              <a
                href="https://www.edassist.com/insights/employee-benefits-study-2018"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stevens-dark-gray underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
              >
                EdAssist study, 2018.
              </a>
              <br />
              <sup>2</sup>
              <a
                href="https://www.luminafoundation.org/news-and-views/2016-04-22-cigna-education-reimbursement-program
"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stevens-dark-gray underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
              >
                Lumina Foundation for Education, 2016.
              </a>
              <br />
            </p>
          </div>
        </div>
      </div>
    </PageContextProvider>
  );
};

export default EmployerSponsorship;
