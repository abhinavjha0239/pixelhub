"use client"

import { useUser } from "@/context/user-context"

export default function Featured() {
  const { user, addToInventory, addPixels } = useUser()

  const handleCollect = (itemId: string, itemName: string, itemType: string, rarity: string) => {
    // Check if user already has this item
    if (user?.inventory.some((item) => item.id === itemId)) {
      alert("You already have this item in your collection!")
      return
    }

    // Add to inventory
    addToInventory({
      id: itemId,
      name: itemName,
      type: itemType,
      rarity: rarity,
      acquired: new Date().toISOString(),
    })

    // Reward pixels based on rarity
    const pixelRewards = {
      common: 10,
      uncommon: 25,
      rare: 50,
      epic: 100,
      legendary: 200,
    }

    addPixels(pixelRewards[rarity as keyof typeof pixelRewards] || 10)

    alert(`${itemName} added to your collection! +${pixelRewards[rarity as keyof typeof pixelRewards] || 10} PX`)
  }

  return (
    <section id="featured" className="bg-[#0D0D0D] py-20 px-4 md:px-8 relative">
      {/* Section header with pixel art decoration */}
      <div className="container mx-auto mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Featured Collectibles</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Discover our most coveted digital collectibles and limited edition items from the PixelVerse universe.
        </p>
      </div>

      {/* Featured Items Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Item 1 */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FF6B6B]/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <div className="bg-[#0D0D0D] aspect-square flex items-center justify-center p-6">
                {/* Pixel art representation using colored divs */}
                <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full max-w-[240px] max-h-[240px] mx-auto">
                  {/* First row */}
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  {/* Second row */}
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FFE66D]"></div>

                  {/* Third row */}
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  {/* Fourth row */}
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-transparent"></div>

                  {/* Fifth row */}
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>

                  {/* Sixth row */}
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FF6B6B]"></div>

                  {/* Seventh row */}
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FF6B6B]"></div>

                  {/* Eighth row */}
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-[#FF6B6B] text-black font-bold px-2 py-1 text-xs rounded">
                RARE
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white text-xl font-bold mb-2">Fire Crystal Dragon</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-[#FFE66D] mr-1">★★★★</span>
                  <span className="text-gray-400">★</span>
                </div>
                <span className="text-[#4ECDC4] font-bold">2,400 PX</span>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">
                  Owned by <span className="text-[#FF6B6B]">PixelMaster</span>
                </div>
                <div className="text-sm text-gray-400">#0024</div>
              </div>
              <button
                className="w-full mt-4 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
                onClick={() => handleCollect("dragon_001", "Fire Crystal Dragon", "creature", "rare")}
              >
                Collect
              </button>
            </div>
          </div>

          {/* Featured Item 2 */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#4ECDC4]/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <div className="bg-[#0D0D0D] aspect-square flex items-center justify-center p-6">
                {/* Pixel art representation using colored divs */}
                <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full max-w-[240px] max-h-[240px] mx-auto">
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>

                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>

                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#4ECDC4]"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-[#4ECDC4]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-[#4ECDC4] text-black font-bold px-2 py-1 text-xs rounded">
                EPIC
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white text-xl font-bold mb-2">Celestial Amulet</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-[#FFE66D] mr-1">★★★★★</span>
                </div>
                <span className="text-[#4ECDC4] font-bold">5,750 PX</span>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">
                  Owned by <span className="text-[#4ECDC4]">CryptoWizard</span>
                </div>
                <div className="text-sm text-gray-400">#0008</div>
              </div>
              <button
                className="w-full mt-4 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
                onClick={() => handleCollect("amulet_001", "Celestial Amulet", "accessory", "epic")}
              >
                Collect
              </button>
            </div>
          </div>

          {/* Featured Item 3 */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FFE66D]/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <div className="bg-[#0D0D0D] aspect-square flex items-center justify-center p-6">
                {/* Pixel art representation using colored divs */}
                <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full max-w-[240px] max-h-[240px] mx-auto">
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>

                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FF6B6B]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>

                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-[#FFE66D]"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-[#FFE66D] text-black font-bold px-2 py-1 text-xs rounded">
                LEGENDARY
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white text-xl font-bold mb-2">Golden Crown</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-[#FFE66D] mr-1">★★★★★</span>
                </div>
                <span className="text-[#4ECDC4] font-bold">9,800 PX</span>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">
                  Owned by <span className="text-[#FFE66D]">KingMidas</span>
                </div>
                <div className="text-sm text-gray-400">#0003</div>
              </div>
              <button
                className="w-full mt-4 py-2 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded transition-colors"
                onClick={() => handleCollect("crown_001", "Golden Crown", "accessory", "legendary")}
              >
                Collect
              </button>
            </div>
          </div>
        </div>

        {/* Recent Achievements Section */}
        <div className="mt-20">
          <div className="flex items-center justify-center mb-8">
            <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
            <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
            <div className="w-3 h-3 bg-[#FFE66D]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Recent Achievements</h2>
            <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
            <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
            <div className="w-3 h-3 bg-[#FF6B6B]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Achievement 1 */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-4 flex items-center hover:border-[#FF6B6B]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-full border-2 border-[#FF6B6B] flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#FF6B6B]">🏆</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">First Steps</h3>
                <p className="text-sm text-gray-400">Started exploring PixelVerse</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-4 flex items-center hover:border-[#4ECDC4]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-full border-2 border-[#4ECDC4] flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#4ECDC4]">💎</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">Collector</h3>
                <p className="text-sm text-gray-400">Collected your first item</p>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-4 flex items-center hover:border-[#FFE66D]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-full border-2 border-[#FFE66D] flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-[#FFE66D]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#FFE66D]">⭐</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">Rising Star</h3>
                <p className="text-sm text-gray-400">Reached Level 5</p>
              </div>
            </div>

            {/* Achievement 4 */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-4 flex items-center hover:border-[#FF6B6B]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-full border-2 border-[#FF6B6B] flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#FF6B6B]">🔥</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">Game Master</h3>
                <p className="text-sm text-gray-400">Won all three mini-games</p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-md transition-colors duration-300">
            View All Collectibles
          </button>
        </div>
      </div>

      {/* Pixel art decoration absolute positioned elements */}
      <div className="absolute top-12 left-6 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-24 left-12 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-32 right-8 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-16 right-24 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>
    </section>
  )
}
