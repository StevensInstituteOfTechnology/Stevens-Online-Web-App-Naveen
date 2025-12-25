import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Phone, Mail, Calendar } from 'lucide-react';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';

/**
 * CorporateCTA - Flexible CTA section for corporate pages
 * @param {Object} props
 * @param {string} props.variant - CTA variant: 'simple', 'form', 'contact', 'corporate-code'
 * @param {string} props.title - Main title
 * @param {string} props.subtitle - Subtitle text
 * @param {Object} props.primaryCta - Primary CTA button props
 * @param {Object} props.secondaryCta - Secondary CTA button props
 * @param {Array} props.features - List of features/benefits to display
 * @param {string} props.backgroundColor - Background color class
 * @param {string} props.textColor - Text color class
 * @param {string} props.formType - Form type for LeadCaptureForm
 * @param {string} props.corporateCode - Pre-filled corporate code
 */
const CorporateCTA = ({
  variant = 'simple',
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features = [],
  backgroundColor = 'bg-stevens-red',
  textColor = 'text-stevens-white',
  formType = 'corporate_inquiry',
  corporateCode
}) => {
  const [showForm, setShowForm] = useState(false);
  const [enteredCode, setEnteredCode] = useState(corporateCode || '');
  const [isValidCode, setIsValidCode] = useState(false);

  const validateCorporateCode = (code) => {
    // Simple validation - in production, this would check against a database
    const validPattern = /^[A-Z0-9]{4,10}$/;
    return validPattern.test(code.toUpperCase());
  };

  const handleCodeSubmit = () => {
    if (validateCorporateCode(enteredCode)) {
      setIsValidCode(true);
      sessionStorage.setItem('corporate_code', enteredCode.toUpperCase());
      trackEvent('corporate_code_entered', {
        code_valid: true,
        source: 'cta_section'
      });
      
      // Redirect to application or next step
      if (primaryCta?.onClick) {
        primaryCta.onClick(enteredCode);
      }
    } else {
      trackEvent('corporate_code_entered', {
        code_valid: false,
        source: 'cta_section'
      });
    }
  };

  const renderContent = () => {
    switch (variant) {
      case 'form':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-xl items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md ${textColor}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`text-stevens-lg mb-stevens-lg ${textColor} opacity-90`}>
                  {subtitle}
                </p>
              )}
              
              {features.length > 0 && (
                <div className="space-y-stevens-md">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <CheckCircle className={`w-5 h-5 ${textColor} mr-stevens-sm mt-0.5 flex-shrink-0`} />
                      <span className={`${textColor}`}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-stevens-white/10 backdrop-blur border-stevens-white/20">
                <CardContent className="p-stevens-lg">
                  <LeadCaptureForm
                    formType={formType}
                    source="corporate_cta"
                    onSuccess={() => {
                      trackConversion(CONVERSION_LABELS.FORM_SUBMIT);
                      setShowForm(false);
                    }}
                    className={textColor}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        );

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={`font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md ${textColor}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-stevens-lg mb-stevens-xl ${textColor} opacity-90`}>
                {subtitle}
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-lg mb-stevens-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-stevens-white/20 rounded-full flex items-center justify-center mx-auto mb-stevens-md">
                  <Phone className={`w-8 h-8 ${textColor}`} />
                </div>
                <h3 className={`font-stevens-medium mb-stevens-xs ${textColor}`}>Call Us</h3>
                <a href="tel:1-888-STEVENS" className={`${textColor} opacity-90 hover:opacity-100`}>
                  1-888-STEVENS
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-stevens-white/20 rounded-full flex items-center justify-center mx-auto mb-stevens-md">
                  <Mail className={`w-8 h-8 ${textColor}`} />
                </div>
                <h3 className={`font-stevens-medium mb-stevens-xs ${textColor}`}>Email Us</h3>
                <a href="mailto:corporate@stevens.edu" className={`${textColor} opacity-90 hover:opacity-100`}>
                  corporate@stevens.edu
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-stevens-white/20 rounded-full flex items-center justify-center mx-auto mb-stevens-md">
                  <Calendar className={`w-8 h-8 ${textColor}`} />
                </div>
                <h3 className={`font-stevens-medium mb-stevens-xs ${textColor}`}>Schedule Meeting</h3>
                <a href="#" className={`${textColor} opacity-90 hover:opacity-100`}>
                  Book a consultation
                </a>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
              {primaryCta && (
                <Button
                  size="lg"
                  className="bg-stevens-white text-stevens-red hover:bg-stevens-light-gray"
                  onClick={primaryCta.onClick}
                >
                  {primaryCta.label}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              )}
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stevens-white text-stevens-white hover:bg-stevens-white/10"
                  onClick={secondaryCta.onClick}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </motion.div>
        );

      case 'corporate-code':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className={`font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md ${textColor}`}>
              {title || "Enter Your Corporate Code"}
            </h2>
            {subtitle && (
              <p className={`text-stevens-lg mb-stevens-xl ${textColor} opacity-90`}>
                {subtitle}
              </p>
            )}
            
            {!isValidCode ? (
              <div className="max-w-md mx-auto">
                <div className="flex gap-stevens-sm mb-stevens-lg">
                  <Input
                    placeholder="Enter code (e.g., CORP2024)"
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                    className="text-center font-stevens-mono text-stevens-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCodeSubmit();
                      }
                    }}
                  />
                  <Button
                    onClick={handleCodeSubmit}
                    disabled={!enteredCode}
                  >
                    Verify Code
                  </Button>
                </div>
                
                {corporateCode && (
                  <p className={`text-stevens-sm ${textColor} opacity-70`}>
                    Don't have a code? Contact your HR department or{' '}
                    <button
                      onClick={() => setShowForm(true)}
                      className="underline hover:no-underline"
                    >
                      inquire about partnership
                    </button>
                  </p>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-stevens-white/20 backdrop-blur rounded-stevens-lg p-stevens-lg max-w-md mx-auto"
              >
                <CheckCircle className="w-12 h-12 text-stevens-green-light mx-auto mb-stevens-md" />
                <h3 className={`font-stevens-display text-stevens-xl font-stevens-bold mb-stevens-sm ${textColor}`}>
                  Code Verified!
                </h3>
                <p className={`${textColor} opacity-90 mb-stevens-lg`}>
                  You're eligible for exclusive partner benefits
                </p>
                <Button
                  size="lg"
                  className="w-full bg-stevens-white text-stevens-red hover:bg-stevens-light-gray"
                  onClick={() => primaryCta?.onClick(enteredCode)}
                >
                  Continue to Application
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        );

      default: // 'simple'
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={`font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md ${textColor}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-stevens-lg mb-stevens-xl max-w-2xl mx-auto ${textColor} opacity-90`}>
                {subtitle}
              </p>
            )}
            
            {features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-stevens-md mb-stevens-xl">
                {features.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-stevens-white/20 border-stevens-white/40 text-stevens-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-stevens-xs" />
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
              {primaryCta && (
                <Button
                  size="lg"
                  className="bg-stevens-white text-stevens-red hover:bg-stevens-light-gray"
                  onClick={primaryCta.onClick}
                >
                  {primaryCta.label}
                  {primaryCta.icon || <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stevens-white text-stevens-white hover:bg-stevens-white/10"
                  onClick={secondaryCta.onClick}
                >
                  {secondaryCta.label}
                  {secondaryCta.icon}
                </Button>
              )}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section className={`py-stevens-section-sm lg:py-stevens-section ${backgroundColor} ${textColor}`}>
      <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
        {renderContent()}
      </div>

      {/* Form Modal */}
      {showForm && variant === 'corporate-code' && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-stevens-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-stevens-white rounded-stevens-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-stevens-xl">
              <div className="flex justify-between items-start mb-stevens-lg">
                <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-red">
                  Inquire About Partnership
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-stevens-light-gray0 hover:text-stevens-dark-gray"
                >
                  ×
                </button>
              </div>
              
              <LeadCaptureForm
                formType="corporate_partnership"
                source="corporate_code_inquiry"
                onSuccess={() => {
                  trackConversion(CONVERSION_LABELS.CORPORATE_INQUIRY);
                  setShowForm(false);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default CorporateCTA;
