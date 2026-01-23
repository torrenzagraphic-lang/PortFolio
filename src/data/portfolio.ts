export type Skill = {
  name: string;
  icon: "react" | "reactnative" | "js" | "ts" | "node" | "mongo" | "firebase" | "tailwind" | "git" | "three";
};

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  github?: string;
  highlights?: string[];
};

export const profile = {
  name: "Jain Darshan",
  headline: "React & React Native Developer",
  subhead:
    "I build fast, elegant products with premium UI polish—web, mobile, and interactive 3D.",
  location: "Remote",
  availability: "Available for full-time & contract",
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:dj631125@gmail.com",
  },
} as const;

export const skills: Skill[] = [
  { name: "React", icon: "react" },
  { name: "React Native", icon: "reactnative" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "Node.js", icon: "node" },
  { name: "MongoDB", icon: "mongo" },
  { name: "Firebase", icon: "firebase" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Git", icon: "git" },
  { name: "Three.js", icon: "three" },
];

export const experience: ExperienceItem[] = [
  {
    company: "Torrenza Mould Craft Pvt Ltd. — Ahmedabad, Gujarat",
    role: "Jr MERN Stack Developer",
    duration: "June 2024 — Present",
    achievements: [
      "Developed and maintained dynamic web applications using the MERN stack.",
      "Designed RESTful APIs for data retrieval and manipulation, ensuring seamless communication between frontend and backend.",
      "Collaborated with UX/UI designers to create responsive and user-friendly interfaces.",
      "Implemented state management using Redux to optimize application performance.",
      "Utilized MongoDB for database management, ensuring efficient data storage and retrieval.",
      "Deployed applications on AWS and Heroku, managing CI/CD pipelines with Jenkins and Docker.",
      "Participated in code reviews and contributed to team knowledge sharing.",
    ],
  },
  {
    company: "Royal Technosoft — Ahmedabad, Gujarat",
    role: "Full Stack Developer Intern",
    duration: "Jan 2024 — May 2024",
    achievements: [
      "Developed full-stack applications with a focus on frontend and backend integration using the MERN stack.",
      "Designed and implemented user authentication and authorization mechanisms.",
      "Created reusable components and libraries to streamline development processes.",
      "Conducted performance testing and optimization for enhanced application speed and efficiency.",
      "Collaborated with cross-functional teams in an Agile environment to deliver high-quality software solutions.",
      "Managed version control using Git and GitHub, ensuring codebase integrity and smooth collaboration.",
    ],
  },
  {
    company: "InfoLabz — Ahmedabad, Gujarat",
    role: "Frontend Developer Intern",
    duration: "Aug 2023 — Dec 2023",
    achievements: [
      "Assisted in developing and maintaining the frontend of web applications using React.js and Redux.",
      "Collaborated with designers to ensure the technical feasibility of UI/UX designs.",
      "Implemented responsive design techniques to ensure the application works across various devices and browsers.",
      "Optimized components for maximum performance across a vast array of web-capable devices and browsers.",
      "Participated in daily stand-ups and bi-weekly sprints.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Anime-Gallery",
    description:
      "Anime browser with infinite scrolling and lazy loading powered by the Shikamori API.",
    tech: ["Next.js", "Infinite Scroll", "Lazy Loading", "Shikamori API"],
    href: "https://ainme-info-dj-dev.vercel.app/",
    highlights: [
      "Implemented infinite scrolling for seamless content loading",
      "Integrated Shikamori API for real-time anime data",
      "Responsive UI for smooth browsing",
      "Optimized performance for fast retrieval and navigation",
    ],
  },
  {
    title: "Snap-Code",
    description:
      "Multi-language code editor with snippet gallery and shareable links.",
    tech: ["React", "TypeScript"],
    href: "https://snap-code-psi.vercel.app/",
    highlights: [
      "Multi-language editor (Python, Java, C, C++, JavaScript)",
      "Save snippets to a personal gallery",
      "Share snippets via unique links",
      "User-friendly UI with syntax highlighting and error checking",
      "Mobile responsive and cross-browser compatible",
    ],
  },
  {
    title: "Portfolio",
    description:
      "Personal portfolio showcasing skills, projects, and a contact form with smooth motion.",
    tech: ["React", "EmailJS", "Framer Motion"],
    href: "https://dj-dev-portfolioo.web.app/",
    highlights: [
      "Showcases skills, projects, and contact information",
      "EmailJS-powered contact form",
      "Framer Motion animations for a polished experience",
      "Responsive layout across devices",
    ],
  },
  {
    title: "To-Do App with Firebase",
    description:
      "To-do app with Google authentication and real-time task sync using Firebase.",
    tech: ["React", "Firebase Auth", "Firebase Realtime Database"],
    href: "https://to-do-with-google.vercel.app/login",
    highlights: [
      "Google authentication via Firebase Authentication",
      "Realtime Database for live task updates",
      "Add / update / delete tasks with a clean UI",
      "Realtime sync across devices",
      "Firebase security rules to protect user data",
    ],
  },
  {
  title: "MoldTrack Pro",
  description:
    "A production and mold management dashboard for tracking molds, inventory, job status, and real-time operational insights.",
  tech: ["React", "TypeScript", "JavaScript", "Tailwind CSS"],
  href: "https://moldmaster-hub.vercel.app/",
  highlights: [
    "Real-time dashboard for mold tracking and production monitoring",
    "Responsive UI built with Tailwind CSS",
    "Modular React architecture for scalability",
    "Optimized performance with TypeScript safety",
    "User-friendly interface for operations and reporting",
  ],
},
];
