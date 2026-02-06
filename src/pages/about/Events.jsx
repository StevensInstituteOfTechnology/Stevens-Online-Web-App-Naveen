import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createPageUrl,
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import { PageHero } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  PlayCircle,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { BOOKING_URLS } from "@/config/constants";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  getContentImageProps,
  getCardImageProps,
} from "@/utils/responsiveImage";
import { SupportEventsSection } from "@/components/shared/sections/SupportEventsSection";

/**
 * EventGroup - Collapsible group of event cards
 * Shows first 3 items when collapsed, all items when expanded
 */
function EventGroup({ group }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreThanThree = group.items.length > 3;
  const visibleItems =
    hasMoreThanThree && !isExpanded ? group.items.slice(0, 3) : group.items;

  return (
    <div>
      <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-light text-stevens-dark-gray mb-stevens-lg uppercase tracking-wide">
        {group.heading}
      </h3>
      <div
        className={`grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg ${
          isExpanded ? "animate-in fade-in duration-300" : ""
        }`}
      >
        {visibleItems.map((item) => (
          <Card key={item.title} className="h-full border-stevens-light-gray">
            <CardContent className="p-stevens-lg flex flex-col h-full pt-stevens-lg">
              <h5 className="font-stevens-display text-stevens-xl text-stevens-black font-light mb-stevens-xs hover:text-stevens-red transition-colors duration-stevens-normal">
                {item.title}
              </h5>
              <div className="text-stevens-sm text-stevens-dark-gray mb-stevens-md">
                {item.status}
              </div>
              <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-dark-gray mb-stevens-lg">
                <Clock className="w-4 h-4" /> {item.length}
              </div>
              <div className="mt-auto">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="default">Watch Now</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toggle Button - only show when more than 3 items */}
      {hasMoreThanThree && (
        <div className="flex justify-center mt-stevens-lg">
          <Button
            variant="link"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stevens-red hover:text-stevens-dark-gray text-lg font-medium p-0 h-auto"
          >
            {isExpanded ? (
              <>
                Show Less
                <ChevronUp className="w-5 h-5 ml-1" />
              </>
            ) : (
              <>
                View All Events
                <ChevronDown className="w-5 h-5 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Events() {
  usePageTracking({
    pageType: "content",
    additionalData: {
      page_name: "Events",
      has_event_cards: true,
    },
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle("Upcoming Virtual Events & Webinars | Stevens Online");
    setMetaDescription(
      "Join upcoming virtual events and webinars to explore Stevens Online graduate programs and connect with faculty."
    );
    setOpenGraphTags({
      title: "Upcoming Virtual Events & Webinars | Stevens Online",
      description:
        "Join upcoming virtual events and webinars to explore Stevens Online graduate programs and connect with faculty.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/events/"),
      type: "website",
    });
  }, []);

  const spotlight = {
    title: "The StevensOnline Experience: Current Student Perspectives",
    status: "Ongoing",
    length: "45 minutes",
    url: "https://event.on24.com/wcc/r/4631363/587A841E8E970D8EC05BA6F4AB4CEA5E",
  };

  const onDemandGroups = [
    {
      heading: "ONLINE MBA",
      items: [
        {
          title: "Student Voices: Real Stories From Stevens Graduate Programs",
          status: "Ongoing",
          length: "45 minutes",
          url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE",
        },
        {
          title: "Depth and Breadth: Exploring MBA Concentrations at Stevens",
          status: "Ongoing",
          length: "30 minutes",
          url: "https://event.on24.com/wcc/r/4970049/94A0379A4671307D3BD1329BF230A114",
        },
        {
          title:
            "Upskilling Your MBA: Bringing Technology and Business Together",
          status: "Ongoing",
          length: "30 minutes",
          url: "https://event.on24.com/wcc/r/4631559/8DACF3B1055C849FFDC65E94FFFA4C4A",
        },
        {
          title: "A Technology-Focused MBA With Stevens Online",
          status: "Ongoing",
          length: "30 minutes",
          url: "https://event.on24.com/wcc/r/4791542/DAB3D7D2D76CEC991DF5B0C71A91E4CF",
        },
        {
          title: "On Demand Application Overview: Online MBA",
          status: "Ongoing",
          length: "18 minutes",
          url: "https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE",
        },
        {
          title:
            "Exploring the Online MBA at Stevens Institute of Technology: On-Demand Overview",
          status: "Ongoing",
          length: "11 minutes",
          url: "https://event.on24.com/wcc/r/4670733/9A69E9F6E360B7E9F5C93DDFD5682712?pg=2",
        },
        {
          title: "Financial Aid Overview: Stevens Institute of Technology",
          status: "Ongoing",
          length: "10 minutes",
          url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2",
        },
      ],
    },
    {
      heading: "ONLINE MASTER OF ENGINEERING IN ENGINEERING MANAGEMENT (MEM)",
      items: [
        {
          title: "Student Voices: Real Stories From Stevens Graduate Programs",
          status: "Ongoing",
          length: "45 minutes",
          url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE",
        },
        {
          title: "Start With Two Courses. Step Into Engineering Leadership",
          status: "Ongoing",
          length: "30 minutes",
          url: "https://event.on24.com/wcc/r/4970047/F7AEF7F7E214EFD9A417BC81BE6BA906",
        },
        {
          title: "Financial Aid Overview: Stevens Institute of Technology",
          status: "Ongoing",
          length: "10 minutes",
          url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2",
        },
        {
          title:
            "Exploring the Online Master's in Engineering Management at Stevens",
          status: "Ongoing",
          length: "19 minutes",
          url: "https://event.on24.com/wcc/r/4666985/156784FFB13710F1FFCF29E5C6DBAD13",
        },
        {
          title:
            "Application Overview: Online Master's in Engineering Management",
          status: "Ongoing",
          length: "24 minutes",
          url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810",
        },
      ],
    },
    {
      heading: "ONLINE M.S. IN COMPUTER SCIENCE",
      items: [
        {
          title:
            "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology",
          status: "Ongoing",
          length: "11 minutes",
          url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26",
        },
        {
          title: "Student Voices: Real Stories From Stevens Graduate Programs",
          status: "Ongoing",
          length: "45 minutes",
          url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE",
        },
        {
          title: "Start With Two Courses. Step Into Computer Science",
          status: "Ongoing",
          length: "30 minutes",
          url: "https://event.on24.com/wcc/r/4970040/A6ED251C21B790E2D79369BFB149380A",
        },
        {
          title: "Online M.S. in Computer Science: Areas of Focus",
          status: "Ongoing",
          length: "12 minutes",
          url: "https://event.on24.com/wcc/r/4894227/042446D9C5E18BF3F4D7CD9A7604B1EA",
        },
        {
          title: "Financial Aid Overview: Stevens Institute of Technology",
          status: "Ongoing",
          length: "10 minutes",
          url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2",
        },
        {
          title: "Application Walkthrough: Data Science and Computer Science",
          status: "Ongoing",
          length: "24 minutes",
          url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29",
        },
        {
          title:
            "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology",
          status: "Ongoing",
          length: "23 minutes",
          url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26?pg=2",
        },
      ],
    },
  ];

  const supportEvents = [
    {
      title: "Application Overview: Online MBA",
      length: "15 minutes",
      url: "https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE",
      image: "/assets/images/events/events-mba.webp",
    },
    {
      title: "Application Walkthrough: Computer Science",
      length: "10 minutes",
      url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29",
      image: "/assets/images/events/events-computer-science.webp",
    },
    {
      title: "Application Walkthrough: Engineering Management",
      length: "24 minutes",
      url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810",
      image: "/assets/images/events/events-engineering-management.webp",
    },
  ];

  return (
    <PageContextProvider pageType="content" pageName="Events">
      <div>
        <PageHero
          title="Stevens Institute of Technology"
          subtitle="Upcoming Virtual Events & Webinars"
          bgImage="/assets/images/events/events-hero.webp"
        />

        {/* Intro Section */}
        <div className="py-stevens-2xl bg-stevens-white border-b border-stevens-light-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
            <p className="text-stevens-xl text-stevens-dark-gray leading-relaxed max-w-4xl mx-auto font-stevens-body">
              Whether you're interested in learning about the application
              process, financial aid options, program overviews, or hearing from
              our thought leaders, alumni and program directors, join us for
              live and on-demand virtual events year-round.
            </p>
          </div>
        </div>

        {/* Event Spotlight */}
        <div className="py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-xl text-center">
              Event Spotlight
            </h2>
            <Card className="border-0 shadow-stevens-2xl overflow-hidden bg-stevens-white">
              <div className="stevens-md:flex">
                {/* Image */}
                <div className="stevens-md:w-2/5 overflow-hidden">
                  <img
                    {...getContentImageProps(
                      "/assets/images/events/events-spotlight.webp",
                      "800px"
                    )}
                    alt="Event Spotlight"
                    className="w-full h-full object-cover aspect-video stevens-md:aspect-auto"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <CardContent className="stevens-md:w-3/5 p-stevens-xl stevens-lg:p-stevens-2xl flex flex-col justify-center">
                  <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-light text-stevens-dark-gray mb-stevens-md leading-tight">
                    {spotlight.title}
                  </h3>
                  <div className="flex items-center gap-stevens-md text-stevens-base text-stevens-dark-gray mb-stevens-lg">
                    <span className="flex items-center gap-stevens-xs font-stevens-semibold text-stevens-dark-gray">
                      <PlayCircle className="w-5 h-5" /> {spotlight.status}
                    </span>
                    <span className="flex items-center gap-stevens-xs">
                      <Clock className="w-5 h-5" /> {spotlight.length}
                    </span>
                  </div>
                  <a
                    href={spotlight.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="default"
                      className="text-stevens-lg px-stevens-2xl py-stevens-lg"
                    >
                      Explore the Student Experience
                    </Button>
                  </a>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
        {/* Application Support Events - Using shared SupportEventsSection component */}
        <SupportEventsSection
          events={supportEvents}
          showViewAllButton={false}
        />

        {/* On-Demand Content */}
        <div className="py-stevens-section bg-stevens-light-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-md text-center">
              Watch On-Demand Content
            </h2>
            <p className="text-stevens-lg text-stevens-dark-gray mb-stevens-2xl max-w-4xl mx-auto text-center leading-relaxed">
              At Stevens, we host a variety of events for prospective and
              current students covering topics such as application strategy,
              program information, the student experience and our online
              platform. Our on-demand content is instantly available, so you can
              watch at your convenience.
            </p>

            <div className="space-y-stevens-2xl">
              {onDemandGroups.map((group, groupIndex) => (
                <EventGroup key={group.heading} group={group} />
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Virtual Events */}
        {/* <div className="py-stevens-section bg-stevens-white border-t border-b border-stevens-light-gray">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-md">Upcoming Virtual Events</h2>
          <p className="text-stevens-lg text-stevens-dark-gray mb-stevens-sm max-w-3xl mx-auto">Mark your calendar for upcoming live events. Attendees will receive an application fee waiver.</p>
          <p className="text-stevens-base text-stevens-dark-gray italic">Check back soon for more upcoming events.</p>
        </div>
      </div> */}

        {/* One-on-One CTA */}
        <div className="py-stevens-section bg-stevens-dark-gray text-stevens-white relative overflow-hidden">
          <div className="relative max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide mb-stevens-md">
              Schedule a One-On-One Application Walkthrough
            </h2>
            <p className="text-stevens-lg text-stevens-white/90 mb-stevens-xl max-w-3xl mx-auto leading-relaxed">
              Take some of the stress out of applying. Connect with the
              enrollment team today for answers to your questions about
              eligibility, requirements, application best practices and more.
            </p>
            <a
              href={BOOKING_URLS.SCHEDULE_CALL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackConversion(CONVERSION_LABELS.MAKE_APPOINTMENT)
              }
            >
              <Button
                variant="outline-white"
                className="px-stevens-lg py-stevens-md text-stevens-lg"
              >
                Make an Appointment
              </Button>
            </a>
          </div>
        </div>
      </div>
    </PageContextProvider>
  );
}
