import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, GraduationCap, Check, X, BookOpen, Award, Clock, TrendingUp,
  ArrowRight, ArrowLeft, Info, Plus, Lock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  PILLARS,
  TRACKS,
  CERTIFICATE_STAGES,
  PATHWAY_COURSES,
  LEVEL_ORDER,
  PILLAR_LABELS,
  LEVEL_LABELS,
  RECOMMENDED_LEARNING_ORDER
} from '@/data/pathway-builder-data';

const PathwayBuilder = ({ onAddToPath, pathItems, onRemoveFromPath }) => {
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [stage1Courses, setStage1Courses] = useState([]);
  const [stage2Courses, setStage2Courses] = useState([]);
  const [stage3Courses, setStage3Courses] = useState([]);
  const [showCourseDetail, setShowCourseDetail] = useState(null);

  // When track is selected, set the corresponding pillar
  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    const pillar = PILLARS.find(p => p.id === track.pillar);
    setSelectedPillar(pillar);
  };

  // Get current stage courses based on step
  const getCurrentStageCourses = () => {
    if (step === 2) return stage1Courses;
    if (step === 3) return stage2Courses;
    if (step === 4) return stage3Courses;
    return [];
  };

  // Set current stage courses
  const setCurrentStageCourses = (courses) => {
    if (step === 2) setStage1Courses(courses);
    if (step === 3) setStage2Courses(courses);
    if (step === 4) setStage3Courses(courses);
  };

  // Toggle course for current stage
  const toggleCourseForStage = (course) => {
    const currentCourses = getCurrentStageCourses();
    const isSelected = currentCourses.some(c => c.id === course.id);
    
    let newCourses;
    if (isSelected) {
      newCourses = currentCourses.filter(c => c.id !== course.id);
    } else {
      // Check if adding this course would exceed limits
      const tempCourses = [...currentCourses, course];
      const tempCredits = tempCourses.reduce((sum, c) => sum + c.credits, 0);
      
      if (step === 2) {
        // Stage 1: Allow up to required courses and credits
        if (tempCourses.length > CERTIFICATE_STAGES.stage1.requiredCourses ||
            tempCredits > CERTIFICATE_STAGES.stage1.requiredCredits) {
          return; // Don't add if exceeds limit
        }
      } else if (step === 3) {
        // Stage 2: Allow up to required courses and credits
        if (tempCourses.length > CERTIFICATE_STAGES.stage2.requiredCourses ||
            tempCredits > CERTIFICATE_STAGES.stage2.requiredCredits) {
          return; // Don't add if exceeds limit
        }
      } else if (step === 4) {
        // Stage 3: Allow up to required courses and credits
        if (tempCourses.length > CERTIFICATE_STAGES.stage3.requiredCourses ||
            tempCredits > CERTIFICATE_STAGES.stage3.requiredCredits) {
          return; // Don't add if exceeds limit
        }
      }
      
      newCourses = tempCourses;
    }
    
    setCurrentStageCourses(newCourses);
    
    // Update main selected courses
    const allSelected = [...stage1Courses, ...stage2Courses, ...stage3Courses]
      .filter(c => !currentCourses.some(cc => cc.id === c.id))
      .concat(newCourses);
    setSelectedCourses(allSelected);
    
    // Sync with parent component
    if (isSelected) {
      if (onRemoveFromPath) onRemoveFromPath(course.id);
    } else {
      if (onAddToPath) onAddToPath(course);
    }
  };

  // Check if can proceed to next step
  const canProceedToNextStep = () => {
    if (step === 2) {
      const credits = stage1Courses.reduce((sum, c) => sum + c.credits, 0);
      return stage1Courses.length === CERTIFICATE_STAGES.stage1.requiredCourses &&
        credits === CERTIFICATE_STAGES.stage1.requiredCredits;
    }
    if (step === 3) {
      const credits = stage2Courses.reduce((sum, c) => sum + c.credits, 0);
      return stage2Courses.length === CERTIFICATE_STAGES.stage2.requiredCourses &&
        credits === CERTIFICATE_STAGES.stage2.requiredCredits;
    }
    if (step === 4) {
      const credits = stage3Courses.reduce((sum, c) => sum + c.credits, 0);
      return stage3Courses.length === CERTIFICATE_STAGES.stage3.requiredCourses &&
        credits === CERTIFICATE_STAGES.stage3.requiredCredits;
    }
    return false;
  };

  // Calculate current stage based on selected courses
  const getCurrentStage = () => {
    if (!selectedPillar) return null;
    
    const pillarCourses = selectedCourses.filter(c => c.pillars.includes(selectedPillar.id));
    const stage1Courses = pillarCourses.filter(c => c.certificates.includes('professional-graduate'));
    const stage2Courses = pillarCourses.filter(c => c.certificates.includes('graduate'));
    
    // Check Stage 1 completion
    const stage1Complete = stage1Courses.length >= CERTIFICATE_STAGES.stage1.requiredCourses &&
      stage1Courses.reduce((sum, c) => sum + c.credits, 0) >= CERTIFICATE_STAGES.stage1.requiredCredits;
    
    // Check Stage 2 completion
    const stage2Complete = stage2Courses.length >= CERTIFICATE_STAGES.stage2.requiredCourses &&
      stage2Courses.reduce((sum, c) => sum + c.credits, 0) >= CERTIFICATE_STAGES.stage2.requiredCredits;
    
    if (!stage1Complete) return 'stage1';
    if (!stage2Complete) return 'stage2';
    return 'stage3';
  };

  // Get available courses for current step
  const getAvailableCoursesForStep = () => {
    if (!selectedPillar) return [];
    
    // Get all courses already selected in any stage
    const allSelectedCourseIds = [...stage1Courses, ...stage2Courses, ...stage3Courses]
      .map(c => c.id);
    
    if (step === 2) {
      // Stage 1: Professional Graduate Certificate courses
      return PATHWAY_COURSES.filter(c => 
        c.pillars.includes(selectedPillar.id) &&
        c.certificates.includes('professional-graduate') &&
        !allSelectedCourseIds.includes(c.id) // Exclude already selected courses
      );
    } else if (step === 3) {
      // Stage 2: Graduate Certificate courses
      const pillarCourses = PATHWAY_COURSES.filter(c => 
        c.pillars.includes(selectedPillar.id) &&
        c.certificates.includes('graduate') &&
        !allSelectedCourseIds.includes(c.id) // Exclude already selected courses
      );
      // Prioritize cross-pillar courses
      const crossPillar = pillarCourses.filter(c => c.pillars.length > 1);
      const regular = pillarCourses.filter(c => c.pillars.length === 1);
      return [...crossPillar, ...regular];
    } else if (step === 4) {
      // Stage 3: All courses including manager courses, but exclude already selected
      return PATHWAY_COURSES.filter(c => 
        !allSelectedCourseIds.includes(c.id) // Exclude already selected courses
      );
    }
    return [];
  };

  // Group courses by pillar and level
  const groupCoursesByPillarAndLevel = (courses) => {
    const grouped = {};
    
    courses.forEach(course => {
      course.pillars.forEach(pillar => {
        if (!grouped[pillar]) {
          grouped[pillar] = {};
        }
        if (!grouped[pillar][course.level]) {
          grouped[pillar][course.level] = [];
        }
        // Avoid duplicates
        if (!grouped[pillar][course.level].some(c => c.id === course.id)) {
          grouped[pillar][course.level].push(course);
        }
      });
    });

    // Sort courses within each level
    Object.keys(grouped).forEach(pillar => {
      Object.keys(grouped[pillar]).forEach(level => {
        grouped[pillar][level].sort((a, b) => a.title.localeCompare(b.title));
      });
    });

    return grouped;
  };

  // Course Selection Area Component
  const CourseSelectionArea = ({ groupedCourses, orderedPillars, selectedPillar, currentStageCourses, toggleCourse, setShowCourseDetail, step }) => {
    // Calculate current stage progress info
    const getCurrentStageInfo = () => {
      if (step === 2) {
        const currentCredits = currentStageCourses.reduce((sum, c) => sum + c.credits, 0);
        return {
          stageName: CERTIFICATE_STAGES.stage1.name,
          currentCourses: currentStageCourses.length,
          requiredCourses: CERTIFICATE_STAGES.stage1.requiredCourses,
          currentCredits,
          requiredCredits: CERTIFICATE_STAGES.stage1.requiredCredits,
        };
      } else if (step === 3) {
        const currentCredits = currentStageCourses.reduce((sum, c) => sum + c.credits, 0);
        return {
          stageName: CERTIFICATE_STAGES.stage2.name,
          currentCourses: currentStageCourses.length,
          requiredCourses: CERTIFICATE_STAGES.stage2.requiredCourses,
          currentCredits,
          requiredCredits: CERTIFICATE_STAGES.stage2.requiredCredits,
        };
      } else if (step === 4) {
        const currentCredits = currentStageCourses.reduce((sum, c) => sum + c.credits, 0);
        return {
          stageName: CERTIFICATE_STAGES.stage3.name,
          currentCourses: currentStageCourses.length,
          requiredCourses: CERTIFICATE_STAGES.stage3.requiredCourses,
          currentCredits,
          requiredCredits: CERTIFICATE_STAGES.stage3.requiredCredits,
        };
      }
      return null;
    };

    const stageInfo = getCurrentStageInfo();
    
    // Check if limit is reached
    const limitReached = stageInfo && (
      currentStageCourses.length >= stageInfo.requiredCourses ||
      currentStageCourses.reduce((sum, c) => sum + c.credits, 0) >= stageInfo.requiredCredits
    );

    return (
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Selection Area */}
        <div className="lg:col-span-2 space-y-6 max-h-[600px] overflow-y-auto pr-2">
          {orderedPillars.map(pillar => {
            const pillarGroup = groupedCourses[pillar.id];
            if (!pillarGroup) return null;

            const isSelectedPillar = pillar.id === selectedPillar?.id;
            const hasCrossPillarCourses = step === 3 && 
              Object.values(pillarGroup).flat().some(c => c.pillars.length > 1);

            return (
              <div key={pillar.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className={`text-xl font-bold border-b pb-2 ${
                    isSelectedPillar ? 'text-white border-[#A32638]' : 'text-slate-300 border-slate-600'
                  }`}>
                    {PILLAR_LABELS[pillar.id]}
                    {isSelectedPillar && <span className="ml-2 text-sm text-[#A32638]">(Primary)</span>}
                  </h4>
                </div>
                {LEVEL_ORDER.map(level => {
                  const courses = pillarGroup[level] || [];
                  if (courses.length === 0) return null;

                  // In stage 2, prioritize cross-pillar courses
                  const sortedCourses = step === 3 && hasCrossPillarCourses
                    ? [...courses].sort((a, b) => {
                        const aCross = a.pillars.length > 1;
                        const bCross = b.pillars.length > 1;
                        return bCross ? 1 : -1;
                      })
                    : courses;

                  return (
                    <div key={level} className="space-y-2">
                      <div className="flex items-center gap-2 mb-2 ml-4">
                        <div className={`w-2 h-2 rounded-full ${
                          level === 'foundation' ? 'bg-green-400' :
                          level === 'practitioner' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`} />
                        <span className="text-sm font-semibold text-slate-300">
                          {LEVEL_LABELS[level]}
                        </span>
                      </div>
                      <div className="grid gap-2 ml-6">
                        {sortedCourses.map(course => {
                          const isSelected = currentStageCourses.some(c => c.id === course.id);
                          const isCrossPillar = course.pillars.length > 1;
                          const isDisabled = !isSelected && limitReached;
                          
                          return (
                            <div
                              key={course.id}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                isDisabled
                                  ? 'opacity-50 cursor-not-allowed border-slate-700 bg-slate-800/50'
                                  : isSelected
                                  ? 'border-blue-500 bg-blue-500/20 cursor-pointer'
                                  : isCrossPillar && step === 3
                                  ? 'border-purple-500 bg-purple-500/10 cursor-pointer hover:border-slate-500'
                                  : 'border-slate-600 bg-slate-700/80 hover:border-slate-500 cursor-pointer'
                              }`}
                              onClick={() => !isDisabled && toggleCourse(course)}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-grow">
                                  <div className="flex items-center gap-2 mb-1">
                                    {isCrossPillar && step === 3 && (
                                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400">
                                        Cross-Pillar
                                      </span>
                                    )}
                                    <span className="font-semibold text-white text-sm">
                                      {course.title}
                                    </span>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                    )}
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    {course.duration} • {course.credits} credits
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCourseDetail(course);
                                  }}
                                  className="p-1 hover:bg-slate-600 rounded transition-colors"
                                >
                                  <Info className="w-4 h-4 text-slate-400" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Selected Courses Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-slate-700/80 rounded-lg p-4 border border-slate-600">
            <h4 className="font-bold text-white mb-3">Selected Courses</h4>
            {currentStageCourses.length === 0 ? (
              <p className="text-sm text-slate-400">No courses selected yet</p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {currentStageCourses.map(course => (
                  <div
                    key={course.id}
                    className="p-2 rounded bg-slate-600/50 text-sm flex items-start justify-between gap-2 group"
                  >
                    <div className="flex-grow">
                      <div className="font-semibold text-white text-xs mb-1">
                        {course.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {course.credits} credits • {LEVEL_LABELS[course.level]}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCourse(course)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-500 rounded text-slate-400 hover:text-white flex-shrink-0"
                      aria-label={`Remove ${course.title} from selection`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Calculate certificate progress
  const calculateProgress = () => {
    if (!selectedPillar) return null;

    const stage1Credits = stage1Courses.reduce((sum, c) => sum + c.credits, 0);
    const stage2Credits = stage2Courses.reduce((sum, c) => sum + c.credits, 0);
    const stage3Credits = stage3Courses.reduce((sum, c) => sum + c.credits, 0);

    return {
      stage1: {
        courses: stage1Courses.length,
        credits: stage1Credits,
        complete: stage1Courses.length >= CERTIFICATE_STAGES.stage1.requiredCourses &&
          stage1Credits >= CERTIFICATE_STAGES.stage1.requiredCredits,
        progress: Math.min(
          (stage1Courses.length / CERTIFICATE_STAGES.stage1.requiredCourses) * 100,
          (stage1Credits / CERTIFICATE_STAGES.stage1.requiredCredits) * 100
        )
      },
      stage2: {
        courses: stage2Courses.length,
        credits: stage2Credits,
        complete: stage2Courses.length >= CERTIFICATE_STAGES.stage2.requiredCourses &&
          stage2Credits >= CERTIFICATE_STAGES.stage2.requiredCredits,
        progress: Math.min(
          (stage2Courses.length / CERTIFICATE_STAGES.stage2.requiredCourses) * 100,
          (stage2Credits / CERTIFICATE_STAGES.stage2.requiredCredits) * 100
        ),
        unlocked: stage1Courses.length >= CERTIFICATE_STAGES.stage1.requiredCourses &&
          stage1Credits >= CERTIFICATE_STAGES.stage1.requiredCredits
      },
      stage3: {
        courses: stage3Courses.length,
        credits: stage3Credits,
        complete: stage3Courses.length >= CERTIFICATE_STAGES.stage3.requiredCourses &&
          stage3Credits >= CERTIFICATE_STAGES.stage3.requiredCredits,
        progress: Math.min(
          (stage3Courses.length / CERTIFICATE_STAGES.stage3.requiredCourses) * 100,
          (stage3Credits / CERTIFICATE_STAGES.stage3.requiredCredits) * 100
        ),
        unlocked: stage2Courses.length >= CERTIFICATE_STAGES.stage2.requiredCourses &&
          stage2Credits >= CERTIFICATE_STAGES.stage2.requiredCredits
      }
    };
  };

  // Get recommended learning order
  const getRecommendedOrder = (courses) => {
    return [...courses].sort((a, b) => {
      // First sort by level
      const levelOrderA = LEVEL_ORDER.indexOf(a.level);
      const levelOrderB = LEVEL_ORDER.indexOf(b.level);
      if (levelOrderA !== levelOrderB) {
        return levelOrderA - levelOrderB;
      }
      // Then by pillar (selected pillar first)
      if (selectedPillar) {
        const aInSelected = a.pillars.includes(selectedPillar.id);
        const bInSelected = b.pillars.includes(selectedPillar.id);
        if (aInSelected !== bInSelected) {
          return bInSelected ? 1 : -1;
        }
      }
      // Finally by title
      return a.title.localeCompare(b.title);
    });
  };

  // Get fixed recommended learning order (10 courses, one from each pillar)
  const getFixedRecommendedCourses = () => {
    return RECOMMENDED_LEARNING_ORDER.map(courseId => 
      PATHWAY_COURSES.find(c => c.id === courseId)
    ).filter(Boolean); // Filter out any undefined courses
  };

  const availableCourses = getAvailableCoursesForStep();
  const groupedCourses = groupCoursesByPillarAndLevel(availableCourses);
  const progress = calculateProgress();
  const currentStageCourses = getCurrentStageCourses();
  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);

  // Determine current stage for display
  const getCurrentStageDisplay = () => {
    if (progress?.stage1?.complete && progress?.stage2?.complete && progress?.stage3?.complete) {
      return 'All Complete';
    } else if (progress?.stage1?.complete && progress?.stage2?.complete) {
      return '3';
    } else if (progress?.stage1?.complete) {
      return '2';
    } else if (stage1Courses.length > 0) {
      return '1';
    }
    return '-';
  };

  // Order pillars: selected pillar first, then others
  const orderedPillars = selectedPillar
    ? [selectedPillar, ...PILLARS.filter(p => p.id !== selectedPillar.id)]
    : PILLARS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-4xl font-bold mb-4 text-white">Build Your Learning Path</h2>
        <p className="text-xl text-slate-100">
          Select courses to progress through certificates and earn your Master's Degree
        </p>
      </motion.div>


      {/* Main Content */}
      <motion.div
        layout
        className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-lg rounded-xl border border-slate-600/40 p-8 shadow-2xl min-h-[500px]"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Track Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Select Your Track</h3>
                  <p className="text-slate-100">Choose a track to build your learning path</p>
                </div>
              </div>

              {/* Group tracks by pillar */}
              {PILLARS.map(pillar => {
                const pillarTracks = TRACKS.filter(t => t.pillar === pillar.id);
                if (pillarTracks.length === 0) return null;

                return (
                  <div key={pillar.id} className="mb-8">
                    <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-600 pb-2">
                      {pillar.label}
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pillarTracks.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => handleTrackSelect(track)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                            selectedTrack?.id === track.id
                              ? 'border-[#A32638] bg-[#A32638]/20'
                              : 'border-slate-600 bg-slate-700/80 hover:border-slate-500 hover:bg-slate-700/60'
                          }`}
                        >
                          <div className="font-bold text-lg mb-1 text-white">{track.label}</div>
                          <div className="text-sm text-slate-300">{track.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-end">
                <button
                  onClick={() => selectedTrack && setStep(2)}
                  disabled={!selectedTrack}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                    !selectedTrack
                      ? 'opacity-50 cursor-not-allowed bg-[#A32638]/50'
                      : 'bg-[#A32638] hover:bg-[#8B1F2E]'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Stage 1 Course Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{CERTIFICATE_STAGES.stage1.name}</h3>
                    <p className="text-slate-100">
                      Select {CERTIFICATE_STAGES.stage1.requiredCourses} courses ({CERTIFICATE_STAGES.stage1.requiredCredits} credits) from {selectedPillar?.label}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Stage 1 Progress */}
              <div className="mb-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-2">
                      {stage1Courses.length} / {CERTIFICATE_STAGES.stage1.requiredCourses} courses selected
                    </div>
                    <div className="text-xs text-slate-400">
                      {stage1Courses.reduce((sum, c) => sum + c.credits, 0)} / {CERTIFICATE_STAGES.stage1.requiredCredits} credits
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(Math.min(
                        (stage1Courses.length / CERTIFICATE_STAGES.stage1.requiredCourses) * 100,
                        (stage1Courses.reduce((sum, c) => sum + c.credits, 0) / CERTIFICATE_STAGES.stage1.requiredCredits) * 100
                      ))}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Selection UI */}
              <CourseSelectionArea
                groupedCourses={groupedCourses}
                orderedPillars={orderedPillars}
                selectedPillar={selectedPillar}
                currentStageCourses={currentStageCourses}
                toggleCourse={toggleCourseForStage}
                setShowCourseDetail={setShowCourseDetail}
                step={step}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setStep(5)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white bg-slate-600 hover:bg-slate-500 border border-slate-500"
                >
                  <GraduationCap className="w-5 h-5" />
                  View Learning Path
                </button>
                <button
                  onClick={() => canProceedToNextStep() && setStep(3)}
                  disabled={!canProceedToNextStep()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                    !canProceedToNextStep()
                      ? 'opacity-50 cursor-not-allowed bg-[#A32638]/50'
                      : 'bg-[#A32638] hover:bg-[#8B1F2E]'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Stage 2 Course Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{CERTIFICATE_STAGES.stage2.name}</h3>
                    <p className="text-slate-100">
                      Select {CERTIFICATE_STAGES.stage2.requiredCourses} courses ({CERTIFICATE_STAGES.stage2.requiredCredits} credits) from {selectedPillar?.label}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Stage 2 Progress */}
              <div className="mb-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-2">
                      {stage2Courses.length} / {CERTIFICATE_STAGES.stage2.requiredCourses} courses selected
                    </div>
                    <div className="text-xs text-slate-400">
                      {stage2Courses.reduce((sum, c) => sum + c.credits, 0)} / {CERTIFICATE_STAGES.stage2.requiredCredits} credits
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(Math.min(
                        (stage2Courses.length / CERTIFICATE_STAGES.stage2.requiredCourses) * 100,
                        (stage2Courses.reduce((sum, c) => sum + c.credits, 0) / CERTIFICATE_STAGES.stage2.requiredCredits) * 100
                      ))}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Selection UI */}
              <CourseSelectionArea
                groupedCourses={groupedCourses}
                orderedPillars={orderedPillars}
                selectedPillar={selectedPillar}
                currentStageCourses={currentStageCourses}
                toggleCourse={toggleCourseForStage}
                setShowCourseDetail={setShowCourseDetail}
                step={step}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setStep(5)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white bg-slate-600 hover:bg-slate-500 border border-slate-500"
                >
                  <GraduationCap className="w-5 h-5" />
                  View Learning Path
                </button>
                <button
                  onClick={() => canProceedToNextStep() && setStep(4)}
                  disabled={!canProceedToNextStep()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                    !canProceedToNextStep()
                      ? 'opacity-50 cursor-not-allowed bg-[#A32638]/50'
                      : 'bg-[#A32638] hover:bg-[#8B1F2E]'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Stage 3 Course Selection */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{CERTIFICATE_STAGES.stage3.name}</h3>
                    <p className="text-slate-100">
                      Select {CERTIFICATE_STAGES.stage3.requiredCourses} more courses ({CERTIFICATE_STAGES.stage3.requiredCredits} credits) to earn your Master's Degree
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Stage 3 Progress */}
              <div className="mb-6 p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-2">
                      {stage3Courses.length} / {CERTIFICATE_STAGES.stage3.requiredCourses} courses selected
                    </div>
                    <div className="text-xs text-slate-400">
                      {stage3Courses.reduce((sum, c) => sum + c.credits, 0)} / {CERTIFICATE_STAGES.stage3.requiredCredits} credits
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(Math.min(
                        (stage3Courses.length / CERTIFICATE_STAGES.stage3.requiredCourses) * 100,
                        (stage3Courses.reduce((sum, c) => sum + c.credits, 0) / CERTIFICATE_STAGES.stage3.requiredCredits) * 100
                      ))}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Selection UI */}
              <CourseSelectionArea
                groupedCourses={groupedCourses}
                orderedPillars={orderedPillars}
                selectedPillar={selectedPillar}
                currentStageCourses={currentStageCourses}
                toggleCourse={toggleCourseForStage}
                setShowCourseDetail={setShowCourseDetail}
                step={step}
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setStep(5)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white bg-slate-600 hover:bg-slate-500 border border-slate-500"
                >
                  <GraduationCap className="w-5 h-5" />
                  View Learning Path
                </button>
                <button
                  onClick={() => canProceedToNextStep() && setStep(5)}
                  disabled={!canProceedToNextStep()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                    !canProceedToNextStep()
                      ? 'opacity-50 cursor-not-allowed bg-[#A32638]/50'
                      : 'bg-[#A32638] hover:bg-[#8B1F2E]'
                  }`}
                >
                  Continue to Path Preview
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Path Preview */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stevens-maroon flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Your Learning Path</h3>
                    <p className="text-slate-100">
                      {selectedCourses.length} courses • {totalCredits} credits
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(4)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <BookOpen className="w-4 h-4" />
                    Courses
                  </div>
                  <div className="text-xl font-bold text-white">{selectedCourses.length}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <Award className="w-4 h-4" />
                    Credits
                  </div>
                  <div className="text-xl font-bold text-white">{totalCredits}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <Clock className="w-4 h-4" />
                    Duration
                  </div>
                  <div className="text-xl font-bold text-white">
                    {Math.ceil(selectedCourses.reduce((sum, c) => {
                      const weeks = parseInt(c.duration) || 6;
                      return sum + weeks;
                    }, 0) / 1.5)} weeks
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-700/70 border border-slate-600/50">
                  <div className="flex items-center gap-2 text-sm text-slate-200 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    Stage
                  </div>
                  <div className="text-xl font-bold text-white">
                    {getCurrentStageDisplay()}
                  </div>
                </div>
              </div>

              {/* Certificate Progress */}
              {progress && (
                <div className="mb-6 space-y-4">
                  <h4 className="font-bold text-white mb-3">Certificate Progress</h4>
                  
                  {/* Stage 1: Professional Graduate Certificate */}
                  <div className={`p-4 rounded-lg border-2 ${
                    progress.stage1.complete
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-slate-700/70 border-slate-600/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {CERTIFICATE_STAGES.stage1.name}
                        </span>
                        {progress.stage1.complete && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <span className="text-sm text-slate-400">
                        {CERTIFICATE_STAGES.stage1.requiredCourses} courses • {CERTIFICATE_STAGES.stage1.requiredCredits} credits
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-300">
                          {selectedPillar?.label} • {progress.stage1.courses}/{CERTIFICATE_STAGES.stage1.requiredCourses} courses ({progress.stage1.credits}/{CERTIFICATE_STAGES.stage1.requiredCredits} credits)
                        </span>
                        {progress.stage1.complete ? (
                          <span className="text-green-400 font-semibold">✓ Complete</span>
                        ) : (
                          <span className="text-slate-400">{Math.round(progress.stage1.progress)}%</span>
                        )}
                      </div>
                      <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.stage1.progress}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full ${progress.stage1.complete ? 'bg-green-500' : 'bg-blue-500'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stage 2: Graduate Certificate */}
                  <div className={`p-4 rounded-lg border-2 ${
                    !progress.stage2.unlocked
                      ? 'bg-slate-700/30 border-slate-600/30 opacity-50'
                      : progress.stage2.complete
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-slate-700/70 border-slate-600/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {!progress.stage2.unlocked && (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                        <span className={`font-semibold ${
                          !progress.stage2.unlocked ? 'text-slate-500' : 'text-white'
                        }`}>
                          {CERTIFICATE_STAGES.stage2.name}
                        </span>
                        {progress.stage2.complete && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <span className="text-sm text-slate-400">
                        {CERTIFICATE_STAGES.stage2.requiredCourses} courses • {CERTIFICATE_STAGES.stage2.requiredCredits} credits
                      </span>
                    </div>
                    {!progress.stage2.unlocked ? (
                      <div className="text-sm text-slate-400">
                        Complete Stage 1 to unlock
                      </div>
                    ) : (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-300">
                            {selectedPillar?.label} • {progress.stage2.courses}/{CERTIFICATE_STAGES.stage2.requiredCourses} courses ({progress.stage2.credits}/{CERTIFICATE_STAGES.stage2.requiredCredits} credits)
                          </span>
                          {progress.stage2.complete ? (
                            <span className="text-green-400 font-semibold">✓ Complete</span>
                          ) : (
                            <span className="text-slate-400">{Math.round(progress.stage2.progress)}%</span>
                          )}
                        </div>
                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.stage2.progress}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full ${progress.stage2.complete ? 'bg-green-500' : 'bg-blue-500'}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stage 3: Master's Degree */}
                  <div className={`p-4 rounded-lg border-2 ${
                    !progress.stage3.unlocked
                      ? 'bg-slate-700/30 border-slate-600/30 opacity-50'
                      : progress.stage3.complete
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-slate-700/70 border-slate-600/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {!progress.stage3.unlocked && (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                        <span className={`font-semibold ${
                          !progress.stage3.unlocked ? 'text-slate-500' : 'text-white'
                        }`}>
                          {CERTIFICATE_STAGES.stage3.name}
                        </span>
                        {progress.stage3.complete && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <span className="text-sm text-slate-400">
                        {CERTIFICATE_STAGES.stage3.requiredCourses} courses • {CERTIFICATE_STAGES.stage3.requiredCredits} credits
                      </span>
                    </div>
                    {!progress.stage3.unlocked ? (
                      <div className="text-sm text-slate-400">
                        Complete Stage 2 to unlock
                      </div>
                    ) : (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-300">
                            Any Pillar • {progress.stage3.courses}/{CERTIFICATE_STAGES.stage3.requiredCourses} courses ({progress.stage3.credits}/{CERTIFICATE_STAGES.stage3.requiredCredits} credits)
                          </span>
                          {progress.stage3.complete ? (
                            <span className="text-green-400 font-semibold">✓ Complete</span>
                          ) : (
                            <span className="text-slate-400">{Math.round(progress.stage3.progress)}%</span>
                          )}
                        </div>
                        <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.stage3.progress}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full ${progress.stage3.complete ? 'bg-green-500' : 'bg-purple-500'}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recommended Learning Order */}
              <div className="mb-6">
                <h4 className="font-bold text-white mb-3">Recommended Learning Order</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {getFixedRecommendedCourses().map((course, idx) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-lg bg-slate-700/80 border border-slate-600/60 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stevens-maroon flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-white">{course.title}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            course.level === 'foundation' ? 'bg-green-500/20 text-green-400' :
                            course.level === 'practitioner' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {LEVEL_LABELS[course.level]}
                          </span>
                          {course.pillars.length > 1 && (
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400">
                              Cross-Pillar
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-400">
                          {course.duration} • {course.credits} credits • {course.pillars.map(p => PILLAR_LABELS[p]).join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 font-semibold transition-all duration-200 text-white"
                >
                  Edit Selection
                </button>
                <button
                  onClick={() => {
                    selectedCourses.forEach(course => {
                      if (!pathItems.some(p => p.id === course.id)) {
                        onAddToPath(course);
                      }
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#A32638] hover:bg-[#8B1F2E] font-semibold transition-all duration-200 text-white"
                >
                  <Plus className="w-5 h-5" />
                  Add All to Path
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Course Detail Modal */}
      <Dialog open={!!showCourseDetail} onOpenChange={() => setShowCourseDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-800 text-white border border-slate-600">
          {showCourseDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-white">
                  {showCourseDetail.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <span className="px-3 py-1 rounded bg-slate-700 text-slate-300">
                    {showCourseDetail.duration}
                  </span>
                  <span className="px-3 py-1 rounded bg-slate-700 text-slate-300">
                    {showCourseDetail.credits} credits
                  </span>
                  <span className={`px-3 py-1 rounded font-semibold ${
                    showCourseDetail.level === 'foundation' ? 'bg-green-500/20 text-green-400' :
                    showCourseDetail.level === 'practitioner' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {LEVEL_LABELS[showCourseDetail.level]}
                  </span>
                  {showCourseDetail.pillars.map(pillar => (
                    <span key={pillar} className="px-3 py-1 rounded bg-blue-500/20 text-blue-400">
                      {PILLAR_LABELS[pillar]}
                    </span>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Description</h4>
                  <p className="text-slate-300">{showCourseDetail.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Learning Outcomes</h4>
                  <ul className="space-y-2">
                    {showCourseDetail.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      toggleCourse(showCourseDetail);
                      setShowCourseDetail(null);
                    }}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white ${
                      selectedCourses.some(c => c.id === showCourseDetail.id)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-[#A32638] hover:bg-[#8B1F2E]'
                    }`}
                  >
                    {selectedCourses.some(c => c.id === showCourseDetail.id) ? (
                      <>
                        <X className="w-4 h-4 inline mr-2" />
                        Remove from Selection
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 inline mr-2" />
                        Add to Selection
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowCourseDetail(null)}
                    className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 font-semibold transition-all duration-200 text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PathwayBuilder;

