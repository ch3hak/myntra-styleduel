"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Heart, TrendingUp, Users } from "lucide-react"

interface VotingStatsProps {
  onBack: () => void
  userVotes: number
}

const topOutfits = [
  {
    id: "3",
    title: "Power Dressing",
    creator: "Jessica L.",
    theme: "Office Chic",
    votes: 31,
    image: "/professional-office-outfit.png",
  },
  {
    id: "6",
    title: "Festive Fusion",
    creator: "Kavya P.",
    theme: "Festival Ready",
    votes: 27,
    image: "/festival-fusion-outfit.jpg",
  },
  {
    id: "1",
    title: "Sunny Day Vibes",
    creator: "Sarah M.",
    theme: "Summer Vibes",
    votes: 24,
    image: "/summer-outfit-bright-colors.jpg",
  },
]

const votingStats = {
  totalVotes: 1247,
  activeVoters: 89,
  outfitsInVoting: 24,
  dailyWinners: 3,
}

export function VotingStats({ onBack, userVotes }: VotingStatsProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Voting
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold">Voting Statistics</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your Voting Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userVotes}</div>
                <div className="text-sm text-muted-foreground">Votes Cast</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.floor(userVotes * 1.2)}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.floor(userVotes / 5)}</div>
                <div className="text-sm text-muted-foreground">Streak Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#{Math.max(1, 50 - userVotes)}</div>
                <div className="text-sm text-muted-foreground">Voter Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{votingStats.totalVotes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Votes</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{votingStats.activeVoters}</div>
              <div className="text-sm text-muted-foreground">Active Voters</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{votingStats.outfitsInVoting}</div>
              <div className="text-sm text-muted-foreground">Outfits in Voting</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{votingStats.dailyWinners}</div>
              <div className="text-sm text-muted-foreground">Daily Winners</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Top Performing Outfits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOutfits.map((outfit, index) => (
                <div key={outfit.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <img
                    src={outfit.image || "/placeholder.svg"}
                    alt={outfit.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{outfit.title}</h3>
                    <p className="text-sm text-muted-foreground">by {outfit.creator}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {outfit.theme}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <Heart className="h-4 w-4" />
                      {outfit.votes}
                    </div>
                    <div className="text-xs text-muted-foreground">votes</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
