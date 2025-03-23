"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Constants to avoid recreation on each render
const SLIDE_INTERVAL = 5000
const TRANSITION_DURATION = 500

interface Project {
  title: string;
  description: string;
  image: string;
}

// Project data
const PROJECTS: readonly Project[] = [
  {
    title: "Rev0",
    description: "AI Voice Campaign Manager",
    image: "/screenshots/rev0-campaign.png",
  },
  {
    title: "Rev0",
    description: "AI Sales Manager",
    image: "/screenshots/rev0-sales.png",
  },
  {
    title: "Rev0",
    description: "AI DevOps Platform",
    image: "/screenshots/rev0-devops.png",
  },
] as const;

export function GlassCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>()

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION)
  }, [isAnimating])

  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % PROJECTS.length
    goToSlide(newIndex)
  }, [currentIndex, goToSlide])

  const goToPrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
    goToSlide(newIndex)
  }, [currentIndex, goToSlide, PROJECTS.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(goToNext, SLIDE_INTERVAL)
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [goToNext])

  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }, [])

  const resumeAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(goToNext, SLIDE_INTERVAL)
  }, [goToNext])

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]))
  }, [])

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 md:px-8" 
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project showcase"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onFocus={pauseAutoPlay}
      onBlur={resumeAutoPlay}
    >
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-xl bg-[#fafafa] shadow-lg">
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROJECTS.map((project, index) => (
            <div 
              key={project.title + index}
              className="min-w-full h-full flex-shrink-0 relative p-4 md:p-8"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${PROJECTS.length}`}
            >
              <div className="absolute inset-4 md:inset-8">
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#fafafa]">
                    <div className="animate-pulse w-12 h-12 rounded-full bg-gray-200" />
                  </div>
                )}
                <Image
                  src={project.image}
                  alt={`${project.title}: ${project.description}`}
                  className={`
                    w-full h-full object-contain transition-opacity duration-300
                    ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}
                  `}
                  fill
                  priority={index === 0}
                  quality={100}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>

              <div 
                className="absolute bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-black/70 text-center rounded-md inline-block backdrop-blur-sm"
                aria-live="polite"
              >
                <h3 className="text-white text-xs md:text-sm font-terminal uppercase whitespace-nowrap">
                  {project.title}: <span className="text-xs opacity-80">{project.description}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous slide"
          type="button"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next slide"
          type="button"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div 
        className="flex justify-center mt-4 gap-2"
        role="tablist"
        aria-label="Carousel navigation"
      >
        {PROJECTS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              index === currentIndex ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
