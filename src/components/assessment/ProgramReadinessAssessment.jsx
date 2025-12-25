import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/utils/analytics/vercelTracking';

const questions = [
{
  id: 1,
  question: "What is your primary career goal right now?",
  answers: [
  { text: "Lead technical teams & projects", points: { mem: 3, mba: 1, mscs: 1, meads: 1, 'cert-eai': 0, 'cert-ads': 0 } },
  { text: "Build innovative software & systems", points: { mscs: 3, mem: 1, mba: 0, meads: 2, 'cert-eai': 0, 'cert-ads': 1 } },
  { text: "Master the business side of technology", points: { mba: 3, mem: 1, mscs: 0, meads: 0, 'cert-eai': 2, 'cert-ads': 0 } },
  { text: "Master data science & AI", points: { meads: 3, mscs: 2, mba: 0, mem: 0, 'cert-eai': 1, 'cert-ads': 2 } },
  { text: "Gain a specific AI or data skill quickly", points: { 'cert-eai': 3, 'cert-ads': 3, meads: 1, mscs: 1, mba: 0, mem: 0 } }]

},
{
  id: 2,
  question: "What is your current professional or educational background in?",
  answers: [
  { text: "Engineering/Technical", points: { mem: 2, mscs: 2, mba: 1, meads: 2, 'cert-eai': 1, 'cert-ads': 1 } },
  { text: "Computer Science/Software", points: { mscs: 3, mem: 1, mba: 1, meads: 2, 'cert-eai': 1, 'cert-ads': 2 } },
  { text: "Business/Management", points: { mba: 3, mem: 2, mscs: 0, meads: 0, 'cert-eai': 2, 'cert-ads': 0 } },
  { text: "Data/Analytics", points: { meads: 3, mscs: 2, mba: 1, mem: 1, 'cert-eai': 2, 'cert-ads': 3 } },
  { text: "Something else", points: { 'cert-eai': 2, 'cert-ads': 2, mba: 1, mem: 1, mscs: 1, meads: 1 } }]

},
{
  id: 3,
  question: "How many years of professional experience do you have?",
  answers: [
  { text: "0-2 Years", points: { mscs: 2, 'cert-ads': 2, mba: 0, mem: 1, meads: 2, 'cert-eai': 1 } },
  { text: "3-5 Years", points: { mscs: 2, mem: 2, mba: 1, meads: 2, 'cert-eai': 2, 'cert-ads': 1 } },
  { text: "6-10 Years", points: { mba: 2, mem: 3, mscs: 1, meads: 1, 'cert-eai': 2, 'cert-ads': 1 } },
  { text: "10+ Years", points: { mba: 3, mem: 2, mscs: 1, meads: 1, 'cert-eai': 2, 'cert-ads': 1 } }]

}];


const programPageMap = {
  mba: 'MBA',
  mscs: 'MSCS',
  mem: 'MEM',
  meads: 'online-masters-engineering-applied-data-science/',
  'cert-eai': 'certificates/enterprise-ai/',
  'cert-ads': 'certificates/applied-data-science-foundations/'
};

function ProgramReadinessAssessment({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const quizStartTime = useState(() => Date.now())[0];
  const hasTrackedStart = useRef(false);
  
  // Track quiz start on mount (protected against StrictMode)
  useEffect(() => {
    if (!hasTrackedStart.current) {
      trackEvent('quiz_started', {
        quiz_name: 'program_readiness',
        total_questions: questions.length
      });
      hasTrackedStart.current = true;
    }
  }, []);

  const handleAnswerSelect = (questionId, answerIndex) => {
    const newAnswers = { ...answers, [questionId]: answerIndex };
    setAnswers(newAnswers);
    
    // Track answer selection
    const question = questions.find(q => q.id === questionId);
    const answer = question?.answers[answerIndex];
    trackEvent(`quiz_q${questionId}_answered`, {
      quiz_name: 'program_readiness',
      question_id: questionId,
      question_text: question?.question,
      answer_text: answer?.text,
      question_number: questionId,
      total_questions: questions.length
    });

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        calculateResults(newAnswers);
      }
    }, 500);
  };

  const calculateResults = (finalAnswers) => {
    const scores = { mba: 0, mscs: 0, mem: 0, meads: 0, 'cert-eai': 0, 'cert-ads': 0 };

    questions.forEach((question) => {
      const answerIndex = finalAnswers[question.id];
      if (answerIndex !== undefined) {
        const selectedAnswer = question.answers[answerIndex];
        Object.keys(scores).forEach((program) => {
          scores[program] += selectedAnswer.points[program];
        });
      }
    });

    const topProgram = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    setShowResults({ topProgram, scores });
    
    // Track quiz completion
    const timeToComplete = Math.floor((Date.now() - quizStartTime) / 1000);
    trackEvent('quiz_completed', {
      quiz_name: 'program_readiness',
      recommended_program: topProgram,
      recommended_program_score: scores[topProgram],
      all_scores: scores,
      questions_answered: Object.keys(finalAnswers).length,
      time_to_complete_seconds: timeToComplete
    });
    
    trackEvent('quiz_results_viewed', {
      quiz_name: 'program_readiness',
      recommended_program: topProgram
    });
    
    if (onComplete) {
      onComplete({ topProgram, scores });
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const recommendedPage = programPageMap[showResults.topProgram];
    return (
      <Card className="w-full max-w-lg mx-auto shadow-stevens-lg animate-in zoom-in-95 duration-500 rounded-stevens-md">
        <CardHeader className="bg-stevens-red text-stevens-white rounded-stevens-md">
          <CardTitle className="flex items-center gap-stevens-sm text-stevens-2xl font-stevens-display">
            <CheckCircle className="w-6 h-6 animate-in zoom-in duration-300" />
            Your Recommended Path
          </CardTitle>
        </CardHeader>
        <CardContent className="p-stevens-lg bg-stevens-light-gray mt-stevens-lg ">
          <div className="text-center mb-stevens-lg">
            {showResults.topProgram === 'mba' &&
            <div className="animate-in slide-in-from-bottom duration-300 mt-stevens-lg">
                <h3 className="text-stevens-2xl font-bold text-stevens-dark-gray mb-stevens-sm">Online MBA</h3>
                <p className="text-stevens-dark-gray">Perfect for aspiring business leaders in tech-driven industries.</p>
              </div>
            }
            {showResults.topProgram === 'mscs' &&
            <div className="animate-in slide-in-from-bottom duration-300">
                <h3 className="text-stevens-2xl font-bold text-stevens-dark-gray mb-stevens-sm">M.S. in Computer Science</h3>
                <p className="text-stevens-dark-gray">Ideal for building advanced technical and software development skills.</p>
              </div>
            }
            {showResults.topProgram === 'mem' &&
            <div className="animate-in slide-in-from-bottom duration-300">
                <h3 className="text-stevens-2xl font-bold text-stevens-dark-gray mb-stevens-sm">M.Eng. in Engineering Management</h3>
                <p className="text-stevens-dark-gray">Great for technical professionals ready to lead teams and projects.</p>
              </div>
            }
            {showResults.topProgram === 'meads' &&
            <div className="animate-in slide-in-from-bottom duration-300">
                <h3 className="text-stevens-2xl font-bold text-stevens-dark-gray mb-stevens-sm">M.Eng. in Applied Data Science</h3>
                <p className="text-stevens-dark-gray">Perfect for mastering data science, AI engineering, and machine learning.</p>
              </div>
            }
            {showResults.topProgram === 'cert-eai' &&
            <div className="animate-in slide-in-from-bottom duration-300">
                <h3 className="text-stevens-2xl font-bold text-stevens-dark-gray mb-stevens-sm">Professional Graduate Certificate in Enterprise AI</h3>
                <p className="text-stevens-dark-gray">Ideal for business professionals who need to implement AI workflows quickly.</p>
              </div>
            }
            {showResults.topProgram === 'cert-ads' &&
            <div className="animate-in slide-in-from-bottom duration-300">
                <h3 className="text-stevens-2xl font-bold text-stevens-dark-gray mb-stevens-sm">Applied Data Science Foundations Certificate</h3>
                <p className="text-stevens-dark-gray">Perfect for launching your data science career with Python, SQL, and ML skills.</p>
              </div>
            }
          </div>
          
          <div className="flex flex-col gap-stevens-sm animate-in slide-in-from-bottom duration-500">
            <Link to={createPageUrl(recommendedPage)}>
              <Button className="w-full bg-stevens-red hover:bg-stevens-dark-gray text-stevens-white font-medium px-stevens-lg py-stevens-sm rounded-stevens-md shadow-stevens-sm hover:shadow-stevens-md transition-all duration-stevens-normal">
                Learn More About This Program
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-2 border-stevens-red text-stevens-red hover:bg-stevens-red hover:text-stevens-white font-medium px-stevens-lg py-stevens-sm rounded-stevens-md transition-all duration-stevens-normal"
              onClick={restart}>
              Take Assessment Again
            </Button>
          </div>
        </CardContent>
      </Card>);

  }

  const currentQuestion = questions[currentStep];
  const progress = (currentStep + 1) / questions.length * 100;
//  return(<h1>Program Readiness Assessment</h1>);
  return (
    <Card className="w-full max-w-lg mx-auto shadow-stevens-lg card-hover rounded-stevens-md">
      <CardHeader className="bg-stevens-dark-gray text-white rounded-stevens-md">
        <CardTitle className="text-stevens-3xl font-stevens-display">Find Your Perfect Program</CardTitle>
        <div className="w-full bg-stevens-light-gray rounded-stevens-md h-2 mt-stevens-sm">
          <div
            className="bg-stevens-white h-2 rounded-stevens-md transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-stevens-sm text-stevens-light-gray mt-stevens-sm">
          Step {currentStep + 1} of {questions.length}
        </p>
      </CardHeader>
      
      <CardContent className="bg-stevens-white p-stevens-lg mt-stevens-lg mb-stevens-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-stevens-xl font-semibold mb-stevens-lg text-stevens-dark-gray font-stevens-display">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-stevens-sm" >
              {currentQuestion.answers.map((answer, index) =>
              <Button
                key={`${currentQuestion.id}-${index}`}
                variant={answers[currentQuestion.id] === index ? "default" : "outline"}
                className={`w-full text-left justify-start p-stevens-md h-auto min-h-[60px] transition-all duration-stevens-normal rounded-stevens-md text-wrap break-words text-stevens-sm stevens-md:text-stevens-base ${
                answers[currentQuestion.id] === index ?
                'bg-stevens-red hover:bg-stevens-dark-gray text-stevens-white transform scale-105 shadow-stevens-sm' :
                'border-2 border-stevens-red text-stevens-red hover:bg-stevens-red hover:text-stevens-white hover:border-stevens-red'}`
                }
                onClick={() => handleAnswerSelect(currentQuestion.id, index)}>
                  {answer.text}
                </Button>
              )}
            </div>
            
            {currentStep > 0 &&
            <Button
              variant="ghost"
              onClick={goBack}
              className="mt-stevens-md text-stevens-dark-gray hover:bg-stevens-light-gray hover:text-stevens-dark-gray rounded-stevens-md">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Question
              </Button>
            }
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>);

}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(ProgramReadinessAssessment);