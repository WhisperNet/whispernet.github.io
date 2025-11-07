import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { StarBackground } from '../components/StarBackground';
import { ThemeToggle } from '../components/ThemeToggle';

interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
}

interface Blog {
  title: string;
  description: string;
  link: string;
  date: string;
  tags: string[];
}

interface ViewAllProps {
  type: 'projects' | 'blogs';
  items: Project[] | Blog[];
}

export const ViewAll: React.FC<ViewAllProps> = ({ type, items }) => {
  const isProjects = type === 'projects';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white">
      <StarBackground />
      <ThemeToggle />

      <main className="max-w-4xl mx-auto space-y-8 p-6 md:p-12 py-24">
        {/* Header */}
        <div className="animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-black/70 dark:text-white/70 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to home</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4 tracking-tight">
            {isProjects ? 'All Projects' : 'All Blogs'}
          </h1>
          <p className="text-lg text-black/70 dark:text-white/70 font-light">
            {isProjects
              ? "A collection of projects I've built and worked on."
              : 'Thoughts, tutorials, and insights on software engineering.'}
          </p>
        </div>

        {/* Items Grid */}
        <div className="space-y-6 animate-fade-in animation-delay-200">
          {items.map((item, index) => (
            <a
              key={index}
              href={isProjects ? (item as Project).link : (item as Blog).link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 
                border border-zinc-200/50 dark:border-zinc-700/10 
                hover:border-zinc-300 dark:hover:border-zinc-700/20 
                transition-all duration-300 group
                shadow-sm hover:shadow-md hover:scale-[1.01] will-change-transform"
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <h2 className="text-xl font-normal text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2">
                  {isProjects ? (item as Project).title : (item as Blog).title}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h2>
                {!isProjects && (
                  <span className="text-sm text-black/60 dark:text-white/60 font-light whitespace-nowrap">
                    {(item as Blog).date}
                  </span>
                )}
              </div>

              <p className="text-black/80 dark:text-white/80 text-sm font-normal mb-4 leading-relaxed">
                {isProjects
                  ? (item as Project).description
                  : (item as Blog).description}
              </p>

              <div className="flex flex-wrap gap-2">
                {isProjects
                  ? (item as Project).technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-normal text-black/70 dark:text-white/70 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))
                  : (item as Blog).tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-normal text-black/70 dark:text-white/70 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};
