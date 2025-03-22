"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function GlassCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Images - reduced to only 3 slides
  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0vSuuFB27QXoigWoGqTiKJuUa7vAG8.png", // Rev0 image
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2JZnUgNB77gy7AzPOOwVVEc5VStnAg.png", // Updated Rev0 AI Sales Manager image
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o1oaQm0fD6dSjpQCzwzLgNHlBYJj8L.png", // Rev0 AI DevOps Platform image
  ]

  // Project titles and descriptions - reduced to only 3 projects
  const projects = [
    {
      title: "Rev0",
      description: "D2C AI Voice/Text Campaign Manager",
    },
    {
      title: "REV0",
      description: "AI SALES MANAGER",
    },
    {
      title: "REV0",
      description: "AI DevOps Platform",
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

  // Helper function to determine image styling based on index
  const getImageStyle = (index: number) => {
    if (index === 0) {
      // First image - make it bigger
      return {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1.1)",
        maxWidth: "95%",
        maxHeight: "95%",
      }
    } else if (index === 1 || index === 2) {
      // Second and third images - keep them smaller
      return {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "85%",
        maxHeight: "85%",
      }
    }
    // Default styling for other images
    return {}
  }

  return (
    <div className="relative w-full" ref={carouselRef}>
      {/* Main carousel container */}
      <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-lg">
        {/* Carousel slides container */}
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
                  alt={`${projects[index].title}: ${projects[index].description}`}
                  className="w-full h-full object-contain bg-white"
                  style={getImageStyle(index)}
                />

                {/* Caption overlay at the bottom - button-like */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-black/70 text-center rounded-md inline-block">
                  <h3 className="text-white text-sm font-terminal uppercase whitespace-nowrap">
                    {projects[index].title}: <span className="text-xs opacity-80">{projects[index].description}</span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
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

