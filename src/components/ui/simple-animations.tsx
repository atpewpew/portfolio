"use client";

import React, { useState, useEffect, useRef } from 'react';

// TypeScript Interfaces
interface AnimationProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface BrainAnimationProps extends AnimationProps {
  pulseSpeed?: 'slow' | 'normal' | 'fast';
}

interface CodeAnimationProps extends AnimationProps {
  code?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

interface ParticleAnimationProps extends AnimationProps {
  particleCount?: number;
  connectionDistance?: number;
}

interface ChartAnimationProps extends AnimationProps {
  data?: number[];
  type?: 'bar' | 'line';
}

// Brain/AI Icon Animation Component
export const BrainAnimation: React.FC<BrainAnimationProps> = ({ 
  size = 'md', 
  pulseSpeed = 'normal',
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const speedMap = {
    slow: 3,
    normal: 2,
    fast: 1
  };

  const animationDuration = speedMap[pulseSpeed];

  return (
    <div className={`${sizeMap[size]} ${className} relative`} 
         style={{ '--reduced-motion': 'no-preference' } as React.CSSProperties}>
      <style jsx>{`
        @keyframes brainPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes neuronFlash {
          0%, 90%, 100% { opacity: 0.2; }
          45%, 55% { opacity: 1; }
        }
        @keyframes synapseFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        .brain-container {
          animation: brainPulse ${animationDuration}s ease-in-out infinite;
        }
        
        .neuron {
          animation: neuronFlash ${animationDuration * 1.5}s ease-in-out infinite;
        }
        
        .synapse {
          stroke-dasharray: 10 5;
          animation: synapseFlow ${animationDuration * 2}s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .brain-container,
          .neuron,
          .synapse {
            animation: none;
          }
        }
      `}</style>
      
      <svg
        className="brain-container w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#FF0099" />
          </radialGradient>
          <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF0099" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Brain outline */}
        <path
          d="M30 20 Q50 10 70 20 Q85 35 75 50 Q85 65 70 80 Q50 90 30 80 Q15 65 25 50 Q15 35 30 20 Z"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* Neural pathways */}
        <path
          className="synapse"
          d="M25 30 Q40 25 55 35 Q70 45 75 60"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
        />
        <path
          className="synapse"
          d="M35 25 Q50 30 65 25 Q75 35 70 50"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          style={{ animationDelay: '0.5s' } as React.CSSProperties}
        />
        <path
          className="synapse"
          d="M30 70 Q45 65 60 70 Q70 60 65 45"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          style={{ animationDelay: '1s' } as React.CSSProperties}
        />
        
        {/* Neurons */}
        <circle className="neuron" cx="35" cy="30" r="3" fill="#00D4FF" />
        <circle className="neuron" cx="50" cy="25" r="2.5" fill="#FF0099" 
                style={{ animationDelay: '0.3s' } as React.CSSProperties} />
        <circle className="neuron" cx="65" cy="35" r="3" fill="#00D4FF" 
                style={{ animationDelay: '0.6s' } as React.CSSProperties} />
        <circle className="neuron" cx="45" cy="50" r="2.5" fill="#FF0099" 
                style={{ animationDelay: '0.9s' } as React.CSSProperties} />
        <circle className="neuron" cx="60" cy="65" r="3" fill="#00D4FF" 
                style={{ animationDelay: '1.2s' } as React.CSSProperties} />
        <circle className="neuron" cx="40" cy="70" r="2.5" fill="#FF0099" 
                style={{ animationDelay: '1.5s' } as React.CSSProperties} />
      </svg>
    </div>
  );
};

// Code Snippet Animation Component
export const CodeAnimation: React.FC<CodeAnimationProps> = ({ 
  size = 'md',
  speed = 'normal',
  code = 'const ai = new NeuralNetwork();\nai.train(dataset);\nconst result = ai.predict(input);',
  className = ''
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const sizeMap = {
    sm: 'text-xs max-w-xs',
    md: 'text-sm max-w-md',
    lg: 'text-base max-w-lg'
  };

  const speedMap = {
    slow: 150,
    normal: 100,
    fast: 50
  };

  const typingSpeed = speedMap[speed];

  useEffect(() => {
    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => prev + code[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Reset animation after completion
      const resetTimer = setTimeout(() => {
        setDisplayedCode('');
        setCurrentIndex(0);
      }, 2000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, code, typingSpeed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className={`${sizeMap[size]} ${className} bg-card border rounded-lg p-4 font-mono`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="relative">
        <pre className="text-foreground whitespace-pre-wrap">
          <code>
            {displayedCode.split('\n').map((line, index) => (
              <div key={index} className="leading-relaxed">
                {line.split('').map((char, charIndex) => {
                  if (char.match(/\b(const|new|train|predict)\b/)) {
                    return <span key={charIndex} className="text-primary">{char}</span>;
                  }
                  if (char.match(/[\(\)]/)) {
                    return <span key={charIndex} className="text-secondary">{char}</span>;
                  }
                  if (char.match(/['"]/)) {
                    return <span key={charIndex} className="text-green-400">{char}</span>;
                  }
                  return <span key={charIndex}>{char}</span>;
                })}
              </div>
            ))}
            <span className={`text-primary transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
          </code>
        </pre>
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner: React.FC<AnimationProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeMap[size]} ${className} relative`}>
      <style jsx>{`
        @keyframes neuralSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        .spinner-main {
          animation: neuralSpin 2s linear infinite;
        }
        
        .spinner-ring {
          animation: pulseRing 1.5s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .spinner-main,
          .spinner-ring {
            animation: none;
          }
        }
      `}</style>
      
      <svg
        className="spinner-main w-full h-full"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FF0099" />
          </linearGradient>
        </defs>
        
        {/* Outer ring */}
        <circle
          className="spinner-ring"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#spinnerGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          style={{ animationDelay: '0s' } as React.CSSProperties}
        />
        
        {/* Inner connections */}
        <circle
          cx="25"
          cy="25"
          r="12"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="1.5"
          opacity="0.6"
          strokeDasharray="10 5"
          style={{ animationDelay: '0.3s' } as React.CSSProperties}
        />
        
        {/* Center node */}
        <circle
          cx="25"
          cy="25"
          r="4"
          fill="#FF0099"
          opacity="0.8"
        />
        
        {/* Neural nodes */}
        <circle cx="25" cy="10" r="2" fill="#00D4FF">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="25" r="2" fill="#FF0099">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx="25" cy="40" r="2" fill="#00D4FF">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="10" cy="25" r="2" fill="#FF0099">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.9s" />
        </circle>
      </svg>
    </div>
  );
};

// Floating Particles Animation Component
export const FloatingParticles: React.FC<ParticleAnimationProps> = ({ 
  size = 'md',
  particleCount = 20,
  connectionDistance = 100,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const sizeMap = {
    sm: { width: 200, height: 150 },
    md: { width: 400, height: 300 },
    lg: { width: 600, height: 450 }
  };

  const dimensions = sizeMap[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '#00D4FF' : '#FF0099'
    }));

    particlesRef.current = particles;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= dimensions.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= dimensions.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dist = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          );

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static version for reduced motion
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, connectionDistance, dimensions]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full border border-border rounded-lg bg-background"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

// Data Visualization Animation Component
export const ChartAnimation: React.FC<ChartAnimationProps> = ({ 
  size = 'md',
  data = [20, 45, 35, 60, 40, 70, 55],
  type = 'bar',
  className = ''
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  const sizeMap = {
    sm: { width: 200, height: 120 },
    md: { width: 300, height: 180 },
    lg: { width: 400, height: 240 }
  };

  const dimensions = sizeMap[size];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setAnimationProgress(1);
      return;
    }

    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      
      setAnimationProgress(easeOutCubic(progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      animate();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...data);
  const barWidth = dimensions.width / data.length * 0.7;
  const barSpacing = dimensions.width / data.length * 0.3;

  return (
    <div className={`${className} p-4 bg-card border rounded-lg`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <linearGradient id="chartGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF0099" />
            <stop offset="100%" stopColor="#FF0099" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {type === 'bar' ? (
          data.map((value, index) => {
            const height = (value / maxValue) * (dimensions.height - 40) * animationProgress;
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const y = dimensions.height - height - 20;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill={index % 2 === 0 ? "url(#chartGradient1)" : "url(#chartGradient2)"}
                  rx={2}
                />
                <circle
                  cx={x + barWidth / 2}
                  cy={y}
                  r={3}
                  fill={index % 2 === 0 ? "#00D4FF" : "#FF0099"}
                  opacity={animationProgress}
                >
                  <animate
                    attributeName="r"
                    values="2;4;2"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.2}s`}
                  />
                </circle>
              </g>
            );
          })
        ) : (
          <g>
            <polyline
              points={data.map((value, index) => {
                const x = index * (dimensions.width / (data.length - 1));
                const y = dimensions.height - 20 - (value / maxValue) * (dimensions.height - 40) * animationProgress;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#00D4FF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {data.map((value, index) => {
              const x = index * (dimensions.width / (data.length - 1));
              const y = dimensions.height - 20 - (value / maxValue) * (dimensions.height - 40) * animationProgress;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#FF0099"
                  opacity={animationProgress}
                >
                  <animate
                    attributeName="r"
                    values="3;6;3"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.3}s`}
                  />
                </circle>
              );
            })}
          </g>
        )}
        
        {/* Axis lines */}
        <line
          x1={0}
          y1={dimensions.height - 20}
          x2={dimensions.width}
          y2={dimensions.height - 20}
          stroke="#2A2A2A"
          strokeWidth={1}
        />
        <line
          x1={20}
          y1={0}
          x2={20}
          y2={dimensions.height - 20}
          stroke="#2A2A2A"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
};