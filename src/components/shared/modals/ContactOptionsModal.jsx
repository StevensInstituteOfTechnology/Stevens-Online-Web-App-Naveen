import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Calendar,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  X,
} from 'lucide-react';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { BOOKING_URLS, CONTACT_INFO } from '@/config/constants';

/**
 * ContactOptionsModal - Modal for displaying contact options
 * @param {boolean} open - Modal open state
 * @param {Function} onOpenChange - Handler for open state changes
 * @param {string} sourcePage - Source page identifier for tracking (default: 'unknown')
 */
export default function ContactOptionsModal({
  open,
  onOpenChange,
  sourcePage = 'unknown',
}) {
  const [copiedItem, setCopiedItem] = useState(null);

  const handleClose = (isOpen) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setCopiedItem(null); // Reset copy state when closing
    }
  };

  const handleScheduleCall = () => {
    trackEvent('contact_option_selected', {
      option: 'schedule_call',
      page: sourcePage,
    });
    window.open(BOOKING_URLS.SCHEDULE_CALL, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  const handlePhoneClick = () => {
    trackEvent('contact_option_selected', {
      option: 'phone',
      page: sourcePage,
    });
  };

  const handleEmailClick = () => {
    trackEvent('contact_option_selected', {
      option: 'email',
      page: sourcePage,
    });
    navigator.clipboard.writeText(CONTACT_INFO.EMAIL);
    setCopiedItem('email');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 !top-[50%] !left-[50%] !-translate-x-1/2 !-translate-y-1/2 mx-4 shadow-2xl [&>button]:hidden">
        {/* Header with darker background for better contrast */}
        <div className="bg-stevens-black text-white px-6 py-6 rounded-t-lg border-b border-stevens-black/20 relative">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-center text-white">
              Get in Touch
            </DialogTitle>
          </DialogHeader>
          {/* Custom Close Button - White X for dark header */}
          <button
            onClick={() => handleClose(false)}
            className="absolute right-4 top-4 rounded-md opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stevens-dark-gray"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-5 bg-white">
          {/* Schedule a Call - Primary Action */}
          <button
            onClick={handleScheduleCall}
            className="w-full p-5 rounded-xl bg-stevens-dark-gray text-white hover:shadow-xl hover:bg-stevens-dark-gray transform hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden border-2 border-stevens-black/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-stevens-red group-hover:bg-stevens-red/30 flex items-center justify-center transition-colors">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold uppercase tracking-wide text-lg mb-1">
                  Schedule a Call
                </h3>
                <p className="text-sm text-white/90">
                  Book a convenient time for a personalized consultation
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/80 group-hover:text-stevens-red transition-colors flex-shrink-0" />
            </div>
          </button>

          {/* Divider */}
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stevens-light-gray"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-stevens-dark-gray font-medium">
                or reach us directly
              </span>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Card */}
            <a
              href={CONTACT_INFO.PHONE_LINK}
              onClick={handlePhoneClick}
              className="flex flex-col items-center p-5 rounded-xl border-2 border-stevens-light-gray hover:border-stevens-red hover:bg-stevens-light-gray hover:shadow-lg transition-all duration-300 group bg-white"
            >
              <div className="w-14 h-14 rounded-full bg-green-50 group-hover:bg-green-100 flex items-center justify-center mb-3 transition-colors shadow-sm">
                <Phone className="w-7 h-7 text-green-600" />
              </div>
              <span className="text-xs text-stevens-dark-gray/70 mb-1 font-medium uppercase tracking-wide">
                Call Us
              </span>
              <span className="font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors text-base">
                {CONTACT_INFO.PHONE_DISPLAY}
              </span>
            </a>

            {/* Email Card */}
            <button
              onClick={handleEmailClick}
              className="flex flex-col items-center p-5 rounded-xl border-2 border-stevens-light-gray hover:border-stevens-red hover:bg-stevens-light-gray hover:shadow-lg transition-all duration-300 group bg-white"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors shadow-sm">
                {copiedItem === 'email' ? (
                  <Check className="w-7 h-7 text-green-600" />
                ) : (
                  <Mail className="w-7 h-7 text-blue-600" />
                )}
              </div>
              <span className="text-xs text-stevens-dark-gray/70 mb-1 font-medium uppercase tracking-wide">
                {copiedItem === 'email' ? 'Copied!' : 'Email Us'}
              </span>
              <span className="font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors text-sm break-all mb-1">
                cpe@stevens.edu
              </span>
              <span className="text-xs text-stevens-dark-gray/60 mt-1 flex items-center gap-1">
                <Copy className="w-3 h-3" /> Click to copy
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
