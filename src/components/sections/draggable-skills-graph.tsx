"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ExternalLink, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Node {
  id: string;
  name: string;
  category: 'AI & ML' | 'Web & Deployment';
  position: { x: number; y: number };
  connections: string[];
  projectTitle: string;
  projectSummary: string;
  description: string;
  demoLink?: string;
  githubLink?: string;
}

interface Edge {
  from: string;
  to: string;
}

interface TooltipData {
  node: Node;
  x: number;
  y: number;
}

const initialNodes: Node[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'AI & ML',
    position: { x: 400, y: 350 }, // Center
    connections: ['pytorch', 'tensorflow', 'ml', 'fastapi'],
    projectTitle: 'ML Pipeline Framework',
    projectSummary: '5+ years building scalable machine learning systems',
    description: 'Built comprehensive ML pipeline frameworks using Python that automate data preprocessing, feature engineering, and model training. Integrated with cloud services for distributed training and deployed production models serving millions of predictions.',
    githubLink: 'https://github.com/atpewpew'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI & ML',
    position: { x: 400, y: 150 }, // Top center
    connections: ['python', 'tensorflow'],
    projectTitle: 'CNN Gesture Classifier',
    projectSummary: 'Real-time hand gesture recognition with 96% accuracy',
    description: 'Developed a real-time hand gesture recognition system using PyTorch CNNs. Achieved 96% accuracy with transfer learning and data augmentation. Optimized for edge deployment with quantization.',
    demoLink: 'https://demo.example.com/gesture-classifier',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'AI & ML',
    position: { x: 570, y: 210 }, // Top right
    connections: ['python', 'pytorch'],
    projectTitle: 'Transformer Fine-Tuning',
    projectSummary: 'Custom BERT models for domain-specific NLP',
    description: 'Fine-tuned BERT transformer models for specialized text classification. Implemented custom training with mixed precision and gradient accumulation for optimal performance.',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'AI & ML',
    position: { x: 600, y: 370 }, // Right
    connections: ['python', 'cv', 'nlp'],
    projectTitle: 'AutoML Platform',
    projectSummary: 'Automated ML pipeline for non-technical users',
    description: 'Created AutoML platform with automated algorithm selection, hyperparameter tuning, and feature engineering. Includes model interpretation and A/B testing framework.',
    demoLink: 'https://demo.example.com/automl'
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    category: 'AI & ML',
    position: { x: 570, y: 490 }, // Bottom right
    connections: ['ml', 'nlp'],
    projectTitle: 'Medical Image Analysis',
    projectSummary: 'AI diagnostic tools for radiology scans',
    description: 'Developed AI diagnostic tools for medical imaging with 94% accuracy in anomaly detection. Implemented segmentation models helping radiologists improve diagnosis speed.',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'nlp',
    name: 'NLP',
    category: 'AI & ML',
    position: { x: 400, y: 550 }, // Bottom center
    connections: ['ml', 'cv'],
    projectTitle: 'Sentiment Analytics Engine',
    projectSummary: 'Real-time sentiment analysis at scale',
    description: 'Built sentiment analysis engine processing millions of posts daily. Custom transformer models with multilingual support deployed on distributed systems.',
    demoLink: 'https://demo.example.com/sentiment',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web & Deployment',
    position: { x: 230, y: 490 }, // Bottom left
    connections: ['htmlcss', 'fastapi'],
    projectTitle: 'Interactive ML Dashboard',
    projectSummary: 'React-based ML monitoring and visualization',
    description: 'Created interactive dashboards for ML model monitoring using React and D3.js. Real-time metrics visualization and automated alerting for production pipelines.',
    demoLink: 'https://demo.example.com/dashboard',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'htmlcss',
    name: 'HTML/CSS',
    category: 'Web & Deployment',
    position: { x: 200, y: 370 }, // Left
    connections: ['javascript', 'streamlit'],
    projectTitle: 'Responsive ML Portfolio',
    projectSummary: 'Modern portfolio with interactive demos',
    description: 'Designed responsive portfolio website with interactive ML demos. Modern CSS animations, dark mode, and 95+ Lighthouse performance scores.',
    demoLink: 'https://piyush.dev',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Web & Deployment',
    position: { x: 230, y: 210 }, // Top left
    connections: ['python', 'javascript', 'streamlit'],
    projectTitle: 'ML Model API Gateway',
    projectSummary: 'High-performance model serving infrastructure',
    description: 'Built scalable API gateway using FastAPI for ML model serving. Automatic docs, validation, rate limiting, and optimized inference with caching.',
    demoLink: 'https://api.example.com/docs',
    githubLink: 'https://github.com/piyush'
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    category: 'Web & Deployment',
    position: { x: 270, y: 290 }, // Left upper
    connections: ['htmlcss', 'fastapi'],
    projectTitle: 'ML Prototype Studio',
    projectSummary: 'Rapid prototyping for ML experiments',
    description: 'Developed rapid prototyping platform with drag-drop datasets, automated EDA, model comparison tools, and one-click production deployment.',
    demoLink: 'https://demo.example.com/studio',
    githubLink: 'https://github.com/piyush'
  }
];

const originalPositions = initialNodes.map(node => ({ ...node }));

const edges: Edge[] = [
  { from: 'python', to: 'pytorch' },
  { from: 'python', to: 'tensorflow' },
  { from: 'python', to: 'ml' },
  { from: 'python', to: 'fastapi' },
  { from: 'pytorch', to: 'tensorflow' },
  { from: 'ml', to: 'cv' },
  { from: 'ml', to: 'nlp' },
  { from: 'cv', to: 'nlp' },
  { from: 'javascript', to: 'htmlcss' },
  { from: 'javascript', to: 'fastapi' },
  { from: 'htmlcss', to: 'streamlit' },
  { from: 'fastapi', to: 'streamlit' }
];

export const DraggableSkillsGraph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [edgesVisible, setEdgesVisible] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate edges drawing on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setEdgesVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getNodeColor = (category: string) => 
    category === 'AI & ML' ? '#3da5f4' : '#d46aff';

  const getCurvedPath = (from: Node, to: Node) => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    
    const midX = (from.position.x + to.position.x) / 2;
    const midY = (from.position.y + to.position.y) / 2;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const controlOffset = Math.min(distance * 0.3, 50);
    
    const normalX = -dy / distance;
    const normalY = dx / distance;
    
    const controlX = midX + normalX * controlOffset;
    const controlY = midY + normalY * controlOffset;
    
    return `M ${from.position.x} ${from.position.y} Q ${controlX} ${controlY} ${to.position.x} ${to.position.y}`;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    setIsDragging(nodeId);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setNodes(prev => prev.map(node => 
          node.id === nodeId 
            ? { ...node, position: { x, y } }
            : node
        ));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent, nodeId: string) => {
    e.preventDefault();
    setIsDragging(nodeId);
    
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        setNodes(prev => prev.map(node => 
          node.id === nodeId 
            ? { ...node, position: { x, y } }
            : node
        ));
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, []);

  const handleNodeHover = useCallback((node: Node, e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip({
        node,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 80
      });
    }
  }, []);

  const resetGraph = useCallback(() => {
    setNodes(originalPositions.map(node => ({ ...node })));
  }, []);

  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.2 },
    drag: { scale: 1.1 }
  };

  const edgeVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 0.6,
      transition: { duration: 1.5 }
    }
  };

  return (
    <div className="relative w-full h-[700px] bg-[#0A0A0A] rounded-lg overflow-hidden border border-[#2A2A2A]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3A3A3A" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 backdrop-blur-sm rounded-lg p-4 border border-[#2A2A2A]">
        <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3da5f4] shadow-[0_0_8px_#3da5f4]" />
            <span className="text-xs text-[#A1A1A1]">AI & ML</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d46aff] shadow-[0_0_8px_#d46aff]" />
            <span className="text-xs text-[#A1A1A1]">Web & Deployment</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <motion.div
        className="absolute top-4 right-4 z-30"
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.92, rotate: -15 }}
        whileHover={{ scale: 1.06 }}
        style={{ pointerEvents: 'auto' }}
      >
        <Button
          onClick={resetGraph}
          variant="outline"
          size="sm"
          className="bg-[#1A1A1A]/90 backdrop-blur-sm border-[#2A2A2A] hover:border-[#3da5f4] text-white hover:bg-[#3da5f4]/10 focus:z-40"
          style={{ pointerEvents: 'auto' }}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Graph
        </Button>
      </motion.div>

      {/* Graph Container */}
      <div ref={containerRef} className="relative w-full h-full">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          {/* Edges */}
          {edgesVisible && edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            
            if (!fromNode || !toNode) return null;
            
            return (
              <motion.path
                key={`${edge.from}-${edge.to}`}
                d={getCurvedPath(fromNode, toNode)}
                stroke="#3A3A3A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                variants={edgeVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(58, 58, 58, 0.5))'
                }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.g
              key={node.id}
              variants={nodeVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              style={{
                cursor: isDragging === node.id ? 'grabbing' : 'grab'
              }}
            >
              <motion.circle
                cx={node.position.x}
                cy={node.position.y}
                r="25"
                fill={getNodeColor(node.category)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onTouchStart={(e) => handleTouchStart(e, node.id)}
                onMouseEnter={(e) => handleNodeHover(node, e)}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => setSelectedNode(node)}
                animate={isDragging === node.id ? "drag" : "animate"}
                style={{
                  filter: `drop-shadow(0 0 12px ${getNodeColor(node.category)}60)`,
                }}
                className="hover:brightness-110 transition-all duration-200"
              />
              
              <text
                x={node.position.x}
                y={node.position.y + 45}
                textAnchor="middle"
                className="text-xs font-medium fill-white pointer-events-none select-none"
              >
                {node.name}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute pointer-events-none z-10 bg-[#1A1A1A]/95 backdrop-blur-sm rounded-lg p-3 border border-[#3A3A3A] shadow-lg"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="text-sm font-semibold text-white">
                {tooltip.node.projectTitle}
              </div>
              <div className="text-xs text-[#A1A1A1] mt-1 max-w-48">
                {tooltip.node.projectSummary}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setSelectedNode(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1A1A1A] rounded-xl p-6 border border-[#3A3A3A] shadow-2xl max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {selectedNode.projectTitle}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: getNodeColor(selectedNode.category),
                          boxShadow: `0 0 8px ${getNodeColor(selectedNode.category)}`
                        }}
                      />
                      <span className="text-sm text-[#A1A1A1]">
                        {selectedNode.category}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedNode(null)}
                    variant="ghost"
                    size="sm"
                    className="text-[#A1A1A1] hover:text-white h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-[#A1A1A1] text-sm mb-6 leading-relaxed">
                  {selectedNode.description}
                </p>
                
                <div className="flex gap-3">
                  {selectedNode.demoLink && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#3da5f4] hover:bg-[#3da5f4]/90 text-white"
                    >
                      <a 
                        href={selectedNode.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedNode.githubLink && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-[#3A3A3A] text-white hover:bg-[#d46aff]/10 hover:border-[#d46aff]"
                    >
                      <a 
                        href={selectedNode.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};