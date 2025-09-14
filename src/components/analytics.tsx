"use client";

import { useEffect } from "react";

// Simple Analytics Component
export const Analytics = () => {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== "production") {
      console.log("Analytics disabled in development");
      return;
    }

    // Google Analytics
    const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
    if (googleAnalyticsId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      
      gtag("js", new Date());
      gtag("config", googleAnalyticsId, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });

      window.gtag = gtag;
    }

    // Plausible Analytics
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (plausibleDomain) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.setAttribute("data-domain", plausibleDomain);
      script.src = "https://plausible.io/js/script.js";
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

// Utility functions for tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") {
    console.log("Track event:", eventName, properties);
    return;
  }

  // Google Analytics
  if (window.gtag) {
    window.gtag("event", eventName, properties);
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }
};

export const trackPageview = (url?: string) => {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") {
    console.log("Track pageview:", url);
    return;
  }

  const page_path = url || window.location.pathname + window.location.search;

  // Google Analytics
  if (window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
      page_path,
    });
  }
};

// Global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    plausible: (eventName: string, options?: any) => void;
  }
}