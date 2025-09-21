"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OutfitDuel } from "@/components/outfit-duel"
import { VotingStats } from "@/components/voting-stats"
import { Heart, X, RotateCcw, Trophy, Users } from "lucide-react"
import Link from "next/link"
import type { Outfit } from "@/lib/types"

// Mock outfit data for voting
const mockOutfits: Outfit[] = [
  {
    id: "1",
    userId: "user1",
    themeId: "summer-vibes",
    title: "Sunny Day Vibes",
    description: "Perfect for a casual summer day out with friends",
    products: [],
    moodboardImages: ["/summer-outfit-bright-colors.jpg"],
    votes: 24,
    createdAt: new Date("2024-06-15"),
    status: "voting",
  },
  {
    id: "2",
    userId: "user2",
    themeId: "summer-vibes",
    title: "Beach Ready",
    description: "Effortless beach style with vibrant colors",
    products: [],
    moodboardImages: ["/beach-outfit-inspiration.jpg"],
    votes: 18,
    createdAt: new Date("2024-06-16"),
    status: "voting",
  },
  {
    id: "3",
    userId: "user3",
    themeId: "office-chic",
    title: "Power Dressing",
    description: "Professional yet stylish for important meetings",
    products: [],
    moodboardImages: ["/professional-office-outfit.png"],
    votes: 31,
    createdAt: new Date("2024-06-17"),
    status: "voting",
  },
  {
    id: "4",
    userId: "user4",
    themeId: "office-chic",
    title: "Modern Professional",
    description: "Contemporary office wear with a twist",
    products: [],
    moodboardImages: ["/modern-office-style.jpg"],
    votes: 22,
    createdAt: new Date("2024-06-18"),
    status: "voting",
  },
  {
    id: "5",
    userId: "user5",
    themeId: "festival-ready",
    title: "Traditional Elegance",
    description: "Classic meets contemporary for festivals",
    products: [],
    moodboardImages: ["/indian-festival-traditional-outfit.jpg"],
    votes: 15,
    createdAt: new Date("2024-06-19"),
    status: "voting",
  },
  {
    id: "6",
    userId: "user6",
    themeId: "festival-ready",
    title: "Festive Fusion",
    description: "Modern interpretation of traditional wear",
    products: [],
    moodboardImages: ["/festival-fusion-outfit.jpg"],
    votes: 27,
    createdAt: new Date("2024-06-20"),
    status: "voting",
  },
]

export function VotingClient() {
  const searchParams = useSearchParams()
  const submitted = searchParams.get("submitted") === "true"

  const [currentPair, setCurrentPair] = useState<[Outfit, Outfit] | null>(null)
  const [votedPairs, setVotedPairs] = useState<Set<string>>(new Set())
  const [userVotes, setUserVotes] = useState(0)
  const [showStats, setShowStats] = useState(false)

  // Generate random pairs for voting
  const generateNewPair = () => {
    const availableOutfits = mockOutfits.filter((outfit) => {
      // Filter outfits that haven't been in voted pairs
      return !Array.from(votedPairs).some((pairId) => pairId.includes(outfit.id))
    })

    if (availableOutfits.length < 2) {
      // Reset if we've voted on all possible pairs
      setVotedPairs(new Set())
      setCurrentPair([mockOutfits[0], mockOutfits[1]])
      return
    }

    // Randomly select two outfits
    const shuffled = [...availableOutfits].sort(() => 0.5 - Math.random())
    const pair: [Outfit, Outfit] = [shuffled[0], shuffled[1]]
    setCurrentPair(pair)
  }

  const handleVote = (winnerId: string) => {
    if (!currentPair) return

    const pairId = `${currentPair[0].id}-${currentPair[1].id}`
    setVotedPairs((prev) => new Set([...prev, pairId]))
    setUserVotes((prev) => prev + 1)

    // In a real app, this would send the vote to the backend
    console.log("Vote cast for outfit:", winnerId)

    // Generate next pair after a short delay
    setTimeout(() => {
      generateNewPair()
    }, 500)
  }

  const handleSkip = () => {
    generateNewPair()
  }

  useEffect(() => {
    generateNewPair()
  }, [])

  if (showStats) {
    return <VotingStats onBack={() => setShowStats(false)} userVotes={userVotes} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">StyleDuel</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-primary" />
                <span className="font-semibold">{userVotes}</span>
                <span className="text-muted-foreground">votes cast</span>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/themes" className="text-muted-foreground hover:text-foreground transition-colors">
                Create
              </Link>
              <Button variant="outline" size="sm" onClick={() => setShowStats(true)}>
                <Trophy className="mr-2 h-4 w-4" />
                Stats
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {submitted && (
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <p className="text-primary font-medium">
                  Your outfit has been submitted! Now help others by voting on their creations.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Style Duels</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Vote for your favorite outfits and help determine the winners
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{mockOutfits.length} outfits competing</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Winners announced daily</span>
            </div>
          </div>
        </div>

        {currentPair ? (
          <div className="max-w-6xl mx-auto">
            <OutfitDuel outfit1={currentPair[0]} outfit2={currentPair[1]} onVote={handleVote} onSkip={handleSkip} />

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" onClick={handleSkip} className="flex items-center gap-2 bg-transparent">
                <X className="h-4 w-4" />
                Skip
              </Button>
              <Button variant="outline" onClick={generateNewPair} className="flex items-center gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                New Pair
              </Button>
            </div>

            {/* Voting Tips */}
            <Card className="mt-8 bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Voting Tips</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">Theme Adherence:</strong> Does the outfit follow the challenge
                    rules?
                  </div>
                  <div>
                    <strong className="text-foreground">Creativity:</strong> How unique and innovative is the styling?
                  </div>
                  <div>
                    <strong className="text-foreground">Overall Appeal:</strong> Which outfit would you wear or
                    recommend?
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading next duel...</p>
          </div>
        )}
      </div>
    </div>
  )
}
