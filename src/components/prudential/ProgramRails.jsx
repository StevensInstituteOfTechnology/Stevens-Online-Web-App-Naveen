import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgramCard from './ProgramCard';
import { PRUDENTIAL_DATA, getRecommendedPrograms } from '@/data/prudential-pathways';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { trackRailView } from '@/utils/prudentialAnalytics';

const ProgramRails = ({ selectedRole, selectedLevel, onAddToPath, pathItems }) => {
  const [activeRail, setActiveRail] = useState('recommended');
  const shouldReduceMotion = useReducedMotion();

  // Get recommended programs based on role
  const recommendedPrograms = selectedRole 
    ? getRecommendedPrograms(selectedRole.id, selectedLevel)
    : PRUDENTIAL_DATA.allPrograms.filter(p => p.recommended).slice(0, 6);

  // Build rails with recommended at top
  const rails = [
    {
      id: 'recommended',
      title: 'Recommended for Prudential',
      description: selectedRole 
        ? `Curated for ${selectedRole.label} • ${selectedLevel || 'All Levels'}`
        : 'Top programs aligned with your strategic priorities',
      programs: recommendedPrograms
    },
    ...PRUDENTIAL_DATA.rails.filter(r => r.id !== 'recommended')
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold mb-2 text-slate-50">Explore Learning Pathways</h2>
        <p className="text-xl text-slate-300">
          {selectedRole 
            ? `Personalized for ${selectedRole.label}` 
            : 'Browse by domain or role'}
        </p>
      </motion.div>

      <div className="space-y-12">
        {rails.map((rail, index) => (
          <RailSection 
            key={rail.id}
            rail={rail}
            index={index}
            onAddToPath={onAddToPath}
            pathItems={pathItems}
            isActive={activeRail === rail.id}
            onSetActive={() => setActiveRail(rail.id)}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </div>
  );
};

const RailSection = ({ rail, index, onAddToPath, pathItems, isActive, onSetActive, shouldReduceMotion }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    draggable: true,
    loop: false,
    skipSnaps: false,
    slidesToScroll: 2
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const containerRef = useRef(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    setAnnouncement(`Slide ${index + 1} of ${rail.programs.length}`);
  }, [emblaApi, rail.programs.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Intersection observer for lazy loading and view tracking
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasTrackedView.current) {
            trackRailView(rail.id);
            hasTrackedView.current = true;
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, rail.id]);

  if (!rail.programs || rail.programs.length === 0) return null;

  return (
    <motion.section
      ref={setRef}
      id={rail.id}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? { duration: 0.01 } : { delay: index * 0.1 }}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${rail.title} programs`}
    >
      {/* Live region for screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Rail Header with Maroon Accent */}
      <div className="mb-8">
        <h3 className="text-3xl font-extrabold mb-3 text-slate-50">{rail.title}</h3>
        {/* Thin Maroon Accent Line */}
        <div className="w-20 h-0.5 bg-[#A32638] rounded-full mb-3" />
        <p className="text-slate-200 text-lg font-medium">{rail.description}</p>
      </div>

      {/* Carousel Container - Netflix Style with Overflow */}
      <div 
        className="relative group w-full overflow-hidden"
        ref={containerRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-label={`${rail.title} carousel. Use arrow keys to navigate.`}
      >
        {/* Embla Viewport - Netflix Style with Expansion Space */}
        <div 
          id={`rail-${rail.id}`}
          className="overflow-hidden py-6 w-full relative z-0" 
          ref={emblaRef}
          role="list"
        >
          <div className="flex gap-4">
            {isVisible && rail.programs.map((program, idx) => (
              <div 
                key={program.id}
                className="flex-none w-[340px] min-h-[360px]"
                style={{ minWidth: '340px' }}
                role="listitem"
                aria-label={`Program ${idx + 1} of ${rail.programs.length}: ${program.title}`}
              >
                <ProgramCard 
                  program={program}
                  onAddToPath={onAddToPath}
                  isInPath={pathItems.some(p => p.id === program.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Navigation Arrow - Netflix Style Gradient */}
        {canScrollPrev && (
          <motion.button
            onClick={scrollPrev}
            className="absolute left-0 top-0 bottom-0 z-[100] w-16 flex items-center justify-center transition-all duration-300 focus:outline-none pointer-events-auto opacity-0 group-hover:opacity-100 cursor-pointer"
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)'
            }}
            whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            aria-label={`Previous ${rail.title} programs`}
            aria-controls={`rail-${rail.id}`}
          >
            <ChevronLeft className="w-10 h-10 text-white drop-shadow-lg" aria-hidden="true" />
          </motion.button>
        )}

        {/* Right Navigation Arrow - Netflix Style Gradient */}
        {canScrollNext && (
          <motion.button
            onClick={scrollNext}
            className="absolute right-0 top-0 bottom-0 z-[100] w-16 flex items-center justify-center transition-all duration-300 focus:outline-none pointer-events-auto opacity-0 group-hover:opacity-100 cursor-pointer"
            style={{
              background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)'
            }}
            whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            aria-label={`Next ${rail.title} programs`}
            aria-controls={`rail-${rail.id}`}
          >
            <ChevronRight className="w-10 h-10 text-white drop-shadow-lg" aria-hidden="true" />
          </motion.button>
        )}

      </div>
    </motion.section>
  );
};

export default ProgramRails;

