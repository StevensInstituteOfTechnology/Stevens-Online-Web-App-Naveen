import React, { forwardRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
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
 * - Structured tab data with CourseSection/CourseCard components
 * - Optional Complete Course Catalog section
 *
 * Used in: Both Degree and Certificate pages
 *
 * Data format:
 * curriculum.tabs = [
 *   {
 *     id: "coursework",
 *     title: "Coursework",
 *     sections: [
 *       { title: "Term 1", intro: "...", courses: [{ code, name, credits, description }] }
 *     ],
 *     footer: { title: "...", content: "..." } // optional
 *   },
 *   {
 *     id: "immersions",
 *     title: "Immersion",
 *     htmlContent: "<p>...</p>" // alternative to sections - raw HTML for custom content
 *   }
 * ]
 *
 * @param {Object} curriculum - Curriculum configuration
 * @param {string} curriculum.title - Section title (optional)
 * @param {string} curriculum.description - Description text
 * @param {Array} curriculum.tabs - Array of structured tab data
 * @param {string} curriculum.completeCourseCatalog - Optional HTML for full catalog
 * @param {string} curriculum.variant - "degree" or "certificate"
 * @param {string} programCode - Program code for title fallback
 */
export const CurriculumSection = forwardRef(function CurriculumSection(
  { curriculum, programCode },
  ref
) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!curriculum) return null;

  const tabsData = curriculum.tabs && Array.isArray(curriculum.tabs) ? curriculum.tabs : [];
  const variant = curriculum.variant || "degree";

  return (
    <Section id="curriculum" bgClassName="bg-stevens-dark-gray" ref={ref}>
      <div className="max-w-stevens-content-max mx-auto">
        <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light text-white mb-stevens-lg text-left uppercase tracking-wide">
          {curriculum.title
            ? curriculum.title
            : `Online ${
                programCode?.toUpperCase() || ""
              } Program Course Structure`}
        </h2>

        {curriculum.description && (
          <div className="mb-stevens-lg space-y-stevens-md text-white/80 leading-relaxed text-stevens-base stevens-md:text-stevens-lg">
            {curriculum.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* View Course List Button (shown when collapsed) */}
        {tabsData.length > 0 && !isExpanded && (
          <div className="flex justify-center">
            <Button
              variant="link"
              onClick={() => setIsExpanded(true)}
              className="text-white hover:text-stevens-red text-lg font-medium p-0 h-auto"
            >
              View Course List
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Collapsible Course Content */}
        {tabsData.length > 0 && isExpanded && (
          <Tabs
            defaultValue={tabsData[0].id}
            className="w-full animate-in fade-in slide-in-from-top-4 duration-300"
          >
            <div className="relative overflow-x-auto scrollbar-hide group">
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-stevens-dark-gray to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal z-10"></div>
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-stevens-dark-gray to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal z-10"></div>
              <TabsList className="inline-flex md:w-full justify-start bg-transparent border-b-2 border-white/20 rounded-none h-auto p-0 gap-0">
                {tabsData.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-stevens-red rounded-none px-stevens-lg py-stevens-md font-stevens-bold text-stevens-base stevens-md:text-stevens-lg text-white/70 data-[state=active]:text-white hover:text-stevens-red transition-colors duration-stevens-normal border-b-4 border-transparent whitespace-nowrap flex-shrink-0"
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
                {tab.sections && tab.sections.length > 0 ? (
                  <div className="space-y-8">
                    {tab.sections.map((section, index) => (
                      <CourseSection
                        key={section.title || index}
                        section={section}
                        variant={variant}
                      />
                    ))}

                    {tab.footer && (
                      <div className="bg-white/10 border-l-4 border-stevens-red p-stevens-lg rounded-stevens-sm">
                        {tab.footer.title && (
                          <h5 className="font-stevens-bold text-stevens-base mb-stevens-sm text-white">
                            {tab.footer.title}
                          </h5>
                        )}
                        {tab.footer.content && (
                          <div className="text-stevens-sm text-white/70 leading-relaxed space-y-2">
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
                  <div
                    className="prose prose-invert max-w-none [&_h4]:font-stevens-display [&_h4]:text-stevens-2xl [&_h4]:stevens-md:text-stevens-3xl [&_h4]:font-light [&_h4]:text-white [&_h4]:mb-stevens-lg [&_h4]:uppercase [&_h4]:tracking-wide [&_h5]:font-semibold [&_h5]:text-stevens-xl [&_h5]:stevens-md:text-stevens-2xl [&_h5]:text-white [&_h5]:mb-stevens-lg [&_h5]:mt-stevens-xl [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:mb-stevens-lg [&_ul]:space-y-stevens-sm [&_li]:text-white/80"
                    dangerouslySetInnerHTML={{ __html: tab.htmlContent }}
                  />
                ) : null}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      {curriculum.completeCourseCatalog && isExpanded && (
        <div className="mt-12 max-w-stevens-content-max mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-stevens-display text-2xl font-light text-center mb-6 uppercase tracking-wide text-white">
            Complete Course Catalog
          </h3>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6 overflow-x-auto">
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: curriculum.completeCourseCatalog,
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hide Course List Button (shown at bottom when expanded) */}
      {tabsData.length > 0 && isExpanded && (
        <div className="max-w-stevens-content-max mx-auto mt-stevens-xl flex justify-center">
          <Button
            variant="link"
            onClick={() => setIsExpanded(false)}
            className="text-white hover:text-stevens-red text-lg font-medium p-0 h-auto"
          >
            Close Course List
            <ChevronUp className="w-5 h-5" />
          </Button>
        </div>
      )}
    </Section>
  );
});
