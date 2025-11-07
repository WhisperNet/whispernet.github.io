import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

interface Blog {
  title: string;
  description: string;
  link: string;
  date: string;
  tags: string[];
}

interface BlogCarouselProps {
  blogs: Blog[];
  onViewAll?: () => void;
}

export const BlogCarousel: React.FC<BlogCarouselProps> = ({
  blogs,
  onViewAll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= blogs.length ? 0 : nextIndex;
    });
  };

  const previousSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? blogs.length - 1 : nextIndex;
    });
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Create a circular array for smooth infinite scrolling
  const getVisibleBlogs = () => {
    const items = [...blogs];
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    // Add last item to beginning and first item to end for smooth transition
    return [lastItem, ...items, firstItem];
  };

  const visibleBlogs = getVisibleBlogs();

  return (
    <div className="relative mx-16">
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-all duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${(currentIndex + 1) * 100}% - ${
              (currentIndex + 1) * 2
            }rem))`,
          }}
        >
          {visibleBlogs.map((blog, index) => (
            <a
              key={`${blog.title}-${index}`}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex-shrink-0 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 
                border border-zinc-200/50 dark:border-zinc-700/10 
                hover:border-zinc-300 dark:hover:border-zinc-700/20 
                transition-all duration-300 group overflow-hidden
                transform-gpu flex flex-col min-h-[250px] cursor-pointer
                shadow-sm hover:shadow-md hover:scale-[1.02] will-change-transform"
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <h3 className="text-lg font-normal text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1">
                  {blog.title}
                  <ExternalLink className="w-4 h-4" />
                </h3>
              </div>
              <p className="text-black/80 dark:text-white/80 text-sm font-normal mb-4 line-clamp-4 flex-grow">
                {blog.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-normal text-black/70 dark:text-white/70 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-black/60 dark:text-white/60 font-light">
                  {blog.date}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={previousSlide}
        disabled={isAnimating}
        className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full 
          bg-white/5 backdrop-blur-sm border border-zinc-200/10 dark:border-zinc-700/10 
          hover:bg-white/10 transition-all duration-300 text-black dark:text-white
          opacity-100 cursor-pointer
          hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Previous blogs"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full 
          bg-white/5 backdrop-blur-sm border border-zinc-200/10 dark:border-zinc-700/10 
          hover:bg-white/10 transition-all duration-300 text-black dark:text-white
          opacity-100 cursor-pointer
          hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Next blogs"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/blogs"
          onMouseEnter={onViewAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
            bg-white/10 dark:bg-white/5 backdrop-blur-sm 
            border border-zinc-200/20 dark:border-zinc-700/20 
            text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400
            hover:bg-white/20 dark:hover:bg-white/10
            transition-all duration-300 group"
        >
          <span className="text-sm font-medium">View All Blogs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};
