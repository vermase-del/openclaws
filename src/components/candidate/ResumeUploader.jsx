import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export default function ResumeUploader({ onResumeExtracted }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractionResult, setExtractionResult] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (!file) return;
    setUploadedFile(file);
    setIsParsing(true);
    setExtractionResult(null);

    // Simulate AI parsing delay & extraction confidence
    setTimeout(() => {
      setIsParsing(false);
      const extractedData = {
        fullName: "Samantha Reed",
        title: "Senior Full Stack & Cloud Developer",
        email: "samantha.reed@example.com",
        phone: "+1 (555) 912-3049",
        location: "Seattle, WA",
        linkedinUrl: "https://linkedin.com/in/samantha-reed-dev",
        githubUrl: "https://github.com/sreed-dev",
        summary: "Results-driven Senior Full Stack Developer with 6+ years of experience architecting cloud applications using React, Node.js, and AWS/GCP.",
        workExperience: [
          {
            id: "work-ext-1",
            company: "CloudScale Technologies",
            role: "Senior Software Engineer",
            startDate: "2022-03",
            endDate: "Present",
            isCurrent: true,
            location: "Seattle, WA",
            techStack: ["React", "TypeScript", "Node.js", "Docker", "GCP"],
            accomplishments: [
              "Engineered micro-frontend architecture improving load latency by 45%.",
              "Spearheaded cloud migration of key billing platform handling $20M+ annual revenue."
            ]
          },
          {
            id: "work-ext-2",
            company: "PixelCraft Solutions",
            role: "Frontend Developer",
            startDate: "2019-06",
            endDate: "2022-02",
            isCurrent: false,
            location: "Seattle, WA",
            techStack: ["React", "JavaScript", "REST APIs", "CSS3"],
            accomplishments: [
              "Designed 15+ responsive web UI portals with accessibility compliance (WCAG AA)."
            ]
          }
        ],
        education: [
          {
            id: "edu-ext-1",
            institution: "University of Washington",
            degree: "B.S. in Computer Science",
            fieldOfStudy: "Software Engineering",
            graduationYear: "2019",
            gpa: "3.85"
          }
        ],
        skills: [
          { name: "React / Next.js", level: 5, category: "Technical" },
          { name: "TypeScript", level: 5, category: "Technical" },
          { name: "Node.js", level: 4, category: "Technical" },
          { name: "Google Cloud Platform", level: 4, category: "Technical" },
          { name: "Docker & K8s", level: 3, category: "Technical" }
        ],
        atsConfidence: 96
      };

      setExtractionResult(extractedData);
      if (onResumeExtracted) {
        onResumeExtracted(extractedData);
      }
    }, 1800);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div class="glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
            AI Smart Resume Upload & Parsing
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            Upload your resume (PDF or DOCX) to automatically extract personal details, work history, and skills.
          </p>
        </div>

        {extractionResult && (
          <span class="tag tag-emerald">
            <CheckCircle2 size={12} /> AI Extraction Complete ({extractionResult.atsConfidence}% confidence)
          </span>
        )}
      </div>

      {!uploadedFile && !isParsing && (
        <div
          class={`dropzone ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('resume-file-input').click()}
        >
          <input
            id="resume-file-input"
            type="file"
            accept=".pdf,.docx,.doc"
            style={{ display: 'none' }}
            onChange={handleFileInput}
          />
          <div class="dropzone-icon">
            <UploadCloud size={28} />
          </div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
            Drag & drop your resume here, or <span style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>browse</span>
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Supports PDF, DOCX (Max size: 10MB)
          </p>
        </div>
      )}

      {isParsing && (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)', marginBottom: '1rem' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Analyzing Resume Structure with TalentLens AI...</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Extracting contact info, work history, education history, and mapping technical skills...
          </p>
        </div>
      )}

      {uploadedFile && !isParsing && extractionResult && (
        <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{uploadedFile.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {(uploadedFile.size / 1024).toFixed(1)} KB • Extracted {extractionResult.workExperience.length} positions & {extractionResult.skills.length} skills
                </div>
              </div>
            </div>

            <button
              class="btn btn-secondary btn-sm"
              onClick={() => {
                setUploadedFile(null);
                setExtractionResult(null);
              }}
            >
              <RefreshCw size={14} /> Re-upload
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={14} />
            Form fields below have been pre-populated! You can review and edit any details before submitting.
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
