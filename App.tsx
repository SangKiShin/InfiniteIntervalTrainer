import React, { useState, useEffect, useCallback } from 'react';
import { generateQuestion, validateSystem, ValidationResult } from './services/gameLogic';
import { Question } from './types';
import QuizCard from './components/QuizCard';
import { Music, RefreshCw, Info, ShieldCheck, ShieldAlert, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  
  const [sysStatus, setSysStatus] = useState<ValidationResult | null>(null);

  // Initialize first question and run validation
  useEffect(() => {
    setCurrentQuestion(generateQuestion());
    const result = validateSystem();
    setSysStatus(result);
  }, []);

  const handleOptionSelect = useCallback((option: string) => {
    if (!currentQuestion) return;

    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setSelectedOption(option);
    setTotalAttempts(prev => prev + 1);

    if (correct) {
      setStreak(prev => prev + 1);
      setCorrectAttempts(prev => prev + 1);
    } else {
      setStreak(0);
    }
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    // Slight delay to allow animation if needed, but here we just switch immediately for responsiveness
    setCurrentQuestion(generateQuestion());
  }, []);

  const getAccuracy = () => {
    if (totalAttempts === 0) return 0;
    return Math.round((correctAttempts / totalAttempts) * 100);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
               <Music className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">Interval Trainer</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center space-x-3 sm:space-x-6 text-sm font-medium">
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-[10px] uppercase">Streak</span>
                <span className={`text-xs sm:text-sm ${streak > 2 ? 'text-orange-500' : 'text-slate-700'}`}>{streak} 🔥</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-[10px] uppercase">Score</span>
                <span className="text-slate-700 text-xs sm:text-sm">{correctAttempts}/{totalAttempts}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-[10px] uppercase">Acc.</span>
                <span className="text-indigo-600 text-xs sm:text-sm">{getAccuracy()}%</span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-100 mx-2"></div>

            <div className="flex items-center gap-2">
              <a 
                href="https://product.kyobobook.co.kr/detail/S000001865708" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm shrink-0"
                title="기타의 기술 (Book)"
              >
                <span className="text-xs font-bold">Book</span>
                <BookOpen className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 pb-20">
        <div className="w-full max-w-md space-y-6">
            <QuizCard
              question={currentQuestion}
              selectedOption={selectedOption}
              isCorrect={isCorrect}
              onOptionSelect={handleOptionSelect}
              onNext={handleNextQuestion}
            />

            {/* Interval Legend */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interval Guide</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-8 text-sm">
                <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">M</span>
                  <span className="text-slate-600 text-xs">Major (장)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">m</span>
                  <span className="text-slate-600 text-xs">Minor (단)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">P</span>
                  <span className="text-slate-600 text-xs">Perfect (완전)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">Aug</span>
                  <span className="text-slate-600 text-xs">Augmented (증)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-1">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">dim</span>
                  <span className="text-slate-600 text-xs">Diminished (감)</span>
                </div>
              </div>
            </div>
            
            {/* System Status & Hint */}
            <div className="flex flex-col gap-2">
                <div className="text-center px-4">
                    <p className="text-[10px] text-slate-300 leading-relaxed uppercase tracking-wide">
                        Enharmonic equivalents (e.g., Fb/E) are treated as identical.
                    </p>
                </div>

                {sysStatus && (
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                    {sysStatus.failedLogs.length === 0 ? (
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                    ) : (
                      <ShieldAlert className="w-3 h-3 text-orange-500" />
                    )}
                    <span>
                      System Verified: {sysStatus.totalRoots} Roots x {sysStatus.totalIntervals} Intervals 
                      ({sysStatus.passedCombinations}/{sysStatus.totalCombinations} checks passed)
                    </span>
                  </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;