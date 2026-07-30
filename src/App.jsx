import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ModuleNavSidebar, { MODULES_LIST } from './components/ModuleNavSidebar';
import CandidatePortal from './components/candidate/CandidatePortal';
import RecruiterDashboard from './components/recruiter/RecruiterDashboard';
import UpcomingModuleShell from './components/UpcomingModuleShell';
import { MOCK_CANDIDATES } from './data/mockCandidates';
import { Layers } from 'lucide-react';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState('resume-screening');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('candidate'); // 'candidate' | 'recruiter'
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('megaclaw_candidates');
    return saved ? JSON.parse(saved) : MOCK_CANDIDATES;
  });

  // Sync theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Save candidate data
  useEffect(() => {
    localStorage.setItem('megaclaw_candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleCandidateSubmitted = (newCandidate) => {
    setCandidates(prev => [newCandidate, ...prev]);
  };

  const handleUpdateCandidate = (updatedCand) => {
    setCandidates(prev => prev.map(c => c.id === updatedCand.id ? updatedCand : c));
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset candidate pipeline back to MEGACLAW default dataset?')) {
      setCandidates(MOCK_CANDIDATES);
      localStorage.removeItem('megaclaw_candidates');
    }
  };

  return (
    <div class="app-container">
      {/* Top Header Navbar */}
      <Header
        activeModuleId={activeModuleId}
        onSelectModule={setActiveModuleId}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onResetDemoData={handleResetDemoData}
        totalCandidatesCount={candidates.length}
      />

      {/* Multi-Module Navigation Quick Bar */}
      <nav class="module-top-bar">
        <ul class="module-nav-list">
          {MODULES_LIST.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModuleId === mod.id;
            return (
              <li
                key={mod.id}
                class={`module-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveModuleId(mod.id)}
              >
                <Icon size={14} />
                <span>{mod.title}</span>
                {mod.isUpcoming && <span class="tag tag-gold" style={{ fontSize: '0.6rem' }}>Soon</span>}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Slide-out Module Drawer */}
      <ModuleNavSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeModuleId={activeModuleId}
        onSelectModule={setActiveModuleId}
      />

      {/* Main Content Area */}
      <main class="main-content">
        {activeModuleId === 'resume-screening' ? (
          activeView === 'candidate' ? (
            <CandidatePortal onCandidateSubmitted={handleCandidateSubmitted} />
          ) : (
            <RecruiterDashboard
              candidates={candidates}
              onUpdateCandidate={handleUpdateCandidate}
            />
          )
        ) : (
          <UpcomingModuleShell
            moduleId={activeModuleId}
            onSwitchToResumeScreening={() => setActiveModuleId('resume-screening')}
          />
        )}
      </main>
    </div>
  );
}
