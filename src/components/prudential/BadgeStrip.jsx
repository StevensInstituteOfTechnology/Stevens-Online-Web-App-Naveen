import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, CheckCircle } from 'lucide-react';

const BadgeStrip = ({ pathItems = [] }) => {
  const levels = ['foundation', 'practitioner', 'expert'];
  
  // Calculate which levels are represented in path
  const levelProgress = levels.map(level => ({
    level,
    count: pathItems.filter(p => p.level === level).length,
    completed: pathItems.some(p => p.level === level)
  }));

  const totalCredits = pathItems.reduce((sum, p) => sum + (p.credits || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4">Your Stackable Credential Path</h2>
        <p className="text-xl text-gray-400">
          Every course earns you credits toward graduate certificates and degrees
        </p>
      </motion.div>

      {/* Badge Progression */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 hidden md:block" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ 
            width: `${(levelProgress.filter(l => l.completed).length / levels.length) * 100}%` 
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-stevens-maroon to-purple-600 -translate-y-1/2 hidden md:block"
        />

        {/* Badge Cards */}
        <div className="relative grid md:grid-cols-3 gap-8">
          {levelProgress.map((levelData, index) => (
            <motion.div
              key={levelData.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className={`p-8 rounded-xl border-2 transition-all duration-300 ${
                levelData.completed
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border-stevens-maroon shadow-lg shadow-stevens-maroon/20'
                  : 'bg-white/5 border-white/10'
              }`}>
                {/* Badge Icon */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  levelData.level === 'foundation' ? 'bg-green-500/20' :
                  levelData.level === 'practitioner' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                }`}>
                  {levelData.completed ? (
                    <CheckCircle className={`w-10 h-10 ${
                      levelData.level === 'foundation' ? 'text-green-400' :
                      levelData.level === 'practitioner' ? 'text-yellow-400' : 'text-blue-400'
                    }`} />
                  ) : (
                    <Award className="w-10 h-10 text-gray-400" />
                  )}
                </div>

                {/* Level Name */}
                <h3 className="text-2xl font-bold text-center mb-2 capitalize">
                  {levelData.level}
                </h3>

                {/* Progress */}
                <div className="text-center mb-4">
                  {levelData.completed ? (
                    <div className="text-stevens-maroon font-semibold">
                      {levelData.count} {levelData.count === 1 ? 'program' : 'programs'} selected
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      No programs selected
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 text-center mb-4">
                  {levelData.level === 'foundation' && 'Build fundamental skills and knowledge base'}
                  {levelData.level === 'practitioner' && 'Apply concepts to real-world scenarios'}
                  {levelData.level === 'expert' && 'Master advanced topics and lead initiatives'}
                </p>

                {/* Stackability Info */}
                <div className="text-xs text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="font-semibold mb-1">Stacks to:</div>
                  <div className="text-gray-400">
                    {levelData.level === 'foundation' && 'Professional Certificates'}
                    {levelData.level === 'practitioner' && 'Graduate Certificates'}
                    {levelData.level === 'expert' && 'M.Eng./MEADS/MBA'}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {index < levels.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30"
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">{pathItems.length}</div>
            <div className="text-sm text-gray-400">Programs Selected</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">{totalCredits}</div>
            <div className="text-sm text-gray-400">Total Graduate Credits</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              {levelProgress.filter(l => l.completed).length}/{levels.length}
            </div>
            <div className="text-sm text-gray-400">Levels Covered</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BadgeStrip;

