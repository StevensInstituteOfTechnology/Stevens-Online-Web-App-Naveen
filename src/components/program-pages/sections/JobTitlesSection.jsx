import React, { forwardRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Section } from '../primitives';

/**
 * JobTitlesSection - Common Job Titles table with salary data
 * 
 * Design: CPE Brand Guidelines - Table with salary bars
 * Features:
 * - Intro text with program code
 * - Table showing job titles, employment numbers (optional), and salary
 * - Visual salary comparison bars (relative to max salary)
 * - Source citation
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} commonJobTitles - Section configuration
 * @param {string} commonJobTitles.title - Section title
 * @param {Object} career - Career data containing job titles
 * @param {Array} career.jobTitles - Array of job objects
 * @param {string} career.jobTitles[].title - Job title
 * @param {string} career.jobTitles[].salary - Salary string (e.g., "$120,000")
 * @param {string} career.jobTitles[].employed - Employment count (optional)
 * @param {string} career.source - Data source citation
 * @param {string} programCode - Program code for display (e.g., "MBA")
 */
export const JobTitlesSection = forwardRef(function JobTitlesSection(
  { commonJobTitles, career, programCode },
  ref
) {
  if (!commonJobTitles || !career?.jobTitles || career.jobTitles.length === 0) {
    return null;
  }

  // Calculate max salary for relative bar widths
  const maxSalary = Math.max(
    ...career.jobTitles.map((job) =>
      parseFloat(job.salary.replace(/[$,]/g, ''))
    )
  );

  return (
    <Section
      id="common-job-titles"
      title={commonJobTitles.title}
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      <div className="text-center mb-stevens-xl">
        <p className="text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto">
          Earning an online {programCode.toUpperCase()} prepares you for career
          paths in management-level roles across industries. Explore{' '}
          <strong>top {programCode.toUpperCase()} jobs</strong> for recent
          graduates.
        </p>
      </div>

      <div className="mb-stevens-lg">
        <div className="bg-stevens-white rounded-stevens-md overflow-hidden border border-stevens-light-gray shadow-md">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-stevens-light-gray border-b-2 border-stevens-light-gray">
                <TableHead className="font-semibold text-stevens-dark-gray uppercase tracking-wider text-stevens-sm py-stevens-md px-stevens-xl text-left">
                  Job Title
                </TableHead>
                {career.jobTitles[0]?.employed && (
                  <TableHead className="font-semibold text-stevens-dark-gray uppercase tracking-wider text-stevens-sm py-stevens-md px-stevens-xl text-center">
                    Employed
                  </TableHead>
                )}
                <TableHead className="font-semibold text-stevens-dark-gray uppercase tracking-wider text-stevens-sm py-stevens-md px-stevens-xl text-center">
                  Median or Average Annual Earnings
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {career.jobTitles.map((job, index) => (
                <TableRow
                  key={job.title}
                  className={`
                    hover:bg-stevens-light-gray 
                    transition-all duration-stevens-normal border-b border-stevens-light-gray
                    ${
                      index % 2 === 0
                        ? 'bg-stevens-white'
                        : 'bg-stevens-light-gray/30'
                    }
                  `}
                >
                  <TableCell className="font-medium text-stevens-dark-gray text-stevens-base py-stevens-md px-stevens-xl">
                    <div className="flex items-center gap-stevens-sm">
                      <div className="w-2 h-2 bg-stevens-black rounded-full flex-shrink-0"></div>
                      {job.title}
                    </div>
                  </TableCell>
                  {job.employed && (
                    <TableCell className="text-stevens-dark-gray text-stevens-base py-stevens-md px-stevens-xl text-center font-stevens-semibold">
                      <span className="bg-stevens-light-gray px-stevens-sm py-stevens-xs rounded-stevens-md">
                        {job.employed}
                      </span>
                    </TableCell>
                  )}
                  <TableCell className="text-stevens-dark-gray py-stevens-md px-stevens-xl">
                    <div className="flex flex-col gap-stevens-xs">
                      <span className="font-stevens-bold text-stevens-lg text-stevens-black text-center">
                        {job.salary}
                      </span>
                      <div className="w-full bg-stevens-light-gray rounded-full h-3 shadow-inner">
                        <div
                          className="bg-stevens-black h-3 rounded-full transition-all duration-stevens-normal shadow-sm"
                          style={{
                            width: `${Math.min(
                              100,
                              (parseFloat(job.salary.replace(/[$,]/g, '')) /
                                maxSalary) *
                                100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-center mt-stevens-lg">
          <p className="text-stevens-sm text-stevens-dark-gray italic">
            Source: {career.source}
          </p>
        </div>
      </div>
    </Section>
  );
});
