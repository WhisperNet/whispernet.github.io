import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Github,
  Mail,
  Download,
  Trophy,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { SiDevdotto } from 'react-icons/si';
import { SkillTree } from './components/SkillTree';
import { KudosButton } from './components/KudosButton';

import { ThemeToggle } from './components/ThemeToggle';
import { ProjectCarousel } from './components/ProjectCarousel';
import { BlogCarousel } from './components/BlogCarousel';
import { StarBackground } from './components/StarBackground';
import { Confetti } from './components/Confetti';
import { ImageViewer } from './components/ImageViewer';
import { ViewAll } from './pages/ViewAll';

// Achievement definitions
const ACHIEVEMENTS = {
  THEME_TOGGLE: {
    id: 'theme_toggle',
    title: 'Light & Dark',
    description: 'Explored both sides of the force',
  },
  ALL_SOCIALS: {
    id: 'all_socials',
    title: 'Social Butterfly',
    description: 'Checked out all social links',
  },
  RESUME: {
    id: 'resume',
    title: 'Paper Trail',
    description: 'Downloaded my resume',
  },
  KUDOS_FIRST: {
    id: 'kudos_first',
    title: 'First Impression',
    description: 'Left your first kudos',
  },
  KUDOS_ALL: {
    id: 'kudos_all',
    title: 'Emoji Master',
    description: 'Used all kudos reactions',
  },
  NIGHT_OWL: {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Visited between 12 AM and 5 AM',
  },
  SKILL_EXPLORER: {
    id: 'skill_explorer',
    title: 'Tech Curious',
    description: 'Explored the skill tree',
  },
  PROFILE_HOVER: {
    id: 'profile_hover',
    title: 'Curious Observer',
    description: 'Hovered over my profile for suspiciously long time',
  },
  VIEW_ALL_PROJECTS: {
    id: 'view_all_projects',
    title: 'Project Explorer',
    description: 'Viewed all projects',
  },
  VIEW_ALL_BLOGS: {
    id: 'view_all_blogs',
    title: 'Blog Reader',
    description: 'Viewed all blogs',
  },
};

// Export projects and blogs for use in ViewAll page
export const PROJECTS = [
  {
    title: 'SkillTrade: Real-Time, Microservices-Based Skill Exchange Platform',
    description:
      'An advanced, end-to-end skill exchange platform built on a microservices architecture. This system features five independent Node.js/TypeScript services that communicate asynchronously using NATS Streaming. The entire platform is containerized with Docker and orchestrated with Kubernetes, using Skaffold for a hot-reloading local dev workflow. It includes a Next.js/React frontend, Stripe for payments, and Agora SDK for real-time video conferencing.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Node.js',
      'TypeScript',
      'NATS Streaming',
      'Docker',
      'Kubernetes',
      'Skaffold',
      'Next.js',
      'React',
      'Stripe',
      'Agora SDK',
    ],
  },
  {
    title: 'NexusX: Open-Source, All-in-One DevSecOps Platform (Capstone)',
    description:
      '(In-Planning) A capstone project to build a complete, self-hostable DevSecOps platform. NexusX is designed to unify SAST (Semgrep), DAST (ZAP), and Container Scanning (Trivy) with a GitOps (ArgoCD) and IaC (Terraform) workflow. The architecture features a Go (Golang) backend, a Next.js frontend, a PostgreSQL database, and uses Jenkins as its core automation engine.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Go',
      'Next.js',
      'PostgreSQL',
      'Jenkins',
      'Semgrep',
      'ZAP',
      'Trivy',
      'ArgoCD',
      'Terraform',
    ],
  },
  {
    title: 'Greenlight: Production-Ready JSON API (Go)',
    description:
      'A feature-rich, "movies" JSON API built from scratch in Go. The project is designed for production with a full user system (registration, email activation, token-based auth), permission-based authorization, and a PostgreSQL database. It also features advanced API functionality like filtering, sorting, pagination, full-text search, optimistic concurrency control, rate limiting, and graceful shutdown. The API is deployed to a Linux server using Caddy as a reverse proxy.',
    link: 'https://github.com/whispernet',
    technologies: ['Go', 'PostgreSQL', 'Caddy'],
  },
  {
    title: 'End-to-End GitOps Pipeline with Argo CD (DevSecOps Capstone)',
    description:
      'A fully automated GitOps CI/CD pipeline. A GitLab CI pipeline builds, tests, and scans a microservice. On success, it automatically updates a Kustomize configuration in a Git repository, which Argo CD then detects and automatically deploys the new application version to the Kubernetes (EKS) cluster.',
    link: 'https://github.com/whispernet',
    technologies: ['GitLab CI', 'Kustomize', 'Argo CD', 'Kubernetes', 'EKS'],
  },
  {
    title: 'Automated CI/CD Pipeline for Kubernetes (DevOps Capstone)',
    description:
      'A sophisticated CI/CD pipeline that builds a Java application, handles dynamic versioning, builds a Docker image, pushes it to a private AWS ECR registry, and automatically deploys the new version to a live AWS EKS (Kubernetes) cluster using Jenkins.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Java',
      'Docker',
      'AWS ECR',
      'AWS EKS',
      'Kubernetes',
      'Jenkins',
    ],
  },
  {
    title: 'Snippetbox: Full-Stack Web Application (Go)',
    description:
      'A full-stack "Pastebin" clone built from first principles in Go. This project demonstrates a secure, server-rendered web application using the net/http package. Key features include a MySQL database with connection pooling, dynamic HTML templating, custom middleware (logging, panic recovery), full user authentication (signup, login, sessions), and robust security features like CSRF protection and HTTPS/TLS server configuration.',
    link: 'https://github.com/whispernet',
    technologies: ['Go', 'MySQL'],
  },
  {
    title: 'Custom-Built Relational SQL Database from Scratch (Go)',
    description:
      'A persistent, disk-based relational database built from the ground up in Go. This project involved implementing a B+Tree data structure for on-disk storage, ensuring durability (with fsync) and crash recovery, and then building a transactional, concurrent SQL engine on top, complete with its own parser and interpreter.',
    link: 'https://github.com/whispernet',
    technologies: ['Go'],
  },
  {
    title: 'Custom-Built Web Server from Scratch (Node.js)',
    description:
      'A standards-compliant web server built from scratch using only raw Node.js network primitives (no frameworks). This project started with a low-level TCP server and progressively added an HTTP/1.1 parser, static file serving, advanced HTTP features (Caching, Range Requests), and a full WebSocket server.',
    link: 'https://github.com/whispernet',
    technologies: ['Node.js'],
  },
  {
    title: 'Scalable YouTube-Like Backend API',
    description:
      'A high-performance backend API for a video-sharing platform built with Node.js and Express. The project features a clean REST architecture, secure JWT-based authentication, and complex social features like video uploads, comments, a like/unlike system, and channel subscriptions. It leverages MongoDB Aggregation Pipelines for efficient data analytics.',
    link: 'https://github.com/whispernet',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    title: 'Automated DevSecOps Pipeline with Vulnerability Management',
    description:
      'A secure CI/CD pipeline in GitLab CI that integrates a full suite of security tools: SAST (Semgrep), SCA (RetireJS), Container Scanning (Trivy), and DAST (OWASP ZAP). It features a custom Python script to automatically upload all scan reports to DefectDojo, creating a centralized dashboard for vulnerability management.',
    link: 'https://github.com/whispernet',
    technologies: [
      'GitLab CI',
      'Semgrep',
      'RetireJS',
      'Trivy',
      'OWASP ZAP',
      'Python',
      'DefectDojo',
    ],
  },
  {
    title: 'YelpCamp: Full-Stack Campground Review Application',
    description:
      'A complete, full-stack web application for reviewing campgrounds. The application features full CRUD functionality, user authentication/authorization with Passport.js, Cloudinary for image uploads, and JOI for server-side validation. The project is server-side rendered with EJS and deployed on Render with MongoDB Atlas.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Node.js',
      'Express',
      'MongoDB',
      'Passport.js',
      'Cloudinary',
      'JOI',
      'EJS',
    ],
  },
  {
    title: 'Kubernetes Service Mesh & Policy Enforcement (Istio & OPA)',
    description:
      'A combined project demonstrating advanced Kubernetes security. Deployed Istio as a service mesh to encrypt all pod-to-pod traffic (mTLS) and secure ingress. Implemented OPA Gatekeeper to enforce "Policy as Code," automatically blocking non-compliant deployments (e.g., privileged containers).',
    link: 'https://github.com/whispernet',
    technologies: ['Kubernetes', 'Istio', 'OPA'],
  },
  {
    title:
      'End-to-End CI/CD Pipeline with Integrated IaC (Jenkins + Terraform)',
    description:
      'A complete CI/CD pipeline that automatically provisions its own infrastructure. When new code is pushed, Jenkins builds the Java application, pushes a Docker image, then uses Terraform to provision a new AWS EC2 instance. Finally, it deploys the application using Docker Compose onto the new server.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Jenkins',
      'Terraform',
      'AWS EC2',
      'Docker',
      'Docker Compose',
      'Java',
      'Maven',
    ],
  },
  {
    title: 'End-to-End Application Monitoring (Prometheus + Grafana + Node.js)',
    description:
      'Instrumented a Node.js application to expose custom metrics. Deployed this app to Kubernetes and configured Prometheus to scrape its metrics. Also set up Alertmanager for notifications (e.g., high CPU, Pod failures) and built Grafana dashboards to visualize the application health.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Prometheus',
      'Grafana',
      'Alertmanager',
      'Kubernetes',
      'Docker',
      'Node.js',
      'Helm',
    ],
  },
  {
    title:
      'Automated Kubernetes Deployment with IaC & Config Management (Terraform + Ansible)',
    description:
      'A powerful, non-Jenkins workflow. Used Terraform to automatically provision an AWS EKS cluster. Then, used Ansible (via playbooks) to connect to that cluster and automatically deploy an application into a new Kubernetes namespace.',
    link: 'https://github.com/whispernet',
    technologies: ['Ansible', 'Terraform', 'AWS EKS', 'Kubernetes', 'Python'],
  },
  {
    title:
      'Microservices Deployment & Management on Kubernetes (Helm + Helmfile)',
    description:
      'Took a complex, multi-service "online shop" application and deployed it to a managed Kubernetes cluster (Linode LKE). To manage this complexity, created a reusable, shared Helm chart and then used Helmfile to manage the deployment of all microservices, demonstrating production-level best practices.',
    link: 'https://github.com/whispernet',
    technologies: ['Kubernetes', 'Helm', 'Helmfile', 'Docker', 'Linode LKE'],
  },
  {
    title: 'Automated Cloud Operations & Recovery with Python (Boto3)',
    description:
      'Built an automated website monitoring and recovery system. This Python script continuously monitors a website HTTP status. If the site goes down, it automatically sends an email notification and then attempts to recover the application by restarting the server. This project also included skills for automating EBS snapshot backups and tagging EC2 instances.',
    link: 'https://github.com/whispernet',
    technologies: ['Python', 'Boto3', 'Docker', 'Linux'],
  },
  {
    title: 'Applied Machine Learning Model Showcase',
    description:
      'A consolidated repository demonstrating proficiency in the full machine learning lifecycle across various real-world case studies. This project implements several distinct models, from data preprocessing and feature selection to model training and evaluation for both supervised (regression, classification) and unsupervised (clustering) tasks. Key implementations include: supervised regression for time series temperature prediction in London, general regression for movie rental duration prediction, predictive modeling for agricultural crop cultivation, and unsupervised K-means clustering for identifying and grouping different species of Antarctic penguins.',
    link: 'https://github.com/whispernet',
    technologies: [
      'Python',
      'Docker',
      'MLflow',
      'DVC',
      'Great Expectations',
      'Shell',
    ],
  },
];

export const BLOGS = [
  {
    title: 'Building Scalable Backend Systems with Node.js',
    description:
      'Exploring best practices for building robust and scalable backend systems using Node.js, including microservices architecture, database optimization, and API design patterns.',
    link: '#',
    date: 'Jan 2025',
    tags: ['Node.js', 'Backend', 'Architecture'],
  },
  {
    title: 'Understanding AI/ML: From Theory to Practice',
    description:
      'A deep dive into machine learning concepts, from neural networks to practical implementations. Learn how to build and deploy ML models for real-world applications.',
    link: '#',
    date: 'Dec 2024',
    tags: ['AI/ML', 'Python', 'Machine Learning'],
  },
  {
    title: 'Modern React Patterns and Best Practices',
    description:
      'Discover advanced React patterns, hooks optimization, and performance techniques that will help you build faster and more maintainable React applications.',
    link: '#',
    date: 'Nov 2024',
    tags: ['React', 'Frontend', 'JavaScript'],
  },
  {
    title: 'The Future of Web Development',
    description:
      'Exploring emerging technologies and trends in web development, including WebAssembly, serverless architecture, and the evolution of frontend frameworks.',
    link: '#',
    date: 'Oct 2024',
    tags: ['Web Development', 'Technology', 'Trends'],
  },
];

function MainContent() {
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [showAchievementsPanel, setShowAchievementsPanel] = useState(false);
  const [socialClicks, setSocialClicks] = useState<Set<string>>(new Set());
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [profileHoverProgress, setProfileHoverProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.removeItem('achievements');
    setAchievements(new Set());

    // Check for night owl achievement
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 5) {
      unlockAchievement(ACHIEVEMENTS.NIGHT_OWL);
    }

    const handleAchievement = (e: CustomEvent) => {
      unlockAchievement(e.detail);
    };

    window.addEventListener(
      'unlockAchievement',
      handleAchievement as EventListener
    );

    return () => {
      window.removeEventListener(
        'unlockAchievement',
        handleAchievement as EventListener
      );
    };
  }, []);

  const unlockAchievement = (
    achievement: (typeof ACHIEVEMENTS)[keyof typeof ACHIEVEMENTS]
  ) => {
    if (!achievements.has(achievement.id)) {
      const newAchievements = new Set(achievements).add(achievement.id);
      setAchievements(newAchievements);
      setConfettiTrigger((prev) => !prev);
    }
  };

  const handleSocialClick = (platform: string) => {
    const newSocialClicks = new Set(socialClicks).add(platform);
    setSocialClicks(newSocialClicks);

    if (newSocialClicks.size === 6) {
      // Changed to 6 to include all social links (email, GitHub, LinkedIn, Twitter, Dev.to, resume)
      unlockAchievement(ACHIEVEMENTS.ALL_SOCIALS);
    }
  };

  const handleResumeDownload = () => {
    unlockAchievement(ACHIEVEMENTS.RESUME);
  };

  const copyEmailToClipboard = () => {
    const email = 'ridowan.cse@proton.me';
    navigator.clipboard
      .writeText(email)
      .then(() => {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'toast-container';
          toastContainer.className =
            'fixed bottom-16 left-0 right-0 flex justify-center items-center z-50 pointer-events-none';
          document.body.appendChild(toastContainer);
        }

        // Create the toast notification
        const toast = document.createElement('div');
        toast.className =
          'bg-white/90 dark:bg-zinc-800/90 text-black dark:text-white px-4 py-2 rounded-lg shadow-lg animate-fade-up flex items-center gap-2 border border-zinc-200/20 dark:border-zinc-700/20 pointer-events-auto';
        toast.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Email copied to clipboard!</span>';

        toastContainer.appendChild(toast);

        // Remove the toast after 2 seconds
        setTimeout(() => {
          toast.classList.add(
            'opacity-0',
            'transition-opacity',
            'duration-300'
          );
          setTimeout(() => {
            if (toast.parentNode === toastContainer) {
              toastContainer.removeChild(toast);
            }
            // Remove container if empty
            if (toastContainer.children.length === 0) {
              document.body.removeChild(toastContainer);
            }
          }, 300);
        }, 2000);

        handleSocialClick('email');
      })
      .catch((err) => {
        console.error('Could not copy email: ', err);
      });
  };

  // Add handlers for other achievements
  const handleThemeToggle = () => {
    unlockAchievement(ACHIEVEMENTS.THEME_TOGGLE);
  };

  const handleSkillInteraction = () => {
    unlockAchievement(ACHIEVEMENTS.SKILL_EXPLORER);
  };

  const handleViewAllProjects = () => {
    unlockAchievement(ACHIEVEMENTS.VIEW_ALL_PROJECTS);
  };

  const handleViewAllBlogs = () => {
    unlockAchievement(ACHIEVEMENTS.VIEW_ALL_BLOGS);
  };

  // Add new handler for profile hover achievement
  const handleProfileHoverStart = () => {
    setIsHovering(true);
    setProfileHoverProgress(0);

    // Clear any existing timer
    if (hoverTimerRef.current) {
      clearInterval(hoverTimerRef.current);
    }

    // Set up a timer to increment progress
    const startTime = Date.now();
    const duration = 4000; // 4 seconds

    hoverTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setProfileHoverProgress(progress);

      if (progress >= 1) {
        // Achievement unlocked!
        unlockAchievement(ACHIEVEMENTS.PROFILE_HOVER);
        clearInterval(hoverTimerRef.current!);
      }
    }, 50);
  };

  const handleProfileHoverEnd = () => {
    setIsHovering(false);
    setProfileHoverProgress(0);

    if (hoverTimerRef.current) {
      clearInterval(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white">
      <StarBackground />
      <Confetti trigger={confettiTrigger} />

      {/* Achievements Counter */}
      <button
        onClick={() => setShowAchievementsPanel(!showAchievementsPanel)}
        className="fixed bottom-4 left-4 flex items-center gap-2 px-3 py-2 
        bg-white/10 dark:bg-zinc-800/90 backdrop-blur-sm
        rounded-lg shadow-lg border border-white/20 dark:border-zinc-700/50
        text-black dark:text-white hover:bg-white/20 dark:hover:bg-zinc-700/90
        transition-all duration-300 z-50"
      >
        <Trophy className="w-4 h-4 text-emerald-500" />
        <span className="font-medium text-emerald-500">
          {achievements.size}
        </span>
        <span className="text-black/60 dark:text-white/60">
          / {Object.keys(ACHIEVEMENTS).length}
        </span>
      </button>

      {/* Achievements List Panel */}
      {showAchievementsPanel && (
        <div
          className="fixed bottom-16 left-4 w-72 bg-white/10 dark:bg-zinc-800/90 backdrop-blur-sm p-4 
          rounded-lg shadow-lg border border-white/20 dark:border-zinc-700/50
          transition-all duration-300 transform z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-black dark:text-white">
              Achievements
            </h3>
            <button
              onClick={() => setShowAchievementsPanel(false)}
              className="p-1 hover:bg-white/10 dark:hover:bg-zinc-700/50 rounded-full
              transition-all duration-300"
            >
              ×
            </button>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {Object.values(ACHIEVEMENTS).map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300
                ${
                  achievements.has(achievement.id)
                    ? 'bg-emerald-500/10 dark:bg-emerald-500/20'
                    : 'bg-white/5 dark:bg-zinc-700/30'
                }`}
              >
                <div
                  className={`p-1.5 rounded-full flex-shrink-0
                  ${
                    achievements.has(achievement.id)
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-zinc-200/20 dark:bg-zinc-700/50 text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  <Trophy className="w-3 h-3" />
                </div>
                <div>
                  <p
                    className={`text-sm font-medium
                    ${
                      achievements.has(achievement.id)
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                  >
                    {achievement.title}
                  </p>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto space-y-8 p-6 md:p-12 py-24">
        {/* Intro */}
        <section className="animate-fade-in">
          <div className="mb-12 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture with Progress Ring */}
            <div
              className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0"
              onMouseEnter={handleProfileHoverStart}
              onMouseLeave={handleProfileHoverEnd}
              onTouchStart={handleProfileHoverStart}
              onTouchEnd={handleProfileHoverEnd}
            >
              {/* Circular Progress Indicator - Only visible during hover */}
              {isHovering && (
                <svg
                  className="absolute inset-0 w-full h-full rotate-[-90deg] z-10"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#A5B4FC" /* Pastel indigo color */
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${profileHoverProgress * 301.6} 301.6`}
                    style={{ transition: 'stroke-dasharray 50ms linear' }}
                  />
                </svg>
              )}

              {/* Profile Image */}
              <div className="absolute inset-[2px] rounded-full overflow-hidden border border-zinc-800/50 dark:border-zinc-800/50 shadow-xl">
                <img
                  src="/images/profile.jpg"
                  alt="Ridowan Sikder"
                  className="w-full h-full object-cover"
                  onClick={() => setShowImageViewer(true)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-medium text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 tracking-tight">
                Ridwoan Sikder.
              </h1>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-black/70 dark:text-white/70 font-normal tracking-wide">
                  DevOps • Security • Backend Engineering • MLOps
                </p>
                <p className="text-lg text-black/80 dark:text-white/80 font-light tracking-wide">
                  Curious engineer building secure, automated, and scalable
                  systems.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <button
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm 
                    hover:text-indigo-400 hover:bg-zinc-700/80
                    flex items-center gap-2 text-white 
                    transition-all duration-300 hover:scale-110"
                  aria-label="Copy email address"
                  title="Copy email: ridowan.cse@proton.me"
                >
                  <Mail size={18} />
                </button>
                <a
                  href="https://github.com/WhisperNet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm 
                    hover:text-indigo-400 hover:bg-zinc-700/80
                    flex items-center gap-2 text-white 
                    transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('github')}
                  aria-label="Visit my GitHub"
                  title="GitHub: @WhisperNet"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/whispernet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm 
                    hover:text-indigo-400 hover:bg-zinc-700/80
                    flex items-center gap-2 text-white 
                    transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('linkedin')}
                  aria-label="Visit my LinkedIn profile"
                  title="LinkedIn: @whispernet"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://x.com/_whispernet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm 
                    hover:text-indigo-400 hover:bg-zinc-700/80
                    flex items-center gap-2 text-white 
                    transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('twitter')}
                  aria-label="Visit my Twitter profile"
                  title="Twitter @_whispernet"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://dev.to/whispernet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm 
                    hover:text-indigo-400 hover:bg-zinc-700/80
                    flex items-center gap-2 text-white 
                    transition-all duration-300 hover:scale-110"
                  onClick={() => handleSocialClick('devto')}
                  aria-label="Visit my Dev.to profile"
                  title="Dev.to @whispernet"
                >
                  <SiDevdotto size={18} />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-zinc-800/80 backdrop-blur-sm 
                    hover:text-indigo-400 hover:bg-zinc-700/80
                    flex items-center gap-2 text-white 
                    transition-all duration-300 hover:scale-110"
                  onClick={() => {
                    handleResumeDownload();
                    handleSocialClick('resume');
                  }}
                  aria-label="View my resume"
                  title="View resume"
                >
                  <Download size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="animate-fade-in animation-delay-200">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8 tracking-tight">
            About
          </h2>
          <div>
            <p className="text-black dark:text-white font-light leading-relaxed tracking-wide mb-5">
              I’m Ridowan Sikder — a Computer Science and Engineering
              undergraduate at Shahjalal University of Science and Technology
              (2022–present), based in Bangladesh. My work and learning revolve
              around DevSecOps, backend engineering, and MLOps, where I focus on
              creating secure, reliable, and scalable systems that bridge
              development and operations.
            </p>
            <p className="text-black dark:text-white font-light leading-relaxed tracking-wide mb-5">
              I enjoy understanding how things work under the hood — whether
              it’s a CI/CD pipeline, a distributed system, or the internals of
              an API. Over time, I’ve built a range of projects that explore
              system automation, microservice architectures, and cloud-native
              deployment workflows. These hands-on experiences have shaped my
              perspective on security-first design — writing code with an
              awareness of vulnerabilities and building pipelines that integrate
              security at every stage.
            </p>
            <p className="text-black dark:text-white font-light leading-relaxed tracking-wide mb-5">
              Beyond academics, I'm continuously experimenting with new
              technologies, exploring cloud infrastructure, and improving my
              DevSecOps workflow through personal projects. I also share what I
              learn on my blog at{' '}
              <a
                href="https://blog.ridowansikder.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 underline transition-colors duration-300"
              >
                blog.ridowansikder.me
              </a>
            </p>
            <p className="text-black dark:text-white font-light leading-relaxed tracking-wide">
              I’m always eager to collaborate on projects that push the
              boundaries of secure and scalable software engineering — and I’m
              open to internships and collaborative opportunities that let me
              apply and expand my skills.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="animate-fade-in animation-delay-300">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-5 tracking-tight">
            Education
          </h2>
          <div className="space-y-6">
            <div className="block group">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-normal text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">
                  <a
                    href="https://www.sust.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    Shahjalal University of Science and Technology
                  </a>
                </h3>
                <span className="text-sm font-light text-black dark:text-white">
                  2022 - Present
                </span>
              </div>
              <p className="text-black dark:text-white text-sm font-medium mb-2">
                B.Sc.(Eng.) in Computer Science and Engineering
              </p>
              <p className="text-black/70 dark:text-white/70 text-sm font-light">
                Sylhet, Bangladesh
              </p>
            </div>

            <div className="block group">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-normal text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">
                  <a
                    href="https://www.nationalidealcollege.edu.bd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    National Ideal College
                  </a>
                </h3>
                <span className="text-sm font-light text-black dark:text-white">
                  2018 - 2021
                </span>
              </div>
              <p className="text-black dark:text-white text-sm font-medium mb-2">
                Higher Secondary Certificate
              </p>
              <p className="text-black/70 dark:text-white/70 text-sm font-light">
                Khilgaon, Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="animate-fade-in animation-delay-400">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8 tracking-tight">
            Projects
          </h2>
          <ProjectCarousel
            projects={PROJECTS}
            onViewAll={handleViewAllProjects}
          />
        </section>

        {/* Blogs */}
        <section className="animate-fade-in animation-delay-500">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8 tracking-tight">
            Blogs
          </h2>
          <BlogCarousel blogs={BLOGS} onViewAll={handleViewAllBlogs} />
        </section>

        {/* Skills */}
        <section className="animate-fade-in animation-delay-600">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8 tracking-tight">
            Skills
          </h2>
          <SkillTree onInteraction={handleSkillInteraction} />
        </section>
      </main>

      {/* Footer section with controls */}
      <footer className="pb-28 relative z-40">
        <ThemeToggle onThemeToggle={handleThemeToggle} />
        <KudosButton
          onFirstKudos={() => unlockAchievement(ACHIEVEMENTS.KUDOS_FIRST)}
          onAllKudos={() => unlockAchievement(ACHIEVEMENTS.KUDOS_ALL)}
        />
      </footer>

      {showImageViewer && (
        <ImageViewer
          src="/images/profile.jpg"
          alt="Ridowan Sikder"
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route
          path="/projects"
          element={<ViewAll type="projects" items={PROJECTS} />}
        />
        <Route path="/blogs" element={<ViewAll type="blogs" items={BLOGS} />} />
      </Routes>
    </Router>
  );
}

export default App;
