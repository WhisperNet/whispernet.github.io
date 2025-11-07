import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

interface ThemeToggleProps {
  onThemeToggle?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    toggleTheme();
    onThemeToggle?.();
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-6 right-6
        text-black dark:text-white
        hover:scale-110 transition-all duration-300 z-50"
      aria-label="Toggle theme"
    >
      <div className={`theme-icon ${isRotating ? "rotating" : ""}`}>
        {theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </div>
    </button>
  );
};
