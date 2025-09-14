"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, setTheme, actualTheme } = useTheme();

  const navLinks = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section based on scroll position
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Cycle through theme options
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "system":
        return <Monitor className="h-5 w-5" />;
      default:
        return <Moon className="h-5 w-5" />;
    }
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ 
        y: isScrollingUp ? 0 : -100,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }
      }}
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
    >
      <div className="h-20 md:h-20 bg-[rgba(26,26,26,0.8)] dark:bg-[rgba(26,26,26,0.8)] bg-[rgba(248,248,248,0.8)] backdrop-blur-md border-b border-[rgba(42,42,42,0.5)] dark:border-[rgba(42,42,42,0.5)] border-[rgba(200,200,200,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo with subtle glow effect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <button
                onClick={() => scrollToSection("about")}
                className="text-2xl font-bold text-white dark:text-white text-slate-900 hover:text-[#3da5f4] dark:hover:text-[#3da5f4] hover:text-[#0066CC] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3da5f4] rounded-lg px-1 relative"
                aria-label="Scroll to top"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(61, 165, 244, 0.3))'
                }}
              >
                Piyush
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block flex-1">
              <div className="ml-10 flex items-baseline space-x-8 justify-center">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3da5f4] relative group ${
                      activeSection === link.id
                        ? "text-white dark:text-white text-slate-900"
                        : "text-[#A1A1A1] dark:text-[#A1A1A1] text-slate-600 hover:text-[#3da5f4] dark:hover:text-[#3da5f4] hover:text-[#0066CC]"
                    }`}
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                    {/* Refined active underline with softer gradient */}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3da5f4] to-[#d46aff]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                          boxShadow: '0 0 8px rgba(61, 165, 244, 0.4)'
                        }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#3da5f4]/8 to-[#d46aff]/8 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle with subtle glow */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 text-[#A1A1A1] dark:text-[#A1A1A1] text-slate-600 hover:text-[#3da5f4] dark:hover:text-[#3da5f4] hover:text-[#0066CC] hover:bg-[rgba(61,165,244,0.1)] focus:ring-2 focus:ring-[#3da5f4] transition-all duration-300"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'} mode`}
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(61, 165, 244, 0.2))'
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "system" ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {getThemeIcon()}
                </motion.div>
              </Button>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-[#A1A1A1] dark:text-[#A1A1A1] text-slate-600 hover:text-[#3da5f4] dark:hover:text-[#3da5f4] hover:text-[#0066CC] hover:bg-[rgba(61,165,244,0.1)] focus:ring-2 focus:ring-[#3da5f4] transition-all duration-300"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(61, 165, 244, 0.2))'
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </motion.div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[rgba(26,26,26,0.95)] dark:bg-[rgba(26,26,26,0.95)] bg-[rgba(248,248,248,0.95)] backdrop-blur-md border-t border-[rgba(42,42,42,0.5)] dark:border-[rgba(42,42,42,0.5)] border-[rgba(200,200,200,0.3)] overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => scrollToSection(link.id)}
                    className={`block px-3 py-2 text-base font-medium transition-all duration-300 rounded-md w-full text-left focus:outline-none focus:ring-2 focus:ring-[#3da5f4] relative ${
                      activeSection === link.id
                        ? "text-white dark:text-white text-slate-900 bg-[rgba(61,165,244,0.1)]"
                        : "text-[#A1A1A1] dark:text-[#A1A1A1] text-slate-600 hover:text-[#3da5f4] dark:hover:text-[#3da5f4] hover:text-[#0066CC] hover:bg-[rgba(61,165,244,0.05)]"
                    }`}
                    aria-label={`Navigate to ${link.label} section`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3da5f4] to-[#d46aff]"
                        layoutId="activeMobile"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                          boxShadow: '0 0 8px rgba(61, 165, 244, 0.4)'
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};