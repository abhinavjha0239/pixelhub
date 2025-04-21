"use client"

import { useState } from "react"
import { useGameContext } from "@/context/game-context"
import { useUser } from "@/context/user-context"
import Link from "next/link"

export default function Hero() {
  const { pixelCoins } = useGameContext()
  const { user } = useUser()
  
  // Generate news items with real data if available
  const generateNewsItems = () => {
    const defaultItems = [
      "🎮 New collectible set released today!",
      "⭐ Weekend quest event starts tomorrow",
      "🏆 Community pixel art contest winners announced",
      "💎 Rare item drop rates increased for limited time",
      "👑 New profile theme unlocks now available",
    ]
    
    // Add user-specific news if user exists
    const userItems = []
    if (user) {
      userItems.push(`🪙 Current PixelCoin balance: ${pixelCoins} coins`)
      userItems.push(`👤 Your level: ${user.level} (${user.xp} XP)`)
      
      if (user.achievements && user.achievements.length > 0) {
        userItems.push(`🏆 Achievements unlocked: ${user.achievements.length}`)
      }
      
      if (user.quests?.completed && user.quests.completed.length > 0) {
        userItems.push(`✅ Quests completed: ${user.quests.completed.length}`)
      }
    }
    
    // Combine and return up to 6 items
    return [...userItems, ...defaultItems].slice(0, 6)
  }

  const [newsItems] = useState(generateNewsItems)

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#0D0D0D] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 to-[#0D0D0D]/60"></div>

        {/* Pixel art decoration elements */}
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FF6B6B] opacity-20 animate-pulse"></div>
        <div className="absolute top-24 right-12 w-12 h-12 bg-[#4ECDC4] opacity-30 animate-bounce"></div>
        <div className="absolute bottom-48 right-24 w-16 h-16 bg-[#FFE66D] opacity-20 animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pixelated Border Top */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-[#FF6B6B]"></div>
              <div className="w-4 h-4 bg-[#4ECDC4]"></div>
              <div className="w-4 h-4 bg-[#FFE66D]"></div>
              <div className="w-4 h-4 bg-[#FF6B6B]"></div>
              <div className="w-4 h-4 bg-[#4ECDC4]"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight leading-tight">
            <span className="text-[#FF6B6B]">Pixel</span>
            <span className="text-[#4ECDC4]">Verse</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-300">Your gateway to an immersive 8-bit universe</p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/games">
              <button
                className="px-8 py-3 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded-md transition-colors duration-300 text-lg"
              >
                Start Playing
              </button>
            </Link>
            <Link href="/marketplace">
              <button
                className="px-8 py-3 bg-transparent border-2 border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10 font-bold rounded-md transition-colors duration-300 text-lg"
              >
                Explore Marketplace
              </button>
            </Link>
          </div>

          {/* Features Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="p-4 rounded-md border border-neutral-700 hover:border-[#FF6B6B]/50 transition-colors bg-neutral-900/60 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#FF6B6B]/20 flex items-center justify-center rounded">
                <span className="text-[#FF6B6B] text-2xl">🎮</span>
              </div>
              <h3 className="font-bold text-white mb-1">Collectibles</h3>
              <p className="text-sm text-gray-400">Unique digital assets</p>
            </div>

            <div className="p-4 rounded-md border border-neutral-700 hover:border-[#4ECDC4]/50 transition-colors bg-neutral-900/60 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#4ECDC4]/20 flex items-center justify-center rounded">
                <span className="text-[#4ECDC4] text-2xl">⚔️</span>
              </div>
              <h3 className="font-bold text-white mb-1">Quests</h3>
              <p className="text-sm text-gray-400">Daily challenges</p>
            </div>

            <div className="p-4 rounded-md border border-neutral-700 hover:border-[#FFE66D]/50 transition-colors bg-neutral-900/60 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#FFE66D]/20 flex items-center justify-center rounded">
                <span className="text-[#FFE66D] text-2xl">🖼️</span>
              </div>
              <h3 className="font-bold text-white mb-1">Gallery</h3>
              <p className="text-sm text-gray-400">Showcase artwork</p>
            </div>

            <div className="p-4 rounded-md border border-neutral-700 hover:border-[#FF6B6B]/50 transition-colors bg-neutral-900/60 backdrop-blur-sm">
              <div className="w-12 h-12 mx-auto mb-3 bg-[#FF6B6B]/20 flex items-center justify-center rounded">
                <span className="text-[#FF6B6B] text-2xl">👥</span>
              </div>
              <h3 className="font-bold text-white mb-1">Community</h3>
              <p className="text-sm text-gray-400">Connect with others</p>
            </div>
          </div>

          {/* News Ticker */}
          <div className="mt-12 overflow-hidden border-t border-b border-neutral-700 py-3 bg-neutral-900/60 backdrop-blur-sm">
            <div className="relative whitespace-nowrap animate-marquee">
              {newsItems.map((item, index) => (
                <span
                  key={index}
                  className={`inline-block px-4 text-${index % 3 === 0 ? "[#4ECDC4]" : index % 3 === 1 ? "[#FF6B6B]" : "[#FFE66D]"}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Pixelated Border Bottom */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-[#4ECDC4]"></div>
              <div className="w-4 h-4 bg-[#FFE66D]"></div>
              <div className="w-4 h-4 bg-[#FF6B6B]"></div>
              <div className="w-4 h-4 bg-[#4ECDC4]"></div>
              <div className="w-4 h-4 bg-[#FFE66D]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white/70 mb-2">Scroll Down</span>
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      {/* Marquee Animation CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
