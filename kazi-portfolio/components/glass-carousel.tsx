"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function GlassCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Placeholder images - replace these with your uploaded images
  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SSSbzuCEKrt8dKZOGPsbeqQFeOoEsy.png", // Rev0 image
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ]

  // Project titles and descriptions
  const projects = [
    {
      title: "Rev0",
      description: "AI Call/Text Platform for D2C brands",
    },
    {
      title: "Project 2",
      description: "Replace with your project description",
    },
    {
      title: "Project 3",
      description: "Replace with your project description",
    },
    {
      title: "Project 4",
      description: "Replace with your project description",
    },
    {
      title: "Project 5",
      description: "Replace with your project description",
    },
  ]

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500) // Match this with transition duration
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length
    goToSlide(newIndex)
  }

  const goToPrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    goToSlide(newIndex)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative w-full" ref={carouselRef}>
      {/* Main carousel container */}
      <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-lg">
        {/* Glass panel effect container */}
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full flex-shrink-0 relative">
              {/* Image container */}
              <div className="absolute inset-0">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${projects[index].title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glossy glass panel overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] backdrop-saturate-150">
                {/* Glossy reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-2xl font-terminal uppercase mb-2">{projects[index].title}</h3>
                <p className="text-white/80 font-terminal">{projects[index].description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-6 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

