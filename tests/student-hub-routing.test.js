import test from 'node:test';
import assert from 'node:assert/strict';
import { getStudentHubRoute } from '../src/features/student-hub/routing.js';

test('defaults empty and unknown paths to the dashboard', () => {
  assert.equal(getStudentHubRoute(''), 'dashboard');
  assert.equal(getStudentHubRoute('/'), 'dashboard');
  assert.equal(getStudentHubRoute('/not-a-route'), 'dashboard');
});

test('resolves primary Student Hub routes', () => {
  const cases = [
    ['/dashboard', 'dashboard'],
    ['/learning', 'learning'],
    ['/mentorship', 'mentorship'],
    ['/classes', 'classes'],
    ['/jobs', 'jobs'],
    ['/summer-jobs', 'summer-jobs'],
    ['/skill-registry', 'skill-registry'],
    ['/opportunities', 'opportunities'],
    ['/messages', 'messages'],
    ['/ai-prompts', 'ai-prompts'],
    ['/community', 'community'],
    ['/saved', 'saved'],
    ['/profile', 'profile']
  ];
  for (const [path, expected] of cases) {
    assert.equal(getStudentHubRoute(path), expected, path);
  }
});

test('preserves supported legacy route aliases', () => {
  const cases = [
    ['/coaching/book', 'mentorship'],
    ['/timetable', 'classes'],
    ['/earn-while-you-learn', 'summer-jobs'],
    ['/applications', 'jobs'],
    ['/skills', 'skill-registry'],
    ['/ai-guide', 'ai-prompts'],
    ['/events', 'community']
  ];
  for (const [path, expected] of cases) {
    assert.equal(getStudentHubRoute(path), expected, path);
  }
});

test('resolves detail paths and trailing slashes to their parent section', () => {
  assert.equal(getStudentHubRoute('/learning/course-123'), 'learning');
  assert.equal(getStudentHubRoute('/classes/class-123/'), 'classes');
  assert.equal(getStudentHubRoute('/jobs/job-123'), 'jobs');
});
