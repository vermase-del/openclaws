import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import PersonalInfoSection from './PersonalInfoSection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSkillsSection from './EducationSkillsSection';
import ProjectsSection from './ProjectsSection';
import ScreeningQuestionsSection from './ScreeningQuestionsSection';
import CompletenessWidget from './CompletenessWidget';
import { ArrowLeft, ArrowRight, CheckCircle, Save, Sparkles } from 'lucide-react';

export default function CandidatePortal({ onCandidateSubmitted }) {
  const [activeStep, setActiveStep] = useState(1);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'Samantha Reed',
    title: 'Senior Full Stack & Cloud Developer',
    email: 'samantha.reed@example.com',
    phone: '+1 (555) 912-3049',
    location: 'Seattle, WA',
    portfolioUrl: 'https://samanthareed.dev',
    linkedinUrl: 'https://linkedin.com/in/samantha-reed-dev',
    githubUrl: 'https://github.com/sreed-dev',
    preferredMode: 'Remote',
    noticePeriod: '2 Weeks',
    currentSalary: '$160,000',
    desiredSalary: '$180,000',
    workAuthorization: 'US Citizen',
    summary: 'Results-driven Senior Full Stack Developer with 6+ years of experience architecting cloud applications using React, Node.js, and GCP/AWS microservices.',
    workExperience: [
      {
        id: 'work-ext-1',
        company: 'CloudScale Technologies',
        role: 'Senior Software Engineer',
        startDate: '2022-03',
        endDate: 'Present',
        isCurrent: true,
        location: 'Seattle, WA',
        techStack: ['React', 'TypeScript', 'Node.js', 'Docker', 'GCP'],
        accomplishments: [
          'Engineered micro-frontend architecture improving load latency by 45%.',
          'Spearheaded cloud migration of key billing platform handling $20M+ annual revenue.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-ext-1',
        institution: 'University of Washington',
        degree: 'B.S. in Computer Science',
        fieldOfStudy: 'Software Engineering',
        graduationYear: '2019',
        gpa: '3.85'
      }
    ],
    certifications: [
      { id: 'cert-1', name: 'Google Cloud Certified Professional Cloud Architect', year: '2023' }
    ],
    skills: [
      { name: 'React / Next.js', level: 5, category: 'Technical' },
      { name: 'TypeScript', level: 5, category: 'Technical' },
      { name: 'Node.js', level: 4, category: 'Technical' },
      { name: 'GCP BigQuery & Cloud Run', level: 4, category: 'Technical' },
      { name: 'Docker & Kubernetes', level: 3, category: 'Technical' }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'HyperLog Analytics Engine',
        description: 'High-speed event processing system built in React & Rust Wasm.',
        repoUrl: 'https://github.com/sreed-dev/hyperlog',
        liveLink: 'https://hyperlog.io'
      }
    ],
    screeningAnswers: {
      noticePeriod: '2 weeks after written offer.',
      relocation: 'Open to remote work or occasional travel to headquarters.',
      technicalChallenge: 'Refactored an async queue worker to prevent memory spikes under high payload bursts.',
      motivation: 'Excited by high-impact cloud architecture and product innovation.'
    }
  });

  const steps = [
    { number: 1, label: 'Resume Upload' },
    { number: 2, label: 'Personal Info' },
    { number: 3, label: 'Work History' },
    { number: 4, label: 'Education & Skills' },
    { number: 5, label: 'Projects & Q&A' }
  ];

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeExtracted = (extractedData) => {
    setFormData(prev => ({
      ...prev,
      ...extractedData
    }));
  };

  const handleSubmitProfile = () => {
    const newCandidate = {
      id: `cand-${Date.now()}`,
      ...formData,
      status: 'New / Screened',
      recruiterRating: 0,
      recruiterNotes: 'Newly submitted profile via candidate intake portal.',
      submittedAt: new Date().toISOString(),
      atsScore: {
        overallMatch: Math.min(96, Math.max(75, Math.floor(Math.random() * 15) + 82)),
        skillMatch: 92,
        experienceMatch: 88,
        educationMatch: 90,
        stabilityScore: 94
      },
      aiInsights: {
        summary: "Extracted candidate profile from talent intake portal. Strong full stack skills with demonstrated cloud experience.",
        strengths: [
          `${formData.fullName} brings ${formData.workExperience?.length || 1}+ position(s) of relevant software engineering background.`,
          `Possesses skills in ${formData.skills?.map(s => s.name).slice(0, 3).join(', ') || 'modern stacks'}.`
        ],
        risks: [
          "Needs phone screen to verify salary expectations and notice period alignment."
        ],
        suggestedQuestions: [
          "Can you walk us through your most recent software architecture accomplishment?",
          "What is your target timeline for making a transition?"
        ]
      }
    };

    setSubmittedSuccess(true);
    if (onCandidateSubmitted) {
      onCandidateSubmitted(newCandidate);
    }
  };

  if (submittedSuccess) {
    return (
      <div style={{ maxWidth: '640px', margin: '3rem auto', textAlign: 'center' }} class="glass-card">
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <CheckCircle size={36} />
        </div>

        <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Application Submitted Successfully!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Thank you, <strong style={{ color: 'var(--text-primary)' }}>{formData.fullName}</strong>. Your profile details and resume have been securely submitted to the hiring team at TalentLens AI.
        </p>

        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Candidate ID:</span>
            <span style={{ fontWeight: '700' }}>TL-2026-SR9</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Status:</span>
            <span class="tag tag-emerald">Submitted & AI Screened</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Target Position:</span>
            <span>{formData.title}</span>
          </div>
        </div>

        <button
          class="btn btn-primary"
          onClick={() => {
            setSubmittedSuccess(false);
            setActiveStep(1);
          }}
        >
          Submit Another Profile
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Wizard Header Steps */}
      <div class="step-navigation">
        {steps.map(step => (
          <div
            key={step.number}
            class={`step-item ${activeStep === step.number ? 'active' : activeStep > step.number ? 'completed' : ''}`}
            onClick={() => setActiveStep(step.number)}
          >
            <div class="step-number">
              {activeStep > step.number ? <CheckCircle size={16} /> : step.number}
            </div>
            <span class="step-label">{step.label}</span>
          </div>
        ))}
      </div>

      <div class="portal-container">
        {/* Step Content Main Column */}
        <div>
          {activeStep === 1 && (
            <div>
              <ResumeUploader onResumeExtracted={handleResumeExtracted} />
              <PersonalInfoSection formData={formData} onChange={handleFieldChange} />
            </div>
          )}

          {activeStep === 2 && (
            <PersonalInfoSection formData={formData} onChange={handleFieldChange} />
          )}

          {activeStep === 3 && (
            <WorkExperienceSection
              workExperience={formData.workExperience}
              onChange={(newWork) => handleFieldChange('workExperience', newWork)}
            />
          )}

          {activeStep === 4 && (
            <EducationSkillsSection
              education={formData.education}
              skills={formData.skills}
              certifications={formData.certifications}
              onEducationChange={(edu) => handleFieldChange('education', edu)}
              onSkillsChange={(sk) => handleFieldChange('skills', sk)}
              onCertificationsChange={(cert) => handleFieldChange('certifications', cert)}
            />
          )}

          {activeStep === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <ProjectsSection
                projects={formData.projects}
                onChange={(proj) => handleFieldChange('projects', proj)}
              />
              <ScreeningQuestionsSection
                answers={formData.screeningAnswers}
                onChange={(ans) => handleFieldChange('screeningAnswers', ans)}
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button
              class="btn btn-secondary"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(prev => prev - 1)}
            >
              <ArrowLeft size={16} /> Previous Step
            </button>

            {activeStep < 5 ? (
              <button
                class="btn btn-primary"
                onClick={() => setActiveStep(prev => prev + 1)}
              >
                Next Step <ArrowRight size={16} />
              </button>
            ) : (
              <button
                class="btn btn-primary"
                style={{ background: 'var(--accent-emerald)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                onClick={handleSubmitProfile}
              >
                <Sparkles size={16} /> Complete & Submit Candidate Profile
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Completeness Gauge */}
        <div>
          <CompletenessWidget formData={formData} />
        </div>
      </div>
    </div>
  );
}
