import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ModuleNavSidebar, { MODULES_LIST } from '../../components/ModuleNavSidebar';
import CandidatePortal from '../../components/candidate/CandidatePortal';
import RecruiterDashboard from '../../components/recruiter/RecruiterDashboard';
import UpcomingModuleShell from '../../components/UpcomingModuleShell';
import { MOCK_CANDIDATES } from '../../data/mockCandidates';

export default function TalentLensApp() {
  const [activeModuleId, setActiveModuleId] = useState('resume-screening');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('candidate');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [candidates, setCandidates] = useState(() => {
    try {
      const saved = localStorage.getItem('megaclaw_candidates');
      return saved ? JSON.parse(saved) : MOCK_CANDIDATES;
    } catch { return MOCK_CANDIDATES; }
  });

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);
  useEffect(() => {
    localStorage.setItem('megaclaw_candidates', JSON.stringify(candidates));
  }, [candidates]);

  return <div className="app-container">
    <Header activeModuleId={activeModuleId} onSelectModule={setActiveModuleId}
      onOpenSidebar={() => setIsSidebarOpen(true)} activeView={activeView}
      setActiveView={setActiveView} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
      onResetDemoData={() => { if (window.confirm('Reset candidate pipeline?')) setCandidates(MOCK_CANDIDATES); }}
      totalCandidatesCount={candidates.length} />
    <nav className="module-top-bar"><ul className="module-nav-list">
      {MODULES_LIST.map(mod => { const Icon = mod.icon; return <li key={mod.id}
        className={`module-nav-item ${activeModuleId === mod.id ? 'active' : ''}`}
        onClick={() => setActiveModuleId(mod.id)}><Icon size={14}/><span>{mod.title}</span>
        {mod.isUpcoming && <span className="tag tag-gold">Soon</span>}</li>; })}
    </ul></nav>
    <ModuleNavSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
      activeModuleId={activeModuleId} onSelectModule={setActiveModuleId}/>
    <main className="main-content">
      {activeModuleId === 'resume-screening'
        ? activeView === 'candidate'
          ? <CandidatePortal onCandidateSubmitted={candidate => setCandidates(prev => [candidate, ...prev])}/>
          : <RecruiterDashboard candidates={candidates} onUpdateCandidate={updated => setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c))}/>
        : <UpcomingModuleShell moduleId={activeModuleId} onSwitchToResumeScreening={() => setActiveModuleId('resume-screening')}/>}
    </main>
  </div>;
}
