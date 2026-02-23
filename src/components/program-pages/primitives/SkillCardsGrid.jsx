import { TrendingUp, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

/**
 * SkillCardsGrid - Grid layout for "What You'll Learn" modules
 * 
 * Design: CPE Brand Guidelines - Cards with icons and course examples
 * Used in: SkillsSection (What You'll Learn) - primarily for MBA program
 * 
 * @param {Array} modules - Array of skill modules
 * @param {string} modules[].title - Module title
 * @param {Component} modules[].icon - Lucide icon component
 * @param {string} modules[].growth - Optional growth percentage
 * @param {Array} modules[].courses - Optional array of example courses
 */
export const SkillCardsGrid = ({ modules }) => {
  if (!modules || modules.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stevens-lg">
      {modules.map((module, index) => {
        const Icon = module.icon;
        return (
          <Card
            key={index}
            className="bg-stevens-white shadow-stevens-lg rounded-stevens-md hover:shadow-stevens-xl transition-all duration-stevens-normal border border-stevens-light-gray"
          >
            <CardHeader className="pb-stevens-sm">
              <div className="flex items-start gap-stevens-md mb-stevens-md">
                <div className="bg-stevens-light-gray p-stevens-md rounded-stevens-md border border-stevens-light-gray">
                  {Icon && <Icon className="w-8 h-8 text-stevens-dark-gray" />}
                </div>
                <div className="flex-1">
                  <CardTitle className="font-stevens-display text-stevens-xl font-light text-stevens-dark-gray leading-tight">
                    {module.title}
                  </CardTitle>
                  {module.growth && (
                    <p className="text-stevens-sm text-green-600 font-stevens-semibold mt-stevens-xs flex items-center gap-stevens-xs">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      {module.growth}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {module.courses && module.courses.length > 0 && (
                <div className="space-y-stevens-sm">
                  <h4 className="font-stevens-bold text-stevens-sm uppercase tracking-wider text-stevens-dark-gray mb-stevens-md">
                    Example Courses:
                  </h4>
                  {module.courses.map((course, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-stevens-sm bg-stevens-light-gray p-stevens-sm rounded-stevens-sm hover:bg-stevens-light-gray transition-colors duration-stevens-normal"
                    >
                      <Check className="w-4 h-4 text-stevens-red flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-stevens-bold text-stevens-sm text-stevens-dark-gray">
                          {course.code}
                        </p>
                        <p className="text-stevens-xs text-stevens-dark-gray">
                          {course.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
