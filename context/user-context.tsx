"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types
export type InventoryItem = {
  id: string
  name: string
  type: string
  rarity: string
  acquired: string
  imageUrl?: string
}

export type UserType = {
  username: string
  level: number
  xp: number
  pixels: number
  inventory: InventoryItem[]
  achievements: string[]
  quests: {
    active: string[]
    completed: string[]
  }
}

type UserContextType = {
  user: UserType | null
  addPixels: (amount: number) => void
  removePixels: (amount: number) => void
  addToInventory: (item: InventoryItem) => void
  addAchievement: (id: string, name: string, description: string) => void
  completeQuest: (questId: string) => void
  addXP: (amount: number) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Calculate level based on XP
const calculateLevel = (xp: number): number => {
  // Simple level calculation: every 1000 XP = 1 level
  return Math.floor(xp / 1000) + 1
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)

  // Initialize user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("pixelverse_user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Create default user if none exists
      const defaultUser: UserType = {
        username: "PixelExplorer",
        level: 1,
        xp: 0,
        pixels: 500, // Starting currency
        inventory: [],
        achievements: [],
        quests: {
          active: [],
          completed: [],
        },
      }
      setUser(defaultUser)
      localStorage.setItem("pixelverse_user", JSON.stringify(defaultUser))
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("pixelverse_user", JSON.stringify(user))
    }
  }, [user])

  // Add XP to user and handle level ups
  const addXP = (amount: number) => {
    if (!user) return

    setUser((prev) => {
      if (!prev) return prev
      
      const newXP = prev.xp + amount
      const newLevel = calculateLevel(newXP)
      
      // Check if level up occurred
      if (newLevel > prev.level) {
        // Show level up message
        setTimeout(() => {
          alert(`🎉 Level Up! You are now level ${newLevel}!`)
        }, 500)
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      }
    })
  }

  // Add pixels to user's balance
  const addPixels = (amount: number) => {
    if (!user) return

    setUser((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        pixels: prev.pixels + amount,
      }
    })
  }

  // Remove pixels from user's balance
  const removePixels = (amount: number) => {
    if (!user) return

    setUser((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        pixels: Math.max(0, prev.pixels - amount), // Prevent negative balance
      }
    })
  }

  // Add item to user's inventory
  const addToInventory = (item: InventoryItem) => {
    if (!user) return

    // Check if item already exists
    if (user.inventory.some(i => i.id === item.id)) {
      alert(`You already own the "${item.name}".`)
      return
    }

    setUser((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        inventory: [...prev.inventory, item],
      }
    })
    
    // Show notification
    alert(`🎁 New item acquired: ${item.name}`)
    
    // Add XP for acquiring a new item
    addXP(25)
  }

  // Add achievement to user
  const addAchievement = (id: string, name: string, description: string) => {
    if (!user) return

    // Check if achievement already exists
    if (user.achievements.includes(id)) return

    setUser((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        achievements: [...prev.achievements, id],
      }
    })

    // Show achievement notification
    alert(`🏆 Achievement Unlocked: ${name}\n${description}`)
    
    // Add XP for achievement
    addXP(100)
  }

  // Complete a quest
  const completeQuest = (questId: string) => {
    if (!user) return

    setUser((prev) => {
      if (!prev) return prev

      // Don't do anything if quest is already completed
      if (prev.quests.completed.includes(questId)) {
        return prev
      }
      
      // Remove from active quests if present
      const updatedActive = prev.quests.active.filter((id) => id !== questId)

      // Add to completed quests
      const updatedCompleted = [...prev.quests.completed, questId]

      return {
        ...prev,
        quests: {
          active: updatedActive,
          completed: updatedCompleted,
        },
      }
    })
    
    // Add XP for quest completion
    addXP(50)
    
    // Show notification
    setTimeout(() => {
      alert('✅ Quest completed! +50 XP')
    }, 300)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        addPixels,
        removePixels,
        addToInventory,
        addAchievement,
        completeQuest,
        addXP,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
