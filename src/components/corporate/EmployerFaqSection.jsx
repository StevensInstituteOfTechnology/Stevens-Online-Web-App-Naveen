import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What are the IRS criteria for an education assistance program (EAP)?',
    answer: (
      <div className="space-y-stevens-md">
        <p>The following requirements apply for a qualified educational assistance plan:</p>
        <ul className="list-disc list-inside space-y-stevens-sm ml-stevens-md">
          <li>The employer must provide a written plan.</li>
          <li>The plan can&apos;t offer other benefits besides education.</li>
          <li>The employee can&apos;t receive more than $5,250 per year from all employers combined.</li>
          <li>The plan must not favor highly compensated employees (for 2025, that means those earning more than $160,000 in total compensation).</li>
        </ul>
        <p>
          You can find further details in the Educational Assistance and Allowances section of the{' '}
          <a
            href="https://www.irs.gov/publications/p15b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stevens-red underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
          >
            IRS Publication of Fringe Benefits
          </a>
          .
        </p>
      </div>
    )
  },
  {
    question: 'What are some other benefits of offering tuition reimbursement programs to employees?',
    answer: (
      <div className="space-y-stevens-md">
        <ul className="list-disc list-inside space-y-stevens-sm ml-stevens-md">
          <li>
            <strong>Talent development:</strong> Build a more skilled workforce that fosters innovation and growth.
          </li>
          <li>
            <strong>Higher recruitment and retention:</strong> Spend less time, money and effort recruiting new workers when you keep long-term employees.
          </li>
          <li>
            <strong>Employee engagement:</strong> Keep employees interested through new challenges while allowing them to turn their passions into productivity at work.
          </li>
          <li>
            <strong>Competitive edge:</strong> Attract talent by offering a valuable incentive. Companies like{' '}
            <a
              href="https://corporate.walmart.com/about/working-at-walmart/live-better-u"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stevens-red underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
            >
              Walmart
            </a>
            ,{' '}
            <a
              href="https://www.archwaystoopportunity.com/tuition_assistance.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stevens-red underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
            >
              McDonald&apos;s
            </a>
            ,{' '}
            <a
              href="https://livemagenta.com/l3/Tuition-Assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stevens-red underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
            >
              T-Mobile
            </a>{' '}
            and{' '}
            <a
              href="https://hiring.amazon.com/why-amazon/career-advancement/higher-education-support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stevens-red underline hover:text-stevens-dark-gray transition-colors duration-stevens-normal"
            >
              Amazon
            </a>{' '}
            help cover the cost of going back to school.
          </li>
        </ul>
      </div>
    )
  },
  {
    question: 'Is an EAP a good fit for my business?',
    answer:
      'The benefits of tuition reimbursement programs are evident. However, deciding on an EAP depends on your budget, goals and other factors. Consult with your financial advisor and human resources department to determine your tax impact and potential ROI.'
  }
];

const EmployerFaqSection = ({
  heading = 'Frequently Asked Questions',
  accordionPrefix = 'faq-section'
}) => (
  <section className="bg-stevens-white py-stevens-section-sm lg:py-stevens-section">
    <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
      <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg text-center">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqItems.map((faq, index) => (
          <AccordionItem key={`${accordionPrefix}-${index}`} value={`${accordionPrefix}-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default EmployerFaqSection;

