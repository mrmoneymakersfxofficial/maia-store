'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RotateCw, ZoomIn, ZoomOut, Share2 } from 'lucide-react';

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  productName?: string;
  slug?: string;
  price?: string;
  onShare?: () => void;
}

export default function Lightbox({
  images,
  isOpen,
  initialIndex = 0,
  onClose,
  productName,
  slug,
  price,
  onShare,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
      setIsFlipped(false);
      setPosition({ x: 0, y: 0 });
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const goNext = useCallback(() => {
    setScale(1);
    setRotation(0);
    setIsFlipped(false);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setScale(1);
    setRotation(0);
    setIsFlipped(false);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.5, 1));
  }, []);

  const resetView = useCallback(() => {
    setScale(1);
    setRotation(0);
    setIsFlipped(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Double tap to zoom on mobile
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (scale > 1) {
        resetView();
      } else {
        setScale(2.5);
      }
    }
    lastTapRef.current = now;
  }, [scale, resetView]);

  // Mouse wheel zoom on desktop
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        setScale((prev) => Math.min(prev + 0.2, 4));
      } else {
        setScale((prev) => Math.max(prev - 0.2, 1));
      }
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowLeft': goPrev(); break;
        case 'ArrowRight': goNext(); break;
        case '+':
        case '=': handleZoomIn(); break;
        case '-': handleZoomOut(); break;
        case 'r': handleRotate(); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goNext, goPrev, handleZoomIn, handleZoomOut, handleRotate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {productName && (
              <span className="text-white/60 text-xs font-medium truncate max-w-[40%] text-center">
                {productName}
              </span>
            )}

            <div className="flex items-center gap-2">
              {onShare && (
                <button
                  onClick={onShare}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              <span className="text-white/30 text-xs">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Main image area */}
          <div
            ref={containerRef}
            className="flex-1 flex items-center justify-center overflow-hidden relative cursor-zoom-in"
            onClick={handleDoubleTap}
            onWheel={handleWheel}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
                draggable={false}
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg) scaleX(${isFlipped ? -1 : 1}) translate(${position.x}px, ${position.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Bottom controls */}
          <div className="flex items-center justify-center gap-3 px-4 py-4 z-10">
            <ControlButton onClick={handleZoomOut} icon={ZoomOut} label="Reducir" />
            <ControlButton onClick={resetView} label="1:1" isText />
            <ControlButton onClick={handleZoomIn} icon={ZoomIn} label="Ampliar" />
            <ControlButton onClick={handleRotate} icon={RotateCw} label="Rotar" />
            <ControlButton onClick={handleFlip} label="↔" isText />
          </div>

          {/* Thumbnails strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 px-4 pb-4 z-10 overflow-x-auto">
              {images.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    resetView();
                  }}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === currentIndex
                      ? 'border-primary scale-105'
                      : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                  whileTap={{ scale: 0.92 }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Control Button ──────────────────────────────────────────

function ControlButton({
  onClick,
  icon: Icon,
  label,
  isText = false,
}: {
  onClick: () => void;
  icon?: React.ElementType;
  label: string;
  isText?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors text-xs font-bold"
      whileTap={{ scale: 0.9 }}
    >
      {isText ? label : Icon && <Icon className="w-4 h-4" />}
    </motion.button>
  );
}
