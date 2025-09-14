"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Mail, Copy, Check, Instagram } from "lucide-react"
import { motion } from "motion/react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  const copyEmailToClipboard = async () => {
    const email = "7755piyush@gmail.com"
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  const socialIcons = [
    { 
      icon: Github, 
      href: "https://github.com/atpewpew", 
      label: "GitHub",
      hoverColor: "hover:text-primary"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/piyush-kumar-8260b3293/", 
      label: "LinkedIn",
      hoverColor: "hover:text-secondary"
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/at_pewpew/", 
      label: "Instgram",
      hoverColor: "hover:text-primary"
    },
  ]

  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Let's start a conversation about your next project
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
        >
          <div className="space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 text-base transition-colors duration-200"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-12 text-base transition-colors duration-200"
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary resize-none text-base transition-colors duration-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] h-12 text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              "Send Message"
            )}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center space-x-6">
            {socialIcons.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground transition-all duration-300 transform hover:scale-110 ${social.hoverColor}`}
                whileHover={{ 
                  scale: 1.2,
                  filter: "drop-shadow(0 0 8px currentColor)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <social.icon className="w-6 h-6" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3 text-muted-foreground"
          >
            <Mail className="w-5 h-5" />
            <span className="text-base">7755piyush@gmail.com</span>
            <button
              onClick={copyEmailToClipboard}
              className="p-1 hover:text-primary transition-colors duration-200"
              aria-label="Copy email address"
            >
              <motion.div
                initial={false}
                animate={{ 
                  scale: isCopied ? [1, 1.2, 1] : 1,
                  rotate: isCopied ? [0, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}