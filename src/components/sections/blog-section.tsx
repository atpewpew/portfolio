"use client"

import { ArrowRight, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with PyTorch",
      summary: "Learn the fundamentals of PyTorch for deep learning. This comprehensive guide covers installation, tensors, and building your first neural network.",
      tags: [
        { name: "Tutorial", color: "bg-slate-600" }
      ],
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", // Coding/ML theme
      url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html"
    },
    {
      id: 2,
      title: "Understanding Transformer Architecture",
      summary: "Deep dive into the revolutionary Transformer model that powers modern NLP. Explore attention mechanisms and self-attention in detail.",
      tags: [
        { name: "DL", color: "bg-[#FF0099]" }
      ],
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80", // Abstract neural net theme
      url: "https://jalammar.github.io/illustrated-transformer/"
    },
    {
      id: 3,
      title: "Computer Vision with OpenCV",
      summary: "Master computer vision techniques using OpenCV. From basic image processing to advanced object detection and feature extraction.",
      tags: [
        { name: "ML", color: "bg-[#00D4FF]" }
      ],
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // Eye/vision theme
      url: "https://opencv.org/about/"
    }
  ]

  return (
    <section className="bg-[#0A0A0A] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Latest Articles
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00D4FF]/10 transition-all duration-300 ease-out group border border-[#2A2A2A]"
            >
              {/* Blog Image */}
              <div className="aspect-video bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#FF0099]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${tag.color}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00D4FF] transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-[#A1A1A1] text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.summary}
                </p>

                {/* Date and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#A1A1A1] text-sm">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <a 
                    href={post.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D4FF] text-sm font-medium hover:text-[#FF0099] transition-colors duration-300 flex items-center gap-1 group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            className="bg-transparent border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#0A0A0A] px-8 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#00D4FF]/25"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}