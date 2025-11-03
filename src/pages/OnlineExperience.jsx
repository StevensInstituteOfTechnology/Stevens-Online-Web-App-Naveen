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

export default function OnlineExperience() {
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
    <div>
      <PageHero 
        title="Online Education"
        subtitle="A premier, technology-driven education, delivered with flexibility."
        bgImage="/assets/images/1-online-learning-hero-scaled.webp"
      />
      
      {/* Welcome to Stevens Section */}
      <div className="py-20 bg-stevens-white">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-xl text-center">
              Welcome to Stevens
            </h2>
            <div className="prose prose-lg max-w-none text-stevens-gray-700 leading-relaxed space-y-stevens-lg">
              <p>
                Thank you for your interest in Stevens Institute of Technology online graduate programs. We're excited to be considered in your search for a graduate program that fits your career goals and professional lifestyle.
              </p>
              <p>
                Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world.
              </p>
              <p>
                From our nationally recognized stature (the U.S. Distance Learning Association awarded Stevens the 21st Century Award for Best Practices in Distance Learning), to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.
              </p>
              <p>
                Whether you are familiar with Stevens or discovering our programs for the first time, welcome to Stevens Institute of Technology.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Experienced Faculty Section */}
      <div className="py-20 bg-stevens-gray-100">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg">
              Experienced Faculty
            </h2>
            <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed max-w-4xl mx-auto">
              Our faculty members are not just educators-they are industry leaders, researchers, and innovators who bring real-world expertise to the classroom. They contribute to cutting-edge research, healthcare advancements, critical thinking, and innovation that shapes the future of technology and business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-stevens-xl">
            {/* Faculty Member 1 */}
            <div className="text-center">
              <div className="mb-stevens-lg">
                <img 
                  src="/assets/avatars/online-experience-avatar/shudong-hao-stevens-faculty.jpeg" 
                  alt="Shudong Hao, Online MSCS Program Director / Assoc. Chair of Graduate Studies at Stevens Institute of Technology"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-stevens-white shadow-stevens-lg"
                />
              </div>
              <h3 className="font-stevens-bold text-stevens-xl text-stevens-gray-900 mb-stevens-sm">
                Shudong Hao
              </h3>
              <p className="text-stevens-primary font-stevens-semibold mb-stevens-md">
                Online MSCS Program Director / Assoc. Chair of Graduate Studies
              </p>
              <a 
                href="https://www.stevens.edu/profile/shao14" 
                className="text-stevens-primary hover:text-stevens-maroon-dark font-stevens-medium transition-colors duration-stevens-normal"
              >
                Read More
              </a>
            </div>
            
            {/* Faculty Member 2 */}
            <div className="text-center">
              <div className="mb-stevens-lg">
                <img 
                  src="/assets/avatars/online-experience-avatar/brian-rothschild-stevens-institute-omba-faculty.jpg" 
                  alt="Brian Rothschild, Online MBA Program Director at Stevens Institute of Technology"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-stevens-white shadow-stevens-lg"
                />
              </div>
              <h3 className="font-stevens-bold text-stevens-xl text-stevens-gray-900 mb-stevens-sm">
                Brian Rothschild
              </h3>
              <p className="text-stevens-primary font-stevens-semibold mb-stevens-md">
                Online MBA Program Director
              </p>
              <a 
                href="https://www.stevens.edu/school-business/faculty" 
                className="text-stevens-primary hover:text-stevens-maroon-dark font-stevens-medium transition-colors duration-stevens-normal"
              >
                Read More
              </a>
            </div>
            
            {/* Faculty Member 3 */}
            <div className="text-center">
              <div className="mb-stevens-lg">
                <img 
                  src="/assets/avatars/online-experience-avatar/carlo-lipizzi-stevens-faculty.jpg" 
                  alt="Carlo Lipizzi, MEM Program Director and Professor at Stevens Institute of Technology"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-stevens-white shadow-stevens-lg"
                />
              </div>
              <h3 className="font-stevens-bold text-stevens-xl text-stevens-gray-900 mb-stevens-sm">
                Carlo Lipizzi
              </h3>
              <p className="text-stevens-primary font-stevens-semibold mb-stevens-md">
                MEM Program Director and Professor
              </p>
              <a 
                href="https://www.stevens.edu/profile/clipizzi" 
                className="text-stevens-primary hover:text-stevens-maroon-dark font-stevens-medium transition-colors duration-stevens-normal"
              >
                Read More
              </a>
            </div>
          </div>
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
                <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}>
                  <Button className="btn-secondary px-8 py-3 text-lg">Schedule a Call</Button>
                </a>
                <Button 
                  variant="outline" 
                  className="btn-outline-maroon px-8 py-3 text-lg"
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
  );
}