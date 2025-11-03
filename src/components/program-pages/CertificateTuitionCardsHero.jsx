import React from 'react';
import { Card } from '@/components/ui/card';

/**
 * Tuition Cards Component for Certificate Page Hero Section
 * Displays three tuition cards in a horizontal grid for the PageHero bottomContent
 */
export default function CertificateTuitionCardsHero({ cards }) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-1 stevens-sm:grid-cols-3 gap-stevens-sm text-center">
      {cards.map((card) => (
        <Card key={card.label} className="p-stevens-xs stevens-md:p-stevens-sm rounded-stevens-md flex flex-col h-full bg-transparent border-0 shadow-none">
          {/* Top layer: Price */}
          <div className="flex items-center justify-center py-1">
            <p className="font-stevens-display text-stevens-lg stevens-sm:text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-white whitespace-nowrap" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.9)' }}>
              {card.value}
            </p>
          </div>
          {/* Bottom layer: Label */}
          <div className="flex items-center justify-center py-1">
            <p className="text-stevens-xs stevens-sm:text-stevens-sm text-white font-medium" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.9)' }}>
              {card.label}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

