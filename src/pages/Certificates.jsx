import React from 'react';
import { PageHero } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function Certificates() {
  return (
    <div>
      <PageHero
        title="Certificates & Short Courses"
        subtitle="Sharpen your skills and advance your career with professional education from Stevens."
        bgImage="/assets/images/professional-education/1-professional-education.webp"
      />
      <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl py-20 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-r-lg mb-12 text-left">
           <h3 className="font-bold flex items-center gap-2"><BookOpen className="w-5 h-5"/> A New Hub for Professional Education</h3>
           <p className="mt-2">To better serve our professional learners, we have centralized all of our certificates and short courses on our new Professional Education portal. Explore the full catalog to find courses in AI, data analytics, cybersecurity, and more.</p>
        </div>

        <h2 className="font-stevens-headers text-3xl font-bold mb-4">Explore Our Full Course Catalog</h2>
        <p className="font-stevens-body text-lg text-stevens-dark-gray mb-8">
          Our new Professional Education page is your one-stop destination for all non-degree programs. 
          Discover flexible, online courses designed to provide in-demand expertise for working professionals and current students.
        </p>
        <Link to={createPageUrl("ProfessionalEducation")}>
          <Button size="lg" className="btn-secondary px-10 text-stevens-lg font-stevens-body">
            Go to Professional Education <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}