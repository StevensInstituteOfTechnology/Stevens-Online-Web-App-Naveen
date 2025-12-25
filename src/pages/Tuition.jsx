import React, { useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, FileText, Phone, Mail, Building, ArrowRight, BookOpen, LinkIcon } from 'lucide-react';
import { CONTACT_INFO } from '@/config/constants';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';

const FinancialAidOption = ({ title, children }) => (
  <AccordionItem value={title}>
    <AccordionTrigger className="font-stevens-headers text-xl text-left">{title}</AccordionTrigger>
    <AccordionContent className="prose max-w-none text-stevens-dark-gray leading-relaxed">
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
    <div>
      <PageHero
        title="Tuition & Financial Aid Overview"
        subtitle="Financial Options for Our Online Programs"
        bgImage="/assets/images/tuition/1-tuition-hero-scaled.webp"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tuition and Financial Aid" }]}
      />

      <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl py-stevens-section-sm lg:py-stevens-section">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold mb-stevens-md">Financing Your Degree</h2>
              <p className="text-stevens-lg text-stevens-dark-gray">
                Students have various options to fund their tuition. We have included some of the most frequently used funding options below, but encourage you to consult with the Office of Financial Aid or a financial advisor when determining the best way to fund your tuition.
              </p>
            </div>

            {/* Tuition Structure Update */}
            <Card className="bg-stevens-white">
              <CardHeader>
                <CardTitle className="font-stevens-display text-stevens-2xl text-stevens-red">Tuition Structure Update: For Online M.S. in Computer Science and Online MEM Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Effective Spring & Summer 2026, the Online M.S. in Computer Science and Online Master of Engineering in Engineering Management programs will incorporate asynchronous course delivery for the initial phase of their curriculum. This change will impact the tuition rates for some courses.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-stevens-dark-gray">Online M.S. in Computer Science</h4>
                    <ul className="list-disc list-inside text-stevens-dark-gray">
                      <li><span className="font-medium">Traditional Track:</span> First four courses are asynchronous.</li>
                      <li><span className="font-medium">Advanced Track:</span> First two courses are asynchronous.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stevens-dark-gray">Online MEM</h4>
                    <ul className="list-disc list-inside text-stevens-dark-gray">
                      <li>First two courses are asynchronous.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grants */}
            <div className="text-center">
              <h3 className="font-stevens-headers text-2xl font-bold mb-2">Tuition Rate Support</h3>
              <p className="text-stevens-dark-gray mb-6 max-w-2xl mx-auto">To support this transition, Stevens provides two grants that apply a reduced per-credit tuition rate to the first two asynchronous courses.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="text-center shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-3"><Award className="text-stevens-red" /> Aspire Grant</CardTitle>
                    <p className="text-sm text-stevens-gray">(for standard applicants)</p>
                  </CardHeader>
                  <CardContent>
                    <p className="font-stevens-headers text-4xl font-bold text-stevens-red">$3,120</p>
                    <p className="text-stevens-dark-gray">in tuition support</p>
                  </CardContent>
                </Card>
                <Card className="text-center shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-3"><Award className="text-stevens-red" /> Pathway Grant</CardTitle>
                    <p className="text-sm text-stevens-gray">(for ASAP applicants)</p>
                  </CardHeader>
                  <CardContent>
                    <p className="font-stevens-headers text-4xl font-bold text-stevens-red">$3,120</p>
                    <p className="text-stevens-dark-gray">in tuition support</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tuition and Fees Tabs */}
            <div>
              <h2 className="font-stevens-headers text-3xl font-bold mb-6 text-center">Tuition and Fees</h2>
              <Tabs defaultValue="mscs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mscs">Online MSCS</TabsTrigger>
                  <TabsTrigger value="mem">Online MEM</TabsTrigger>
                  <TabsTrigger value="mba">Online MBA</TabsTrigger>
                </TabsList>
                <TabsContent value="mscs">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow><TableHead>Program</TableHead><TableHead>Credits</TableHead><TableHead>Cost Per Credit</TableHead><TableHead className="text-right">Est. Tuition*</TableHead></TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow><TableCell>Online MSCS</TableCell><TableCell>24</TableCell><TableCell>$1,395</TableCell><TableCell className="text-right">$33,480</TableCell></TableRow>
                        <TableRow className="bg-stevens-white"><TableCell>Online MSCS (asynchronous)</TableCell><TableCell>6</TableCell><TableCell>$875</TableCell><TableCell className="text-right">$5,250</TableCell></TableRow>
                        <TableRow><TableCell colSpan="3" className="font-bold text-right">Total Estimated Tuition</TableCell><TableCell className="font-bold text-right">$38,730</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
                <TabsContent value="mem">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow><TableHead>Program</TableHead><TableHead>Credits</TableHead><TableHead>Cost Per Credit</TableHead><TableHead className="text-right">Est. Tuition*</TableHead></TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow><TableCell>Online MEM</TableCell><TableCell>24</TableCell><TableCell>$1,395</TableCell><TableCell className="text-right">$33,480</TableCell></TableRow>
                        <TableRow className="bg-stevens-white"><TableCell>Online MEM (asynchronous)</TableCell><TableCell>6</TableCell><TableCell>$875</TableCell><TableCell className="text-right">$5,250</TableCell></TableRow>
                        <TableRow><TableCell colSpan="3" className="font-bold text-right">Total Estimated Tuition</TableCell><TableCell className="font-bold text-right">$38,730</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
                <TabsContent value="mba">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow><TableHead>Program</TableHead><TableHead>Credits</TableHead><TableHead>Cost Per Credit</TableHead><TableHead className="text-right">Est. Tuition*</TableHead></TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow><TableCell>Online MBA</TableCell><TableCell>39-48</TableCell><TableCell>$1,395</TableCell><TableCell className="text-right">$54,405 - $66,960</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
              <p className="p-4 text-center text-xs text-stevens-dark-gray italic">*Tuition estimates based on Spring & Summer 2026 rates. Tuition and fees are subject to change annually. Additional program fees may apply.</p>
            </div>

            {/* Average Cost Table */}
            <div>
              <h2 className="font-stevens-headers text-3xl font-bold mb-6 text-center">Average Cost of Stevens Online Programs</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow><TableHead>Item</TableHead><TableHead className="text-right">Amount</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>First two asynchronous courses: Online MSCS/Online MEM</TableCell><TableCell className="text-right">$2,625 per course</TableCell></TableRow>
                    <TableRow className="bg-stevens-white"><TableCell>Tuition</TableCell><TableCell className="text-right">$1,395 per credit hour</TableCell></TableRow>
                    <TableRow><TableCell>Tuition (First two asynchronous courses: Online MSCS/Online MEM)</TableCell><TableCell className="text-right">$875 per credit hour</TableCell></TableRow>
                    <TableRow className="bg-stevens-white"><TableCell>Annual Health Insurance Fee*</TableCell><TableCell className="text-right">$2,204</TableCell></TableRow>
                    <TableRow><TableCell>Student Activity Fee**</TableCell><TableCell className="text-right">$275 per semester</TableCell></TableRow>
                    <TableRow className="bg-stevens-white"><TableCell>General Services Fee – Part Time***</TableCell><TableCell className="text-right">$452 per semester</TableCell></TableRow>
                    <TableRow><TableCell>General Services Fee – Full Time***</TableCell><TableCell className="text-right">$688 per semester</TableCell></TableRow>
                    <TableRow className="bg-stevens-white"><TableCell>Books</TableCell><TableCell className="text-right">$1,000</TableCell></TableRow>
                    <TableRow><TableCell>Miscellaneous</TableCell><TableCell className="text-right">$1,050</TableCell></TableRow>
                  </TableBody>
                </Table>
                <CardContent className="text-xs text-stevens-dark-gray space-y-2 pt-4">
                  <p>Graduate costs are subject to change annually.</p>
                  <p>*Health Insurance can be waived online with proof of comparable insurance.</p>
                  <p>**Student Activity Fee is charged for students enrolled full-time (9 credits or more) on campus, online, or in Co-op.</p>
                  <p>***General Service Fee is charged for courses on campus, online, Maintenance of Full-Time Status (Dean-999), CPT, and Co-op.</p>
                </CardContent>
              </Card>
            </div>

            {/* Financial Aid Section */}
            <div>
              <h2 className="font-stevens-headers text-3xl font-bold mb-4">Financial Aid</h2>
              <p className="mb-4 text-stevens-dark-gray">As a graduate student, you may qualify for federal support in the form of loans. We strongly encourage every eligible graduate student to apply for federal financial aid, even if you don’t demonstrate an exceptional financial need. Applying for federal aid is one of the largest and most common ways for graduate students to finance advanced study, and a key part of making your program more affordable.</p>
              <p className="text-sm p-4 bg-red-50 border-l-4 border-red-400 text-red-800">
                Please note: Students in the Online M.S. in Computer Science and Online MEM programs who choose the ASAP application will not be eligible for federal financial aid until they matriculate into the master’s degree program, which occurs after successfully completing two courses with a grade of B or higher.
              </p>
              <h3 className="font-stevens-headers text-2xl font-bold mt-8 mb-4">Financial Assistance Options for Graduate Students</h3>
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
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
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-stevens-headers text-2xl">Alumni Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='mb-4'>Stevens alumni can take advantage of a 15% discount when they enroll in a Stevens Graduate program. Visit the <a href="https://www.stevens.edu/admission-aid/graduate-admissions" target="_blank" rel="noopener noreferrer" className="text-stevens-red hover:underline">Graduate Admissions page</a> for more information.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-stevens-headers text-2xl">Veterans Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">With a strong commitment to our nation’s veterans, Stevens Institute of Technology is proud to participate in the Yellow Ribbon program and offer a suite of resources and support to active duty, veteran and dependent military communities.</p>
                  <ul className="space-y-2">
                    <li><a href="https://www.stevens.edu/admission-aid/veterans-and-military/yellow-ribbon-program?pg=2" target="_blank" rel="noopener noreferrer" className="flex items-center text-stevens-red hover:underline"><LinkIcon className="w-4 h-4 mr-2" /> Yellow Ribbon Program Details</a></li>
                    <li><a href="https://www.stevens.edu/admission-aid/veterans-and-military?pg=2" target="_blank" rel="noopener noreferrer" className="flex items-center text-stevens-red hover:underline"><LinkIcon className="w-4 h-4 mr-2" /> Student Veterans Office</a></li>
                    <li><a href="https://www.stevens.edu/admission-aid/veterans-and-military/using-gi-bill?pg=2" target="_blank" rel="noopener noreferrer" className="flex items-center text-stevens-red hover:underline"><LinkIcon className="w-4 h-4 mr-2" /> Using Your GI Bill® at Stevens</a></li>
                  </ul>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <Card className="border-2 border-stevens-red">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><FileText className="w-6 h-6" /> FAFSA Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stevens-dark-gray mb-2">Complete the FAFSA to apply for federal aid.</p>
                  <p className="text-sm">Stevens Institute of Technology College Code:</p>
                  <p className="font-stevens-headers text-4xl font-bold text-stevens-red my-2">002639</p>
                  <a href="https://studentaid.gov/h/apply-for-aid/fafsa" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full btn-secondary mt-2">
                      Go to FAFSA Website <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Building className="w-6 h-6" /> Student Service Center</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-stevens-dark-gray">
                  <p className="font-semibold">Hours:</p>
                  <ul className="text-sm">
                    <li>Mon, Wed-Fri: 9 a.m.-5 p.m. ET</li>
                    <li>Tuesday: 10 a.m.-5 p.m. ET</li>
                  </ul>
                  <div className="flex items-center gap-3"><Phone className="w-4 h-4" /> {CONTACT_INFO.FINANCIAL_AID.PHONE}</div>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4" /> {CONTACT_INFO.FINANCIAL_AID.EMAIL}</div>
                  <p className="text-sm">
                    Wesley J. Howe Center, First Floor<br />
                    1 Castle Point Terrace<br />
                    Hoboken, NJ 07030
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}