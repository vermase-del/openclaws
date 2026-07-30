import React, { useState } from 'react';
import MegaclawLogo from './MegaclawLogo';
import { MODULES_LIST } from './ModuleNavSidebar';
import { Menu, UserCheck, LayoutDashboard, Sun, Moon, Database, Bell, ChevronDown, Layers, Target } from 'lucide-react';

export default function Header({
  activeModuleId,
  onSelectModule,
  onOpenSidebar,
  activeView,
  setActiveView,
  isDarkMode,
  setIsDarkMode,
  onResetDemoData,
  totalCandidatesCount
}) {
  const [showModuleMenu, setShowModuleMenu] = useState(false);
  const currentModule = MODULES_LIST.find(m => m.id === activeModuleId) || MODULES_LIST[0];

  return (
    <header class="app-header">
      {/* Brand & Menu Drawer Button */}
      <div class="header-brand">
        <button class="icon-btn" onClick={onOpenSidebar} title="Open MEGACLAW Solution Modules Drawer">
          <Menu size={20} />
        </button>

        <MegaclawLogo size="medium" showTagline={true} />
      </div>

      {/* Center Module Selector Bar */}
      <div style={{ position: 'relative' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
          onClick={() => setShowModuleMenu(!showModuleMenu)}
        >
          <span class="tag tag-gold" style={{ fontSize: '0.7rem' }}>MODULE</span>
          <span>{currentModule.title}</span>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </button>

        {showModuleMenu && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 200
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', padding: '0.4rem 0.6rem', textTransform: 'uppercase' }}>
              Select Platform Module
            </div>
            {MODULES_LIST.map(mod => (
              <div
                key={mod.id}
                style={{
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '0.825rem',
                  fontWeight: mod.id === activeModuleId ? '700' : '500',
                  color: mod.id === activeModuleId ? 'var(--accent-cyan)' : 'var(--text-primary)',
                  background: mod.id === activeModuleId ? 'rgba(0, 198, 255, 0.1)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onClick={() => {
                  onSelectModule(mod.id);
                  setShowModuleMenu(false);
                }}
              >
                <span>{mod.title}</span>
                <span class={`tag tag-${mod.badgeType}`} style={{ fontSize: '0.6rem' }}>
                  {mod.badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Actions & Controls */}
      <div class="header-controls">
        {activeModuleId === 'resume-screening' && (
          <div class="mode-switcher">
            <button
              class={`mode-btn ${activeView === 'candidate' ? 'active' : ''}`}
              onClick={() => setActiveView('candidate')}
            >
              <UserCheck size={16} />
              Candidate Intake
            </button>
            <button
              class={`mode-btn ${activeView === 'recruiter' ? 'active' : ''}`}
              onClick={() => setActiveView('recruiter')}
            >
              <LayoutDashboard size={16} />
              Recruiter Dashboard
              <span class="tag tag-gold" style={{ marginLeft: '4px', fontSize: '0.7rem' }}>
                {totalCandidatesCount}
              </span>
            </button>
          </div>
        )}

        <button
          class="icon-btn"
          title="Reset Demo Candidates Data"
          onClick={onResetDemoData}
        >
          <Database size={18} />
        </button>

        <button
          class="icon-btn"
          title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Theme`}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
