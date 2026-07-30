import React from 'react';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Tag } from 'lucide-react';

export default function WorkExperienceSection({ workExperience = [], onChange }) {

  const handleAddWork = () => {
    const newItem = {
      id: `work-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      techStack: [],
      accomplishments: ['']
    };
    onChange([...workExperience, newItem]);
  };

  const handleRemoveWork = (id) => {
    onChange(workExperience.filter(w => w.id !== id));
  };

  const handleUpdateWork = (id, field, value) => {
    onChange(workExperience.map(w => {
      if (w.id === id) {
        return { ...w, [field]: value };
      }
      return w;
    }));
  };

  const handleTechStackChange = (id, techString) => {
    const tags = techString.split(',').map(t => t.trim()).filter(Boolean);
    handleUpdateWork(id, 'techStack', tags);
  };

  const handleAccomplishmentChange = (id, index, val) => {
    const item = workExperience.find(w => w.id === id);
    if (!item) return;
    const newAcc = [...item.accomplishments];
    newAcc[index] = val;
    handleUpdateWork(id, 'accomplishments', newAcc);
  };

  const handleAddAccomplishment = (id) => {
    const item = workExperience.find(w => w.id === id);
    if (!item) return;
    handleUpdateWork(id, 'accomplishments', [...item.accomplishments, '']);
  };

  const handleRemoveAccomplishment = (id, index) => {
    const item = workExperience.find(w => w.id === id);
    if (!item) return;
    const newAcc = item.accomplishments.filter((_, i) => i !== index);
    handleUpdateWork(id, 'accomplishments', newAcc);
  };

  return (
    <div class="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={18} style={{ color: 'var(--accent-primary)' }} />
            Work History & Experience
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            List your relevant professional positions, accomplishments, and tech stack.
          </p>
        </div>

        <button class="btn btn-secondary btn-sm" onClick={handleAddWork}>
          <Plus size={14} /> Add Position
        </button>
      </div>

      {workExperience.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>No work history added yet.</p>
          <button class="btn btn-primary btn-sm" onClick={handleAddWork}>
            <Plus size={14} /> Add Your First Work Position
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {workExperience.map((work, idx) => (
            <div
              key={work.id}
              style={{
                background: 'var(--bg-secondary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span class="tag tag-primary">Position #{idx + 1}</span>
                <button
                  class="btn btn-danger btn-sm"
                  title="Delete Position"
                  onClick={() => handleRemoveWork(work.id)}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Company Name *</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="e.g. Apex Cloud Innovations"
                    value={work.company || ''}
                    onChange={(e) => handleUpdateWork(work.id, 'company', e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Job Title / Role *</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="e.g. Lead Full Stack Engineer"
                    value={work.role || ''}
                    onChange={(e) => handleUpdateWork(work.id, 'role', e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Start Date</label>
                  <input
                    type="month"
                    class="form-input"
                    value={work.startDate || ''}
                    onChange={(e) => handleUpdateWork(work.id, 'startDate', e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">
                    End Date
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <input
                        type="checkbox"
                        checked={work.isCurrent || false}
                        onChange={(e) => handleUpdateWork(work.id, 'isCurrent', e.target.checked)}
                      />
                      Currently working here
                    </span>
                  </label>
                  <input
                    type="month"
                    class="form-input"
                    disabled={work.isCurrent}
                    value={work.isCurrent ? '' : (work.endDate || '')}
                    onChange={(e) => handleUpdateWork(work.id, 'endDate', e.target.value)}
                  />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Location (City, State / Remote)</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="e.g. San Francisco, CA"
                    value={work.location || ''}
                    onChange={(e) => handleUpdateWork(work.id, 'location', e.target.value)}
                  />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Technologies / Tools Used (comma separated)</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="React, TypeScript, Node.js, GCP, Docker"
                    value={Array.isArray(work.techStack) ? work.techStack.join(', ') : (work.techStack || '')}
                    onChange={(e) => handleTechStackChange(work.id, e.target.value)}
                  />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Key Accomplishments & Bullet Points</label>
                  {work.accomplishments?.map((acc, accIdx) => (
                    <div key={accIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        class="form-input"
                        placeholder="• Describe key impact, metrics achieved, or projects delivered..."
                        value={acc}
                        onChange={(e) => handleAccomplishmentChange(work.id, accIdx, e.target.value)}
                      />
                      <button
                        class="btn btn-secondary btn-sm"
                        onClick={() => handleRemoveAccomplishment(work.id, accIdx)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}

                  <button
                    class="btn btn-outline btn-sm"
                    style={{ marginTop: '0.4rem', alignSelf: 'flex-start' }}
                    onClick={() => handleAddAccomplishment(work.id)}
                  >
                    <Plus size={12} /> Add Accomplishment Bullet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
