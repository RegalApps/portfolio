"use client"

import { GlassCarousel } from "./components/glass-carousel"

export default function Home() {
  return (
    <div className="font-terminal uppercase relative">
      {/* Hero Section with fixed height */}
      <section className="h-screen relative overflow-hidden">
        {/* SVG overlay with fixed positioning - only in hero section */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kazi-GCOyN7IPNWNMTIiN29rQtREA8R6gvl.svg"
            alt="Kazi"
            className="h-screen w-auto max-w-none translate-x-[10%] object-contain object-center"
          />
        </div>

        {/* Layout container with fixed structure */}
        <div className="flex flex-col h-full">
          {/* Top white section with fixed height */}
          <div className="bg-white text-black h-[300px] w-full px-[69px] relative z-10">
            {/* Corner text elements with fixed positions */}
            <div className="absolute top-4 left-4 text-black font-extrabold text-lg z-30">DOMINATE</div>
            <div className="absolute top-4 right-4 text-black font-extrabold text-lg z-30">RELENTLESS</div>
            <div className="absolute bottom-4 left-4 text-black font-extrabold text-lg z-30">EXECUTE</div>
            <div className="absolute bottom-4 right-4 text-black font-extrabold text-lg z-30">FEROCITY</div>
          </div>

          {/* Middle black section with flex-grow to adapt length */}
          <div className="bg-black text-white flex-grow w-full px-12 flex flex-col justify-between relative z-10">
            {/* Left-aligned text with fixed positioning */}
            <div className="mt-16 relative h-[calc(6.98rem+4.65rem+70px)]">
              <div className="absolute top-[20px] -left-4 text-[4.65rem] leading-none">KAZI</div>
              <div className="absolute top-[calc(4.65rem+20px)] -left-4 text-[6.98rem] font-normal leading-none">
                UNCENSORED
              </div>
            </div>

            {/* Navigation with fixed positioning */}
            <div className="absolute bottom-4 left-8 z-50 flex flex-col space-y-1 bg-black bg-opacity-80 p-1 md:p-0 md:bg-transparent">
              <a href="/projects" className="hover-underline-animation">
                PROJECTS.
              </a>
              <a href="/essays" className="hover-underline-animation">
                ESSAYS.
              </a>
              <a href="/videos" className="hover-underline-animation">
                VIDEOS.
              </a>
            </div>
          </div>

          {/* Bottom white section with fixed height */}
          <div className="bg-white text-black h-10 w-full px-8 flex items-center relative z-10">
            <div className="ml-0 z-50 relative bg-white bg-opacity-80 p-1 md:p-0 md:bg-transparent">FOUNDER DNA.</div>
          </div>
        </div>
      </section>

      {/* Terminal-style Portfolio Section */}
      <section className="bg-black text-white min-h-screen w-full pt-[calc(4rem+100px)] pb-[calc(4rem+100px)] px-6 md:px-12">
        {/* Philosophy Text Boxes - positioned like in the reference */}
        <div className="max-w-7xl mx-auto relative mb-20">
          {/* Left-aligned text box - philosophy statement */}
          <div className="bg-white text-black p-6 max-w-lg mb-10 ml-[5%] lg:ml-0">
            <p className="text-sm md:text-base tracking-tight leading-tight">
              I CREATE PRODUCTS WITH THE ESSENCE I WANT TO COMMUNICATE IN MIND. NOT ALL THAT DIFFERENT FROM THE GENETIC
              FOOTPRINT IMPRINTED ON OFFSPRING...
            </p>
          </div>

          {/* Right-aligned text box - design statement */}
          <div className="bg-white text-black p-6 max-w-lg ml-auto mr-[10%] mt-[104px]">
            <p className="text-sm md:text-base tracking-tight leading-tight">
              IDEA→DESIGN→DISCOVER→BUILD WELL DESIGNED PRODUCTS CREATE THE NECESSARY VECTORS FOR CAPTURING THE ZEITGEIST
              IN A BOTTLE.
            </p>
          </div>
        </div>

        {/* Main work display - optimized layout for terminal interfaces */}
        <div className="w-full max-w-[100vw] mx-auto mt-20 flex flex-col lg:flex-row">
          {/* Left terminal interface - Using the provided image directly */}
          <div className="bg-black overflow-hidden lg:ml-[-5rem] xl:ml-[-8rem] relative -mt-[200px] lg:w-1/2">
            <a href="https://sales-terminal.vercel.app/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cu9PclNBoGCrZwQCpERpxphiNcFggU.png"
                alt="Terminal Interface"
                className="w-[100%] h-auto max-w-none"
              />
            </a>
          </div>

          {/* Right terminal interface - Using the provided migration issues image */}
          <div className="bg-black overflow-hidden lg:w-1/2 lg:ml-auto">
            <a href="https://thred-sdk.vercel.app/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LoXJAUKx14B6KnNumBZkpqFaDjuL2x.png"
                alt="Potential Migration Issues"
                className="w-full h-auto object-cover"
              />
            </a>
          </div>
        </div>
      </section>

      {/* White Section with Glossy Glass Panel Carousel */}
      <section className="bg-white text-black pt-40 pb-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main heading */}
          <h2 className="text-2xl md:text-3xl font-terminal uppercase mb-4 tracking-tight text-center font-bold">
            FOUNDER LED SALES. TIME TO VALUE. DESIGN.
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl font-terminal uppercase mb-12 tracking-tight text-center opacity-80">
            I tie an elastic band around my forearm, *tap *tap.. find a vein and inject b2b saas.
          </p>

          {/* Glossy Glass Panel Carousel */}
          <GlassCarousel />
        </div>
      </section>

      {/* Essays Section - Black background */}
      <section className="bg-black text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <h2 className="text-2xl md:text-3xl font-terminal uppercase mb-8 tracking-tight">
            ESSAYS_<span className="text-gray-400 animate-pulse">|</span>
          </h2>

          {/* Essays list in terminal style */}
          <div className="space-y-12">
            {/* Essay 1 */}
            <div className="border-l-2 border-white pl-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold">FOUNDER-LED SALES: THE UNFAIR ADVANTAGE</h3>
                <span className="text-gray-400 text-sm">2023-11-15</span>
              </div>
              <p className="text-gray-300 mb-3">
                WHY FOUNDERS WHO SELL OUTPERFORM THOSE WHO DON'T. THE PSYCHOLOGY OF BUYING FROM CREATORS VS HIRED GUNS.
              </p>
              <a
                href="#"
                className="inline-block border border-white px-3 py-1 text-sm hover:bg-white hover:text-black transition-colors duration-300"
              >
                READ_POST.EXE
              </a>
            </div>

            {/* Essay 2 */}
            <div className="border-l-2 border-white pl-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold">TIME-TO-VALUE: THE ONLY METRIC THAT MATTERS</h3>
                <span className="text-gray-400 text-sm">2023-09-22</span>
              </div>
              <p className="text-gray-300 mb-3">
                HOW THE FASTEST GROWING B2B SAAS COMPANIES OPTIMIZE FOR IMMEDIATE VALUE DELIVERY OVER EVERYTHING ELSE.
              </p>
              <a
                href="#"
                className="inline-block border border-white px-3 py-1 text-sm hover:bg-white hover:text-black transition-colors duration-300"
              >
                READ_POST.EXE
              </a>
            </div>

            {/* Essay 3 */}
            <div className="border-l-2 border-white pl-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold">THE TERMINAL AESTHETIC: FUNCTION OVER FORM</h3>
                <span className="text-gray-400 text-sm">2023-08-07</span>
              </div>
              <p className="text-gray-300 mb-3">
                WHY THE RETURN TO COMMAND-LINE INTERFACES AND BRUTALIST DESIGN IS WINNING IN B2B SOFTWARE.
              </p>
              <a
                href="#"
                className="inline-block border border-white px-3 py-1 text-sm hover:bg-white hover:text-black transition-colors duration-300"
              >
                READ_POST.EXE
              </a>
            </div>

            {/* Essay 4 */}
            <div className="border-l-2 border-white pl-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold">AI AGENTS: THE END OF THE APP PARADIGM</h3>
                <span className="text-gray-400 text-sm">2023-07-14</span>
              </div>
              <p className="text-gray-300 mb-3">
                HOW AI AGENTS WILL REPLACE TRADITIONAL SOFTWARE INTERFACES AND WHAT IT MEANS FOR PRODUCT DESIGNERS.
              </p>
              <a
                href="#"
                className="inline-block border border-white px-3 py-1 text-sm hover:bg-white hover:text-black transition-colors duration-300"
              >
                READ_POST.EXE
              </a>
            </div>
          </div>

          {/* View all essays button */}
          <div className="mt-12 text-center">
            <button
              className="inline-block border border-white px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
              onClick={() => alert("Coming soon!")}
            >
              VIEW_ALL_ESSAYS.EXE
            </button>
          </div>
        </div>
      </section>

      {/* Add the CSS for the hover underline animation */}
      <style jsx global>{`
        .hover-underline-animation {
          position: relative;
          text-decoration: none;
        }
        
        .hover-underline-animation::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: white;
          transition: width 0.3s;
        }
        
        .hover-underline-animation:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

