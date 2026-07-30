import React, { useState } from 'react';
import { GraduationCap, Award, Star, Plus, Trash2, Code } from 'lucide-react';

export default function EducationSkillsSection({ education = [], skills = [], certifications = [], onEducationChange, onSkillsChange, onCertificationsChange }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(4);
  const [newSkillCategory, setNewSkillCategory] = useState('Technical');

  // Education Handlers
  const handleAddEdu = () => {
    onEducationChange([
      ...education,
      { id: `edu-${Date.now()}`, institution: '', degree: '', fieldOfStudy: '', graduationYear: '', gpa: '' }
    ]);
  };

  const handleRemoveEdu = (id) => {
    onEducationChange(education.filter(e => e.id !== id));
  };

  const handleUpdateEdu = (id, field, value) => {
    onEducationChange(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  // Skill Handlers
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    onSkillsChange([
      ...skills,
      { name: newSkillName.trim(), level: Number(newSkillLevel), category: newSkillCategory }
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillName) => {
    onSkillsChange(skills.filter(s => s.name !== skillName));
  };

  // Certification Handlers
  const handleAddCert = () => {
    onCertificationsChange([
      ...certifications,
      { id: `cert-${Date.now()}`, name: '', year: new Date().getFullYear().toString() }
    ]);
  };

  const handleRemoveCert = (id) => {
    onCertificationsChange(certifications.filter(c => c.id !== id));
  };

  const handleUpdateCert = (id, field, val) => {
    onCertificationsChange(certifications.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Education Section */}
      <div class="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={18} style={{ color: 'var(--accent-primary)' }} />
            Education & Academic Background
          </h3>
          <button class="btn btn-secondary btn-sm" onClick={handleAddEdu}>
            <Plus size={14} /> Add Education
          </button>
        </div>

        {education.map((edu, idx) => (
          <div key={edu.id} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span class="tag tag-primary">Degree #{idx + 1}</span>
              <button class="btn btn-danger btn-sm" onClick={() => handleRemoveEdu(edu.id)}>
                <Trash2 size={12} />
              </button>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Institution / University</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g. UC Berkeley"
                  value={edu.institution || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'institution', e.target.value)}
                />
              </div>

              <div class="form-group">
                <label class="form-label">Degree Title</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g. B.S. in Computer Science"
                  value={edu.degree || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'degree', e.target.value)}
                />
              </div>

              <div class="form-group">
                <label class="form-label">Graduation Year</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="2020"
                  value={edu.graduationYear || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'graduationYear', e.target.value)}
                />
              </div>

              <div class="form-group">
                <label class="form-label">GPA (Optional)</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g. 3.8"
                  value={edu.gpa || ''}
                  onChange={(e) => handleUpdateEdu(edu.id, 'gpa', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Matrix Section */}
      <div class="glass-card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={18} style={{ color: 'var(--accent-primary)' }} />
          Skills Matrix & Proficiency
        </h3>

        {/* Add Skill Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            class="form-input"
            style={{ flex: 1, minWidth: '180px' }}
            placeholder="Add skill (e.g. React, TypeScript, GCP)..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />

          <select
            class="form-select"
            style={{ width: '140px' }}
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
          >
            <option value="Technical">Technical</option>
            <option value="Domain">Domain</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>

          <select
            class="form-select"
            style={{ width: '130px' }}
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
          >
            <option value={5}>5 ★ Expert</option>
            <option value={4}>4 ★ Advanced</option>
            <option value={3}>3 ★ Intermediate</option>
            <option value={2}>2 ★ Basic</option>
          </select>

          <button class="btn btn-primary" onClick={handleAddSkill}>
            <Plus size={16} /> Add Skill
          </button>
        </div>

        {/* Skill Tag Cloud */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          {skills.map((skill, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-tertiary)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem'
              }}
            >
              <span style={{ fontWeight: '600' }}>{skill.name}</span>
              <span style={{ display: 'flex', color: 'var(--accent-amber)', fontSize: '0.75rem' }}>
                {'★'.repeat(skill.level)}
              </span>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                onClick={() => handleRemoveSkill(skill.name)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div class="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} style={{ color: 'var(--accent-emerald)' }} />
            Certifications & Licenses
          </h3>
          <button class="btn btn-secondary btn-sm" onClick={handleAddCert}>
            <Plus size={14} /> Add Cert
          </button>
        </div>

        {certifications.map((cert) => (
          <div key={cert.id} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
            <input
              type="text"
              class="form-input"
              style={{ flex: 1 }}
              placeholder="e.g. AWS Certified Solutions Architect"
              value={cert.name || ''}
              onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)}
            />
            <input
              type="text"
              class="form-input"
              style={{ width: '110px' }}
              placeholder="Year"
              value={cert.year || ''}
              onChange={(e) => handleUpdateCert(cert.id, 'year', e.target.value)}
            />
            <button class="btn btn-danger btn-sm" onClick={() => handleRemoveCert(cert.id)}>
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
