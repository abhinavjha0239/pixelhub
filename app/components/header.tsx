"use client"

import { useState, useEffect } from "react"
import { useGameContext } from "@/context/game-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { pixelCoins = 0, achievements = [], collectibles = [] } = useGameContext() || { pixelCoins: 0, achievements: [], collectibles: [] }
  const [displayedCoins, setDisplayedCoins] = useState(pixelCoins)
  const pathname = usePathname()

  // Update displayed coins when pixelCoins changes
  useEffect(() => {
    setDisplayedCoins(pixelCoins)
  }, [pixelCoins])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Function to check if the current route matches a specific path
  const isActivePath = (path: string) => {
    return pathname === path
  }

  // Prevent event propagation for header links to ensure they work in all pages
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div>
      <nav id="header" className="sticky top-0 z-50 px-4 py-3 bg-[#0D0D0D] border-b border-neutral-200/10">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold" onClick={handleLinkClick}>
              <span className="text-[#FF6B6B]">Pixel</span>
              <span className="text-[#4ECDC4]">Verse</span>
            </Link>
          </div>

          {/* Desktop Nav Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors duration-300 ${isActivePath("/") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"} font-bold`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className={`transition-colors duration-300 ${isActivePath("/marketplace") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"}`}
              onClick={handleLinkClick}
            >
              Marketplace
            </Link>
            <Link
              href="/games"
              className={`transition-colors duration-300 ${isActivePath("/games") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"}`}
              onClick={handleLinkClick}
            >
              Games
            </Link>
            <Link
              href="/quests"
              className={`transition-colors duration-300 ${isActivePath("/quests") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"}`}
              onClick={handleLinkClick}
            >
              Quests
            </Link>
            <Link
              href="/gallery"
              className={`transition-colors duration-300 ${isActivePath("/gallery") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"}`}
              onClick={handleLinkClick}
            >
              Gallery
            </Link>
            <Link
              href="/community"
              className={`transition-colors duration-300 ${isActivePath("/community") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"}`}
              onClick={handleLinkClick}
            >
              Community
            </Link>
            <Link
              href="/profile"
              className={`transition-colors duration-300 ${isActivePath("/profile") ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"}`}
              onClick={handleLinkClick}
            >
              Profile
            </Link>
          </div>

          {/* User Stats */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="px-3 py-1 bg-[#1A1A1A] rounded-full flex items-center">
              <span className="text-[#FFE66D] mr-2">🪙</span>
              <span className="text-white font-bold">{displayedCoins}</span>
            </div>
            <div className="px-3 py-1 bg-[#1A1A1A] rounded-full flex items-center">
              <span className="text-[#FF6B6B] mr-2">🏆</span>
              <span className="text-white font-bold">{achievements.length}</span>
            </div>
            <div className="px-3 py-1 bg-[#1A1A1A] rounded-full flex items-center">
              <span className="text-[#4ECDC4] mr-2">🎮</span>
              <span className="text-white font-bold">{collectibles.length}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            {!isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-neutral-800/80 backdrop-blur-lg rounded-md m-2">
            <Link
              href="/"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/marketplace") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Marketplace
            </Link>
            <Link
              href="/games"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/games") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Games
            </Link>
            <Link
              href="/quests"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/quests") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Quests
            </Link>
            <Link
              href="/gallery"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/gallery") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Gallery
            </Link>
            <Link
              href="/community"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/community") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Community
            </Link>
            <Link
              href="/profile"
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActivePath("/profile") ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={(e) => {
                handleLinkClick(e);
                closeMenu();
              }}
            >
              Profile
            </Link>

            {/* Mobile User Stats */}
            <div className="pt-4 flex justify-between px-3">
              <div className="px-3 py-1 bg-[#1A1A1A] rounded-full flex items-center">
                <span className="text-[#FFE66D] mr-2">🪙</span>
                <span className="text-white font-bold">{displayedCoins}</span>
              </div>
              <div className="px-3 py-1 bg-[#1A1A1A] rounded-full flex items-center">
                <span className="text-[#FF6B6B] mr-2">🏆</span>
                <span className="text-white font-bold">{achievements.length}</span>
              </div>
              <div className="px-3 py-1 bg-[#1A1A1A] rounded-full flex items-center">
                <span className="text-[#4ECDC4] mr-2">🎮</span>
                <span className="text-white font-bold">{collectibles.length}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
