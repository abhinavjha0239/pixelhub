"use client"

import { useState } from "react"

export default function CommunityPage() {
  return (
    <section className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative min-h-screen">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Community</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Join discussions, share your creations, and connect with other pixel art enthusiasts.
        </p>
      </div>

      {/* Community content placeholder */}
      <div className="container mx-auto">
        <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-[#4ECDC4]/20 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-5xl">👥</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Community Features Coming Soon!</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We're working on building an amazing community space for PixelVerse members. Check back soon for forums, chat, events, and more!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#0D0D0D] rounded-lg p-6 text-center border border-neutral-700">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="text-white font-bold mb-2">Forums</h4>
              <p className="text-gray-400 text-sm">Discuss pixel art techniques, share tips and get feedback</p>
            </div>
            
            <div className="bg-[#0D0D0D] rounded-lg p-6 text-center border border-neutral-700">
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="text-white font-bold mb-2">Game Jams</h4>
              <p className="text-gray-400 text-sm">Participate in community game creation challenges</p>
            </div>
            
            <div className="bg-[#0D0D0D] rounded-lg p-6 text-center border border-neutral-700">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="text-white font-bold mb-2">Competitions</h4>
              <p className="text-gray-400 text-sm">Enter pixel art contests and win exclusive rewards</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pixel art decoration */}
      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>
    </section>
  )
} 