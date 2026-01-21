import React from 'react';
import { KEY_DATES } from '@/config/constants';
import { Award, Globe, GraduationCap } from 'lucide-react';
import { ExploreTemplate } from '../../components/explore-pages';
import { TuitionCardsHero } from '../../components/program-pages/primitives';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const ExploreCertEnterpriseAI = () => {
  usePageTracking({
    pageType: 'explore',
    programCode: 'cert-eai',
    additionalData: {
      program_name: 'Professional Graduate Certificate in Enterprise AI',
      has_embedded_form: true,
      has_pricing_cards: true,
      program_type: 'certificate'
    }
  });
  
  const certData = {
    // Hero Section
    heroTitle: "BUILD AI THAT WORKS AT WORK",
    programName: "Professional Graduate Certificate in Enterprise AI",
    heroSubtitle: "Launch your AI career in 9 graduate credits. Learn to frame, prototype, and deploy AI workflows safely-no CS background required. Stackable to MBA and M.Eng. in Applied Data Science.",
    bgImage: "/assets/images/explore-cert-enterprise-ai/explore-cert-EAI-1.webp",
    programCode: "cert-eai",
    secondaryCta: { label: 'Apply In Minutes', to: 'accelerated-application' },
    seo: {
      title: 'Professional Graduate Certificate in Enterprise AI | Stevens Institute of Technology',
      description: 'Launch your AI career in 9 graduate credits. Build AI workflows from strategy to deployment. $5,250 aligns with employer tuition benefits. Stackable to masters degrees.',
      ogImage: '/assets/images/explore-cert-enterprise-ai/explore-cert-EAI-1.webp',
      url: '/explore/certificates/enterprise-ai/'
    },
    
    // Statistics
    statistics: [
      {
        number: "28%",
        label: "Higher Pay with AI Skills",
        description: "Professionals with AI skills earn approximately 28% more than those without, according to LinkedIn's Economic Graph data."
      },
      {
        number: "$5,250",
        label: "Aligns with Tuition Benefits",
        description: "Certificate cost perfectly matches the IRS $5,250 annual tax-free employer tuition reimbursement limit."
      },
      {
        number: "Top Jobs",
        label: "On the Rise 2025",
        description: "AI-related roles dominate LinkedIn's Jobs on the Rise list, with over half of postings outside traditional IT."
      },
      {
        number: "9 Credits",
        label: "Stackable to Masters",
        description: "All credits apply toward Stevens' MBA and M.Eng. in Applied Data Science, giving you a clear path to continue your education."
      }
    ],
    
    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "PRACTICAL AI SKILLS FOR BUSINESS PROFESSIONALS",
    whyChooseStevensContent: `
      <p class="font-stevens-body">Most firms struggle to operationalize GenAI-governance, data quality, and KPIs remain major challenges. This certificate's progression from strategy to proof-of-concept to operational workflow mirrors what AI adoption leaders say is required to capture real value.</p>
      
      <p class="font-stevens-body">Unlike theoretical courses or short bootcamps, this graduate-level certificate provides rigorous training in both the technical and strategic aspects of AI implementation. You'll learn from PhD faculty who are active in AI research and industry consulting, ensuring you gain cutting-edge knowledge that translates directly to workplace applications.</p>
      
      <p class="font-stevens-body">The certificate is designed for non-STEM and STEM professionals alike-no CS background required. Whether you're in product management, operations, marketing, HR, finance, or consulting, you'll learn to be an AI doer who can frame problems, build prototypes, and deploy solutions responsibly.</p>
    `,
    
    // Program Benefits
    programBenefitsTitle: "Certificate Benefits",
    programBenefitsDescription: "Employers are hiring for 'AI-fluent' business talent across every function. AI roles top 'Jobs on the Rise 2025,' and AI skills carry a salary premium. This certificate turns managers, analysts, and professionals into responsible AI practitioners who can operationalize AI safely and effectively.<br/><br/>The 9-credit model aligns perfectly with the IRS $5,250 tax-free employer tuition benefit, improving affordability and making it ideal for corporate-sponsored learning.",
    programBenefitsImage: "/assets/images/explore-cert-enterprise-ai/explore-cert-EAI-2.webp",
    programBenefitsHighlights: [
      {
        title: "Strategy to Deployment",
        description: "Learn the complete AI implementation arc: understand capabilities and governance (BIA 568), design GenAI proof-of-concepts (BIA 662), then build operational workflows (PE 810)."
      },
      {
        title: "Practical, Not Theoretical",
        description: "Ship a running AI workflow in 8 weeks. Every course includes hands-on projects that simulate real business challenges, from vendor evaluation to deploying monitored AI agents."
      },
      {
        title: "Safe & Governed",
        description: "From FATE principles and deployment patterns to concrete guardrails and evaluation frameworks, you'll learn to implement AI responsibly with proper risk management."
      },
      {
        title: "Career-Ready Credential",
        description: "Graduate-level, transcripted, and stackable. The certificate aligns with most employer tuition benefits and provides a clear pathway to continue toward an MBA or M.Eng. degree."
      }
    ],
    
    // Program Details
    programDetails: [
      {
        value: "9 Credits",
        label: "3 Courses"
      },
      {
        value: "$5,250",
        label: "Total Cost"
      },
      {
        value: "16-24 Weeks",
        label: "Duration"
      },
      {
        value: "No Prereqs",
        label: "Required"
      },
      {
        value: "100%",
        label: "Online"
      }
    ],
    
    // Key Dates
    keyDates: [
      {
        label: "Early Submit",
        date: KEY_DATES.EARLY_SUBMIT.date
      },
      {
        label: "Priority Submit", 
        date: KEY_DATES.PRIORITY_SUBMIT.date
      },
      {
        label: "Final Submit",
        date: KEY_DATES.FINAL_SUBMIT.date
      },
      {
        label: "Start of Classes",
        date: KEY_DATES.START_OF_CLASSES.date
      }
    ],
    keyDatesNote: `*The Enterprise AI Certificate launches ${KEY_DATES.TERM.name}. Apply early to secure your spot in this inaugural cohort.`,
    
    // FAQ
    faqs: [
      {
        question: "How is this different from a bootcamp?",
        answer: "This is a graduate-level certificate with transcripted credit that stacks toward Stevens master's degrees. You'll gain governance and ethics rigor plus operational deliverables-not just demos. The curriculum is taught by PhD faculty with deep research and industry experience, and you'll earn credentials that employers recognize and value."
      },
      {
        question: "Do I need programming experience?",
        answer: "No. The certificate is designed to be accessible to professionals from all backgrounds. In PE 810, you'll use AI copilots to help write code, with template-first labs that scaffold your learning. The focus is on using AI to solve business problems, not on becoming a software developer."
      },
      {
        question: "Will this help with tuition reimbursement?",
        answer: "Often yes. The $5,250 total cost aligns perfectly with the IRS tax-free employer benefit limit that many companies offer ($5,250 per year). Stevens' enrollment team can help you navigate your specific company's reimbursement process and ensure you maximize available funding."
      },
      {
        question: "Can these credits count toward a master's degree?",
        answer: "Yes. All 9 credits are stackable toward existing Stevens graduate programs including the MBA and M.Eng. in Applied Data Science, subject to Registrar approval. This gives you flexibility to test the waters and continue toward a full degree if desired."
      },
      {
        question: "What's the time commitment?",
        answer: "Each course typically runs 8 weeks with online asynchronous content plus weekly live sessions. Expect 8-12 hours per week per course. You can take courses sequentially, allowing you to complete the entire certificate in as little as 24 weeks (about 6 months)."
      },
      {
        question: "What will I be able to do after completing the certificate?",
        answer: "You'll be able to: evaluate AI platforms and vendors, design GenAI proof-of-concepts with clear business value, build and deploy operational AI workflows with proper guardrails, and communicate AI strategies and results to stakeholders. These are the exact skills organizations need to move from AI experimentation to real value capture."
      }
    ],
    
    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription: "Schedule a call with our admissions team to discuss your goals and learn about the Enterprise AI Certificate program.",
    contactButtonText: "Schedule a Call"
  };

  return (
    <PageContextProvider pageType="explore" pageName="ExploreCertEnterpriseAI">
      <ProgramContextProvider 
        programCode="cert-eai"
        programName="Professional Graduate Certificate in Enterprise AI"
        programType="certificate"
      >
        <ExploreTemplate 
          {...certData}
          heroBottomContent={<TuitionCardsHero cards={[
            { value: "$5,250", label: "Total Certificate Cost" },
            { value: "$583", label: "Per Credit" }
          ]} />}
        />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreCertEnterpriseAI;

