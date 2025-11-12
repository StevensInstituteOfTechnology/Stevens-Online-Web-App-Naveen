import React, { useState } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Laptop, Users, LifeBuoy, Library, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BOOKING_URLS } from '@/config/constants';
import RequestInfoModal from '../components/shared/RequestInfoModal';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

export default function OnlineExperience() {
  usePageTracking({
    pageType: 'content',
    additionalData: {
      page_name: 'Online Experience',
      has_dean_letter: true,
      has_rfi_modal: true
    }
  });

  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const features = [
    {
      icon: Laptop,
      title: "State-of-the-Art Learning Platform",
      description: "Engage with course materials, participate in discussions, and collaborate with peers through our intuitive and powerful online learning environment, accessible 24/7."
    },
    {
      icon: Users,
      title: "Collaborative Virtual Classrooms",
      description: "Experience live, interactive sessions with our world-class faculty and a diverse cohort of students. Our small class sizes ensure meaningful interaction and personalized attention."
    },
    {
      icon: LifeBuoy,
      title: "Comprehensive Student Support",
      description: "From enrollment to graduation, your dedicated student success advisor is here to help you navigate your academic journey, providing guidance and connecting you to resources."
    },
    {
      icon: Library,
      title: "Full Access to University Resources",
      description: "Online students enjoy full access to the Stevens digital library, career services, alumni network, and technical support, ensuring you are a fully integrated member of our community."
    }
  ];

  return (
    <PageContextProvider pageType="content" pageName="OnlineExperience">
    <div>
      <PageHero 
        title="Online Education"
        subtitle="A premier, technology-driven education, delivered with flexibility."
        bgImage="/assets/images/1-online-learning-hero-scaled.webp"
      />
      
      {/* Welcome Message from Dean Arshad */}
      <div className="py-20 bg-stevens-gray-50">
        <div className="max-w-5xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <Card className="shadow-stevens-2xl border border-stevens-gray-200 rounded-stevens-lg overflow-hidden">
            <CardContent className="p-0">
              {/* Header with Dean's Photo and Title */}
              <div className="bg-gradient-to-r from-gray-600 to-red-800 text-white p-stevens-lg stevens-md:p-stevens-xl">
                <div className="flex flex-col stevens-md:flex-row items-center gap-stevens-lg">
                  <img
                    src="/assets/avatars/home-avatar/ArshadS_H_S_L.webp"
                    alt="Arshad Saiyed, Chief Online Learning Officer and Dean"
                    className="w-32 h-32 stevens-md:w-40 stevens-md:h-40 rounded-full object-cover border-4 border-white shadow-stevens-xl"
                  />
                  <div className="text-center stevens-md:text-left">
                    <h2 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold mb-stevens-xs">
                      Arshad Saiyed
            </h2>
                    <p className="text-stevens-base stevens-md:text-stevens-lg font-stevens-medium text-white/90">
                      Chief Online Learning Officer and Dean of the College of Professional Education
              </p>
            </div>
          </div>
        </div>
      
              {/* Letter Content */}
              <div className="p-stevens-lg stevens-md:p-stevens-2xl bg-white">
                <h3 className="font-stevens-display text-stevens-xl stevens-md:text-stevens-2xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg">
                </h3>
                
                <div className="prose prose-lg max-w-none text-stevens-gray-700 leading-relaxed space-y-stevens-md">
                  <p>
                    Welcome to Stevens Online. For more than 150 years, Stevens Institute of Technology has been at the forefront of innovation, shaping the future through technology, research, and education. Stevens is consistently ranked among the nation's top universities for return on investment, reflecting both the quality and long-term value of a Stevens education.
                  </p>
                  <p>
                    That same commitment to excellence defines our online learning experience. Stevens Online offers rigorous, engaging, and flexible programs designed by expert faculty, industry-aligned, and focused on real-world application. Our students learn alongside professionals from across the world, gaining skills that are immediately relevant to their careers and preparing them to lead in a rapidly changing environment.
                  </p>
                  <p>
                    Building on this strong foundation, Stevens has created a new College of Professional Education to expand access to high-impact, technology-driven education for working professionals and corporate partners.
                  </p>
                  <p>
                    I invite you to explore our programs and experience how Stevens continues to set the standard for excellence and innovation in online learning and professional education.
            </p>
          </div>
          
                {/* Signature */}
                <div className="mt-stevens-xl">
                <img 
                    src="/assets/images/arshad-signature.png"
                    alt="Arshad Saiyed Signature"
                    className="h-16 stevens-md:h-20 w-auto mb-stevens-sm"
                  />
                  <p className="font-stevens-semibold text-stevens-gray-900">
                    Arshad Saiyed
              </p>
                  <p className="text-stevens-sm text-stevens-gray-600">
                    Chief Online Learning Officer and Dean<br />
                    College of Professional Education <br />
                    Stevens Institute of Technology
                  </p>
            </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      

      
      <div className="py-20 bg-stevens-gray-100">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="text-center mb-16">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900">What to Expect as an Online Student</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-stevens-lg hover:shadow-stevens-xl transition-shadow duration-stevens-normal rounded-stevens-md">
                  <CardContent className="p-stevens-lg pt-stevens-lg">
                    <div className="flex items-center gap-stevens-md">
                      <div className="bg-stevens-gray-100 p-stevens-sm rounded-stevens-md">
                        <Icon className="w-8 h-8 text-stevens-primary" />
                      </div>
                      <h3 className="font-stevens-display text-stevens-2xl font-stevens-semibold">{feature.title}</h3>
                    </div>
                    <p className="mt-stevens-md text-stevens-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

       <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Students collaborating online" className="rounded-stevens-md shadow-xl mb-8" />
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md">Ready to Learn More?</h2>
          <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed mb-stevens-lg">
            Connect with our admissions team to get your questions answered and find out if an online program at Stevens is the right fit for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)} className="w-full sm:w-auto">
                  <Button className="w-full btn-secondary px-8 py-3 text-lg">Schedule a Call</Button>
                </a>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto btn-outline-maroon px-8 py-3 text-lg"
                  onClick={() => {
                    trackConversion(CONVERSION_LABELS.REQUEST_INFO);
                    setShowRequestInfoModal(true);
                  }}
                >
                        Request Information
                    </Button>
           </div>
        </div>
      </div>

      {/* Request Info Modal */}
      <RequestInfoModal 
        isOpen={showRequestInfoModal}
        onClose={() => setShowRequestInfoModal(false)}
        sourcePage="online_experience_page"
        programOfInterest=""
      />
    </div>
    </PageContextProvider>
  );
}