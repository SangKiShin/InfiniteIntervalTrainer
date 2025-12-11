import { MUSIC_DATA, INTERVAL_INFO } from '../constants';
import { Question, QuizType, IntervalKey, RootRow } from '../types';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Selects a random element from an array.
 */
function getRandomElement<T>(arr: T[]): T {
  return arr[getRandomInt(0, arr.length - 1)];
}

/**
 * Shuffles an array using Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates distinct distractors (wrong answers).
 */
function generateDistractors(correctAnswer: string, allPossibleOptions: string[], count: number): string[] {
  const distractors = new Set<string>();
  
  // Filter out the correct answer from possibilities
  const candidates = allPossibleOptions.filter(opt => opt !== correctAnswer);
  
  while (distractors.size < count && candidates.length > 0) {
    const randomIdx = getRandomInt(0, candidates.length - 1);
    const selected = candidates[randomIdx];
    distractors.add(selected);
    // Remove to avoid duplicates
    candidates.splice(randomIdx, 1);
  }
  
  return Array.from(distractors);
}

/**
 * Generates a new quiz question.
 */
export function generateQuestion(): Question {
  const type = Math.random() > 0.5 ? QuizType.FIND_NOTE : QuizType.FIND_INTERVAL;
  const row: RootRow = getRandomElement(MUSIC_DATA);
  const intervalKey = getRandomElement(Object.keys(INTERVAL_INFO) as IntervalKey[]);
  const intervalData = INTERVAL_INFO[intervalKey];
  const targetNote = row.intervals[intervalKey];

  // Collect all unique notes for distractors
  const allNotes = Array.from(new Set(MUSIC_DATA.flatMap(r => Object.values(r.intervals))));
  // Collect all interval short labels for distractors
  const allIntervals = Object.values(INTERVAL_INFO).map(i => i.shortLabel);

  let question: Question;

  if (type === QuizType.FIND_NOTE) {
    // Mode: Find the Note
    // Prompt: What is the [Interval] of [Root]?
    // Answer: [Target Note]
    const options = shuffleArray([
      targetNote,
      ...generateDistractors(targetNote, allNotes, 3)
    ]);

    question = {
      id: crypto.randomUUID(),
      type: QuizType.FIND_NOTE,
      root: row.root,
      target: intervalData.label,
      prompt: `What is the ${intervalData.label} of ${row.root}?`,
      correctAnswer: targetNote,
      options
    };

  } else {
    // Mode: Find the Interval
    // Prompt: [Target Note] is the ______ of [Root]?
    // Answer: [Interval Short Label] (e.g., M6)
    
    // We need to match the target note back to the interval key to get the label
    // Note: targetNote string might be 'Fb/E'.
    
    const correctIntervalLabel = intervalData.shortLabel; // e.g., "M6"
    
    const options = shuffleArray([
      correctIntervalLabel,
      ...generateDistractors(correctIntervalLabel, allIntervals, 3)
    ]);

    question = {
      id: crypto.randomUUID(),
      type: QuizType.FIND_INTERVAL,
      root: row.root,
      target: targetNote,
      prompt: `${targetNote} is the ______ of ${row.root}?`,
      correctAnswer: correctIntervalLabel,
      options
    };
  }

  return question;
}

export interface ValidationResult {
  totalRoots: number;
  totalIntervals: number;
  totalCombinations: number;
  passedCombinations: number;
  failedLogs: string[];
}

/**
 * Verifies that the app can derive Note->Relation and Relation->Note 
 * for all configured Roots and Intervals.
 */
export function validateSystem(): ValidationResult {
  const roots = MUSIC_DATA;
  const intervalKeys = Object.keys(INTERVAL_INFO) as IntervalKey[];
  
  const result: ValidationResult = {
    totalRoots: roots.length,
    totalIntervals: intervalKeys.length,
    totalCombinations: roots.length * intervalKeys.length * 2, // *2 for bidirectional check
    passedCombinations: 0,
    failedLogs: []
  };

  console.groupCollapsed("System Integrity Check (Bidirectional)");

  roots.forEach(row => {
    intervalKeys.forEach(key => {
      // 1. Forward Check: Root + Interval => Note
      const note = row.intervals[key];
      if (note && note.length > 0) {
        result.passedCombinations++;
      } else {
        const msg = `[FAIL] Forward: Root(${row.root}) + Interval(${key}) => Missing Note`;
        console.warn(msg);
        result.failedLogs.push(msg);
      }

      // 2. Backward Check: Root + Note => Interval
      // Simulate finding the key by iterating values
      const foundKey = (Object.keys(row.intervals) as IntervalKey[]).find(k => row.intervals[k] === note);
      if (foundKey === key) {
        result.passedCombinations++;
      } else {
        const msg = `[FAIL] Backward: Root(${row.root}) + Note(${note}) => Found(${foundKey}), Expected(${key})`;
        console.warn(msg);
        result.failedLogs.push(msg);
      }
    });
  });

  console.log(`Verified Roots: ${result.totalRoots} (Expected 17)`);
  console.log(`Verified Intervals: ${result.totalIntervals} (Expected 14)`);
  console.log(`Success Rate: ${result.passedCombinations}/${result.totalCombinations}`);
  console.groupEnd();

  return result;
}