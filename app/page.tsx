"use client"

import { GlassCarousel } from "./components/glass-carousel"
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="font-terminal uppercase relative">
      {/* Hero Section with fixed height */}
      <section className="h-screen relative overflow-hidden">
        {/* SVG overlay with fixed positioning - only in hero section */}
        <div className="absolute inset-0 z-20 flex items-end justify-end pointer-events-none">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kazi-GCOyN7IPNWNMTIiN29rQtREA8R6gvl.svg"
            alt="Kazi"
            className="h-[50vh] md:h-[80vh] w-auto max-w-none object-contain object-right-bottom translate-x-[15%] translate-y-[10%] absolute bottom-0 right-0"
          />
        </div>

        {/* Layout container with fixed structure */}
        <div className="flex flex-col h-full">
          {/* Top white section with fixed height */}
          <div className="bg-white text-black h-[80px] md:h-[180px] w-full px-[69px] relative z-10">
            {/* Corner text elements with fixed positions */}
            <div className="absolute top-4 left-4 text-black font-extrabold text-lg z-30 hidden md:block">DOMINATE</div>
            <div className="absolute top-4 right-4 text-black font-extrabold text-lg z-30 hidden md:block">RELENTLESS</div>
            <div className="absolute top-1/2 -translate-y-1/2 left-4 text-black font-extrabold text-lg z-30">EXECUTE</div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 text-black font-extrabold text-lg z-30">FEROCITY</div>
          </div>

          {/* Middle black section with flex-grow to adapt length */}
          <div className="bg-black text-white flex-grow w-full px-12 flex flex-col justify-between relative z-10">
            {/* Left-aligned text with adjusted positioning */}
            <div className="mt-8 md:mt-12 relative h-[calc(6.98rem+4.65rem+70px)]">
              <div className="absolute top-[20px] -left-4 text-[4.65rem] leading-none">KAZI</div>
              <div className="absolute top-[calc(4.65rem+20px)] -left-4 text-[1.85rem] sm:text-[6.98rem] font-normal leading-none">
                UNCENSORED
              </div>
            </div>

            {/* Navigation with fixed positioning */}
            <div className="absolute bottom-4 left-8 z-50 flex flex-col space-y-1 bg-black bg-opacity-80 p-1 md:p-0 md:bg-transparent">
              <Link href="#glass-carousel" className="hover:opacity-80 transition-opacity">
                PROJECTS.
              </Link>
              <Link href="#videos" className="hover:opacity-80 transition-opacity">
                VIDEOS.
              </Link>
              <Link href="#essays" className="hover:opacity-80 transition-opacity">
                ESSAYS.
              </Link>
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
      <section id="glass-carousel" className="bg-white text-black pt-40 pb-24 px-6 md:px-12 overflow-hidden">
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

      {/* Founder Interviews Section */}
      <section id="videos" className="bg-black text-white py-24 pb-32">
        <div className="max-w-5xl mx-auto pt-16">
          {/* Section heading */}
          <h2 className="text-2xl font-bold mb-8">FOUNDER INTERVIEWS</h2>

          {/* Grid of interview cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interview 1 */}
            <a 
              href="https://youtu.be/MA35mi7OiSg?si=q7I_ynKjc6R5yJAu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black p-4 border border-white hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer group no-underline"
            >
              <div className="aspect-video bg-gray-100 mb-3 relative overflow-hidden">
                <Image
                  src="/thumbnails/dan-romero.png"
                  alt="Interview with Dan Romero"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                  <span className="text-3xl text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">▶</span>
                </div>
              </div>
              <h3 className="text-base font-normal">DAN ROMERO</h3>
              <p className="text-xs opacity-60 -mt-1 mb-2">FOUNDER CEO @ FARCASTER</p>
              <p className="text-xs leading-snug">
                ON BUILDING SOCIAL NETWORKS AND THE FUTURE OF CRYPTO
              </p>
            </a>

            {/* Interview 2 */}
            <a 
              href="https://youtu.be/-IwWnrhuBQ0?si=sPNuWTzv2Y3WuOrj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black p-4 border border-white hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer group no-underline"
            >
              <div className="aspect-video bg-gray-100 mb-3 relative overflow-hidden">
                <Image
                  src="/thumbnails/julianna-lamb.png"
                  alt="Interview with Julianna Lamb"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                  <span className="text-3xl text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">▶</span>
                </div>
              </div>
              <h3 className="text-base font-normal">JULIANNA LAMB</h3>
              <p className="text-xs opacity-60 -mt-1 mb-2">FOUNDER CTO @ STYTCH</p>
              <p className="text-xs leading-snug">
                BUILDING 0-1 IN ENTERPRISE SAAS AND AI'S IMPACT ON AUTH
              </p>
            </a>

            {/* Interview 3 */}
            <a 
              href="https://youtu.be/3NHhTKqKszk?si=1yMpeZuYGQJyINHU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black p-4 border border-white hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer group no-underline"
            >
              <div className="aspect-video bg-gray-100 mb-3 relative overflow-hidden">
                <Image
                  src="/thumbnails/andrew-lee.png"
                  alt="Interview with Andrew Lee"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                  <span className="text-3xl text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">▶</span>
                </div>
              </div>
              <h3 className="text-base font-normal">ANDREW LEE</h3>
              <p className="text-xs opacity-60 -mt-1 mb-2">FOUNDER @ FIREBASE</p>
              <p className="text-xs leading-snug">
                BUILDING 0-1 IN DEVELOPER TOOLS AND EXITING TO GOOGLE
              </p>
            </a>

            {/* Interview 4 */}
            <a 
              href="https://youtu.be/JHszVuymCnM?si=RKmGfslT8QibrwN1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black p-4 border border-white hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer group no-underline"
            >
              <div className="aspect-video bg-gray-100 mb-3 relative overflow-hidden">
                <Image
                  src="/thumbnails/hxsain.png"
                  alt="Interview with Hxsain"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                  <span className="text-3xl text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">▶</span>
                </div>
              </div>
              <h3 className="text-base font-normal">HXSAIN</h3>
              <p className="text-xs opacity-60 -mt-1 mb-2">YOUTUBER 2.8M SUBS</p>
              <p className="text-xs leading-snug">
                HOW TO GO 0-1 ON YOUTUBE AND THE IMPORTANCE OF TRENDS
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Essays Section */}
      <section id="essays" className="bg-white text-black py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto pt-16">
          {/* Section heading */}
          <h2 className="text-2xl font-bold mb-8">ESSAYS</h2>
            
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-2">AI AGENTS: THE END OF THE APP PARADIGM</h3>
              <p className="text-gray-600 text-sm mb-4">How AI agents will replace traditional software interfaces and what it means for product designers.</p>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Apr 12, 2025</span>
                <a className="inline-block border border-black px-2 py-0.5 text-[10px] hover:bg-black hover:text-white transition-colors duration-300" href="/articles/ai-agents">LEARN</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">THE TERMINAL AESTHETIC: FUNCTION OVER FORM</h3>
              <p className="text-gray-600 text-sm mb-4">How aerospace cockpit design and AI are reshaping the future of software interfaces.</p>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Apr 08, 2025</span>
                <a className="inline-block border border-black px-2 py-0.5 text-[10px] hover:bg-black hover:text-white transition-colors duration-300" href="/articles/terminal-aesthetic">LEARN</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">TIME-TO-VALUE: THE ONLY METRIC THAT MATTERS</h3>
              <p className="text-gray-600 text-sm mb-4">How the fastest growing B2B SaaS companies optimize for immediate value delivery over everything else.</p>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Feb 28, 2025</span>
                <a className="inline-block border border-black px-2 py-0.5 text-[10px] hover:bg-black hover:text-white transition-colors duration-300" href="/articles/time-to-value">LEARN</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">FOUNDER-LED SALES: THE UNFAIR ADVANTAGE</h3>
              <p className="text-gray-600 text-sm mb-4">Why founders who sell outperform those who don't. The psychology of buying from creators vs hired guns.</p>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Jan 15, 2025</span>
                <a className="inline-block border border-black px-2 py-0.5 text-[10px] hover:bg-black hover:text-white transition-colors duration-300" href="/articles/founder-led-sales">LEARN</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section id="my-story" className="bg-black text-white py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section heading */}
          <h2 className="text-2xl font-bold mb-8">MY STORY</h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-sm md:text-base leading-relaxed text-left max-w-3xl">
                I&apos;ve been working in startups for the past 5 years. I built a personal brand on (12.5k) LinkedIn and (33k) Warpcaster to build. I left my job as a data engineer at the department of defense to build. Won $100k grants to build, raised some angel capital to build and even left the comforts of home to live in San Francisco to build. I manage a community of 220,000 founders.
              </p>
            </div>

            <div>
              <p className="text-sm md:text-base leading-relaxed text-left max-w-3xl">
                I&apos;m a builder that loves the thrill of the build. Nothing stimulates me more than figuring out the puzzle that is PMF. B2B SaaS is my passion.<br />
                I interview other builders like you<br />
                Founder of Firebase, Stytch, Warpcaster, etc on my podcast. If you want to chat and you&apos;re building something interesting I&apos;m not hard to find.
              </p>
            </div>

            <div className="flex justify-start">
              <a 
                href="mailto:kazi@thred.ai" 
                className="inline-block bg-white text-black px-4 py-2 text-xs font-bold hover:bg-opacity-90 transition-all duration-200 tracking-wide"
              >
                GRAB COFFEE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Add the CSS for the hover underline animation */}
      <style jsx global>{`
        .hover-underline-animation {
          position: relative;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
