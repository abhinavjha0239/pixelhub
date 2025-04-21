"use client"

import { useState } from "react"
import { useGameContext } from "@/context/game-context"
import Games from "./games"

export default function GamesPage() {
  return (
    <section className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Games</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Play fun mini-games to earn PixelCoins, unlock achievements, and climb the leaderboards!
        </p>
      </div>

      {/* Game Components */}
      <Games />
      
      {/* Coming Soon Section */}
      <div className="container mx-auto mt-16">
        <div className="border border-dashed border-neutral-700 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">More Games Coming Soon</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our team is working on developing more exciting pixel games for you to enjoy and earn rewards.
            Stay tuned for updates!
          </p>
        </div>
      </div>
      
      {/* Pixel art decoration */}
      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>
    </section>
  );
}