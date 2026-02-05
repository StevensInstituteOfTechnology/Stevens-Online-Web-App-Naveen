import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Tooltip for Foundation nodes (Layer 1)
export const FoundationTooltip = ({ data, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 pointer-events-none"
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800" />

          {/* Tooltip Card */}
          <div className="bg-gray-800/95 backdrop-blur-sm border border-green-500/50 rounded-lg shadow-2xl shadow-green-500/20 p-4 min-w-[260px] max-w-[300px]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
              <span className="text-lg">🌱</span>
              <span className="text-green-400 font-bold text-xs uppercase tracking-wider">
                Foundation Skill
              </span>
            </div>

            {/* Credits */}
            {data.credits && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400">📊</span>
                <span className="text-gray-300 text-sm">
                  Credits:{" "}
                  <span className="text-white font-bold">{data.credits}</span>
                </span>
              </div>
            )}

            {/* Description */}
            {data.description && (
              <p className="text-gray-400 text-xs italic mb-3 leading-relaxed">
                "{data.description}"
              </p>
            )}

            {/* Skills */}
            {data.skills && (
              <div className="text-gray-400 text-xs">
                <span className="text-green-400 font-medium">Skills:</span>{" "}
                {data.skills}
              </div>
            )}

            {/* Hint */}
            <div className="mt-3 pt-2 border-t border-gray-700">
              <p className="text-gray-500 text-[10px] italic">
                💡 Click to see all paths this foundation unlocks
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Tooltip for Certificate nodes (Layer 2)
export const CertificateTooltip = ({ data, linkedDegrees, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 pointer-events-none"
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800" />

          {/* Tooltip Card */}
          <div className="bg-gray-800/95 backdrop-blur-sm border border-blue-500/50 rounded-lg shadow-2xl shadow-blue-500/20 p-4 min-w-[280px] max-w-[320px]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
              <span className="text-lg">📜</span>
              <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">
                Advanced Certificate
              </span>
            </div>

            {/* Credits */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-500">📊</span>
              <span className="text-gray-300 text-sm">
                Credits:{" "}
                <span className="text-white font-bold">
                  {data.credits || "12"}
                </span>
              </span>
            </div>

            {/* Description */}
            {data.description && (
              <p className="text-gray-400 text-xs italic mb-3 leading-relaxed">
                "{data.description}"
              </p>
            )}

            {/* Stacks Toward */}
            {linkedDegrees && linkedDegrees.length > 0 && (
              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">⚡</span>
                  <span className="text-yellow-500 font-bold text-xs uppercase tracking-wider">
                    Stacks Toward
                  </span>
                </div>
                <ul className="space-y-1 ml-6">
                  {linkedDegrees.map((degree, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-xs flex items-center gap-1"
                    >
                      <span className="text-yellow-500">→</span>
                      {degree}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Tooltip for Master's Degree nodes (Layer 3)
export const MastersTooltip = ({ data, unlockedBy, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-50 pointer-events-none"
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800" />

          {/* Tooltip Card */}
          <div className="bg-gray-800/95 backdrop-blur-sm border border-yellow-500/50 rounded-lg shadow-2xl shadow-yellow-500/20 p-4 min-w-[280px] max-w-[320px]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
              <span className="text-lg">🎓</span>
              <span className="text-yellow-500 font-bold text-xs uppercase tracking-wider">
                Master's Degree
              </span>
            </div>

            {/* Total Credits */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-500">📚</span>
              <span className="text-gray-300 text-sm">
                Total Credits:{" "}
                <span className="text-white font-bold">
                  {data.totalCredits}
                </span>
              </span>
            </div>

            {/* Core Competencies */}
            {data.competencies && data.competencies.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400">🧠</span>
                  <span className="text-purple-400 font-bold text-xs uppercase tracking-wider">
                    Core Competencies
                  </span>
                </div>
                <ul className="space-y-1 ml-6">
                  {data.competencies.map((comp, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-xs flex items-center gap-1"
                    >
                      <span className="text-purple-400">•</span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Unlocked By */}
            {unlockedBy && unlockedBy.length > 0 && (
              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400">⬅️</span>
                  <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">
                    Unlocked By
                  </span>
                </div>
                <ul className="space-y-1 ml-6">
                  {unlockedBy.map((cert, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-xs flex items-center gap-1"
                    >
                      <span className="text-blue-400">•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
