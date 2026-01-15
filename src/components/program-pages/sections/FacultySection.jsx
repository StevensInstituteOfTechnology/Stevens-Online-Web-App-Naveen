import React, {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { User } from "lucide-react";
import { CarouselNavButton } from "@/components/shared";

/**
 * FacultySection - Meet the Faculty with infinite carousel
 *
 * Design: Modern card grid/carousel with diagonal-cut photos
 * Features:
 * - Left-aligned header with description
 * - Infinite carousel navigation when members > 3
 * - Clone technique for seamless looping
 * - 3-column responsive layout
 * - Cards with diagonal-cut photo effect
 *
 * Used in: Both Degree and Certificate pages
 */
export const FacultySection = forwardRef(function FacultySection(
  { faculty },
  ref
) {
  if (!faculty || !faculty.members || faculty.members.length === 0) return null;

  const members = faculty.members;
  const N = members.length;

  // Responsive cards per view
  const [cardsPerView, setCardsPerView] = useState(3);
  const K = cardsPerView;
  const hasCarousel = N > K;

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(K);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const trackRef = useRef(null);
  const navButtonsRef = useRef(null);
  const isInitialized = useRef(false);

  // Handle responsive cardsPerView
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Reset index when cardsPerView changes
  useEffect(() => {
    if (N > 0 && isInitialized.current) {
      setCurrentIndex(K);
    }
  }, [cardsPerView, N, K]);

  // Build extended array with clones: [last K] + [all items] + [first K]
  const extendedMembers = useMemo(() => {
    if (N === 0 || !hasCarousel) return members;
    return [
      ...members.slice(-K).map((m, i) => ({ ...m, _key: `clone-end-${i}` })),
      ...members.map((m, i) => ({ ...m, _key: `original-${i}` })),
      ...members
        .slice(0, K)
        .map((m, i) => ({ ...m, _key: `clone-start-${i}` })),
    ];
  }, [members, N, K, hasCarousel]);

  // Calculate real index for display (1-based)
  const realIndex = useMemo(() => {
    if (N === 0) return 1;
    return ((currentIndex - K + N) % N) + 1;
  }, [currentIndex, N, K]);

  // Navigate carousel
  const navigate = useCallback(
    (direction) => {
      if (isAnimating || N === 0) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => prev + (direction === "next" ? 1 : -1));
    },
    [isAnimating, N]
  );

  // Handle transition end for seamless reset
  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);

    // Reset position if in clone zone
    if (currentIndex >= N + K) {
      // Reached end clones → jump to real first item
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
      }
      setCurrentIndex(K);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = "transform 0.5s ease-in-out";
          }
        });
      });
    } else if (currentIndex < K) {
      // Reached start clones → jump to real last item
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
      }
      setCurrentIndex(N + K - 1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = "transform 0.5s ease-in-out";
          }
        });
      });
    }
  }, [currentIndex, N, K]);

  // Initialize carousel index
  useEffect(() => {
    if (N > 0 && hasCarousel && !isInitialized.current) {
      setCurrentIndex(K);
      isInitialized.current = true;
    }
  }, [N, K, hasCarousel]);

  // Clear active button when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navButtonsRef.current && !navButtonsRef.current.contains(e.target)) {
        setActiveButton(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Calculate transform for carousel
  const gapPercent = 2;
  const cardWidthPercent = (100 - (K - 1) * gapPercent) / K;

  return (
    <section
      id="faculty"
      ref={ref}
      className="bg-stevens-white py-16 lg:py-24 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-xl">
        {/* Header: Title + Description (left) | Nav Buttons (right) */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-stevens-display text-4xl lg:text-5xl font-light text-stevens-black uppercase tracking-tight mb-4">
              FACULTY
            </h2>
            <p className="text-stevens-dark-gray text-lg leading-relaxed">
              Learn from expert faculty who bring cutting-edge research and
              industry experience to every course.
            </p>
          </div>

          {/* Carousel Nav Buttons + Indicator - only show if more than 3 members */}
          {hasCarousel && (
            <div className="flex flex-col items-end gap-2">
              {/* Nav Buttons */}
              <div ref={navButtonsRef} className="flex items-center gap-3">
                <CarouselNavButton
                  direction="prev"
                  onClick={() => {
                    setActiveButton("prev");
                    navigate("prev");
                  }}
                  isActive={activeButton === "prev"}
                  variant="light"
                  disabled={isAnimating}
                />
                <CarouselNavButton
                  direction="next"
                  onClick={() => {
                    setActiveButton("next");
                    navigate("next");
                  }}
                  isActive={activeButton === "next"}
                  variant="light"
                  disabled={isAnimating}
                />
              </div>
              {/* Pagination Indicator */}
              <span className="text-stevens-gray text-sm tabular-nums tracking-wide pt-4 pr-8">
                {realIndex} / {N}
              </span>
            </div>
          )}
        </div>

        {/* Faculty Cards - Grid or Carousel */}
        {hasCarousel ? (
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex"
              style={{
                transform: `translateX(-${
                  currentIndex * (cardWidthPercent + gapPercent)
                }%)`,
                transition: "transform 0.5s ease-in-out",
                gap: `${gapPercent}%`,
              }}
            >
              {extendedMembers.map((member) => (
                <div
                  key={member._key}
                  className="flex-shrink-0"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <FacultyCard member={member} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {members.map((member, index) => (
              <FacultyCard key={index} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

/**
 * FacultyCard - Individual faculty member card with diagonal-cut corner
 */
function FacultyCard({ member }) {
  // Top-right corner diagonal cut - applied to entire card
  const clipPath = "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)";

  return (
    <div
      className="bg-stevens-light-gray overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ clipPath }}
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-stevens-gray/30 flex items-center justify-center">
            <User className="w-20 h-20 text-stevens-gray" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-6 py-8">
        <h3 className="font-stevens-display text-2xl lg:text-[1.75rem] font-medium text-stevens-black mb-2">
          {member.name}
        </h3>
        {member.title && (
          <p className="text-stevens-red text-base leading-relaxed">
            {member.title}
          </p>
        )}
      </div>
    </div>
  );
}
