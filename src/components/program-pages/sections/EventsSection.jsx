import React, { forwardRef } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Section } from '../primitives';

/**
 * EventsSection - On-Demand Events grid
 * 
 * Design: CPE Brand Guidelines - Card grid for event listings
 * Features:
 * - Optional description text
 * - Grid of event cards (1 col mobile, 2 col tablet, 3 col desktop)
 * - Each card shows title, status/date, duration, and watch link
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
  if (!events) return null;

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
      {events.items && events.items.length > 0 ? (
        <div className="grid stevens-md:grid-cols-2 stevens-lg:grid-cols-3 gap-stevens-lg">
          {events.items.map((item, i) => (
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
      ) : (
        <p className="text-center text-stevens-dark-gray">
          {events.fallbackText || 'No upcoming events at this time.'}
        </p>
      )}
    </Section>
  );
});
