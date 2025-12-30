
import React, { useState, useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  UserCheck, 
  Monitor, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  Building2,
  BookOpen,
  Users,
  Globe,
  X
} from 'lucide-react';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';

export default function ProfessionalEducation() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [browseModalOpen, setBrowseModalOpen] = useState(false);

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Professional Education Programs | Stevens Online');
    setMetaDescription('Explore Stevens\' professional education programs designed to advance your career with flexible, industry-driven coursework.');
    setOpenGraphTags({
      title: 'Professional Education Programs | Stevens Online',
      description: 'Explore Stevens\' professional education programs designed to advance your career with flexible, industry-driven coursework.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/professionaleducation/'),
      type: 'website'
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const focusAreas = [
    "AI & Generative AI",
    "Data & Analytics", 
    "Cloud & DevOps",
    "Cybersecurity",
    "Product & Innovation",
    "Systems"
  ];

  const steps = [
    {
      icon: Search,
      title: "1. Browse",
      description: "Explore our catalog of courses by topic and career outcome."
    },
    {
      icon: UserCheck,
      title: "2. Enroll", 
      description: "Choose your course and secure your seat in an upcoming cohort."
    },
    {
      icon: Monitor,
      title: "3. Learn",
      description: "Engage with practical, applied content that's 100% online."
    },
    {
      icon: Award,
      title: "4. Certify",
      description: "Earn a shareable Stevens certificate to showcase your new skill."
    }
  ];

  return (
    <div className="min-h-screen bg-stevens-white relative overflow-hidden font-stevens-body">
      {/* Subtle background elements */}
      <div className="absolute top-stevens-section right-stevens-xl w-96 h-96 bg-stevens-light-gray/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-stevens-section left-stevens-xl w-80 h-80 bg-stevens-light-gray/30 rounded-full blur-3xl pointer-events-none" />

      <PageHero 
        title="Professional Education Programs at Stevens"
        subtitle="Build job-ready skills, fast."
        bgImage="/assets/images/professional-education/1-professional-education.webp"
      />

      {/* Hero Section */}
      <div className="relative py-stevens-2xl bg-stevens-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
          <p className="text-stevens-xl text-stevens-dark-gray mb-stevens-lg leading-relaxed">
            Online courses from Stevens Professional Education. Gain in-demand expertise with flexible, 
            100% online learning designed for working professionals and current students.
          </p>
          
          <div className="flex flex-wrap justify-center gap-stevens-md mb-stevens-lg">
            {focusAreas.map((area, index) => (
              <Badge key={index} variant="outline" className="text-stevens-sm py-stevens-sm px-stevens-md bg-stevens-white/80 border-stevens-light-gray hover:border-stevens-red hover:bg-stevens-light-gray transition-all rounded-stevens-md">
                {area}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
            <Button 
              onClick={() => setSignInModalOpen(true)}
              className="btn-stevens-red px-stevens-xl py-stevens-md text-stevens-lg font-stevens-semibold"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => setBrowseModalOpen(true)}
              variant="outline-dark" 
              className="btn-stevens-outline px-stevens-xl py-stevens-md text-stevens-lg font-stevens-semibold"
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-stevens-section bg-stevens-light-gray">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">A Simple Path to Certification</h2>
            <p className="text-stevens-xl text-stevens-dark-gray max-w-2xl mx-auto">Go from Browse to a certified skill in four straightforward steps.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-stevens-lg">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="group text-center hover:shadow-stevens-2xl transition-all duration-stevens-normal border-0 shadow-stevens-lg bg-stevens-white/90 backdrop-blur-sm hover:-translate-y-2 rounded-stevens-md">
                  <CardContent className="p-stevens-lg">
                    <div className="bg-stevens-light-gray p-stevens-md rounded-stevens-md w-fit mx-auto mb-stevens-md group-hover:scale-110 transition-transform duration-stevens-normal">
                      <Icon className="w-10 h-10 text-stevens-red" />
                    </div>
                    <h3 className="font-stevens-display text-stevens-xl font-stevens-bold mb-stevens-md text-stevens-dark-gray">{step.title}</h3>
                    <p className="text-stevens-dark-gray leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Path Selection */}
      <div className="py-stevens-section bg-stevens-white relative">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="text-center mb-stevens-2xl">
            <h2 className="font-stevens-display text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">Choose Your Path</h2>
            <p className="text-stevens-xl text-stevens-dark-gray max-w-2xl mx-auto">Whether you're new to Stevens or already part of our community, we have you covered.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-stevens-2xl items-start">
            {/* Public Learners Path */}
            <Card className="group border-2 border-stevens-light-gray hover:border-stevens-red hover:shadow-2xl transition-all duration-300 bg-stevens-white">
              <CardHeader className="text-center pb-6">
                <div className="bg-stevens-light-gray p-6 rounded-stevens-md w-fit mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-16 h-16 text-stevens-red" />
                </div>
                <CardTitle className="font-stevens-display text-2xl text-stevens-dark-gray mb-3">Public Learner</CardTitle>
                <p className="text-stevens-dark-gray leading-relaxed">
                  Open to everyone. Enroll in any course and earn a Professional Graduate Certificate recognized by the industry.
                </p>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-sm text-stevens-dark-gray">
                    <Award className="w-5 h-5 text-stevens-red" />
                    <span>Industry-recognized certificates</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-stevens-dark-gray">
                    <BookOpen className="w-5 h-5 text-stevens-red" />
                    <span>Self-paced online learning</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-stevens-dark-gray">
                    <Users className="w-5 h-5 text-stevens-red" />
                    <span>Expert faculty instruction</span>
                  </div>
                </div>
                <a href="https://sit.catalog.instructure.com/browse/learners" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-stevens-red hover:bg-stevens-dark-gray text-white font-semibold py-3 group-hover:scale-105 transition-transform duration-300">
                    Browse Public Catalog
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Stevens Community Path */}
            <Card className="group border-2 border-stevens-light-gray hover:border-stevens-red hover:shadow-2xl transition-all duration-300 bg-stevens-white">
              <CardHeader className="text-center pb-6">
                <div className="bg-stevens-light-gray p-6 rounded-stevens-md w-fit mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-16 h-16 text-stevens-red" />
                </div>
                <CardTitle className="font-stevens-display text-2xl text-stevens-dark-gray mb-3">Stevens Learner</CardTitle>
                <p className="text-stevens-dark-gray leading-relaxed">
                  For current students, faculty, and staff. Access your included courses here.
                </p>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-sm text-stevens-dark-gray">
                    <Award className="w-5 h-5 text-stevens-red" />
                    <span>Included in your enrollment</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-stevens-dark-gray">
                    <Users className="w-5 h-5 text-stevens-red" />
                    <span>Exclusive Stevens content</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-stevens-dark-gray">
                    <Building2 className="w-5 h-5 text-stevens-red" />
                    <span>Priority support access</span>
                  </div>
                </div>
                <a href="https://stevens-sit.catalog.instructure.com/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-stevens-red hover:bg-stevens-dark-gray text-white font-semibold py-3 group-hover:scale-105 transition-transform duration-300">
                    Browse Stevens Catalog
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Browse Courses Modal */}
      <Dialog open={browseModalOpen} onOpenChange={setBrowseModalOpen}>
        <DialogContent className="sm:max-w-md mx-auto my-auto">
          <DialogHeader>
            <DialogTitle className="text-stevens-2xl font-bold text-center text-stevens-dark-gray">Browse Our Course Catalog</DialogTitle>
            <p className="text-stevens-dark-gray text-center">Are you a current Stevens student or a public learner?</p>
          </DialogHeader>
          <div className="flex flex-col gap-stevens-md pt-stevens-md">
            <a
              href="https://stevens-sit.catalog.instructure.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => setBrowseModalOpen(false)}>
              <Button className="w-full btn-stevens-red py-stevens-md text-stevens-lg font-semibold transition-all duration-stevens-normal">
                Stevens Member
              </Button>
            </a>
            <a
              href="https://sit.catalog.instructure.com/browse/learners"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => setBrowseModalOpen(false)}>
              <Button variant="outline-dark" className="w-full btn-stevens-outline py-stevens-md text-stevens-lg font-semibold transition-all duration-stevens-normal">
                Public Learner
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign In Modal */}
      <Dialog open={signInModalOpen} onOpenChange={setSignInModalOpen}>
        <DialogContent className="sm:max-w-md mx-auto my-auto">
          <DialogHeader>
            <DialogTitle className="text-stevens-2xl font-bold text-center text-stevens-dark-gray">Welcome Back</DialogTitle>
            <p className="text-stevens-dark-gray text-center">Please sign in to resume your coursework and track your progress.</p>
          </DialogHeader>
          <div className="flex flex-col gap-stevens-md pt-stevens-md">
            <a
              href="https://sit-online.instructure.com/login/trust"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => setSignInModalOpen(false)}>
              <Button className="w-full btn-stevens-red py-stevens-md text-stevens-lg font-semibold transition-all duration-stevens-normal">
                Stevens Member
              </Button>
            </a>
            <a
              href="https://sit-online.instructure.com/login/canvas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => setSignInModalOpen(false)}>
              <Button variant="outline-dark" className="w-full btn-stevens-outline py-stevens-md text-stevens-lg font-semibold transition-all duration-stevens-normal">
                Public Learner
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
