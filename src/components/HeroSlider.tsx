import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Pause, 
  Play, 
  GraduationCap, 
  BookOpen, 
  Image as ImageIcon 
} from 'lucide-react';
import { Language, HeroSlide } from '../types';

interface HeroSliderProps {
  slides: HeroSlide[];
  lang: Language;
  onNavigate: (view: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  lang,
  onNavigate
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPlaying && totalSlides > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, totalSlides]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/30 bg-slate-950 group"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images with Crossfade */}
      <div className="relative h-[480px] sm:h-[520px] lg:h-[560px] w-full overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
              } transition-transform duration-10000`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out scale-105 group-hover:scale-100"
              />
              {/* Multi-layered dark gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-slate-950/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
            </div>
          );
        })}

        {/* Decorative Islamic Watermark */}
        <div className="absolute right-6 -bottom-10 opacity-10 text-[180px] sm:text-[240px] font-['Amiri'] select-none pointer-events-none text-emerald-300 z-10 hidden md:block">
          اقْرَأْ
        </div>

        {/* Content Container */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-12 py-10 flex flex-col justify-center">
          <div className="max-w-3xl space-y-5">
            
            {/* Top Badge & Slide Counter */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-800/90 border border-emerald-400/40 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{lang === 'bn' ? currentSlide.badge : currentSlide.badgeEn}</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-slate-300 text-xs font-mono backdrop-blur-md">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            {/* Quran Verse */}
            {currentSlide.quranVerse && (
              <div className="space-y-1.5 bg-emerald-900/40 border-l-4 border-amber-400 p-3.5 rounded-r-2xl backdrop-blur-sm">
                <p className="font-['Amiri'] text-lg sm:text-2xl text-amber-300 tracking-wide font-normal leading-relaxed">
                  {currentSlide.quranVerse}
                </p>
                {currentSlide.quranVerseMeaning && (
                  <p className="text-xs sm:text-sm text-emerald-100 italic">
                    {currentSlide.quranVerseMeaning}
                  </p>
                )}
              </div>
            )}

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
              {lang === 'bn' ? currentSlide.title : currentSlide.titleEn}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow">
              {lang === 'bn' ? currentSlide.subtitle : currentSlide.subtitleEn}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(currentSlide.primaryActionTarget)}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-amber-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'bn' ? currentSlide.primaryActionLabel : currentSlide.primaryActionLabelEn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {currentSlide.secondaryActionLabel && (
                <button
                  onClick={() => onNavigate(currentSlide.secondaryActionTarget || 'gallery')}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 backdrop-blur-md transition flex items-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'bn' ? currentSlide.secondaryActionLabel : currentSlide.secondaryActionLabelEn}</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('gallery')}
                className="px-4 py-3 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-semibold text-xs sm:text-sm rounded-2xl border border-emerald-500/40 backdrop-blur-md transition flex items-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'bn' ? 'ফটো গ্যালারি' : 'Gallery'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-700 text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg transition transform hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-emerald-700 text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg transition transform hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Navigation Indicators & Play/Pause */}
        <div className="absolute bottom-6 left-6 sm:left-12 right-6 sm:right-12 z-30 flex items-center justify-between">
          
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full h-2.5 ${
                    isActive
                      ? 'w-8 bg-amber-400 shadow-lg shadow-amber-400/50'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Autoplay Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/10 backdrop-blur-md text-xs flex items-center gap-1.5 transition"
            title={isPlaying ? 'Pause auto-slider' : 'Play auto-slider'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-medium">
              {isPlaying ? (lang === 'bn' ? 'স্বয়ংক্রিয় চালু' : 'Auto Play') : (lang === 'bn' ? 'স্থগিত' : 'Paused')}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
