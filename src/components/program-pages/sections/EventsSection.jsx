import React, { forwardRef, useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Section } from '../primitives';

/**
 * EventsSection - On-Demand Events grid with collapsible content
 * 
 * Design: CPE Brand Guidelines - Card grid for event listings
 * Features:
 * - Optional description text
 * - Grid of event cards (1 col mobile, 2 col tablet, 3 col desktop)
 * - Each card shows title, status/date, duration, and watch link
 * - Collapsible when more than 3 events (shows first 3 initially)
 * - Fallback message when no events
 * 
 * Used in: Degree pages (typically not shown on certificate pages)
 * 
 * @param {Object} events - Events configuration
 * @param {string} events.title - Section title (default: "On-Demand Events")
 * @param {string} events.description - Optional description text
 * @param {Array} events.items - Array of event objects
 * @param {string} events.items[].title - Event title
 * @param {string} events.items[].status - Event status text
 * @param {string} events.items[].date - Event date (alternative to status)
 * @param {string} events.items[].length - Event duration
 * @param {string} events.items[].url - Watch URL
 * @param {string} events.fallbackText - Text shown when no events
 */
export const EventsSection = forwardRef(function EventsSection(
  { events },
  ref
) {
  // State for collapsible content
  const [isExpanded, setIsExpanded] = useState(false);

  if (!events) return null;

  const hasItems = events.items && events.items.length > 0;
  const hasMoreThanThree = hasItems && events.items.length > 3;
  
  // Show first 3 items when collapsed, all items when expanded
  const visibleItems = hasMoreThanThree && !isExpanded 
    ? events.items.slice(0, 3) 
    : events.items;

  return (
    <Section
      id="events"
      title={events.title || 'On-Demand Events'}
      bgClassName="bg-stevens-light-gray"
      ref={ref}
    >
      {events.description && (
        <p className="text-center text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto mb-stevens-2xl leading-relaxed">
          {events.description}
        </p>
      )}
      
      {hasItems ? (
        <>
          <div className={`grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg ${isExpanded ? 'animate-in fade-in slide-in-from-top-4 duration-300' : ''}`}>
            {visibleItems.map((item, i) => (
              <Card key={i} className="h-full border-stevens-light-gray">
                <CardContent className="p-stevens-lg flex flex-col h-full pt-stevens-lg">
                  <h5 className="font-stevens-semibold text-stevens-dark-gray uppercase font-bold mb-stevens-xs hover:text-stevens-red transition-colors duration-stevens-normal">
                    {item.title}
                  </h5>
                  <div className="text-stevens-sm text-stevens-dark-gray mb-stevens-md">
                    {item.status || item.date}
                  </div>
                  <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-dark-gray mb-stevens-lg">
                    <Clock className="w-4 h-4" /> {item.length}
                  </div>
                  <div className="mt-auto">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="default">Watch Now</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Toggle Button - only show when more than 3 items */}
          {hasMoreThanThree && (
            <div className="flex justify-center mt-stevens-xl">
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
        </>
      ) : (
        <p className="text-center text-stevens-dark-gray">
          {events.fallbackText || 'No upcoming events at this time.'}
        </p>
      )}
    </Section>
  );
});
