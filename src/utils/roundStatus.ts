import type { Round, RoundStatus } from '../types';

export function getRoundStatus(round: Round): RoundStatus {
  const now = new Date();
  if (now < round.startTime) return 'upcoming';
  if (now > round.endTime) return 'closed';
  return 'active';
}
