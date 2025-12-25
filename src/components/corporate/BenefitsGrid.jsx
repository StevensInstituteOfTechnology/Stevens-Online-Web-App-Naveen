import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * BenefitsGrid - Animated grid layout for displaying benefits or features
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {Array} props.benefits - Array of benefit objects with icon, title, description
 * @param {number} props.columns - Number of columns (default: 3)
 * @param {boolean} props.animate - Enable animations (default: true)
 * @param {string} props.variant - Card variant: 'default', 'minimal', 'outlined' (default: 'default')
 */
const BenefitsGrid = ({
  title,
  subtitle,
  benefits = [],
  columns = 3,
  animate = true,
  variant = 'default'
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const renderBenefitCard = (benefit, index) => {
    const Icon = benefit.icon;
    
    switch (variant) {
      case 'minimal':
        return (
          <motion.div
            key={index}
            variants={animate ? itemVariants : {}}
            className="group"
          >
            <div className="text-center p-stevens-lg hover:bg-stevens-light-gray rounded-stevens-lg transition-colors duration-stevens-normal">
              {Icon && (
                <div className="w-16 h-16 bg-stevens-light-gray rounded-stevens-md flex items-center justify-center mx-auto mb-stevens-md group-hover:bg-stevens-light-gray transition-colors">
                  <Icon className="w-8 h-8 text-stevens-red" />
                </div>
              )}
              {benefit.emoji && (
                <div className="text-4xl mb-stevens-md">{benefit.emoji}</div>
              )}
              <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-sm">
                {benefit.title}
              </h3>
              <p className="text-stevens-dark-gray">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        );
      
      case 'outlined':
        return (
          <motion.div
            key={index}
            variants={animate ? itemVariants : {}}
            className="group"
          >
            <div className="border border-stevens-light-gray rounded-stevens-lg p-stevens-lg h-full hover:border-stevens-red transition-colors duration-stevens-normal">
              <div className="flex items-start space-x-stevens-md">
                {Icon && (
                  <div className="w-12 h-12 bg-stevens-light-gray rounded-stevens-md flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-light-gray transition-colors">
                    <Icon className="w-6 h-6 text-stevens-red" />
                  </div>
                )}
                <div>
                  <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-stevens-dark-gray text-stevens-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      default: // 'default'
        return (
          <motion.div
            key={index}
            variants={animate ? itemVariants : {}}
          >
            <Card className="h-full hover:shadow-stevens-lg transition-shadow duration-stevens-normal">
              <CardHeader className="pb-stevens-md">
                {Icon && (
                  <div className="w-12 h-12 bg-stevens-light-gray rounded-stevens-md flex items-center justify-center mb-stevens-md">
                    <Icon className="w-6 h-6 text-stevens-red" />
                  </div>
                )}
                {benefit.emoji && (
                  <div className="text-3xl mb-stevens-md">{benefit.emoji}</div>
                )}
                <CardTitle className="text-stevens-lg font-stevens-bold text-stevens-dark-gray">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stevens-dark-gray">
                  {benefit.description}
                </p>
                {benefit.stats && (
                  <div className="mt-stevens-md pt-stevens-md border-t border-stevens-light-gray">
                    <p className="text-stevens-2xl font-stevens-bold text-stevens-red">
                      {benefit.stats.value}
                    </p>
                    <p className="text-stevens-sm text-stevens-dark-gray">
                      {benefit.stats.label}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
    }
  };

  const Container = animate ? motion.div : 'div';
  const containerProps = animate ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    variants: containerVariants
  } : {};

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <motion.div
          initial={animate ? { opacity: 0, y: 20 } : {}}
          whileInView={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-stevens-2xl"
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
      )}

      <Container
        {...containerProps}
        className={`grid ${gridCols[columns] || gridCols[3]} gap-stevens-lg`}
      >
        {benefits.map((benefit, index) => renderBenefitCard(benefit, index))}
      </Container>
    </section>
  );
};

export default BenefitsGrid;
