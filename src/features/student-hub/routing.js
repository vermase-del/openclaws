/**
 * Maps browser paths to Student Hub navigation sections.
 * Keep aliases here so route behavior can be verified without a browser.
 */
export const getStudentHubRoute = (path) => {
  const clean = path.replace(/\/$/, '') || '/dashboard';
  if (clean.startsWith('/learning')) return 'learning';
  if (clean.startsWith('/mentorship') || clean.startsWith('/coaching')) return 'mentorship';
  if (clean.startsWith('/classes') || clean.startsWith('/timetable')) return 'classes';
  if (clean.startsWith('/summer-jobs') || clean.startsWith('/earn-while-you-learn')) return 'summer-jobs';
  if (clean.startsWith('/jobs') || clean.startsWith('/applications')) return 'jobs';
  if (clean.startsWith('/skill-registry') || clean.startsWith('/skills')) return 'skill-registry';
  if (clean.startsWith('/opportunities')) return 'opportunities';
  if (clean.startsWith('/messages')) return 'messages';
  if (clean.startsWith('/ai-prompts') || clean.startsWith('/ai-guide')) return 'ai-prompts';
  if (clean.startsWith('/community') || clean.startsWith('/events')) return 'community';
  if (clean.startsWith('/saved')) return 'saved';
  if (clean.startsWith('/profile')) return 'profile';
  return 'dashboard';
};
