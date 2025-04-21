"use client";

import React, { useState, useEffect } from 'react';
import Hero from '@/app/components/hero';
import { useUser } from "@/context/user-context";
import { useGameContext } from "@/context/game-context";
import Link from "next/link";

export default function HomePage() {
  const { user, addPixels } = useUser();
  const { pixelCoins } = useGameContext();
  const [showPixelReward, setShowPixelReward] = useState(false);
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);

  // Check if daily reward has been claimed
  useEffect(() => {
    const lastClaimDate = localStorage.getItem('last_daily_claim');
    const today = new Date().toDateString();
    
    if (lastClaimDate !== today && user) {
      setShowPixelReward(true);
      // Add daily reward
      const rewardAmount = 10;
      setTimeout(() => {
        addPixels(rewardAmount);
        localStorage.setItem('last_daily_claim', today);
        setDailyRewardClaimed(true);
      }, 1000);
      
      const timer = setTimeout(() => {
        setShowPixelReward(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [user, addPixels]);

  return (
    <div className="bg-gradient-to-b from-[#0f1318] to-[#232b35]">
      <Hero />
      
      {/* Features Section */}
      <div className="container mx-auto py-20 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore PixelVerse</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/marketplace" className="group">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-neutral-700 hover:border-[#4ECDC4] transition-all duration-300 hover:shadow-lg hover:shadow-[#4ECDC4]/10">
              <div className="w-12 h-12 bg-[#4ECDC4]/20 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-[#4ECDC4] rounded-md"></div>
              </div>
              <h3 className="font-bold text-xl mb-2">Marketplace</h3>
              <p className="text-gray-400 text-sm">Browse and collect unique pixel art items and collectibles</p>
            </div>
          </Link>
          
          <Link href="/games" className="group">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-neutral-700 hover:border-[#FF6B6B] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B6B]/10">
              <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-[#FF6B6B] rounded-md"></div>
              </div>
              <h3 className="font-bold text-xl mb-2">Games</h3>
              <p className="text-gray-400 text-sm">Play addictive pixel art games and earn rewards</p>
            </div>
          </Link>
          
          <Link href="/quests" className="group">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-neutral-700 hover:border-[#FFE66D] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFE66D]/10">
              <div className="w-12 h-12 bg-[#FFE66D]/20 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-[#FFE66D] rounded-md"></div>
              </div>
              <h3 className="font-bold text-xl mb-2">Quests</h3>
              <p className="text-gray-400 text-sm">Complete exciting quests to unlock rewards and achievements</p>
            </div>
          </Link>
          
          <Link href="/gallery" className="group">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-neutral-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded-md"></div>
              </div>
              <h3 className="font-bold text-xl mb-2">Gallery</h3>
              <p className="text-gray-400 text-sm">Explore amazing pixel art creations from our community</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Pixel reward animation */}
      {showPixelReward && user && (
        <div className="fixed bottom-4 right-4 bg-[#1A1A1A] border border-[#FFE66D] rounded-lg p-4 shadow-lg animate-slide-up z-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#FFE66D]/20 rounded-lg flex items-center justify-center mr-3">
              <div className="w-5 h-5 bg-[#FFE66D] rounded-md"></div>
            </div>
            <div>
              <h4 className="font-bold text-white">Daily Reward!</h4>
              <p className="text-[#FFE66D] text-sm">+10 PX added to your wallet</p>
            </div>
          </div>
        </div>
      )}
      
      {/* User status */}
      {user && (
        <div className="container mx-auto py-10 px-4 md:px-8">
          <div className="bg-[#1A1A1A] rounded-lg p-6 border border-neutral-700">
            <h3 className="font-bold text-xl mb-4 text-white">Your Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0D0D0D] p-4 rounded-lg">
                <h4 className="text-[#4ECDC4] font-medium mb-2">Level Progress</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Level {user.level}</span>
                  <span className="text-gray-400">{user.xp} XP</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#4ECDC4] h-2 rounded-full" 
                    style={{width: `${(user.xp % 1000) / 10}%`}}
                  ></div>
                </div>
                <div className="text-gray-400 text-xs mt-2">
                  {1000 - (user.xp % 1000)} XP to next level
                </div>
              </div>
              
              <div className="bg-[#0D0D0D] p-4 rounded-lg">
                <h4 className="text-[#FF6B6B] font-medium mb-2">Currency</h4>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#FF6B6B]/20 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-[#FF6B6B] rounded-sm"></div>
                  </div>
                  <div>
                    <div className="text-white font-bold">{user.pixels} Pixels</div>
                    <div className="text-gray-400 text-xs">In-game currency</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0D0D0D] p-4 rounded-lg">
                <h4 className="text-[#FFE66D] font-medium mb-2">Achievements</h4>
                <div className="text-white font-bold text-2xl">{user.achievements.length}</div>
                <div className="text-gray-400 text-xs">Unlocked</div>
                {user.achievements.length === 0 && (
                  <div className="mt-2 text-gray-400 text-sm">
                    Play games to earn achievements!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Animated styles */}
      <style jsx>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
