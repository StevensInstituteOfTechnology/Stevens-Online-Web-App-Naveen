import React, { useEffect } from 'react';
import { PageHero } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, FileText, Phone, Mail, Building, ArrowRight, BookOpen, LinkIcon } from 'lucide-react';
import { CONTACT_INFO } from '@/config/constants';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';

const FinancialAidOption = ({ title, children }) => (
  <AccordionItem value={title} className="border border-gray-200 rounded-lg px-5 bg-white shadow-sm data-[state=open]:shadow-md transition-shadow">
    <AccordionTrigger className="font-stevens-headers text-lg md:text-xl text-left py-5 hover:text-stevens-red hover:no-underline [&[data-state=open]]:text-stevens-red">
      {title}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none text-stevens-dark-gray leading-relaxed pb-5">
      {children}
    </AccordionContent>
  </AccordionItem>
);

export default function Tuition() {
  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Online Tuition & Financial Aid | Stevens Online');
    setMetaDescription('Discover online master\'s program costs, tuition rates, and financial aid options for Stevens Online graduate degrees.');
    setOpenGraphTags({
      title: 'Online Tuition & Financial Aid | Stevens Online',
      description: 'Discover online master\'s program costs, tuition rates, and financial aid options for Stevens Online graduate degrees.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/tuition-and-financial-aid/'),
      type: 'website'
    });
  }, []);

  return (
    <div className="bg-stevens-light-gray">
      <PageHero
        title="Tuition & Financial Aid Overview"
        subtitle="Financial Options for Our Online Programs"
        bgImage="/assets/images/tuition/1-tuition-hero-scaled.webp"
        
       
      />

      <div className="max-w-stevens-content-max  mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl py-stevens-section-sm lg:py-stevens-section">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            <div>
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide mb-stevens-md text-stevens-black">
                Financing Your Degree
                <span className="block w-16 h-1 bg-stevens-red mt-4"></span>
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                Students have various options to fund their tuition. We have included some of the most frequently used funding options below, but encourage you to consult with the Office of Financial Aid or a financial advisor when determining the best way to fund your tuition.
              </p>
            </div>

            {/* Tuition Structure Update */}
            <Card className="bg-white border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="font-stevens-display text-xl md:text-2xl text-stevens-black font-medium leading-tight">
                  Tuition Structure Update: For Online M.S. in Computer Science and Online MEM Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-stevens-dark-gray leading-relaxed">
                  Effective Spring & Summer 2026, the Online M.S. in Computer Science and Online Master of Engineering in Engineering Management programs will incorporate asynchronous course delivery for the initial phase of their curriculum. This change will impact the tuition rates for some courses.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-stevens-dark-gray mb-3">Online M.S. in Computer Science</h4>
                    <ul className="space-y-2 text-stevens-dark-gray">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-stevens-red rounded-full mt-2 flex-shrink-0"></span>
                        <span><span className="font-medium">Traditional Track:</span> First four courses are asynchronous.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-stevens-red rounded-full mt-2 flex-shrink-0"></span>
                        <span><span className="font-medium">Advanced Track:</span> First two courses are asynchronous.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-stevens-dark-gray mb-3">Online MEM</h4>
                    <ul className="space-y-2 text-stevens-dark-gray">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-stevens-red rounded-full mt-2 flex-shrink-0"></span>
                        <span>First two courses are asynchronous.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grants */}
            <div className="text-center">
              <h3 className="font-stevens-display text-2xl md:text-3xl font-light uppercase tracking-wide mb-3 text-stevens-black">
                Tuition Rate Support
              </h3>
              <p className="text-stevens-dark-gray mb-8 max-w-2xl mx-auto leading-relaxed">
                To support this transition, Stevens provides two grants that apply a reduced per-credit tuition rate to the first two asynchronous courses.
              </p>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {/* Aspire Grant - Dark Theme */}
                <Card className="text-center shadow-lg bg-stevens-dark-gray border-0 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-center gap-3 text-white">
                      <Award className="text-stevens-red w-6 h-6" /> Aspire Grant
                    </CardTitle>
                    <p className="text-sm text-gray-300">(for standard applicants)</p>
                  </CardHeader>
                  <CardContent className="pt-4 pb-8">
                    <p className="font-stevens-headers text-5xl md:text-6xl font-bold text-white mb-2">$3,120</p>
                    <p className="text-gray-300 text-lg">in tuition support</p>
                  </CardContent>
                </Card>
                {/* Pathway Grant - Light Theme with Red Border */}
                <Card className="text-center shadow-lg bg-white border-2 border-stevens-red overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-center gap-3 text-stevens-dark-gray">
                      <Award className="text-stevens-red w-6 h-6" /> Pathway Grant
                    </CardTitle>
                    <p className="text-sm text-stevens-gray">(for ASAP applicants)</p>
                  </CardHeader>
                  <CardContent className="pt-4 pb-8">
                    <p className="font-stevens-headers text-5xl md:text-6xl font-bold text-stevens-red mb-2">$3,120</p>
                    <p className="text-stevens-dark-gray text-lg">in tuition support</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tuition and Fees Tabs */}
            <div>
              <h2 className="font-stevens-display text-2xl md:text-3xl font-light uppercase tracking-wide mb-8 text-stevens-black">
                Tuition and Fees
                <span className="block w-16 h-1 bg-stevens-red mt-4"></span>
              </h2>
              <Tabs defaultValue="mscs" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white rounded-lg mb-6 shadow-sm">
                  <TabsTrigger value="mscs" className="py-3 px-4 text-sm font-semibold data-[state=active]:bg-stevens-red data-[state=active]:text-white rounded-md transition-all">Online MSCS</TabsTrigger>
                  <TabsTrigger value="mem" className="py-3 px-4 text-sm font-semibold data-[state=active]:bg-stevens-red data-[state=active]:text-white rounded-md transition-all">Online MEM</TabsTrigger>
                  <TabsTrigger value="mba" className="py-3 px-4 text-sm font-semibold data-[state=active]:bg-stevens-red data-[state=active]:text-white rounded-md transition-all">Online MBA</TabsTrigger>
                </TabsList>
                <TabsContent value="mscs">
                  <Card className="shadow-md border-0 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-stevens-dark-gray hover:bg-stevens-dark-gray">
                          <TableHead className="text-white font-semibold py-4">Program</TableHead>
                          <TableHead className="text-white font-semibold py-4">Credits</TableHead>
                          <TableHead className="text-white font-semibold py-4">Cost Per Credit</TableHead>
                          <TableHead className="text-white font-semibold py-4 text-right">Est. Tuition*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-white hover:bg-gray-50">
                          <TableCell className="py-4 font-medium">Online MSCS</TableCell>
                          <TableCell className="py-4">24</TableCell>
                          <TableCell className="py-4">$1,395</TableCell>
                          <TableCell className="py-4 text-right font-medium">$33,480</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-100/50">
                          <TableCell className="py-4 font-medium">Online MSCS (asynchronous)</TableCell>
                          <TableCell className="py-4">6</TableCell>
                          <TableCell className="py-4">$875</TableCell>
                          <TableCell className="py-4 text-right font-medium">$5,250</TableCell>
                        </TableRow>
                        <TableRow className="bg-white hover:bg-gray-50 border-t-2 border-stevens-red">
                          <TableCell colSpan="3" className="py-4 font-bold text-right text-stevens-dark-gray">Total Estimated Tuition</TableCell>
                          <TableCell className="py-4 font-bold text-right text-stevens-red text-lg">$38,730</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
                <TabsContent value="mem">
                  <Card className="shadow-md border-0 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-stevens-dark-gray hover:bg-stevens-dark-gray">
                          <TableHead className="text-white font-semibold py-4">Program</TableHead>
                          <TableHead className="text-white font-semibold py-4">Credits</TableHead>
                          <TableHead className="text-white font-semibold py-4">Cost Per Credit</TableHead>
                          <TableHead className="text-white font-semibold py-4 text-right">Est. Tuition*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-white hover:bg-gray-50">
                          <TableCell className="py-4 font-medium">Online MEM</TableCell>
                          <TableCell className="py-4">24</TableCell>
                          <TableCell className="py-4">$1,395</TableCell>
                          <TableCell className="py-4 text-right font-medium">$33,480</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-100/50">
                          <TableCell className="py-4 font-medium">Online MEM (asynchronous)</TableCell>
                          <TableCell className="py-4">6</TableCell>
                          <TableCell className="py-4">$875</TableCell>
                          <TableCell className="py-4 text-right font-medium">$5,250</TableCell>
                        </TableRow>
                        <TableRow className="bg-white hover:bg-gray-50 border-t-2 border-stevens-red">
                          <TableCell colSpan="3" className="py-4 font-bold text-right text-stevens-dark-gray">Total Estimated Tuition</TableCell>
                          <TableCell className="py-4 font-bold text-right text-stevens-red text-lg">$38,730</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
                <TabsContent value="mba">
                  <Card className="shadow-md border-0 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-stevens-dark-gray hover:bg-stevens-dark-gray">
                          <TableHead className="text-white font-semibold py-4">Program</TableHead>
                          <TableHead className="text-white font-semibold py-4">Credits</TableHead>
                          <TableHead className="text-white font-semibold py-4">Cost Per Credit</TableHead>
                          <TableHead className="text-white font-semibold py-4 text-right">Est. Tuition*</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-white hover:bg-gray-50">
                          <TableCell className="py-4 font-medium">Online MBA</TableCell>
                          <TableCell className="py-4">39-48</TableCell>
                          <TableCell className="py-4">$1,395</TableCell>
                          <TableCell className="py-4 text-right font-medium text-stevens-red text-lg">$54,405 - $66,960</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
              <p className="p-4 text-center text-sm text-stevens-dark-gray italic mt-4">
                *Tuition estimates based on Spring & Summer 2026 rates. Tuition and fees are subject to change annually. Additional program fees may apply.
              </p>
            </div>

            {/* Average Cost Table */}
            <div>
              <h2 className="font-stevens-display text-2xl md:text-3xl font-light uppercase tracking-wide mb-8 text-stevens-black">
                Average Cost of Stevens Online Programs
                <span className="block w-16 h-1 bg-stevens-red mt-4"></span>
              </h2>
              <Card className="shadow-md border-0 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-stevens-dark-gray hover:bg-stevens-dark-gray">
                      <TableHead className="text-white font-semibold py-4">Item</TableHead>
                      <TableHead className="text-white font-semibold py-4 text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-white hover:bg-gray-50">
                      <TableCell className="py-4">First two asynchronous courses: Online MSCS/Online MEM</TableCell>
                      <TableCell className="py-4 text-right font-medium">$2,625 per course</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-50 hover:bg-gray-100">
                      <TableCell className="py-4">Tuition</TableCell>
                      <TableCell className="py-4 text-right font-medium">$1,395 per credit hour</TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:bg-gray-50">
                      <TableCell className="py-4">Tuition (First two asynchronous courses: Online MSCS/Online MEM)</TableCell>
                      <TableCell className="py-4 text-right font-medium">$875 per credit hour</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-50 hover:bg-gray-100">
                      <TableCell className="py-4">Annual Health Insurance Fee*</TableCell>
                      <TableCell className="py-4 text-right font-medium">$2,204</TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:bg-gray-50">
                      <TableCell className="py-4">Student Activity Fee**</TableCell>
                      <TableCell className="py-4 text-right font-medium">$275 per semester</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-50 hover:bg-gray-100">
                      <TableCell className="py-4">General Services Fee – Part Time***</TableCell>
                      <TableCell className="py-4 text-right font-medium">$452 per semester</TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:bg-gray-50">
                      <TableCell className="py-4">General Services Fee – Full Time***</TableCell>
                      <TableCell className="py-4 text-right font-medium">$688 per semester</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-50 hover:bg-gray-100">
                      <TableCell className="py-4">Books</TableCell>
                      <TableCell className="py-4 text-right font-medium">$1,000</TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:bg-gray-50">
                      <TableCell className="py-4">Miscellaneous</TableCell>
                      <TableCell className="py-4 text-right font-medium">$1,050</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <CardContent className="text-sm text-stevens-dark-gray space-y-2 pt-6 pb-6 bg-white border-t border-gray-200">
                  <p>Graduate costs are subject to change annually.</p>
                  <p className="text-xs">*Health Insurance can be waived online with proof of comparable insurance.</p>
                  <p className="text-xs">**Student Activity Fee is charged for students enrolled full-time (9 credits or more) on campus, online, or in Co-op.</p>
                  <p className="text-xs">***General Service Fee is charged for courses on campus, online, Maintenance of Full-Time Status (Dean-999), CPT, and Co-op.</p>
                </CardContent>
              </Card>
            </div>

            {/* Financial Aid Section */}
            <div>
              <h2 className="font-stevens-display text-2xl md:text-3xl font-light uppercase tracking-wide mb-6 text-stevens-black">
                Financial Aid
                <span className="block w-16 h-1 bg-stevens-red mt-4"></span>
              </h2>
              <p className="mb-6 text-stevens-dark-gray leading-relaxed text-lg">
                As a graduate student, you may qualify for federal support in the form of loans. We strongly encourage every eligible graduate student to apply for federal financial aid, even if you don't demonstrate an exceptional financial need. Applying for federal aid is one of the largest and most common ways for graduate students to finance advanced study, and a key part of making your program more affordable.
              </p>
              <div className="p-5 bg-white border-l-4 border-stevens-red text-stevens-dark-gray rounded-r-lg mb-8 shadow-sm">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">Please note:</span> Students in the Online M.S. in Computer Science and Online MEM programs who choose the ASAP application will not be eligible for federal financial aid until they matriculate into the master's degree program, which occurs after successfully completing two courses with a grade of B or higher.
              </p>
              </div>
              <h3 className="font-stevens-display text-xl md:text-2xl font-medium mt-10 mb-6 text-stevens-dark-gray">
                Financial Assistance Options for Graduate Students
              </h3>
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="item-1">
                <FinancialAidOption title="Dean’s Merit Scholar Program">
                  <p>Students in the Online MSCS and MEM programs may be eligible for up to $10,000 in scholarship support, while those in the Online MBA program may qualify for up to $25,000 - both based on academic merit. Contact your enrollment advisor to learn more about eligibility.</p>
                </FinancialAidOption>
                <FinancialAidOption title="Direct Unsubsidized Loans">
                  <p>Direct Unsubsidized Loans do not require you to demonstrate financial need to be eligible for the loan. The Direct Unsubsidized Loan for graduate students has a fixed interest rate. The interest on the loan begins to accrue as soon as Stevens receives the first funds. Visit the Federal Aid for Graduate Students page for more information.</p>
                </FinancialAidOption>
                <FinancialAidOption title="Direct Plus Loans">
                  <p>PLUS loans are available if you need to borrow more than what you receive in unsubsidized loans. These loans have higher interest rates and fees than unsubsidized loans and also require a credit check. If you have an adverse credit history, you will need to complete additional documentation and credit counseling before you can receive the loan. Visit the Federal Aid for Graduate Students page for more information.</p>
                </FinancialAidOption>
                <FinancialAidOption title="Private Loans">
                  <p>We strongly recommend that all eligible students apply for federal financial aid and plan to use all offered federal grants and loans before deciding to borrow private student loans. The best time to decide whether to apply for private loans is after you have been accepted to Stevens, applied for aid, and received your aid letter from our financial aid office. Visit the Alternative Financing Options for Graduate Students page for more information.</p>
                </FinancialAidOption>
                <FinancialAidOption title="International Student Loan Resources">
                  <p>We welcome students from all over the world who wish to pursue an advanced degree at Stevens. As is the case with graduate study throughout the United States, aid to international graduate students (those studying in the U.S. on visas) is limited. However, several options are still available and we’re here to help you find them so that you can join us for postgraduate study. Visit the Graduate International Student Resources page for more information.</p>
                </FinancialAidOption>
              </Accordion>
            </div>

            {/* Alumni & Veterans */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="font-stevens-display text-xl md:text-2xl font-medium text-stevens-dark-gray flex items-center gap-3">
                    <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-stevens-red shadow-sm">
                      <Award className="w-5 h-5 text-stevens-red" />
                    </span>
                    Alumni Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-stevens-dark-gray leading-relaxed'>
                    Stevens alumni can take advantage of a <span className="font-bold text-stevens-red">15% discount</span> when they enroll in a Stevens Graduate program. Visit the{' '}
                    <a href="https://www.stevens.edu/admission-aid/graduate-admissions" target="_blank" rel="noopener noreferrer" className="text-stevens-red hover:underline font-medium">
                      Graduate Admissions page
                    </a>{' '}
                    for more information.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="font-stevens-display text-xl md:text-2xl font-medium text-stevens-dark-gray flex items-center gap-3">
                    <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-stevens-red shadow-sm">
                      <BookOpen className="w-5 h-5 text-stevens-red" />
                    </span>
                    Veterans Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-5 text-stevens-dark-gray leading-relaxed">
                    With a strong commitment to our nation's veterans, Stevens Institute of Technology is proud to participate in the Yellow Ribbon program and offer a suite of resources and support to active duty, veteran and dependent military communities.
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.stevens.edu/admission-aid/veterans-and-military/yellow-ribbon-program?pg=2" target="_blank" rel="noopener noreferrer" className="flex items-center text-stevens-red hover:underline font-medium">
                        <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" /> Yellow Ribbon Program Details
                      </a>
                    </li>
                    <li>
                      <a href="https://www.stevens.edu/admission-aid/veterans-and-military?pg=2" target="_blank" rel="noopener noreferrer" className="flex items-center text-stevens-red hover:underline font-medium">
                        <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" /> Student Veterans Office
                      </a>
                    </li>
                    <li>
                      <a href="https://www.stevens.edu/admission-aid/veterans-and-military/using-gi-bill?pg=2" target="_blank" rel="noopener noreferrer" className="flex items-center text-stevens-red hover:underline font-medium">
                        <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" /> Using Your GI Bill® at Stevens
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* FAFSA Card - Dark Theme */}
              <Card className="bg-stevens-dark-gray border-0 shadow-lg overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <span className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </span>
                    FAFSA Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Complete the FAFSA to apply for federal aid.</p>
                  <div className="bg-white/10 rounded-lg p-4 mb-5 text-center">
                    <p className="text-sm text-gray-300 mb-1">Stevens Institute of Technology College Code:</p>
                    <p className="font-stevens-headers text-5xl font-bold text-white">002639</p>
                  </div>
                  <a href="https://studentaid.gov/h/apply-for-aid/fafsa" target="_blank" rel="noopener noreferrer" className="w-full block">
                    <Button variant="default" className="w-full bg-stevens-red hover:bg-red-700 text-white font-semibold py-3">
                      Go to FAFSA Website <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Student Service Center - Light Theme */}
              <Card className="bg-white border-0 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-stevens-dark-gray">
                    <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-stevens-red shadow-sm">
                      <Building className="w-5 h-5 text-stevens-red" />
                    </span>
                    Student Service Center
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-stevens-dark-gray">
                  <div className="bg-stevens-light-gray rounded-lg p-4">
                    <p className="font-semibold text-sm mb-2">Hours:</p>
                    <ul className="text-sm space-y-1">
                    <li>Mon, Wed-Fri: 9 a.m.-5 p.m. ET</li>
                    <li>Tuesday: 10 a.m.-5 p.m. ET</li>
                  </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-stevens-red flex-shrink-0" />
                      <span className="font-medium">{CONTACT_INFO.FINANCIAL_AID.PHONE}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-stevens-red flex-shrink-0" />
                      <span className="font-medium text-sm">{CONTACT_INFO.FINANCIAL_AID.EMAIL}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-stevens-gray">
                    Wesley J. Howe Center, First Floor<br />
                    1 Castle Point Terrace<br />
                    Hoboken, NJ 07030
                  </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}