"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useGameContext, type Collectible } from "@/context/game-context"
import Link from "next/link"

interface MarketplaceItem {
  id: string
  name: string
  type: string
  rarity: string
  price: number
  image: string
  description?: string
  boostEffect?: {
    type: "score" | "coins" | "xp"
    multiplier: number
  }
}

export default function MarketplacePage() {
  const { user, addToInventory, addPixels, removePixels, addXP, addAchievement, completeQuest } = useUser()
  const { addPixelCoins, activeCollectibles, collectibles, toggleActiveCollectible } = useGameContext()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showItemDetail, setShowItemDetail] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [popularItems, setPopularItems] = useState<MarketplaceItem[]>([])
  const [recommendedItems, setRecommendedItems] = useState<MarketplaceItem[]>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [purchasedItem, setPurchasedItem] = useState<MarketplaceItem | null>(null)
  const [relatedQuests, setRelatedQuests] = useState<{ id: string; title: string; progress: number }[]>([])

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "weapon_001",
      name: "Pixel Blade",
      type: "weapon",
      rarity: "rare",
      price: 3200,
      image: "sword",
      description:
        "A legendary weapon forged in the pixel fires of the ancient digital realm. Grants the wielder enhanced attack power and a chance to inflict lightning damage.",
      boostEffect: {
        type: "score",
        multiplier: 1.2,
      },
    },
    {
      id: "shield_001",
      name: "Guardian Shield",
      type: "armor",
      rarity: "epic",
      price: 6400,
      image: "shield",
      description:
        "An epic shield that provides excellent protection against digital threats. Its pixel-perfect design intimidates enemies.",
      boostEffect: {
        type: "coins",
        multiplier: 1.35,
      },
    },
    {
      id: "potion_001",
      name: "Dragon Elixir",
      type: "consumable",
      rarity: "legendary",
      price: 8500,
      image: "potion",
      description:
        "A rare potion that temporarily grants the power of a pixel dragon. Increases all stats for a limited time.",
      boostEffect: {
        type: "xp",
        multiplier: 1.5,
      },
    },
    {
      id: "pet_001",
      name: "Pixel Companion",
      type: "pet",
      rarity: "epic",
      price: 4800,
      image: "pet",
      description:
        "A loyal pixel pet that follows you around the PixelVerse. Provides companionship and occasional bonuses.",
      boostEffect: {
        type: "coins",
        multiplier: 1.25,
      },
    },
    {
      id: "hat_001",
      name: "Wizard Hat",
      type: "accessory",
      rarity: "rare",
      price: 2500,
      image: "hat",
      description: "A stylish wizard hat that enhances magical abilities. Perfect for spellcasting pixel wizards.",
      boostEffect: {
        type: "score",
        multiplier: 1.15,
      },
    },
    {
      id: "amulet_002",
      name: "Ancient Amulet",
      type: "accessory",
      rarity: "epic",
      price: 5200,
      image: "amulet",
      description:
        "An ancient amulet with mysterious powers. Glows with an otherworldly light in the presence of rare collectibles.",
      boostEffect: {
        type: "xp",
        multiplier: 1.3,
      },
    },
    {
      id: "background_001",
      name: "Mystic Landscape",
      type: "background",
      rarity: "legendary",
      price: 7600,
      image: "landscape",
      description:
        "A breathtaking pixel landscape that can be used as a profile background. Features animated elements.",
    },
    {
      id: "character_001",
      name: "Hero Character",
      type: "character",
      rarity: "rare",
      price: 3900,
      image: "character",
      description: "A customizable hero character with unique animations and expressions. Stand out in the PixelVerse!",
    },
    {
      id: "crown_001",
      name: "Royal Crown",
      type: "accessory",
      rarity: "legendary",
      price: 9800,
      image: "hat",
      description: "A majestic crown that symbolizes status in the PixelVerse. Grants the wearer royal treatment.",
      boostEffect: {
        type: "coins",
        multiplier: 1.5,
      },
    },
    {
      id: "bracelet_001",
      name: "Mystic Bracelet",
      type: "accessory",
      rarity: "epic",
      price: 4700,
      image: "amulet",
      description: "A bracelet infused with ancient pixel magic. Enhances the wearer's abilities in gameplay.",
      boostEffect: {
        type: "score",
        multiplier: 1.25,
      },
    },
    {
      id: "cape_001",
      name: "Twilight Cape",
      type: "armor",
      rarity: "legendary",
      price: 8200,
      image: "landscape",
      description: "A flowing cape made from twilight essence. Makes the wearer partially ethereal during gameplay.",
      boostEffect: {
        type: "xp",
        multiplier: 1.4,
      },
    },
    {
      id: "boots_001",
      name: "Swift Boots",
      type: "armor",
      rarity: "rare",
      price: 3500,
      image: "shield",
      description: "Lightweight boots that enhance the wearer's agility. Perfect for those who love to move quickly.",
      boostEffect: {
        type: "score",
        multiplier: 1.15,
      },
    },
  ]

  useEffect(() => {
    if (user) {
      const userItemTypes = new Set(user.inventory.map((item) => item.type))
      const missingTypes = ["weapon", "armor", "accessory", "pet", "consumable"].filter(
        (type) => !userItemTypes.has(type)
      )

      let recommended = marketplaceItems.filter(
        (item) =>
          missingTypes.includes(item.type) &&
          !user.inventory.some((userItem) => userItem.id === item.id)
      )

      if (recommended.length === 0) {
        recommended = marketplaceItems.filter(
          (item) =>
            item.boostEffect?.type === "coins" &&
            !user.inventory.some((userItem) => userItem.id === item.id)
        )
      }

      setRecommendedItems(recommended.slice(0, 3))
    }

    const popular = [...marketplaceItems]
      .sort((a, b) => b.price - a.price)
      .filter((item) => item.rarity === "legendary" || item.rarity === "epic")
      .slice(0, 3)

    setPopularItems(popular)
  }, [user, marketplaceItems])

  useEffect(() => {
    if (!user) return

    const collectibleQuests = [
      {
        id: "collect_rare",
        title: "Collect a rare item",
        progress: user.inventory.filter((item) => item.rarity === "rare").length > 0 ? 1 : 0,
      },
      {
        id: "collect_epic",
        title: "Collect an epic item",
        progress: user.inventory.filter((item) => item.rarity === "epic").length > 0 ? 1 : 0,
      },
      {
        id: "collect_5_items",
        title: "Build your collection (5 items)",
        progress: Math.min(user.inventory.length, 5),
      },
    ].filter((q) => q.progress < 1 || (q.id === "collect_5_items" && q.progress < 5))

    setRelatedQuests(collectibleQuests)
  }, [user])

  const filteredItems = marketplaceItems.filter((item) => {
    if (selectedCategory !== "all" && item.type !== selectedCategory) return false
    if (selectedRarity !== "all" && item.rarity !== selectedRarity) return false
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      if (max && (item.price < min || item.price > max)) return false
      if (!max && item.price < min) return false
    }
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const userOwnsItem = (itemId: string) => {
    return user?.inventory.some((item) => item.id === itemId)
  }

  const isItemActive = (itemId: string) => {
    return activeCollectibles.includes(itemId)
  }

  const handleBuyItem = (item: MarketplaceItem) => {
    if (!user || user.pixels < item.price) {
      alert("You don't have enough PX to buy this item!")
      return
    }

    if (userOwnsItem(item.id)) {
      alert("You already own this item!")
      return
    }

    // Take payment
    removePixels(item.price)

    // Create new collectible
    const newCollectible: Collectible = {
      id: item.id,
      name: item.name,
      type: item.type,
      rarity: item.rarity,
      image: item.image,
      description: item.description || "",
      ...(item.boostEffect && { boostEffect: item.boostEffect }),
    }

    // Add to inventory
    addToInventory({
      id: item.id,
      name: item.name,
      type: item.type,
      rarity: item.rarity,
      acquired: new Date().toISOString(),
    })

    // Award bonus for first purchase achievement
    if (!user?.achievements.includes("first_purchase")) {
      addPixels(100)
      
      // Unlock achievement
      setTimeout(() => {
        addAchievement("first_purchase", "First Purchase", "Make your first purchase in the marketplace")
      }, 500)
    }

    // Track purchase for quest progress
    try {
      // Update quest progress for marketplace-related quests
      const marketQuestData = localStorage.getItem("pixelverse_market_quests") || "{}"
      const marketQuests = JSON.parse(marketQuestData)
      
      // Increment total items purchased
      marketQuests.totalPurchased = (marketQuests.totalPurchased || 0) + 1
      
      // Add to types collected
      marketQuests.collectedTypes = marketQuests.collectedTypes || {}
      marketQuests.collectedTypes[item.type] = true
      
      // Add to rarities collected
      marketQuests.collectedRarities = marketQuests.collectedRarities || {}
      marketQuests.collectedRarities[item.rarity] = true
      
      // Track completion of related quests
      if (item.rarity === "rare" && user?.quests.active.includes("collect_rare")) {
        completeQuest("collect_rare")
      }
      
      if (item.rarity === "epic" && user?.quests.active.includes("collect_epic")) {
        completeQuest("collect_epic")
      }

      if (user?.inventory.length >= 4 && user?.quests.active.includes("collect_5_items")) {
        // Next item will complete the quest
        completeQuest("collect_5_items")
      }
      
      localStorage.setItem("pixelverse_market_quests", JSON.stringify(marketQuests))
    } catch (error) {
      console.error("Error updating quest progress:", error)
    }
    
    // Show purchase success modal
    setPurchasedItem(item)
    setShowSuccessModal(true)
    setShowItemDetail(false)
  }

  const openItemDetail = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setShowItemDetail(true)
  }

  const handleToggleActive = (itemId: string) => {
    toggleActiveCollectible(itemId)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "gray-400"
      case "uncommon":
        return "green-400"
      case "rare":
        return "[#FF6B6B]"
      case "epic":
        return "[#4ECDC4]"
      case "legendary":
        return "[#FFE66D]"
      default:
        return "gray-400"
    }
  }

  const getRarityBgColorClass = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-400"
      case "uncommon":
        return "bg-green-400"
      case "rare":
        return "bg-[#FF6B6B]"
      case "epic":
        return "bg-[#4ECDC4]"
      case "legendary":
        return "bg-[#FFE66D]"
      default:
        return "bg-gray-400"
    }
  }
  const getRarityTextColorClass = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400"
      case "uncommon":
        return "text-green-400"
      case "rare":
        return "text-[#FF6B6B]"
      case "epic":
        return "text-[#4ECDC4]"
      case "legendary":
        return "text-[#FFE66D]"
      default:
        return "text-gray-400"
    }
  }
  const getRarityBgHoverColorClass = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "hover:bg-gray-400/80"
      case "uncommon":
        return "hover:bg-green-400/80"
      case "rare":
        return "hover:bg-[#FF6B6B]/80"
      case "epic":
        return "hover:bg-[#4ECDC4]/80"
      case "legendary":
        return "hover:bg-[#FFE66D]/80"
      default:
        return "hover:bg-gray-400/80"
    }
  }
  const getRarityBgOpacityColorClass = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-400/20"
      case "uncommon":
        return "bg-green-400/20"
      case "rare":
        return "bg-[#FF6B6B]/20"
      case "epic":
        return "bg-[#4ECDC4]/20"
      case "legendary":
        return "bg-[#FFE66D]/20"
      default:
        return "bg-gray-400/20"
    }
  }

  const renderItemImage = (item: MarketplaceItem) => {
    switch (item.image) {
      case "sword":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-4 h-20 bg-[#4ECDC4] top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-16 h-4 bg-[#FFE66D] top-20 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-8 h-8 bg-[#FF6B6B] top-24 left-1/2 transform -translate-x-1/2"></div>
          </div>
        )
      case "shield":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-24 h-24 rounded-full bg-[#4ECDC4] top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-16 h-16 rounded-full bg-[#0D0D0D] top-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-4 h-16 bg-[#FF6B6B] top-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-16 h-4 bg-[#FF6B6B] top-10 left-1/2 transform -translate-x-1/2"></div>
          </div>
        )
      case "potion":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-16 h-20 bg-[#FF6B6B] rounded-b-lg bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-8 h-6 bg-[#FFE66D] bottom-20 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-4 h-4 bg-[#FF6B6B]/50 top-8 left-14 rounded-full"></div>
            <div className="absolute w-3 h-3 bg-[#FF6B6B]/50 top-12 left-10 rounded-full"></div>
            <div className="absolute w-2 h-2 bg-[#FF6B6B]/50 top-16 left-12 rounded-full"></div>
          </div>
        )
      case "pet":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-16 h-16 bg-[#4ECDC4] rounded-full top-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-4 h-4 bg-[#0D0D0D] rounded-full top-8 left-10"></div>
            <div className="absolute w-4 h-4 bg-[#0D0D0D] rounded-full top-8 left-18"></div>
            <div className="absolute w-8 h-2 bg-[#0D0D0D] rounded-full top-14 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-4 h-4 bg-[#4ECDC4] rounded-full top-20 left-10"></div>
            <div className="absolute w-4 h-4 bg-[#4ECDC4] rounded-full top-20 left-18"></div>
          </div>
        )
      case "hat":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-24 h-8 bg-[#FF6B6B] bottom-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-16 h-16 bg-[#FF6B6B] rounded-t-lg top-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-8 h-2 bg-[#FFE66D] top-10 left-1/2 transform -translate-x-1/2"></div>
          </div>
        )
      case "amulet":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-16 h-2 bg-[#FFE66D] top-4 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-2 h-16 bg-[#FFE66D] top-6 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-8 h-8 bg-[#4ECDC4] rounded-full top-14 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-4 h-4 bg-[#0D0D0D] rounded-full top-16 left-1/2 transform -translate-x-1/2"></div>
          </div>
        )
      case "landscape":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4ECDC4] to-[#0D0D0D]"></div>
            <div className="absolute w-4 h-4 bg-[#FFE66D] top-4 left-4 rounded-full"></div>
            <div className="absolute w-8 h-2 bg-[#FF6B6B] bottom-8 left-0 right-0"></div>
            <div className="absolute w-4 h-16 bg-[#FF6B6B]/70 bottom-0 left-10"></div>
            <div className="absolute w-4 h-12 bg-[#FF6B6B]/70 bottom-0 left-18"></div>
            <div className="absolute w-4 h-10 bg-[#FF6B6B]/70 bottom-0 left-26"></div>
          </div>
        )
      case "character":
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto relative">
            <div className="absolute w-12 h-12 bg-[#FF6B6B] rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-3 h-3 bg-[#0D0D0D] rounded-full top-4 left-12"></div>
            <div className="absolute w-3 h-3 bg-[#0D0D0D] rounded-full top-4 left-18"></div>
            <div className="absolute w-16 h-16 bg-[#4ECDC4] top-12 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-4 h-12 bg-[#FF6B6B] bottom-0 left-10"></div>
            <div className="absolute w-4 h-12 bg-[#FF6B6B] bottom-0 left-18"></div>
          </div>
        )
      default:
        return (
          <div className="w-full h-full max-w-[100px] max-h-[100px] mx-auto bg-[#1A1A1A] flex items-center justify-center">
            <span className="text-2xl">?</span>
          </div>
        )
    }
  }

  return (
    <section id="marketplace" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative min-h-screen">
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Marketplace</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Browse and collect unique digital items from the PixelVerse universe to customize your experience and boost
          your gaming performance.
        </p>
      </div>

      {relatedQuests.length > 0 && (
        <div className="container mx-auto mb-8">
          <div className="bg-[#1A1A1A]/50 border border-[#FFE66D]/30 rounded-lg p-4">
            <h3 className="text-[#FFE66D] font-bold flex items-center mb-2">
              <span className="text-xl mr-2">📋</span> Marketplace Quests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {relatedQuests.map((quest) => (
                <div key={quest.id} className="bg-[#0D0D0D] rounded-md p-3 flex items-center">
                  <div className="w-10 h-10 rounded-md bg-[#FF6B6B]/20 flex items-center justify-center mr-3">
                    <span className="text-[#FF6B6B]">🎒</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-bold">{quest.title}</h4>
                    <div className="flex items-center">
                      <div className="h-1.5 bg-[#0D0D0D] rounded-full flex-1 mr-2">
                        <div
                          className="h-full bg-[#FF6B6B] rounded-full"
                          style={{
                            width:
                              quest.id === "collect_5_items"
                                ? `${(quest.progress / 5) * 100}%`
                                : `${quest.progress * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {quest.id === "collect_5_items" ? `${quest.progress}/5` : `${quest.progress}/1`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <Link href="/quests" className="text-[#FFE66D] text-xs hover:underline">
                View all quests
              </Link>
            </div>
          </div>
        </div>
      )}

      {!showItemDetail && (
        <div className="container mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-neutral-700">
                <h3 className="text-white font-bold flex items-center">
                  <span className="text-[#FFE66D] mr-2">🔥</span> Popular Collectibles
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {popularItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 cursor-pointer border border-neutral-700 rounded-lg p-3 flex items-center"
                      onClick={() => openItemDetail(item)}
                    >
                      <div className="w-12 h-12 rounded-md bg-[#1A1A1A] flex items-center justify-center mr-3 overflow-hidden relative">
                        <div className="w-full h-full scale-75 flex items-center justify-center">
                          {renderItemImage(item)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-bold">{item.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${getRarityTextColorClass(item.rarity)}`}>{item.rarity}</span>
                          <span className="text-[#FFE66D] text-xs">{item.price} PX</span>
                        </div>
                      </div>
                      {item.boostEffect && (
                        <div className="ml-2 px-2 py-1 bg-[#1A1A1A] rounded-md">
                          <span className="text-[#4ECDC4] text-xs">
                            {item.boostEffect.type === "score"
                              ? "🏆"
                              : item.boostEffect.type === "coins"
                              ? "💰"
                              : "✨"}
                            +{Math.round((item.boostEffect.multiplier - 1) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {user && recommendedItems.length > 0 && (
              <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-neutral-700">
                  <h3 className="text-white font-bold flex items-center">
                    <span className="text-[#4ECDC4] mr-2">🎯</span> Recommended For You
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {recommendedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#0D0D0D] hover:bg-[#0D0D0D]/80 cursor-pointer border border-neutral-700 rounded-lg p-3 flex items-center"
                        onClick={() => openItemDetail(item)}
                      >
                        <div className="w-12 h-12 rounded-md bg-[#1A1A1A] flex items-center justify-center mr-3 overflow-hidden relative">
                          <div className="w-full h-full scale-75 flex items-center justify-center">
                            {renderItemImage(item)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-bold">{item.name}</h4>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs ${getRarityTextColorClass(item.rarity)}`}>{item.rarity}</span>
                            <span className="text-[#FFE66D] text-xs">{item.price} PX</span>
                          </div>
                        </div>
                        {item.boostEffect && (
                          <div className="ml-2 px-2 py-1 bg-[#1A1A1A] rounded-md">
                            <span className="text-[#4ECDC4] text-xs">
                              {item.boostEffect.type === "score"
                                ? "🏆"
                                : item.boostEffect.type === "coins"
                                ? "💰"
                                : "✨"}
                              +{Math.round((item.boostEffect.multiplier - 1) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto mb-10">
        <div className="bg-[#1A1A1A] rounded-lg border border-neutral-700 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search collectibles..."
                  className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-4 text-white focus:outline-none focus:border-[#4ECDC4]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="md:col-span-3">
              <select
                className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-4 text-white focus:outline-none focus:border-[#4ECDC4]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="character">Characters</option>
                <option value="weapon">Weapons</option>
                <option value="accessory">Accessories</option>
                <option value="background">Backgrounds</option>
                <option value="pet">Pets</option>
                <option value="consumable">Consumables</option>
                <option value="armor">Armor</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-4 text-white focus:outline-none focus:border-[#4ECDC4]"
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                className="w-full bg-[#0D0D0D] border border-neutral-600 rounded-md py-2 px-4 text-white focus:outline-none focus:border-[#4ECDC4]"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">Price Range</option>
                <option value="0-1000">0 - 1,000 PX</option>
                <option value="1000-5000">1,000 - 5,000 PX</option>
                <option value="5000-10000">5,000 - 10,000 PX</option>
                <option value="10000+">10,000+ PX</option>
              </select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#0D0D0D] rounded-lg border border-neutral-600 flex justify-between items-center">
            <span className="text-gray-300">Your Balance:</span>
            <span className="text-[#FFE66D] font-bold">{user?.pixels || 0} PX</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-10">
        <div className="bg-[#1A1A1A]/50 border border-[#4ECDC4]/30 rounded-lg p-4">
          <h3 className="text-white font-bold mb-2 flex items-center">
            <span className="text-[#4ECDC4] mr-2">⚡</span>
            Power Up Your Gaming Experience
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Collectible items provide powerful boosts to your gameplay. Look for these icons to understand how each item
            can help you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-[#0D0D0D] p-3 rounded-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center mr-3">
                <span className="text-[#FF6B6B]">🏆</span>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">Score Boosts</h4>
                <p className="text-gray-400 text-xs">Increases your score in games</p>
              </div>
            </div>
            <div className="bg-[#0D0D0D] p-3 rounded-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center mr-3">
                <span className="text-[#4ECDC4]">💰</span>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">Coin Boosts</h4>
                <p className="text-gray-400 text-xs">Earn more coins from games</p>
              </div>
            </div>
            <div className="bg-[#0D0D0D] p-3 rounded-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FFE66D]/20 flex items-center justify-center mr-3">
                <span className="text-[#FFE66D]">✨</span>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">XP Boosts</h4>
                <p className="text-gray-400 text-xs">Level up faster with bonus XP</p>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <Link
              href="/games"
              className="inline-block px-4 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded-md transition-colors text-sm"
            >
              Play Games with Your Items
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FF6B6B]/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openItemDetail(item)}
            >
              <div className="relative">
                <div className="aspect-square bg-[#0D0D0D] p-4 flex items-center justify-center">
                  {renderItemImage(item)}
                </div>
                <div
                  className={`absolute top-3 right-3 ${getRarityBgColorClass(
                    item.rarity
                  )} text-black font-bold px-2 py-1 text-xs rounded`}
                >
                  {item.rarity.toUpperCase()}
                </div>
                {userOwnsItem(item.id) && (
                  <div className="absolute top-3 left-3 bg-[#4ECDC4]/90 text-black font-bold px-2 py-1 text-xs rounded">
                    OWNED
                  </div>
                )}
                {item.boostEffect && (
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white font-bold px-2 py-1 text-xs rounded flex items-center">
                    {item.boostEffect.type === "score"
                      ? "🏆"
                      : item.boostEffect.type === "coins"
                      ? "💰"
                      : "✨"}
                    +{Math.round((item.boostEffect.multiplier - 1) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white text-lg font-bold mb-2">{item.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <span className="text-[#FFE66D] mr-1">
                      {item.rarity === "legendary" || item.rarity === "epic" ? "★★★★★" : "★★★★"}
                    </span>
                    {item.rarity !== "legendary" && item.rarity !== "epic" && (
                      <span className="text-gray-400">★</span>
                    )}
                  </div>
                  <span className="text-[#4ECDC4] font-bold">{item.price.toLocaleString()} PX</span>
                </div>

                {userOwnsItem(item.id) ? (
                  <button
                    className={`w-full py-2 ${
                      isItemActive(item.id)
                        ? "bg-[#4ECDC4]"
                        : "bg-[#1A1A1A] border border-[#4ECDC4] text-[#4ECDC4]"
                    } hover:bg-[#4ECDC4]/80 hover:text-black font-bold rounded transition-colors`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleActive(item.id)
                    }}
                  >
                    {isItemActive(item.id) ? "Equipped" : "Equip Item"}
                  </button>
                ) : (
                  <button
                    className={`w-full py-2 ${getRarityBgColorClass(item.rarity)} ${getRarityBgHoverColorClass(
                      item.rarity
                    )} text-black font-bold rounded transition-colors`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBuyItem(item)
                    }}
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No items found matching your filters.</p>
            <button
              className="mt-4 px-6 py-2 bg-[#4ECDC4] text-black font-bold rounded-md hover:bg-[#4ECDC4]/80 transition-colors"
              onClick={() => {
                setSelectedCategory("all")
                setSelectedRarity("all")
                setPriceRange("all")
                setSearchQuery("")
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {showItemDetail && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={() => setShowItemDetail(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-neutral-600 w-full max-w-4xl relative transform transition-all">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none z-10"
                onClick={() => setShowItemDetail(false)}
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

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-[#0D0D0D] p-8 flex items-center justify-center">
                  <div className="w-64 h-64 mx-auto relative">
                    {renderItemImage(selectedItem)}

                    <div
                      className={`absolute inset-0 ${getRarityBgOpacityColorClass(
                        selectedItem.rarity
                      )} animate-pulse rounded-lg filter blur-xl`}
                    ></div>
                  </div>
                </div>

                <div className="md:w-1/2 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white text-2xl font-bold">{selectedItem.name}</h3>
                    <span
                      className={`${getRarityBgColorClass(
                        selectedItem.rarity
                      )} text-black font-bold px-3 py-1 text-sm rounded`}
                    >
                      {selectedItem.rarity.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="text-[#FFE66D] text-xl">
                      {selectedItem.rarity === "legendary" || selectedItem.rarity === "epic" ? "★★★★★" : "★★★★"}
                      {selectedItem.rarity !== "legendary" && selectedItem.rarity !== "epic" && (
                        <span className="text-gray-400">★</span>
                      )}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">
                    {selectedItem.description || "A unique item from the PixelVerse collection."}
                  </p>

                  {selectedItem.boostEffect && (
                    <div className="mb-6 bg-[#0D0D0D] border border-[#4ECDC4]/30 rounded-lg p-4">
                      <h4 className="text-[#4ECDC4] font-bold mb-2 flex items-center">
                        <span className="mr-2">⚡</span> Item Boost
                      </h4>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-[#0D0D0D] border border-[#4ECDC4]/50 flex items-center justify-center mr-3">
                          <span className="text-xl">
                            {selectedItem.boostEffect.type === "score"
                              ? "🏆"
                              : selectedItem.boostEffect.type === "coins"
                              ? "💰"
                              : "✨"}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-white font-bold">
                            +{Math.round((selectedItem.boostEffect.multiplier - 1) * 100)}%{" "}
                            {selectedItem.boostEffect.type === "score"
                              ? "Game Score"
                              : selectedItem.boostEffect.type === "coins"
                              ? "Coin Earnings"
                              : "XP Gain"}
                          </h5>
                          <p className="text-gray-400 text-sm">
                            {selectedItem.boostEffect.type === "score"
                              ? "Increases your score in all games"
                              : selectedItem.boostEffect.type === "coins"
                              ? "Earn more pixel coins from games"
                              : "Gain more experience points when playing"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-b border-neutral-700 py-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white capitalize">{selectedItem.type}s</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Rarity</span>
                      <span className={`${getRarityTextColorClass(selectedItem.rarity)} capitalize`}>
                        {selectedItem.rarity}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Item ID</span>
                      <span className="text-white">#{selectedItem.id}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-2xl font-bold">{selectedItem.price.toLocaleString()} PX</span>
                      <span className="text-gray-400">Your balance: {(user?.pixels ?? 0).toLocaleString()} PX</span>
                    </div>

                    <div className="flex space-x-4">
                      {userOwnsItem(selectedItem.id) ? (
                        <button
                          className={`flex-1 py-3 ${
                            isItemActive(selectedItem.id)
                              ? "bg-[#4ECDC4]"
                              : "bg-transparent border border-[#4ECDC4] text-[#4ECDC4]"
                          } hover:bg-[#4ECDC4]/80 hover:text-black font-bold rounded transition-colors`}
                          onClick={() => handleToggleActive(selectedItem.id)}
                        >
                          {isItemActive(selectedItem.id) ? "Unequip Item" : "Equip Item"}
                        </button>
                      ) : (
                        <button
                          className={`flex-1 py-3 ${getRarityBgColorClass(selectedItem.rarity)} ${getRarityBgHoverColorClass(
                            selectedItem.rarity
                          )} text-black font-bold rounded transition-colors`}
                          onClick={() => handleBuyItem(selectedItem)}
                          disabled={!user || user.pixels < selectedItem.price}
                        >
                          {user && user.pixels >= selectedItem.price ? "Buy Now" : "Not Enough PX"}
                        </button>
                      )}
                    </div>

                    {userOwnsItem(selectedItem.id) && (
                      <div className="mt-2">
                        <Link
                          href="/games"
                          className="block w-full text-center py-2 bg-[#FF6B6B]/20 border border-[#FF6B6B]/50 text-[#FF6B6B] hover:bg-[#FF6B6B]/30 rounded transition-colors"
                        >
                          Play Games with This Item
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && purchasedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#4ECDC4] border-2 w-full max-w-md relative transform transition-all animate-bounce-once">
              <div className="p-6">
                <div className="mb-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#4ECDC4]/20 mx-auto flex items-center justify-center mb-4">
                    <span className="text-[#4ECDC4] text-4xl">✓</span>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">Item Purchased!</h3>
                  <p className="text-gray-300">{purchasedItem.name} has been added to your inventory</p>
                </div>

                {purchasedItem.boostEffect && (
                  <div className="mb-6 bg-[#0D0D0D] border border-[#4ECDC4]/30 rounded-lg p-4 text-center">
                    <h4 className="text-[#4ECDC4] font-bold">Item Boost Unlocked!</h4>
                    <p className="text-white">
                      {purchasedItem.boostEffect.type === "score"
                        ? "🏆"
                        : purchasedItem.boostEffect.type === "coins"
                        ? "💰"
                        : "✨"}
                      {" "}+{Math.round((purchasedItem.boostEffect.multiplier - 1) * 100)}% {purchasedItem.boostEffect.type}
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowSuccessModal(false)
                      if (purchasedItem) {
                        handleToggleActive(purchasedItem.id)
                      }
                    }}
                    className="flex-1 py-3 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
                  >
                    Equip Item
                  </button>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="flex-1 py-3 bg-transparent border border-white text-white hover:bg-white/10 font-bold rounded transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="mt-4">
                  <Link
                    href="/games"
                    className="block w-full text-center py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
                    onClick={() => setShowSuccessModal(false)}
                  >
                    Play Games Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>
    </section>
  )
}