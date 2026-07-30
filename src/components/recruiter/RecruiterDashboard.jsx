import React, { useState } from 'react';
import CandidateCard from './CandidateCard';
import CandidateDossierModal from './CandidateDossierModal';
import CandidateComparisonModal from './CandidateComparisonModal';
import { Search, Filter, LayoutGrid, List, Sparkles, Users, Award, CheckCircle2, Star, Layers } from 'lucide-react';

export default function RecruiterDashboard({ candidates = [], onUpdateCandidate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [minScoreFilter, setMinScoreFilter] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const [activeDossierCandidate, setActiveDossierCandidate] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filter candidates
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills?.some(s => (typeof s === 'string' ? s : s.name).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesScore = (c.atsScore?.overallMatch || 80) >= Number(minScoreFilter);

    return matchesSearch && matchesStatus && matchesScore;
  });

  // Calculate Metrics
  const totalCount = candidates.length;
  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const avgScore = totalCount > 0
    ? Math.round(candidates.reduce((acc, c) => acc + (c.atsScore?.overallMatch || 85), 0) / totalCount)
    : 0;
  const topMatch = candidates.length > 0
    ? Math.max(...candidates.map(c => c.atsScore?.overallMatch || 0))
    : 0;

  const toggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 candidates simultaneously.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const selectedCompareCandidates = candidates.filter(c => compareIds.includes(c.id));

  return (
    <div>
      {/* Executive KPI Stats Bar */}
      <div class="stats-grid">
        <div class="glass-card stat-card">
          <div class="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
            <Users size={24} />
          </div>
          <div>
            <div class="stat-value">{totalCount}</div>
            <div class="stat-label">Total Candidates Screened</div>
          </div>
        </div>

        <div class="glass-card stat-card">
          <div class="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <Award size={24} />
          </div>
          <div>
            <div class="stat-value">{topMatch}%</div>
            <div class="stat-label">Highest Candidate ATS Fit</div>
          </div>
        </div>

        <div class="glass-card stat-card">
          <div class="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <div class="stat-value">{avgScore}%</div>
            <div class="stat-label">Average Pipeline ATS Score</div>
          </div>
        </div>

        <div class="glass-card stat-card">
          <div class="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div class="stat-value">{shortlistedCount}</div>
            <div class="stat-label">Shortlisted Candidates</div>
          </div>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <div class="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div class="filter-bar">
          <div class="search-box">
            <Search size={16} class="search-icon" />
            <input
              type="text"
              class="form-input"
              placeholder="Search by candidate name, role, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              class="form-select"
              style={{ width: '160px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Screened">Screened</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              class="form-select"
              style={{ width: '170px' }}
              value={minScoreFilter}
              onChange={(e) => setMinScoreFilter(e.target.value)}
            >
              <option value={0}>Min Score: Any</option>
              <option value={80}>Min Score: 80%+</option>
              <option value={90}>Min Score: 90%+</option>
            </select>

            {/* Layout Mode Toggle */}
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <button
                class={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
                style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-sm)' }}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                class={`icon-btn ${viewMode === 'table' ? 'active' : ''}`}
                style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-sm)' }}
                onClick={() => setViewMode('table')}
                title="Table View"
              >
                <List size={16} />
              </button>
            </div>

            {/* Launch Compare Button */}
            {compareIds.length >= 2 && (
              <button class="btn btn-primary" onClick={() => setShowCompareModal(true)}>
                <Layers size={16} /> Compare ({compareIds.length})
              </button>
            )}
          </div>
        </div>

        {compareIds.length > 0 && (
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '0.5rem' }}>
            {compareIds.length} candidate(s) selected for side-by-side comparison. Click "Compare" when 2 or 3 are checked.
          </div>
        )}
      </div>

      {/* Candidate Grid or Table */}
      {filteredCandidates.length === 0 ? (
        <div class="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            No candidates matched your search filter criteria.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div class="candidate-grid">
          {filteredCandidates.map(c => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onViewDossier={(cand) => setActiveDossierCandidate(cand)}
              isSelectedForCompare={compareIds.includes(c.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div class="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table class="data-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Candidate Name</th>
                <th>Target Role</th>
                <th>Location</th>
                <th>ATS Fit Score</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(c => (
                <tr key={c.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={compareIds.includes(c.id)}
                      onChange={() => toggleCompare(c.id)}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: '700' }}>{c.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.email}</div>
                  </td>
                  <td>{c.title}</td>
                  <td>{c.location}</td>
                  <td>
                    <span style={{ fontWeight: '800', color: 'var(--accent-emerald)' }}>
                      {c.atsScore?.overallMatch || 85}%
                    </span>
                  </td>
                  <td>
                    <span class="tag tag-emerald">{c.status || 'Screened'}</span>
                  </td>
                  <td>
                    <div style={{ color: 'var(--accent-amber)', fontSize: '0.8rem' }}>
                      {'★'.repeat(c.recruiterRating || 0)}
                    </div>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onClick={() => setActiveDossierCandidate(c)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {activeDossierCandidate && (
        <CandidateDossierModal
          candidate={activeDossierCandidate}
          onClose={() => setActiveDossierCandidate(null)}
          onUpdateCandidate={onUpdateCandidate}
        />
      )}

      {showCompareModal && (
        <CandidateComparisonModal
          candidates={selectedCompareCandidates}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
}
