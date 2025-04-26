"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import "./globals.css"
import {
  Search,
  Moon,
  Sun,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Compass,
  Users,
  ArrowRightCircle,
  TrendingUp,
  LineChart,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Types for our framework data
type FrameworkStage =
  | "problem-discovery"
  | "customer-validation"
  | "market-signals"
  | "minimum-experiments"
  | "rapid-iteration"

type ResourceType = "insight" | "question" | "warning" | "checklist" | "signal" | "method"

type FrameworkItem = {
  id: string
  title: string
  stage: FrameworkStage
  type: ResourceType
  description: string
  questions: string[]
  resources?: string[]
}

// Type for chat messages
type ChatMessage = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

// Updated framework data focusing on 0-1 phase
const founderFramework: FrameworkItem[] = [
  {
    id: "1",
    title: "Problem Exploration",
    stage: "problem-discovery",
    type: "method",
    description:
      "Identify and deeply understand real problems worth solving. Focus on finding pain points that are urgent, pervasive, and that customers will pay to solve.",
    questions: [
      "What specific pain points are businesses experiencing in your target domain?",
      "How are people currently solving this problem?",
      "Is this problem a vitamin (nice-to-have) or a painkiller (must-have)?",
      "What is the frequency and intensity of this pain point?",
    ],
    resources: [
      "Look for workarounds people are already using",
      "Observe potential customers in their natural environment",
      "Identify areas where people are spending significant time or money",
      "Search for complaints, frustrations, or inefficiencies in workflows",
    ],
  },
  {
    id: "2",
    title: "Problem Prioritization",
    stage: "problem-discovery",
    type: "checklist",
    description:
      "Not all problems are worth solving. Evaluate and rank potential problems based on urgency, market size, and your ability to solve them effectively.",
    questions: [
      "Is this problem urgent enough that customers need a solution now?",
      "Is this problem specific and focused rather than broad and vague?",
      "Does solving this problem align with your expertise or interests?",
      "Can you identify at least 10 people who have this problem?",
    ],
    resources: [
      "Create a problem scorecard with criteria like urgency, frequency, and willingness to pay",
      "Evaluate each problem with potential customers, not just your assumptions",
      "Test for actual behavior, not just stated preferences",
    ],
  },
  {
    id: "3",
    title: "Customer Discovery",
    stage: "customer-validation",
    type: "method",
    description:
      "Deeply understand your potential customers through direct conversations. Focus on learning, not selling or validating your idea.",
    questions: [
      "Who specifically experiences this problem most acutely?",
      "What does their current workflow or solution look like?",
      "What have they tried before to solve this problem?",
      "What would an ideal solution look like to them?",
    ],
    resources: [
      "Conduct at least 40 customer interviews before writing any code",
      "Use open-ended questions that avoid leading the customer",
      "Focus on past behavior, not hypothetical future actions",
      "Look for patterns and emotional responses",
    ],
  },
  {
    id: "4",
    title: "Demand Signals",
    stage: "market-signals",
    type: "signal",
    description:
      "Identify evidence that there is genuine demand for a solution to this problem. Look for signals that indicate market pull rather than pushing your solution.",
    questions: [
      "Are potential customers actively looking for solutions?",
      "Are they currently spending money to solve this problem?",
      "Have you identified workarounds they've built themselves?",
      "Is there evidence of growing interest or urgency around this problem?",
    ],
    resources: [
      "Search trends analysis for problem-related keywords",
      "Look for DIY solutions and workarounds in forums and communities",
      "Analyze spending patterns in adjacent solutions",
      "Track community growth around the problem space",
    ],
  },
  {
    id: "5",
    title: "Market Sizing Experiments",
    stage: "market-signals",
    type: "method",
    description:
      "Run simple experiments to gauge market size without building a product. Validate that the market is large enough to support a business.",
    questions: [
      "How many potential customers exist for this solution?",
      "What percentage of them recognize having this problem?",
      "What percentage actively seek solutions?",
      "How much are they willing to pay to solve this problem?",
    ],
    resources: [
      "Create search ads for your hypothetical solution to measure click-through rates",
      "Build landing pages with different value propositions to test conversion rates",
      "Analyze search volume for problem-related keywords",
      "Use micro-surveys in relevant communities",
    ],
  },
  {
    id: "6",
    title: "Pre-Product Validation",
    stage: "customer-validation",
    type: "checklist",
    description:
      "Validate demand and willingness to pay before building a product. Look for concrete commitment signals beyond verbal interest.",
    questions: [
      "Have customers explicitly asked you to build this solution?",
      "Are customers willing to pre-pay for your solution?",
      "Will customers introduce you to others who might need this solution?",
      "Are customers willing to participate in your development process?",
    ],
    resources: [
      "Collect pre-orders or deposits before building",
      "Create a waitlist and measure conversion",
      "Test if customers will take specific actions (not just express interest)",
      "Look for customers who follow up with you unprompted",
    ],
  },
  {
    id: "7",
    title: "Minimum Viable Experiment",
    stage: "minimum-experiments",
    type: "method",
    description:
      "Design the simplest possible test to validate your core hypothesis. Focus on learning, not building features or a polished product.",
    questions: [
      "What is the core hypothesis you need to validate?",
      "What is the simplest experiment to test this hypothesis?",
      "What specific metrics will indicate success or failure?",
      "How quickly can you run this experiment and learn from it?",
    ],
    resources: [
      "Use no-code tools to simulate functionality",
      "Consider concierge MVPs where you provide the service manually",
      "Create a 'fake door' test to measure interest",
      "Determine your minimum success criteria before running the experiment",
    ],
  },
  {
    id: "8",
    title: "Wizard of Oz Testing",
    stage: "minimum-experiments",
    type: "method",
    description:
      "Create the illusion of a working product by manually performing tasks behind the scenes. This allows you to test demand without building technology.",
    questions: [
      "What parts of your solution can be done manually at first?",
      "How can you create the appearance of automation?",
      "What specific customer behaviors are you trying to validate?",
      "How will you measure success in this manual version?",
    ],
    resources: [
      "Use existing tools combined with manual processes",
      "Create simple interfaces that hide manual work",
      "Focus on delivering the core value proposition, not efficiency",
      "Document exactly what parts of the process customers value most",
    ],
  },
  {
    id: "9",
    title: "Pivot Indicators",
    stage: "rapid-iteration",
    type: "warning",
    description:
      "Recognize when your current approach isn't working and you need to change direction. Identify clear signals that indicate a need to pivot.",
    questions: [
      "Are customers using your solution differently than you expected?",
      "Is customer acquisition significantly harder than anticipated?",
      "Are customers excited about a specific feature but indifferent to others?",
      "Has feedback consistently pointed in a different direction?",
    ],
    resources: [
      "Define pivot triggers before you start (e.g., 'If we can't get 10 customers in 30 days')",
      "Look for unexpected use patterns that suggest hidden opportunities",
      "Pay attention to what customers do, not just what they say",
      "Track which features actually drive engagement versus which you thought would",
    ],
  },
  {
    id: "10",
    title: "Rapid Iteration Framework",
    stage: "rapid-iteration",
    type: "method",
    description:
      "Create a systematic process for quickly testing ideas, measuring results, learning, and improving. Minimize the time between iterations.",
    questions: [
      "How quickly can you complete a full build-measure-learn cycle?",
      "What specific metrics are you tracking for each iteration?",
      "How do you capture and incorporate user feedback?",
      "What is your process for prioritizing changes based on feedback?",
    ],
    resources: [
      "Establish a regular cadence for releases and feedback collection",
      "Create a simple dashboard of key metrics to track progress",
      "Implement lightweight customer feedback mechanisms",
      "Document learnings from each iteration",
    ],
  },
  {
    id: "11",
    title: "Early Adopter Identification",
    stage: "customer-validation",
    type: "insight",
    description:
      "Identify and engage with the specific subset of customers who will be the first to adopt your solution. These are not average customers.",
    questions: [
      "Who feels this pain point most acutely?",
      "Who has already tried to solve this problem themselves?",
      "Who has the budget and authority to try new solutions?",
      "Who stands to gain the most if this problem is solved?",
    ],
    resources: [
      "Look for customers currently using workarounds or manual processes",
      "Identify those who have recently searched for solutions",
      "Find communities where people discuss this problem",
      "Target customers who have tried competitive or adjacent solutions",
    ],
  },
  {
    id: "12",
    title: "Problem-Solution Fit",
    stage: "market-signals",
    type: "signal",
    description:
      "Verify that your solution actually addresses the problem in a way customers value and will pay for. This precedes product-market fit.",
    questions: [
      "Does your solution address the core pain point effectively?",
      "Are customers willing to change their behavior to use your solution?",
      "Are customers getting measurable value from your solution?",
      "Are customers actively using your solution without prompting?",
    ],
    resources: [
      "Measure specific problem resolution metrics",
      "Track time to value for new users",
      "Monitor usage frequency and patterns",
      "Collect testimonials specifically about problem resolution",
    ],
  },
  {
    id: "13",
    title: "Pricing Discovery",
    stage: "market-signals",
    type: "method",
    description:
      "Discover what customers are willing to pay based on the value they receive, not your costs or what competitors charge.",
    questions: [
      "How much does this problem cost customers today?",
      "What value does your solution provide in time or money saved?",
      "How does pricing affect conversion and adoption rates?",
      "What pricing model aligns with how customers perceive value?",
    ],
    resources: [
      "Test different price points with actual sales attempts",
      "Calculate the customer's cost of the problem",
      "Measure price sensitivity through structured experiments",
      "Consider value-based pricing models",
    ],
  },
  {
    id: "14",
    title: "Learning Metrics",
    stage: "rapid-iteration",
    type: "signal",
    description:
      "Establish metrics that focus on learning and validation rather than traditional growth metrics. These measure your progress toward finding product-market fit.",
    questions: [
      "How many validated learning moments have you experienced?",
      "What percentage of your hypotheses have been validated or invalidated?",
      "How has customer feedback changed your understanding of the problem?",
      "Are you faster at implementing and testing new ideas than when you started?",
    ],
    resources: [
      "Track hypothesis validation/invalidation rates",
      "Measure speed of build-measure-learn cycles",
      "Document key customer insights and how they changed your approach",
      "Create a learning scorecard for team accountability",
    ],
  },
  {
    id: "15",
    title: "Market Pull Evidence",
    stage: "customer-validation",
    type: "signal",
    description:
      "Collect concrete evidence that customers are pulling your product into the market rather than you pushing it. This indicates genuine demand.",
    questions: [
      "Are customers referring others without incentives?",
      "Are customers reaching out to you for updates or new features?",
      "Are customers willing to be case studies or testimonials?",
      "Are customers using your product more frequently over time?",
    ],
    resources: [
      "Track unprompted referrals and word-of-mouth",
      "Monitor inbound request frequency",
      "Measure expansion of use within customer organizations",
      "Document cases where customers champion your product to others",
    ],
  },
]

// Sample AI responses based on framework item type
const aiResponses: Record<ResourceType, string[]> = {
  insight: [
    "That's a valuable observation. How can you validate this insight with real customer data?",
    "Insights like this are critical in the 0-1 phase. What evidence supports this in your specific context?",
    "This insight could be a differentiator. How have you tested it with potential customers?",
  ],
  question: [
    "Great question to explore. What methods are you using to find the answer?",
    "This question often reveals hidden assumptions. What data would help you answer it definitively?",
    "Many founders struggle with this question. What signals would indicate you're on the right track?",
  ],
  warning: [
    "This is a common pitfall in the 0-1 phase. How are you monitoring for this risk?",
    "Good to be aware of this warning sign. What triggers have you defined to know when to pivot?",
    "This warning has derailed many early-stage startups. What's your plan if you encounter this?",
  ],
  checklist: [
    "This checklist can help validate your direction. Which items have you completed?",
    "Working through validation checklists methodically is valuable. Where are you in this process?",
    "This structured approach helps avoid confirmation bias. How are you tracking these validation steps?",
  ],
  signal: [
    "Market signals are crucial for validation. Which of these signals are you seeing in your customer interactions?",
    "These indicators help distinguish real demand from wishful thinking. What specific evidence are you collecting?",
    "Strong market pull signals reduce founder bias. How are you measuring these in your customer discovery process?",
  ],
  method: [
    "This method can accelerate your validation process. How have you adapted it for your specific context?",
    "Systematic approaches like this help bring clarity. What results have you seen from applying this method?",
    "This framework can help structure your exploration. How are you documenting the outcomes from this approach?",
  ],
}

// Component to render the resource type icon
function ResourceTypeIcon({ type }: { type: ResourceType }) {
  switch (type) {
    case "insight":
      return <Lightbulb className="h-3 w-3 text-amber-400" />
    case "question":
      return <HelpCircle className="h-3 w-3 text-blue-400" />
    case "warning":
      return <AlertTriangle className="h-3 w-3 text-red-400" />
    case "checklist":
      return <CheckCircle className="h-3 w-3 text-green-400" />
    case "signal":
      return <LineChart className="h-3 w-3 text-purple-400" />
    case "method":
      return <Compass className="h-3 w-3 text-blue-500" />
  }
}

// Component to render the stage badge
function StageBadge({ stage }: { stage: FrameworkStage }) {
  switch (stage) {
    case "problem-discovery":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-800 text-yellow-100 border-yellow-200 font-normal rounded-sm px-1.5 py-0 h-4 text-[10px] uppercase dark:bg-yellow-200 dark:text-yellow-900 dark:border-yellow-700"
        >
          Problem Discovery
        </Badge>
      )
    case "customer-validation":
      return (
        <Badge
          variant="outline"
          className="bg-teal-800 text-teal-100 border-teal-200 font-normal rounded-sm px-1.5 py-0 h-4 text-[10px] uppercase dark:bg-teal-200 dark:text-teal-900 dark:border-teal-700"
        >
          Customer Validation
        </Badge>
      )
    case "market-signals":
      return (
        <Badge
          variant="outline"
          className="bg-green-800 text-green-100 border-green-200 font-normal rounded-sm px-1.5 py-0 h-4 text-[10px] uppercase dark:bg-green-200 dark:text-green-900 dark:border-green-700"
        >
          Market Signals
        </Badge>
      )
    case "minimum-experiments":
      return (
        <Badge
          variant="outline"
          className="bg-purple-800 text-purple-100 border-purple-200 font-normal rounded-sm px-1.5 py-0 h-4 text-[10px] uppercase dark:bg-purple-200 dark:text-purple-900 dark:border-purple-700"
        >
          Minimum Experiments
        </Badge>
      )
    case "rapid-iteration":
      return (
        <Badge
          variant="outline"
          className="bg-red-800 text-red-100 border-red-200 font-normal rounded-sm px-1.5 py-0 h-4 text-[10px] uppercase dark:bg-red-200 dark:text-red-900 dark:border-red-700"
        >
          Rapid Iteration
        </Badge>
      )
  }
}

export default function FounderFramework() {
  const [activeTab, setActiveTab] = useState<FrameworkStage | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<FrameworkItem | null>(null)
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)

  // Filter framework items based on active tab and search query
  const filteredItems = founderFramework.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.questions.some((q) => q.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (activeTab === "all") return true
    return item.stage === activeTab
  })

  // Handle expanding/collapsing an item
  const toggleExpandItem = (itemId: string) => {
    setExpandedItemId((prev) => (prev === itemId ? null : itemId))
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Terminal-style dashboard */}
      <div className="p-4 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="terminal-header px-3 py-1 uppercase font-bold">0-1 FOUNDER'S FRAMEWORK</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="terminal-muted uppercase">MARKET VALIDATION MENTAL MODEL</div>
              </div>
              <div className="mb-4 uppercase">
                VALIDATE REAL DEMAND{' '}
                <span className="font-normal">BEFORE WRITING CODE</span>
              </div>

              <div className="mb-6">
                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>01</div>
                  </div>
                  <div>
                    <div className={`text-black`}>DISCOVER REAL PROBLEMS</div>
                    <div className="terminal-muted">Find pain points people will pay to solve</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>02</div>
                  </div>
                  <div>
                    <div className={`text-black`}>GATHER EVIDENCE</div>
                    <div className="terminal-muted">Talk to 40+ potential users before any code</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>03</div>
                  </div>
                  <div>
                    <div className={`text-black`}>TEST WITHOUT BUILDING</div>
                    <div className="terminal-muted">Run experiments that prove market pull</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>04</div>
                  </div>
                  <div>
                    <div className={`text-black`}>GET COMMITMENTS</div>
                    <div className="terminal-muted">Secure pre-orders or other concrete commitments</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>05</div>
                  </div>
                  <div>
                    <div className={`text-black`}>ITERATE & PIVOT</div>
                    <div className="terminal-muted">Learn from market signals and adapt quickly</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 uppercase">MARKET VALIDATION SIGNALS</div>

              <div className="mb-6">
                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>
                      <TrendingUp className="h-4 w-4 inline" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-black`}>UNPROMPTED DEMAND</div>
                    <div className="terminal-muted">Customers ask when they can get your solution</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>
                      <Users className="h-4 w-4 inline" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-black`}>ORGANIC REFERRALS</div>
                    <div className="terminal-muted">Customers introduce you to others without incentives</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-24 text-right pr-4">
                    <div className={`text-black font-normal`}>
                      <ArrowRightCircle className="h-4 w-4 inline" />
                    </div>
                  </div>
                  <div>
                    <div className={`text-black`}>COMMITMENT CONVERSION</div>
                    <div className="terminal-muted">% who move from interest to concrete commitment</div>
                  </div>
                </div>
              </div>

              <div className="mb-4 uppercase">REFLECTION QUESTIONS</div>
              <div className="mb-6">
                <div className="terminal-muted mb-2">
                  Would customers proactively seek out your solution if they knew it existed?
                </div>
                <div className="terminal-muted mb-2">
                  Are you solving a problem that customers recognize and prioritize?
                </div>
                <div className="terminal-muted mb-2">
                  What evidence do you have that this is a market pull versus a product push?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - Framework Overview */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto overflow-hidden p-4">
          {/* Framework navigation tabs - moved to the top */}
          <div className="mb-4">
            <nav className="flex flex-wrap gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("all")}
                className={`metallic-button text-xs ${activeTab === "all" ? "active" : ""}`}
              >
                All Stages
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("problem-discovery")}
                className={`metallic-button text-xs ${activeTab === "problem-discovery" ? "active" : ""}`}
              >
                Problem Discovery
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("customer-validation")}
                className={`metallic-button text-xs ${activeTab === "customer-validation" ? "active" : ""}`}
              >
                Customer Validation
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("market-signals")}
                className={`metallic-button text-xs ${activeTab === "market-signals" ? "active" : ""}`}
              >
                Market Signals
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("minimum-experiments")}
                className={`metallic-button text-xs ${activeTab === "minimum-experiments" ? "active" : ""}`}
              >
                Minimum Experiments
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("rapid-iteration")}
                className={`metallic-button text-xs ${activeTab === "rapid-iteration" ? "active" : ""}`}
              >
                Rapid Iteration
              </Button>
            </nav>

            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
              <Input
                className="pl-8 h-7 text-sm rounded-md terminal-input focus-visible:ring-1 focus-visible:ring-offset-0"
                placeholder="Search framework items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 card-stack">
            {filteredItems.map((item) => (
              <div key={item.id} className={`transition-all duration-300 ${expandedItemId === item.id ? "z-10" : ""}`}>
                <div
                  className={`border transition-all duration-200 
                  ${
                    expandedItemId === item.id
                      ? "metallic-card active payphone-button-effect"
                      : "metallic-card payphone-button-effect"
                  }`}
                >
                  {/* Card header - always visible */}
                  <div
                    className="flex justify-between items-start cursor-pointer p-4"
                    onClick={() => toggleExpandItem(item.id)}
                  >
                    <div>
                      <div className="font-medium text-black uppercase">{item.title}</div>
                      <div className="text-sm terminal-muted uppercase flex items-center gap-1.5">
                        <ResourceTypeIcon type={item.type} />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StageBadge stage={item.stage} />
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${expandedItemId === item.id ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded content - only visible when expanded */}
                  <AnimatePresence>
                    {expandedItemId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-0 border-t terminal-border"
                      >
                        <div className="text-sm mb-4 text-black">{item.description}</div>

                        <div className="mb-4">
                          <div className="text-xs uppercase text-black mb-2">KEY QUESTIONS</div>
                          <div className="space-y-2">
                            {item.questions.map((question, index) => (
                              <div key={index} className="terminal-accent p-2 rounded border terminal-border">
                                <div className="text-xs text-black">{question}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {item.resources && (
                          <div className="mb-4">
                            <div className="text-xs uppercase text-black mb-2">RESOURCES</div>
                            <div className="space-y-2">
                              {item.resources.map((resource, index) => (
                                <div key={index} className="text-xs terminal-muted">
                                  • {resource}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="p-8 text-center terminal-muted">No framework items found matching your search.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
