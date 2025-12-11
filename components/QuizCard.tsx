import React from 'react';
import { Question, QuizType } from '../types';
import { CheckCircle, XCircle, Music, ArrowRight } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  selectedOption: string | null;
  isCorrect: boolean | null;
  onOptionSelect: (option: string) => void;
  onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedOption,
  isCorrect,
  onOptionSelect,
  onNext,
}) => {
  const isAnswered = selectedOption !== null;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header Area */}
      <div className="bg-indigo-600 p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Music className="w-64 h-64 absolute -top-10 -left-10 text-white" />
        </div>
        
        <h2 className="text-indigo-100 text-sm font-semibold tracking-wider uppercase mb-2 relative z-10">
          {question.type === QuizType.FIND_NOTE ? 'Find the Note' : 'Identify the Interval'}
        </h2>
        
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4 my-4">
           {/* Visual Representation of the Question */}
           <div className="flex items-center space-x-4 text-white">
              <div className="flex flex-col items-center">
                <span className="text-xs opacity-75">ROOT</span>
                <span className="text-4xl font-bold">{question.root}</span>
              </div>
              <ArrowRight className="w-6 h-6 opacity-50" />
              <div className="flex flex-col items-center">
                <span className="text-xs opacity-75">
                   {question.type === QuizType.FIND_NOTE ? 'INTERVAL' : 'TARGET'}
                </span>
                <span className={`text-2xl font-bold ${question.type === QuizType.FIND_NOTE ? 'text-indigo-200' : ''}`}>
                    {question.type === QuizType.FIND_NOTE ? question.target.split('(')[0] : question.target}
                </span>
              </div>
           </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="p-6 pb-2">
        <p className="text-center text-lg text-slate-700 font-medium leading-relaxed">
          {question.prompt}
        </p>
      </div>

      {/* Options Grid */}
      <div className="p-6 grid grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          let btnClass = "py-4 px-2 rounded-xl text-lg font-semibold transition-all duration-200 border-2 ";
          
          if (!isAnswered) {
             btnClass += "bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 shadow-sm active:scale-95";
          } else {
             if (option === question.correctAnswer) {
                btnClass += "bg-green-100 border-green-500 text-green-800 shadow-md";
             } else if (option === selectedOption && !isCorrect) {
                btnClass += "bg-red-100 border-red-500 text-red-800 opacity-75";
             } else {
                btnClass += "bg-slate-50 border-slate-100 text-slate-300";
             }
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onOptionSelect(option)}
              disabled={isAnswered}
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Result Footer */}
      {isAnswered && (
        <div className={`p-4 border-t ${isCorrect ? 'bg-green-50' : 'bg-red-50'} flex flex-col items-center animate-in slide-in-from-bottom-2 duration-300`}>
          <div className="flex items-center space-x-2 mb-3">
            {isCorrect ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-green-800 font-bold text-lg">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600" />
                <span className="text-red-800 font-bold text-lg">Incorrect</span>
              </>
            )}
          </div>
          
          {!isCorrect && (
            <p className="text-slate-600 mb-4 text-center">
              The correct answer was <span className="font-bold text-slate-900">{question.correctAnswer}</span>
            </p>
          )}

          <button
            onClick={onNext}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;