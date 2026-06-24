function formatDuration(ms: number, prefix: string): string {
  const totalMinutes = Math.floor(ms / 1000 / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  if (totalMinutes < 1) {
    return `${prefix} less than a minute`;
  }

  if (totalMinutes < 60) {
    return `${prefix} ${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
  }

  if (totalHours < 24) {
    const remainingMins = totalMinutes % 60;
    if (remainingMins === 0) {
      return `${prefix} ${totalHours} hour${totalHours !== 1 ? 's' : ''}`;
    }
    return `${prefix} ${totalHours}h ${remainingMins}m`;
  }

  return `${prefix} ${totalDays} day${totalDays !== 1 ? 's' : ''}`;
}

export function formatTimeRemaining(endTime: Date): string {
  const msLeft = endTime.getTime() - new Date().getTime();
  if (msLeft <= 0) return 'Closed';
  return formatDuration(msLeft, 'Closes in');
}

export function formatTimeUntilStart(startTime: Date): string {
  const msLeft = startTime.getTime() - new Date().getTime();
  if (msLeft <= 0) return '';
  return formatDuration(msLeft, 'Goes live in');
}
