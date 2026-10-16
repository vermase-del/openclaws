import React, { useEffect, useState } from 'react';
import StudentHubApp from './features/student-hub/StudentHubApp';
import TalentLensApp from './features/talentlens/TalentLensApp';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (path.startsWith('/talentlens')) return <TalentLensApp />;
  return <StudentHubApp path={path} onNavigate={(to) => {
    if (window.location.pathname !== to) window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }} />;
}
