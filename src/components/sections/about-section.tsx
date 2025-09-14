"use client";

import { motion } from "motion/react";
import { User, Brain, Eye, MessageSquare } from "lucide-react";
import Image from "next/image";

const skills = [
  { name: "Machine Learning", icon: Brain, delay: 0 },
  { name: "Deep Learning", icon: Brain, delay: 0.1 },
  { name: "Computer Vision", icon: Eye, delay: 0.2 },
  { name: "NLP", icon: MessageSquare, delay: 0.3 },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-surface-dark py-20 min-h-[60vh] flex items-center"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Profile Photo */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="w-60 h-60 rounded-full bg-muted border-2 overflow-hidden relative"
                style={{
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
                }}
                whileHover={{
                  boxShadow: "0 0 40px rgba(255, 0, 153, 0.4)",
                  transition: { duration: 0.3 },
                }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(0, 212, 255, 0.3)",
                    "0 0 35px rgba(255, 0, 153, 0.35)",
                    "0 0 30px rgba(0, 212, 255, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-4 rounded-full bg-elevated-border flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/pw/AP1GczNKjn78UQs-an7SQq5QXxAxuajoYh6qIxcdv4U4X662hiJnN-SE2TMfPgB0d9ei08WlxyXNLq_OdvCJFp5sVrLe7RE_YFcIfVmx9FzEnOtEmfAtwIjldnj5E_Ii_UJT4JD4hT0i8Lf1DrSHCqqAGPpm=w683-h911-s-no-gm?authuser=0"
                    alt="Profile photo"
                    fill
                    className="object-cover w-full h-full rounded-full"
                    sizes="240px"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - About Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl font-bold text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                I'm Piyush, a passionate AI/ML researcher and developer with a
                deep fascination for the intersection of technology and human
                intelligence. Currently pursuing my graduate studies in Computer
                Science, I focus on advancing the frontiers of artificial
                intelligence through innovative research and practical
                applications.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                My research interests span across machine learning algorithms,
                deep neural networks, computer vision, and natural language
                processing. I'm particularly drawn to developing AI systems that
                can understand and interact with the world in more human-like
                ways, bridging the gap between computational efficiency and
                cognitive understanding.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Looking ahead, I aspire to contribute to breakthrough research
                in AI safety and explainable AI, while building practical
                solutions that can positively impact society. My goal is to work
                at the cutting edge of technology, whether in academia or
                industry, pushing the boundaries of what's possible with
                artificial intelligence.
              </motion.p>
            </div>

            {/* Animated Skill Tags */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="px-4 py-2 rounded-full bg-muted border-2 flex items-center gap-2 text-sm font-medium text-text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + skill.delay,
                    type: "spring",
                    stiffness: 100,
                    borderColor: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: skill.delay * 0.5,
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    borderColor: [
                      "rgb(0, 212, 255)", // electric blue
                      "rgb(255, 0, 153)", // magenta
                      "rgb(0, 212, 255)",
                    ],
                  }}
                  viewport={{ once: true }}
                >
                  <skill.icon size={16} className="text-primary" />
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
