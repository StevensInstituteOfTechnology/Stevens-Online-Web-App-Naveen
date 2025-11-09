import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Calendar, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const EmployeeCTA = ({ pathItems = [] }) => {
  const [showTuitionInfo, setShowTuitionInfo] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="h-full p-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">For Employees</h3>
              <p className="text-gray-400 text-sm">Build your skills, advance your career</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Tuition Benefits</div>
                <p className="text-sm text-gray-400">
                  Eligible courses may be covered by Prudential's tuition reimbursement program
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Flexible Scheduling</div>
                <p className="text-sm text-gray-400">
                  Live online and asynchronous options fit your work schedule
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Career Advancement</div>
                <p className="text-sm text-gray-400">
                  Stackable credentials toward certificates and graduate degrees
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setShowTuitionInfo(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-semibold text-lg"
            >
              <DollarSign className="w-5 h-5" />
              Check Tuition Benefits
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert('Advisor scheduling feature coming soon!')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200 font-semibold"
            >
              <Phone className="w-5 h-5" />
              Talk to an Advisor
            </button>
          </div>

          {pathItems.length > 0 && (
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm font-semibold mb-2">Your Learning Path</div>
              <div className="text-2xl font-bold text-blue-400">
                {pathItems.length} {pathItems.length === 1 ? 'course' : 'courses'}
              </div>
              <div className="text-sm text-gray-400">
                ~{Math.ceil(pathItems.reduce((sum, p) => sum + (parseInt(p.duration) || 6), 0) / 1.5)} weeks total
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tuition Benefits Info */}
      <Dialog open={showTuitionInfo} onOpenChange={setShowTuitionInfo}>
        <DialogContent className="max-w-2xl bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Prudential Tuition Benefits</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Benefit Overview */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold">$5,250 / Year</div>
                  <div className="text-sm text-gray-400">IRS Tax-Free Tuition Benefit</div>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Prudential offers up to $5,250 per year in tax-free tuition reimbursement for approved programs. 
                Many Stevens courses are designed to align with this benefit.
              </p>
            </div>

            {/* How It Works */}
            <div>
              <h3 className="font-bold text-lg mb-3">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stevens-maroon flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Select Your Courses</div>
                    <p className="text-sm text-gray-400">
                      Choose programs from your personalized path that fit your career goals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stevens-maroon flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Get Manager Approval</div>
                    <p className="text-sm text-gray-400">
                      Submit through Prudential's tuition benefit portal for approval
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stevens-maroon flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Enroll & Learn</div>
                    <p className="text-sm text-gray-400">
                      Complete your courses with Stevens' expert faculty and hands-on projects
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stevens-maroon flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Get Reimbursed</div>
                    <p className="text-sm text-gray-400">
                      Submit grades and receipts for reimbursement upon successful completion
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Cost Breakdown */}
            {pathItems.length > 0 && (
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-bold mb-3">Your Path Cost Estimate</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Credits:</span>
                    <span className="font-semibold">
                      {pathItems.reduce((sum, p) => sum + (p.credits || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Est. Cost ($1,850/credit):</span>
                    <span className="font-semibold">
                      ${(pathItems.reduce((sum, p) => sum + (p.credits || 0), 0) * 1850).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span>Annual Benefit:</span>
                    <span className="font-semibold text-green-400">-$5,250</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-2">
                    <span>Your Cost (Year 1):</span>
                    <span>
                      ${Math.max(0, (pathItems.reduce((sum, p) => sum + (p.credits || 0), 0) * 1850) - 5250).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowTuitionInfo(false)}
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 font-semibold transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={() => alert('Application portal link coming soon!')}
                className="flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-200"
              >
                Start Application
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeCTA;

