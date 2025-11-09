import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { COMPLIANCE_STANDARDS } from '@/data/prudential-pathways';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ComplianceSection = () => {
  const [selectedStandard, setSelectedStandard] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">Compliance & Governance</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Built for Regulated Industries</h2>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto">
          Our curriculum aligns with critical frameworks for financial services and enterprise compliance
        </p>
      </motion.div>

      {/* Compliance Chips Grid */}
      <TooltipProvider>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {COMPLIANCE_STANDARDS.map((standard, index) => (
            <motion.div
              key={standard.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSelectedStandard(standard)}
                    className="w-full p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300 text-left group hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Shield className="w-6 h-6 text-blue-400" />
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{standard.name}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {standard.description}
                    </p>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-semibold mb-1">{standard.fullName}</p>
                  <p className="text-sm">{standard.description}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </TooltipProvider>

      {/* Evidence Kit CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-xl bg-gradient-to-br from-stevens-maroon/20 to-blue-900/20 border border-stevens-maroon/30"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-2">Evidence Kit for Audit Readiness</h3>
            <p className="text-gray-100">
              Sample syllabi, assessment rubrics, attendance reporting, and compliance mapping documentation
            </p>
          </div>
          <button
            onClick={() => alert('Evidence kit download feature coming soon!')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-stevens-maroon hover:bg-stevens-maroon-dark transition-colors font-semibold whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            Download Evidence Kit
          </button>
        </div>
      </motion.div>

      {/* Standards Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 grid md:grid-cols-3 gap-6"
      >
        <div className="p-6 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all">
          <div className="text-4xl font-bold text-stevens-maroon mb-2">100%</div>
          <div className="text-sm text-gray-100">Programs mapped to relevant standards</div>
        </div>
        <div className="p-6 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all">
          <div className="text-4xl font-bold text-stevens-maroon mb-2">4</div>
          <div className="text-sm text-gray-100">Critical frameworks covered</div>
        </div>
        <div className="p-6 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all">
          <div className="text-4xl font-bold text-stevens-maroon mb-2">50+</div>
          <div className="text-sm text-gray-100">Control families addressed</div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplianceSection;

