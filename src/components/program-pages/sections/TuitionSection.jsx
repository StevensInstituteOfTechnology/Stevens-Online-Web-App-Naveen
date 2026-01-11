import React, { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Section } from '../primitives';

/**
 * TuitionSection - Tuition & Financial Aid information
 * 
 * Design: CPE Brand Guidelines - Cards for tuition info and grants
 * Features:
 * - Tuition cards grid (value/label pairs)
 * - Optional HTML description
 * - Optional grants/scholarships grid
 * 
 * Used in: Both Degree and Certificate pages
 * Note: May be rendered separately or combined with Admissions
 * 
 * @param {Object} tuition - Tuition configuration
 * @param {Array} tuition.cards - Array of {value, label} tuition cards
 * @param {string} tuition.description - HTML description content
 * @param {Array} tuition.grants - Optional array of grant objects
 * @param {string} tuition.grants[].title - Grant title
 * @param {string} tuition.grants[].description - Grant description
 */
export const TuitionSection = forwardRef(function TuitionSection(
  { tuition },
  ref
) {
  if (!tuition) return null;

  return (
    <Section
      id="tuition"
      title="Tuition & Financial Aid"
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      {tuition.cards && tuition.cards.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
          {tuition.cards.map((card, i) => (
            <Card key={i} className="shadow-md">
              <CardHeader>
                <CardTitle className="font-stevens-display text-4xl font-light text-stevens-red">
                  {card.value}
                </CardTitle>
                <p className="font-semibold text-stevens-dark-gray">
                  {card.label}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      {tuition.description && (
        <div
          className="text-center prose max-w-3xl mx-auto mt-8"
          dangerouslySetInnerHTML={{ __html: tuition.description }}
        />
      )}
      {tuition.grants && tuition.grants.length > 0 && (
        <div className="mt-10">
          <h3 className="font-stevens-display text-2xl font-light text-center mb-6 uppercase tracking-wide">
            Grants & Scholarships
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tuition.grants.map((grant, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{grant.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{grant.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
});
