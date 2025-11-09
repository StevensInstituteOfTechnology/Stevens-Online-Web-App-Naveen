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
        <h2 className="text-4xl font-bold mb-4">Build Your Learning Path</h2>
        <p className="text-xl text-gray-400">
          Configure a personalized pathway in 3 steps
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">
            Step {step} of 4
          </span>
          <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-stevens-maroon to-purple-600"
          />
        </div>
      </div>

      {/* Configurator Card */}
      <motion.div 
        layout
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl border border-white/20 p-8 shadow-2xl min-h-[500px]"
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
                  <h3 className="text-2xl font-bold">Select Your Role</h3>
                  <p className="text-gray-400">Choose the role that best matches your team</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {ROLE_PRESETS.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedRole?.id === role.id
                        ? 'border-stevens-maroon bg-stevens-maroon/10'
                        : 'border-white/10 bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-semibold mb-1">{role.label}</div>
                    <div className="text-sm text-gray-400 capitalize">{role.domain}</div>
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
                  <h3 className="text-2xl font-bold">Choose Starting Level</h3>
                  <p className="text-gray-400">Select based on current expertise</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {['foundation', 'practitioner', 'expert'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedLevel === level
                        ? 'border-stevens-maroon bg-stevens-maroon/10'
                        : 'border-white/10 bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-lg capitalize">{level}</div>
                      <div className={`w-3 h-3 rounded-full ${
                        level === 'foundation' ? 'bg-green-400' :
                        level === 'practitioner' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                    </div>
                    <p className="text-sm text-gray-400">
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
                  <h3 className="text-2xl font-bold">Select Format</h3>
                  <p className="text-gray-400">How would you like to learn?</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {PATH_FORMATS.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format)}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedFormat?.id === format.id
                        ? 'border-stevens-maroon bg-stevens-maroon/10'
                        : 'border-white/10 bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="font-bold text-lg mb-2">{format.label}</div>
                    <p className="text-sm text-gray-400 mb-3">{format.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {format.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="px-2 py-1 rounded bg-white/10 text-xs"
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
                  <h3 className="text-2xl font-bold mb-1">Your Personalized Path</h3>
                  <p className="text-gray-400">
                    {generatedPath.role.label} • {generatedPath.level}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
                  title="Start over"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    Duration
                  </div>
                  <div className="text-xl font-bold">{generatedPath.timeline}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <Award className="w-4 h-4" />
                    Credits
                  </div>
                  <div className="text-xl font-bold">{generatedPath.credits}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    Study Hours
                  </div>
                  <div className="text-xl font-bold">{generatedPath.studyHours}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    Programs
                  </div>
                  <div className="text-xl font-bold">{generatedPath.programs.length}</div>
                </div>
              </div>

              {/* Program List */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Recommended Programs</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {generatedPath.programs.map((program, idx) => (
                    <div
                      key={program.id}
                      className="p-4 rounded-lg bg-white/10 border border-white/20 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-400">
                              {idx + 1}.
                            </span>
                            <span className="font-semibold">{program.title}</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {program.duration} • {program.credits} credits
                          </div>
                        </div>
                        <button
                          onClick={() => onAddToPath(program)}
                          className="px-3 py-1 rounded bg-stevens-maroon hover:bg-stevens-maroon-dark transition-colors text-sm font-semibold whitespace-nowrap"
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
                  <span className="font-bold">Next Level</span>
                </div>
                <p className="text-sm text-gray-300">
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
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 font-semibold transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  Export PDF
                </button>
                <button
                  onClick={() => {
                    generatedPath.programs.forEach(p => onAddToPath(p));
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-stevens-maroon hover:bg-stevens-maroon-dark font-semibold transition-all duration-200"
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
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                step === 1
                  ? 'opacity-50 cursor-not-allowed bg-white/10'
                  : 'bg-white/15 hover:bg-white/25'
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
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                ((step === 1 && !selectedRole) ||
                  (step === 2 && !selectedLevel) ||
                  (step === 3 && !selectedFormat))
                  ? 'opacity-50 cursor-not-allowed bg-stevens-maroon/50'
                  : 'bg-stevens-maroon hover:bg-stevens-maroon-dark'
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

