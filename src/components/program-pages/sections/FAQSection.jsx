import React, { forwardRef } from 'react';
import { Section } from '../primitives';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';

/**
 * FAQSection - Frequently Asked Questions accordion
 * 
 * Design: CPE Brand Guidelines - Single accordion with expand/collapse
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Array} faqs - Array of FAQ objects
 * @param {string} faqs[].q - Question text
 * @param {string} faqs[].a - Answer text
 */
export const FAQSection = forwardRef(function FAQSection({ faqs }, ref) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <Section
      id="faqs"
      title="Frequently Asked Questions"
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto"
      >
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
});
