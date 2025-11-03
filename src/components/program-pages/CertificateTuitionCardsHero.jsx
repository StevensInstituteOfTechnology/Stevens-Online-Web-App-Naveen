import React from 'react';
import { Card } from '@/components/ui/card';

/**
 * Tuition Cards Component for Certificate Page Hero Section
 * Displays tuition cards in a 2-column grid for the PageHero bottomContent
 */
export default function CertificateTuitionCardsHero({ cards }) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-2 gap-12  md:gap-12 text-center">
      {cards.map((card) => (
        <Card 
          key={card.label} 
          className="p-1 sm:p-stevens-xs stevens-md:p-stevens-sm rounded-stevens-md sm:rounded-stevens-lg flex flex-col h-full border-white/60 bg-white/20 backdrop-blur-md cursor-pointer relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Magnifying glass highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-stevens-md sm:rounded-stevens-lg" style={{ zIndex: 1 }}></div>
          {/* Top layer: Price */}
          <div className="flex items-center justify-center py-0.5 sm:py-1 relative" style={{ zIndex: 2 }}>
            <p className="font-stevens-display text-xs sm:text-stevens-lg stevens-md:text-stevens-3xl font-stevens-bold text-white whitespace-nowrap" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.7)' }}>
              {card.value}
            </p>
          </div>
          {/* Bottom layer: Label */}
          <div className="flex items-center justify-center py-0.5 sm:py-1 relative" style={{ zIndex: 2 }}>
            <p className="text-[10px] sm:text-stevens-xs stevens-md:text-stevens-sm text-white font-medium leading-tight" style={{ textShadow: '0 0.5px 2px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.7)' }}>
              {card.label}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

