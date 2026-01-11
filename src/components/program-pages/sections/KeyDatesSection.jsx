import React, { forwardRef } from 'react';
import { Card } from '../../ui/card';
import { Section } from '../primitives';

/**
 * KeyDatesSection - Key Dates & Deadlines table
 * 
 * Design: CPE Brand Guidelines - Table with deadline information
 * Features:
 * - Dynamic headers (2-5 columns supported)
 * - Rows with event, date, and optional details
 * - Optional priority/final/start date columns
 * - Optional footnote
 * 
 * Used in: Both Degree and Certificate pages
 * Note: May be rendered separately or combined with Admissions
 * 
 * @param {Object} keyDates - Key dates configuration
 * @param {Array} keyDates.headers - Array of header strings
 * @param {Array} keyDates.rows - Array of row objects
 * @param {string} keyDates.rows[].event - Event name
 * @param {string} keyDates.rows[].date - Primary date
 * @param {string} keyDates.rows[].details - Optional date details
 * @param {string} keyDates.rows[].priorityDate - Optional priority date
 * @param {string} keyDates.rows[].priorityDetails - Optional priority details
 * @param {string} keyDates.rows[].finalDate - Optional final date
 * @param {string} keyDates.rows[].startDate - Optional start date
 * @param {string} keyDates.footnote - Optional footnote text
 */
export const KeyDatesSection = forwardRef(function KeyDatesSection(
  { keyDates },
  ref
) {
  if (!keyDates) return null;

  return (
    <Section
      id="deadlines"
      title="Key Dates & Deadlines"
      bgClassName="bg-stevens-light-gray"
      el="div"
      ref={ref}
    >
      <div className="text-center mb-stevens-xl">
        <p className="text-stevens-xl text-stevens-dark-gray max-w-3xl mx-auto">
          Plan your application for the upcoming Spring 2026 term.
        </p>
      </div>

      <Card className="shadow-xl border-0 overflow-hidden max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-stevens-light-gray">
            <thead className="bg-stevens-light-gray">
              <tr>
                {keyDates.headers.map((header) => (
                  <th
                    key={header}
                    className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-black border border-stevens-light-gray"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keyDates.rows.map((row, i) => (
                <tr key={i} className="bg-white">
                  <td className="p-4 font-bold text-base whitespace-nowrap align-top border border-stevens-light-gray">
                    {row.event}
                  </td>
                  <td className="p-4 align-top border border-stevens-light-gray">
                    <div className="font-bold text-stevens-black">
                      {row.date}
                    </div>
                    {row.details && (
                      <div className="text-stevens-dark-gray mt-1 text-stevens-sm">
                        {row.details}
                      </div>
                    )}
                  </td>
                  {keyDates.headers.length > 2 && (
                    <>
                      <td className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">
                          {row.priorityDate || ''}
                        </div>
                        {row.priorityDetails && (
                          <div className="text-stevens-dark-gray mt-1 text-stevens-sm">
                            {row.priorityDetails}
                          </div>
                        )}
                      </td>
                      <td className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">
                          {row.finalDate || ''}
                        </div>
                      </td>
                      <td className="p-4 align-top border border-stevens-light-gray">
                        <div className="font-bold text-stevens-black">
                          {row.startDate || ''}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {keyDates.footnote && (
        <p className="text-center text-sm text-stevens-dark-gray mt-4 italic">
          {keyDates.footnote}
        </p>
      )}
    </Section>
  );
});
