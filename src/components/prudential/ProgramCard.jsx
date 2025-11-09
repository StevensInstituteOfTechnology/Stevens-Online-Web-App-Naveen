import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Award, Check, Plus, BookOpen, Shield, X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { COMPLIANCE_STANDARDS } from '@/data/prudential-pathways';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { trackProgramModalOpen, trackAddToPath } from '@/utils/prudentialAnalytics';

const ProgramCard = ({ program, onAddToPath, isInPath = false, onRemoveFromPath }) => {
  const [showSyllabus, setShowSyllabus] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Get full standard details
  const getStandardDetails = (standardId) => {
    return COMPLIANCE_STANDARDS.find(s => s.id === standardId);
  };

  const handleTogglePath = () => {
    if (isInPath && onRemoveFromPath) {
      onRemoveFromPath(program.id);
    } else {
      trackAddToPath(program.id);
      onAddToPath(program);
    }
  };

  const handleOpenModal = () => {
    trackProgramModalOpen(program.id);
    setShowSyllabus(true);
  };

  // Level badge config - functional enterprise colors
  const levelConfig = {
    foundation: {
      color: 'bg-emerald-600 text-white',
      label: 'Foundation',
      icon: '🌱'
    },
    practitioner: {
      color: 'bg-indigo-600 text-white',
      label: 'Practitioner',
      icon: '⚡'
    },
    expert: {
      color: 'bg-amber-600 text-white',
      label: 'Expert',
      icon: '🎯'
    }
  };

  const levelStyle = levelConfig[program.level] || levelConfig.foundation;

  return (
    <>
      <motion.div
        whileHover={shouldReduceMotion ? {} : { 
          y: -4,
          zIndex: 10,
          transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full group relative"
      >
        <div 
          className="relative h-full min-h-[320px] bg-slate-800 border border-slate-600 rounded-lg overflow-hidden flex flex-col hover:shadow-xl hover:border-slate-500 transition-all duration-300"
        >
          {/* Card Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Level Badge */}
            <div className="mb-3">
              <div className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold ${levelStyle.color}`}>
                {levelStyle.label}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-snug text-slate-50">
              {program.title}
            </h3>

            {/* Meta Info Row */}
            <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {program.duration}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                {program.credits} credits
              </span>
            </div>

            {/* Program Details - Always Visible */}
            <div className="space-y-3">
              {/* Standards Chips */}
              {program.standards && program.standards.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {program.standards.slice(0, 2).map((standardId, idx) => {
                    const standard = getStandardDetails(standardId);
                    const chipColors = [
                      'bg-blue-600',
                      'bg-purple-600',
                      'bg-green-600',
                      'bg-orange-600'
                    ];
                    return standard ? (
                      <span
                        key={standardId}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${chipColors[idx % chipColors.length]} text-white`}
                        title={standard.fullName}
                      >
                        <Shield className="w-3 h-3" aria-hidden="true" />
                        {standard.name}
                      </span>
                    ) : null;
                  })}
                </div>
              )}

              {/* Key Outcomes - Show 2 */}
              {program.outcomes && program.outcomes.length > 0 && (
                <div className="space-y-2">
                  {program.outcomes.slice(0, 2).map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{outcome}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modality Badge */}
            <div className="mt-auto pt-3">
              <span className="inline-block px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                {program.modality}
              </span>
            </div>
          </div>

          {/* Actions - Always Visible */}
          <div className="flex p-4 pt-0 gap-2 border-t border-slate-700">
            <motion.button
              onClick={handleOpenModal}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 border border-slate-600"
              whileTap={{ scale: 0.95 }}
              aria-label={`View syllabus for ${program.title}`}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              Details
            </motion.button>
            <motion.button
              onClick={handleTogglePath}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md text-xs font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white ${
                isInPath 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
                  : 'bg-[#A32638] hover:bg-[#8B1F2E] text-white'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label={isInPath ? `Remove ${program.title} from path` : `Add ${program.title} to path`}
            >
              {isInPath ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  Add to path
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Professional Syllabus Modal */}
      <Dialog open={showSyllabus} onOpenChange={setShowSyllabus}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-800 text-white border border-slate-600">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold flex items-center gap-2 text-white">
              <div className={`w-2 h-2 rounded-full ${levelStyle.dot}`} />
              {program.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Program Info Grid */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/30">
              <div>
                  <div className="text-xs text-slate-300 mb-1 uppercase tracking-wide">Duration</div>
                <div className="text-sm font-medium text-white">{program.duration}</div>
              </div>
              <div>
                  <div className="text-xs text-slate-300 mb-1 uppercase tracking-wide">Credits</div>
                <div className="text-sm font-medium text-white">{program.credits} credits</div>
              </div>
              <div>
                  <div className="text-xs text-slate-300 mb-1 uppercase tracking-wide">Format</div>
                <div className="text-sm font-medium text-white">{program.modality}</div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-white">Learning Outcomes</h3>
              <div className="space-y-2.5">
                {program.outcomes?.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-white pl-1">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Outline */}
            {program.syllabus && (
              <div>
                <h3 className="text-base font-semibold mb-3 text-white">Course Outline</h3>
                <div className="space-y-2">
                  {program.syllabus.weeks?.map((week, idx) => (
                    <div key={idx} className="p-3 bg-slate-700/40 rounded-md border border-slate-600/30">
                      <p className="text-sm text-white">{week}</p>
                    </div>
                  ))}
                  {program.syllabus.project && (
                    <div className="p-3 bg-stevens-maroon/10 border border-stevens-maroon/20 rounded-md">
                      <div className="text-xs font-medium text-stevens-maroon mb-1 uppercase tracking-wide">
                        Capstone Project
                      </div>
                      <p className="text-sm text-white">{program.syllabus.project}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Standards Alignment with Solid Backgrounds */}
            {program.standards && program.standards.length > 0 && (
              <div className="p-4 bg-slate-700 border-2 border-purple-500/30 rounded-lg">
                <div className="text-xs font-bold text-white mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" aria-hidden="true" />
                  Compliance & Standards Alignment
                </div>
                <div className="space-y-3">
                  {program.standards.map((standardId, idx) => {
                    const standard = getStandardDetails(standardId);
                    const chipColors = [
                      'bg-blue-600',
                      'bg-purple-600',
                      'bg-green-600',
                      'bg-orange-600'
                    ];
                    return standard ? (
                      <div key={standardId} className="flex items-start gap-2">
                        <div className={`${chipColors[idx % chipColors.length]} p-1.5 rounded flex-shrink-0`}>
                          <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{standard.fullName}</div>
                          <div className="text-xs text-slate-200 mt-0.5">{standard.description}</div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Stackability */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-xs font-medium text-blue-300 mb-2 uppercase tracking-wide">
                Career Pathway
              </div>
              <p className="text-sm text-white">{program.stacksTo}</p>
            </div>

            {/* Modal Actions - Simple Maroon Accent */}
            <div className="flex gap-3 pt-2">
              <motion.button
                onClick={() => {
                  handleTogglePath();
                  setShowSyllabus(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-lg font-bold text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${
                  isInPath 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-[#A32638] hover:bg-[#8B1F2E]'
                }`}
                whileHover={!shouldReduceMotion ? { y: -1 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                aria-label={isInPath ? 'Remove program from path and close' : 'Add program to path and close'}
              >
                {isInPath ? (
                  <>
                    <X className="w-5 h-5" aria-hidden="true" />
                    Remove from Path
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    Add to Path
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={() => setShowSyllabus(false)}
                className="px-6 py-4 rounded-lg bg-slate-700 border-2 border-slate-600 hover:border-slate-500 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
                whileHover={shouldReduceMotion ? {} : { y: -1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                aria-label="Close syllabus modal"
              >
                Close
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProgramCard;

ProgramCard.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    level: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.string,
    credits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    modality: PropTypes.string,
    outcomes: PropTypes.arrayOf(PropTypes.string),
    stacksTo: PropTypes.string,
    standards: PropTypes.arrayOf(PropTypes.string),
    isRealProgram: PropTypes.bool,
    syllabus: PropTypes.shape({
      weeks: PropTypes.arrayOf(PropTypes.string),
      project: PropTypes.string,
    }),
  }).isRequired,
  onAddToPath: PropTypes.func.isRequired,
  isInPath: PropTypes.bool,
  onRemoveFromPath: PropTypes.func,
};
