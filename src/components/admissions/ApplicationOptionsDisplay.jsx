import React, { useState } from 'react';
import { ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationModal from '../shared/ApplicationModal';

/**
 * ApplicationOptionsDisplay - Displays application options based on program configuration
 * @param {Object} applicationConfig - Program's application configuration
 * @param {string} programCode - Program code for tracking
 */
const ApplicationOptionsDisplay = ({ applicationConfig, programCode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If it's a direct link (MBA or MEADS)
  if (applicationConfig.type === 'direct') {
    const isInternal = applicationConfig.link.startsWith('/');
    
    return (
      <div className="bg-stevens-light-gray rounded-stevens-lg p-stevens-lg border border-stevens-light-gray">
        <h4 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-md">
          Application Process
        </h4>
        <p className="text-stevens-base text-stevens-dark-gray mb-stevens-md">
          {applicationConfig.link === '/accelerated-application' 
            ? 'This program features our streamlined Accelerated Application process for working professionals.'
            : 'Apply directly through our standard graduate application.'}
        </p>
        
        {isInternal ? (
          <Link to={applicationConfig.link}>
            <button className="btn-stevens-red w-full flex items-center justify-center gap-stevens-sm">
              {applicationConfig.link === '/accelerated-application' ? (
                <>
                  <Zap className="w-5 h-5" />
                  Start Accelerated Application
                </>
              ) : (
                <>
                  <ExternalLink className="w-5 h-5" />
                  Apply Now
                </>
              )}
            </button>
          </Link>
        ) : (
          <a
            href={applicationConfig.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-stevens-red w-full flex items-center justify-center gap-stevens-sm"
          >
            <ExternalLink className="w-5 h-5" />
            Start Application
          </a>
        )}
      </div>
    );
  }

  // If it's a modal type (MSCS or MEM)
  if (applicationConfig.type === 'modal') {
    return (
      <div className="bg-stevens-light-gray rounded-stevens-lg p-stevens-lg border border-stevens-light-gray">
        <h4 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-md">
          Application Options
        </h4>
        <p className="text-stevens-base text-stevens-dark-gray mb-stevens-md">
          Choose the application path that works best for you:
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-stevens-red w-full flex items-center justify-center gap-stevens-sm"
        >
          View Application Options
        </button>

        <div className="mt-stevens-md p-stevens-md bg-stevens-white rounded-stevens-md border border-stevens-light-gray">
          <p className="text-stevens-sm text-stevens-dark-gray">
            <strong>Standard Application:</strong> Traditional graduate application with all requirements.
          </p>
          <p className="text-stevens-sm text-stevens-dark-gray mt-stevens-sm">
            <strong>ASAP Application:</strong> Start with trial courses and earn credit toward your degree.
          </p>
        </div>

        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          traditionalLink={applicationConfig.standardLink}
        />
      </div>
    );
  }

  return null;
};

export default ApplicationOptionsDisplay;

