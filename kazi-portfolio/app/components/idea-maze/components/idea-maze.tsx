"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useMediaQuery } from "../hooks/use-mobile"

// Sample project data - replace with your own
const projects = [
  {
    id: "1",
    title: "Design System",
    description: "A comprehensive design system for web applications",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    title: "Mobile App",
    description: "Cross-platform mobile application for productivity",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    title: "Brand Identity",
    description: "Complete rebrand for a tech startup",
    year: 2021,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    title: "E-commerce Platform",
    description: "Online shopping experience with modern UI",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    title: "Data Visualization",
    description: "Interactive dashboard for complex data sets",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    title: "AR Experience",
    description: "Augmented reality project for retail",
    year: 2021,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    title: "Podcast Platform",
    description: "Audio streaming service with personalized recommendations",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    title: "Smart Home App",
    description: "IoT control interface for connected homes",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "9",
    title: "Fitness Tracker",
    description: "Health monitoring application with social features",
    year: 2021,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "10",
    title: "Travel Planner",
    description: "Itinerary builder with local recommendations",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "11",
    title: "Recipe App",
    description: "Culinary inspiration with step-by-step instructions",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "12",
    title: "Learning Platform",
    description: "Educational content with interactive exercises",
    year: 2021,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "13",
    title: "Weather App",
    description: "Hyperlocal forecasts with beautiful visualizations",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "14",
    title: "Music Streaming",
    description: "Audio platform with artist discovery features",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "15",
    title: "Task Manager",
    description: "Productivity tool with team collaboration",
    year: 2021,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "16",
    title: "Social Network",
    description: "Community platform for niche interests",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "17",
    title: "Photo Editor",
    description: "Creative tools for image manipulation",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "18",
    title: "News Aggregator",
    description: "Personalized content from diverse sources",
    year: 2021,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "19",
    title: "Video Platform",
    description: "Content sharing with creator monetization",
    year: 2023,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "20",
    title: "Finance Tracker",
    description: "Personal budgeting with investment insights",
    year: 2022,
    imageSrc: "/placeholder.svg?height=300&width=300",
  },
]

// Types for positions
interface Position {
  top: number
  left: number
  zIndex: number
  width: number
  height: number
}

interface Connection {
  from: number
  to: number
}

// Generate semi-random positions that don't overlap too much
const generatePositions = (count: number, containerWidth: number, containerHeight: number, isMobile: boolean) => {
  const positions: Position[] = []
  const baseSize = isMobile ? 70 : 100
  const padding = isMobile ? 10 : 20
  const minDistance = baseSize + padding

  // Create a grid to help with positioning
  const gridCellSize = baseSize + padding
  const gridCols = Math.floor(containerWidth / gridCellSize)
  const gridRows = Math.floor(containerHeight / gridCellSize)

  // For mobile, create a more structured layout with fewer random elements
  if (isMobile) {
    // Calculate how many items we can fit per row
    const itemsPerRow = Math.max(2, Math.floor(containerWidth / (baseSize + padding)))

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / itemsPerRow)
      const col = i % itemsPerRow

      // Add some slight randomness for visual interest
      const randomX = Math.random() * (padding * 0.8)
      const randomY = Math.random() * (padding * 0.8)

      // Calculate position
      const left = col * (containerWidth / itemsPerRow) + randomX
      const top = row * (baseSize + padding * 2) + randomY + padding

      // Random size variation (90-110% of base size)
      const sizeVariation = 0.9 + Math.random() * 0.2
      const width = baseSize * sizeVariation
      const height = baseSize * sizeVariation

      // Random z-index for layering effect
      const zIndex = Math.floor(Math.random() * 5) + 1

      positions.push({ top, left, zIndex, width, height })
    }
  } else {
    // Desktop layout - keep the original random placement
    // Track occupied cells
    const occupiedCells: Set<string> = new Set()

    for (let i = 0; i < count; i++) {
      let placed = false
      let attempts = 0
      const maxAttempts = 100

      while (!placed && attempts < maxAttempts) {
        attempts++

        // Get random grid position
        const gridCol = Math.floor(Math.random() * gridCols)
        const gridRow = Math.floor(Math.random() * gridRows)
        const cellKey = `${gridCol}-${gridRow}`

        // Check if cell is already occupied
        if (!occupiedCells.has(cellKey)) {
          // Add some randomness within the cell
          const randomX = Math.random() * padding
          const randomY = Math.random() * padding

          // Calculate actual position
          const left = gridCol * gridCellSize + randomX
          const top = gridRow * gridCellSize + randomY

          // Random size variation (80-120% of base size)
          const sizeVariation = 0.8 + Math.random() * 0.4
          const width = baseSize * sizeVariation
          const height = baseSize * sizeVariation

          // Random z-index for layering effect
          const zIndex = Math.floor(Math.random() * 10) + 1

          positions.push({ top, left, zIndex, width, height })
          occupiedCells.add(cellKey)
          placed = true
        }
      }

      // If we couldn't place after max attempts, just place it somewhere
      if (!placed) {
        const left = Math.random() * (containerWidth - baseSize)
        const top = Math.random() * (containerHeight - baseSize)
        positions.push({
          top,
          left,
          zIndex: Math.floor(Math.random() * 10) + 1,
          width: baseSize,
          height: baseSize,
        })
      }
    }
  }

  return positions
}

// Generate connections in sequential order (1->2->3->etc)
const generateSequentialConnections = (count: number): Connection[] => {
  const connections: Connection[] = []

  // Connect each node to the next one in sequence
  for (let i = 0; i < count - 1; i++) {
    connections.push({ from: i, to: i + 1 })
  }

  // Connect the last node back to the first to complete the loop
  connections.push({ from: count - 1, to: 0 })

  return connections
}

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    year: number
    imageSrc: string
  }
  position: Position
  index: number
  isMobile: boolean
}

const ProjectCard = ({ project, position, index, isMobile }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const expandedSize = isMobile ? 120 : 180

  // Determine if the card should be expanded
  const isExpanded = isMobile ? isTouched : isHovered

  return (
    <motion.div
      className={`absolute rounded-lg backdrop-blur-sm transition-all duration-300 overflow-hidden shadow-lg border ${
        isMobile ? "border-white/20" : "border-white/10"
      }`}
      style={{
        top: position.top,
        left: position.left,
        zIndex: isExpanded ? 50 : position.zIndex,
        width: position.width,
        height: position.height,
        background: isMobile ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)",
      }}
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: isExpanded ? 1 : isMobile ? 0.8 : 0.7,
        scale: isExpanded ? (isMobile ? 1.5 : 1.8) : 1,
        width: isExpanded ? expandedSize : position.width,
        height: isExpanded ? expandedSize : position.height,
      }}
      transition={{ duration: isMobile ? 0.2 : 0.3 }} // Faster transition for mobile
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsTouched(true)}
      onTouchEnd={() => isMobile && setIsTouched(false)}
      onTouchCancel={() => isMobile && setIsTouched(false)} // Handle touch cancel events too
      data-index={index}
    >
      <div className="relative w-full h-full">
        <Image
          src={project.imageSrc || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isExpanded ? "filter-none" : "filter blur-[1px] brightness-75"
          }`}
        />
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isExpanded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Index number overlay */}
        <div
          className={`absolute top-1 right-1 bg-black/70 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ${
            isMobile ? "border border-white/30" : ""
          }`}
        >
          {index + 1}
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isExpanded ? 1 : 0.6,
          y: isExpanded ? 0 : 10,
        }}
        transition={{ duration: isMobile ? 0.2 : 0.3 }} // Faster transition for mobile
      >
        <h3 className={`font-medium text-white truncate ${isMobile ? "text-xs" : "text-sm"}`}>{project.title}</h3>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: isMobile ? 0.2 : 0.3 }} // Faster transition for mobile
          className="overflow-hidden"
        >
          <p className="text-xs text-gray-200 mt-1 line-clamp-3">{project.description}</p>
          <p className="text-xs text-gray-300 mt-1">{project.year}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function IdeaMaze() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Position[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 800 })

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Generate positions and connections when container size changes
  useEffect(() => {
    const newPositions = generatePositions(projects.length, containerSize.width, containerSize.height, isMobile)
    setPositions(newPositions)
    // Use sequential connections instead of proximity-based connections
    setConnections(generateSequentialConnections(projects.length))
  }, [containerSize, isMobile])

  // Calculate container height for mobile
  const mobileContainerHeight = isMobile
    ? Math.ceil(projects.length / 2) * 100 + 100
    : // Estimate height based on number of projects
      800

  return (
    <div className="w-full py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Idea Maze</h2>
        <div
          ref={containerRef}
          className="relative w-full bg-black rounded-xl border border-white/10"
          style={{
            height: isMobile ? `${mobileContainerHeight}px` : "800px",
            overflowY: isMobile ? "auto" : "hidden",
            overflowX: "hidden",
          }}
        >
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {connections.map((connection, idx) => {
              if (!positions[connection.from] || !positions[connection.to]) return null

              const from = positions[connection.from]
              const to = positions[connection.to]

              // Calculate center points
              const x1 = from.left + from.width / 2
              const y1 = from.top + from.height / 2
              const x2 = to.left + to.width / 2
              const y2 = to.top + to.height / 2

              // For mobile, make lines more visible
              const strokeWidth = isMobile ? "2" : "1.5"
              const strokeOpacity = isMobile ? "0.3" : "0.2"

              return (
                <g key={`connection-${idx}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={`rgba(255, 255, 255, ${strokeOpacity})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isMobile ? "5 3" : "4 4"}
                  />

                  {/* Direction arrow */}
                  <polygon
                    points={`${x2},${y2} ${x2 - 5},${y2 - 3} ${x2 - 5},${y2 + 3}`}
                    transform={`rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI}, ${x2}, ${y2})`}
                    fill={`rgba(255, 255, 255, ${isMobile ? "0.5" : "0.4"})`}
                  />
                </g>
              )
            })}
          </svg>

          {/* Project cards */}
          {projects.map(
            (project, index) =>
              positions[index] && (
                <ProjectCard
                  key={project.id}
                  project={project}
                  position={positions[index]}
                  index={index}
                  isMobile={isMobile}
                />
              ),
          )}

          {/* Glow effects */}
          <div
            className={`absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent opacity-${isMobile ? "40" : "30"} pointer-events-none`}
          ></div>

          {/* Mobile instructions */}
          {isMobile && (
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/60 pointer-events-none">
              Press and hold to peek at details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
