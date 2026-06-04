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
  teamId: string;
  votedAt: Date;
}
