import React, { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

const EMOJI_OPTIONS = ['❤️', '👍', '🎉', '🚀', '🔥', '👏', '🌟', '💡'];

interface KudosButtonProps {
  onFirstKudos?: () => void;
  onAllKudos?: () => void;
}

export const KudosButton: React.FC<KudosButtonProps> = ({
  onFirstKudos,
  onAllKudos,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [usedEmojis, setUsedEmojis] = useState<Set<string>>(new Set());
  const [flyingEmoji, setFlyingEmoji] = useState<
    { emoji: string; id: number }[]
  >([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  const createFlyingEmoji = (emoji: string) => {
    const id = Date.now();
    setFlyingEmoji((prev) => [...prev, { emoji, id }]);

    setTimeout(() => {
      setFlyingEmoji((prev) => prev.filter((e) => e.id !== id));
    }, 1000);
  };

  const handleReaction = (emoji: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setSelectedEmoji(emoji);
    createFlyingEmoji(emoji);

    // Track used emojis
    const newUsedEmojis = new Set(usedEmojis).add(emoji);
    setUsedEmojis(newUsedEmojis);

    // Check achievements
    if (newUsedEmojis.size === 1) {
      onFirstKudos?.();
    }
    if (newUsedEmojis.size === EMOJI_OPTIONS.length) {
      onAllKudos?.();
    }

    setTimeout(() => {
      setSelectedEmoji(null);
      setIsLoading(false);
      setShowPicker(false);
    }, 1000);
  };

  return (
    <>
      {/* Flying Emojis */}
      {flyingEmoji.map(({ emoji, id }) => (
        <div
          key={id}
          className="fixed pointer-events-none z-50"
          style={{
            right: '5rem',
            bottom: '20rem',
            animation: 'flyEmoji 1s ease-out forwards',
          }}
        >
          <div className="text-2xl transform scale-150">{emoji}</div>
        </div>
      ))}

      {/* Rest of the component */}
      <div className="fixed bottom-4 right-4 flex items-center z-50">
        {/* Main Button */}
        <div ref={pickerRef}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 
              border border-zinc-200/20 dark:border-zinc-700/20
              transition-all duration-300 hover:scale-110 relative"
            aria-label="Show emoji reactions"
          >
            <Heart
              className={`w-5 h-5 text-black dark:text-white transition-transform duration-300
                ${
                  showPicker ? 'scale-110 text-pink-500 dark:text-pink-400' : ''
                }
                ${isLoading ? 'animate-ping' : ''}`}
            />
          </button>
        </div>

        {/* Emoji Picker */}
        <div
          className={`absolute right-full mr-5t top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 flex gap-1
          border border-zinc-200/20 dark:border-zinc-700/20
          transition-all duration-300 origin-right
          ${
            showPicker
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              disabled={isLoading}
              className="relative group"
            >
              <div
                className={`text-2xl transition-all duration-300 transform
                ${
                  selectedEmoji === emoji
                    ? 'animate-bounce scale-125'
                    : 'hover:scale-125'
                }
                ${isLoading ? 'opacity-50' : 'hover:rotate-12'}`}
              >
                {emoji}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
