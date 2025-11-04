import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DollarSign, TrendingUp, Award, Banknote, ArrowRight } from 'lucide-react';
import RequestInfoModal from '../components/shared/RequestInfoModal';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';

export default function TuitionOutcomes() {
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);

  const roiPoints = [
  {
    icon: TrendingUp,
    title: "Top 15% for ROI",
    description: "Payscale ranks Stevens in the top 15% of colleges for return on investment."
  },
  {
    icon: DollarSign,
    title: "$175,900 Mid-Career Salary",
    description: "Our graduates report high earnings, reflecting the value of a Stevens degree."
  },
  {
    icon: Award,
    title: "97% Career Placement",
    description: "Within six months of graduation, the vast majority of our students secure their desired outcomes."
  }];


  return (
    <div>
      <PageHero
        title="Tuition & Career Outcomes"
        subtitle="An investment in a Stevens degree is an investment in your future." />

      
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl grid stevens-md:grid-cols-2 gap-stevens-xl items-center">
            <div>
                 <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md">Tuition for Online Programs</h2>
                 <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed mb-stevens-lg">
                    We are committed to providing a clear and transparent overview of the costs associated with our world-class online programs. Tuition for all online master's programs is calculated on a per-credit-hour basis.
                 </p>
                 <Card className="bg-stevens-gray-50 border-stevens-gray-200 rounded-stevens-md">
                    <CardContent className="p-stevens-lg pt-stevens-lg text-center">
                        <p className="text-stevens-gray-600 text-stevens-lg">2025-2026 Academic Year</p>
                        <p className="font-stevens-display text-stevens-5xl font-stevens-bold text-stevens-primary my-stevens-sm">$1,993</p>
                        <p className="text-stevens-gray-600 text-stevens-lg">per credit hour</p>
                        <p className="text-stevens-sm text-stevens-gray-500 mt-stevens-md">Most master's programs require 30 credits for completion. For detailed cost breakdowns and university fees, please visit the official Student Accounts page.</p>
                    </CardContent>
                 </Card>
            </div>
            <div>
                <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold mb-stevens-md">Financing Your Education</h3>
                <p className="text-stevens-gray-600 mb-stevens-lg">Our Office of Financial Aid is dedicated to helping you find the resources you need to finance your education. Options include:</p>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3"><Banknote className="w-6 h-6 text-green-600 mt-1" /><div><span className="font-semibold">Federal Loans:</span> Eligible students can apply for federal student loans by completing the FAFSA.</div></li>
                    <li className="flex items-start gap-3"><Banknote className="w-6 h-6 text-green-600 mt-1" /><div><span className="font-semibold">Employer Tuition Assistance:</span> Many companies offer tuition reimbursement. Check with your HR department.</div></li>
                    <li className="flex items-start gap-3"><Banknote className="w-6 h-6 text-green-600 mt-1" /><div><span className="font-semibold">Private Loans:</span> A variety of private lenders offer student loans to cover educational costs.</div></li>
                </ul>
            </div>
        </div>
      </div>
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="text-center mb-12">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">A Degree That Delivers Results</h2>
            <p className="text-stevens-xl text-stevens-gray-600">Stevens is consistently recognized for delivering an outstanding return on investment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {roiPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Card key={index} className="text-center bg-stevens-white shadow-stevens-lg border-0 rounded-stevens-md">
                    <CardContent className="p-stevens-lg pt-stevens-lg">
                        <Icon className="w-12 h-12 text-stevens-primary mx-auto mb-stevens-md" />
                        <h3 className="font-stevens-display text-stevens-xl font-stevens-bold mb-stevens-sm">{point.title}</h3>
                        <p className="text-stevens-gray-600">{point.description}</p>
                    </CardContent>
                 </Card>);

            })}
          </div>
        </div>
      </div>

       <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
          <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md">Ready to Invest in Yourself?</h2>
          <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed mb-stevens-lg">
            Take the next step. Apply now or connect with an admissions advisor to discuss your future at Stevens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://gradadmissions.stevens.edu/apply/?pk=GRNP" target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.APPLY_NOW)}>
                    <Button className="btn-secondary px-8 py-3 text-lg">Apply Now</Button>
                </a>
                <Button 
                  variant="outline" 
                  className="btn-outline-maroon px-8 py-3 text-lg"
                  onClick={() => {
                    trackConversion(CONVERSION_LABELS.REQUEST_INFO);
                    setShowRequestInfoModal(true);
                  }}
                >
                  Request Information
                </Button>
           </div>
        </div>
      </div>

      {/* Request Info Modal */}
      <RequestInfoModal 
        isOpen={showRequestInfoModal}
        onClose={() => setShowRequestInfoModal(false)}
        sourcePage="tuition_outcomes_page"
        programOfInterest=""
      />
    </div>);

}