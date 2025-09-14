import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Piyush - AI/ML Engineer & Research Enthusiast",
  description: "Portfolio of Piyush, a passionate AI/ML researcher and developer specializing in machine learning, deep learning, computer vision, and NLP. Explore cutting-edge projects and innovative AI solutions.",
  keywords: [
    "Piyush",
    "Machine Learning",
    "AI Engineer",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "PyTorch",
    "TensorFlow",
    "Python",
    "Research",
    "Portfolio"
  ],
  authors: [{ name: "Piyush" }],
  creator: "Piyush",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piyush-portfolio.com",
    title: "Piyush - AI/ML Engineer & Research Enthusiast",
    description: "Portfolio showcasing innovative AI/ML projects, research work, and technical expertise in machine learning and deep learning technologies.",
    siteName: "Piyush Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush - AI/ML Engineer & Research Enthusiast",
    description: "Exploring the frontiers of artificial intelligence through innovative research and practical applications.",
    creator: "@piyush",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`} suppressHydrationWarning>
        <ThemeProvider defaultTheme="dark">
          <ErrorReporter />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}