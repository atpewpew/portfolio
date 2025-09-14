"use client"

import { motion } from "motion/react"
import { ArrowDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function SimpleCenteredWithBackgroundImage() {
  // --- Custom Typing Animation ---
  const roles = [
    "Machine Learning Engineer",
    "Research Enthusiast",
    "Open Source Contributor",
    "Tech Blogger"
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState(roles[0][0]);
  const [typing, setTyping] = useState(true);
  const typingSpeed = 60;
  const pauseTime = 1200;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayedText.length < roles[currentRole].length) {
        timeout = setTimeout(() => {
          setDisplayedText(roles[currentRole].slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setTyping(false), pauseTime);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(roles[currentRole].slice(0, displayedText.length - 1));
        }, typingSpeed / 2);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, typing, currentRole, roles]);

  // --- Mouse Parallax Effect ---
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setParallax({ x: x * 20, y: y * 20 });
    };
    const node = heroRef.current;
    if (node) node.addEventListener("mousemove", handleMouseMove);
    return () => { if (node) node.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  // --- Custom Particle Network ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx?.scale(dpr, dpr);
    const PARTICLE_COUNT = Math.floor((width * height) / 3500);
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));
    function draw() {
      ctx?.clearRect(0, 0, width, height);
      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx!.strokeStyle = "rgba(61,165,244,0.10)";
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
      // Draw particles
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.2, 0, 2 * Math.PI);
        ctx!.fillStyle = "#3da5f4";
        ctx!.globalAlpha = 0.7;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }
    function animate() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    // Responsive resize
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offsetTop = projectsSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="about" ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] overflow-hidden">
      {/* Custom Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      />
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative isolate z-10">
        {/* Enhanced gradient blob backgrounds with softer accent colors */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3da5f4]/15 via-[#d46aff]/10 to-[#3da5f4]/8 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center select-none">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative text-5xl font-bold tracking-tight text-white sm:text-7xl font-[var(--font-inter)]"
                style={{
                  transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
                  transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)'
                }}
              >
                Piyush
                {/* Refined hero glow effect with softer colors */}
                <span className="absolute inset-0 text-5xl sm:text-7xl font-bold bg-gradient-to-r from-[#3da5f4] via-[#d46aff] to-[#3da5f4] bg-clip-text text-transparent opacity-50 blur-sm">
                  Piyush
                </span>
                {/* Subtle outer glow halo */}
                <span className="absolute inset-0 text-5xl sm:text-7xl font-bold bg-gradient-to-r from-[#3da5f4] via-[#d46aff] to-[#3da5f4] bg-clip-text text-transparent opacity-20 blur-md scale-110">
                  Piyush
                </span>
              </motion.h1>
              {/* Custom Typing Animation for Roles */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 text-lg font-medium text-muted-foreground sm:text-xl/8 h-8"
                style={{ minHeight: 32 }}
              >
                <span className="text-white">{displayedText}<span className="animate-pulse">|</span></span>
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="group relative rounded-md bg-gradient-to-r from-[#3da5f4] to-[#d46aff] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3da5f4]"
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 0 24px 6px rgba(61,165,244,0.25), 0 0 48px 12px rgba(212,106,255,0.15)",
                    y: -4
                  }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Scroll to projects section"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(61,165,244,0.3))',
                    willChange: 'transform'
                  }}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    Explore My Work
                    <motion.div
                      animate={{ 
                        y: [0, 4, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.div>
                  </span>
                  {/* Refined button hover effect with low-opacity halo */}
                  <motion.div 
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-[#3da5f4]/20 via-[#d46aff]/20 to-[#3da5f4]/15 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"
                    initial={false}
                  />
                  <div className="absolute inset-0 rounded-md border border-white/10 group-hover:border-white/20 transition-all duration-300" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d46aff]/15 via-[#3da5f4]/10 to-[#d46aff]/8 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-3500 { animation-delay: 3.5s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
      `}</style>
    </div>
  )
}