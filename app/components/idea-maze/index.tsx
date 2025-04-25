"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useMediaQuery } from "./hooks/use-mobile"

// Sample project data - replace with your own
const projects = [
  {
    id: "1",
    title: "Ecom-design mobile",
    description: "An easy mobile app for designing, posting, and buying merchandise print-on-demand.",
    postmortem: "Wasn't profitable, and buyers stopped buying when interest rates exploded.",
    year: 2020,
  },
  {
    id: "2",
    title: "Online Store Platform",
    description: "Shopify competitor that connected to your Thred mobile app and provided a white-label online store.",
    postmortem: "Wasn't profitable, and buyers stopped buying when interest rates exploded. Not differentiated enough from Shopify.",
    year: 2020,
  },
  {
    id: "3",
    title: "NFT BigCommerce App",
    description: "A BigCommerce App for selling NFTs on BigCommerce.",
    postmortem: "Not enough enterprise value for BigCommerce's enterprise customers.",
    year: 2021,
  },
  {
    id: "4",
    title: "On-Chain Data Platform",
    description: "A nft token that follows users around their journey in web3 that they can monetize and sell to brands permissionlessly from a pool of contracts.",
    postmortem: "Would have needed a sufficiently large pool of consumer users to make it worthwhile to collect contract fees on. Too early.",
    year: 2021,
  },
  {
    id: "5",
    title: "Web3 Wallet & Appstore",
    description: "Design & Build your own custom wallet.",
    postmortem: "Started growing a personal brand on Farcaster to capture some demand. Went on a lot of customer interviews, but developers were happy to just build their bespoke wallets rather than use our platform. Monetization was unclear.",
    year: 2022,
  },
  {
    id: "6",
    title: "Vertical AI",
    description: "AI Workflow IDE in the browser.",
    postmortem: "Too early, AI workflows were still experimental at the time.",
    year: 2022,
  },
  {
    id: "7",
    title: "Unfathom",
    description: "AI 3D World Generator and editor in the browser.",
    postmortem: "Not high fidelity enough to be used in non-gaming scenarios, and gaming-tooling market is hard to sell tech like this to.",
    year: 2022,
  },
  {
    id: "8",
    title: "Dev Messaging (Linear for Slack)",
    description: "Messaging platform for developers - fast, sleek like Linear.",
    postmortem: "Not differentiated enough, insanely high switching cost from Slack.",
    year: 2023,
  },
  {
    id: "9",
    title: "Thred Developer Workspace",
    description: "Developer Workspace Platform that aggregated everything you need to do.",
    postmortem: "Not useful according to Scale AI Eng Lead - Linear can handle most of what is done here.",
    year: 2023,
  },
  {
    id: "10",
    title: "Loom for Customer Support",
    description: "Video-based Bug Reporting for Customers (Loom for Customer Support).",
    postmortem: "Too niche and incredibly small market.",
    year: 2023,
  },
  {
    id: "11",
    title: "User Management for Banking",
    description: "All-in-one User Identity platform for finance apps - Auth + Identity in one.",
    postmortem: "Combining Auth + Identity is great for NEW applications, the only problem being new fintech applications are at an all-time-low.",
    year: 2023,
  },
  {
    id: "12",
    title: "Milestone-based Payments",
    description: "Easy milestone-based payments in the browser. PayPal for Milestone-based payments.",
    postmortem: "People prefer to use Deel since it contains the payments and the compliance. For B2B Payments, Slope covers this.",
    year: 2024,
  },
  {
    id: "13",
    title: "Incentive Compensation Platform",
    description: "Easy sales commission planning and automation platform in the browser.",
    postmortem: "Salesforce offers this natively, and not enough of a pain point anymore (hard to differentiate).",
    year: 2025,
  },
  {
    id: "14",
    title: "Dynamic Custom Enterprise Plan API",
    description: "Ride on the decoupling of features trend. Allow for dynamic sales agreements that can be connected to product level changes. Power the custom plans button.",
    postmortem: "Not enough demand. Custom plans are generally the same +-1 feature. Not painful enough to require a dedicated service.",
    year: 2025,
  },
  {
    id: "15",
    title: "Enterprise Video Search",
    description: "Glean for video. Sync your video content from meetings and search across them.",
    postmortem: "Great, new technology – but too broad and not useful enough for meetings (why can't I just search the transcript?)",
    year: 2025,
  },
  {
    id: "16",
    title: "Enterprise Multi Modal Search API",
    description: "Integrate multi-modal content search in your app.",
    postmortem: "Devs only wanted our underlying 12labs infra. Our MM search was not critical. We weren't going to beat the industry experts on Video search alone. We had no edge.",
    year: 2025,
  },
  {
    id: "17",
    title: "On-Meeting Knowledge Search",
    description: "Document-based Platform that surfaces insights live on your meeting.",
    postmortem: "Great for tasks like nailing an interview, not so much for in-workplace use (I can memorize meeting info beforehand).",
    year: 2025,
  },
  {
    id: "18",
    title: "AI Parallel Dialer",
    description: "Parallel & Power Dialer for Sales Teams. AI-enhanced (outbound calling with AI).",
    postmortem: "Not differentiated enough from Nooks and Orum, and any innovation on the AI Outbound Calling front is curbed by new FCC laws.",
    year: 2025,
  },
  {
    id: "19",
    title: "Datadog for GTM",
    description: "Connect all your customer GTM touchpoints (email, meetings, slack) and have a unified view on what's happening in your GTM (competitor to Gong Data Platform).",
    postmortem: "Paused",
    year: 2025,
  },
  {
    id: "20",
    title: "Customer Migration Platform (CMP)",
    description: "An easy SDK that helps your customers migrate their data to your platform during sign up. Provides easy-to-use connectors for you to set up and lower the switching cost.",
    postmortem: "Mooning",
    year: 2025,
  }
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
    postmortem: string
    year: number
  }
  position: Position
  index: number
  isMobile: boolean
  containerWidth: number
  containerHeight: number
  activeCardIndex: number | null
  setActiveCardIndex: (index: number | null) => void
  totalCards: number
  navigateToCard: (index: number) => void
}

const ProjectCard = ({
  project,
  position,
  index,
  isMobile,
  containerWidth,
  containerHeight,
  activeCardIndex,
  setActiveCardIndex,
  totalCards,
  navigateToCard,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const expandedSize = isMobile ? 320 : 240 // Larger size on mobile to take up more screen space

  // Determine if the card should be expanded
  const isExpanded = isMobile
    ? activeCardIndex === index
    : isHovered

  // Calculate the transform origin and adjust position to prevent overflow
  const getCardStyles = () => {
    // Calculate center position of the card
    const centerX = position.left + position.width / 2
    const centerY = position.top + position.height / 2
    
    // Calculate relative position in the container (0-1)
    const relativeX = centerX / containerWidth
    const relativeY = centerY / containerHeight
    
    // Determine transform origin
    let originX = '50%'
    if (relativeX > 0.67) originX = '100%'
    else if (relativeX < 0.33) originX = '0%'
    
    let originY = '50%'
    if (relativeY > 0.67) originY = '100%'
    else if (relativeY < 0.33) originY = '0%'
    
    // Calculate position adjustments to prevent overflow
    let adjustedLeft = position.left
    let adjustedTop = position.top
    
    // If expanded on mobile, center the card on screen
    if (isExpanded && isMobile) {
      // Calculate the center position of the container
      const containerCenterX = containerWidth / 2
      const containerCenterY = containerHeight / 2
      
      // Position the card in the center of the screen
      adjustedLeft = containerCenterX - (expandedSize / 2)
      adjustedTop = containerCenterY - (expandedSize / 2)
      
      // Ensure the card stays within bounds
      adjustedLeft = Math.max(0, Math.min(adjustedLeft, containerWidth - expandedSize))
      adjustedTop = Math.max(0, Math.min(adjustedTop, containerHeight - expandedSize))
    } 
    // For desktop or non-expanded cards, use the original positioning logic
    else if (isExpanded) {
      adjustedLeft = Math.min(adjustedLeft, containerWidth - expandedSize)
      adjustedTop = Math.min(adjustedTop, containerHeight - expandedSize)
      adjustedLeft = Math.max(0, adjustedLeft)
      adjustedTop = Math.max(0, adjustedTop)
    }
    
    return {
      top: adjustedTop,
      left: adjustedLeft,
      zIndex: isExpanded ? 50 : position.zIndex,
      width: position.width,
      height: position.height,
      background: isMobile ? "rgba(242, 242, 242, 0.15)" : "rgba(242, 242, 242, 0.1)",
      transformOrigin: `${originX} ${originY}`
    }
  }

  // Handle navigation to next/previous card
  const handleNavigateNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextIndex = (index + 1) % totalCards
    navigateToCard(nextIndex)
  }

  const handleNavigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    const prevIndex = (index - 1 + totalCards) % totalCards
    navigateToCard(prevIndex)
  }

  // Handle card tap
  const handleCardTap = () => {
    if (isMobile) {
      if (activeCardIndex === index) {
        // If this card is already active, do nothing (will be handled by outside click)
        return
      } else {
        // Set this card as active
        setActiveCardIndex(index)
      }
    }
  }

  return (
    <motion.div
      className={`absolute rounded-none backdrop-blur-sm transition-all duration-300 overflow-hidden shadow-lg border ${
        isMobile ? "border-[#F2F2F2]/20" : "border-[#F2F2F2]/10"
      }`}
      style={getCardStyles()}
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: isExpanded ? 1 : isMobile ? 0.8 : 0.7,
        scale: 1,
        width: isExpanded ? expandedSize : position.width,
        height: isExpanded ? expandedSize : position.height,
      }}
      transition={{ duration: isMobile ? 0.2 : 0.3 }} // Faster transition for mobile
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={handleCardTap}
      data-index={index}
    >
      <div className="relative w-full h-full">
        {/* Index number overlay */}
        <div
          className={`absolute top-1 right-1 bg-black/70 text-[#F2F2F2] text-xs w-5 h-5 flex items-center justify-center rounded-full ${
            isMobile ? "border border-[#F2F2F2]/30" : ""
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
        <h3 className={`font-medium text-[#F2F2F2] truncate ${isMobile ? "text-xs" : "text-sm"}`}>{project.title}</h3>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: isMobile ? 0.2 : 0.3 }} // Faster transition for mobile
          className="overflow-hidden"
        >
          <p className="text-[10px] md:text-xs text-[#F2F2F2]/80 mt-1">{project.description}</p>
          <p className="text-[10px] md:text-xs text-[#F2F2F2]/60 mt-1">Year: {project.year}</p>
          {project.postmortem && (
            <div className="mt-2 p-2 bg-black/30 rounded">
              <p className="text-[10px] md:text-xs font-semibold text-[#F2F2F2]/50">Postmortem:</p>
              <p className="text-[10px] md:text-xs text-[#F2F2F2]/80">{project.postmortem}</p>
            </div>
          )}
          
          {/* Navigation arrows for mobile only */}
          {isExpanded && isMobile && (
            <div className="flex justify-between mt-3">
              <button 
                onClick={handleNavigatePrev}
                className="bg-black/50 text-[#F2F2F2]/80 rounded-full w-8 h-8 flex items-center justify-center border border-[#F2F2F2]/20 hover:bg-black/70"
              >
                ←
              </button>
              <button 
                onClick={handleNavigateNext}
                className="bg-black/50 text-[#F2F2F2]/80 rounded-full w-8 h-8 flex items-center justify-center border border-[#F2F2F2]/20 hover:bg-black/70"
              >
                →
              </button>
            </div>
          )}
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
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)

  // Function to handle navigation between cards
  const navigateToCard = (index: number) => {
    setActiveCardIndex(index)
  }

  // Handle clicks outside of cards to close the active card
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile && activeCardIndex !== null) {
      // Check if the click was on a card
      const target = e.target as HTMLElement
      const isCardClick = target.closest('[data-index]')

      // If not clicking on a card, close the active card
      if (!isCardClick) {
        setActiveCardIndex(null)
      }
    }
  }

  const updateSize = () => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }

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

  // Dynamically calculate container height for mobile based on positioned cards
  const mobileContainerHeight = isMobile && positions.length
    ? Math.max(...positions.map(p => p.top + p.height)) + 80 // add padding
    : 800

  return (
    <div className="w-full py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title Box for Idea Maze */}
        <div className="w-full max-w-3xl mx-auto mb-8">
          <div className="bg-black rounded-none p-8 text-[#F2F2F2] font-inter text-center shadow-lg border border-[#F2F2F2]/10">
            <p className="text-sm md:text-base tracking-tight leading-tight">
              The winding path of insights, pivots, and lessons that lead to breakthrough products. Here, I share the frameworks, mental models, and hard-won lessons that shape my approach to building and scaling B2B SaaS.
            </p>
          </div>
        </div>
        <div
          ref={containerRef}
          className="relative w-full bg-black rounded-none border border-[#F2F2F2]/10"
          style={{
            height: isMobile ? `${mobileContainerHeight}px` : "800px",
            overflowY: isMobile ? "auto" : "hidden",
            overflowX: "hidden",
          }}
          onClick={handleOutsideClick}
        >
          {/* Semi-transparent overlay when a card is active on mobile */}
          {isMobile && activeCardIndex !== null && (
            <div 
              className="absolute inset-0 bg-black/70 z-40 pointer-events-none"
              style={{ transition: "opacity 0.3s ease" }}
            />
          )}

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
                    stroke={`rgba(242, 242, 242, ${strokeOpacity})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isMobile ? "5 3" : "4 4"}
                  />

                  {/* Direction arrow */}
                  <polygon
                    points={`${x2},${y2} ${x2 - 5},${y2 - 3} ${x2 - 5},${y2 + 3}`}
                    transform={`rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI}, ${x2}, ${y2})`}
                    fill={`rgba(242, 242, 242, ${isMobile ? "0.5" : "0.4"})`}
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
                  containerWidth={containerSize.width}
                  containerHeight={containerSize.height}
                  activeCardIndex={activeCardIndex}
                  setActiveCardIndex={setActiveCardIndex}
                  totalCards={projects.length}
                  navigateToCard={(index: number) => navigateToCard(index)}
                />
              ),
          )}

          {/* Glow effects */}
          <div
            className={`absolute inset-0 bg-gradient-radial from-[#F2F2F2]/10 to-transparent opacity-${isMobile ? "40" : "30"} pointer-events-none`}
          ></div>

          {/* Mobile instructions */}
          {isMobile && (
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-[#F2F2F2]/60 pointer-events-none">
              Pick a card. Any card.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
