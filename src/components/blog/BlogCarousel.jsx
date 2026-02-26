import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { AnimatedSection, CarouselNavButton } from "@/components/shared";

/**
 * BlogCarousel - Infinite carousel component for blog posts
 *
 * Features:
 * - Infinite loop with clone technique
 * - Transform-based animation
 * - Responsive cards per view (1/2/3)
 * - Keyboard navigation
 * - Seamless reset on transition end
 */
const BlogCarousel = ({ items = [], maxItems = 5 }) => {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [activeButton, setActiveButton] = useState(null); // Track which button is "focused"
  const trackRef = useRef(null);
  const navButtonsRef = useRef(null); // Ref to detect clicks outside nav buttons
  const isInitialized = useRef(false);

  // Derived values
  const displayItems = useMemo(
    () => items.slice(0, maxItems),
    [items, maxItems]
  );
  const N = displayItems.length;
  const K = cardsPerView;

  // Build extended array with clones: [last K] + [all items] + [first K]
  const extendedItems = useMemo(() => {
    if (N === 0) return [];
    return [
      ...displayItems
        .slice(-K)
        .map((item, i) => ({ ...item, _key: `clone-end-${i}` })),
      ...displayItems.map((item, i) => ({ ...item, _key: `original-${i}` })),
      ...displayItems
        .slice(0, K)
        .map((item, i) => ({ ...item, _key: `clone-start-${i}` })),
    ];
  }, [displayItems, N, K]);

  // Calculate real index for display (1-based)
  const realIndex = useMemo(() => {
    if (N === 0) return 1;
    return ((currentIndex - K + N) % N) + 1;
  }, [currentIndex, N, K]);

  // Card dimensions - account for gaps to fit exactly in container
  const gapPercent = 1.5;
  const totalGapWidth = (cardsPerView - 1) * gapPercent; // e.g., 2 gaps × 1.5% = 3%
  const cardWidthPercent = (100 - totalGapWidth) / cardsPerView; // e.g., (100 - 3) / 3 = 32.33%

  // Navigation handler
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

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate("next");
      }
    },
    [navigate]
  );

  // Initialize carousel index
  useEffect(() => {
    if (N > 0 && !isInitialized.current) {
      setCurrentIndex(K);
      isInitialized.current = true;
    }
  }, [N, K]);

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

  // Clear active button when clicking outside nav buttons
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navButtonsRef.current && !navButtonsRef.current.contains(e.target)) {
        setActiveButton(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Don't render if no items
  if (N === 0) return null;

  return (
    <div
      role="region"
      aria-label="Blog carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="focus:outline-none"
    >
      {/* Pagination + Navigation Row */}
      <AnimatedSection className="flex items-center justify-between w-full mb-8">
        {/* Left: Pagination */}
        <span className="text-white/80 tabular-nums tracking-wide">
          {realIndex} / {N}
        </span>

        {/* Right: Navigation Arrows */}
        <div ref={navButtonsRef} className="flex items-center gap-3">
          <CarouselNavButton
            direction="prev"
            onClick={() => {
              setActiveButton("prev");
              navigate("prev");
            }}
            isActive={activeButton === "prev"}
            variant="dark"
            disabled={isAnimating}
          />
          <CarouselNavButton
            direction="next"
            onClick={() => {
              setActiveButton("next");
              navigate("next");
            }}
            isActive={activeButton === "next"}
            variant="dark"
            disabled={isAnimating}
          />
        </div>
      </AnimatedSection>

      {/* Carousel Container */}
      <AnimatedSection delay={0.1} className="overflow-hidden">
        {/* Carousel Track */}
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
          {extendedItems.map((blog) => (
            <Link
              key={blog._key}
              to={`/blog/${blog.id}/`}
              className="group cursor-pointer flex-shrink-0"
              style={{ width: `${cardWidthPercent}%` }}
            >
              <article className="flex flex-col h-full">
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden mb-5">
                  <img
                    src={
                      blog.featured_image_url ||
                      "/assets/blogs/uncategorized/big-data-jobs-skills-youll-acquire-in-a-data-science-masters-program/image.webp"
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: blog.image_position || "center" }}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <h3 className="font-stevens-display text-xl sm:text-2xl font-semibold text-white mb-3 leading-snug line-clamp-2 group-hover:text-stevens-red transition-colors duration-200">
                    {blog.title}
                  </h3>

                  {blog.created_date && (
                    <p className="text-white/70 font-stevens-condensed mb-2">
                      {new Date(blog.created_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  {blog.author ? (
                    <p className="text-white/70 font-stevens-condensed mb-4">
                      By {blog.author}
                    </p>
                  ) : blog.read_time ? (
                    <p className="text-white/70 mb-4">
                      {blog.read_time} min read
                    </p>
                  ) : null}

                  <p className="text-white/80 leading-relaxed line-clamp-3 mb-5">
                    {blog.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default BlogCarousel;
