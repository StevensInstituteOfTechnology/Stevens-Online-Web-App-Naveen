import React, { forwardRef } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Section } from '../primitives';

/**
 * AdmissionsSection - Admissions information with multiple layout variants
 * 
 * Design: CPE Brand Guidelines - Complex section with two main layouts
 * 
 * Variants:
 * 1. "combinedWithTuition" / "certificateWithDeadlines":
 *    - Two-column layout: Admissions (left) + Key Dates & Tuition (right)
 *    - certificateWithDeadlines hides the key dates table
 * 
 * 2. Default (options layout):
 *    - Application options as cards (1-3 columns)
 *    - Optional alert message box
 *    - Optional consultation CTA
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} admissions - Admissions configuration
 * @param {string} admissions.variant - Layout variant
 * @param {string} admissions.requirements - HTML requirements content
 * @param {Array} admissions.options - Array of application option objects
 * @param {Object} admissions.alertMessage - Optional alert message
 * @param {Object} admissions.consultation - Optional consultation CTA
 * @param {Object} keyDates - Key dates for combined layout
 * @param {Object} tuition - Tuition data for combined layout
 */
export const AdmissionsSection = forwardRef(function AdmissionsSection(
  { admissions, keyDates, tuition },
  ref
) {
  if (!admissions) return null;

  // Combined layout for "combinedWithTuition" or "certificateWithDeadlines" variants
  if (
    (admissions.variant === 'combinedWithTuition' ||
      admissions.variant === 'certificateWithDeadlines') &&
    tuition
  ) {
    return (
      <Section
        id="admissions"
        bgClassName="bg-stevens-light-gray"
        ref={ref}
      >
        <div className="grid lg:grid-cols-5 gap-stevens-2xl items-start">
          {/* Left Column - Admissions */}
          <div className="lg:col-span-3">
            <h2 className="font-stevens-display text-stevens-4xl font-light text-center mb-stevens-lg uppercase tracking-wide">
              Admissions
            </h2>
            {admissions.requirements && (
              <Card className="shadow-stevens-lg rounded-stevens-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-stevens-sm font-stevens-display text-stevens-xl font-light text-stevens-dark-gray">
                    <FileText /> Application Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className="prose text-stevens-dark-gray"
                  dangerouslySetInnerHTML={{
                    __html: admissions.requirements,
                  }}
                />
              </Card>
            )}
          </div>

          {/* Right Column - Key Dates & Tuition */}
          <div className="lg:col-span-2">
            {keyDates &&
              admissions.variant !== 'certificateWithDeadlines' && (
                <>
                  <h2 className="font-stevens-display text-stevens-4xl font-light text-center mb-stevens-lg uppercase tracking-wide">
                    Key Dates & Deadlines
                  </h2>
                  <Card className="rounded-stevens-md mb-stevens-xl">
                    <CardHeader>
                      <CardTitle className="font-stevens-display text-stevens-xl font-light text-stevens-dark-gray">
                        {keyDates.term || 'Spring 2026'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {keyDates.rows.map((row) => (
                            <TableRow key={row.event}>
                              <TableCell className="font-stevens-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors duration-stevens-normal">
                                {row.event}
                              </TableCell>
                              <TableCell className="text-stevens-dark-gray">
                                {row.date}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </>
              )}

            {tuition && (
              <>
                <h2 className="font-stevens-display text-stevens-4xl font-light text-center mb-stevens-lg uppercase tracking-wide">
                  Tuition
                </h2>
                {tuition.cards && tuition.cards.length > 0 && (
                  <div className="grid grid-cols-2 gap-stevens-md text-center">
                    {tuition.cards.map((card) => (
                      <Card
                        key={card.label}
                        className="p-stevens-sm stevens-md:p-stevens-md rounded-stevens-md flex flex-col h-full"
                      >
                        {/* Top layer: Price */}
                        <div className="flex-1 flex items-center justify-center min-h-[60%]">
                          <p className="font-stevens-display text-stevens-lg stevens-sm:text-stevens-2xl stevens-md:text-stevens-3xl font-light text-stevens-red whitespace-nowrap">
                            {card.value}
                          </p>
                        </div>
                        {/* Bottom layer: Label */}
                        <div className="flex-1 flex items-center justify-center min-h-[40%] pt-stevens-md">
                          <p className="text-stevens-xs mb-stevens-md stevens-sm:text-stevens-sm text-stevens-dark-gray">
                            {card.label}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                {tuition.description && (
                  <div
                    className="prose text-center text-stevens-xs max-w-none mx-auto mt-stevens-md text-stevens-dark-gray"
                    dangerouslySetInnerHTML={{
                      __html: tuition.description,
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // Default options layout
  return (
    <Section
      id="admissions"
      title={
        admissions.options && admissions.options.length === 1
          ? 'Application Option'
          : 'Choose Your Application Option'
      }
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      <div
        className={`flex flex-wrap justify-center ${
          admissions.options && admissions.options.length === 1
            ? 'max-w-3xl mx-auto'
            : admissions.options && admissions.options.length === 2
            ? 'max-w-6xl mx-auto'
            : ''
        } gap-8`}
      >
        {admissions.options &&
          admissions.options.map((option, i) => (
            <Card
              key={i}
              className={`w-full ${
                admissions.options.length === 1
                  ? ''
                  : admissions.options.length === 2
                  ? 'md:w-[48%]'
                  : 'md:w-[48%] lg:w-[31%]'
              } shadow-lg ${
                option.featured ? 'border-2 border-stevens-red' : ''
              }`}
            >
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: option.description }}
                />
                {option.buttonText && !option.buttonGrayOut && (
                  <a
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="default" className="w-full mt-2">
                      {option.buttonText}{' '}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        {admissions.alertMessage && (
          <div className="w-full max-w-[75ch] mx-auto bg-stevens-red p-4 md:p-8 text-white border-2 border-stevens-dark-gray rounded-md">
            <div className="w-full">
              <h3 className="text-xl md:text-2xl font-bold">
                {admissions.alertMessage.title}
              </h3>
              <div
                className="py-4"
                dangerouslySetInnerHTML={{
                  __html: admissions.alertMessage.description,
                }}
              />
              {admissions.alertMessage.url && (
                <a
                  href={admissions.alertMessage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline-white">
                    {admissions.alertMessage.buttonText}
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      {admissions.consultation && (
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-2">
            {admissions.consultation.title}
          </h3>
          {admissions.consultation.url && (
            <a
              href={admissions.consultation.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline-dark">
                {admissions.consultation.buttonText}
              </Button>
            </a>
          )}
        </div>
      )}
    </Section>
  );
});
