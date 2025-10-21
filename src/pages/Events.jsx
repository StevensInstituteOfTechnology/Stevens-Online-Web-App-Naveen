import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, PlayCircle, FileText } from 'lucide-react';
import { BOOKING_URLS } from '@/config/constants';

export default function Events() {
  const spotlight = {
    title: 'The StevensOnline Experience: Current Student Perspectives',
    status: 'Ongoing',
    length: '45 minutes',
    url: 'https://event.on24.com/wcc/r/4631363/587A841E8E970D8EC05BA6F4AB4CEA5E'
  };

  const onDemandGroups = [
    {
      heading: 'ONLINE MBA',
      items: [
        {
          title: 'Student Voices: Real Stories From Stevens Graduate Programs',
          status: 'Ongoing',
          length: '45 minutes',
          url: 'https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE'
        },
        {
          title: 'Depth and Breadth: Exploring MBA Concentrations at Stevens',
          status: 'Ongoing',
          length: '30 minutes',
          url: 'https://event.on24.com/wcc/r/4970049/94A0379A4671307D3BD1329BF230A114'
        },
        {
          title: 'Upskilling Your MBA: Bringing Technology and Business Together',
          status: 'Ongoing',
          length: '30 minutes',
          url: 'https://event.on24.com/wcc/r/4631559/8DACF3B1055C849FFDC65E94FFFA4C4A'
        },
        {
          title: 'A Technology-Focused MBA With Stevens Online',
          status: 'Ongoing',
          length: '30 minutes',
          url: 'https://event.on24.com/wcc/r/4791542/DAB3D7D2D76CEC991DF5B0C71A91E4CF'
        },
        {
          title: 'On Demand Application Overview: Online MBA',
          status: 'Ongoing',
          length: '18 minutes',
          url: 'https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE'
        },
        {
          title: 'Exploring the Online MBA at Stevens Institute of Technology: On-Demand Overview',
          status: 'Ongoing',
          length: '11 minutes',
          url: 'https://event.on24.com/wcc/r/4670733/9A69E9F6E360B7E9F5C93DDFD5682712?pg=2'
        },
        {
          title: 'Financial Aid Overview: Stevens Institute of Technology',
          status: 'Ongoing',
          length: '10 minutes',
          url: 'https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2'
        }
      ]
    },
    {
      heading: 'ONLINE MASTER OF ENGINEERING IN ENGINEERING MANAGEMENT (MEM)',
      items: [
        {
          title: 'Student Voices: Real Stories From Stevens Graduate Programs',
          status: 'Ongoing',
          length: '45 minutes',
          url: 'https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE'
        },
        {
          title: 'Start With Two Courses. Step Into Engineering Leadership',
          status: 'Ongoing',
          length: '30 minutes',
          url: 'https://event.on24.com/wcc/r/4970047/F7AEF7F7E214EFD9A417BC81BE6BA906'
        },
        {
          title: 'Financial Aid Overview: Stevens Institute of Technology',
          status: 'Ongoing',
          length: '10 minutes',
          url: 'https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2'
        },
        {
          title: 'Exploring the Online Master\'s in Engineering Management at Stevens',
          status: 'Ongoing',
          length: '19 minutes',
          url: 'https://event.on24.com/wcc/r/4666985/156784FFB13710F1FFCF29E5C6DBAD13'
        },
        {
          title: 'Application Overview: Online Master\'s in Engineering Management',
          status: 'Ongoing',
          length: '24 minutes',
          url: 'https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810'
        }
      ]
    },
    {
      heading: 'ONLINE M.S. IN COMPUTER SCIENCE',
      items: [
        {
          title: 'Exploring the Online M.S. in Computer Science at Stevens Institute of Technology',
          status: 'Ongoing',
          length: '11 minutes',
          url: 'https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26'
        },
        {
          title: 'Student Voices: Real Stories From Stevens Graduate Programs',
          status: 'Ongoing',
          length: '45 minutes',
          url: 'https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE'
        },
        {
          title: 'Start With Two Courses. Step Into Computer Science',
          status: 'Ongoing',
          length: '30 minutes',
          url: 'https://event.on24.com/wcc/r/4970040/A6ED251C21B790E2D79369BFB149380A'
        },
        {
          title: 'Online M.S. in Computer Science: Areas of Focus',
          status: 'Ongoing',
          length: '12 minutes',
          url: 'https://event.on24.com/wcc/r/4894227/042446D9C5E18BF3F4D7CD9A7604B1EA'
        },
        {
          title: 'Financial Aid Overview: Stevens Institute of Technology',
          status: 'Ongoing',
          length: '10 minutes',
          url: 'https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2'
        },
        {
          title: 'Application Walkthrough: Data Science and Computer Science',
          status: 'Ongoing',
          length: '24 minutes',
          url: 'https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29'
        },
        {
          title: 'Exploring the Online M.S. in Computer Science at Stevens Institute of Technology',
          status: 'Ongoing',
          length: '23 minutes',
          url: 'https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26?pg=2'
        }
      ]
    }
  ];

  const supportEvents = [
    {
      title: 'Application Overview: Online MBA',
      length: '15 minutes',
      url: 'https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE',
      image: '/assets/images/2-event.png'
    },
    {
      title: 'Application Walkthrough: Computer Science',
      length: '10 minutes',
      url: 'https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29',
      image: '/assets/images/3-event.webp'
    },
    {
      title: 'Application Walkthrough: Engineering Management',
      length: '24 minutes',
      url: 'https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810',
      image: '/assets/images/4-event.webp'
    }

  ];

  return (
    <div>
      <PageHero
        title="Stevens Institute of Technology"
        subtitle="Virtual Events"
        bgImage="/assets/images/1-event-scaled.webp"
      />

      {/* Intro Section */}
      <div className="py-stevens-2xl bg-stevens-white border-b border-stevens-gray-200">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
          <p className="text-stevens-xl text-stevens-gray-800 leading-relaxed max-w-4xl mx-auto font-stevens-body">
            Whether you're interested in learning about the application process, financial aid options, program overviews, or hearing from our thought leaders, alumni and program directors, join us for live and on-demand virtual events year-round.
          </p>
        </div>
      </div>

      {/* Event Spotlight */}
      <div className="py-stevens-section bg-gradient-to-b from-stevens-gray-50 to-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-xl text-center">Event Spotlight</h2>
          <Card className="border-0 shadow-stevens-2xl overflow-hidden bg-gradient-to-br from-stevens-white to-stevens-gray-50">
            <div className="stevens-md:flex">
              {/* Image */}
              <div className="stevens-md:w-2/5 overflow-hidden">
                <img src="/assets/images/1-event.avif" alt="Event Spotlight" className="w-full h-full object-cover aspect-video stevens-md:aspect-auto" />
              </div>
              
              {/* Content */}
              <CardContent className="stevens-md:w-3/5 p-stevens-xl stevens-lg:p-stevens-2xl flex flex-col justify-center">
                <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-gray-900 mb-stevens-md leading-tight">{spotlight.title}</h3>
                <div className="flex items-center gap-stevens-md text-stevens-base text-stevens-gray-600 mb-stevens-lg">
                  <span className="flex items-center gap-stevens-xs font-stevens-semibold text-stevens-gray-600">
                    <PlayCircle className="w-5 h-5"/> {spotlight.status}
                  </span>
                  <span className="flex items-center gap-stevens-xs">
                    <Clock className="w-5 h-5"/> {spotlight.length}
                  </span>
                </div>
                <a href={spotlight.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="btn-stevens-primary text-stevens-lg px-stevens-2xl py-stevens-lg">
                    Explore the Student Experience
                  </Button>
                </a>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      {/* On-Demand Content */}
      <div className="py-stevens-section bg-stevens-gray-50">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md text-center">Watch On-Demand Content</h2>
          <p className="text-stevens-lg text-stevens-gray-700 mb-stevens-2xl max-w-4xl mx-auto text-center leading-relaxed">At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.</p>

          <div className="space-y-stevens-2xl">
            {onDemandGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-primary mb-stevens-lg uppercase tracking-tight">{group.heading}</h3>
                <div className="grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg">
                  {group.items.map((item) => (
                    <Card key={item.title} className="h-full border-stevens-gray-100 ">
                      <CardContent className="p-stevens-lg flex flex-col h-full pt-stevens-lg">
                        <h5 className="font-stevens-semibold text-stevens-gray-900 uppercase font-bold mb-stevens-xs hover:text-stevens-primary transition-colors duration-stevens-normal">{item.title}</h5>
                        <div className="text-stevens-sm text-stevens-gray-700 mb-stevens-md">{item.status}</div>
                        <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-gray-700 mb-stevens-lg">
                          <Clock className="w-4 h-4"/> {item.length}
                        </div>
                        <div className="mt-auto">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <Button className="btn-stevens-outline text-stevens-white">Watch Now</Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Support Events */}
      <div className="py-stevens-section bg-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-xl text-center">Application Support Events</h2>
          <div className="grid stevens-md:grid-cols-2 gap-stevens-xl max-w-5xl mx-auto">
            {supportEvents.map((e) => (
              <Card key={e.title} className="border-0 shadow-stevens-lg hover:shadow-stevens-2xl transition-all duration-stevens-normal bg-stevens-white group overflow-hidden h-full">
                <div className="stevens-md:flex stevens-md:flex-row flex flex-col h-full">
                  {/* Image */}
                  <div className="stevens-md:w-2/5 overflow-hidden flex-shrink-0">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover min-h-full" />
          </div>
          
                  {/* Content */}
                  <CardContent className="stevens-md:w-3/5 p-stevens-lg flex flex-col justify-between flex-1">
                  <div>
                      <p className="text-stevens-xs text-stevens-primary font-stevens-bold uppercase tracking-wider my-stevens-xs">On-Demand Event</p>
                      <h3 className="font-stevens-display uppercase font-bold text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm leading-tight group-hover:text-stevens-primary transition-colors duration-stevens-normal">{e.title}</h3>
                      <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-gray-600 mb-stevens-md">
                        <Clock className="w-4 h-4"/> {e.length}
                      </div>
                    </div>
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="block mt-stevens-md">
                      <Button className="bg-stevens-primary text-stevens-white hover:bg-stevens-maroon-dark transition-all duration-stevens-normal font-stevens-semibold px-stevens-lg py-stevens-md">
                        Watch Now
                    </Button>
                  </a>
                </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Virtual Events */}
      <div className="py-stevens-section bg-gradient-to-b from-stevens-gray-50 to-stevens-white border-t border-b border-stevens-gray-200">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">Upcoming Virtual Events</h2>
          <p className="text-stevens-lg text-stevens-gray-700 mb-stevens-sm max-w-3xl mx-auto">Mark your calendar for upcoming live events. Attendees will receive an application fee waiver.</p>
          <p className="text-stevens-base text-stevens-gray-600 italic">Check back soon for more upcoming events.</p>
        </div>
      </div>

      {/* One-on-One CTA */}
      <div className="py-stevens-section bg-gradient-to-br from-stevens-primary to-stevens-maroon-dark text-stevens-white relative overflow-hidden">
       
        
        <div className="relative max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md">Schedule a One-On-One Application Walkthrough</h2>
          <p className="text-stevens-lg text-stevens-white/90 mb-stevens-xl max-w-3xl mx-auto leading-relaxed">Take some of the stress out of applying. Connect with the enrollment team today for answers to your questions about eligibility, requirements, application best practices and more.</p>
          <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.MAKE_APPOINTMENT)}>
            <Button className="btn-stevens-secondary bg-stevens-white text-stevens-primary hover: font-stevens-semibold px-stevens-lg py-stevens-md rounded-stevens-md transition-colors duration-stevens-normal text-stevens-lg flex-1">
              Make an Appointment
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}