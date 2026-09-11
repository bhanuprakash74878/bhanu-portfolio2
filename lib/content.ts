/**
 * SINGLE SOURCE OF TRUTH for all portfolio content.
 *
 * Every public section reads from this object, and the "Ask Bhanu" assistant is
 * grounded strictly in it. In a later phase this shape is what the private admin
 * dashboard (Neon + Better Auth + Blob) reads from and writes to, so nothing
 * here is hard-coded inside UI components.
 *
 * PLACEHOLDER RULE: where real information does not exist yet, arrays are left
 * empty and the UI shows a polished "coming soon" / fresher state. Never invent
 * skills, projects, experience, certifications, achievements, or URLs.
 */

export type SkillLevel = "learning" | "familiar" | "proficient" | "advanced"

export interface Skill {
  id: string
  name: string
  category: string
  level?: SkillLevel
  status?: "planned" | "learning" | "practicing" | "confident"
  note?: string
}

export interface LearningItem {
  id: string
  name: string
  description?: string
  progress?: number
  startDate?: string
  resources?: { label: string; url: string }[]
  status?: "planned" | "in-progress" | "paused" | "completed"
  notes?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  category?: string
  repoUrl?: string
  liveUrl?: string
  images?: string[]
  features?: string[]
  status?: "planned" | "in-progress" | "completed"
}

export interface TimelineEntry {
  id: string
  title: string
  organization?: string
  location?: string
  startDate?: string
  endDate?: string
  description?: string
  type?: "internship" | "work" | "freelance" | "research" | "contribution"
}

export interface EducationEntry {
  id: string
  institution: string
  degree?: string
  branch?: string
  specialization?: string
  startYear?: string
  endYear?: string
  status?: "current" | "completed" | "planned"
  coursework?: string[]
  achievements?: string[]
  note?: string
}

export interface Certification {
  id: string
  name: string
  issuer?: string
  date?: string
  credentialId?: string
  credentialUrl?: string
  image?: string
  skills?: string[]
}

export interface Achievement {
  id: string
  title: string
  description?: string
  date?: string
  organization?: string
  links?: { label: string; url: string }[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  available?: boolean
}

export interface Goal {
  id: string
  title: string
  description: string
  horizon: "short" | "mid" | "long"
}

export type SocialKey = "github" | "linkedin" | "instagram" | "twitter" | "youtube"

export interface PortfolioContent {
  profile: {
    name: string
    title: string
    tagline: string
    intro: string
    location: string
    email: string
    phone: string
    photoUrl: string | null
  }
  about: {
    paragraphs: string[]
    highlight: string
  }
  profileCard: {
    role: string
    education: string
    specialization: string
    level: string
  }
  social: Record<SocialKey, string>
  skillCategories: string[]
  skills: Skill[]
  currentlyLearning: LearningItem[]
  projects: Project[]
  projectCategories: string[]
  experience: TimelineEntry[]
  internshipJourney: TimelineEntry[]
  education: EducationEntry[]
  certifications: Certification[]
  achievements: Achievement[]
  services: Service[]
  goals: Goal[]
  resume: {
    url: string | null
    lastUpdated: string | null
  }
  seo: {
    title: string
    description: string
    canonical: string
    ogImage: string | null
  }
  /**
   * AI-only approved knowledge. Not rendered publicly, but the assistant may use
   * it to answer visitor questions. Owner-editable in the future admin area.
   */
  aiKnowledge: string[]
}

export const content: PortfolioContent = {
  profile: {
    name: "Puttam Bhanu Prakash",
    title: "Aspiring AI/ML Engineer",
    tagline: "Curiosity → Technology → Problem Solving → Continuous Learning",
    intro:
      "I am a CSE student specializing in Full Stack Development and Artificial Intelligence & Machine Learning, driven by curiosity, problem-solving, and the desire to continuously adapt to the rapidly evolving world of technology.",
    location: "Tirupati, Andhra Pradesh, India",
    email: "bhanuprakashputtam@gmail.com",
    phone: "9398979791",
    photoUrl:
      "https://avatars.githubusercontent.com/u/287155570?s=400&u=2a4dcd99f6ed549f68ab03d75dec6c85c6975b12&v=4",
  },
  about: {
    paragraphs: [
      "I am currently a fresher studying at SriCity International University, pursuing a B.Tech in Computer Science & Engineering with a specialization in Full Stack Development and AI/ML.",
      "My university offers internship opportunities from the very first year, and my aim is to graduate with more than two years of hands-on, practical experience built up over the course of my B.Tech. This is a goal I am actively working toward — not experience I already hold.",
      "I am genuinely curious about new technology and AI, and I enjoy breaking down and understanding different kinds of problems. I don't want to fall behind in such a fast-moving field, so I keep learning, experimenting, and adapting.",
    ],
    highlight:
      "Building practical experience from the very beginning of my B.Tech journey.",
  },
  profileCard: {
    role: "Aspiring AI/ML Engineer",
    education: "B.Tech — Computer Science & Engineering",
    specialization: "Full Stack Development + AI/ML",
    level: "Fresher",
  },
  // Empty string = link not yet provided; the UI hides these until set.
  social: {
    github: "https://github.com/bhanuprakash74878",
    linkedin: "https://www.linkedin.com/in/bhanu-prakash-puttam-955220411?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/itz_bhanu_277?stkn=Z2ZyOGRoYmQxY2Z3",
    twitter: "",
  },
  skillCategories: [
    "Programming Languages",
    "Frontend",
    "Backend",
    "AI / ML",
    "Databases",
    "Cloud",
    "DevOps",
    "Tools",
    "Other",
  ],
  // Intentionally empty — skills will be added as they are genuinely learned.
  skills: [],
  currentlyLearning: [],
  projects: [],
  projectCategories: ["Web", "Full Stack", "AI / ML", "Automation", "Other"],
  experience: [],
  internshipJourney: [],
  education: [
    {
      id: "edu-btech",
      institution: "SriCity International University",
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      specialization: "Full Stack Development and AI/ML",
      status: "current",
      note: "Internship opportunities available from the first year, forming the foundation of a practical, experience-first learning path.",
      coursework: [],
      achievements: [],
    },
    {
    id: "edu-intermediate",
    institution: "BVK Junior College",
    degree: "Intermediate / 12th",
    branch: "MPC",
    startYear: "2024",
    endYear: "2026",
    status: "completed",
    note: "Completed Intermediate education.",
    coursework: [],
    achievements: [],
  },
  {
    id: "edu-10th",
    institution: "JCR's Chaitanya E.M High School",
    degree: "10th / Secondary",
    startYear: "2023",
    endYear: "2024",
    status: "completed",
    note: "Completed secondary education.",
    coursework: [],
    achievements: [],
  },
  ],
  certifications: [],
  achievements: [],
  // Configurable — presented as focus areas, not as current professional offerings.
  services: [
    {
      id: "svc-web",
      title: "Web Development",
      description:
        "Exploring modern, responsive web interfaces as part of my Full Stack learning path.",
      icon: "layout",
      available: false,
    },
    {
      id: "svc-fullstack",
      title: "Full Stack Development",
      description:
        "Learning to connect front-end experiences with back-end systems end to end.",
      icon: "layers",
      available: false,
    },
    {
      id: "svc-aiml",
      title: "AI / ML",
      description:
        "Building foundations in machine learning, data, and intelligent applications.",
      icon: "brain",
      available: false,
    },
  ],
  goals: [
    {
      id: "goal-short",
      title: "Build strong fundamentals",
      description:
        "Establish solid programming and computer-science foundations while completing my first internships.",
      horizon: "short",
    },
    {
      id: "goal-mid",
      title: "2+ years of practical experience",
      description:
        "Accumulate more than two years of hands-on experience through university internships by the time I graduate.",
      horizon: "mid",
    },
    {
      id: "goal-long",
      title: "Become an AI/ML Engineer",
      description:
        "Grow into a capable AI/ML engineer who ships thoughtful, real-world intelligent systems.",
      horizon: "long",
    },
  ],
  resume: {
    url: null,
    lastUpdated: null,
  },
  seo: {
    title: "Puttam Bhanu Prakash | Aspiring AI/ML Engineer",
    description:
      "Puttam Bhanu Prakash — a CSE student at SriCity International University specializing in Full Stack Development and AI/ML, focused on curiosity, problem-solving, and continuous learning.",
    canonical: "",
    ogImage: null,
  },
  aiKnowledge: [
    "Bhanu is at the very start of his B.Tech journey and is honest about being a fresher. He has not completed any internships, projects, or certifications yet.",
    "When asked about experience or internships, clearly distinguish between current experience (none yet), planned experience (internships offered by his university from year one), and his goal (2+ years of practical experience by graduation).",
    "Bhanu's core motivation is continuous learning and not falling behind in a fast-moving technology landscape.",
  ],
}

export const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "services", label: "Services" },
  { id: "resume", label: "Resume" },
  { id: "learning", label: "Currently Learning" },
  { id: "goals", label: "Goals" },
  { id: "contact", label: "Contact" },
] as const

export const SOCIAL_META: Record<SocialKey, { label: string }> = {
  github: { label: "GitHub" },
  linkedin: { label: "LinkedIn" },
  instagram: { label: "Instagram" },
  twitter: { label: "X / Twitter" },
}
