import React from 'react';
import { FolderGit2, Plus, Trash2, ExternalLink, Github } from 'lucide-react';

export default function ProjectsSection({ projects = [], onChange }) {
  const handleAddProject = () => {
    onChange([
      ...projects,
      { id: `proj-${Date.now()}`, title: '', description: '', liveLink: '', repoUrl: '', techUsed: [] }
    ]);
  };

  const handleRemoveProject = (id) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const handleUpdateProject = (id, field, value) => {
    onChange(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div class="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FolderGit2 size={18} style={{ color: 'var(--accent-primary)' }} />
            Key Projects & Open Source Contributions
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Highlight personal projects, portfolio apps, or open-source repositories.
          </p>
        </div>

        <button class="btn btn-secondary btn-sm" onClick={handleAddProject}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>No projects added yet.</p>
          <button class="btn btn-outline btn-sm" onClick={handleAddProject}>
            <Plus size={14} /> Add Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projects.map((proj, idx) => (
            <div key={proj.id} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span class="tag tag-primary">Project #{idx + 1}</span>
                <button class="btn btn-danger btn-sm" onClick={() => handleRemoveProject(proj.id)}>
                  <Trash2 size={12} />
                </button>
              </div>

              <div class="form-grid">
                <div class="form-group full-width">
                  <label class="form-label">Project Title</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="e.g. OmniFlow AI Canvas"
                    value={proj.title || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    class="form-input"
                    placeholder="https://github.com/user/repo"
                    value={proj.repoUrl || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'repoUrl', e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Live Demo / Product URL</label>
                  <input
                    type="url"
                    class="form-input"
                    placeholder="https://my-app.com"
                    value={proj.liveLink || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'liveLink', e.target.value)}
                  />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Description & Highlights</label>
                  <textarea
                    class="form-textarea"
                    placeholder="Describe what the project does, key technical architecture, and impact..."
                    value={proj.description || ''}
                    onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
