import React, { forwardRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Card, CardContent } from '../../ui/card';
import { Section } from '../primitives';

/**
 * CurriculumSection - Program Course Structure with tabbed content
 * 
 * Design: CPE Brand Guidelines - Tabbed curriculum display
 * Features:
 * - Dynamic title with program code fallback
 * - Description paragraphs (newline separated)
 * - Horizontal scrollable tabs for course categories
 * - HTML content in tab panels
 * - Optional Complete Course Catalog section
 * 
 * Used in: Both Degree and Certificate pages
 * Position differs:
 * - Degree: Before Career section
 * - Certificate: After Top Companies section
 * 
 * @param {Object} curriculum - Curriculum configuration
 * @param {string} curriculum.title - Section title (optional)
 * @param {string} curriculum.description - Description text (newline separated paragraphs)
 * @param {Object} curriculum.courseTabs - Object keyed by tab id with {title, content}
 * @param {string} curriculum.completeCourseCatalog - Optional HTML for full catalog
 * @param {string} programCode - Program code for title fallback (e.g., "MBA")
 */
export const CurriculumSection = forwardRef(function CurriculumSection(
  { curriculum, programCode },
  ref
) {
  if (!curriculum) return null;

  return (
    <Section
      id="curriculum"
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      <div className="max-w-stevens-content-max mx-auto">
        <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light text-stevens-dark-gray mb-stevens-lg text-left uppercase tracking-wide">
          {curriculum.title
            ? curriculum.title
            : `Online ${programCode.toUpperCase()} Program Course Structure`}
        </h2>
        {curriculum.description && (
          <div className="mb-stevens-xl space-y-stevens-md text-stevens-dark-gray leading-relaxed text-stevens-base stevens-md:text-stevens-lg">
            {curriculum.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
        {curriculum.courseTabs && (
          <Tabs
            defaultValue={Object.keys(curriculum.courseTabs)[0]}
            className="w-full"
          >
            <div className="relative overflow-x-auto scrollbar-hide group">
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-stevens-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal z-10"></div>
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-stevens-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal z-10"></div>
              <TabsList className="inline-flex md:w-full justify-start bg-transparent border-b-2 border-stevens-light-gray rounded-none h-auto p-0 gap-0">
                {Object.keys(curriculum.courseTabs).map((tabKey) => (
                  <TabsTrigger
                    key={tabKey}
                    value={tabKey}
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-stevens-red rounded-none px-stevens-lg py-stevens-md font-stevens-bold text-stevens-base stevens-md:text-stevens-lg text-stevens-dark-gray data-[state=active]:text-stevens-dark-gray hover:text-stevens-red transition-colors duration-stevens-normal border-b-4 border-transparent whitespace-nowrap flex-shrink-0"
                  >
                    {curriculum.courseTabs[tabKey].title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {Object.keys(curriculum.courseTabs).map((tabKey) => (
              <TabsContent
                key={tabKey}
                value={tabKey}
                className="mt-stevens-xl"
              >
                <div
                  className="prose prose-stevens max-w-none [&_h4]:font-stevens-display [&_h4]:text-stevens-2xl [&_h4]:stevens-md:text-stevens-3xl [&_h4]:font-light [&_h4]:text-stevens-dark-gray [&_h4]:mb-stevens-lg [&_h4]:uppercase [&_h4]:tracking-wide [&_h5]:font-semibold [&_h5]:text-stevens-xl [&_h5]:stevens-md:text-stevens-2xl [&_h5]:text-stevens-dark-gray [&_h5]:mb-stevens-lg [&_h5]:mt-stevens-2xl [&_p]:text-stevens-dark-gray [&_p]:leading-relaxed [&_p]:mb-stevens-lg"
                  dangerouslySetInnerHTML={{
                    __html: curriculum.courseTabs[tabKey].content,
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
      {curriculum.completeCourseCatalog && (
        <div className="mt-12">
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
