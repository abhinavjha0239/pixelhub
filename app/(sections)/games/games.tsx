"use client"

import { useState, useEffect, useCallback } from "react"
import { useGameContext } from "@/context/game-context"
import { useUser } from "@/context/user-context"
import Link from "next/link"

export default function Games() {
  const { 
    gameScores, 
    updateGameScore, 
    addPixelCoins, 
    activeCollectibles, 
    applyBoosts, 
    recordGameActivity,
    collectibles
  } = useGameContext()
  const { user, addAchievement, addXP } = useUser()
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [showBoostIndicator, setShowBoostIndicator] = useState(false)
  const [questProgress, setQuestProgress] = useState<{[key: string]: number}>({})

  // Memory Game State
  const [memoryGameActive, setMemoryGameActive] = useState(false)
  const [memoryCards, setMemoryCards] = useState<
    Array<{ id: number; value: string; flipped: boolean; matched: boolean }>
  >([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [memoryMoves, setMemoryMoves] = useState(0)
  const [memoryMatches, setMemoryMatches] = useState(0)

  // Pixel Puzzle State
  const [puzzleActive, setPuzzleActive] = useState(false)
  const [puzzlePieces, setPuzzlePieces] = useState<Array<{ id: number; position: number }>>([])
  const [puzzleMoves, setPuzzleMoves] = useState(0)
  const [puzzleSolved, setPuzzleSolved] = useState(false)

  // Pixel Runner State
  const [runnerActive, setRunnerActive] = useState(false)
  const [runnerScore, setRunnerScore] = useState(0)
  const [runnerGameOver, setRunnerGameOver] = useState(false)
  const [runnerPosition, setRunnerPosition] = useState(1) // 0: top, 1: middle, 2: bottom
  const [obstacles, setObstacles] = useState<Array<{ id: number; position: number; x: number }>>([])
  const [gameLoopInterval, setGameLoopInterval] = useState<NodeJS.Timeout | null>(null)
  
  // Game session tracking
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null)

  // Active boosts display
  const getActiveBoosts = useCallback(() => {
    return activeCollectibles.map(id => {
      const item = collectibles.find(c => c.id === id);
      if (!item || !item.boostEffect) return null;
      return {
        name: item.name,
        type: item.boostEffect.type,
        multiplier: item.boostEffect.multiplier
      };
    }).filter(Boolean);
  }, [activeCollectibles, collectibles]);

  // Check for active quests
  useEffect(() => {
    if (!user) return;
    
    // Track progress for game-related quests
    const gameQuests = {
      "play_games": 0,
      "earn_coins_games": 0,
      "high_score_memory": gameScores.memoryGame,
      "high_score_puzzle": gameScores.pixelPuzzle,
      "high_score_runner": gameScores.pixelRunner
    };
    
    setQuestProgress(gameQuests);
  }, [user, gameScores]);

  // Achievement tracking
  useEffect(() => {
    // Track achievements based on game scores
    if (gameScores.memoryGame >= 50) {
      addAchievement("memory_master", "Memory Master", "Score 50+ in Memory Match game")
    }

    if (gameScores.pixelPuzzle >= 60) {
      addAchievement("puzzle_solver", "Puzzle Solver", "Score 60+ in Pixel Puzzle game")
    }

    if (gameScores.pixelRunner >= 100) {
      addAchievement("speed_demon", "Speed Demon", "Score 100+ in Pixel Runner game")
    }

    // Track total game score achievements
    const totalScore = gameScores.memoryGame + gameScores.pixelPuzzle + gameScores.pixelRunner
    if (totalScore >= 200) {
      addAchievement("game_enthusiast", "Game Enthusiast", "Earn a combined score of 200+ across all games")
    }
  }, [gameScores, addAchievement])

  // Display boost indicator when active
  useEffect(() => {
    const boosts = getActiveBoosts();
    if (boosts.length > 0) {
      setShowBoostIndicator(true);
      const timer = setTimeout(() => setShowBoostIndicator(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeCollectibles, getActiveBoosts]);

  // Stop game intervals when component unmounts
  useEffect(() => {
    return () => {
      if (gameLoopInterval) {
        clearInterval(gameLoopInterval)
      }
    }
  }, [gameLoopInterval])

  // Record game activity helper
  const finishGameSession = (gameType: string, score: number, coinsEarned: number) => {
    if (!gameStartTime) return;
    
    const endTime = new Date();
    const durationMs = endTime.getTime() - gameStartTime.getTime();
    const durationSec = Math.floor(durationMs / 1000);
    
    recordGameActivity({
      gameType,
      timestamp: endTime.toISOString(),
      score,
      coinsEarned,
      duration: durationSec
    });
    
    // Reset start time
    setGameStartTime(null);
  };

  // Start Memory Game
  const emojis = ["🎮", "🏆", "💎", "🔥", "⭐", "🎨", "🎭", "🎯"]
  const startMemoryGame = () => {
    setActiveGame("memory")
    setMemoryGameActive(true)
    setMemoryMoves(0)
    setMemoryMatches(0)
    setFlippedCards([])
    setGameStartTime(new Date())

    // Create card pairs
    const cardPairs = [...emojis, ...emojis]

    // Shuffle cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }))

    setMemoryCards(shuffledCards)
  }

  // Handle Memory Card Click
  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched, or if two cards are already flipped
    if (memoryCards[id].flipped || memoryCards[id].matched || flippedCards.length >= 2) {
      return
    }

    // Flip the card
    setMemoryCards((prev) => prev.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, id])

    // If this is the second card flipped
    if (flippedCards.length === 1) {
      setMemoryMoves((prev) => prev + 1)

      // Check for match
      const firstCardId = flippedCards[0]
      const secondCardId = id

      if (memoryCards[firstCardId].value === memoryCards[secondCardId].value) {
        // Match found
        setMemoryCards((prev) =>
          prev.map((card) => (card.id === firstCardId || card.id === secondCardId ? { ...card, matched: true } : card)),
        )
        setMemoryMatches((prev) => prev + 1)
        setFlippedCards([])

        // Check if game is complete
        if (memoryMatches + 1 === emojis.length) {
          // Calculate score based on moves
          let score = Math.max(100 - memoryMoves * 5, 10)
          
          // Apply boosts from collectibles
          const boostedScore = applyBoosts(score, "score");
          if (boostedScore > score) {
            score = boostedScore;
            setTimeout(() => {
              alert(`🚀 Score boosted: ${Math.max(100 - memoryMoves * 5, 10)} → ${score}!`);
            }, 800);
          }
          
          updateGameScore("memoryGame", score)

          // Award coins and XP with possible boosts
          const baseCoins = score;
          const coinReward = applyBoosts(baseCoins, "coins");
          const xpReward = applyBoosts(25, "xp");
          
          addPixelCoins(coinReward)
          addXP(xpReward)
          
          // Record game activity
          finishGameSession("memoryGame", score, coinReward);

          setTimeout(() => {
            const boostText = coinReward > baseCoins ? `(Boosted from ${baseCoins})` : "";
            alert(`Game Complete! You earned ${coinReward} PixelCoins! ${boostText}`);
            setMemoryGameActive(false)
            setActiveGame(null)
          }, 1000)
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: false } : card,
            ),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Start Pixel Puzzle
  const startPixelPuzzle = () => {
    setActiveGame("puzzle")
    setPuzzleActive(true)
    setPuzzleMoves(0)
    setPuzzleSolved(false)
    setGameStartTime(new Date())

    // Create puzzle pieces (3x3 grid)
    const pieces = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      position: i,
    }))

    // Shuffle pieces (except the last one which is empty)
    // This creates a solvable puzzle by making an even number of swaps
    let shuffledPieces = [...pieces]
    let currentIndex = shuffledPieces.length - 2 // Don't shuffle the empty tile

    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)

      // Swap
      ;[shuffledPieces[currentIndex], shuffledPieces[randomIndex]] = [
        shuffledPieces[randomIndex],
        shuffledPieces[currentIndex],
      ]

      currentIndex--
    }

    setPuzzlePieces(shuffledPieces)
  }

  // Check if puzzle is solved
  const checkPuzzleSolved = useCallback(() => {
    return puzzlePieces.every((piece) => piece.id === piece.position)
  }, [puzzlePieces])

  // Handle Puzzle Piece Click
  const handlePuzzlePieceClick = (id: number) => {
    // Find the empty space (piece with id 8)
    const emptyIndex = puzzlePieces.findIndex((piece) => piece.id === 8)
    const clickedIndex = puzzlePieces.findIndex((piece) => piece.id === id)

    // Check if move is valid (adjacent to empty space)
    const row = Math.floor(clickedIndex / 3)
    const col = clickedIndex % 3
    const emptyRow = Math.floor(emptyIndex / 3)
    const emptyCol = emptyIndex % 3

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)

    if (isAdjacent) {
      // Swap pieces
      setPuzzlePieces((prev) => {
        const newPieces = [...prev]
        const temp = newPieces[clickedIndex]
        newPieces[clickedIndex] = newPieces[emptyIndex]
        newPieces[emptyIndex] = temp
        return newPieces
      })

      setPuzzleMoves((prev) => prev + 1)

      // Check if puzzle is solved after a small delay to allow state update
      setTimeout(() => {
        const isSolved = checkPuzzleSolved()

        if (isSolved && !puzzleSolved) {
          setPuzzleSolved(true)

          // Calculate score based on moves
          let score = Math.max(100 - puzzleMoves * 2, 10)
          
          // Apply boosts from collectibles
          const boostedScore = applyBoosts(score, "score");
          if (boostedScore > score) {
            score = boostedScore;
            setTimeout(() => {
              alert(`🚀 Score boosted: ${Math.max(100 - puzzleMoves * 2, 10)} → ${score}!`);
            }, 800);
          }
          
          updateGameScore("pixelPuzzle", score)

          // Award coins with possible boosts
          const baseCoins = score;
          const coinReward = applyBoosts(baseCoins, "coins");
          const xpReward = applyBoosts(30, "xp");
          
          addPixelCoins(coinReward)
          addXP(xpReward)
          
          // Record game activity
          finishGameSession("pixelPuzzle", score, coinReward);

          const boostText = coinReward > baseCoins ? `(Boosted from ${baseCoins})` : "";
          alert(`Puzzle Solved! You earned ${coinReward} PixelCoins! ${boostText}`)
          setPuzzleActive(false)
          setActiveGame(null)
        }
      }, 100)
    }
  }

  // Start Pixel Runner
  const startPixelRunner = () => {
    setActiveGame("runner")
    setRunnerActive(true)
    setRunnerScore(0)
    setRunnerGameOver(false)
    setRunnerPosition(1)
    setObstacles([])
    setGameStartTime(new Date())

    // Clear any existing interval
    if (gameLoopInterval) {
      clearInterval(gameLoopInterval)
    }

    // Start game loop
    const interval = setInterval(() => {
      // Increase score
      setRunnerScore((prev) => prev + 1)

      // Move obstacles
      setObstacles((prev) => {
        const updatedObstacles = prev.map((obs) => ({ ...obs, x: obs.x - 1 })).filter((obs) => obs.x > -1)

        // Add new obstacle randomly (more likely as score increases)
        const spawnChance = Math.min(0.05 + runnerScore / 1000, 0.2)
        if (Math.random() < spawnChance) {
          const newPosition = Math.floor(Math.random() * 3)
          updatedObstacles.push({
            id: Date.now(),
            position: newPosition,
            x: 10,
          })
        }

        return updatedObstacles
      })

      // Check for collisions
      const playerX = 2 // Fixed player X position
      obstacles.forEach((obs) => {
        if (obs.x === playerX && obs.position === runnerPosition) {
          // Collision detected - end game
          endRunnerGame()
        }
      })
    }, 200)

    setGameLoopInterval(interval)
  }

  // End runner game
  const endRunnerGame = () => {
    // Clear the game loop interval
    if (gameLoopInterval) {
      clearInterval(gameLoopInterval)
      setGameLoopInterval(null)
    }

    setRunnerGameOver(true)
    
    // Apply score boosts from collectibles
    let finalScore = runnerScore;
    const boostedScore = applyBoosts(runnerScore, "score");
    
    if (boostedScore > runnerScore) {
      finalScore = boostedScore;
      setTimeout(() => {
        alert(`🚀 Score boosted: ${runnerScore} → ${finalScore}!`);
      }, 800);
    }

    // Update score and award coins
    updateGameScore("pixelRunner", finalScore)
    
    // Calculate rewards with boosts
    const baseCoins = Math.floor(finalScore / 5);
    const coinsEarned = applyBoosts(baseCoins, "coins");
    const baseXP = Math.floor(finalScore / 10);
    const xpEarned = applyBoosts(baseXP, "xp");
    
    addPixelCoins(coinsEarned)
    addXP(xpEarned)
    
    // Record game activity
    finishGameSession("pixelRunner", finalScore, coinsEarned);

    setTimeout(() => {
      const boostText = coinsEarned > baseCoins ? `(Boosted from ${baseCoins})` : "";
      alert(`Game Over! Score: ${finalScore}\nYou earned ${coinsEarned} PixelCoins! ${boostText}`)
    }, 300)
  }

  // Handle Runner Controls
  const handleRunnerControl = (direction: "up" | "down") => {
    if (direction === "up" && runnerPosition > 0) {
      setRunnerPosition((prev) => prev - 1)
    } else if (direction === "down" && runnerPosition < 2) {
      setRunnerPosition((prev) => prev + 1)
    }
  }

  // Handle keyboard controls for runner
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!runnerActive || runnerGameOver) return

      if (e.key === "ArrowUp" || e.key === "w") {
        handleRunnerControl("up")
      } else if (e.key === "ArrowDown" || e.key === "s") {
        handleRunnerControl("down")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [runnerActive, runnerGameOver])

  // Render Memory Game
  const renderMemoryGame = () => (
    <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-xl">Memory Match</h3>
        <div className="flex space-x-4">
          <span className="text-gray-300">Moves: {memoryMoves}</span>
          <span className="text-gray-300">Matches: {memoryMatches}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {memoryCards.map((card) => (
          <div
            key={card.id}
            className={`aspect-square bg-[#0D0D0D] rounded-lg flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${
              card.flipped || card.matched ? "bg-[#4ECDC4]/20" : ""
            } ${card.matched ? "opacity-50" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped || card.matched ? card.value : ""}
          </div>
        ))}
      </div>

      <button
        className="w-full py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
        onClick={() => {
          setMemoryGameActive(false)
          setActiveGame(null)
        }}
      >
        Exit Game
      </button>
    </div>
  )

  // Render Pixel Puzzle
  const renderPixelPuzzle = () => (
    <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-xl">Pixel Puzzle</h3>
        <span className="text-gray-300">Moves: {puzzleMoves}</span>
      </div>

      <div className="grid grid-cols-3 gap-1 mb-4 max-w-xs mx-auto">
        {puzzlePieces.map((piece) => (
          <div
            key={piece.id}
            className={`aspect-square ${
              piece.id === 8 ? "bg-transparent" : "bg-[#4ECDC4] cursor-pointer"
            } rounded-sm flex items-center justify-center text-2xl font-bold`}
            onClick={() => piece.id !== 8 && handlePuzzlePieceClick(piece.id)}
          >
            {piece.id !== 8 && piece.id + 1}
          </div>
        ))}
      </div>

      <button
        className="w-full py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
        onClick={() => {
          setPuzzleActive(false)
          setActiveGame(null)

          // Clear any existing interval when exiting
          if (gameLoopInterval) {
            clearInterval(gameLoopInterval)
            setGameLoopInterval(null)
          }
        }}
      >
        Exit Game
      </button>
    </div>
  )

  // Render Pixel Runner
  const renderPixelRunner = () => (
    <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-xl">Pixel Runner</h3>
        <span className="text-gray-300">Score: {runnerScore}</span>
      </div>

      <div className="relative h-48 bg-[#0D0D0D] rounded-lg mb-4 overflow-hidden">
        {/* Lanes */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 border-b border-dashed border-gray-700"></div>
          <div className="flex-1 border-b border-dashed border-gray-700"></div>
          <div className="flex-1"></div>
        </div>

        {/* Player */}
        <div
          className="absolute left-8 w-8 h-8 bg-[#FF6B6B] rounded-sm transition-all duration-200"
          style={{ top: `${runnerPosition * 33.33}%` }}
        ></div>

        {/* Obstacles */}
        {obstacles.map((obs) => (
          <div
            key={obs.id}
            className="absolute w-6 h-8 bg-[#FFE66D] rounded-sm"
            style={{
              top: `${obs.position * 33.33}%`,
              left: `${obs.x * 10}%`,
            }}
          ></div>
        ))}

        {/* Game Over Overlay */}
        {runnerGameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-white text-center">
              <h4 className="text-xl font-bold mb-2">Game Over</h4>
              <p>Score: {runnerScore}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mb-4">
        <button
          className="px-6 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
          onClick={() => handleRunnerControl("up")}
          disabled={runnerGameOver}
        >
          Jump Up
        </button>
        <button
          className="px-6 py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
          onClick={() => handleRunnerControl("down")}
          disabled={runnerGameOver}
        >
          Duck Down
        </button>
      </div>

      <button
        className="w-full py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
        onClick={() => {
          if (runnerGameOver) {
            // Start new game
            startPixelRunner()
          } else {
            // Exit game
            setRunnerActive(false)
            setActiveGame(null)

            // Clear any existing interval when exiting
            if (gameLoopInterval) {
              clearInterval(gameLoopInterval)
              setGameLoopInterval(null)
            }
          }
        }}
      >
        {runnerGameOver ? "Play Again" : "Exit Game"}
      </button>
    </div>
  )

  // Render active boosts
  const renderActiveBoosts = () => {
    const boosts = getActiveBoosts();
    
    if (boosts.length === 0) return null;
    
    return (
      <div className={`fixed top-20 right-5 bg-black/70 p-3 rounded-lg z-50 transition-all duration-300 ${showBoostIndicator ? 'opacity-100' : 'opacity-0'}`}>
        <h4 className="text-[#FFE66D] text-sm font-bold mb-1">Active Boosts:</h4>
        <ul className="space-y-1">
          {boosts.map((boost, index) => (
            <li key={index} className="text-white text-xs">
              <span className="mr-1">
                {boost?.type === "coins" ? "💰" : boost?.type === "score" ? "🏆" : "✨"}
              </span>
              {boost?.name}: {Math.round((boost?.multiplier || 1) * 100 - 100)}% {boost?.type} boost
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="games" className="bg-[#0D0D0D] relative">
      {/* Render active boosts indicator */}
      {renderActiveBoosts()}
      
      {/* Equipped Items Message */}
      {activeCollectibles.length > 0 && !activeGame && (
        <div className="container mx-auto mb-8">
          <div className="bg-[#1A1A1A]/50 border border-[#4ECDC4]/30 rounded-lg p-4 flex items-center">
            <div className="text-[#4ECDC4] mr-3 text-2xl">⚡</div>
            <div>
              <h3 className="text-white font-bold">Collectible Items Active!</h3>
              <p className="text-gray-300 text-sm">
                You have {activeCollectibles.length} collectible item{activeCollectibles.length !== 1 ? 's' : ''} equipped, giving you boosts when playing games!
              </p>
            </div>
            <div className="ml-auto">
              <Link href="/profile" className="px-4 py-2 bg-[#4ECDC4]/20 hover:bg-[#4ECDC4]/30 border border-[#4ECDC4]/50 text-[#4ECDC4] rounded-md transition-colors text-sm">
                Manage Items
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Related Quests */}
      {!activeGame && user && user.quests.active.length > 0 && (
        <div className="container mx-auto mb-8">
          <div className="bg-[#1A1A1A]/50 border border-[#FFE66D]/30 rounded-lg p-4">
            <h3 className="text-[#FFE66D] font-bold flex items-center mb-2">
              <span className="text-xl mr-2">📋</span> Active Game Quests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#0D0D0D] rounded-md p-3 flex items-center">
                <div className="w-10 h-10 rounded-md bg-[#FF6B6B]/20 flex items-center justify-center mr-3">
                  <span className="text-[#FF6B6B]">🎮</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-bold">Play 3 Games</h4>
                  <div className="flex items-center">
                    <div className="h-1.5 bg-[#0D0D0D] rounded-full flex-1 mr-2">
                      <div className="h-full bg-[#FF6B6B] rounded-full" style={{ width: `${Math.min(100, (questProgress.play_games || 0) / 3 * 100)}%` }}></div>
                    </div>
                    <span className="text-gray-400 text-xs">{questProgress.play_games || 0}/3</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0D0D0D] rounded-md p-3 flex items-center">
                <div className="w-10 h-10 rounded-md bg-[#FFE66D]/20 flex items-center justify-center mr-3">
                  <span className="text-[#FFE66D]">💰</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-bold">Earn 500 coins from games</h4>
                  <div className="flex items-center">
                    <div className="h-1.5 bg-[#0D0D0D] rounded-full flex-1 mr-2">
                      <div className="h-full bg-[#FFE66D] rounded-full" style={{ width: `${Math.min(100, (questProgress.earn_coins_games || 0) / 500 * 100)}%` }}></div>
                    </div>
                    <span className="text-gray-400 text-xs">{questProgress.earn_coins_games || 0}/500</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Link href="/quests" className="text-[#FFE66D] text-xs hover:underline">View all quests</Link>
            </div>
          </div>
        </div>
      )}

      {/* Games Grid */}
      <div className="container mx-auto">
        {activeGame ? (
          <div className="max-w-lg mx-auto">
            {activeGame === "memory" && renderMemoryGame()}
            {activeGame === "puzzle" && renderPixelPuzzle()}
            {activeGame === "runner" && renderPixelRunner()}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Memory Match Game Card */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FF6B6B]/50 transition-all duration-300">
              <div className="aspect-video bg-[#0D0D0D] p-6 flex items-center justify-center">
                <div className="grid grid-cols-2 grid-rows-2 gap-3 w-32 h-32">
                  <div className="bg-[#FF6B6B] rounded-md flex items-center justify-center text-2xl">🎮</div>
                  <div className="bg-[#4ECDC4] rounded-md flex items-center justify-center text-2xl">💎</div>
                  <div className="bg-[#4ECDC4] rounded-md flex items-center justify-center text-2xl">💎</div>
                  <div className="bg-[#FFE66D] rounded-md flex items-center justify-center text-2xl">🏆</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white text-xl font-bold mb-2">Memory Match</h3>
                <p className="text-gray-300 mb-4">
                  Match pairs of cards to test your memory. Complete the game with fewer moves for higher scores!
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">High Score:</span>
                  <span className="text-[#FFE66D] font-bold">{gameScores.memoryGame}</span>
                </div>
                <button
                  className="w-full py-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
                  onClick={startMemoryGame}
                >
                  Play Now
                </button>
              </div>
            </div>

            {/* Pixel Puzzle Game Card */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#4ECDC4]/50 transition-all duration-300">
              <div className="aspect-video bg-[#0D0D0D] p-6 flex items-center justify-center">
                <div className="grid grid-cols-3 grid-rows-3 gap-1 w-32 h-32">
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">1</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">2</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">3</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">4</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">5</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">6</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">7</div>
                  <div className="bg-[#4ECDC4] rounded-sm flex items-center justify-center text-lg font-bold">8</div>
                  <div className="bg-transparent rounded-sm"></div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white text-xl font-bold mb-2">Pixel Puzzle</h3>
                <p className="text-gray-300 mb-4">
                  Slide the tiles to arrange them in order. Solve the puzzle with fewer moves for a higher score!
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">High Score:</span>
                  <span className="text-[#FFE66D] font-bold">{gameScores.pixelPuzzle}</span>
                </div>
                <button
                  className="w-full py-2 bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black font-bold rounded transition-colors"
                  onClick={startPixelPuzzle}
                >
                  Play Now
                </button>
              </div>
            </div>

            {/* Pixel Runner Game Card */}
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden hover:border-[#FFE66D]/50 transition-all duration-300">
              <div className="aspect-video bg-[#0D0D0D] p-6 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 border-b border-dashed border-gray-700"></div>
                    <div className="flex-1 border-b border-dashed border-gray-700"></div>
                    <div className="flex-1"></div>
                  </div>
                  <div className="absolute left-4 top-1/3 w-6 h-6 bg-[#FF6B6B] rounded-sm"></div>
                  <div className="absolute right-4 top-2/3 w-4 h-6 bg-[#FFE66D] rounded-sm"></div>
                  <div className="absolute right-12 top-0 w-4 h-6 bg-[#FFE66D] rounded-sm"></div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white text-xl font-bold mb-2">Pixel Runner</h3>
                <p className="text-gray-300 mb-4">
                  Jump and duck to avoid obstacles in this endless runner game. How far can you go?
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">High Score:</span>
                  <span className="text-[#FFE66D] font-bold">{gameScores.pixelRunner}</span>
                </div>
                <button
                  className="w-full py-2 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded transition-colors"
                  onClick={startPixelRunner}
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Use Collectibles Prompt */}
        {!activeGame && activeCollectibles.length === 0 && (
          <div className="mt-8 bg-[#1A1A1A]/50 border border-[#FFE66D]/30 rounded-lg p-4 text-center">
            <h3 className="text-white font-bold mb-2">Power Up Your Games!</h3>
            <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
              Visit the marketplace to purchase collectibles that boost your scores, coin earnings, and XP gains when playing games!
            </p>
            <Link href="/marketplace" className="inline-block px-6 py-3 bg-[#FFE66D] hover:bg-[#FFE66D]/80 text-black font-bold rounded-md transition-colors">
              Visit Marketplace
            </Link>
          </div>
        )}

        {/* Leaderboard Section */}
        {!activeGame && user && (
          <div className="mt-16">
            <h3 className="text-2xl text-white font-bold mb-6">Game Leaderboards</h3>
            <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Memory Match Leaderboard */}
                  <div className="bg-[#0D0D0D] rounded-lg p-4">
                    <h4 className="text-[#FF6B6B] font-bold mb-3">Memory Match</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#FFE66D] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            1
                          </div>
                          <span className="text-white">PixelMaster</span>
                        </div>
                        <span className="text-[#FFE66D]">98</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#4ECDC4] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            2
                          </div>
                          <span className="text-white">GameWizard</span>
                        </div>
                        <span className="text-[#4ECDC4]">85</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            3
                          </div>
                          <span className="text-white">PixelNinja</span>
                        </div>
                        <span className="text-[#FF6B6B]">72</span>
                      </div>
                      {gameScores.memoryGame > 0 && (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                              {gameScores.memoryGame >= 98
                                ? "1"
                                : gameScores.memoryGame >= 85
                                ? "2"
                                : gameScores.memoryGame >= 72
                                ? "3"
                                : "4"}
                            </div>
                            <span className="text-white">You</span>
                          </div>
                          <span className="text-white">{gameScores.memoryGame}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pixel Puzzle Leaderboard */}
                  <div className="bg-[#0D0D0D] rounded-lg p-4">
                    <h4 className="text-[#4ECDC4] font-bold mb-3">Pixel Puzzle</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#FFE66D] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            1
                          </div>
                          <span className="text-white">PuzzlePro</span>
                        </div>
                        <span className="text-[#FFE66D]">95</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#4ECDC4] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            2
                          </div>
                          <span className="text-white">TileMaster</span>
                        </div>
                        <span className="text-[#4ECDC4]">82</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            3
                          </div>
                          <span className="text-white">SlideKing</span>
                        </div>
                        <span className="text-[#FF6B6B]">78</span>
                      </div>
                      {gameScores.pixelPuzzle > 0 && (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                              {gameScores.pixelPuzzle >= 95
                                ? "1"
                                : gameScores.pixelPuzzle >= 82
                                ? "2"
                                : gameScores.pixelPuzzle >= 78
                                ? "3"
                                : "5"}
                            </div>
                            <span className="text-white">You</span>
                          </div>
                          <span className="text-white">{gameScores.pixelPuzzle}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pixel Runner Leaderboard */}
                  <div className="bg-[#0D0D0D] rounded-lg p-4">
                    <h4 className="text-[#FFE66D] font-bold mb-3">Pixel Runner</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#FFE66D] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            1
                          </div>
                          <span className="text-white">SpeedDemon</span>
                        </div>
                        <span className="text-[#FFE66D]">256</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#4ECDC4] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            2
                          </div>
                          <span className="text-white">RunnerX</span>
                        </div>
                        <span className="text-[#4ECDC4]">187</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center text-black font-bold text-xs mr-2">
                            3
                          </div>
                          <span className="text-white">JumpMaster</span>
                        </div>
                        <span className="text-[#FF6B6B]">142</span>
                      </div>
                      {gameScores.pixelRunner > 0 && (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                              {gameScores.pixelRunner >= 256
                                ? "1"
                                : gameScores.pixelRunner >= 187
                                ? "2"
                                : gameScores.pixelRunner >= 142
                                ? "3"
                                : "8"}
                            </div>
                            <span className="text-white">You</span>
                          </div>
                          <span className="text-white">{gameScores.pixelRunner}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pixel art decoration absolute positioned elements */}
      <div className="absolute top-20 left-8 w-6 h-6 bg-[#FF6B6B] opacity-20"></div>
      <div className="absolute top-32 left-16 w-3 h-3 bg-[#4ECDC4] opacity-30"></div>
      <div className="absolute bottom-40 right-12 w-8 h-8 bg-[#FFE66D] opacity-20"></div>
      <div className="absolute bottom-24 right-32 w-4 h-4 bg-[#FF6B6B] opacity-30"></div>
    </section>
  )
}
