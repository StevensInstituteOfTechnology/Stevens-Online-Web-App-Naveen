import React, { useState, useEffect } from "react";
import { PageHero, RequestInfoModal } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Users, LifeBuoy, Library, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  createPageUrl,
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import { BOOKING_URLS } from "@/config/constants";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

export default function OnlineExperience() {
  usePageTracking({
    pageType: "content",
    additionalData: {
      page_name: "Online Experience",
      has_dean_letter: true,
      has_rfi_modal: true,
    },
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle(
      "Online Learning Experience & Student Support | Stevens Online"
    );
    setMetaDescription(
      "Explore the online and distance learning experience at Stevens. Benefit from 24/7 access to resources, dedicated support, and a collaborative virtual classroom designed for flexibility and engagement."
    );
    setOpenGraphTags({
      title: "Online Learning Experience & Student Support | Stevens Online",
      description:
        "Explore the online and distance learning experience at Stevens. Benefit from 24/7 access to resources, dedicated support, and a collaborative virtual classroom designed for flexibility and engagement.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/online-learning-experience/"),
      type: "website",
    });
  }, []);

  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [activeBreakdownTab, setActiveBreakdownTab] = useState("async");

  // Weekly Breakdown data for both course formats
  const weeklyBreakdownTabs = {
    async: {
      label: "Asynchronous Courses",

      cards: [
        {
          title: "Asynchronous Courses",
          description: "Self-paced classes.",
        },
        {
          title: "Assignments",
          description:
            "Work completed according to your own schedule, including homework, projects, reading and research.",
        },
      ],
      total: {
        hours: "20 Hours",
        label: "Total Hours",
        note: "Hours are estimates and are subject to change per course.",
      },
    },
    syncAsync: {
      label: "Synchronous + Asynchronous Courses",

      cards: [
        {
          hours: "1.5 Hours",
          title: "Synchronous",
          description: "Live online class meetings held each week.",
        },
        {
          hours: "5 Hours",
          title: "Asynchronous",
          description:
            "Self-paced course work completed according to your own schedule prior to each week's synchronous class meeting.",
        },
        {
          hours: "3-5 Hours",
          title: "Assignments",
          description: "Homework, projects, research, etc.",
        },
      ],
      total: {
        hours: "9-12 Hours",
        label: "Total Hours",
        note: "Hours are estimates and are subject to change per course.",
      },
    },
  };

  const features = [
    {
      icon: Laptop,
      title: "State-of-the-Art Learning Platform",
      description:
        "Engage with course materials, participate in discussions, and collaborate with peers through our intuitive and powerful online learning environment, accessible 24/7.",
    },
    {
      icon: Users,
      title: "Collaborative Virtual Classrooms",
      description:
        "Experience live, interactive sessions with our world-class faculty and a diverse cohort of students. Our small class sizes ensure meaningful interaction and personalized attention.",
    },
    {
      icon: LifeBuoy,
      title: "Comprehensive Student Support",
      description:
        "From enrollment to graduation, your dedicated student success advisor is here to help you navigate your academic journey, providing guidance and connecting you to resources.",
    },
    {
      icon: Library,
      title: "Full Access to University Resources",
      description:
        "Online students enjoy full access to the Stevens digital library, career services, alumni network, and technical support, ensuring you are a fully integrated member of our community.",
    },
  ];

  return (
    <PageContextProvider pageType="content" pageName="OnlineExperience">
      <div>
        <PageHero
          title="Online Education"
          subtitle="A premier, technology-driven education, delivered with flexibility."
          bgImage="/assets/images/online-experience/1-online-learning-hero-scaled.webp"
        />

        {/* Welcome Message from Dean Arshad */}
        <div className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <Card className="shadow-stevens-2xl border border-stevens-light-gray rounded-stevens-lg overflow-hidden">
              <CardContent className="p-0">
                {/* Header with Dean's Photo and Title */}
                <div className="bg-stevens-dark-gray text-white p-stevens-lg stevens-md:p-stevens-xl">
                  <div className="flex flex-col stevens-md:flex-row items-center gap-stevens-lg">
                    <img
                      src="/assets/avatars/home-avatar/ArshadS_H_S_L.webp"
                      alt="Arshad Saiyed, Chief Online Learning Officer and Dean"
                      className="w-32 h-32 stevens-md:w-40 stevens-md:h-40 rounded-full object-cover border-4 border-white shadow-stevens-xl"
                    />
                    <div className="text-center stevens-md:text-left">
                      <h2 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-light mb-stevens-xs">
                        Arshad Saiyed
                      </h2>
                      <p className="text-stevens-base stevens-md:text-stevens-lg font-stevens-medium text-white/90">
                        Chief Online Learning Officer and Dean of the College of
                        Professional Education
                      </p>
                    </div>
                  </div>
                </div>

                {/* Letter Content */}
                <div className="p-stevens-lg stevens-md:p-stevens-2xl bg-white">
                  <h3 className="font-stevens-display text-stevens-xl stevens-md:text-stevens-2xl font-stevens-bold text-stevens-dark-gray mb-stevens-lg"></h3>

                  <div className="prose prose-lg max-w-none text-stevens-dark-gray leading-relaxed space-y-stevens-md">
                    <p>
                      Welcome to Stevens Online. For more than 150 years,
                      Stevens Institute of Technology has been at the forefront
                      of innovation, shaping the future through technology,
                      research, and education. Stevens is consistently ranked
                      among the nation's top universities for return on
                      investment, reflecting both the quality and long-term
                      value of a Stevens education.
                    </p>
                    <p>
                      That same commitment to excellence defines our online
                      learning experience. Stevens Online offers rigorous,
                      engaging, and flexible programs designed by expert
                      faculty, industry-aligned, and focused on real-world
                      application. Our students learn alongside professionals
                      from across the world, gaining skills that are immediately
                      relevant to their careers and preparing them to lead in a
                      rapidly changing environment.
                    </p>
                    <p>
                      Building on this strong foundation, Stevens has created a
                      new College of Professional Education to expand access to
                      high-impact, technology-driven education for working
                      professionals and corporate partners.
                    </p>
                    <p>
                      I invite you to explore our programs and experience how
                      Stevens continues to set the standard for excellence and
                      innovation in online learning and professional education.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="mt-stevens-xl">
                    <img
                      src="/assets/images/online-experience/arshad-signature.webp"
                      alt="Arshad Saiyed Signature"
                      className="h-16 stevens-md:h-20 w-auto mb-stevens-sm"
                    />
                    <p className="font-stevens-semibold text-stevens-dark-gray">
                      Arshad Saiyed
                    </p>
                    <p className="text-stevens-sm text-stevens-dark-gray">
                      Chief Online Learning Officer and Dean
                      <br />
                      College of Professional Education <br />
                      Stevens Institute of Technology
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Breakdown Per Class Section */}
        <section className="py-16 md:py-20 bg-stevens-light-gray">
          <div className="max-w-7xl mx-auto px-stevens-sm md:px-stevens-lg xl:px-stevens-xl">
            {/* Heading */}
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray text-center mb-10">
              Weekly Breakdown Per Class
            </h2>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-8 border-b border-gray-300">
                <button
                  onClick={() => setActiveBreakdownTab("async")}
                  className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all ${
                    activeBreakdownTab === "async"
                      ? "text-stevens-dark-gray border-b-2 border-stevens-red"
                      : "text-gray-500 hover:text-stevens-dark-gray"
                  }`}
                >
                  Asynchronous Courses
                </button>
                <button
                  onClick={() => setActiveBreakdownTab("syncAsync")}
                  className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all ${
                    activeBreakdownTab === "syncAsync"
                      ? "text-stevens-dark-gray border-b-2 border-stevens-red"
                      : "text-gray-500 hover:text-stevens-dark-gray"
                  }`}
                >
                  Synchronous + Asynchronous Courses
                </button>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-center text-stevens-dark-gray mb-10">
              {weeklyBreakdownTabs[activeBreakdownTab].subtitle}
            </p>

            {/* Cards with operators */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4">
              {weeklyBreakdownTabs[activeBreakdownTab].cards.map(
                (card, index) => (
                  <React.Fragment key={index}>
                    {/* Card */}
                    <div className="bg-white rounded-stevens-md p-6 flex-1 min-w-[200px] shadow-sm border border-gray-200">
                      {card.hours && (
                        <p className="text-stevens-red text-2xl md:text-3xl font-bold italic mb-1">
                          {card.hours}
                        </p>
                      )}
                      <p className="font-bold text-lg text-stevens-dark-gray italic">
                        {card.title}
                      </p>
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Plus operator (not after last card) */}
                    {index <
                      weeklyBreakdownTabs[activeBreakdownTab].cards.length -
                        1 && (
                      <div className="hidden lg:flex items-center justify-center px-2">
                        <span className="text-3xl font-light text-gray-400">
                          +
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                )
              )}

              {/* Equals operator */}
              <div className="hidden lg:flex items-center justify-center px-2">
                <span className="text-3xl font-light text-gray-400">=</span>
              </div>

              {/* Total Card (Red) */}
              <div className="bg-stevens-red text-white rounded-stevens-md p-6 flex-1 min-w-[200px]">
                <p className="text-3xl md:text-4xl font-bold">
                  {weeklyBreakdownTabs[activeBreakdownTab].total.hours}
                </p>
                <p className="font-bold text-lg">
                  {weeklyBreakdownTabs[activeBreakdownTab].total.label}
                </p>
                <p className="text-sm mt-3 text-white/80 leading-relaxed">
                  {weeklyBreakdownTabs[activeBreakdownTab].total.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Student Support Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-stevens-sm md:px-stevens-lg xl:px-stevens-xl space-y-16 md:space-y-20">
            {/* Row 1: Overview - Text Left, Image Right */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
                  Overview
                </h2>
                <div className="space-y-stevens-md text-stevens-dark-gray leading-relaxed">
                  <p>
                    Recognized as one of the most innovative schools in the
                    nation, Stevens integrates technology across disciplines,
                    ensuring that online students benefit from the same rigorous
                    curriculum and expert faculty as those on campus.
                  </p>
                  <p>
                    This commitment is supported by our substantial investment
                    in academic and research infrastructure, facilitating a
                    cutting-edge educational experience. Our 100% online format
                    includes synchronous and asynchronous courses — and allows
                    you to access learning materials, lecture notes and
                    assignments at any time through our online course platform.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-stevens-light-gray rounded-stevens-lg shadow-stevens-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="/assets/images/online-experience/online-experience-1.png"
                    alt="Students collaborating online"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Student Support - Image Left, Text Right */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative md:order-1 order-2">
                <div className="bg-stevens-light-gray rounded-stevens-lg shadow-stevens-lg overflow-hidden aspect-[4/3]">
                  <img
                    src="/assets/images/online-experience/Stevens_Two_Cities_20230413_STEVENS-63-CROP.webp"
                    alt="Student receiving support"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:order-2 order-1">
                <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
                  Student Support
                </h2>
                <div className="space-y-stevens-md text-stevens-dark-gray leading-relaxed">
                  <p>
                    As an online student, you'll have access to resources and
                    support designed to help you flourish academically, stay
                    connected to the university community and benefit from
                    educational opportunities beyond the classroom. You'll
                    receive one-on-one guidance from faculty who, with their
                    deep research and industry backgrounds, will push you to
                    master advanced topics while ensuring you meet high
                    standards.
                  </p>
                  <p>
                    These resources include the Continuing and Professional
                    Student Care Center, which can assist with every aspect of
                    being an online student, including admissions, registration,
                    billing, deadlines and graduation requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <div className="text-center mb-16">
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray">
                What to Expect as an Online Student
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-stevens-lg hover:shadow-stevens-xl transition-shadow duration-stevens-normal rounded-stevens-md"
                  >
                    <CardContent className="p-stevens-lg pt-stevens-lg">
                      <div className="flex items-center gap-stevens-md">
                        <div className="bg-stevens-light-gray p-stevens-sm rounded-stevens-md">
                          <Icon className="w-8 h-8 text-stevens-black" />
                        </div>
                        <h3 className="font-stevens-display text-stevens-2xl font-light">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="mt-stevens-md text-stevens-dark-gray leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide mb-stevens-md">
              Ready to Learn More?
            </h2>
            <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed mb-stevens-lg">
              Connect with our admissions team to get your questions answered
              and find out if an online program at Stevens is the right fit for
              you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BOOKING_URLS.SCHEDULE_CALL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}
                className="w-full sm:w-auto"
              >
                <Button variant="default" className="w-full uppercase">
                  Schedule a Call
                </Button>
              </a>
              <Button
                variant="outline-dark"
                className="w-full sm:w-auto uppercase"
                onClick={() => {
                  trackConversion(CONVERSION_LABELS.REQUEST_INFO);
                  setShowRequestInfoModal(true);
                }}
              >
                Request Information
              </Button>
            </div>
          </div>
        </div>

        {/* Request Info Modal */}
        <RequestInfoModal
          isOpen={showRequestInfoModal}
          onClose={() => setShowRequestInfoModal(false)}
          sourcePage="online_experience_page"
          programOfInterest=""
        />
      </div>
    </PageContextProvider>
  );
}
