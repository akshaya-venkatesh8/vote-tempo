export interface Team {
  id: string;
  name: string;
  image?: string;
}

export interface Round {
  id: string;
  title: string;
  teams: Team[];
  startTime: Date;
  endTime: Date;
}

export type RoundStatus = 'upcoming' | 'active' | 'closed';

export interface Ballot {
  userId: string;
  scores: Record<string, number>; // teamId -> score (1–10)
  votedAt: Date;
}

export interface WinnerEntry {
  name: string;
  image?: string;
}

export interface Winners {
  solo: {
    winner: WinnerEntry;
    runnerUp: WinnerEntry;
    secondRunnerUp: WinnerEntry;
  };
  duoTrio: {
    winner: WinnerEntry;
    runnerUp: WinnerEntry;
    secondRunnerUp: WinnerEntry;
  };
  bestEntertainer: WinnerEntry;
  studentOfTheYear: WinnerEntry;
}
