import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LeaderCTA = ({ pathItems = [] }) => {
  const [showWizard, setShowWizard] = useState(false);
  const [formData, setFormData] = useState({
    headcount: '',
    startDate: '',
    businessUnit: '',
    priority: 'cybersecurity'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock SOW generation
    alert(`SOW Draft Generated!\n\nCohort Size: ${formData.headcount}\nStart Date: ${formData.startDate}\nBusiness Unit: ${formData.businessUnit}\nPriority Domain: ${formData.priority}\nSelected Programs: ${pathItems.length}\n\nA PDF would be generated here with full scope, timeline, pricing, and reporting cadence.`);
    setShowWizard(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="h-full p-8 rounded-xl bg-gradient-to-br from-stevens-maroon/20 to-red-900/20 border border-stevens-maroon/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">For Leaders & L&D</h3>
              <p className="text-slate-100 text-sm">Design your team's upskilling journey</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1 text-white">Private Cohorts</div>
                <p className="text-sm text-slate-100">
                  Dedicated groups with custom schedules and Prudential-specific case studies
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1 text-white">Manager Dashboards</div>
                <p className="text-sm text-slate-100">
                  Track progress, approvals, skills verified, and completion rates
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1 text-white">Governance & Reporting</div>
                <p className="text-sm text-slate-100">
                  Compliance documentation, audit trails, and ROI metrics
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setShowWizard(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-stevens-maroon hover:bg-stevens-maroon-dark transition-all duration-200 font-semibold text-lg text-white"
            >
              <Calendar className="w-5 h-5" />
              Design Your Cohort
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert('Sample SOW download feature coming soon!')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 font-semibold text-white shadow-md"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <FileText className="w-5 h-5" />
              Get Sample SOW
            </button>
          </div>

          {pathItems.length > 0 && (
            <div className="mt-6 p-4 rounded-lg bg-slate-700/10 border border-slate-600/20 shadow-lg" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
              <div className="text-sm font-semibold mb-2 text-white">Your Selection</div>
              <div className="text-2xl font-bold text-stevens-maroon">
                {pathItems.length} {pathItems.length === 1 ? 'program' : 'programs'}
              </div>
              <div className="text-sm text-slate-100">
                {pathItems.reduce((sum, p) => sum + (p.credits || 0), 0)} total credits
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Cohort Design Wizard */}
      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-2xl bg-slate-800 text-white border-slate-600">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Design Your Cohort</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cohort Size (Headcount)
              </label>
              <input
                type="number"
                value={formData.headcount}
                onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/10 border border-slate-600/20 focus:border-[#A32638] focus:outline-none transition-colors"
                placeholder="e.g., 25"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Preferred Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/10 border border-slate-600/20 focus:border-[#A32638] focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Business Unit / Team
              </label>
              <input
                type="text"
                value={formData.businessUnit}
                onChange={(e) => setFormData({ ...formData, businessUnit: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/10 border border-slate-600/20 focus:border-[#A32638] focus:outline-none transition-colors"
                placeholder="e.g., Cloud Security Engineering"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Priority Domain
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/10 border border-slate-600/20 focus:border-[#A32638] focus:outline-none transition-colors"
              >
                <option value="cybersecurity">Cybersecurity</option>
                <option value="ai">AI Engineering & Management</option>
                <option value="software">Software Development & SDLC</option>
                <option value="manager">Leadership & Management</option>
              </select>
            </div>

            {pathItems.length > 0 && (
              <div className="p-4 rounded-lg bg-stevens-maroon/10 border border-stevens-maroon/30">
                <div className="font-semibold mb-2 text-white">Selected Programs ({pathItems.length})</div>
                <div className="text-sm text-slate-100">
                  {pathItems.slice(0, 3).map(p => p.title).join(', ')}
                  {pathItems.length > 3 && ` and ${pathItems.length - 3} more`}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowWizard(false)}
                className="flex-1 px-6 py-3 rounded-lg bg-slate-700/10 hover:bg-slate-700/20 border border-slate-600/10 font-semibold transition-all duration-200 text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-stevens-maroon hover:bg-stevens-maroon-dark font-semibold transition-all duration-200 text-white"
              >
                <FileText className="w-5 h-5" />
                Generate SOW Draft
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeaderCTA;

