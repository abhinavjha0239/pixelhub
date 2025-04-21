"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useGameContext } from "@/context/game-context"

interface Quest {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  reward: number
  progress: {
    current: number
    total: number
  }
  completed: boolean
  type: "daily" | "weekly" | "challenge" | "event"
  icon: string
  relatedGameId?: string
  relatedSection?: string
}

export default function Quests() {
  const { user, addPixels, addAchievement, completeQuest } = useUser()
  const { gameScores, gameActivities, getDailyGameStats } = useGameContext()
  const [activeTab, setActiveTab] = useState("daily")
  const [quests, setQuests] = useState<Quest[]>([])
  const [showPuzzleModal, setShowPuzzleModal] = useState(false)
  const [showRaidModal, setShowRaidModal] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("23:59:59")
  const [gameProgress, setGameProgress] = useState({
    gamesPlayed: 0,
    coinsEarned: 0,
    highScores: {
      memoryGame: 0,
      pixelPuzzle: 0,
      pixelRunner: 0
    }
  })

  // Initialize quests and track game progress
  useEffect(() => {
    // Get game stats from context
    const gameStats = getDailyGameStats()
    const marketQuestsData = localStorage.getItem("pixelverse_market_quests") || "{}"
    const marketQuests = JSON.parse(marketQuestsData)
    
    setGameProgress({
      gamesPlayed: gameStats.played,
      coinsEarned: gameStats.earned,
      highScores: {
        memoryGame: gameScores.memoryGame,
        pixelPuzzle: gameScores.pixelPuzzle,
        pixelRunner: gameScores.pixelRunner
      }
    })
    
    // Initialize quest data with game progress
    const dailyQuests: Quest[] = [
      {
        id: "daily_1",
        title: "Pixel Hunter",
        description: "Find and collect 5 hidden pixels throughout the site.",
        difficulty: "easy",
        reward: 50,
        progress: { current: 3, total: 5 },
        completed: false,
        type: "daily",
        icon: "🔍",
      },
      {
        id: "daily_2",
        title: "Community Buddy",
        description: "Post a comment in the community forum.",
        difficulty: "easy",
        reward: 25,
        progress: { current: 1, total: 1 },
        completed: true,
        type: "daily",
        icon: "💬",
      },
      {
        id: "daily_3",
        title: "Daily Challenger",
        description: "Complete the daily pixel puzzle challenge.",
        difficulty: "medium",
        reward: 75,
        progress: { current: 0, total: 1 },
        completed: false,
        type: "daily",
        icon: "⚔️",
      },
      {
        id: "daily_4",
        title: "Market Explorer",
        description: "Browse 10 items in the marketplace.",
        difficulty: "easy",
        reward: 30,
        progress: { current: 0, total: 10 },
        completed: false,
        type: "daily",
        icon: "🏪",
      },
      {
        id: "daily_5",
        title: "Profile Update",
        description: "Update one part of your profile.",
        difficulty: "easy",
        reward: 20,
        progress: { current: 1, total: 1 },
        completed: true,
        type: "daily",
        icon: "📱",
      },
      {
        id: "daily_6",
        title: "Game Master",
        description: "Score at least 50 points in any game today.",
        difficulty: "medium",
        reward: 80,
        progress: { current: gameProgress.highScores.memoryGame >= 50 || gameProgress.highScores.pixelPuzzle >= 50 || gameProgress.highScores.pixelRunner >= 50 ? 1 : 0, total: 1 },
        completed: user?.quests.active.includes("daily_6") && (gameProgress.highScores.memoryGame >= 50 || gameProgress.highScores.pixelPuzzle >= 50 || gameProgress.highScores.pixelRunner >= 50),
        type: "daily",
        icon: "🎮",
      },
      {
        id: "daily_7",
        title: "Power Player",
        description: "Play a game with an equipped collectible item.",
        difficulty: "easy",
        reward: 60,
        progress: { current: gameProgress.gamesPlayed > 0 ? 1 : 0, total: 1 },
        completed: user?.quests.active.includes("daily_7") && gameProgress.gamesPlayed > 0,
        type: "daily",
        icon: "⚡",
      }
    ]

    setQuests(dailyQuests)

    // Update timer
    const interval = setInterval(() => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight.getTime() - now.getTime()

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [user, gameScores, gameActivities, getDailyGameStats])

  // Handle quest tracking
  const handleTrackQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId)
    if (!quest || !user) return
    
    // Check if quest is already being tracked
    if (user.quests.active.includes(questId)) {
      alert(`Already tracking quest: ${quest.title}`)
      return
    }
    
    // Use the completeQuest function to manage quest tracking
    // First add it to active quests via a direct call to localStorage
    const updatedUser = {
      ...user,
      quests: {
        ...user.quests,
        active: [...user.quests.active, questId]
      }
    }
    
    // Update localStorage directly
    localStorage.setItem("pixelverse_user", JSON.stringify(updatedUser))
    
    // Force a refresh by reloading the page
    window.location.reload()
    
    alert(`Now tracking quest: ${quest.title}`)
  }

  // Handle quest completion
  const handleCompleteQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId)
    if (!quest || !user) return
    
    // Check if quest is already completed
    if (user.quests.completed.includes(questId)) {
      alert(`Quest already completed: ${quest.title}`)
      return
    }
    
    // Add pixels reward
    addPixels(quest.reward)
    
    // Complete the quest
    completeQuest(questId)
    
    // Check for achievements
    if (!user?.achievements.includes("quest_master") && user?.quests?.completed?.length >= 3) {
      addAchievement("quest_master", "Quest Master", "Complete at least 3 quests")
      addPixels(500) // Bonus for the achievement
      alert(`Achievement unlocked: Quest Master! You earned 500 bonus pixels!`)
    }
    
    alert(`Quest completed! You earned ${quest.reward} pixels.`)
  }

  // Start puzzle quest
  const handleStartPuzzle = () => {
    setShowPuzzleModal(true)
  }

  // Complete puzzle quest
  const handleCompletePuzzle = () => {
    setShowPuzzleModal(false)
    handleCompleteQuest("daily_3")
  }

  // Start raid quest
  const handleStartRaid = () => {
    setShowRaidModal(true)
  }

  // Complete raid quest
  const handleCompleteRaid = () => {
    setShowRaidModal(false)
    // This would be a challenge quest in a real implementation
    addPixels(500)
    alert("Raid completed! You earned 500 pixels.")
  }

  return (
    <section id="quests" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Quests</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          Embark on exciting adventures to earn rewards and unlock rare collectibles in the PixelVerse.
        </p>
      </div>

      {/* Quest Categories Tabs */}
      <div className="container mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button
            className={`px-6 py-3 ${activeTab === "daily" ? "bg-[#FF6B6B] text-black" : "bg-[#1A1A1A] text-white border border-[#FF6B6B]/50"} font-bold rounded-md hover:bg-[#FF6B6B]/80 transition-colors`}
            onClick={() => setActiveTab("daily")}
          >
            Daily
          </button>
          <button
            className={`px-6 py-3 ${activeTab === "weekly" ? "bg-[#4ECDC4] text-black" : "bg-[#1A1A1A] text-white border border-[#4ECDC4]/50"} font-bold rounded-md hover:bg-[#4ECDC4]/80 transition-colors`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-6 py-3 ${activeTab === "challenge" ? "bg-[#FFE66D] text-black" : "bg-[#1A1A1A] text-white border border-[#FFE66D]/50"} font-bold rounded-md hover:bg-[#FFE66D]/80 transition-colors`}
            onClick={() => setActiveTab("challenge")}
          >
            Challenges
          </button>
          <button
            className={`px-6 py-3 ${activeTab === "event" ? "bg-[#FF6B6B] text-black" : "bg-[#1A1A1A] text-white border border-[#FF6B6B]/50"} font-bold rounded-md hover:bg-[#FF6B6B]/80 transition-colors`}
            onClick={() => setActiveTab("event")}
          >
            Events
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="container mx-auto mb-12">
        <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-2">Your Quest Progress</h3>
              <p className="text-gray-400">Complete quests to earn rewards and climb the leaderboard!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-3 py-1 rounded-full text-sm">
                Level {user?.level || 1} Explorer
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0D0D0D] border border-neutral-700 rounded-lg p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center mb-3">
                <div className="w-8 h-8 text-[#FF6B6B] flex items-center justify-center">🏆</div>
              </div>
              <div className="text-center">
                <h4 className="text-white font-bold">Daily Progress</h4>
                <p className="text-[#FF6B6B] text-lg font-bold">
                  {quests.filter((q) => q.type === "daily" && q.completed).length}/
                  {quests.filter((q) => q.type === "daily").length} Completed
                </p>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-neutral-700 rounded-lg p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center mb-3">
                <div className="w-8 h-8 text-[#4ECDC4] flex items-center justify-center">📈</div>
              </div>
              <div className="text-center">
                <h4 className="text-white font-bold">Weekly Progress</h4>
                <p className="text-[#4ECDC4] text-lg font-bold">0/0 Completed</p>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-neutral-700 rounded-lg p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FFE66D]/20 flex items-center justify-center mb-3">
                <div className="w-8 h-8 text-[#FFE66D] flex items-center justify-center">⭐</div>
              </div>
              <div className="text-center">
                <h4 className="text-white font-bold">Total Rewards</h4>
                <p className="text-[#FFE66D] text-lg font-bold">{user?.pixels || 0} PX Points</p>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-2 flex justify-between items-center">
            <span className="text-white font-bold">Explorer Progress</span>
            <span className="text-[#4ECDC4]">
              {user?.xp || 0} / {(user?.level || 1) * 1000} XP
            </span>
          </div>
          <div className="w-full bg-[#0D0D0D] rounded-full h-4 mb-6">
            <div
              className="bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] h-4 rounded-full"
              style={{ width: `${Math.min(100, ((user?.xp || 0) / ((user?.level || 1) * 1000)) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Daily Quests Section */}
      <div id="dailyQuests" className="container mx-auto mb-16">
        <div className="flex items-center mb-6">
          <h3 className="text-2xl text-white font-bold">Daily Quests</h3>
          <div className="ml-auto flex items-center">
            <span className="text-gray-400 mr-2">Refreshes in:</span>
            <span className="text-[#FF6B6B] font-mono">{timeRemaining}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests
            .filter((quest) => quest.type === "daily")
            .map((quest) => (
              <div
                key={quest.id}
                className={`bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden ${!quest.completed ? "hover:border-[#FF6B6B]/50" : ""} transition-all duration-300`}
              >
                <div className="flex p-5">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-16 h-16 bg-[#0D0D0D] rounded-lg flex items-center justify-center">
                      <div className="text-2xl">{quest.icon}</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold text-lg">{quest.title}</h4>
                      <span
                        className={`
                      ${
                        quest.completed
                          ? "bg-[#4ECDC4]/20 text-[#4ECDC4]"
                          : quest.difficulty === "easy"
                            ? "bg-[#FF6B6B]/20 text-[#FF6B6B]"
                            : "bg-[#FFE66D]/20 text-[#FFE66D]"
                      } px-2 py-1 rounded text-xs`}
                      >
                        {quest.completed ? "Completed" : quest.difficulty === "easy" ? "Easy" : "Medium"}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{quest.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">Progress:</span>
                        <span className="text-white font-bold">
                          {quest.progress.current}/{quest.progress.total}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[#FFE66D]">Reward: {quest.reward} PX</span>
                        {quest.completed ? (
                          <button className="px-3 py-1 bg-[#4ECDC4] text-black text-sm font-bold rounded cursor-default">
                            Claimed
                          </button>
                        ) : quest.relatedGameId ? (
                          <button
                            className="px-3 py-1 bg-[#FF6B6B] text-black text-sm font-bold rounded hover:bg-[#FF6B6B]/80 transition-colors"
                            onClick={handleStartPuzzle}
                          >
                            Start
                          </button>
                        ) : quest.relatedSection ? (
                          <button
                            className="px-3 py-1 bg-[#FF6B6B] text-black text-sm font-bold rounded hover:bg-[#FF6B6B]/80 transition-colors"
                            onClick={() => alert(`Navigate to ${quest.relatedSection}`)}
                          >
                            Explore
                          </button>
                        ) : (
                          <button
                            className="px-3 py-1 bg-[#FF6B6B] text-black text-sm font-bold rounded hover:bg-[#FF6B6B]/80 transition-colors"
                            onClick={() => handleTrackQuest(quest.id)}
                          >
                            Track
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#0D0D0D] h-2">
                  <div
                    className={`${quest.completed ? "bg-[#4ECDC4]" : "bg-[#FF6B6B]"} h-2`}
                    style={{ width: `${(quest.progress.current / quest.progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Featured Challenge */}
      <div className="container mx-auto mb-16">
        <div className="flex items-center mb-6">
          <h3 className="text-2xl text-white font-bold">Featured Challenge</h3>
          <div className="ml-auto flex items-center">
            <span className="text-gray-400 mr-2">Ends in:</span>
            <span className="text-[#FFE66D] font-mono">3d 12h 30m</span>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FFE66D]/50 transition-all duration-300">
          <div className="flex flex-col md:flex-row">
            {/* Challenge Image/Visualization */}
            <div className="md:w-2/5 bg-[#0D0D0D] md:border-r border-neutral-700 p-8 flex items-center justify-center">
              {/* Pixel Art Representation of a Castle/Dungeon */}
              <div className="w-full max-w-xs aspect-square mx-auto relative">
                {/* Castle/Dungeon Base */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3/5 bg-[#4ECDC4]"></div>
                {/* Castle Towers */}
                <div className="absolute bottom-3/5 left-1/4 w-1/6 h-1/5 bg-[#4ECDC4]"></div>
                <div className="absolute bottom-3/5 right-1/4 w-1/6 h-1/5 bg-[#4ECDC4]"></div>
                {/* Castle Top */}
                <div className="absolute bottom-2/5 left-1/3 w-1/3 h-1/5 bg-[#FF6B6B]"></div>
                {/* Castle Gate */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1/5 bg-[#0D0D0D]"></div>
                {/* Enemy/Dragon */}
                <div className="absolute top-1/4 right-1/4 w-1/6 h-1/6 bg-[#FFE66D] rounded-full"></div>
                {/* Flashing Effect */}
                <div className="absolute inset-0 bg-[#FFE66D]/10 animate-pulse"></div>
              </div>
            </div>

            {/* Challenge Info */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-white font-bold text-2xl">Pixel Dungeon Adventure</h4>
                <span className="bg-[#FFE66D] text-black px-3 py-1 rounded-md text-sm font-bold">EPIC</span>
              </div>

              <p className="text-gray-300 mb-6">
                Embark on a solo adventure through the Pixel Castle and defeat the Dungeon Boss. Complete all 
                challenge stages to earn exclusive rewards!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0D0D0D] rounded-lg p-4 text-center">
                  <div className="text-lg text-[#FF6B6B] mb-1">Difficulty</div>
                  <div className="text-white font-bold">Hard</div>
                </div>
                <div className="bg-[#0D0D0D] rounded-lg p-4 text-center">
                  <div className="text-lg text-[#4ECDC4] mb-1">Mode</div>
                  <div className="text-white font-bold">Solo Adventure</div>
                </div>
                <div className="bg-[#0D0D0D] rounded-lg p-4 text-center">
                  <div className="text-lg text-[#FFE66D] mb-1">Time</div>
                  <div className="text-white font-bold">~15 Minutes</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="font-bold text-white mb-2">Rewards:</div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center bg-[#0D0D0D] rounded-full px-3 py-1">
                    <span className="text-[#FFE66D] mr-2">🏆</span>
                    <span className="text-white">500 PX Points</span>
                  </div>
                  <div className="flex items-center bg-[#0D0D0D] rounded-full px-3 py-1">
                    <span className="text-[#FF6B6B] mr-2">👑</span>
                    <span className="text-white">Exclusive Badge</span>
                  </div>
                  <div className="flex items-center bg-[#0D0D0D] rounded-full px-3 py-1">
                    <span className="text-[#4ECDC4] mr-2">🎭</span>
                    <span className="text-white">Rare Collectible</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="px-6 py-3 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded-md transition-colors"
                  onClick={handleStartRaid}
                >
                  Start Adventure
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-md transition-colors">
                  View Strategy Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="container mx-auto">
        <h3 className="text-2xl text-white font-bold mb-6">Upcoming Events</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Event 1 */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#4ECDC4]/50 transition-all duration-300">
            <div className="p-5 border-b border-neutral-700 flex justify-between items-center">
              <h4 className="text-white font-bold">Pixel Art Tournament</h4>
              <span className="bg-[#4ECDC4]/20 text-[#4ECDC4] px-2 py-1 rounded text-xs">Starts Tomorrow</span>
            </div>
            <div className="p-5">
              <p className="text-gray-300 mb-4">
                Showcase your pixel art skills in a community competition. Winners get featured on the homepage!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#FFE66D] text-sm">Prize: 1,000 PX</span>
                <button className="px-4 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded-sm text-sm transition-colors">
                  Remind Me
                </button>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FF6B6B]/50 transition-all duration-300">
            <div className="p-5 border-b border-neutral-700 flex justify-between items-center">
              <h4 className="text-white font-bold">Treasure Hunt</h4>
              <span className="bg-[#FF6B6B]/20 text-[#FF6B6B] px-2 py-1 rounded text-xs">In 3 Days</span>
            </div>
            <div className="p-5">
              <p className="text-gray-300 mb-4">
                Follow clues across the platform to find hidden treasures. First to complete wins big!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#FFE66D] text-sm">Prize: Legendary Item</span>
                <button className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded-sm text-sm transition-colors">
                  Remind Me
                </button>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FFE66D]/50 transition-all duration-300">
            <div className="p-5 border-b border-neutral-700 flex justify-between items-center">
              <h4 className="text-white font-bold">Speed Pixel Challenge</h4>
              <span className="bg-[#FFE66D]/20 text-[#FFE66D] px-2 py-1 rounded text-xs">Next Week</span>
            </div>
            <div className="p-5">
              <p className="text-gray-300 mb-4">
                Race against the clock to create pixel art based on random themes. Test your speed skills!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#FFE66D] text-sm">Prize: Special Badge</span>
                <button className="px-4 py-2 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded-sm text-sm transition-colors">
                  Remind Me
                </button>
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

      {/* Puzzle Challenge Modal */}
      {showPuzzleModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={() => setShowPuzzleModal(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-neutral-600 w-full max-w-4xl relative transform transition-all">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none z-10"
                onClick={() => setShowPuzzleModal(false)}
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
                <h3 className="text-xl text-white font-bold mb-4">Daily Pixel Puzzle</h3>
                <p className="text-gray-300 mb-6">
                  Rearrange the pixel blocks to complete the image. Drag and drop the pieces to solve the puzzle!
                </p>

                <div className="bg-[#0D0D0D] p-6 rounded-lg mb-6">
                  {/* Puzzle Game Area */}
                  <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                    {/* Puzzle pieces */}
                    <div className="aspect-square bg-[#FF6B6B] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#4ECDC4] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#FFE66D] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#4ECDC4] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#FFE66D] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#FF6B6B] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#FFE66D] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#FF6B6B] rounded-sm cursor-move"></div>
                    <div className="aspect-square bg-[#4ECDC4] rounded-sm cursor-move"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">Time Remaining:</span>
                    <span className="text-[#FF6B6B] font-mono">02:45</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">Moves:</span>
                    <span className="text-white font-bold">12</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button className="px-5 py-2 bg-transparent border border-[#4ECDC4] text-[#4ECDC4] font-bold rounded hover:bg-[#4ECDC4]/10 transition-colors">
                    Reset Puzzle
                  </button>
                  <button
                    className="px-5 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
                    onClick={handleCompletePuzzle}
                  >
                    Submit Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adventure Modal */}
      {showRaidModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
          <div
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={() => setShowRaidModal(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-neutral-600 w-full max-w-4xl relative transform transition-all">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none z-10"
                onClick={() => setShowRaidModal(false)}
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
                <h3 className="text-2xl text-white font-bold mb-2">Pixel Dungeon Adventure</h3>
                <p className="text-gray-300 mb-6">Defeat the dungeon boss and claim your rewards!</p>

                <div className="bg-[#0D0D0D] p-6 rounded-lg mb-6">
                  {/* Solo Adventure Game Visualization */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-md aspect-video relative mb-4">
                      {/* Game Scene Visualization */}
                      <div className="absolute inset-0 bg-[#4ECDC4]/20"></div>

                      {/* Boss */}
                      <div className="absolute top-1/4 right-1/4 w-1/5 h-1/3 bg-[#FF6B6B]"></div>

                      {/* Player Character */}
                      <div className="absolute bottom-1/4 left-1/4 w-1/10 h-1/5 bg-[#4ECDC4]"></div>

                      {/* Health Bars */}
                      <div className="absolute top-1/8 right-1/4 w-1/5 h-[6px] bg-[#0D0D0D]">
                        <div className="bg-[#FF6B6B] h-full w-2/3"></div>
                      </div>
                      <div className="absolute bottom-1/6 left-1/4 w-1/10 h-[4px] bg-[#0D0D0D]">
                        <div className="bg-[#4ECDC4] h-full w-full"></div>
                      </div>

                      {/* Game Effects */}
                      <div className="absolute top-1/3 right-1/3 w-1/15 h-1/15 bg-[#FFE66D] animate-ping"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <button className="px-4 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors">
                        Attack
                      </button>
                      <button className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors">
                        Special Move
                      </button>
                      <button className="px-4 py-2 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded transition-colors">
                        Heal
                      </button>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded transition-colors">
                        Defend
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0D0D0D] p-4 rounded-lg mb-6">
                  <h4 className="text-white font-bold mb-2">Adventure Progress</h4>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white text-sm">Dungeon Level:</span>
                      <span className="text-[#4ECDC4] font-bold">2/5</span>
                    </div>
                    <div className="w-full bg-[#1A1A1A] h-2 rounded-full">
                      <div className="bg-gradient-to-r from-[#4ECDC4] to-[#FFE66D] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <div className="flex items-center bg-[#1A1A1A] rounded px-3 py-2">
                      <div className="w-5 h-5 bg-[#4ECDC4] rounded-full mr-2 flex items-center justify-center text-xs">✓</div>
                      <span className="text-gray-300">Entrance Hall</span>
                    </div>
                    <div className="flex items-center bg-[#1A1A1A] rounded px-3 py-2">
                      <div className="w-5 h-5 bg-[#4ECDC4] rounded-full mr-2 flex items-center justify-center text-xs">✓</div>
                      <span className="text-gray-300">Treasure Room</span>
                    </div>
                    <div className="flex items-center bg-[#1A1A1A] border border-[#FFE66D] rounded px-3 py-2">
                      <div className="w-5 h-5 bg-[#FFE66D] rounded-full mr-2 flex items-center justify-center text-xs text-black">!</div>
                      <span className="text-white">Boss Chamber</span>
                    </div>
                    <div className="flex items-center bg-[#1A1A1A] opacity-50 rounded px-3 py-2">
                      <div className="w-5 h-5 bg-gray-500 rounded-full mr-2"></div>
                      <span className="text-gray-400">Secret Vault</span>
                    </div>
                    <div className="flex items-center bg-[#1A1A1A] opacity-50 rounded px-3 py-2">
                      <div className="w-5 h-5 bg-gray-500 rounded-full mr-2"></div>
                      <span className="text-gray-400">Pixel King's Throne</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0D0D0D] p-4 rounded-lg mb-6">
                  <h4 className="text-white font-bold mb-2">Your Stats</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#1A1A1A] p-3 rounded">
                      <div className="text-[#FF6B6B] text-xs mb-1">HEALTH</div>
                      <div className="text-white font-bold">80/100</div>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded">
                      <div className="text-[#4ECDC4] text-xs mb-1">ATTACK</div>
                      <div className="text-white font-bold">15</div>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded">
                      <div className="text-[#FFE66D] text-xs mb-1">DEFENSE</div>
                      <div className="text-white font-bold">8</div>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded">
                      <div className="text-purple-400 text-xs mb-1">SPECIAL</div>
                      <div className="text-white font-bold">Ready!</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button className="px-5 py-2 bg-transparent border border-white text-white font-bold rounded hover:bg-white/10 transition-colors">
                    View Items
                  </button>
                  <button
                    className="px-5 py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
                    onClick={handleCompleteRaid}
                  >
                    Complete Adventure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
