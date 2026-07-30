import React from 'react';
import { HelpCircle, MessageSquare } from 'lucide-react';

export default function ScreeningQuestionsSection({ answers = {}, onChange }) {

  const handleAnswerChange = (field, val) => {
    onChange({ ...answers, [field]: val });
  };

  return (
    <div class="glass-card">
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <HelpCircle size={18} style={{ color: 'var(--accent-primary)' }} />
        Recruiter Screening Questionnaire
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Answering these questions provides recruiters with direct context on your technical problem-solving and availability.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div class="form-group">
          <label class="form-label">
            1. What is your expected notice period and earliest join date?
          </label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. 2 weeks notice after official offer letter"
            value={answers.noticePeriod || ''}
            onChange={(e) => handleAnswerChange('noticePeriod', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            2. Describe a complex technical challenge you recently solved and how you approached it.
          </label>
          <textarea
            class="form-textarea"
            placeholder="Describe the problem, tools used, trade-offs evaluated, and ultimate resolution..."
            value={answers.technicalChallenge || ''}
            onChange={(e) => handleAnswerChange('technicalChallenge', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            3. Are you open to hybrid work or relocation if required?
          </label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. Based in SF, open to 2 days/week hybrid office attendance"
            value={answers.relocation || ''}
            onChange={(e) => handleAnswerChange('relocation', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            4. What motivates you most in your next career opportunity?
          </label>
          <textarea
            class="form-textarea"
            placeholder="Key technical growth areas, company culture, scale of impact..."
            value={answers.motivation || ''}
            onChange={(e) => handleAnswerChange('motivation', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
