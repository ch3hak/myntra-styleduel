"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, Calendar, User } from "lucide-react"
import type { Outfit } from "@/lib/types"

interface OutfitDuelProps {
  outfit1: Outfit
  outfit2: Outfit
  onVote: (winnerId: string) => void
  onSkip: () => void
}

const themeNames = {
  "summer-vibes": "Summer Vibes",
  "office-chic": "Office Chic",
  "festival-ready": "Festival Ready",
}

const userNames = {
  user1: "Sarah M.",
  user2: "Priya K.",
  user3: "Jessica L.",
  user4: "Ananya S.",
  user5: "Meera R.",
  user6: "Kavya P.",
}

export function OutfitDuel({ outfit1, outfit2, onVote, onSkip }: OutfitDuelProps) {
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (outfitId: string) => {
    setSelectedOutfit(outfitId)
    setIsVoting(true)

    // Add a small delay for visual feedback
    setTimeout(() => {
      onVote(outfitId)
      setSelectedOutfit(null)
      setIsVoting(false)
    }, 800)
  }

  const OutfitCard = ({ outfit, position }: { outfit: Outfit; position: "left" | "right" }) => {
    const isSelected = selectedOutfit === outfit.id
    const isWinner = isSelected && isVoting

    return (
      <Card
        className={`group cursor-pointer transition-all duration-300 ${
          isSelected ? "ring-2 ring-primary scale-105" : "hover:shadow-lg hover:scale-102"
        } ${isWinner ? "bg-primary/5" : ""}`}
        onClick={() => !isVoting && handleVote(outfit.id)}
      >
        <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden relative">
          <img
            src={outfit.moodboardImages[0] || "/placeholder.svg"}
            alt={outfit.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isWinner && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold animate-pulse">
                Winner!
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {themeNames[outfit.themeId as keyof typeof themeNames]}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-xl line-clamp-1">{outfit.title}</CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2">{outfit.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {userNames[outfit.userId as keyof typeof userNames]}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {outfit.createdAt.toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {outfit.votes}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {Math.floor(outfit.votes * 6.5)}
              </div>
            </div>
            <Button size="sm" variant={isSelected ? "default" : "outline"} disabled={isVoting} className="min-w-[80px]">
              {isVoting && isSelected ? "Voting..." : "Vote"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Which outfit do you prefer?</h2>
        <p className="text-muted-foreground">Click on your favorite to cast your vote</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <OutfitCard outfit={outfit1} position="left" />
        <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:z-10">
          <div className="bg-background border-2 border-primary rounded-full p-3">
            <span className="text-primary font-bold text-lg">VS</span>
          </div>
        </div>
        <OutfitCard outfit={outfit2} position="right" />
      </div>
    </div>
  )
}
