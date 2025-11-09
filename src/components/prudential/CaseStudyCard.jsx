import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Minus, Quote } from 'lucide-react';

const CaseStudyCard = ({ study }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-green-400" />;
      default:
        return <Minus className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl border border-slate-600/30 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
            {study.industry}
          </div>
          <h3 className="text-xl font-bold mb-2">{study.title}</h3>
        </div>

        {/* Scenario */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-slate-300 mb-2">CHALLENGE</div>
          <p className="text-sm text-slate-100 leading-relaxed">
            {study.scenario}
          </p>
        </div>

        {/* Intervention */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-slate-300 mb-2">SOLUTION</div>
          <p className="text-sm text-slate-100 leading-relaxed">
            {study.intervention}
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-slate-300 mb-3">OUTCOMES</div>
          <div className="grid grid-cols-2 gap-3">
            {study.outcome.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-700/50 border border-slate-600/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getTrendIcon(metric.trend)}
                  <span className="text-lg font-bold">{metric.value}</span>
                </div>
                <div className="text-xs text-slate-100">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="p-4 rounded-lg bg-stevens-maroon/10 border border-stevens-maroon/30">
          <Quote className="w-5 h-5 text-stevens-maroon mb-2" />
          <p className="text-sm italic text-slate-100 mb-2">
            "{study.outcome.quote}"
          </p>
          <p className="text-xs text-slate-300">— {study.outcome.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;

