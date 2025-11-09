import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, TrendingUp, Users, Lightbulb, Cpu,
  BookOpen, Check, Play, ChevronRight, Target, FlaskConical
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearningExcellenceSection = () => {
  const [activeTab, setActiveTab] = useState('experiential');

  const stats = [
    { value: '99%', label: 'Employment Rate', sublabel: 'Within 6 months of graduation' },
    { value: '7x', label: 'Distance Learning Award Winner', sublabel: 'USDLA Best Practices' },
    { value: '50+', label: 'Industry Partnerships', sublabel: 'WorldQuant, AWS, IBM & more' }
  ];

  const dimensions = [
    {
      id: 'experiential',
      label: 'Experiential Learning',
      icon: Target,
      title: 'Real-World Projects, Real Impact',
      description: 'Every course culminates in hands-on capstone projects that mirror actual enterprise challenges in regulated industries.',
      features: [
        'Industry-authentic case studies from financial services',
        'Team-based simulations of production incidents',
        'Portfolio-ready deliverables (architecture docs, models, dashboards)',
        'Live code reviews and threat modeling exercises'
      ],
      image: '/assets/images/explore-cert-ADS-1.jpg',
      stat: { value: '100%', label: 'of courses include applied projects' }
    },
    {
      id: 'ai-enabled',
      label: 'AI-Powered Learning',
      icon: Cpu,
      title: 'Intelligent, Adaptive Experiences',
      description: 'Leverage AI to accelerate learning with personalized feedback, adaptive scenarios, and intelligent tutoring systems.',
      features: [
        'AI-powered code feedback and suggestions',
        'Adaptive quiz generation based on performance',
        'LLM-assisted project feedback loops',
        'Automated vulnerability scanning in labs'
      ],
      image: '/assets/images/Prudential-1.jpg',
      stat: { value: '24/7', label: 'AI-assisted learning support' }
    },
    {
      id: 'market-aligned',
      label: 'Market-Aligned Content',
      icon: TrendingUp,
      title: 'Industry Partnerships & Practitioner Faculty',
      description: 'Curriculum co-designed with employers like WorldQuant, AWS, and leading financial institutions to address current market demands.',
      features: [
        'Faculty are active practitioners in their fields',
        'Guest lectures from Prudential-adjacent firms',
        'Curriculum reviewed quarterly with employer advisory board',
        'Job-skill mapping to LinkedIn, Lightcast data'
      ],
      image: '/assets/images/2-event.png',
      stat: { value: '85%', label: 'of faculty are industry practitioners' }
    },
    {
      id: 'practice-environments',
      label: 'Practice Environments',
      icon: FlaskConical,
      title: 'Cloud Labs & Production-Like Sandboxes',
      description: 'Access to AWS, Azure, Databricks, and Kubernetes environments with real (anonymized) datasets for hands-on practice.',
      features: [
        'Isolated cloud accounts for experimentation',
        'Pre-configured Kubernetes clusters',
        'Synthetic financial datasets mirroring production scale',
        'CI/CD lab environments with security scanning'
      ],
      image: '/assets/images/AcceleratedApplication-1.jpg',
      stat: { value: '$500+', label: 'cloud credit value per student' }
    },
    {
      id: 'reflection',
      label: 'Reflection & Interaction',
      icon: Users,
      title: 'Cohort Collaboration & Deep Discussion',
      description: 'Structured peer review, asynchronous discussions, and faculty office hours foster critical thinking and knowledge synthesis.',
      features: [
        'Structured peer code/design reviews',
        'Weekly faculty office hours (live + async)',
        'Reflective journals and post-project debriefs',
        'Cohort Slack/Teams channels for real-time collaboration'
      ],
      image: '/assets/images/1-omba-hero-scaled.webp',
      stat: { value: '15:1', label: 'student-to-faculty ratio' }
    }
  ];

  const partnerships = [
    { name: 'WorldQuant', logo: '/assets/company_logo/WQU_logo_color.png', description: 'Quantitative finance & data science' },
    { name: 'AWS', logo: '/assets/company_logo/Amazon_Web_Services_Logo.svg.png', description: 'Cloud infrastructure & security' },
    { name: 'IBM', logo: '/assets/company_logo/IBM_logo.svg.png', description: 'AI & enterprise solutions' },
    { name: 'Databricks', logo: '/assets/company_logo/Databricks-logo.svg.png', description: 'Unified analytics platform' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stevens-maroon/40 border-2 border-stevens-maroon/70 mb-6 backdrop-blur-md shadow-lg"
          style={{ 
            boxShadow: '0 4px 16px rgba(163, 38, 56, 0.4), 0 0 0 1px rgba(163, 38, 56, 0.2)',
            background: 'linear-gradient(135deg, rgba(163, 38, 56, 0.5) 0%, rgba(163, 38, 56, 0.3) 100%)'
          }}
        >
          <Award className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white">The Stevens Advantage</span>
        </div>
        <h2 className="text-4xl font-bold mb-4 text-slate-200" >Best-in-Class Online Learning</h2>
        <p className="text-xl text-slate-200 max-w-3xl mx-auto">
          Experiential, AI-enabled, and market-aligned — delivering transformational outcomes for corporate learners
        </p>
      </motion.div>

      {/* Hero Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-lg border border-slate-600/40 text-center"
          >
            <div className="text-4xl font-bold text-stevens-maroon mb-2">{stat.value}</div>
            <div className="font-semibold mb-1 text-white">{stat.label}</div>
            <div className="text-sm text-slate-100">{stat.sublabel}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabbed Dimensions */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-slate-800/90 p-1 rounded-lg">
          {dimensions.map((dim) => (
            <TabsTrigger
              key={dim.id}
              value={dim.id}
              className="flex items-center gap-2 text-slate-200 data-[state=active]:bg-[#A32638] data-[state=active]:text-white transition-all duration-200 rounded-md text-sm hover:bg-slate-700/80 hover:text-white"
            >
              <dim.icon className="w-4 h-4" />
              <span className="hidden md:inline">{dim.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {dimensions.map((dim) => (
          <TabsContent key={dim.id} value={dim.id} className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 p-8 rounded-xl bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-lg border border-slate-600/40"
            >
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#A32638]/20 flex items-center justify-center">
                      <dim.icon className="w-6 h-6 text-[#A32638]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{dim.title}</h3>
                  </div>
                  <p className="text-slate-100 leading-relaxed">{dim.description}</p>
                </div>

                <div className="space-y-3">
                  {dim.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-100">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stat */}
                <div className="p-4 rounded-lg bg-[#A32638]/10 border border-[#A32638]/30">
                  <div className="text-3xl font-bold text-[#A32638] mb-1">
                    {dim.stat.value}
                  </div>
                  <div className="text-sm text-slate-100">{dim.stat.label}</div>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={dim.image}
                  alt={dim.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/25 backdrop-blur-sm hover:bg-white/35 transition-colors font-semibold text-sm">
                    <Play className="w-4 h-4" />
                    See It In Action
                  </button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Industry Partnerships */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 text-white">Powered by Industry Partnerships</h3>
          <p className="text-slate-100">Co-designed with leading employers and technology providers</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {partnerships.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-slate-300 border border-slate-400 text-center hover:border-slate-500 transition-all duration-300 hover:shadow-xl hover:bg-slate-200 hover:scale-105 -translate-y-1 hover:translate-y-0 flex flex-col items-center justify-center min-h-[180px]"
            >
              {/* Company Logo */}
              <div className="mb-4 flex items-center justify-center h-16 md:h-20 w-full">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain grayscale-0 opacity-100 transition-all duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Hide image and show placeholder on error
                      e.target.style.display = 'none';
                      const placeholder = e.target.parentElement.querySelector('.logo-placeholder');
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Placeholder logo - shown when no logo or image fails */}
                <div 
                  className="logo-placeholder w-full h-full items-center justify-center bg-gray-100 rounded-lg"
                  style={{ display: partner.logo ? 'none' : 'flex' }}
                >
                  <div className="text-gray-400 font-bold text-xl md:text-2xl">
                    {partner.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div className="font-bold mb-2 text-stevens-maroon group-hover:text-stevens-maroon-dark transition-colors duration-300">{partner.name}</div>
              <div className="text-sm text-gray-600">{partner.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Methodology CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-white">Want to see our learning methodology in action?</h3>
        <p className="text-slate-100 mb-6 max-w-2xl mx-auto">
          Schedule a demo to experience our AI-powered labs, see sample projects, and explore the tools your team will use
        </p>
        <button
          onClick={() => alert('Demo scheduling feature coming soon!')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#A32638] hover:bg-[#8B1F2E] transition-all duration-200 font-semibold text-lg"
        >
          Schedule a Demo
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

export default LearningExcellenceSection;

