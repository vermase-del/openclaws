import React, { useState } from 'react';
import { X, Sparkles, User, Briefcase, GraduationCap, Code, Star, CheckCircle, AlertTriangle, HelpCircle, FileText, Globe, Linkedin, Github, Mail, Phone, MapPin, Save, DollarSign } from 'lucide-react';

export default function CandidateDossierModal({ candidate, onClose, onUpdateCandidate }) {
  const [activeTab, setActiveTab] = useState('ai');
  const [recruiterRating, setRecruiterRating] = useState(candidate?.recruiterRating || 0);
  const [recruiterNotes, setRecruiterNotes] = useState(candidate?.recruiterNotes || '');
  const [status, setStatus] = useState(candidate?.status || 'Screened');

  if (!candidate) return null;

  const handleSaveEvaluation = () => {
    onUpdateCandidate({
      ...candidate,
      recruiterRating,
      recruiterNotes,
      status
    });
    onClose();
  };

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div class="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem' }}>
              {candidate.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{candidate.fullName}</h3>
                <span class="tag tag-emerald">{candidate.status || 'Screened'}</span>
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                {candidate.title} • {candidate.location}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                {candidate.atsScore?.overallMatch || 88}%
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Overall ATS Fit</div>
            </div>

            <button class="icon-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{ padding: '0.75rem 1.75rem 0 1.75rem', background: 'var(--bg-secondary)' }}>
          <div class="modal-tabs" style={{ marginBottom: 0 }}>
            <button
              class={`modal-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
              AI Match & Analytics
            </button>
            <button
              class={`modal-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Full Candidate Profile
            </button>
            <button
              class={`modal-tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
              onClick={() => setActiveTab('qa')}
            >
              <HelpCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Screening Q&A
            </button>
            <button
              class={`modal-tab-btn ${activeTab === 'evaluation' ? 'active' : ''}`}
              onClick={() => setActiveTab('evaluation')}
            >
              <Star size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Recruiter Notes & Rating
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div class="modal-body">
          {/* TAB 1: AI Match & Analytics */}
          {activeTab === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* ATS Score Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Skill Match</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    {candidate.atsScore?.skillMatch || 90}%
                  </div>
                </div>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Experience Fit</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                    {candidate.atsScore?.experienceMatch || 88}%
                  </div>
                </div>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Education Fit</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                    {candidate.atsScore?.educationMatch || 85}%
                  </div>
                </div>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Stability Score</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-amber)' }}>
                    {candidate.atsScore?.stabilityScore || 92}%
                  </div>
                </div>
              </div>

              {/* AI Executive Summary */}
              <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} /> Executive AI Screening Insights
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  {candidate.aiInsights?.summary || candidate.summary}
                </p>
              </div>

              {/* Strengths vs Risks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={16} /> Key Strengths
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {candidate.aiInsights?.strengths?.map((str, i) => (
                      <li key={i}>{str}</li>
                    )) || <li>Strong alignment with role requirements.</li>}
                  </ul>
                </div>

                <div style={{ background: 'rgba(244, 63, 94, 0.05)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-rose)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertTriangle size={16} /> Risk Factors / Areas to Probe
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {candidate.aiInsights?.risks?.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    )) || <li>No high-risk indicators detected.</li>}
                  </ul>
                </div>
              </div>

              {/* Suggested Interview Questions */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <HelpCircle size={16} style={{ color: 'var(--accent-cyan)' }} /> Suggested AI Interview Questions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {candidate.aiInsights?.suggestedQuestions?.map((q, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.825rem', borderLeft: '3px solid var(--accent-cyan)' }}>
                      {i + 1}. {q}
                    </div>
                  )) || <div>1. Describe your software development workflow.</div>}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Full Candidate Profile */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Contact Bar */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} style={{ color: 'var(--accent-primary)' }} /> {candidate.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} style={{ color: 'var(--accent-primary)' }} /> {candidate.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} style={{ color: 'var(--accent-primary)' }} /> {candidate.location}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><DollarSign size={14} style={{ color: 'var(--accent-emerald)' }} /> Current: {candidate.currentSalary} | Desired: {candidate.desiredSalary}</div>
              </div>

              {/* Summary */}
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>Professional Summary</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {candidate.summary}
                </p>
              </div>

              {/* Work Experience */}
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Briefcase size={16} style={{ color: 'var(--accent-primary)' }} /> Work History
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {candidate.workExperience?.map(work => (
                    <div key={work.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <strong style={{ fontSize: '0.95rem' }}>{work.role}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {work.startDate} – {work.isCurrent ? 'Present' : work.endDate}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                        {work.company} • {work.location}
                      </div>

                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                        {work.accomplishments?.map((acc, i) => (
                          <li key={i}>{acc}</li>
                        ))}
                      </ul>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {work.techStack?.map((tech, i) => (
                          <span key={i} class="tag" style={{ fontSize: '0.68rem' }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Skills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GraduationCap size={16} style={{ color: 'var(--accent-primary)' }} /> Education
                  </h4>
                  {candidate.education?.map(edu => (
                    <div key={edu.id} style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.875rem' }}>{edu.degree}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {edu.institution} ({edu.graduationYear}) {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Code size={16} style={{ color: 'var(--accent-primary)' }} /> Skills Matrix
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {candidate.skills?.map((s, i) => (
                      <span key={i} class="tag tag-primary" style={{ fontSize: '0.75rem' }}>
                        {typeof s === 'string' ? s : `${s.name} (${'★'.repeat(s.level || 4)})`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Screening Q&A */}
          {activeTab === 'qa' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Notice Period & Join Date</h5>
                <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{candidate.screeningAnswers?.noticePeriod || '2 Weeks Notice'}</p>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Technical Challenge Resolution</h5>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{candidate.screeningAnswers?.technicalChallenge || 'No response recorded.'}</p>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Relocation & Hybrid Flexibility</h5>
                <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{candidate.screeningAnswers?.relocation || 'Flexible'}</p>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h5 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Career Motivation</h5>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{candidate.screeningAnswers?.motivation || 'No response recorded.'}</p>
              </div>
            </div>
          )}

          {/* TAB 4: Recruiter Evaluation */}
          {activeTab === 'evaluation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div class="form-group">
                <label class="form-label">Pipeline Status</label>
                <select
                  class="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="New / Screened">New / Screened</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Offer Sent">Offer Sent</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Recruiter Star Rating (1-5)</label>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.5rem', color: 'var(--accent-amber)', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={24}
                      fill={star <= recruiterRating ? 'currentColor' : 'none'}
                      onClick={() => setRecruiterRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Recruiter Feedback Notes</label>
                <textarea
                  class="form-textarea"
                  style={{ minHeight: '140px' }}
                  placeholder="Add internal evaluation feedback, interview feedback, or salary negotiation notes..."
                  value={recruiterNotes}
                  onChange={(e) => setRecruiterNotes(e.target.value)}
                />
              </div>

              <button class="btn btn-primary" onClick={handleSaveEvaluation}>
                <Save size={16} /> Save Evaluation & Update Candidate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
