import React from "react";
import { X } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  onClose,
}) => {
  // Handle click outside the image to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
};
