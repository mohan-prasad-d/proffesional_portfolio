export const profile = {
  name: 'Mohan Prasad D',
  tagline: 'Full-Stack Developer & AI Systems Engineer',
  banner: 'B.Tech IT Student @ KGiSL Institute of Technology  |  Founder & Lead @ Skill Developer Community',
  location: 'Coimbatore, Tamil Nadu, India',
  photoUrl: 'https://i.postimg.cc/Zn6PRbv1/mohanprasadd.png',
  github: 'https://github.com/mohan-prasad-d',
  githubHandle: 'mohan-prasad-d',
  linkedin: 'https://linkedin.com/in/mohan-prasad-d-701931377',
  email: 'mohanprasad.dev@gmail.com',
  stats: [
    { label: 'Founder @ Skill Developer Community', icon: 'Users' },
    { label: 'AI, Computer Vision & Web Systems Specialist', icon: 'Cpu' },
    { label: 'Coimbatore, Tamil Nadu, India', icon: 'MapPin' },
  ],
};

export const skillCategories = [
  {
    title: 'Programming Languages',
    accent: 'cyan',
    icon: 'Code2',
    skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'C', 'C++', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    title: 'Web & Frontend Frameworks',
    accent: 'violet',
    icon: 'Layout',
    skills: ['React 18', 'Vite', 'Tailwind CSS', 'Glassmorphism UI Design', 'Responsive Web Design'],
  },
  {
    title: 'Backend & Database Architecture',
    accent: 'emerald',
    icon: 'Server',
    skills: ['Node.js', 'Express.js', 'Flask', 'RESTful APIs', 'MySQL'],
  },
  {
    title: 'Artificial Intelligence & Vision',
    accent: 'cyan',
    icon: 'BrainCircuit',
    skills: ['NumPy Neural Networks', 'Machine Learning', 'Computer Vision', 'OpenCV', 'YOLOv8'],
  },
  {
    title: 'Tooling & Infrastructure',
    accent: 'violet',
    icon: 'Wrench',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Linux (WSL Ubuntu)', 'Terraform', 'n8n', 'ngrok', 'VS Code (OpenCode AI & Figma MCP)'],
  },
];

export const leadership = {
  title: 'Skill Developer Community',
  role: 'Founder & Lead',
  org: 'KGiSL Institute of Technology',
  description:
    'Founded and lead a student developer initiative focused on hands-on engineering growth. Run Git & GitHub workflow sessions, problem-solving bootcamps, and technical peer mentorship — helping peers move from first commit to shipping real projects.',
  pillars: [
    { icon: 'GitBranch', label: 'Git & GitHub Workflows', detail: 'Hands-on version-control sessions' },
    { icon: 'Dumbbell', label: 'Problem-Solving Bootcamps', detail: 'DSA & algorithm practice' },
    { icon: 'GraduationCap', label: 'Technical Peer Mentorship', detail: '1:1 & group guidance' },
  ],
};

export type ProjectCategory = 'All' | 'Web Apps' | 'AI & Computer Vision' | 'Tools';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory[];
  repo?: string;
  metrics?: { label: string; value: string }[];
  icon: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Drowsiness Detection System',
    description:
      'Real-time computer vision application designed to monitor driver fatigue and detect drowsiness using facial landmarks and active eye-tracking analytics.',
    tech: ['Python', 'OpenCV', 'Machine Learning', 'Computer Vision'],
    category: ['AI & Computer Vision'],
    repo: 'https://github.com/mohan-prasad-d/Drowsiness-Detection',
    metrics: [
      { label: 'Domain', value: 'Safety CV' },
      { label: 'Method', value: 'Eye-Tracking' },
    ],
    icon: 'Eye',
  },
  {
    id: 2,
    title: 'Plant Disease Detector AI',
    description:
      'Intelligent computer-vision system capable of diagnosing crop and plant health risks automatically through advanced image analysis and ML models.',
    tech: ['Python', 'Machine Learning', 'Computer Vision'],
    category: ['AI & Computer Vision'],
    repo: 'https://github.com/mohan-prasad-d/Plant-disease-detector--AI',
    metrics: [
      { label: 'Domain', value: 'Agri-AI' },
      { label: 'Output', value: 'Diagnosis' },
    ],
    icon: 'Leaf',
  },
  {
    id: 3,
    title: 'PyExpo 2K26 Showcase (Team PY26007)',
    description:
      'Official project submission for PyExpo 2026, leveraging Python-based technologies for innovative problem-solving and rapid prototype development.',
    tech: ['Python', 'AI/Backend Integration'],
    category: ['AI & Computer Vision', 'Web Apps'],
    repo: 'https://github.com/PyExpo2K26/PY26007',
    metrics: [
      { label: 'Event', value: 'PyExpo 2026' },
      { label: 'Team', value: 'PY26007' },
    ],
    icon: 'Trophy',
  },
  {
    id: 4,
    title: 'Melos Music Player',
    description:
      'Modern music streaming application with advanced playback controls, custom playlist management, smart search functionality, and YouTube integration.',
    tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: ['Web Apps'],
    metrics: [
      { label: 'Platform', value: 'Web' },
      { label: 'Integration', value: 'YouTube' },
    ],
    icon: 'Music',
  },
  {
    id: 5,
    title: 'Rathika Elegance',
    description:
      'Premium client freelance landing ecosystem designed to streamline digital workflows and deliver high-performance responsive presentation.',
    tech: ['TypeScript', 'Modern CSS Frameworks', 'Vite'],
    category: ['Web Apps'],
    metrics: [
      { label: 'Type', value: 'Freelance' },
      { label: 'Focus', value: 'Landing' },
    ],
    icon: 'Gem',
  },
  {
    id: 6,
    title: 'CRM App',
    description:
      'Efficient Customer Relationship Management System built to track business workflows, customer leads, and pipeline analytics.',
    tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
    category: ['Web Apps'],
    metrics: [
      { label: 'Stack', value: 'Full-Stack' },
      { label: 'DB', value: 'MySQL' },
    ],
    icon: 'Contact',
  },
  {
    id: 7,
    title: 'Attendance System',
    description:
      'Smart tracking & analytics dashboard for institutional management featuring real-time automated attendance logging and exportable reporting.',
    tech: ['Flask', 'Python', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    category: ['Web Apps'],
    metrics: [
      { label: 'Backend', value: 'Flask' },
      { label: 'Feature', value: 'Live Log' },
    ],
    icon: 'ClipboardCheck',
  },
  {
    id: 8,
    title: 'Student Performance Predictor (Pure NumPy)',
    description:
      'Multi-layer perceptron neural network constructed from scratch using pure NumPy (manual forward/backpropagation implementation) connected to a Tkinter GUI.',
    tech: ['Python', 'NumPy', 'Tkinter'],
    category: ['Tools'],
    metrics: [
      { label: 'Engine', value: 'Pure NumPy' },
      { label: 'Math', value: 'Manual BP' },
    ],
    icon: 'Calculator',
  },
  {
    id: 9,
    title: 'Thirukkural REST API App',
    description:
      'Full-stack web application that dynamically fetches, parses, and presents classical Thirukkural verses via external REST APIs inside an animated glassmorphic UI.',
    tech: ['Flask', 'Python', 'Glassmorphism CSS', 'HTML5'],
    category: ['Web Apps'],
    metrics: [
      { label: 'API', value: 'REST' },
      { label: 'UI', value: 'Glass' },
    ],
    icon: 'ScrollText',
  },
];

export const githubProfile = {
  handle: 'mohan-prasad-d',
  url: 'https://github.com/mohan-prasad-d',
  metrics: [
    { label: 'Public Repos', value: 9, icon: 'FolderGit2' },
    { label: 'Followers', value: 12, icon: 'Users' },
    { label: 'Contributions', value: 120, icon: 'Activity' },
  ],
};

// Curated starred repos (representative of the user's starred/curated tech stack)
export const starredRepos = [
  {
    name: 'framer/motion',
    description: 'Open-source, production-ready motion library for React.',
    lang: 'TypeScript',
    stars: '24k',
    url: 'https://github.com/framer/motion',
  },
  {
    name: 'ultralytics/ultralytics',
    description: 'YOLOv8 — state-of-the-art object detection & vision models.',
    lang: 'Python',
    stars: '32k',
    url: 'https://github.com/ultralytics/ultralytics',
  },
  {
    name: 'opencv/opencv',
    description: 'Open Source Computer Vision Library.',
    lang: 'C++',
    stars: '78k',
    url: 'https://github.com/opencv/opencv',
  },
  {
    name: 'vitejs/vite',
    description: 'Next generation frontend tooling. Fast, lean.',
    lang: 'TypeScript',
    stars: '68k',
    url: 'https://github.com/vitejs/vite',
  },
  {
    name: 'tailwindlabs/tailwindcss',
    description: 'A utility-first CSS framework for rapid UI development.',
    lang: 'JavaScript',
    stars: '80k',
    url: 'https://github.com/tailwindlabs/tailwindcss',
  },
  {
    name: 'nodejs/node',
    description: 'Node.js JavaScript runtime built on V8.',
    lang: 'JavaScript',
    stars: '105k',
    url: 'https://github.com/nodejs/node',
  },
];
