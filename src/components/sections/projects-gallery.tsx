"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, BookOpen, FileText, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

interface ProjectDoc {
  installation: string[];
  usage: string[];
  features: string[];
  architecture: string;
  demo: string;
}

const projects = [
  {
    id: 1,
    title: "Neural Style Transfer",
    description: "AI-powered artistic style transfer using deep learning. Transform any image into stunning artwork with different artistic styles.",
    techStack: ["Python", "PyTorch", "OpenCV", "Flask"],
    liveUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    image: "https://miro.medium.com/v2/resize:fit:2000/1*k4RW1Rz8fpRuwCI5DGqPPQ.png", // TODO: Add relevant image URL
    documentation: {
      installation: [
        "git clone https://github.com/piyush/neural-style-transfer",
        "pip install -r requirements.txt",
        "python setup.py install"
      ],
      usage: [
        "from neural_style import StyleTransfer",
        "model = StyleTransfer('vgg19')",
        "result = model.transfer(content_img, style_img)"
      ],
      features: [
        "Real-time style transfer processing",
        "Multiple pre-trained style models",
        "Batch processing support",
        "REST API for integration"
      ],
      architecture: "Built on VGG-19 backbone with custom loss functions for content and style preservation. Uses adaptive instance normalization for efficient style transfer.",
      demo: "Live demo processes images in under 3 seconds with 512px resolution."
    }
  },
  {
    id: 2,
    title: "Sentiment Analysis API",
    description: "RESTful API for real-time sentiment analysis of text data. Process social media posts, reviews, and customer feedback.",
    techStack: ["Python", "TensorFlow", "Docker", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    image: "https://www.softwebsolutions.com/wp-content/uploads/2025/04/nlp-for-sentiment-analysis.webp", // TODO: Add relevant image URL
    documentation: {
      installation: [
        "docker pull piyush/sentiment-api:latest",
        "docker run -p 8000:8000 sentiment-api",
        "curl http://localhost:8000/health"
      ],
      usage: [
        "POST /analyze",
        "Content-Type: application/json",
        '{"text": "I love this product!"}'
      ],
      features: [
        "Multi-language sentiment detection",
        "Confidence score ratings",
        "Batch processing endpoint",
        "Real-time streaming analysis"
      ],
      architecture: "BERT-based transformer model fine-tuned on 50M+ social media posts. FastAPI backend with Redis caching.",
      demo: "Achieves 94.2% accuracy on IMDB dataset with <50ms response time."
    }
  },
  {
    id: 3,
    title: "Computer Vision Dashboard",
    description: "Interactive dashboard for computer vision model training and deployment. Monitor performance metrics and visualize results.",
    techStack: ["React", "Python", "PyTorch", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    image: "https://miro.medium.com/v2/resize:fit:1400/0*OBEZc2ssZpV0k6TW", // TODO: Add relevant image URL
    documentation: {
      installation: [
        "npm install && npm run build",
        "pip install -r backend/requirements.txt",
        "docker-compose up -d mongodb"
      ],
      usage: [
        "npm start # Start React dashboard",
        "python backend/server.py # Start API",
        "Access dashboard at http://localhost:3000"
      ],
      features: [
        "Real-time training visualization",
        "Model performance metrics",
        "Dataset management tools",
        "Automated hyperparameter tuning"
      ],
      architecture: "React frontend with FastAPI backend. MongoDB for experiment tracking. WebSocket for real-time updates.",
      demo: "Deployed models serve 1000+ predictions/sec with sub-100ms latency."
    }
  },
  {
    id: 4,
    title: "NLP Chatbot",
    description: "Intelligent conversational AI powered by transformer models. Handles customer support queries with human-like responses.",
    techStack: ["Python", "Transformers", "Redis", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*TBdcdT3scgm72XC1xbMtCQ.gif", // TODO: Add relevant image URL
    documentation: {
      installation: [
        "pip install transformers torch",
        "python download_model.py",
        "redis-server # Start Redis"
      ],
      usage: [
        "from chatbot import NLPChatbot",
        "bot = NLPChatbot(model='gpt-neo-2.7B')",
        "response = bot.chat('Hello!')"
      ],
      features: [
        "Context-aware conversations",
        "Multi-turn dialog handling",
        "Intent recognition & entity extraction",
        "Conversation memory management"
      ],
      architecture: "GPT-Neo backbone with custom fine-tuning. Redis for session management. WebSocket for real-time chat.",
      demo: "Handles 500+ concurrent conversations with 95% user satisfaction."
    }
  },
  {
    id: 5,
    title: "Stock Price Predictor",
    description: "Machine learning model for stock price prediction using LSTM networks. Analyze market trends and forecast future prices.",
    techStack: ["Python", "TensorFlow", "Pandas", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    image: "https://miro.medium.com/v2/resize:fit:2000/1*hhq3ybwbyA3p0dWuLFtLMQ.jpeg", // TODO: Add relevant image URL
    documentation: {
      installation: [
        "pip install tensorflow pandas yfinance",
        "createdb stock_predictions",
        "python migrate.py"
      ],
      usage: [
        "from predictor import StockPredictor",
        "model = StockPredictor(symbol='AAPL')",
        "prediction = model.predict(days=30)"
      ],
      features: [
        "Multi-timeframe predictions",
        "Technical indicator integration",
        "Risk assessment metrics",
        "Real-time data pipeline"
      ],
      architecture: "LSTM neural network with attention mechanism. Yahoo Finance API for data. PostgreSQL for historical storage.",
      demo: "Achieved 73% directional accuracy on S&P 500 stocks over 2-year backtest."
    }
  },
  {
    id: 6,
    title: "Image Classification Tool",
    description: "Advanced image classification system with custom CNN architecture. Deploy models for real-world object detection tasks.",
    techStack: ["Python", "PyTorch", "AWS", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    docsUrl: "#",
    image: "https://miro.medium.com/v2/resize:fit:822/1*CV81vQUQTq-ko_ER9gvqjg.png", // TODO: Add relevant image URL
    documentation: {
      installation: [
        "aws configure # Setup AWS credentials",
        "docker build -t image-classifier .",
        "kubectl apply -f k8s-deployment.yaml"
      ],
      usage: [
        "POST /classify",
        "Content-Type: multipart/form-data",
        "image: <binary_image_file>"
      ],
      features: [
        "Custom CNN architectures",
        "Transfer learning support",
        "Auto-scaling inference",
        "A/B testing framework"
      ],
      architecture: "ResNet-50 backbone with custom head layers. Deployed on AWS EKS with auto-scaling.",
      demo: "Processes 10K+ images/hour with 97.3% accuracy on ImageNet validation."
    }
  }
]

const DocumentationModal = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: typeof projects[0], 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#3A3A3A]">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold text-white">
                {project.title} - Documentation
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#A1A1A1] hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Installation */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3">📦 Installation</h4>
              <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
                <code className="text-sm text-[#A1A1A1] font-mono">
                  {project.documentation.installation.map((line, index) => (
                    <div key={index} className="mb-1">
                      <span className="text-[#00D4FF]">$</span> {line}
                    </div>
                  ))}
                </code>
              </div>
            </div>

            {/* Usage */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-3">🚀 Quick Start</h4>
              <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
                <code className="text-sm text-[#A1A1A1] font-mono">
                  {project.documentation.usage.map((line, index) => (
                    <div key={index} className="mb-1">{line}</div>
                  ))}
                </code>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">✨ Key Features</h4>
              <ul className="list-disc list-inside space-y-2 text-[#A1A1A1]">
                {project.documentation.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">🏗️ Architecture</h4>
              <p className="text-[#A1A1A1] leading-relaxed">
                {project.documentation.architecture}
              </p>
            </div>

            {/* Demo Stats */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">📊 Performance</h4>
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-[#3A3A3A]">
                <p className="text-white font-medium">
                  {project.documentation.demo}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group"
      >
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#3A3A3A] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-contain object-center z-10 bg-[#181818]"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent z-20" />
            <div className="absolute inset-0 group-hover:bg-gradient-to-t group-hover:from-[#1A1A1A]/60 group-hover:to-transparent transition-all duration-300 z-30" />
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-[#A1A1A1] text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge 
                  key={tech}
                  variant="outline"
                  className="text-xs bg-[#2A2A2A] border-[#3A3A3A] text-[#A1A1A1] hover:bg-[#3A3A3A] transition-colors duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-[#0A0A0A] font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 w-full"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Demo
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm"
                  className="bg-secondary hover:bg-secondary/90 text-[#0A0A0A] font-medium transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25"
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDocs(true)}
                  className="border-[#3A3A3A] text-[#A1A1A1] hover:bg-[#2A2A2A] hover:text-white hover:border-[#4A4A4A] transition-all duration-200"
                  aria-label={`View documentation for ${project.title}`}
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  Docs
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <DocumentationModal 
        project={project}
        isOpen={showDocs}
        onClose={() => setShowDocs(false)}
      />
    </>
  )
}

export default function ProjectsGallery() {
  return (
    <section className="bg-[#0A0A0A] py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-[#A1A1A1] max-w-2xl mx-auto">
            Explore my portfolio of AI and machine learning projects, showcasing innovative solutions and cutting-edge technology implementations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}