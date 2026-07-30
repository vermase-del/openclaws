import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, Calendar, DollarSign, ShieldCheck } from 'lucide-react';

export default function PersonalInfoSection({ formData, onChange }) {
  return (
    <div class="glass-card">
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <User size={18} style={{ color: 'var(--accent-primary)' }} />
        Personal & Contact Details
      </h3>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">
            Full Name *
          </label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. Elena Rostova"
            value={formData.fullName || ''}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Target Job Title / Headline *
          </label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. Senior Full Stack Engineer"
            value={formData.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Email Address *
          </label>
          <input
            type="email"
            class="form-input"
            placeholder="elena@example.com"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Phone Number *
          </label>
          <input
            type="tel"
            class="form-input"
            placeholder="+1 (555) 000-0000"
            value={formData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Current Location *
          </label>
          <input
            type="text"
            class="form-input"
            placeholder="City, State / Country"
            value={formData.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">
            Preferred Work Mode
          </label>
          <select
            class="form-select"
            value={formData.preferredMode || 'Remote'}
            onChange={(e) => onChange('preferredMode', e.target.value)}
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
            <option value="Flexible">Flexible / Open</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">
            Notice Period / Availability
          </label>
          <select
            class="form-select"
            value={formData.noticePeriod || '2 Weeks'}
            onChange={(e) => onChange('noticePeriod', e.target.value)}
          >
            <option value="Immediate">Immediate</option>
            <option value="2 Weeks">2 Weeks</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months+">2 Months+</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">
            Work Authorization Status
          </label>
          <select
            class="form-select"
            value={formData.workAuthorization || 'US Citizen'}
            onChange={(e) => onChange('workAuthorization', e.target.value)}
          >
            <option value="US Citizen">US Citizen</option>
            <option value="Permanent Resident (Green Card)">Permanent Resident (Green Card)</option>
            <option value="H-1B Visa">H-1B Visa</option>
            <option value="Requires Sponsorship">Requires Sponsorship</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Current Salary ($ / Year)</label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. $150,000"
            value={formData.currentSalary || ''}
            onChange={(e) => onChange('currentSalary', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Desired Salary ($ / Year)</label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g. $170,000"
            value={formData.desiredSalary || ''}
            onChange={(e) => onChange('desiredSalary', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">Portfolio URL</label>
          <input
            type="url"
            class="form-input"
            placeholder="https://yourportfolio.io"
            value={formData.portfolioUrl || ''}
            onChange={(e) => onChange('portfolioUrl', e.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="form-label">LinkedIn Profile URL</label>
          <input
            type="url"
            class="form-input"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedinUrl || ''}
            onChange={(e) => onChange('linkedinUrl', e.target.value)}
          />
        </div>

        <div class="form-group full-width">
          <label class="form-label">GitHub Profile URL</label>
          <input
            type="url"
            class="form-input"
            placeholder="https://github.com/username"
            value={formData.githubUrl || ''}
            onChange={(e) => onChange('githubUrl', e.target.value)}
          />
        </div>

        <div class="form-group full-width">
          <label class="form-label">Professional Summary & Elevator Pitch</label>
          <textarea
            class="form-textarea"
            placeholder="Brief overview of your key experience, technical focus, and major career achievements..."
            value={formData.summary || ''}
            onChange={(e) => onChange('summary', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
