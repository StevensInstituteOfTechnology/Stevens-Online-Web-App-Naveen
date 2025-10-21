import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Award, Globe, GraduationCap, ArrowRight, User, ExternalLink, PlayCircle, FileText, DollarSign, Briefcase, BrainCircuit, LineChart, TrendingUp, Target, Users, Clock } from 'lucide-react';
import VideoPlayer from '../shared/VideoPlayer';
import PageHero from '../shared/PageHero';
import LeadCaptureForm from '../forms/LeadCaptureForm';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';

// Section Component for consistent styling
// Added paddingClassName to allow per-section padding control (e.g., remove bottom padding)
const Section = ({ id, title, children, container = true, el = 'section', refProp, bgClassName = 'bg-stevens-white', paddingClassName = 'py-stevens-section-sm lg:py-stevens-section' }) => {
  const Element = el;
  return (
    <Element id={id} ref={refProp} className={`${bgClassName} ${paddingClassName} scroll-mt-20`}>
      <div className={container ? "max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg" : ""}>
        {title && <h2 className="font-stevens-headers text-stevens-3xl md:text-stevens-4xl font-bold text-stevens-gray-900 mb-stevens-lg text-center">{title}</h2>}
        {children}
      </div>
    </Element>
  );
};

// Ranking Card Component
const RankingCard = ({ ranking, description, source, note }) => (
  <div className="bg-stevens-white p-stevens-md rounded-stevens-md shadow-stevens-lg text-center border-t-4 border-stevens-primary h-full flex flex-col">
    <div className="flex-grow">
      <p className="font-stevens-display text-stevens-hero font-stevens-bold text-stevens-primary mb-stevens-sm">{ranking}</p>
      <p className="text-stevens-lg font-stevens-semibold text-stevens-gray-900 uppercase tracking-wide">{description}</p>
    </div>
    {source && (
      <p className="text-stevens-sm text-stevens-gray-600 mt-stevens-sm">
        {source} {note && <sup>{note}</sup>}
      </p>
    )}
  </div>
);

// Faculty Card Component
const FacultyCard = ({ member }) => {
  const { name, title, image } = member;
  return (
    <div className="text-center snap-center flex-shrink-0 w-[180px] stevens-md:w-[220px]">
    <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-stevens-md object-cover shadow-stevens-lg"/>
    <h4 className="font-stevens-semibold text-stevens-lg text-stevens-gray-900">{name}</h4>
    <p className="text-stevens-sm text-stevens-primary">{title}</p>
  </div>
);
};

// What You'll Learn - Skill Cards Variant (for MBA)
const SkillCardsGrid = ({ modules }) => {
  if (!modules || modules.length === 0) return null;
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
      {modules.map((module, index) => {
        const Icon = module.icon;
        return (
          <Card key={index} className="bg-stevens-white shadow-stevens-lg rounded-stevens-md hover:shadow-stevens-xl transition-all duration-stevens-normal border border-stevens-gray-200">
            <CardHeader className="pb-stevens-sm">
              <div className="flex items-start gap-stevens-md mb-stevens-md">
                <div className="bg-stevens-gray-100 p-stevens-md rounded-stevens-md border border-stevens-gray-300">
                  {Icon && <Icon className="w-8 h-8 text-stevens-gray-700" />}
                </div>
                <div className="flex-1">
                  <CardTitle className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900 leading-tight">
                    {module.title}
                  </CardTitle>
                  {module.growth && (
                    <p className="text-stevens-sm text-green-600 font-stevens-semibold mt-stevens-xs flex items-center gap-stevens-xs">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      {module.growth}
                    </p>
                  )}
                </div>
              </div>
    </CardHeader>
    <CardContent>
              {module.courses && module.courses.length > 0 && (
                <div className="space-y-stevens-sm">
                  <h4 className="font-stevens-bold text-stevens-sm uppercase tracking-wider text-stevens-gray-600 mb-stevens-md">
                    Example Courses:
                  </h4>
                  {module.courses.map((course, i) => (
                    <div key={i} className="flex items-start gap-stevens-sm bg-stevens-gray-50 p-stevens-sm rounded-stevens-sm hover:bg-stevens-gray-100 transition-colors duration-stevens-normal">
                      <Check className="w-4 h-4 text-stevens-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-stevens-bold text-stevens-sm text-stevens-gray-900">
                          {course.code}
                        </p>
                        <p className="text-stevens-xs text-stevens-gray-600">
                          {course.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
    </CardContent>
  </Card>
);
      })}
    </div>
  );
};

// What You'll Learn Carousel Component
const WhatYoullLearnCarousel = ({ modules }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % modules.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + modules.length) % modules.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-stevens-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {modules.map((module, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-stevens-white rounded-stevens-lg shadow-stevens-xl border border-stevens-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="bg-stevens-gray-800 text-stevens-white p-stevens-lg">
                  <h3 className="font-stevens-bold text-stevens-lg uppercase tracking-wide">
                    {module.title}
                  </h3>
                </div>
                
                {/* Card Content */}
                <div className="p-stevens-lg">
                  {module.description && (
                    <div 
                      className="text-stevens-gray-700 mb-stevens-lg leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: module.description }}
                    />
                  )}
                  
                  <div className="mb-stevens-md">
                    <p className="font-stevens-bold text-stevens-gray-900 mb-stevens-sm">
                      You'll learn to:
                    </p>
                    <ul className="space-y-stevens-sm">
                      {module.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-start gap-stevens-sm">
                          <div className="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
                          <span className="text-stevens-gray-700 text-stevens-sm leading-relaxed">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-stevens-white shadow-stevens-lg rounded-full p-stevens-sm hover:bg-stevens-gray-50 transition-colors duration-stevens-normal disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-stevens-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-stevens-white shadow-stevens-lg rounded-full p-stevens-sm hover:bg-stevens-gray-50 transition-colors duration-stevens-normal disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-stevens-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-stevens-lg space-x-stevens-sm">
        {modules.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-stevens-normal ${
              index === currentIndex 
                ? 'bg-stevens-primary scale-125' 
                : 'bg-stevens-gray-300 hover:bg-stevens-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProgramPageTemplate({ programData, useApplicationModal = false }) {
  const { code, hero, quickFacts, overview, videoSection, rankings, career, curriculum, whyStevens, studentSpotlight, faculty, admissions, keyDates, tuition, events, faqs, accreditation, whatYoullLearn, commonJobTitles, topCompanies } = programData;
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState('overview');
  
  // Handle collapsible course toggles (for MBA-style curriculum)
  useEffect(() => {
    const handleCourseToggle = (e) => {
      const button = e.currentTarget;
      const targetId = button.getAttribute('data-target');
      if (targetId) {
        const content = document.getElementById(targetId);
        const arrow = button.querySelector('.course-arrow');
        if (content && arrow) {
          const isHidden = content.classList.contains('hidden');
          if (isHidden) {
            content.classList.remove('hidden');
            arrow.textContent = '▲';
          } else {
            content.classList.add('hidden');
            arrow.textContent = '▼';
          }
        }
      }
    };

    const attachEventListeners = () => {
      const courseButtons = document.querySelectorAll('.course-toggle');
      courseButtons.forEach(button => {
        button.removeEventListener('click', handleCourseToggle);
        button.addEventListener('click', handleCourseToggle);
      });
    };

    attachEventListeners();

    const observer = new MutationObserver(() => {
      setTimeout(attachEventListeners, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      const courseButtons = document.querySelectorAll('.course-toggle');
      courseButtons.forEach(button => {
        button.removeEventListener('click', handleCourseToggle);
      });
    };
  }, []);

  const navItems = useMemo(() => {
    const items = [
      { id: 'overview', label: 'Overview' },
      { id: 'video', label: 'Video' },
      { id: 'rankings', label: 'Rankings' },
      { id: 'career', label: 'Career Outlook' },
      { id: 'what-youll-learn', label: 'What You\'ll Learn' },
      { id: 'common-job-titles', label: 'Common Job Titles' },
      { id: 'top-companies', label: 'Top Companies' },
      { id: 'curriculum', label: 'Curriculum' },
      { id: 'student-spotlight', label: 'Student Spotlight' },
      { id: 'faculty', label: 'Faculty' },
      { id: 'deadlines', label: 'Deadlines' },
      { id: 'admissions', label: 'Admissions' },
      { id: 'tuition', label: 'Tuition' },
      { id: 'events', label: 'Events' },
      { id: 'faqs', label: 'FAQs' },
      { id: 'accreditation', label: 'Accreditation' }
    ];
    return items.filter(item => {
      switch(item.id) {
        case 'overview': return overview && (overview.description || (overview.keySkills && overview.keySkills.length > 0) || (overview.concentrations && overview.concentrations.length > 0));
        case 'video': return videoSection && videoSection.videoSrc;
        case 'rankings': return rankings && rankings.length > 0;
        case 'career': return career && (career.description || career.jobTitlesTable || career.topCompanies);
        case 'what-youll-learn': return whatYoullLearn && (whatYoullLearn.description || (whatYoullLearn.modules && whatYoullLearn.modules.length > 0));
        case 'common-job-titles': return commonJobTitles && (commonJobTitles.jobs && commonJobTitles.jobs.length > 0);
        case 'top-companies': return topCompanies && (topCompanies.companies && topCompanies.companies.length > 0);
        case 'curriculum': return curriculum && (curriculum.description || curriculum.courseTabs || curriculum.completeCourseCatalog);
        case 'student-spotlight': return studentSpotlight && (studentSpotlight.quote || studentSpotlight.author);
        case 'faculty': return faculty && (faculty.description || (faculty.members && faculty.members.length > 0));
        case 'deadlines': return keyDates && (keyDates.headers && keyDates.rows && keyDates.rows.length > 0);
        case 'admissions': return admissions && (admissions.options && admissions.options.length > 0);
        case 'tuition': return tuition && (tuition.cards || tuition.description || (tuition.grants && tuition.grants.length > 0));
        case 'events': return events && (events.items && events.items.length > 0);
        case 'faqs': return faqs && faqs.length > 0;
        case 'accreditation': return accreditation && (typeof accreditation === 'string' ? accreditation.trim() : (accreditation.description || accreditation.text));
        default: return true;
      }
    });
  }, [overview, rankings, career, whatYoullLearn, commonJobTitles, topCompanies, curriculum, studentSpotlight, faculty, keyDates, admissions, tuition, events, faqs, accreditation]);

  useEffect(() => {
    const currentRefs = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );  

    navItems.forEach(item => {
      const el = currentRefs[item.id];
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach(item => {
        const el = currentRefs[item.id];
        if (el) observer.unobserve(el);
      });
    };
  }, [navItems]);

  if (!programData) return <div>Loading program data...</div>;

  return (
    <div className="bg-stevens-gray-50 font-stevens-body">
      <PageHero {...hero} useApplicationModal={useApplicationModal}/>

      {navItems.length > 0 && (
        <div className="sticky top-[63px] bg-stevens-white/90 backdrop-blur-sm z-[9990] shadow-stevens-md">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <nav className="relative flex justify-start items-center -mb-px space-x-stevens-xs sm:space-x-stevens-sm md:space-x-stevens-md overflow-x-auto scrollbar-hide group">
              {/* Left scroll indicator */}
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-stevens-white/90 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal"></div>
              
              {/* Right scroll indicator */}
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-stevens-white/90 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal"></div>
              
              <div className="flex space-x-stevens-xs sm:space-x-stevens-sm md:space-x-stevens-md">
              {navItems.map(item => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                    className={`py-stevens-md px-stevens-xs sm:px-stevens-sm md:px-stevens-md text-stevens-xs sm:text-stevens-sm md:text-stevens-base font-stevens-medium whitespace-nowrap border-b-2 transition-colors duration-stevens-normal flex-shrink-0 ${activeSection === item.id ? 'border-stevens-primary text-stevens-primary' : 'border-transparent text-stevens-gray-600 hover:text-stevens-primary'}`}
                >
                  {item.label}
                </a>
              ))}
              </div>
              
            </nav>
            
          </div>
        </div>
      )}

      <main>
        <Section id="overview" bgClassName="bg-stevens-white" refProp={el => sectionRefs.current.overview = el}>
          <div className="max-w-stevens-content-max mx-auto grid lg:grid-cols-5 gap-stevens-gap-lg">
            <div className="lg:col-span-3">
              {overview.title && <h2 className="font-stevens-display text-stevens-3xl font-stevens-bold mb-stevens-md text-stevens-gray-900">{overview.title}</h2>}
              {overview.description && <div className="prose max-w-none text-stevens-gray-900 leading-relaxed" dangerouslySetInnerHTML={{ __html: overview.description }} />}
              {overview.keySkills && overview.keySkills.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-2">Key Skills Developed:</h3>
                  <div className="flex flex-wrap gap-2">
                    {overview.keySkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                  </div>
                </div>
              )}
              {overview.concentrations && overview.concentrations.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-2">Concentration Options:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-stevens-gray-900 text-sm">
                    {overview.concentrations.map(conc => <li key={conc}>{conc}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <Card className="shadow-stevens-xl rounded-stevens-md overflow-hidden bg-stevens-white">
                <CardHeader className="bg-stevens-primary p-stevens-card">
                  <CardTitle className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-white">
                    QUICK FACTS
                  </CardTitle>
                  
                </CardHeader>
                <CardContent className="p-stevens-card pt-stevens-card bg-stevens-gray-50">
                  {quickFacts.termStartDate && (
                    <div className="mb-stevens-lg">
                      <p className="font-stevens-bold text-stevens-base uppercase tracking-wider text-stevens-gray-900 mb-stevens-xs">Term Start Date</p>
                      <p className="font-stevens-bold text-stevens-lg text-stevens-primary">{quickFacts.termStartDate}</p>
                    </div>
                  )}
                  {quickFacts.details && (
                    <div className="border-t border-stevens-gray-200 pt-stevens-md">
                      <h4 className="font-stevens-bold text-stevens-lg text-stevens-gray-900 mb-stevens-sm uppercase">Overview</h4>
                      <div className="prose prose-sm text-stevens-gray-900 space-y-stevens-sm" dangerouslySetInnerHTML={{ __html: quickFacts.details }} />
                    </div>
                  )}
                </CardContent>
              </Card>
              {quickFacts.atAGlance && quickFacts.atAGlance.length > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {quickFacts.atAGlance.map((fact, index) => (
                      <div key={index} className="text-center bg-stevens-gray-100 p-3 rounded-stevens-md">
                          <p className="font-display text-lg md:text-xl font-bold text-stevens-primary leading-tight">{fact.value}</p>
                          <p className="text-[10px] md:text-xs uppercase tracking-wider text-stevens-gray-600">{fact.label}</p>
                      </div>
                  ))}
                </div>
              )}
              
            </div>
          </div>
        </Section>

        {videoSection && (
          <Section id="video" title={videoSection.title} bgClassName="bg-stevens-gray-100" refProp={el => sectionRefs.current.video = el}>
            <div className="max-w-7xl mx-auto">
              <div className="bg-stevens-white rounded-stevens-md overflow-hidden shadow-stevens-lg border border-stevens-gray-100">
                {/* Video Player Component */}
                <VideoPlayer
                  src={videoSection.videoSrc}
                  poster={videoSection.posterSrc}
                  title={videoSection.title}
                  showControls={videoSection.showControls}
                  muted={videoSection.muted}
                />

                
              </div>
            </div>
          </Section>
        )}
        
        {rankings && rankings.length > 0 && (
          <Section id="rankings" title="By the Numbers" bgClassName="bg-stevens-gray-100" container={false} el="div" refProp={el => sectionRefs.current.rankings = el}>
            <div className="max-w-7xl mx-auto bg-stevens-gray-200 py-stevens-2xl">
              <div className=" px-stevens-lg">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
                  {rankings.map((rank, i) => <RankingCard key={i} {...rank} />)}
                </div>
                {programData.rankings_footnotes && programData.rankings_footnotes.length > 0 && (
                  <div className="mt-stevens-xl max-w-4xl mx-auto text-stevens-sm text-stevens-gray-600 space-y-stevens-xs">
                    {programData.rankings_footnotes.map((footnote, i) => (
                      <p key={i}>
                        <sup>{footnote.note}</sup> {footnote.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Section>
        )}

        {career && (
          <Section id="career" title="Career Outlook" bgClassName="bg-stevens-white" refProp={el => sectionRefs.current.career = el}>
            {career.description && <div className=" prose max-w-none text-stevens-gray-900 leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: career.description }} />}
            
            
          </Section>
        )}
        
        {whatYoullLearn && (
          <Section id="what-youll-learn" title={whatYoullLearn.title} bgClassName="bg-stevens-gray-100" refProp={el => sectionRefs.current['what-youll-learn'] = el}>
            {whatYoullLearn.description && <div className="prose max-w-none text-stevens-gray-900 leading-relaxed mb-10 text-center" dangerouslySetInnerHTML={{ __html: whatYoullLearn.description }} />}
            {whatYoullLearn.modules && whatYoullLearn.modules.length > 0 && (
              whatYoullLearn.variant === 'skillCards' 
                ? <SkillCardsGrid modules={whatYoullLearn.modules} />
                : <WhatYoullLearnCarousel modules={whatYoullLearn.modules} />
            )}
          </Section>
        )}

        {commonJobTitles && (
          <Section id="common-job-titles" title={commonJobTitles.title} bgClassName="bg-stevens-white" refProp={el => sectionRefs.current['common-job-titles'] = el}>
            
            {career.jobTitles && career.jobTitles.length > 0 && (
              <>
                <div className="text-center mb-stevens-xl">
                  <p className="text-stevens-lg text-stevens-gray-600 max-w-3xl mx-auto">
                    Earning an online {programData.code.toUpperCase()} prepares you for career paths in management-level roles across industries. Explore <strong>top {programData.code.toUpperCase()} jobs</strong> for recent graduates.
                  </p>
                </div>
                
                <div className="mb-stevens-lg">
                  <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg text-center">
                    Prospective Occupations for Online {programData.code.toUpperCase()} Graduates
                  </h3>
                  
                  <div className="bg-stevens-white rounded-stevens-xl shadow-stevens-2xl overflow-hidden border border-stevens-gray-200">
                    <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-stevens-gray-50 to-stevens-gray-100 border-b-2 border-stevens-gray-200">
                          <TableHead className="font-stevens-bold text-stevens-gray-900 uppercase tracking-wider text-stevens-sm py-stevens-md px-stevens-xl text-left">
                            Job Title
                          </TableHead>
                          {career.jobTitles[0]?.employed && (
                            <TableHead className="font-stevens-bold text-stevens-gray-900 uppercase tracking-wider text-stevens-sm py-stevens-md px-stevens-xl text-center">
                              Employed
                            </TableHead>
                          )}
                          <TableHead className="font-stevens-bold text-stevens-gray-900 uppercase tracking-wider text-stevens-sm py-stevens-md px-stevens-xl text-center">
                            Median or Average Annual Earnings
                          </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {career.jobTitles.map((job, index) => {
                          // Set different maximum values based on program type
                          const maxSalary = programData.code.toLowerCase() === 'mem' ? 167740 : (programData.code.toLowerCase() === 'mba' ? 206420 : 171200);
                          
                          return (
                            <TableRow 
                              key={job.title} 
                              className={`
                                hover:bg-gradient-to-r hover:from-stevens-blue/5 hover:to-stevens-primary/5 
                                transition-all duration-stevens-normal border-b border-stevens-gray-100
                                ${index % 2 === 0 ? 'bg-stevens-white' : 'bg-stevens-gray-50/30'}
                              `}
                            >
                              <TableCell className="font-stevens-bold text-stevens-gray-900 text-stevens-base py-stevens-md px-stevens-xl">
                                <div className="flex items-center gap-stevens-sm">
                                  <div className="w-2 h-2 bg-stevens-primary rounded-full flex-shrink-0"></div>
                                  {job.title}
                                </div>
                              </TableCell>
                              {job.employed && (
                                <TableCell className="text-stevens-gray-700 text-stevens-base py-stevens-md px-stevens-xl text-center font-stevens-semibold">
                                  <span className="bg-stevens-gray-100 px-stevens-sm py-stevens-xs rounded-stevens-md">
                                    {job.employed}
                                  </span>
                                </TableCell>
                              )}
                              <TableCell className="text-stevens-gray-700 py-stevens-md px-stevens-xl">
                                <div className="flex flex-col gap-stevens-xs">
                                  <span className="font-stevens-bold text-stevens-lg text-stevens-primary text-center">
                                    {job.salary}
                                  </span>
                                  <div className="w-full bg-stevens-gray-200 rounded-full h-3 shadow-inner">
                                    <div 
                                      className="bg-stevens-primary h-3 rounded-full transition-all duration-stevens-normal shadow-sm"
                                      style={{ 
                                        width: `${Math.min(100, (parseFloat(job.salary.replace(/[$,]/g, '')) / maxSalary) * 100)}%` 
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </TableCell>
                        </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                  </div>
                  
                  <div className="text-center mt-stevens-lg">
                    <p className="text-stevens-sm text-stevens-gray-600 italic">Source: {career.source}</p>
                  </div>
                </div>
              </>
            )}
          </Section>
        )}

        {topCompanies && (
          <Section id="top-companies" title={topCompanies.title} bgClassName="bg-stevens-gray-100" refProp={el => sectionRefs.current['top-companies'] = el}>
            
            {career.topCompanies && career.topCompanies.length > 0 && (
              <div className="mt-stevens-xl">
                <div className="bg-gradient-to-br from-stevens-primary/5 via-stevens-gray-50 to-stevens-secondary/5 rounded-stevens-md p-stevens-lg stevens-md:p-stevens-xl border border-stevens-gray-200 shadow-stevens-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-stevens-sm mb-stevens-sm">
                      <div className="h-px bg-stevens-primary/30 flex-1"></div>
                      <div className="w-3 h-3 bg-stevens-primary rounded-full"></div>
                      <div className="h-px bg-stevens-primary/30 flex-1"></div>
                    </div>
                    <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-gray-900 mb-stevens-xs">
                      {topCompanies.title ? topCompanies.title : 'Stevens Alumni Drive Innovation at Top Companies'}
                    </h3>
                    <p className="text-stevens-gray-600 mb-stevens-lg max-w-2xl mx-auto text-stevens-sm stevens-md:text-stevens-base">
                      {topCompanies.description ? topCompanies.description : 'Our graduates join leading organizations across technology, finance, healthcare, and consulting'}
                    </p>
                    <div className="grid grid-cols-2 stevens-sm:grid-cols-3 stevens-md:grid-cols-4 stevens-lg:grid-cols-6 gap-stevens-sm stevens-md:gap-stevens-md items-center">
                      {career.topCompanies.map((company, index) =>
                      <div key={company} className="group bg-stevens-white rounded-stevens-md p-stevens-sm stevens-md:p-stevens-md shadow-stevens-sm hover:shadow-stevens-lg hover:-translate-y-1 transition-all duration-stevens-normal border border-stevens-gray-100 hover:border-stevens-primary/20">
                          <p className="font-stevens-semibold text-stevens-gray-900 text-center text-stevens-xs stevens-sm:text-stevens-sm stevens-md:text-stevens-base group-hover:text-stevens-primary transition-colors duration-stevens-normal">{company}</p>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>
              </div>
            )}
          </Section>
        )}

        {whyStevens && (
          <Section id="why-stevens" bgClassName="bg-stevens-white" paddingClassName="py-stevens-section-sm lg:py-stevens-section" refProp={el => sectionRefs.current['why-stevens'] = el}>
            {whyStevens.variant === 'splitWithVideo' ? (
              <div className="max-w-stevens-content-max mx-auto">
                <div className="grid lg:grid-cols-2 gap-stevens-2xl items-center">
                  {/* Left Column - Text Content */}
                  <div className="bg-stevens-primary text-stevens-white p-stevens-2xl rounded-stevens-lg">
                    <h2 className="font-stevens-display text-stevens-4xl font-stevens-bold mb-stevens-lg">
                      {whyStevens.title}
                    </h2>
                    <div className="prose prose-lg prose-invert max-w-none [&_p]:text-stevens-lg [&_p]:leading-relaxed [&_p]:mb-stevens-lg" dangerouslySetInnerHTML={{ __html: whyStevens.description }} />
                  </div>
                  
                  {/* Right Column - Video Player */}
                  <div className="relative">
                    {whyStevens.video && (
                      <>
                        <VideoPlayer
                          src={whyStevens.video.src}
                          poster={whyStevens.video.poster}
                          title={whyStevens.video.title || ""}
                          showControls={true}
                          muted={true}
                          className="rounded-stevens-lg shadow-stevens-2xl"
                        />
                        {whyStevens.video.caption && (
                          <div className="mt-stevens-md text-center">
                            <p className="text-stevens-sm text-stevens-gray-600 italic">
                              {whyStevens.video.caption}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-stevens-primary text-stevens-white py-16 rounded-stevens-lg">
                <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
                  <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-lg text-stevens-white">{whyStevens.title}</h2>
                  <div className="prose prose-invert max-w-none mx-auto text-stevens-base stevens-md:text-stevens-lg [&_p]:text-stevens-white [&_li]:text-stevens-white" dangerouslySetInnerHTML={{ __html: whyStevens.description }}/>
                </div>
              </div>
            )}
          </Section>
        )}
        
        {curriculum && (
          <Section id="curriculum" bgClassName="bg-stevens-white" refProp={el => sectionRefs.current.curriculum = el}>
            <div className="max-w-stevens-content-max mx-auto">
              {/* Section Title */}
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg text-left uppercase tracking-tight">
                {curriculum.title ? curriculum.title : `Online ${programData.code.toUpperCase()} Program Course Structure`}
              </h2>
              
              {/* Description */}
              {curriculum.description && (
                <div className="mb-stevens-xl space-y-stevens-md text-stevens-gray-900 leading-relaxed text-stevens-base stevens-md:text-stevens-lg">
                  {curriculum.description.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}
            
            {curriculum.courseTabs && (
              <Tabs defaultValue={Object.keys(curriculum.courseTabs)[0]} className="w-full">
                {/* Tabs Navigation */}
                <TabsList className="w-full justify-start bg-transparent border-b-2 border-stevens-gray-200 rounded-none h-auto p-0 gap-0">
                  {Object.keys(curriculum.courseTabs).map((tabKey, index) => (
                    <TabsTrigger 
                      key={tabKey} 
                      value={tabKey}
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-stevens-primary rounded-none px-stevens-lg py-stevens-md font-stevens-bold text-stevens-base stevens-md:text-stevens-lg text-stevens-gray-700 data-[state=active]:text-stevens-gray-900 hover:text-stevens-primary transition-colors duration-stevens-normal border-b-4 border-transparent"
                    >
                      {curriculum.courseTabs[tabKey].title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {/* Tab Content */}
                {Object.keys(curriculum.courseTabs).map(tabKey => (
                  <TabsContent key={tabKey} value={tabKey} className="mt-stevens-xl">
                    <div className="prose prose-stevens max-w-none [&_h4]:font-stevens-display [&_h4]:text-stevens-2xl [&_h4]:stevens-md:text-stevens-3xl [&_h4]:font-stevens-bold [&_h4]:text-stevens-gray-900 [&_h4]:mb-stevens-lg [&_h4]:uppercase [&_h4]:tracking-tight [&_h5]:font-stevens-bold [&_h5]:text-stevens-xl [&_h5]:stevens-md:text-stevens-2xl [&_h5]:text-stevens-gray-900 [&_h5]:mb-stevens-lg [&_h5]:mt-stevens-2xl [&_p]:text-stevens-gray-700 [&_p]:leading-relaxed [&_p]:mb-stevens-lg" dangerouslySetInnerHTML={{ __html: curriculum.courseTabs[tabKey].content }}/>
                  </TabsContent>
                ))}
              </Tabs>
            )}
            </div>
            {curriculum.completeCourseCatalog && (
              <div className="mt-12">
                <h3 className="font-display text-2xl font-bold text-center mb-6">Complete Course Catalog</h3>
                <Card>
                  <CardContent className="p-6 overflow-x-auto">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: curriculum.completeCourseCatalog }} />
                  </CardContent>
                </Card>
              </div>
            )}
          </Section>
        )}
        
        {studentSpotlight && (
          <Section id="student-spotlight" bgClassName="bg-stevens-gray-100" refProp={el => sectionRefs.current['student-spotlight'] = el}>
            <div className="mx-auto text-center">
              <User className="w-16 h-16 mx-auto mb-stevens-md text-stevens-primary" />
              <h2 className="font-stevens-display text-stevens-3xl font-stevens-bold mb-stevens-md">Student Testimonial Spotlight</h2>
              <blockquote className="text-stevens-2xl leading-snug italic text-stevens-gray-900 mb-stevens-md">
                  "{studentSpotlight.quote}"
                </blockquote>
              <cite className="not-italic font-stevens-semibold text-stevens-gray-600">— {studentSpotlight.name}</cite>
            </div>
          </Section>
        )}
        
        {faculty && (
          <Section id="faculty" title={faculty.title || "Meet the Faculty"} refProp={el => sectionRefs.current.faculty = el} container={false} paddingClassName="py-stevens-section-sm lg:py-stevens-section">
            {faculty.description && <p className="text-center text-stevens-xl text-stevens-gray-600 max-w-3xl mx-auto mb-stevens-xl px-stevens-md lg:px-stevens-lg">{faculty.description}</p>}
            <div className="relative overflow-visible w-full max-w-[77rem] mx-auto">
              <div className="flex overflow-x-auto space-x-stevens-sm stevens-md:space-x-stevens-lg pb-stevens-lg pt-stevens-sm snap-x snap-mandatory scrollbar-thin scrollbar-thumb-stevens-primary scrollbar-track-stevens-primary/10 px-stevens-md">
                {faculty.members.map((member, i) => <FacultyCard key={i} member={member} />)}
              </div>
            </div>
          </Section>
        )}

        {admissions && admissions.variant === 'combinedWithTuition' && tuition && keyDates ? (
          <Section bgClassName="bg-stevens-gray-100" refProp={el => sectionRefs.current.admissions = el}>
            <div className="grid lg:grid-cols-5 gap-stevens-2xl items-start">
              {/* Left Column - Admissions */}
              <div className="lg:col-span-3">
                <h2 className="font-stevens-display text-stevens-4xl font-stevens-bold text-center mb-stevens-lg">Admissions</h2>
                {admissions.requirements && (
                  <Card className="shadow-stevens-lg rounded-stevens-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-stevens-sm font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900">
                        <FileText /> Application Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose text-stevens-gray-900" dangerouslySetInnerHTML={{ __html: admissions.requirements }} />
                  </Card>
                )}
              </div>
              
              {/* Right Column - Key Dates & Tuition */}
              <div className="lg:col-span-2">
                {keyDates && (
                  <>
                    <h2 className="font-stevens-display text-stevens-4xl font-stevens-bold text-center mb-stevens-lg">Key Dates & Deadlines</h2>
                    <Card className="rounded-stevens-md mb-stevens-xl">
                      <CardHeader>
                        <CardTitle className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900">
                          {keyDates.term || "Spring 2026"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            {keyDates.rows.map((row) => (
                              <TableRow key={row.event}>
                                <TableCell className="font-stevens-bold text-stevens-gray-900 group-hover:text-stevens-primary transition-colors duration-stevens-normal">
                                  {row.event}
                                </TableCell>
                                <TableCell className="text-stevens-gray-900">{row.date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {tuition && (
                  <>
                    <h2 className="font-stevens-display text-stevens-4xl font-stevens-bold text-center mb-stevens-lg">Tuition</h2>
                    {tuition.cards && tuition.cards.length > 0 && (
                      <div className="grid grid-cols-1 stevens-sm:grid-cols-3 gap-stevens-md text-center">
                        {tuition.cards.map((card) => (
                          <Card key={card.label} className="p-stevens-sm stevens-md:p-stevens-md rounded-stevens-md">
                            <p className="font-stevens-display text-stevens-lg stevens-sm:text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-primary break-words">
                              {card.value}
                            </p>
                            <p className="text-stevens-xs stevens-sm:text-stevens-sm text-stevens-gray-600 mt-stevens-xs">
                              {card.label}
                            </p>
                          </Card>
                        ))}
                      </div>
                    )}
                    {tuition.description && (
                      <div className="prose text-center text-stevens-xs max-w-none mx-auto mt-stevens-md text-stevens-gray-900" dangerouslySetInnerHTML={{ __html: tuition.description }} />
                    )}
                  </>
                )}
              </div>
            </div>
          </Section>
        ) : admissions ? (
          <Section id="admissions" title="Choose Your Application Option" bgClassName="bg-stevens-white" refProp={el => sectionRefs.current.admissions = el}>
            <div className={`flex flex-wrap justify-center ${admissions.options && admissions.options.length === 1 ? 'max-w-2xl mx-auto' : ''} gap-8`}>
              {admissions.options && admissions.options.map((option, i) => (
                <Card key={i} className={`w-full md:w-[48%] shadow-lg ${option.featured ? 'border-2 border-stevens-primary' : ''}`}>
                  <CardHeader>
                    <CardTitle>{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose" dangerouslySetInnerHTML={{ __html: option.description }}/>
                    {option.buttonText && !option.buttonGrayOut && (
                      <a href={option.url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <div className="flex justify-center items-center w-full btn-secondary mt-2">
                          {option.buttonText} <ArrowRight className="w-4 h-4 ml-2"/>
                        </div>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
              { admissions.alertMessage && (
                <div className='w-full max-w-[75ch] mx-auto bg-stevens-maroon p-4 md:p-8 text-white border-2 border-stevens-maroon-dark rounded-md'>
                  <div className='w-full '>
                    <h3 className='text-xl md:text-2xl font-bold'>{admissions.alertMessage.title}</h3>
                    <div className='py-4' dangerouslySetInnerHTML={{__html:admissions.alertMessage.description}}/>
                    {admissions.alertMessage.url && (
                      <a href={admissions.alertMessage.url} target="_blank" rel="noopener noreferrer">
                      <div variant="outline" className="btn-outline-white text-white inline-block">{admissions.alertMessage.buttonText}</div>
                    </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            {admissions.consultation && (
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold mb-2">{admissions.consultation.title}</h3>
                {admissions.consultation.url && (
                  <a href={admissions.consultation.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="btn-outline-maroon">{admissions.consultation.buttonText}</Button>
                  </a>
                )}
              </div>
            )}
          </Section>
        ) : null}

        {keyDates && !(admissions?.variant === 'combinedWithTuition') && (
          <Section id="deadlines" title="Key Dates & Deadlines" bgClassName="bg-stevens-gray-100" el="div" refProp={el => sectionRefs.current['deadlines'] = el}>
            <div className="text-center mb-stevens-xl">
              <p className="text-stevens-xl text-stevens-gray-900 max-w-3xl mx-auto">
                Plan your application for the upcoming Spring 2026 term.
              </p>
            </div>
            
            <Card className="shadow-xl border-0 overflow-hidden max-w-7xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      {keyDates.headers.map((header) => (
                        <th key={header} className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {keyDates.rows.map((row, i) => (
                      <tr key={i} className="bg-white">
                        <td className="p-4 font-bold text-base whitespace-nowrap align-top border border-gray-300">
                          {row.event}
                        </td>
                        <td className="p-4 align-top border border-gray-300">
                          <div className="font-bold text-gray-900">{row.date}</div>
                          {row.details && (
                            <div className="text-stevens-gray-900 mt-1 text-stevens-sm">{row.details}</div>
                          )}
                        </td>
                        {keyDates.headers.length > 2 && (
                          <>
                            <td className="p-4 align-top border border-gray-300">
                              <div className="font-bold text-gray-900">{row.priorityDate || ''}</div>
                              {row.priorityDetails && (
                                <div className="text-stevens-gray-900 mt-1 text-stevens-sm">{row.priorityDetails}</div>
                              )}
                            </td>
                            <td className="p-4 align-top border border-gray-300">
                              <div className="font-bold text-gray-900">{row.finalDate || ''}</div>
                            </td>
                            <td className="p-4 align-top border border-gray-300">
                              <div className="font-bold text-gray-900">{row.startDate || ''}</div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            {keyDates.footnote && <p className="text-center text-sm text-stevens-gray-600 mt-4 italic">{keyDates.footnote}</p>}
          </Section>
        )}
        
        {tuition && !(admissions?.variant === 'combinedWithTuition') && (
          <Section id="tuition" title="Tuition & Financial Aid" bgClassName="bg-stevens-white" refProp={el => sectionRefs.current.tuition = el}>
            {tuition.cards && tuition.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                {tuition.cards.map((card, i) => (
                  <Card key={i} className="shadow-md">
                    <CardHeader>
                      <CardTitle className="font-display text-4xl text-stevens-primary">{card.value}</CardTitle>
                      <p className="font-semibold text-stevens-gray-900">{card.label}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
            {tuition.description && <div className="text-center prose max-w-3xl mx-auto mt-8" dangerouslySetInnerHTML={{ __html: tuition.description }}/>}
            {tuition.grants && tuition.grants.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-2xl font-bold text-center mb-6">Grants & Scholarships</h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {tuition.grants.map((grant,i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>{grant.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{grant.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Section>
        )}

        {events && (
          <Section id="events" title={events.title || "On-Demand Events"} bgClassName="bg-stevens-gray-50" refProp={el => sectionRefs.current.events = el}>
            {events.description && <p className="text-center text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto mb-stevens-2xl leading-relaxed">{events.description}</p>}
            {events.items && events.items.length > 0 ? (
              <div className="grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg">
                {events.items.map((item, i) => (
                  <Card key={i} className="h-full border-stevens-gray-100">
                    <CardContent className="p-stevens-lg flex flex-col h-full pt-stevens-lg">
                      <h5 className="font-stevens-semibold text-stevens-gray-900 uppercase font-bold mb-stevens-xs hover:text-stevens-primary transition-colors duration-stevens-normal">
                        {item.title}
                      </h5>
                      <div className="text-stevens-sm text-stevens-gray-700 mb-stevens-md">
                        {item.status || item.date}
                      </div>
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
            ) : <p className="text-center text-stevens-gray-600">{events.fallbackText || "No upcoming events at this time."}</p>}
          </Section>
        )}

        {faqs && faqs.length > 0 && (
          <Section id="faqs" title="Frequently Asked Questions" bgClassName="bg-stevens-white" refProp={el => sectionRefs.current.faqs = el}>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>
        )}
        
        {accreditation && (
          <Section id="accreditation" container={false} el="div" paddingClassName="pt-stevens-section-sm lg:pt-stevens-section" refProp={el => sectionRefs.current['accreditation'] = el}>
            <div className="relative bg-stevens-gray-900 text-stevens-white overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src="/assets/images/accreditation.avif" 
                  alt="" 
                  className="w-full h-full object-cover opacity-30"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stevens-gray-900/90 to-stevens-gray-900/70"></div>
              </div>
              
              {/* Content */}
              <div className="relative max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center pt-stevens-section-sm lg:pt-stevens-section pb-[60px] ">
                <h2 className="font-stevens-display uppercase text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-lg text-stevens-white">
                  Accreditation Statement
                </h2>
                <div 
                  className="text-stevens-lg text-stevens-white/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: typeof accreditation === 'string' ? accreditation : accreditation.description || accreditation.text 
                  }}
                />
              </div>
            </div>
          </Section>
        )}
        {/* Request Information */}
        {/* disabled extra request information for now */}
        {/* <Section id="request-info" container={false} el="div" >
          <div className="bg-stevens-primary py-20">
            <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl grid stevens-md:grid-cols-2 gap-stevens-xl items-center">
                <div className="text-stevens-white">
                    <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md text-stevens-white">Take the Next Step</h2>
                    <p className="text-stevens-lg text-stevens-white mb-stevens-lg">Ready to advance your career? Fill out the form to get more information about the {programData.code.toUpperCase()} program, or start your application today.</p>
                    <div className="flex flex-col stevens-sm:flex-row gap-stevens-md">
                        <a href="https://gradadmissions.stevens.edu/apply/?pk=GRNP" target="_blank" rel="noopener noreferrer">
                        <button className= "btn-stevens-secondary bg-stevens-white text-stevens-primary">Apply Now</button>
                        </a>
                    </div>
                </div>
                <LeadCaptureForm programOfInterest={code} sourcePage={`${code}_program_page`} />
            </div>
          </div>
        </Section> */}
      </main>
    </div>
  );
}