import React from 'react';
import { X, Sparkles, CheckCircle, Briefcase, GraduationCap, DollarSign } from 'lucide-react';

export default function CandidateComparisonModal({ candidates = [], onClose }) {
  if (!candidates || candidates.length < 2) return null;

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-container" style={{ maxWidth: '1200px' }} onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Side-by-Side Candidate Matrix ({candidates.length} Selected)</h3>
          </div>
          <button class="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div class="modal-body">
          <table class="data-table" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Attribute</th>
                {candidates.map(c => (
                  <th key={c.id} style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>{c.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.title}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* ATS Overall Fit */}
              <tr>
                <td style={{ fontWeight: '700' }}>Overall ATS Fit</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                      {c.atsScore?.overallMatch || 85}%
                    </div>
                  </td>
                ))}
              </tr>

              {/* Status */}
              <tr>
                <td style={{ fontWeight: '700' }}>Status</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ textAlign: 'center' }}>
                    <span class="tag tag-emerald">{c.status || 'Screened'}</span>
                  </td>
                ))}
              </tr>

              {/* Salary Expectations */}
              <tr>
                <td style={{ fontWeight: '700' }}>Salary Expectations</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem' }}>Current: {c.currentSalary || 'N/A'}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                      Desired: {c.desiredSalary || 'N/A'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Notice Period */}
              <tr>
                <td style={{ fontWeight: '700' }}>Availability / Notice</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                    {c.noticePeriod || '2 Weeks'}
                  </td>
                ))}
              </tr>

              {/* Location & Work Mode */}
              <tr>
                <td style={{ fontWeight: '700' }}>Location & Mode</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                    {c.location} ({c.preferredMode || 'Remote'})
                  </td>
                ))}
              </tr>

              {/* Core Technical Skills */}
              <tr>
                <td style={{ fontWeight: '700' }}>Primary Skill Set</td>
                {candidates.map(c => (
                  <td key={c.id}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', justifyContent: 'center' }}>
                      {c.skills?.map((sk, i) => (
                        <span key={i} class="tag tag-primary" style={{ fontSize: '0.7rem' }}>
                          {typeof sk === 'string' ? sk : sk.name}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Latest Experience */}
              <tr>
                <td style={{ fontWeight: '700' }}>Most Recent Experience</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ fontSize: '0.825rem' }}>
                    {c.workExperience && c.workExperience[0] ? (
                      <div>
                        <strong>{c.workExperience[0].role}</strong>
                        <div style={{ color: 'var(--text-muted)' }}>{c.workExperience[0].company}</div>
                      </div>
                    ) : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Technical Challenge Resolution */}
              <tr>
                <td style={{ fontWeight: '700' }}>Screening Answer Snippet</td>
                {candidates.map(c => (
                  <td key={c.id} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {c.screeningAnswers?.technicalChallenge || 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
