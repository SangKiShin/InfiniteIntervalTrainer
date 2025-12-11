import { IntervalData, RootRow, IntervalKey } from './types';

// Map of internal keys to display labels with English and Korean
export const INTERVAL_INFO: Record<IntervalKey, IntervalData> = {
  'M6': { key: 'M6', label: 'Major 6th (장6도)', shortLabel: 'M6' },
  'Aug2': { key: 'Aug2', label: 'Augmented 2nd (증2도)', shortLabel: 'Aug2' },
  'm7': { key: 'm7', label: 'Minor 7th (단7도)', shortLabel: 'm7' },
  'P4': { key: 'P4', label: 'Perfect 4th (완전4도)', shortLabel: 'P4' },
  'Aug4': { key: 'Aug4', label: 'Augmented 4th (증4도)', shortLabel: 'Aug4' },
  'm2': { key: 'm2', label: 'Minor 2nd (단2도)', shortLabel: 'm2' },
  'm6': { key: 'm6', label: 'Minor 6th (단6도)', shortLabel: 'm6' },
  'P5': { key: 'P5', label: 'Perfect 5th (완전5도)', shortLabel: 'P5' },
  'm3': { key: 'm3', label: 'Minor 3rd (단3도)', shortLabel: 'm3' },
  'dim5': { key: 'dim5', label: 'Diminished 5th (감5도)', shortLabel: 'dim5' },
  'M2': { key: 'M2', label: 'Major 2nd (장2도)', shortLabel: 'M2' },
  'Aug5': { key: 'Aug5', label: 'Augmented 5th (증5도)', shortLabel: 'Aug5' },
  'M7': { key: 'M7', label: 'Major 7th (장7도)', shortLabel: 'M7' },
  'M3': { key: 'M3', label: 'Major 3rd (장3도)', shortLabel: 'M3' },
};

// The core data derived from the provided image
export const MUSIC_DATA: RootRow[] = [
  {
    root: 'Eb',
    intervals: {
      'M6': 'C', 'Aug2': 'F#', 'm7': 'Db', 'P4': 'Ab', 'Aug4': 'A', 'm2': 'Fb/E', 'm6': 'Cb/B',
      'P5': 'Bb', 'm3': 'Gb', 'dim5': 'Bbb/A', 'M2': 'F', 'Aug5': 'B', 'M7': 'D', 'M3': 'G'
    }
  },
  {
    root: 'B',
    intervals: {
      'M6': 'G#', 'Aug2': 'C##/D', 'm7': 'A', 'P4': 'E', 'Aug4': 'E#/F', 'm2': 'C', 'm6': 'G',
      'P5': 'F#', 'm3': 'D', 'dim5': 'F', 'M2': 'C#', 'Aug5': 'F##/G', 'M7': 'A#', 'M3': 'D#'
    }
  },
  {
    root: 'F',
    intervals: {
      'M6': 'D', 'Aug2': 'G#', 'm7': 'Eb', 'P4': 'Bb', 'Aug4': 'B', 'm2': 'Gb', 'm6': 'Db',
      'P5': 'C', 'm3': 'Ab', 'dim5': 'Cb/B', 'M2': 'G', 'Aug5': 'C#', 'M7': 'E', 'M3': 'A'
    }
  },
  {
    root: 'Db',
    intervals: {
      'M6': 'Bb', 'Aug2': 'E', 'm7': 'Cb/B', 'P4': 'Gb', 'Aug4': 'G', 'm2': 'Ebb/D', 'm6': 'Bbb/A',
      'P5': 'Ab', 'm3': 'Fb/E', 'dim5': 'Abb/G', 'M2': 'Eb', 'Aug5': 'A', 'M7': 'C', 'M3': 'F'
    }
  },
  {
    root: 'E',
    intervals: {
      'M6': 'C#', 'Aug2': 'F##/G', 'm7': 'D', 'P4': 'A', 'Aug4': 'A#', 'm2': 'F', 'm6': 'C',
      'P5': 'B', 'm3': 'G', 'dim5': 'Bb', 'M2': 'F#', 'Aug5': 'B#/C', 'M7': 'D#', 'M3': 'G#'
    }
  },
  {
    root: 'Ab',
    intervals: {
      'M6': 'F', 'Aug2': 'B', 'm7': 'Gb', 'P4': 'Db', 'Aug4': 'D', 'm2': 'Bbb/A', 'm6': 'Fb/E',
      'P5': 'Eb', 'm3': 'Cb/B', 'dim5': 'Ebb/D', 'M2': 'Bb', 'Aug5': 'E', 'M7': 'G', 'M3': 'C'
    }
  },
  {
    root: 'D',
    intervals: {
      'M6': 'B', 'Aug2': 'E#/F', 'm7': 'C', 'P4': 'G', 'Aug4': 'G#', 'm2': 'Eb', 'm6': 'Bb',
      'P5': 'A', 'm3': 'F', 'dim5': 'Ab', 'M2': 'E', 'Aug5': 'A#', 'M7': 'C#', 'M3': 'F#'
    }
  },
  {
    root: 'C',
    intervals: {
      'M6': 'A', 'Aug2': 'D#', 'm7': 'Bb', 'P4': 'F', 'Aug4': 'F#', 'm2': 'Db', 'm6': 'Ab',
      'P5': 'G', 'm3': 'Eb', 'dim5': 'Gb', 'M2': 'D', 'Aug5': 'G#', 'M7': 'B', 'M3': 'E'
    }
  },
  {
    root: 'Gb',
    intervals: {
      'M6': 'Eb', 'Aug2': 'A', 'm7': 'Fb/E', 'P4': 'Cb/B', 'Aug4': 'C', 'm2': 'Abb/G', 'm6': 'Ebb/D',
      'P5': 'Db', 'm3': 'Bbb/A', 'dim5': 'Dbb/C', 'M2': 'Ab', 'Aug5': 'D', 'M7': 'F', 'M3': 'Bb'
    }
  },
  {
    root: 'G',
    intervals: {
      'M6': 'E', 'Aug2': 'A#', 'm7': 'F', 'P4': 'C', 'Aug4': 'C#', 'm2': 'Ab', 'm6': 'Eb',
      'P5': 'D', 'm3': 'Bb', 'dim5': 'Db', 'M2': 'A', 'Aug5': 'D#', 'M7': 'F#', 'M3': 'B'
    }
  },
  {
    root: 'A',
    intervals: {
      'M6': 'F#', 'Aug2': 'B#/C', 'm7': 'G', 'P4': 'D', 'Aug4': 'D#', 'm2': 'Bb', 'm6': 'F',
      'P5': 'E', 'm3': 'C', 'dim5': 'Eb', 'M2': 'B', 'Aug5': 'E#/F', 'M7': 'G#', 'M3': 'C#'
    }
  },
  {
    root: 'Bb',
    intervals: {
      'M6': 'G', 'Aug2': 'C#', 'm7': 'Ab', 'P4': 'Eb', 'Aug4': 'E', 'm2': 'Cb/B', 'm6': 'Gb',
      'P5': 'F', 'm3': 'Db', 'dim5': 'Fb/E', 'M2': 'C', 'Aug5': 'F#', 'M7': 'A', 'M3': 'D'
    }
  },
  {
    root: 'C#',
    intervals: {
      'M6': 'A#', 'Aug2': 'D##/E', 'm7': 'B', 'P4': 'F#', 'Aug4': 'F##/G', 'm2': 'D', 'm6': 'A',
      'P5': 'G#', 'm3': 'E', 'dim5': 'G', 'M2': 'D#', 'Aug5': 'G##/A', 'M7': 'B#/C', 'M3': 'E#/F'
    }
  },
  {
    root: 'G#',
    intervals: {
      'M6': 'E#/F', 'Aug2': 'A##/B', 'm7': 'F#', 'P4': 'C#', 'Aug4': 'C##/D', 'm2': 'A', 'm6': 'E',
      'P5': 'D#', 'm3': 'B', 'dim5': 'D', 'M2': 'A#', 'Aug5': 'D##/E', 'M7': 'F##/G', 'M3': 'B#/C'
    }
  },
  {
    root: 'D#',
    intervals: {
      'M6': 'B#/C', 'Aug2': 'E##/F#', 'm7': 'C#', 'P4': 'G#', 'Aug4': 'G##/A', 'm2': 'E', 'm6': 'B',
      'P5': 'A#', 'm3': 'F#', 'dim5': 'A', 'M2': 'E#/F', 'Aug5': 'A##/B', 'M7': 'C##/D', 'M3': 'F##/G'
    }
  },
  {
    root: 'F#',
    intervals: {
      'M6': 'D#', 'Aug2': 'G##/A', 'm7': 'E', 'P4': 'B', 'Aug4': 'B#/C', 'm2': 'G', 'm6': 'D',
      'P5': 'C#', 'm3': 'A', 'dim5': 'C', 'M2': 'G#', 'Aug5': 'C##/D', 'M7': 'E#/F', 'M3': 'A#'
    }
  },
  {
    root: 'A#',
    intervals: {
      'M6': 'F##/G', 'Aug2': 'B##/C#', 'm7': 'G#', 'P4': 'D#', 'Aug4': 'D##/E', 'm2': 'B', 'm6': 'F#',
      'P5': 'E#/F', 'm3': 'C#', 'dim5': 'E', 'M2': 'B#/C', 'Aug5': 'E##/F#', 'M7': 'G##/A', 'M3': 'C##/D'
    }
  }
];