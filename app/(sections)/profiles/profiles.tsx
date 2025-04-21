'use client';

import React from 'react';
import Link from 'next/link';

export default function Profiles(): React.ReactNode {
  const featuredProfiles = [
    {
      id: 1,
      name: 'PixelMaster',
      level: 28,
      joinDate: 'February 2023',
      isOnline: true,
      avatar: {
        bgColor: '#4ECDC4',
        faceColor: '#FF6B6B',
        eyeColor: '#0D0D0D'
      }
    },
    {
      id: 2,
      name: 'BlockBuilder',
      level: 42,
      joinDate: 'October 2022',
      isOnline: false,
      avatar: {
        bgColor: '#FFE66D',
        faceColor: '#4ECDC4',
        eyeColor: '#0D0D0D'
      }
    },
    {
      id: 3,
      name: 'VoxelVoyager',
      level: 17,
      joinDate: 'May 2023',
      isOnline: true,
      avatar: {
        bgColor: '#FF6B6B',
        faceColor: '#FFE66D',
        eyeColor: '#0D0D0D'
      }
    }
  ];

  return (
    <section id="profiles" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Community Profiles</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Connect with fellow pixel enthusiasts and join our vibrant community.
        </p>
      </div>

      {/* Featured Profiles */}
      <div className="container mx-auto mb-16">
        <h3 className="text-2xl font-bold text-white mb-8 inline-block border-b-2 border-[#FF6B6B] pb-2">
          Featured Profiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProfiles.map((profile) => (
            <div 
              key={profile.id}
              className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FF6B6B] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Profile Banner */}
              <div className="h-24 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] relative"></div>
              
              {/* Profile Content */}
              <div className="px-6 pt-0 pb-6 relative">
                {/* Avatar */}
                <div className="w-20 h-20 bg-[#0D0D0D] border-4 border-[#1A1A1A] rounded-lg absolute -top-10 left-6 overflow-hidden">
                  {/* Pixel Art Avatar */}
                  <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                    {Array.from({ length: 36 }).map((_, i) => {
                      // First and last rows all background color
                      if (i < 6 || i >= 30) return <div key={i} style={{ backgroundColor: profile.avatar.bgColor }}></div>;
                      
                      // Second and fifth rows with face color in middle
                      if ((i >= 6 && i < 12) || (i >= 24 && i < 30)) {
                        if (i % 6 === 0 || i % 6 === 5) return <div key={i} style={{ backgroundColor: profile.avatar.bgColor }}></div>;
                        return <div key={i} style={{ backgroundColor: profile.avatar.faceColor }}></div>;
                      }
                      
                      // Third and fourth rows with eyes
                      if (i >= 12 && i < 24) {
                        if (i % 6 === 0 || i % 6 === 5) return <div key={i} style={{ backgroundColor: profile.avatar.bgColor }}></div>;
                        if (i === 14 || i === 15 || i === 20 || i === 21) return <div key={i} style={{ backgroundColor: profile.avatar.eyeColor }}></div>;
                        return <div key={i} style={{ backgroundColor: profile.avatar.faceColor }}></div>;
                      }
                      
                      return <div key={i} style={{ backgroundColor: profile.avatar.bgColor }}></div>;
                    })}
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">{profile.name}</h4>
                    <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-2 py-0.5 rounded-full text-xs">
                      Level {profile.level}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">Joined: {profile.joinDate}</p>
                  
                  {/* Status */}
                  <div className="flex items-center mb-4">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${profile.isOnline ? 'bg-[#4ECDC4]' : 'bg-gray-400'}`}></span>
                    <span className={`text-sm ${profile.isOnline ? 'text-[#4ECDC4]' : 'text-gray-400'}`}>
                      {profile.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  
                  {/* Action Button */}
                  <Link 
                    href="/profile" 
                    className="block w-full py-2 bg-transparent border border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B]/10 font-bold rounded text-center text-sm transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Community Highlights */}
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-white mb-8 inline-block border-b-2 border-[#4ECDC4] pb-2">
          Join Our Community
        </h3>
        <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Build Your Digital Identity</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#FFE66D] mr-2">✓</span>
                  Create your unique pixel avatar and profile
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFE66D] mr-2">✓</span>
                  Showcase your collection and achievements
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFE66D] mr-2">✓</span>
                  Connect with like-minded pixel enthusiasts
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFE66D] mr-2">✓</span>
                  Participate in community events and challenges
                </li>
              </ul>
              
              <div className="mt-6">
                <Link 
                  href="/profile" 
                  className="inline-block px-6 py-3 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
                >
                  Create Your Profile
                </Link>
              </div>
            </div>
            
            <div className="bg-[#0D0D0D] p-6 rounded-lg relative">
              <div className="grid grid-cols-5 grid-rows-5 gap-2 max-w-[300px] mx-auto">
                {/* Pixel art community illustration */}
                {Array.from({ length: 25 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`aspect-square rounded ${
                      [0, 4, 6, 8, 12, 16, 18, 20, 24].includes(i) 
                        ? 'bg-[#4ECDC4]/20' 
                        : [1, 3, 5, 9, 15, 19, 21, 23].includes(i)
                          ? 'bg-[#FF6B6B]/20'
                          : [7, 11, 13, 17].includes(i) 
                            ? 'bg-[#FFE66D]/20'
                            : 'bg-neutral-800'
                    }`}
                  >
                    {[2, 10, 14, 22].includes(i) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#1A1A1A] rounded-sm"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-[#FF6B6B] opacity-30"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pixel art decoration absolute positioned elements */}
      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>
    </section>
  );
} 