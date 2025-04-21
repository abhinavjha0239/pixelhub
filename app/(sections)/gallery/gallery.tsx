"use client"

import { useState } from "react"
import { useUser } from "@/context/user-context"

export default function Gallery() {
  const { user, addPixels } = useUser()
  const [activeFilter, setActiveFilter] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Handle like artwork
  const handleLikeArtwork = (id: string) => {
    // In a real app, this would call an API to like the artwork
    // For now, we'll just simulate it
    alert(`Artwork ${id} liked!`)
    // Give user some pixels for engagement
    addPixels(5)
  }

  // Sample gallery items
  const galleryItems = [
    {
      id: "art1",
      title: "Pixel Castle",
      artist: "PixelKing",
      category: "landscape",
      likes: 487,
      comments: 56,
      level: "Advanced",
      image: "castle",
    },
    {
      id: "art2",
      title: "Adventure Hero",
      artist: "PixelNinja",
      category: "character",
      likes: 285,
      comments: 32,
      level: "Intermediate",
      image: "hero",
    },
    {
      id: "art3",
      title: "Azure Blade",
      artist: "SwordMaster",
      category: "item",
      likes: 176,
      comments: 18,
      level: "Intermediate",
      image: "sword",
    },
    {
      id: "art4",
      title: "Pixel Valley",
      artist: "LandscapeArtist",
      category: "landscape",
      likes: 342,
      comments: 41,
      level: "Advanced",
      image: "landscape",
    },
    {
      id: "art5",
      title: "Health Potion",
      artist: "AlchemyMaster",
      category: "item",
      likes: 156,
      comments: 14,
      level: "Beginner",
      image: "potion",
    },
    {
      id: "art6",
      title: "Slime Monster",
      artist: "MonsterCreator",
      category: "character",
      likes: 208,
      comments: 27,
      level: "Intermediate",
      image: "monster",
    },
    {
      id: "art7",
      title: "Cozy Cottage",
      artist: "PixelArchitect",
      category: "landscape",
      likes: 174,
      comments: 19,
      level: "Beginner",
      image: "house",
    },
    {
      id: "art8",
      title: "Pixelated Heart",
      artist: "LovePixels",
      category: "icon",
      likes: 425,
      comments: 38,
      level: "Beginner",
      image: "heart",
    },
  ]

  // Filter gallery items
  const filteredItems =
    activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  // Render pixel art based on type
  const renderPixelArt = (type: string) => {
    switch (type) {
      case "castle":
        return (
          <div className="w-full h-full max-w-md max-h-md grid grid-cols-16 grid-rows-16 gap-0.5">
            {/* Sky Layer */}
            <div className="col-span-16 row-span-6 grid grid-cols-16 grid-rows-6">
              <div className="col-span-16 row-span-6 bg-[#4ECDC4]/50"></div>

              {/* Sun */}
              <div className="col-start-3 col-span-2 row-start-2 row-span-2 bg-[#FFE66D] rounded-full"></div>

              {/* Clouds */}
              <div className="col-start-7 col-span-3 row-start-1 row-span-1 bg-white/80 rounded-full"></div>
              <div className="col-start-8 col-span-3 row-start-2 row-span-1 bg-white/80 rounded-full"></div>
              <div className="col-start-6 col-span-3 row-start-2 row-span-1 bg-white/80 rounded-full"></div>
            </div>

            {/* Ground Layer */}
            <div className="col-span-16 row-span-4 row-start-13 bg-[#4ECDC4]"></div>

            {/* Castle Base */}
            <div className="col-start-5 col-span-8 row-start-10 row-span-3 bg-[#FF6B6B]"></div>

            {/* Castle Towers */}
            <div className="col-start-4 col-span-2 row-start-8 row-span-2 bg-[#FF6B6B]"></div>
            <div className="col-start-12 col-span-2 row-start-8 row-span-2 bg-[#FF6B6B]"></div>

            {/* Castle Door */}
            <div className="col-start-8 col-span-2 row-start-11 row-span-2 bg-[#0D0D0D]"></div>
          </div>
        )
      case "hero":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto grid grid-cols-8 grid-rows-8 gap-0.5">
            {/* Character Head */}
            <div className="col-start-3 col-span-4 row-start-1 row-span-3 bg-[#FF6B6B] rounded-t-lg"></div>

            {/* Character Eyes */}
            <div className="col-start-4 col-span-1 row-start-2 row-span-1 bg-[#0D0D0D]"></div>
            <div className="col-start-5 col-span-1 row-start-2 row-span-1 bg-[#0D0D0D]"></div>

            {/* Character Body */}
            <div className="col-start-3 col-span-4 row-start-4 row-span-3 bg-[#4ECDC4]"></div>

            {/* Character Arms */}
            <div className="col-start-2 col-span-1 row-start-4 row-span-2 bg-[#4ECDC4]"></div>
            <div className="col-start-7 col-span-1 row-start-4 row-span-2 bg-[#4ECDC4]"></div>

            {/* Character Legs */}
            <div className="col-start-3 col-span-1 row-start-7 row-span-2 bg-[#FFE66D]"></div>
            <div className="col-start-6 col-span-1 row-start-7 row-span-2 bg-[#FFE66D]"></div>
          </div>
        )
      case "sword":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto relative">
            {/* Sword Handle */}
            <div className="absolute w-4 h-24 bg-[#FFE66D] bottom-8 left-1/2 transform -translate-x-1/2"></div>

            {/* Sword Guard */}
            <div className="absolute w-24 h-4 bg-[#FF6B6B] bottom-32 left-1/2 transform -translate-x-1/2"></div>

            {/* Sword Blade */}
            <div className="absolute w-8 h-48 bg-[#4ECDC4] bottom-36 left-1/2 transform -translate-x-1/2"></div>

            {/* Sword Tip */}
            <div className="absolute w-8 h-8 bg-[#4ECDC4] bottom-84 left-1/2 transform -translate-x-1/2 rotate-45"></div>
          </div>
        )
      case "landscape":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto relative">
            {/* Sky */}
            <div className="absolute inset-0 h-2/3 bg-gradient-to-b from-[#4ECDC4] to-[#4ECDC4]/50"></div>

            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#FF6B6B]/80"></div>

            {/* Sun */}
            <div className="absolute top-8 right-8 w-12 h-12 bg-[#FFE66D] rounded-full"></div>

            {/* Mountains */}
            <div className="absolute bottom-1/3 left-1/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent border-b-[#FFE66D]/80"></div>
            <div className="absolute bottom-1/3 left-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[80px] border-l-transparent border-r-transparent border-b-[#FFE66D]/80"></div>
          </div>
        )
      case "potion":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto relative">
            {/* Potion Bottle */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-[#FF6B6B]/70 rounded-b-lg rounded-t-sm"></div>

            {/* Bottle Neck */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-[#FF6B6B]/70 rounded-t-sm"></div>

            {/* Bottle Cap */}
            <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#FFE66D]"></div>

            {/* Potion Bubbles */}
            <div className="absolute bottom-16 left-1/3 w-4 h-4 bg-[#4ECDC4]/50 rounded-full"></div>
            <div className="absolute bottom-24 left-1/2 w-6 h-6 bg-[#4ECDC4]/50 rounded-full"></div>
          </div>
        )
      case "monster":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto grid grid-cols-10 grid-rows-10 gap-0.5">
            {/* Monster Body */}
            <div className="col-start-3 col-span-6 row-start-3 row-span-6 bg-[#4ECDC4]"></div>

            {/* Monster Eyes */}
            <div className="col-start-4 col-span-1 row-start-4 row-span-1 bg-[#FF6B6B]"></div>
            <div className="col-start-7 col-span-1 row-start-4 row-span-1 bg-[#FF6B6B]"></div>

            {/* Monster Mouth */}
            <div className="col-start-5 col-span-2 row-start-6 row-span-1 bg-[#0D0D0D]"></div>

            {/* Monster Tentacles */}
            <div className="col-start-2 col-span-1 row-start-5 row-span-2 bg-[#4ECDC4]"></div>
            <div className="col-start-9 col-span-1 row-start-5 row-span-2 bg-[#4ECDC4]"></div>
          </div>
        )
      case "house":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto relative">
            {/* House Base */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-[#FFE66D]"></div>

            {/* House Roof */}
            <div
              className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#FF6B6B]"
              style={{ width: "52px" }}
            ></div>

            {/* House Door */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-[#FF6B6B]"></div>

            {/* House Windows */}
            <div className="absolute bottom-24 left-1/3 w-8 h-8 bg-[#4ECDC4]"></div>
            <div className="absolute bottom-24 right-1/3 w-8 h-8 bg-[#4ECDC4]"></div>
          </div>
        )
      case "heart":
        return (
          <div className="w-full h-full max-w-[160px] max-h-[160px] mx-auto relative">
            {/* Heart Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
              <div className="absolute top-0 left-0 w-16 h-16 bg-[#FF6B6B] rounded-full"></div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF6B6B] rounded-full"></div>
              <div className="absolute bottom-0 left-0 right-0 w-32 h-16 bg-[#FF6B6B]"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-45 w-16 h-16 bg-[#FF6B6B]"></div>
            </div>
          </div>
        )
      default:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No preview available</span>
          </div>
        )
    }
  }

  return (
    <section id="gallery" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Gallery</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Explore amazing pixel art creations from our community or share your own masterpieces!
        </p>
      </div>

      {/* Gallery Filter Controls */}
      <div className="container mx-auto mb-8">
        <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 ${activeFilter === "all" ? "bg-[#FF6B6B] text-black" : "bg-transparent border border-neutral-700 text-white hover:bg-[#1A1A1A]/80"} font-bold rounded-md transition-colors`}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 ${activeFilter === "character" ? "bg-[#FF6B6B] text-black" : "bg-transparent border border-neutral-700 text-white hover:bg-[#1A1A1A]/80"} font-bold rounded-md transition-colors`}
                onClick={() => setActiveFilter("character")}
              >
                Characters
              </button>
              <button
                className={`px-4 py-2 ${activeFilter === "landscape" ? "bg-[#FF6B6B] text-black" : "bg-transparent border border-neutral-700 text-white hover:bg-[#1A1A1A]/80"} font-bold rounded-md transition-colors`}
                onClick={() => setActiveFilter("landscape")}
              >
                Landscapes
              </button>
              <button
                className={`px-4 py-2 ${activeFilter === "item" ? "bg-[#FF6B6B] text-black" : "bg-transparent border border-neutral-700 text-white hover:bg-[#1A1A1A]/80"} font-bold rounded-md transition-colors`}
                onClick={() => setActiveFilter("item")}
              >
                Items
              </button>
              <button
                className={`px-4 py-2 ${activeFilter === "icon" ? "bg-[#FF6B6B] text-black" : "bg-transparent border border-neutral-700 text-white hover:bg-[#1A1A1A]/80"} font-bold rounded-md transition-colors`}
                onClick={() => setActiveFilter("icon")}
              >
                Icons
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex">
                <select className="bg-[#0D0D0D] border border-neutral-600 rounded-l-md py-2 px-4 text-white focus:outline-none focus:border-[#4ECDC4]">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Most Liked</option>
                  <option>Most Commented</option>
                </select>
                <button
                  className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded-r-md px-4 py-2 transition-colors"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload Art
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FF6B6B]/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square bg-[#0D0D0D] p-4 flex items-center justify-center">
                {renderPixelArt(item.image)}
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <div className="flex items-center">
                    <button
                      className="text-gray-400 hover:text-[#FF6B6B] transition-colors mr-1"
                      onClick={() => handleLikeArtwork(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <span className="text-gray-400 text-sm">{item.likes}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-[#0D0D0D] mr-2 flex items-center justify-center">
                      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#0D0D0D]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                        <div className="bg-[#FF6B6B]"></div>
                      </div>
                    </div>
                    <span className="text-gray-300 text-xs">{item.artist}</span>
                  </div>
                  <span className="text-gray-500 text-xs">2 days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-neutral-700 text-gray-300 hover:bg-[#FF6B6B] hover:text-black hover:border-[#FF6B6B] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-[#FF6B6B] border border-[#FF6B6B] text-black font-bold"
            >
              1
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-neutral-700 text-white hover:bg-[#FF6B6B] hover:text-black hover:border-[#FF6B6B] transition-colors"
            >
              2
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-neutral-700 text-white hover:bg-[#FF6B6B] hover:text-black hover:border-[#FF6B6B] transition-colors"
            >
              3
            </a>
            <span className="text-gray-500 px-2">...</span>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-neutral-700 text-white hover:bg-[#FF6B6B] hover:text-black hover:border-[#FF6B6B] transition-colors"
            >
              12
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-neutral-700 text-gray-300 hover:bg-[#FF6B6B] hover:text-black hover:border-[#FF6B6B] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      {/* Pixel art decoration absolute positioned elements */}
      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>

      {/* Upload Artwork Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-neutral-600 w-full max-w-2xl relative transform transition-all">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none z-10"
                onClick={() => setShowUploadModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-4">Upload Your Pixel Art</h3>

                <form>
                  <div className="mb-4">
                    <label htmlFor="artworkTitle" className="block text-gray-300 font-medium mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      id="artworkTitle"
                      className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#4ECDC4]"
                      placeholder="Give your artwork a name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="artworkCategory" className="block text-gray-300 font-medium mb-2">
                      Category
                    </label>
                    <select
                      id="artworkCategory"
                      className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#4ECDC4]"
                    >
                      <option value="">Select a category</option>
                      <option value="character">Character</option>
                      <option value="landscape">Landscape</option>
                      <option value="item">Item</option>
                      <option value="icon">Icon</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-2">Upload Art</label>
                    <div className="border-2 border-dashed border-neutral-600 rounded-lg p-6 text-center cursor-pointer hover:border-[#4ECDC4] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-gray-300 mb-2">Drag & drop your pixel art here</p>
                      <p className="text-gray-400 text-sm mb-4">
                        Supported formats: PNG, GIF (for animations). Max 5MB.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded-md transition-colors inline-block"
                      >
                        Browse Files
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="artworkDescription" className="block text-gray-300 font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      id="artworkDescription"
                      rows={3}
                      className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#4ECDC4]"
                      placeholder="Describe your artwork - tools used, inspiration, process, etc."
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="artworkTags" className="block text-gray-300 font-medium mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      id="artworkTags"
                      className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#4ECDC4]"
                      placeholder="e.g. landscape, character, fantasy"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                    <button
                      type="button"
                      className="px-6 py-2 bg-transparent border border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors"
                      onClick={() => setShowUploadModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-medium rounded-md transition-colors"
                      onClick={() => {
                        alert("Artwork uploaded successfully!")
                        setShowUploadModal(false)
                        // Give user some pixels for contribution
                        addPixels(50)
                      }}
                    >
                      Upload Artwork
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
