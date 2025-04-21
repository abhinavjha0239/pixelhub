'use client';

import React from 'react';

export default function Community(): React.ReactNode {
  return (
    <section id="community" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
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
        <p className="text-gray-300 text-center max-w-2xl mx-auto">Connect with fellow pixel enthusiasts in the PixelVerse community.</p>
      </div>

      {/* Community Content */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forums Card */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-700">
              <h3 className="text-white font-bold text-xl">Forums</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-[#0D0D0D] p-4 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#4ECDC4]">🎮</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Gaming Discussion</h4>
                      <p className="text-gray-400 text-sm">324 topics • 2.1k posts</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">Discuss game strategies, share tips, and connect with fellow gamers.</p>
                </div>

                <div className="bg-[#0D0D0D] p-4 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#FF6B6B]">🖼️</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Pixel Art Showcase</h4>
                      <p className="text-gray-400 text-sm">186 topics • 1.3k posts</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">Share your pixel art creations and get feedback from the community.</p>
                </div>

                <div className="bg-[#0D0D0D] p-4 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-[#FFE66D]/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#FFE66D]">💰</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Marketplace Talk</h4>
                      <p className="text-gray-400 text-sm">214 topics • 1.8k posts</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">Discuss collectibles, trading strategies, and marketplace trends.</p>
                </div>
              </div>

              <button className="w-full mt-6 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors text-sm">
                Browse All Forums
              </button>
            </div>
          </div>

          {/* Events Card */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-700">
              <h3 className="text-white font-bold text-xl">Upcoming Events</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] p-[1px] rounded-lg">
                    <div className="bg-[#0D0D0D] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-bold">Pixel Art Contest</h4>
                        <span className="bg-[#FF6B6B]/20 text-[#FF6B6B] px-2 py-1 rounded text-xs">Featured</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Create pixel art based on this month's theme: "Future Worlds"</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">Starts in 2 days</span>
                        <button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black px-3 py-1 rounded text-sm font-bold">
                          Join Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0D0D0D] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-bold">Community Game Night</h4>
                    <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-2 py-1 rounded text-xs">Weekly</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Join us for multiplayer games and voice chat with the community</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Every Friday, 8PM UTC</span>
                    <button className="bg-transparent border border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10 px-3 py-1 rounded text-sm font-bold">
                      Remind Me
                    </button>
                  </div>
                </div>

                <div className="bg-[#0D0D0D] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-bold">Developer AMA Session</h4>
                    <span className="bg-[#FFE66D]/20 text-[#FFE66D] px-2 py-1 rounded text-xs">Special</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Ask our development team anything about the PixelVerse</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">May 15, 6PM UTC</span>
                    <button className="bg-transparent border border-white text-white hover:bg-white/10 px-3 py-1 rounded text-sm font-bold">
                      Add Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Community Stats & Leaderboard */}
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-700">
                <h3 className="text-white font-bold text-xl">Community Stats</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Members</p>
                    <p className="text-[#4ECDC4] font-bold text-lg">24,856</p>
                  </div>
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Online Now</p>
                    <p className="text-[#FF6B6B] font-bold text-lg">1,423</p>
                  </div>
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Posts Today</p>
                    <p className="text-[#FFE66D] font-bold text-lg">347</p>
                  </div>
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">New Members</p>
                    <p className="text-white font-bold text-lg">86</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-700 flex justify-between items-center">
                <h3 className="text-white font-bold text-xl">Top Contributors</h3>
                <span className="text-gray-400 text-xs">This Week</span>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#0D0D0D] rounded flex items-center justify-center text-[#FFE66D] font-bold mr-3">1</div>
                    <div className="w-10 h-10 bg-[#0D0D0D] rounded-lg overflow-hidden mr-3">
                      {/* Pixel Avatar */}
                      <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                        {/* Simplified avatar representation */}
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">PixelMaster</h4>
                      <p className="text-gray-400 text-xs">143 contributions</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-[#FFE66D]/20 text-[#FFE66D] px-2 py-1 rounded-full text-xs">+28%</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#0D0D0D] rounded flex items-center justify-center text-[#4ECDC4] font-bold mr-3">2</div>
                    <div className="w-10 h-10 bg-[#0D0D0D] rounded-lg overflow-hidden mr-3">
                      {/* Simplified avatar */}
                      <div className="bg-[#FF6B6B] h-full w-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">ArtCreator99</h4>
                      <p className="text-gray-400 text-xs">121 contributions</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-[#FF6B6B]/20 text-[#FF6B6B] px-2 py-1 rounded-full text-xs">+14%</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#0D0D0D] rounded flex items-center justify-center text-[#FF6B6B] font-bold mr-3">3</div>
                    <div className="w-10 h-10 bg-[#0D0D0D] rounded-lg overflow-hidden mr-3">
                      {/* Simplified avatar */}
                      <div className="bg-[#4ECDC4] h-full w-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">PixelWizard</h4>
                      <p className="text-gray-400 text-xs">98 contributions</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-2 py-1 rounded-full text-xs">+7%</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 py-2 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded text-sm transition-colors">
                  View Full Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 