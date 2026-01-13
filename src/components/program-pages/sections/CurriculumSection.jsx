import React, { forwardRef, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../primitives";
import { CourseSection } from "./curriculum";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * CurriculumSection - Program Course Structure with tabbed content
 *
 * Design: CPE Brand Guidelines - Tabbed curriculum display
 * Features:
 * - Collapsible section with expand/collapse button
 * - Dynamic title with program code fallback
 * - Description paragraphs (newline separated)
 * - Horizontal scrollable tabs for course categories
 * - Supports BOTH structured data AND legacy HTML injection
 * - Optional Complete Course Catalog section
 *
 * Used in: Both Degree and Certificate pages
 *
 * NEW STRUCTURED DATA FORMAT:
 * curriculum.tabs = [
 *   {
 *     id: "traditional",
 *     title: "Traditional Coursework",
 *     sections: [
 *       { title: "Term 1", intro: "...", courses: [...] }
 *     ],
 *     footer: { title: "...", content: "..." } // optional
 *   }
 * ]
 *
 * LEGACY HTML FORMAT (still supported):
 * curriculum.courseTabs = {
 *   traditional: { title: "...", content: "<html>..." }
 * }
 *
 * @param {Object} curriculum - Curriculum configuration
 * @param {string} curriculum.title - Section title (optional)
 * @param {string} curriculum.description - Description text
 * @param {Array} curriculum.tabs - NEW: Array of structured tab data
 * @param {Object} curriculum.courseTabs - LEGACY: Object with HTML content
 * @param {string} curriculum.completeCourseCatalog - Optional HTML for full catalog
 * @param {string} curriculum.variant - "degree" or "certificate"
 * @param {string} programCode - Program code for title fallback
 */
export const CurriculumSection = forwardRef(function CurriculumSection(
  { curriculum, programCode },
  ref
) {
  // State for collapsible course list
  const [isExpanded, setIsExpanded] = useState(false);
  // Handle collapsible course toggles for LEGACY HTML injection
  // Using document-level event delegation for reliable click handling
  useEffect(() => {
    const handleCourseToggle = (e) => {
      // Use event delegation - check if clicked element is or is inside a .course-toggle
      const button = e.target.closest(".course-toggle");
      if (!button) return;

      const targetId = button.getAttribute("data-target");
      if (targetId) {
        const content = document.getElementById(targetId);
        const arrow = button.querySelector(".course-arrow");

        if (content && arrow) {
          const isHidden = content.classList.contains("hidden");
          if (isHidden) {
            content.classList.remove("hidden");
            arrow.textContent = "▲";
          } else {
            content.classList.add("hidden");
            arrow.textContent = "▼";
          }
        }
      }
    };

    // Attach listener to document for reliable event delegation
    document.addEventListener("click", handleCourseToggle);

    return () => {
      document.removeEventListener("click", handleCourseToggle);
    };
  }, []); // Empty dependency - runs once on mount

  if (!curriculum) return null;

  // Determine if using new structured format or legacy HTML format
  const isStructuredFormat = curriculum.tabs && Array.isArray(curriculum.tabs);
  const variant = curriculum.variant || "degree";

  // Get tabs data - either from new format or legacy format
  const tabsData = isStructuredFormat
    ? curriculum.tabs
    : curriculum.courseTabs
    ? Object.keys(curriculum.courseTabs).map((key) => ({
        id: key,
        title: curriculum.courseTabs[key].title,
        htmlContent: curriculum.courseTabs[key].content,
      }))
    : [];

  return (
    <Section id="curriculum" bgClassName="bg-stevens-white" ref={ref}>
      <div className="max-w-stevens-content-max mx-auto">
        <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light text-stevens-dark-gray mb-stevens-lg text-left uppercase tracking-wide">
          {curriculum.title
            ? curriculum.title
            : `Online ${
                programCode?.toUpperCase() || ""
              } Program Course Structure`}
        </h2>

        {curriculum.description && (
          <div className="mb-stevens-lg space-y-stevens-md text-stevens-dark-gray leading-relaxed text-stevens-base stevens-md:text-stevens-lg">
            {curriculum.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Expand/Collapse Button */}
        {tabsData.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 mb-stevens-lg border-2 border-stevens-gray/30 bg-stevens-light-gray hover:bg-stevens-gray/20 text-stevens-dark-gray font-stevens-bold text-stevens-base transition-all duration-stevens-normal rounded-sm"
          >
            {isExpanded ? (
              <>
                Hide Course List
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                View Course List
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        )}

        {/* Collapsible Course Content */}
        {tabsData.length > 0 && isExpanded && (
          <Tabs defaultValue={tabsData[0].id} className="w-full animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="relative overflow-x-auto scrollbar-hide group">
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-stevens-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal z-10"></div>
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-stevens-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal z-10"></div>
              <TabsList className="inline-flex md:w-full justify-start bg-transparent border-b-2 border-stevens-light-gray rounded-none h-auto p-0 gap-0">
                {tabsData.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-stevens-red rounded-none px-stevens-lg py-stevens-md font-stevens-bold text-stevens-base stevens-md:text-stevens-lg text-stevens-dark-gray data-[state=active]:text-stevens-dark-gray hover:text-stevens-red transition-colors duration-stevens-normal border-b-4 border-transparent whitespace-nowrap flex-shrink-0"
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabsData.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="mt-stevens-xl"
              >
                {/* NEW: Structured data rendering */}
                {tab.sections && tab.sections.length > 0 ? (
                  <div className="space-y-8">
                    {tab.sections.map((section, index) => (
                      <CourseSection
                        key={section.title || index}
                        section={section}
                        variant={variant}
                      />
                    ))}

                    {/* Optional footer (e.g., "Recommended Sequence" box or footnotes) */}
                    {tab.footer && (
                      <div className="bg-stevens-light-gray border-l-4 border-stevens-black p-stevens-lg rounded-stevens-sm">
                        {tab.footer.title && (
                          <h5 className="font-stevens-bold text-stevens-base mb-stevens-sm">
                            {tab.footer.title}
                          </h5>
                        )}
                        {tab.footer.content && (
                          <div className="text-stevens-sm text-stevens-dark-gray leading-relaxed space-y-2">
                            {tab.footer.content
                              .split("\n\n")
                              .map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : tab.htmlContent ? (
                  /* LEGACY: HTML injection rendering */
                  <div
                    className="prose prose-stevens max-w-none [&_h4]:font-stevens-display [&_h4]:text-stevens-2xl [&_h4]:stevens-md:text-stevens-3xl [&_h4]:font-light [&_h4]:text-stevens-dark-gray [&_h4]:mb-stevens-lg [&_h4]:uppercase [&_h4]:tracking-wide [&_h5]:font-semibold [&_h5]:text-stevens-xl [&_h5]:stevens-md:text-stevens-2xl [&_h5]:text-stevens-dark-gray [&_h5]:mb-stevens-lg [&_h5]:mt-stevens-2xl [&_p]:text-stevens-dark-gray [&_p]:leading-relaxed [&_p]:mb-stevens-lg"
                    dangerouslySetInnerHTML={{
                      __html: tab.htmlContent,
                    }}
                  />
                ) : null}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      {curriculum.completeCourseCatalog && isExpanded && (
        <div className="mt-12 max-w-stevens-content-max mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-stevens-display text-2xl font-light text-center mb-6 uppercase tracking-wide">
            Complete Course Catalog
          </h3>
          <Card>
            <CardContent className="p-6 overflow-x-auto">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: curriculum.completeCourseCatalog,
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </Section>
  );
});
