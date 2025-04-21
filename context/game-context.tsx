"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useUser } from "./user-context"

// Types
export type Collectible = {
  id: string
  name: string
  type: string
  rarity: string
  image: string
  description: string
  boostEffect?: {
    type: "score" | "coins" | "xp"
    multiplier: number
  }
}

export type Achievement = {
  id: string
  name: string
  description: string
  unlocked: boolean
  date?: string
  reward?: {
    coins?: number
    item?: string
    xp?: number
  }
}

// Game Activity for Quests
export type GameActivity = {
  gameType: string
  timestamp: string
  score: number
  coinsEarned: number
  duration: number
}

// Game Context Type
type GameContextType = {
  pixelCoins: number
  addPixelCoins: (amount: number) => void
  collectibles: Collectible[]
  activeCollectibles: string[]
  toggleActiveCollectible: (id: string) => void
  applyBoosts: (baseValue: number, boostType: "score" | "coins" | "xp") => number
  achievements: Achievement[]
  unlockAchievement: (id: string) => void
  gameScores: {
    memoryGame: number
    pixelPuzzle: number
    pixelRunner: number
  }
  gameActivities: GameActivity[]
  recordGameActivity: (activity: GameActivity) => void
  getDailyGameStats: () => { played: number; earned: number }
  updateGameScore: (game: "memoryGame" | "pixelPuzzle" | "pixelRunner", score: number) => void
}

// Create Context
const GameContext = createContext<GameContextType | undefined>(undefined)

// Provider Component
export function GameProvider({ children }: { children: ReactNode }) {
  const { user, addPixels, addXP } = useUser()
  // State
  const [pixelCoins, setPixelCoins] = useState(500)
  const [collectibles, setCollectibles] = useState<Collectible[]>([])
  const [activeCollectibles, setActiveCollectibles] = useState<string[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [gameScores, setGameScores] = useState({
    memoryGame: 0,
    pixelPuzzle: 0,
    pixelRunner: 0,
  })
  const [gameActivities, setGameActivities] = useState<GameActivity[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedCoins = localStorage.getItem("pixelverse_coins")
    const storedCollectibles = localStorage.getItem("pixelverse_collectibles")
    const storedActiveCollectibles = localStorage.getItem("pixelverse_active_collectibles")
    const storedAchievements = localStorage.getItem("pixelverse_achievements")
    const storedGameScores = localStorage.getItem("pixelverse_game_scores")
    const storedGameActivities = localStorage.getItem("pixelverse_game_activities")

    if (storedCoins) setPixelCoins(JSON.parse(storedCoins))
    if (storedCollectibles) setCollectibles(JSON.parse(storedCollectibles))
    if (storedActiveCollectibles) setActiveCollectibles(JSON.parse(storedActiveCollectibles))
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements))
    if (storedGameScores) setGameScores(JSON.parse(storedGameScores))
    if (storedGameActivities) setGameActivities(JSON.parse(storedGameActivities))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("pixelverse_coins", JSON.stringify(pixelCoins))
  }, [pixelCoins])

  useEffect(() => {
    localStorage.setItem("pixelverse_collectibles", JSON.stringify(collectibles))
  }, [collectibles])

  useEffect(() => {
    localStorage.setItem("pixelverse_active_collectibles", JSON.stringify(activeCollectibles))
  }, [activeCollectibles])

  useEffect(() => {
    localStorage.setItem("pixelverse_achievements", JSON.stringify(achievements))
  }, [achievements])

  useEffect(() => {
    localStorage.setItem("pixelverse_game_scores", JSON.stringify(gameScores))
  }, [gameScores])

  useEffect(() => {
    localStorage.setItem("pixelverse_game_activities", JSON.stringify(gameActivities))
  }, [gameActivities])

  // Toggle active/equipped collectible
  const toggleActiveCollectible = (id: string) => {
    setActiveCollectibles((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id)
      } else {
        // Check collectible type to enforce limits per type
        const collectible = collectibles.find((c) => c.id === id)
        if (!collectible) return prev

        // Only one of each type can be active at a time
        const updatedActive = prev.filter((activeId) => {
          const activeItem = collectibles.find((c) => c.id === activeId)
          return activeItem?.type !== collectible.type
        })

        return [...updatedActive, id]
      }
    })
  }

  // Apply boosts from active collectibles
  const applyBoosts = (baseValue: number, boostType: "score" | "coins" | "xp") => {
    let boostedValue = baseValue

    // Find active collectibles with boosts of the specified type
    activeCollectibles.forEach((activeId) => {
      const collectible = collectibles.find((c) => c.id === activeId)
      if (collectible?.boostEffect && collectible.boostEffect.type === boostType) {
        boostedValue = Math.floor(boostedValue * collectible.boostEffect.multiplier)
      }
    })

    return boostedValue
  }

  // Record game activity for quest progress tracking
  const recordGameActivity = (activity: GameActivity) => {
    // Keep only the most recent activities (limit to 50)
    setGameActivities((prev) => {
      const newActivities = [activity, ...prev].slice(0, 50)
      return newActivities
    })
  }

  // Get daily stats for quests
  const getDailyGameStats = () => {
    const today = new Date().toDateString()

    // Filter today's activities
    const todayActivities = gameActivities.filter((activity) => {
      const activityDate = new Date(activity.timestamp).toDateString()
      return activityDate === today
    })

    return {
      played: todayActivities.length,
      earned: todayActivities.reduce((total, act) => total + act.coinsEarned, 0),
    }
  }

  // Add pixel coins
  const addPixelCoins = (amount: number) => {
    // Apply active collectible boosts
    const boostedAmount = applyBoosts(amount, "coins")

    setPixelCoins((prev) => prev + boostedAmount)
    // Also add to user's pixels in user context
    if (boostedAmount > 0) {
      addPixels(boostedAmount)

      // Check if boost was applied and notify user
      if (boostedAmount > amount) {
        setTimeout(() => {
          alert(`🚀 Boost applied: ${amount} → ${boostedAmount} coins!`)
        }, 300)
      }
    }
  }

  // Unlock achievement
  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const achievementExists = prev.some((a) => a.id === id)

      if (achievementExists) {
        const updatedAchievements = prev.map((a) => {
          if (a.id === id && !a.unlocked) {
            // First time unlocking - give rewards
            if (a.reward) {
              if (a.reward.coins) addPixelCoins(a.reward.coins)
              if (a.reward.xp) addXP(a.reward.xp)
              // Item rewards could be handled here
            }

            return { ...a, unlocked: true, date: new Date().toISOString() }
          }
          return a
        })
        return updatedAchievements
      } else {
        // If achievement doesn't exist in our list, we don't add it
        return prev
      }
    })
  }

  // Update game score
  const updateGameScore = (game: "memoryGame" | "pixelPuzzle" | "pixelRunner", score: number) => {
    setGameScores((prev) => {
      // Only update if the new score is higher
      if (score > prev[game]) {
        return { ...prev, [game]: score }
      }
      return prev
    })
  }

  return (
    <GameContext.Provider
      value={{
        pixelCoins,
        addPixelCoins,
        collectibles,
        activeCollectibles,
        toggleActiveCollectible,
        applyBoosts,
        achievements,
        unlockAchievement,
        gameScores,
        gameActivities,
        recordGameActivity,
        getDailyGameStats,
        updateGameScore,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

// Custom hook to use the game context
export function useGameContext() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}