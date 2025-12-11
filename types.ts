export type IntervalKey = 
  | 'M6' | 'Aug2' | 'm7' | 'P4' | 'Aug4' 
  | 'm2' | 'm6' | 'P5' | 'm3' | 'dim5' 
  | 'M2' | 'Aug5' | 'M7' | 'M3';

export interface IntervalData {
  key: IntervalKey;
  label: string; // e.g., "Major 6th"
  shortLabel: string; // e.g., "M6"
}

export interface RootRow {
  root: string;
  intervals: Record<IntervalKey, string>;
}

export enum QuizType {
  FIND_NOTE = 'FIND_NOTE', // Given Root + Interval, find Note
  FIND_INTERVAL = 'FIND_INTERVAL' // Given Root + Note, find Interval
}

export interface Question {
  id: string;
  type: QuizType;
  root: string;
  target: string; // The note or the interval depending on type
  prompt: string;
  correctAnswer: string;
  options: string[];
}