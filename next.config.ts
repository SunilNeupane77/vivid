import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Social media platforms
      {
        protocol: 'https',
        hostname: 'facebook.com',
      },
      {
        protocol: 'https',
        hostname: '*.facebook.com',
      },
      {
        protocol: 'https',
        hostname: 'google.com',
      },
      {
        protocol: 'https',
        hostname: '*.google.com',
      },
      {
        protocol: 'https',
        hostname: 'instagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.instagram.com',
      },
      {
        protocol: 'https',
        hostname: 'whatsapp.com',
      },
      {
        protocol: 'https',
        hostname: '*.whatsapp.com',
      },
      {
        protocol: 'https',
        hostname: 'twitter.com',
      },
      {
        protocol: 'https',
        hostname: '*.twitter.com',
      },
      {
        protocol: 'https',
        hostname: 'x.com',
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
      },
      {
        protocol: 'https',
        hostname: '*.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'linkedin.com',
      },
      {
        protocol: 'https',
        hostname: '*.linkedin.com',
      },

      // Image hosting/CDNs
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.britannica.com',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },

      // AI/Image Generation Platforms
      {
        protocol: 'https',
        hostname: 'deepseek.com',
      },
      {
        protocol: 'https',
        hostname: '*.deepseek.com',
      },
      {
        protocol: 'https',
        hostname: 'gemini.google.com',
      },
      {
        protocol: 'https',
        hostname: '*.gemini.google.com',
      },
      {
        protocol: 'https',
        hostname: 'openai.com',
      },
      {
        protocol: 'https',
        hostname: '*.openai.com',
      },
      {
        protocol: 'https',
        hostname: 'chatgpt.com',
      },
      {
        protocol: 'https',
        hostname: '*.chatgpt.com',
      },
      {
        protocol: 'https',
        hostname: 'midjourney.com',
      },
      {
        protocol: 'https',
        hostname: '*.midjourney.com',
      },
      {
        protocol: 'https',
        hostname: 'stability.ai',
      },
      {
        protocol: 'https',
        hostname: '*.stability.ai',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pexels.com',
      },
      {
        protocol: 'https',
        hostname: '*.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'dalle.research.google',
      },
      {
        protocol: 'https',
        hostname: '*.dalle.research.google',
      }
    ]
  }
};

export default nextConfig;