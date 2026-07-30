import React from 'react';
import MegaclawLogo from './MegaclawLogo';
import { X, Target, GraduationCap, Users, Globe, Heart, BarChart3, ChevronRight, Sparkles, Layers } from 'lucide-react';

export const MODULES_LIST = [
  {
    id: 'resume-screening',
    title: 'Resume Screening & Intake',
    subtitle: 'Smart Candidate Capture & ATS Screening',
    icon: Target,
    badge: 'Active Module',
    badgeType: 'emerald',
    isUpcoming: false,
    description: 'Capture comprehensive candidate profiles, parse resumes with AI, calculate ATS scores, and evaluate candidates.'
  },
  {
    id: 'career-hub',
    title: 'Student Career & Skill Hub',
    subtitle: 'AI Skill Mapping & Course Catalog',
    icon: GraduationCap,
    badge: 'Coming Soon',
    badgeType: 'gold',
    isUpcoming: true,
    description: 'Personalized career roadmap generator, skill gap diagnostics, and automated resume builder for students.'
  },
  {
    id: 'talent-network',
    title: 'Talent Community & Networking',
    subtitle: 'Peer Connections & Mentorship',
    icon: Users,
    badge: 'Coming Soon',
    badgeType: 'primary',
    isUpcoming: true,
    description: 'Connect students with industry leaders, participate in peer coding circles, and find project co-founders.'
  },
  {
    id: 'global-opps',
    title: 'Global Opportunities & Internships',
    subtitle: 'International Placement Matching',
    icon: Globe,
    badge: 'Coming Soon',
    badgeType: 'gold',
    isUpcoming: true,
    description: 'AI-driven matching for global internships, study-abroad scholarships, and remote tech apprenticeships.'
  },
  {
    id: 'social-impact',
    title: 'Social Impact & Mentorship',
    subtitle: 'Humanitarian & Student Tech Initiatives',
    icon: Heart,
    badge: 'Coming Soon',
    badgeType: 'primary',
    isUpcoming: true,
    description: 'Empowering students to solve real-world community challenges through open technology and mentorship.'
  },
  {
    id: 'ai-analytics',
    title: 'Enterprise AI & Workforce Analytics',
    subtitle: 'Predictive Hiring Insights',
    icon: BarChart3,
    badge: 'Coming Soon',
    badgeType: 'gold',
    isUpcoming: true,
    description: 'Advanced talent pipeline forecasting, diversity metrics, and automated interview scheduling AI.'
  }
];

export default function ModuleNavSidebar({ isOpen, onClose, activeModuleId, onSelectModule }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 15, 29, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100
        }}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div class="sidebar-drawer">
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <MegaclawLogo size="small" showTagline={false} />
          <button class="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-gold)', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
            MEGACLAW Multi-Solution Suite
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Switch between modules across the Megaclaw student and enterprise platform.
          </p>
        </div>

        <div style={{ padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {MODULES_LIST.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModuleId === mod.id;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  onSelectModule(mod.id);
                  onClose();
                }}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${isActive ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
                  background: isActive ? 'rgba(0, 198, 255, 0.1)' : 'var(--bg-primary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--gradient-megaclaw)' : 'var(--bg-tertiary)',
                      color: isActive ? '#FFF' : 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} />
                    </div>
                    <strong style={{ fontSize: '0.9rem', color: isActive ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                      {mod.title}
                    </strong>
                  </div>

                  <span class={`tag tag-${mod.badgeType}`} style={{ fontSize: '0.65rem' }}>
                    {mod.badge}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '2.25rem' }}>
                  {mod.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          MEGACLAW Platform v2.5 • All rights reserved
        </div>
      </div>
    </>
  );
}
