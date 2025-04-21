"use client"

import { useState } from "react"
import { useUser } from "@/context/user-context"

export default function ProfilePage() {
  const { user } = useUser()
  
  // Loading state in case user data isn't available yet
  if (!user) {
    return (
      <section className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
        <div className="container mx-auto mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
            <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
            <div className="w-3 h-3 bg-[#FFE66D]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Profile</h2>
            <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
            <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
            <div className="w-3 h-3 bg-[#FF6B6B]"></div>
          </div>
          <p className="text-gray-300 text-center my-10">
            Loading profile data...
          </p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Profile</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Manage your account, view your achievements, and track your progress in the PixelVerse.
        </p>
      </div>

      {/* Profile content placeholder */}
      <div className="container mx-auto">
        <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B6B] rounded-full mx-auto flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h3 className="text-2xl font-bold mt-4 text-white">{user?.username || "PixelUser"}</h3>
            <p className="text-gray-400">Joined {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0D0D0D] rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Pixel Balance</p>
              <p className="text-[#FFE66D] text-2xl font-bold">{user?.pixels || 0} PX</p>
            </div>
            <div className="bg-[#0D0D0D] rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Achievements</p>
              <p className="text-[#FF6B6B] text-2xl font-bold">{user?.achievements?.length || 0}</p>
            </div>
            <div className="bg-[#0D0D0D] rounded-lg p-4 text-center">
              <p className="text-gray-400 mb-1">Items Owned</p>
              <p className="text-[#4ECDC4] text-2xl font-bold">{user?.inventory?.length || 0}</p>
            </div>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">This profile page is under construction.</p>
            <p className="text-gray-300">Check back soon for more features!</p>
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