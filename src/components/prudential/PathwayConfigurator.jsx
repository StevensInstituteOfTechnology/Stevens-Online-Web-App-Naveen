import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, GraduationCap, Calendar, ArrowRight, ArrowLeft,
  Check, Download, Clock, Award, TrendingUp, X
} from 'lucide-react';
import { ROLE_PRESETS, getPathwayProgression, PRUDENTIAL_DATA } from '@/data/prudential-pathways';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PATH_FORMATS = [
  { 
    id: 'private', 
    label: 'Private Cohort', 
    description: 'Dedicated cohort for Prudential team',
    features: ['Custom schedule', 'Dedicated faculty', 'Team collaboration']
  },
  { 
    id: 'open', 
    label: 'Open Enrollment', 
    description: 'Join public Stevens courses',
    features: ['Flexible start dates', 'Network with peers', 'Self-paced option']
  },
  { 
    id: 'blended', 
    label: 'Blended Approach', 
    description: 'Mix of private and open courses',
    features: ['Best of both', 'Cost optimized', 'Phased rollout']
  }
];

const PathwayConfigurator = ({ onAddToPath, pathItems, onRemoveFromPath }) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('foundation');
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [generatedPath, setGeneratedPath] = useState(null);

  // Format domain name for display
  const formatDomain = (domain) => {
    if (domain === 'ai') return 'AI';
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  };

  const handleGeneratePath = () => {
    if (!selectedRole || !selectedLevel || !selectedFormat) return;

    const progression = getPathwayProgression(selectedRole.domain, selectedLevel);
    const allPrograms = progression.flatMap(tier => tier.programs).slice(0, 5);
    
    const totalCredits = allPrograms.reduce((sum, p) => sum + (p.credits || 0), 0);
    const totalWeeks = Math.ceil(
      allPrograms.reduce((sum, p) => {
        const weeks = parseInt(p.duration) || 6;
        return sum + weeks;
      }, 0) / 1.5 // Assume some overlap
    );

    const path = {
      role: selectedRole,
      level: selectedLevel,
      format: selectedFormat,
      programs: allPrograms,
      timeline: `${totalWeeks} weeks`,
      credits: totalCredits,
      studyHours: totalCredits * 45, // 45 hours per credit
      badges: [selectedLevel],
      nextStep: selectedLevel === 'foundation' ? 'practitioner' : selectedLevel === 'practitioner' ? 'expert' : 'Graduate Degree'
    };

    setGeneratedPath(path);
  };

  const handleNext = () => {
    if (step === 1 && selectedRole) setStep(2);
    if (step === 2 && selectedLevel) setStep(3);
    if (step === 3 && selectedFormat) {
      handleGeneratePath();
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRole(null);
    setSelectedLevel('foundation');
    setSelectedFormat(null);
    setGeneratedPath(null);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white">Build Your Learning Path</h2>
        <p className="text-xl text-slate-100">
          Configure a personalized pathway in 3 steps
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">
            Step {step} of 4
          </span>
          <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-[#A32638] to-pink-600"
          />
        </div>
      </div>

      {/* Configurator Card */}
      <motion.div 
        layout
        className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-lg rounded-xl border border-slate-600/40 p-8 shadow-2xl min-h-[500px]"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Select Your Role</h3>
                  <p className="text-slate-100">Choose the role that best matches your team</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {ROLE_PRESETS.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedRole?.id === role.id
                        ? 'border-[#A32638] bg-[#A32638]/20'
                        : 'border-slate-600 bg-slate-700/80 hover:border-slate-500 hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="font-semibold mb-1 text-white">{role.label}</div>
                    <div className="text-sm text-slate-200">{formatDomain(role.domain)}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Level Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Choose Starting Level</h3>
                  <p className="text-slate-100">Select based on current expertise</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {['foundation', 'practitioner', 'expert'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedLevel === level
                        ? 'border-[#A32638] bg-[#A32638]/20'
                        : 'border-slate-600 bg-slate-700/80 hover:border-slate-500 hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-lg capitalize text-white">{level}</div>
                      <div className={`w-3 h-3 rounded-full ${
                        level === 'foundation' ? 'bg-green-400' :
                        level === 'practitioner' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                    </div>
                    <p className="text-sm text-slate-200">
                      {level === 'foundation' && 'Build fundamental skills and knowledge'}
                      {level === 'practitioner' && 'Apply skills to real-world scenarios'}
                      {level === 'expert' && 'Master advanced concepts and lead initiatives'}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Format Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Select Format</h3>
                  <p className="text-slate-100">How would you like to learn?</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {PATH_FORMATS.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format)}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedFormat?.id === format.id
                        ? 'border-[#A32638] bg-[#A32638]/20'
                        : 'border-slate-600 bg-slate-700/80 hover:border-slate-500 hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="font-bold text-lg mb-2 text-white">{format.label}</div>
                    <p className="text-sm text-slate-200 mb-3">{format.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {format.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="px-2 py-1 rounded bg-slate-600/50 text-xs text-slate-200"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Generated Path */}
          {step === 4 && generatedPath && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-white">Your Personalized Path</h3>
                  <p className="text-slate-100">
                    {generatedPath.role.label} • {generatedPath.level}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                  title="Start over"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <Clock className="w-4 h-4" />
                    Duration
                  </div>
                  <div className="text-xl font-bold text-white">{generatedPath.timeline}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <Award className="w-4 h-4" />
                    Credits
                  </div>
                  <div className="text-xl font-bold text-white">{generatedPath.credits}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    Study Hours
                  </div>
                  <div className="text-xl font-bold text-white">{generatedPath.studyHours}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    Programs
                  </div>
                  <div className="text-xl font-bold text-white">{generatedPath.programs.length}</div>
                </div>
              </div>

              {/* Program List */}
              <div className="mb-6">
                <h4 className="font-bold mb-3 text-white">Recommended Programs</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {generatedPath.programs.map((program, idx) => (
                    <div
                      key={program.id}
                      className="p-4 rounded-lg bg-slate-700/80 border border-slate-600/60 hover:border-slate-500/80 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-slate-300">
                              {idx + 1}.
                            </span>
                            <span className="font-semibold text-white">{program.title}</span>
                          </div>
                          <div className="text-sm text-slate-200">
                            {program.duration} • {program.credits} credits
                          </div>
                        </div>
                        <button
                          onClick={() => onAddToPath(program)}
                          className="px-3 py-1 rounded bg-stevens-maroon hover:bg-stevens-maroon-dark transition-colors text-sm font-semibold whitespace-nowrap text-white"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Step */}
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white">Next Level</span>
                </div>
                <p className="text-sm text-slate-100">
                  After completing this path, advance to{' '}
                  <span className="font-semibold text-white capitalize">{generatedPath.nextStep}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Mock PDF export
                    alert('PDF export feature coming soon! This will generate a detailed pathway plan with syllabi, timelines, and pricing.');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 font-semibold transition-all duration-200 text-white"
                >
                  <Download className="w-5 h-5" />
                  Export PDF
                </button>
                <button
                  onClick={() => {
                    generatedPath.programs.forEach(p => onAddToPath(p));
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#A32638] hover:bg-[#8B1F2E] font-semibold transition-all duration-200 text-white"
                >
                  <Check className="w-5 h-5" />
                  Add All to Path
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-600/30">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                step === 1
                  ? 'opacity-50 cursor-not-allowed bg-slate-700/50'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedRole) ||
                (step === 2 && !selectedLevel) ||
                (step === 3 && !selectedFormat)
              }
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                ((step === 1 && !selectedRole) ||
                  (step === 2 && !selectedLevel) ||
                  (step === 3 && !selectedFormat))
                  ? 'opacity-50 cursor-not-allowed bg-[#A32638]/50'
                  : 'bg-[#A32638] hover:bg-[#8B1F2E]'
              }`}
            >
              {step === 3 ? 'Generate Path' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PathwayConfigurator;

