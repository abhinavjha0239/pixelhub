'use client';

import React, { useState } from 'react';

export default function Profile(): React.ReactNode {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  return (
    <section id="profiles" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Profiles</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">Customize your digital identity and showcase your achievements in the PixelVerse.</p>
      </div>

      {/* Main Profile Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: User Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden mb-6">
              {/* Profile Banner - Customizable */}
              <div className="h-32 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] relative">
                {/* Theme Selector Button */}
                <button 
                  onClick={() => setIsThemeModalOpen(true)}
                  className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              
              {/* Profile Avatar and Info */}
              <div className="px-6 pt-0 pb-6 relative">
                {/* Pixel Art Avatar */}
                <div className="w-24 h-24 bg-[#0D0D0D] border-4 border-[#1A1A1A] rounded-lg absolute -top-12 left-6 overflow-hidden">
                  {/* Pixel Art Face Using Grid */}
                  <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#0D0D0D]"></div>
                    <div className="bg-[#0D0D0D]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#0D0D0D]"></div>
                    <div className="bg-[#0D0D0D]"></div>
                    <div className="bg-[#FF6B6B]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                    <div className="bg-[#4ECDC4]"></div>
                  </div>
                  
                  {/* Edit Avatar Button */}
                  <button 
                    onClick={() => setIsAvatarModalOpen(true)}
                    className="absolute bottom-0 right-0 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black p-1 rounded-tl-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                
                {/* User Info */}
                <div className="mt-14">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">PixelMaster</h3>
                    <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-2 py-1 rounded-full text-xs">Level 28</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Joined: February 2023</p>
                  
                  {/* User Status */}
                  <div className="flex items-center mb-4">
                    <span className="inline-block w-2 h-2 bg-[#4ECDC4] rounded-full mr-2"></span>
                    <span className="text-[#4ECDC4] text-sm">Online</span>
                    <span className="mx-2 text-gray-600">•</span>
                    <span className="text-gray-400 text-sm">Last Quest: 2 hours ago</span>
                  </div>
                  
                  {/* Profile Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors text-sm">Edit Profile</button>
                    <button className="flex-1 py-2 bg-transparent border border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10 font-bold rounded transition-colors text-sm">Share Profile</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-neutral-700">
                <h4 className="text-white font-bold">Player Stats</h4>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Total XP</p>
                    <p className="text-[#FFE66D] font-bold text-lg">24,850</p>
                  </div>
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">PX Tokens</p>
                    <p className="text-[#4ECDC4] font-bold text-lg">3,720</p>
                  </div>
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Quests</p>
                    <p className="text-[#FF6B6B] font-bold text-lg">178</p>
                  </div>
                  <div className="bg-[#0D0D0D] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Collectibles</p>
                    <p className="text-white font-bold text-lg">42</p>
                  </div>
                </div>
                
                {/* Level Progress */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm">Level 28</span>
                    <span className="text-gray-400 text-xs">5,150 / 10,000 XP</span>
                  </div>
                  <div className="w-full bg-[#0D0D0D] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] h-2 rounded-full" style={{width: '51.5%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Badges Card */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-700 flex justify-between items-center">
                <h4 className="text-white font-bold">Badges</h4>
                <span className="text-gray-400 text-xs">18/42 Unlocked</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-2">
                  {/* Badge 1 */}
                  <div className="aspect-square bg-[#0D0D0D] rounded-lg flex items-center justify-center relative group">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center">
                      <span className="text-[#FF6B6B]">🏆</span>
                    </div>
                    {/* Badge Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-[#0D0D0D] border border-neutral-700 rounded p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-white text-xs font-bold">First Victory</p>
                      <p className="text-gray-400 text-xs">Completed first quest</p>
                    </div>
                  </div>
                  
                  {/* More Badges */}
                  {/* Badge 2 */}
                  <div className="aspect-square bg-[#0D0D0D] rounded-lg flex items-center justify-center relative group">
                    <div className="w-8 h-8 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center">
                      <span className="text-[#4ECDC4]">💎</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-[#0D0D0D] border border-neutral-700 rounded p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-white text-xs font-bold">Collector</p>
                      <p className="text-gray-400 text-xs">Owned 10 items</p>
                    </div>
                  </div>
                  
                  {/* Badge 3 */}
                  <div className="aspect-square bg-[#0D0D0D] rounded-lg flex items-center justify-center relative group">
                    <div className="w-8 h-8 rounded-full bg-[#FFE66D]/20 flex items-center justify-center">
                      <span className="text-[#FFE66D]">⭐</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-[#0D0D0D] border border-neutral-700 rounded p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-white text-xs font-bold">Rising Star</p>
                      <p className="text-gray-400 text-xs">Reached Level 10</p>
                    </div>
                  </div>
                  
                  {/* Badge 4 */}
                  <div className="aspect-square bg-[#0D0D0D] rounded-lg flex items-center justify-center relative group">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center">
                      <span className="text-[#FF6B6B]">🔥</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-[#0D0D0D] border border-neutral-700 rounded p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="text-white text-xs font-bold">Hot Streak</p>
                      <p className="text-gray-400 text-xs">7 days active</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded text-sm transition-colors">
                  View All Badges
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg mb-6 overflow-hidden">
              <div className="flex border-b border-neutral-700">
                <button className="flex-1 py-4 text-white font-bold border-b-2 border-[#FF6B6B]">Collection</button>
                <button className="flex-1 py-4 text-gray-400 hover:text-white transition-colors">Activity</button>
                <button className="flex-1 py-4 text-gray-400 hover:text-white transition-colors">Gallery</button>
                <button className="flex-1 py-4 text-gray-400 hover:text-white transition-colors">Friends</button>
              </div>
            </div>
            
            {/* Collection Content */}
            <div>
              {/* Featured Collectibles */}
              <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg mb-6 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-700 flex justify-between items-center">
                  <h4 className="text-white font-bold">Featured Collectibles</h4>
                  <button className="text-[#4ECDC4] text-sm hover:underline">Edit Display</button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Collectible items */}
                    <div className="bg-[#0D0D0D] border border-neutral-700 hover:border-[#FF6B6B]/50 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                      <div className="aspect-square p-4 flex items-center justify-center">
                        <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
                          <div className="absolute w-2 h-16 bg-[#4ECDC4] top-0 left-1/2 transform -translate-x-1/2"></div>
                          <div className="absolute w-10 h-2 bg-[#FFE66D] top-16 left-1/2 transform -translate-x-1/2"></div>
                          <div className="absolute w-6 h-6 bg-[#FF6B6B] top-18 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                      </div>
                      <div className="p-3 bg-black/30">
                        <div className="flex justify-between items-center">
                          <h5 className="text-white text-sm font-bold">Flame Blade</h5>
                          <span className="text-[#FF6B6B] text-xs">Rare</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* More collectibles would go here */}
                  </div>
                </div>
              </div>
              
              {/* Collection Categories */}
              <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg mb-6 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-700">
                  <h4 className="text-white font-bold">Collection Categories</h4>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Categories */}
                    <div className="bg-[#0D0D0D] border border-neutral-700 hover:border-[#FF6B6B]/50 rounded-lg overflow-hidden transition-colors p-4 flex items-center">
                      <div className="mr-4 w-12 h-12 bg-[#FF6B6B]/20 rounded-lg flex items-center justify-center">
                        <span className="text-[#FF6B6B] text-xl">⚔️</span>
                      </div>
                      <div>
                        <h5 className="text-white font-bold">Weapons</h5>
                        <p className="text-gray-400 text-sm">12 items</p>
                      </div>
                      <div className="ml-auto">
                        <button className="text-[#FF6B6B] hover:underline text-sm">View</button>
                      </div>
                    </div>
                    
                    {/* More categories would go here */}
                  </div>
                  
                  <button className="w-full mt-4 py-2 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded text-sm transition-colors">
                    View Complete Collection
                  </button>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-700">
                  <h4 className="text-white font-bold">Recent Activity</h4>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Activity items */}
                    <div className="border-b border-neutral-700 pb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-[#FF6B6B]">🏆</span>
                        </div>
                        <div>
                          <p className="text-white">Completed the "Pixel Hunter" quest</p>
                          <p className="text-gray-400 text-sm">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* More activity items would go here */}
                  </div>
                  
                  <button className="w-full mt-6 py-2 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded text-sm transition-colors">
                    View All Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pixel art decoration absolute positioned elements */}
      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>

      {/* Theme Selection Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={() => setIsThemeModalOpen(false)}></div>
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-neutral-600 w-full max-w-md relative transform transition-all">
              {/* Close Button */}
              <button 
                onClick={() => setIsThemeModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-4">Profile Theme</h3>
                <p className="text-gray-300 mb-6">Choose a theme for your profile banner</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Theme options */}
                  <div className="cursor-pointer border-2 border-[#FF6B6B] rounded-lg overflow-hidden">
                    <div className="h-16 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B]"></div>
                    <div className="p-2 text-center bg-[#0D0D0D]">
                      <p className="text-white text-sm">Cyber Sunset</p>
                    </div>
                  </div>
                  
                  {/* More theme options would go here */}
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsThemeModalOpen(false)}
                    className="flex-1 py-2 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsThemeModalOpen(false)}
                    className="flex-1 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
                  >
                    Apply Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Editor Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={() => setIsAvatarModalOpen(false)}></div>
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-neutral-600 w-full max-w-lg relative transform transition-all">
              {/* Close Button */}
              <button 
                onClick={() => setIsAvatarModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-4">Customize Avatar</h3>
                <p className="text-gray-300 mb-6">Design your pixel art avatar</p>
                
                <div className="flex flex-col md:flex-row mb-6">
                  {/* Avatar preview and editor controls */}
                  <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
                    <div className="w-40 h-40 bg-[#0D0D0D] border-4 border-[#1A1A1A] rounded-lg overflow-hidden">
                      {/* Pixel Art Face Using Grid */}
                      <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                        {/* Avatar pixels would be mapped here */}
                        <div className="bg-[#4ECDC4]"></div>
                        <div className="bg-[#4ECDC4]"></div>
                        {/* ...and so on */}
                      </div>
                    </div>
                  </div>
                  
                  {/* Editor Controls */}
                  <div className="md:w-2/3 md:pl-6">
                    {/* Color pickers and other controls */}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="py-2 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded transition-colors">
                    Randomize
                  </button>
                  <button 
                    onClick={() => setIsAvatarModalOpen(false)}
                    className="py-2 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsAvatarModalOpen(false)}
                    className="py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
                  >
                    Save Avatar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 