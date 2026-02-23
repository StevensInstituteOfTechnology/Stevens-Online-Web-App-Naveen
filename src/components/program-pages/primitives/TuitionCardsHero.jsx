import { Card } from '@/components/ui/card';

/**
 * Tuition Cards Component for Hero Section
 * Displays tuition/pricing cards in a 2-column grid for the PageHero bottomContent
 * 
 * Used by: Certificate pages, MEADS, Explore pages
 */
export function TuitionCardsHero({ cards }) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 text-center">
      {cards.map((card) => (
        <Card 
          key={card.label} 
          className="p-2 sm:p-3 md:p-stevens-sm rounded-stevens-md sm:rounded-stevens-lg flex flex-col h-full border-white/80 bg-white/30 backdrop-blur-md cursor-pointer relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          {/* Magnifying glass highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none rounded-stevens-md sm:rounded-stevens-lg" style={{ zIndex: 1 }}></div>
          {/* Top layer: Price */}
          <div className="flex items-center justify-center py-1 sm:py-1.5 relative" style={{ zIndex: 2 }}>
            <p className="font-stevens-display text-base sm:text-stevens-xl md:text-stevens-2xl lg:text-stevens-3xl font-stevens-bold text-white whitespace-nowrap" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9)' }}>
              {card.value}
            </p>
          </div>
          {/* Bottom layer: Label */}
          <div className="flex items-center justify-center py-0.5 sm:py-1 relative" style={{ zIndex: 2 }}>
            <p className="text-xs sm:text-stevens-sm md:text-stevens-base text-white font-semibold leading-tight" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)' }}>
              {card.label}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Backward compatible alias
export const CertificateTuitionCardsHero = TuitionCardsHero;
