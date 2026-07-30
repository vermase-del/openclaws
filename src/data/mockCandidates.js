export const MOCK_CANDIDATES = [
  {
    id: "cand-101",
    fullName: "Elena Rostova",
    title: "Senior Full Stack Engineer & Cloud Architect",
    email: "elena.rostova@example.com",
    phone: "+1 (555) 382-9102",
    location: "San Francisco, CA (Open to Remote)",
    portfolioUrl: "https://elena-dev.io",
    linkedinUrl: "https://linkedin.com/in/elena-rostova",
    githubUrl: "https://github.com/elena-rostova",
    preferredMode: "Remote",
    noticePeriod: "2 Weeks",
    currentSalary: "$165,000",
    desiredSalary: "$185,000",
    workAuthorization: "US Citizen",
    status: "Shortlisted",
    recruiterRating: 5,
    recruiterNotes: "Exceptional candidate with strong system architecture background. Demonstrated leadership in previous enterprise projects.",
    submittedAt: "2026-07-28T14:30:00Z",

    summary: "Passionate Full Stack Engineer with 7+ years of experience engineering high-scale React, Node.js, and GCP microservices. Proven track record of improving cloud performance by 40% while reducing infrastructure costs.",

    atsScore: {
      overallMatch: 94,
      skillMatch: 96,
      experienceMatch: 92,
      educationMatch: 90,
      stabilityScore: 95
    },

    aiInsights: {
      summary: "High-probability top performer. Holds deep expertise in modern cloud architectures, scalable frontend designs, and CI/CD pipelines.",
      strengths: [
        "7+ years full-stack experience in React, TypeScript, Node.js & GCP",
        "Proven experience scaling systems to 1M+ daily active users",
        "Active open-source contributor with 2k+ GitHub stars"
      ],
      risks: [
        "Desired salary is slightly above mid-band ($185k vs $175k target)"
      ],
      suggestedQuestions: [
        "Can you describe how you managed the migration of your monolith service to GCP microservices?",
        "What strategies do you use for zero-downtime frontend deployments?"
      ]
    },

    workExperience: [
      {
        id: "work-1",
        company: "Apex Cloud Innovations",
        role: "Lead Full Stack Engineer",
        startDate: "2023-01",
        endDate: "Present",
        isCurrent: true,
        location: "San Francisco, CA",
        techStack: ["React", "TypeScript", "Node.js", "BigQuery", "GCP", "Docker"],
        accomplishments: [
          "Architected real-time telemetry dashboard handling 50k events/sec using WebSockets and GCP BigQuery.",
          "Mentored a team of 6 engineers and established standardized code review guidelines.",
          "Reduced page load time by 60% through aggressive bundle code splitting and SSR implementation."
        ]
      },
      {
        id: "work-2",
        company: "Vanguard Tech Solutions",
        role: "Senior Frontend Engineer",
        startDate: "2020-04",
        endDate: "2022-12",
        isCurrent: false,
        location: "San Jose, CA",
        techStack: ["React", "Redux Toolkit", "GraphQL", "Jest", "TailwindCSS"],
        accomplishments: [
          "Led redesign of flagship enterprise SaaS product resulting in a 35% increase in user retention.",
          "Implemented comprehensive unit and integration test suite with 92% code coverage."
        ]
      }
    ],

    education: [
      {
        id: "edu-1",
        institution: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        fieldOfStudy: "Computer Science",
        graduationYear: "2019",
        gpa: "3.88"
      }
    ],

    certifications: [
      { id: "cert-1", name: "Google Cloud Certified Professional Cloud Architect", year: "2024" },
      { id: "cert-2", name: "AWS Certified Developer – Associate", year: "2022" }
    ],

    skills: [
      { name: "React / Next.js", level: 5, category: "Technical" },
      { name: "TypeScript", level: 5, category: "Technical" },
      { name: "Node.js / Express", level: 4, category: "Technical" },
      { name: "Google Cloud Platform (GCP)", level: 4, category: "Technical" },
      { name: "PostgreSQL & BigQuery", level: 4, category: "Technical" },
      { name: "System Architecture", level: 5, category: "Domain" },
      { name: "Agile & Team Leadership", level: 4, category: "Soft Skills" }
    ],

    projects: [
      {
        id: "proj-1",
        title: "OmniFlow AI Canvas",
        description: "An open-source node-based visual editor for workflow orchestration built with React Flow.",
        liveLink: "https://omniflow-demo.io",
        repoUrl: "https://github.com/elena-rostova/omniflow",
        techUsed: ["React", "TypeScript", "Zustand", "Canvas API"]
      }
    ],

    screeningAnswers: {
      noticePeriod: "Available to start in 2 weeks after written offer.",
      relocation: "Not required as I am based locally in SF, but prefer hybrid or remote.",
      technicalChallenge: "I recently resolved a critical memory leak in a SSE (Server-Sent Events) pipeline by refactoring global event listeners into scoped weak references.",
      motivation: "Excited by TalentLens' vision of bringing transparent, fair, AI-assisted screening to candidate workflows."
    }
  },

  {
    id: "cand-102",
    fullName: "Marcus Vance",
    title: "AI & Machine Learning Engineer",
    email: "marcus.vance@example.com",
    phone: "+1 (555) 749-2041",
    location: "Austin, TX",
    portfolioUrl: "https://marcusvance.ai",
    linkedinUrl: "https://linkedin.com/in/marcus-vance",
    githubUrl: "https://github.com/marcus-vance-ai",
    preferredMode: "Hybrid",
    noticePeriod: "Immediate",
    currentSalary: "$155,000",
    desiredSalary: "$175,000",
    workAuthorization: "US Citizen",
    status: "Interview Scheduled",
    recruiterRating: 4,
    recruiterNotes: "Strong background in PyTorch, LLM fine-tuning, and RAG pipelines. Fits well for AI-driven feature development.",
    submittedAt: "2026-07-29T09:15:00Z",

    summary: "Machine Learning Engineer with 5 years specializing in Large Language Models (LLMs), retrieval-augmented generation (RAG), PyTorch, and BigQuery ML. Passionate about deploying production-grade AI models.",

    atsScore: {
      overallMatch: 88,
      skillMatch: 92,
      experienceMatch: 85,
      educationMatch: 95,
      stabilityScore: 82
    },

    aiInsights: {
      summary: "Solid AI/ML practitioner with hands-on RAG pipeline production experience. Highly relevant skill set for GenAI integrations.",
      strengths: [
        "Deep expertise in Python, PyTorch, LangChain, and Vector Databases (Pinecone/Chroma)",
        "Master's degree in Artificial Intelligence from UT Austin",
        "Direct experience deploying LLM fine-tuning models on GCP Vertex AI"
      ],
      risks: [
        "Less emphasis on traditional frontend web development (primarily Python / Fast API backend)"
      ],
      suggestedQuestions: [
        "How do you evaluate and prevent hallucinations in production RAG systems?",
        "Describe your experience with quantization and model distillation for low-latency inference."
      ]
    },

    workExperience: [
      {
        id: "work-101",
        company: "NeuralPulse Labs",
        role: "Senior AI Engineer",
        startDate: "2022-06",
        endDate: "Present",
        isCurrent: true,
        location: "Austin, TX",
        techStack: ["Python", "PyTorch", "FastAPI", "GCP Vertex AI", "LangChain", "Vector DBs"],
        accomplishments: [
          "Developed enterprise search RAG system indexing 5M+ technical documents with sub-200ms latency.",
          "Fine-tuned open-source LLMs (Llama 3, Mistral) reducing external API costs by $12,000/month."
        ]
      },
      {
        id: "work-102",
        company: "Cognitive Data Corp",
        role: "Data Scientist / ML Engineer",
        startDate: "2020-01",
        endDate: "2022-05",
        isCurrent: false,
        location: "Austin, TX",
        techStack: ["Python", "Scikit-Learn", "BigQuery ML", "Docker", "Airflow"],
        accomplishments: [
          "Built customer churn prediction model in BigQuery ML increasing retention campaign efficiency by 22%."
        ]
      }
    ],

    education: [
      {
        id: "edu-101",
        institution: "University of Texas at Austin",
        degree: "M.S. in Computer Science (Artificial Intelligence Focus)",
        fieldOfStudy: "Computer Science",
        graduationYear: "2020",
        gpa: "3.92"
      }
    ],

    certifications: [
      { id: "cert-101", name: "Google Cloud Certified Professional Machine Learning Engineer", year: "2023" }
    ],

    skills: [
      { name: "Python", level: 5, category: "Technical" },
      { name: "PyTorch & Transformers", level: 5, category: "Technical" },
      { name: "FastAPI / REST APIs", level: 4, category: "Technical" },
      { name: "Vector Search & RAG", level: 5, category: "Technical" },
      { name: "BigQuery ML", level: 4, category: "Technical" },
      { name: "Model Evaluation & MLOps", level: 4, category: "Domain" }
    ],

    projects: [
      {
        id: "proj-101",
        title: "DocuBrain RAG Engine",
        description: "Open-source RAG framework featuring intelligent chunking and hybrid dense/sparse retrieval.",
        liveLink: "https://docubrain-ai.org",
        repoUrl: "https://github.com/marcus-vance-ai/docubrain",
        techUsed: ["Python", "FastAPI", "Qdrant", "HuggingFace"]
      }
    ],

    screeningAnswers: {
      noticePeriod: "Available immediately.",
      relocation: "Open to hybrid work in Austin or remote.",
      technicalChallenge: "Optimized a vector embedding search bottleneck by implementing HNSW indexing and async request batching.",
      motivation: "Looking to work on cutting-edge generative AI products at scale."
    }
  },

  {
    id: "cand-103",
    fullName: "Aisha Patel",
    title: "Senior Product Manager & UX Strategist",
    email: "aisha.patel@example.com",
    phone: "+1 (555) 203-8891",
    location: "New York, NY",
    portfolioUrl: "https://aishapatel.design",
    linkedinUrl: "https://linkedin.com/in/aisha-patel-pm",
    githubUrl: "",
    preferredMode: "Hybrid",
    noticePeriod: "1 Month",
    currentSalary: "$170,000",
    desiredSalary: "$190,000",
    workAuthorization: "US Citizen",
    status: "Screened",
    recruiterRating: 4,
    recruiterNotes: "Great product intuition, strong analytical mindset, experience driving cross-functional engineering teams.",
    submittedAt: "2026-07-29T16:45:00Z",

    summary: "Product Leader with 8 years of experience building consumer and enterprise B2B SaaS solutions. Expert in customer discovery, data-driven feature prioritization, and AI product integration.",

    atsScore: {
      overallMatch: 82,
      skillMatch: 85,
      experienceMatch: 88,
      educationMatch: 80,
      stabilityScore: 90
    },

    aiInsights: {
      summary: "Experienced PM with strong metrics orientation and user-centric design approach. Strong alignment with product management requirements.",
      strengths: [
        "Proven lifecycle management for products generating $10M+ ARR",
        "Expertise in Mixpanel, Amplitude, SQL, Figma, and Agile frameworks",
        "Strong cross-functional leadership across UX, Engineering, and Marketing"
      ],
      risks: [
        "Non-technical CS background (B.A. in Economics & HCI), though highly technical in product execution"
      ],
      suggestedQuestions: [
        "How do you handle conflicting feature priorities between engineering debt and customer requests?",
        "Give an example of a product decision you made that failed and what you learned from it."
      ]
    },

    workExperience: [
      {
        id: "work-201",
        company: "Starlight SaaS Technologies",
        role: "Senior Product Manager",
        startDate: "2021-08",
        endDate: "Present",
        isCurrent: true,
        location: "New York, NY",
        techStack: ["Figma", "Mixpanel", "Jira", "SQL", "Optimizely"],
        accomplishments: [
          "Spearheaded launch of AI analytics assistant, driving 40% uptick in daily active users within 90 days.",
          "Managed roadmap across 3 agile squads (18 engineers & designers)."
        ]
      }
    ],

    education: [
      {
        id: "edu-201",
        institution: "Columbia University",
        degree: "B.A. in Economics & Human-Computer Interaction",
        fieldOfStudy: "Economics",
        graduationYear: "2018",
        gpa: "3.75"
      }
    ],

    certifications: [
      { id: "cert-201", name: "Certified Scrum Product Owner (CSPO)", year: "2021" }
    ],

    skills: [
      { name: "Product Strategy & Roadmap", level: 5, category: "Domain" },
      { name: "Data Analytics (SQL, Mixpanel)", level: 4, category: "Technical" },
      { name: "User Research & Prototyping", level: 5, category: "Domain" },
      { name: "Agile / Scrum Leadership", level: 5, category: "Soft Skills" }
    ],

    projects: [],

    screeningAnswers: {
      noticePeriod: "30 days notice required.",
      relocation: "Based in NY, interested in hybrid mode in NYC.",
      technicalChallenge: "Navigated complex data privacy regulations (GDPR) while building a global user analytics framework.",
      motivation: "Eager to lead product innovation in candidate screening and recruiting intelligence."
    }
  }
];
