import React from 'react';
import { MODULES_LIST } from './ModuleNavSidebar';
import { Sparkles, Rocket, ArrowRight, Bell, CheckCircle, Lock, ShieldCheck, Target } from 'lucide-react';

export default function UpcomingModuleShell({ moduleId, onSwitchToResumeScreening }) {
  const currentMod = MODULES_LIST.find(m => m.id === moduleId) || MODULES_LIST[1];
  const Icon = currentMod.icon;

  return (
    <div style={{ maxWidth: '1000px', margin: '1rem auto' }}>
      {/* Module Banner Card */}
      <div class="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem', background: 'var(--gradient-card)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(0, 198, 255, 0.08)', filter: 'blur(30px)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-megaclaw)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)' }}>
            <Icon size={30} />
          </div>
          <div>
            <span class="tag tag-gold" style={{ marginBottom: '0.4rem' }}>
              <Rocket size={12} strokeWidth={2.5} /> MEGACLAW Roadmap • {currentMod.badge}
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{currentMod.title}</h2>
          </div>
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {currentMod.description}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button class="btn btn-gold" onClick={() => alert(`Subscribed to early access alerts for ${currentMod.title}!`)}>
            <Bell size={16} /> Request Early Access
          </button>
          <button class="btn btn-secondary" onClick={onSwitchToResumeScreening}>
            <Target size={16} /> Switch to Resume Screening Module
          </button>
        </div>
      </div>

      {/* Feature Blueprint Grid */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
        Upcoming Solution Features & Architecture
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div class="glass-card">
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(0, 198, 255, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <Sparkles size={20} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>AI-Powered Personalization</h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Deep learning algorithms tailored for student skill benchmarking and career matching.
          </p>
        </div>

        <div class="glass-card">
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <ShieldCheck size={20} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>Verified Credentials</h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Tamper-proof academic badges, skill certificates, and mentor endorsements.
          </p>
        </div>

        <div class="glass-card">
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <CheckCircle size={20} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>Global Network Sync</h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Seamless integration with worldwide university portals and corporate talent pipelines.
          </p>
        </div>
      </div>
    </div>
  );
}
