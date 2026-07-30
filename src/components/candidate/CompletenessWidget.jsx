import React from 'react';
import { ShieldCheck, Sparkles, AlertTriangle, CheckCircle2, Award } from 'lucide-react';

export default function CompletenessWidget({ formData }) {
  // Calculate completeness percentage based on key fields
  const checkFields = [
    { label: 'Full Name & Headline', isDone: Boolean(formData.fullName && formData.title) },
    { label: 'Contact Info (Email & Phone)', isDone: Boolean(formData.email && formData.phone) },
    { label: 'Location & Work Preferences', isDone: Boolean(formData.location && formData.preferredMode) },
    { label: 'Professional Summary', isDone: Boolean(formData.summary && formData.summary.length > 20) },
    { label: 'Work History (at least 1 position)', isDone: Boolean(formData.workExperience && formData.workExperience.length > 0) },
    { label: 'Education History', isDone: Boolean(formData.education && formData.education.length > 0) },
    { label: 'Skills Matrix (at least 3 skills)', isDone: Boolean(formData.skills && formData.skills.length >= 3) },
    { label: 'Screening Questions', isDone: Boolean(formData.screeningAnswers && formData.screeningAnswers.technicalChallenge) }
  ];

  const completedCount = checkFields.filter(f => f.isDone).length;
  const percentage = Math.round((completedCount / checkFields.length) * 100);

  // Simulated ATS match estimate
  const estimatedAtsScore = Math.min(98, Math.max(40, Math.round(percentage * 0.92 + (formData.skills?.length || 0) * 1.5)));

  return (
    <div style={{ position: 'sticky', top: '90px' }}>
      <div class="glass-card" style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Profile Strength Meter</span>
          <span style={{ fontWeight: '800', color: percentage > 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {percentage}%
          </span>
        </h4>

        {/* Progress bar */}
        <div class="progress-bar-bg" style={{ height: '8px', marginBottom: '1rem' }}>
          <div
            class="progress-bar-fill"
            style={{ width: `${percentage}%`, background: percentage > 75 ? 'var(--accent-emerald)' : 'var(--gradient-score)' }}
          />
        </div>

        {/* ATS Readiness Score */}
        <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Estimated ATS Compatibility</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
              {estimatedAtsScore}/100 Score
            </div>
          </div>
          <Sparkles size={22} style={{ color: 'var(--accent-cyan)' }} />
        </div>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            Section Checklist
          </div>
          {checkFields.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              {item.isDone ? (
                <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1.5px solid var(--text-muted)', flexShrink: 0 }} />
              )}
              <span style={{ color: item.isDone ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
            <Sparkles size={14} /> AI Optimization Tip
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {percentage < 60
              ? 'Complete your work history and add technical skills to boost your ATS match score above 85%.'
              : 'Great job! Including quantifiable metrics (e.g. "Increased speed by 40%") in your work accomplishments increases recruiter callback rates by 3x.'}
          </p>
        </div>
      </div>
    </div>
  );
}
