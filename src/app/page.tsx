"use client";


import SimpleCenteredWithBackgroundImage from "@/components/blocks/heros/simple-centered-with-background-image"
import AboutSection from "@/components/sections/about-section"
import ProjectsGallery from "@/components/sections/projects-gallery"
import BlogSection from "@/components/sections/blog-section"
import { DraggableSkillsGraph } from "@/components/sections/draggable-skills-graph"
import ContactSection from "@/components/sections/contact-section"
import dynamic from "next/dynamic";

const MLTrainingDemo = dynamic(() => import("@/components/sections/ml-demo").then(mod => mod.MLTrainingDemo), {
  ssr: false,
});

import { CenteredWithLogo } from "@/components/blocks/footers/centered-with-logo"
import { Navigation } from "@/components/blocks/navbars/sticky-nav"
import { BrainAnimation, CodeAnimation } from "@/components/ui/simple-animations"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero with refined micro-animations */}
      <div className="relative">
        <SimpleCenteredWithBackgroundImage />
        {/* Subtle particle drift micro-animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 w-1 h-1 bg-[#3da5f4] rounded-full animate-pulse opacity-40" />
          <div className="absolute top-1/3 right-20 w-0.5 h-0.5 bg-[#d46aff] rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-[#3da5f4] rounded-full animate-pulse opacity-30" style={{animationDelay: '2s'}} />
        </div>
      </div>
      
      <AboutSection />
      
      {/* Projects with subtle section separator */}
      <div id="projects" className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3da5f4] to-transparent opacity-20" />
        <ProjectsGallery />
      </div>
      
      <div id="blog" className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d46aff] to-transparent opacity-20" />
        <BlogSection />
      </div>
      
      {/* Interactive Draggable Technical Skills Graph */}
      <section id="skills" className="py-20 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3da5f4]/5 via-transparent to-[#d46aff]/5" />
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#3da5f4] rounded-full animate-pulse opacity-20" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-40 right-32 w-1 h-1 bg-[#d46aff] rounded-full animate-pulse opacity-25" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-[#3da5f4] rounded-full animate-pulse opacity-15" style={{animationDelay: '2.5s'}} />
        
        {/* Subtle section separator */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3da5f4] to-transparent opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <BrainAnimation size="lg" />
              <h2 className="text-4xl font-bold text-white relative">
                Technical Skills
                {/* Subtle glow effect matching hero style */}
                <span className="absolute inset-0 text-4xl font-bold bg-gradient-to-r from-[#3da5f4] to-[#d46aff] bg-clip-text text-transparent opacity-40 blur-sm">
                  Technical Skills
                </span>
              </h2>
              <BrainAnimation size="lg" />
            </div>
            <p className="text-[#A1A1A1] text-lg max-w-2xl mx-auto mb-8">
              Interactive node graph showcasing AI/ML frameworks and web technologies with real project implementations
            </p>
            {/* Refined accent border */}
            <div className="w-32 h-px mx-auto bg-gradient-to-r from-[#3da5f4] to-[#d46aff] rounded-full opacity-60" />
          </div>
          <DraggableSkillsGraph />
        </div>
      </section>
      
      {/* Live ML Demo Section with refined styling */}
      <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] py-16 relative">
        {/* Subtle section separator */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d46aff] to-transparent opacity-20" />
        
        {/* Refined micro-animations */}
        <div className="absolute top-32 left-16 w-1 h-1 bg-[#3da5f4] rounded-full animate-pulse opacity-25" style={{animationDelay: '1s'}} />
        <div className="absolute top-64 right-24 w-1 h-1 bg-[#d46aff] rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <BrainAnimation size="lg" />
              <h2 className="text-4xl font-bold text-white relative">
                Live ML Demo
                {/* Subtle glow effect */}
                <span className="absolute inset-0 text-4xl font-bold bg-gradient-to-r from-[#d46aff] to-[#3da5f4] bg-clip-text text-transparent opacity-40 blur-sm">
                  Live ML Demo
                </span>
              </h2>
              <BrainAnimation size="lg" />
            </div>
            <p className="text-[#A1A1A1] text-lg max-w-2xl mx-auto mb-8">
              Interactive machine learning training visualization with manual controls and real-time updates
            </p>
            <div className="max-w-sm mx-auto mb-8">
              <CodeAnimation size="md" speed="normal" />
            </div>
            {/* Refined accent border */}
            <div className="w-32 h-px mx-auto bg-gradient-to-r from-[#d46aff] to-[#3da5f4] rounded-full opacity-60" />
          </div>
          <MLTrainingDemo />
        </div>
      </div>
      
      <div id="contact" className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3da5f4] to-transparent opacity-20" />
        <ContactSection />
      </div>
      
      {/* Footer with additional micro-animation */}
      <div className="relative">
        {/* Subtle footer particle animation */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-1 bg-[#d46aff] rounded-full animate-pulse opacity-30" style={{animationDelay: '0.5s'}} />
        </div>
        <CenteredWithLogo />
      </div>
    </main>
  )
}