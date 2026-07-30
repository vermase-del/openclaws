import React from 'react';
import { Sparkles, MapPin, Briefcase, GraduationCap, Star, Eye, Layers, CheckSquare, Square } from 'lucide-react';

export default function CandidateCard({ candidate, onViewDossier, isSelectedForCompare, onToggleCompare }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return <span class="tag tag-emerald">Shortlisted</span>;
      case 'Interview Scheduled':
        return <span class="tag tag-primary">Interview Scheduled</span>;
      case 'Rejected':
        return <span class="tag tag-rose">Rejected</span>;
      default:
        return <span class="tag tag-amber">{status || 'Screened'}</span>;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'CN';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div class="glass-card candidate-card">
      {/* Top Header */}
      <div>
        <div class="candidate-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              title="Select for candidate comparison"
              onClick={() => onToggleCompare(candidate.id)}
            >
              {isSelectedForCompare ? (
                <CheckSquare size={18} style={{ color: 'var(--accent-primary)' }} />
              ) : (
                <Square size={18} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
            <div class="candidate-avatar">
              {getInitials(candidate.fullName)}
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.2' }}>{candidate.fullName}</h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{candidate.title}</div>
            </div>
          </div>

          <div class="match-score-badge">
            <div class="score-num">{candidate.atsScore?.overallMatch || 85}%</div>
            <div class="score-label">ATS Match</div>
          </div>
        </div>

        {/* Status & Work Mode Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
          {getStatusBadge(candidate.status)}
          <span class="tag">
            <MapPin size={10} /> {candidate.location || 'Remote'}
          </span>
          <span class="tag">
            <Briefcase size={10} /> {candidate.noticePeriod || '2 Weeks'}
          </span>
        </div>

        {/* AI Insight Highlight */}
        <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: '1.4' }}>
          <strong style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Sparkles size={12} /> AI Summary:
          </strong>{' '}
          {candidate.aiInsights?.summary || candidate.summary || 'Strong candidate matching technical requirements.'}
        </div>

        {/* Skill Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
          {candidate.skills?.slice(0, 4).map((skill, i) => (
            <span key={i} class="tag tag-primary" style={{ fontSize: '0.7rem' }}>
              {typeof skill === 'string' ? skill : skill.name}
            </span>
          ))}
          {(candidate.skills?.length || 0) > 4 && (
            <span class="tag" style={{ fontSize: '0.7rem' }}>
              +{(candidate.skills?.length || 0) - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-amber)', fontSize: '0.85rem' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={14}
              fill={star <= (candidate.recruiterRating || 0) ? 'currentColor' : 'none'}
              style={{ opacity: star <= (candidate.recruiterRating || 0) ? 1 : 0.3 }}
            />
          ))}
        </div>

        <button class="btn btn-primary btn-sm" onClick={() => onViewDossier(candidate)}>
          <Eye size={14} /> Full Dossier
        </button>
      </div>
    </div>
  );
}
