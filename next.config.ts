// next.config.js
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      // Facebook
      'www.facebook.com',
      'facebook.com',
      '*.fbcdn.net',
      '*.facebook.com',
      
      // Twitter
      'twitter.com',
      'pbs.twimg.com', // Twitter images
      'abs.twimg.com', // Twitter assets
      
      // Instagram
      'instagram.com',
      '*.cdninstagram.com',
      '*.fbcdn.net', // Also used by Instagram
      
      // Google
      'google.com',
      '*.googleusercontent.com',
      '*.ggpht.com', // Google hosted images
      
      // Snapchat
      'snapchat.com',
      '*.sc-cdn.net',
      'images.unsnap.com',
      
      // Add any other domains you need
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all HTTPS domains (use with caution)
      },
    ],
  },
  // ... rest of your config
}

export default nextConfig