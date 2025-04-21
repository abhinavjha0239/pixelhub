"use client";

import React from 'react';
import Link from 'next/link';

interface GameCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  pixelReward: number;
  imageUrl?: string;
}

export default function GameCard({ id, title, description, category, pixelReward, imageUrl }: GameCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#4ECDC4] transition-all duration-300 hover:shadow-lg hover:shadow-[#4ECDC4]/10">
      <div className="relative h-40 w-full bg-[#0D0D0D]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
            <span className="text-4xl">🎮</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold bg-[#0D0D0D] text-[#4ECDC4] px-2 py-1 rounded">
            {category}
          </span>
          <span className="text-xs font-semibold bg-[#0D0D0D] text-[#FFE66D] px-2 py-1 rounded flex items-center">
            <span className="mr-1">+{pixelReward}</span>
            <span className="text-xs">PX</span>
          </span>
        </div>
        <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <Link href={`/games/${id}`} className="block w-full">
          <button className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#556270] text-white py-2 rounded-md hover:opacity-90 transition-opacity">
            Play Now
          </button>
        </Link>
      </div>
    </div>
  );
} 