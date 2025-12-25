import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, TrendingUp, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CareerPathExplorer - Interactive career path and program explorer
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {Array} props.careerPaths - Array of career path objects
 * @param {Array} props.programs - Array of program objects
 * @param {Function} props.onProgramClick - Handler for program click
 * @param {boolean} props.showFilters - Show filter buttons (default: true)
 */
const CareerPathExplorer = ({
  title = "Explore Career-Aligned Programs",
  subtitle,
  careerPaths = [],
  programs = [],
  onProgramClick,
  showFilters = true
}) => {
  const [selectedPath, setSelectedPath] = useState('all');
  const [hoveredProgram, setHoveredProgram] = useState(null);

  // Default career paths if none provided
  const defaultPaths = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Build intelligent systems and advance AI capabilities',
      skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
      avgSalary: '$150,000',
      growth: '+22%'
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: '📊',
      description: 'Transform data into actionable insights',
      skills: ['Data Analysis', 'Statistical Modeling', 'Big Data', 'Visualization'],
      avgSalary: '$130,000',
      growth: '+35%'
    },
    {
      id: 'business',
      name: 'Business & Management',
      icon: '💼',
      description: 'Lead organizations and drive strategic growth',
      skills: ['Leadership', 'Strategy', 'Finance', 'Operations'],
      avgSalary: '$125,000',
      growth: '+15%'
    },
    {
      id: 'engineering',
      name: 'Engineering Leadership',
      icon: '⚙️',
      description: 'Bridge technical excellence with management',
      skills: ['Project Management', 'Systems Design', 'Team Leadership', 'Innovation'],
      avgSalary: '$140,000',
      growth: '+18%'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: '🔒',
      description: 'Protect critical systems and data',
      skills: ['Security Architecture', 'Risk Assessment', 'Incident Response', 'Compliance'],
      avgSalary: '$135,000',
      growth: '+32%'
    }
  ];

  const paths = careerPaths.length > 0 ? careerPaths : defaultPaths;

  // Filter programs based on selected career path
  const filteredPrograms = selectedPath === 'all' 
    ? programs
    : programs.filter(program => {
        const path = paths.find(p => p.id === selectedPath);
        return path && program.careerPaths && program.careerPaths.includes(selectedPath);
      });

  const renderProgramCard = (program) => {
    const isHovered = hoveredProgram === program.code;
    
    return (
      <motion.div
        key={program.code}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setHoveredProgram(program.code)}
        onMouseLeave={() => setHoveredProgram(null)}
        className="h-full"
      >
        <Card className="h-full hover:shadow-stevens-xl transition-all duration-stevens-normal transform hover:-translate-y-1">
          <CardHeader>
            {program.badge && (
              <Badge className="mb-stevens-sm w-fit">
                {program.badge}
              </Badge>
            )}
            <CardTitle className="text-stevens-xl font-stevens-bold text-stevens-dark-gray">
              {program.title}
            </CardTitle>
            {program.subtitle && (
              <p className="text-stevens-dark-gray text-stevens-sm mt-stevens-xs">
                {program.subtitle}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-stevens-md">
            <p className="text-stevens-dark-gray">
              {program.description}
            </p>

            {/* Program Details */}
            <div className="space-y-stevens-sm">
              {program.duration && (
                <div className="flex items-center text-stevens-sm text-stevens-dark-gray">
                  <Clock className="w-4 h-4 mr-stevens-xs" />
                  <span>{program.duration}</span>
                </div>
              )}
              {program.credits && (
                <div className="flex items-center text-stevens-sm text-stevens-dark-gray">
                  <Award className="w-4 h-4 mr-stevens-xs" />
                  <span>{program.credits} credits</span>
                </div>
              )}
            </div>

            {/* Key Features */}
            {program.features && (
              <div className="space-y-stevens-xs">
                {program.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-stevens-red mr-stevens-xs mt-0.5 flex-shrink-0" />
                    <span className="text-stevens-sm text-stevens-dark-gray">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ROI Metrics */}
            {(program.avgSalaryIncrease || program.promotionRate) && (
              <div className="bg-stevens-light-gray rounded-stevens-md p-stevens-sm">
                <div className="flex items-center justify-between text-stevens-sm">
                  {program.avgSalaryIncrease && (
                    <div>
                      <TrendingUp className="w-4 h-4 text-stevens-red inline mr-1" />
                      <span className="font-stevens-medium">{program.avgSalaryIncrease} salary increase</span>
                    </div>
                  )}
                  {program.promotionRate && (
                    <div>
                      <Award className="w-4 h-4 text-stevens-red inline mr-1" />
                      <span className="font-stevens-medium">{program.promotionRate} promoted</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="pt-stevens-md"
                >
                  {onProgramClick ? (
                    <Button 
                      className="w-full"
                      onClick={() => onProgramClick(program)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : program.link ? (
                    <Link to={program.link}>
                      <Button className="w-full">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderCareerPathInfo = () => {
    if (selectedPath === 'all') return null;
    
    const currentPath = paths.find(p => p.id === selectedPath);
    if (!currentPath) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-stevens-light-gray rounded-stevens-lg p-stevens-lg mb-stevens-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-lg">
          <div>
            <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-sm">
              {currentPath.name}
            </h3>
            <p className="text-stevens-dark-gray">
              {currentPath.description}
            </p>
          </div>
          
          {currentPath.skills && (
            <div>
              <h4 className="font-stevens-medium text-stevens-dark-gray mb-stevens-sm">
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-stevens-xs">
                {currentPath.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-stevens-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {(currentPath.avgSalary || currentPath.growth) && (
            <div className="grid grid-cols-2 gap-stevens-md">
              {currentPath.avgSalary && (
                <div>
                  <h4 className="font-stevens-medium text-stevens-dark-gray mb-stevens-xs">
                    Avg. Salary
                  </h4>
                  <p className="text-stevens-xl font-stevens-bold text-stevens-red">
                    {currentPath.avgSalary}
                  </p>
                </div>
              )}
              {currentPath.growth && (
                <div>
                  <h4 className="font-stevens-medium text-stevens-dark-gray mb-stevens-xs">
                    Job Growth
                  </h4>
                  <p className="text-stevens-xl font-stevens-bold text-stevens-green-600">
                    {currentPath.growth}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-stevens-xl"
      >
        {title && (
          <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-red mb-stevens-md">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Filter Tabs or Buttons */}
      {showFilters && (
        <div className="mb-stevens-xl">
          {paths.length <= 5 ? (
            // Use buttons for fewer paths
            <div className="flex flex-wrap justify-center gap-stevens-sm">
              <Button
                variant={selectedPath === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedPath('all')}
              >
                All Programs
              </Button>
              {paths.map(path => (
                <Button
                  key={path.id}
                  variant={selectedPath === path.id ? 'default' : 'outline'}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <span className="mr-2">{path.icon}</span>
                  {path.name}
                </Button>
              ))}
            </div>
          ) : (
            // Use tabs for more paths
            <Tabs value={selectedPath} onValueChange={setSelectedPath} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="all">All Programs</TabsTrigger>
                {paths.map(path => (
                  <TabsTrigger key={path.id} value={path.id}>
                    <span className="mr-2">{path.icon}</span>
                    {path.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
      )}

      {/* Career Path Info */}
      <AnimatePresence mode="wait">
        {renderCareerPathInfo()}
      </AnimatePresence>

      {/* Program Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg"
        >
          {filteredPrograms.map(program => renderProgramCard(program))}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredPrograms.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-stevens-2xl"
        >
          <p className="text-stevens-dark-gray">
            No programs found for this career path. 
            <Button
              variant="link"
              onClick={() => setSelectedPath('all')}
              className="ml-2"
            >
              View all programs
            </Button>
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default CareerPathExplorer;
