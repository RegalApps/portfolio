"use client"

const articles = [
  {
    title: "AI AGENTS: THE END OF THE APP PARADIGM",
    path: "/articles/ai-agents",
    date: "APR 12, 2025"
  },
  {
    title: "THE TERMINAL AESTHETIC: FUNCTION OVER FORM",
    path: "/articles/terminal-aesthetic",
    date: "APR 08, 2025"
  },
  {
    title: "TIME-TO-VALUE: THE ONLY METRIC THAT MATTERS",
    path: "/articles/time-to-value",
    date: "FEB 28, 2025"
  },
  {
    title: "FOUNDER-LED SALES: THE UNFAIR ADVANTAGE",
    path: "/articles/founder-led-sales",
    date: "JAN 15, 2025"
  }
];

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-terminal uppercase bg-white min-h-screen flex">
      {/* Left sidebar */}
      <div className="w-80 border-r border-gray-200 p-6 h-screen sticky top-0">
        <div className="mb-8">
          <a href="/" className="text-sm hover:underline">&lt; BACK</a>
        </div>
        
        <h2 className="text-sm font-bold mb-4">ALL ARTICLES_</h2>
        <nav className="space-y-4">
          {articles.map((article) => (
            <a
              key={article.path}
              href={article.path}
              className="block text-[10px] hover:text-gray-600 transition-colors"
            >
              <div className="font-bold">{article.title}</div>
              <div className="text-gray-400 mt-1">{article.date}</div>
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
