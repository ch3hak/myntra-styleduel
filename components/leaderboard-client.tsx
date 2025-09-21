"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Star, TrendingUp, Award, Gift, Zap } from "lucide-react"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  rank: number
  points: number
  wins: number
  totalOutfits: number
  winRate: number
  badges: string[]
  level: string
  streak: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  progress: number
  maxProgress: number
  unlocked: boolean
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "/indian-woman-fashion-stylist.jpg",
    rank: 1,
    points: 2850,
    wins: 45,
    totalOutfits: 67,
    winRate: 67.2,
    badges: ["Style Master", "Trendsetter", "Color Guru"],
    level: "Fashion Icon",
    streak: 12,
  },
  {
    id: "2",
    name: "Arjun Patel",
    avatar: "/indian-man-fashion-stylist.jpg",
    rank: 2,
    points: 2640,
    wins: 38,
    totalOutfits: 52,
    winRate: 73.1,
    badges: ["Minimalist", "Street Style"],
    level: "Style Expert",
    streak: 8,
  },
  {
    id: "3",
    name: "Kavya Reddy",
    avatar: "/indian-woman-fashion-designer.jpg",
    rank: 3,
    points: 2420,
    wins: 34,
    totalOutfits: 48,
    winRate: 70.8,
    badges: ["Ethnic Expert", "Festival Queen"],
    level: "Style Expert",
    streak: 5,
  },
  {
    id: "4",
    name: "Rohit Singh",
    avatar: "/indian-man-casual-fashion.jpg",
    rank: 4,
    points: 2180,
    wins: 29,
    totalOutfits: 41,
    winRate: 70.7,
    badges: ["Casual King"],
    level: "Style Enthusiast",
    streak: 3,
  },
  {
    id: "5",
    name: "Ananya Gupta",
    avatar: "/indian-woman-modern-fashion.jpg",
    rank: 5,
    points: 1950,
    wins: 25,
    totalOutfits: 38,
    winRate: 65.8,
    badges: ["Modern Mix"],
    level: "Style Enthusiast",
    streak: 7,
  },
]

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Victory",
    description: "Win your first style duel",
    icon: "🏆",
    rarity: "common",
    progress: 1,
    maxProgress: 1,
    unlocked: true,
  },
  {
    id: "2",
    title: "Winning Streak",
    description: "Win 5 duels in a row",
    icon: "🔥",
    rarity: "rare",
    progress: 3,
    maxProgress: 5,
    unlocked: false,
  },
  {
    id: "3",
    title: "Style Master",
    description: "Win 50 style duels",
    icon: "👑",
    rarity: "epic",
    progress: 45,
    maxProgress: 50,
    unlocked: false,
  },
  {
    id: "4",
    title: "Trendsetter",
    description: "Create an outfit that gets 1000+ votes",
    icon: "⭐",
    rarity: "legendary",
    progress: 850,
    maxProgress: 1000,
    unlocked: false,
  },
]

export function LeaderboardClient() {
  const [activeTab, setActiveTab] = useState("overall")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Style Champions</h1>
        <p className="text-lg text-gray-600">Celebrating our top fashion creators</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockLeaderboard.slice(0, 3).map((user, index) => (
              <Card
                key={user.id}
                className={`relative overflow-hidden ${
                  index === 0
                    ? "ring-2 ring-yellow-400 shadow-lg"
                    : index === 1
                      ? "ring-2 ring-gray-300"
                      : "ring-2 ring-amber-300"
                }`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">{getRankIcon(user.rank)}</div>
                  <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {user.level}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Points:</span>
                      <span className="font-semibold">{user.points.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Win Rate:</span>
                      <span className="font-semibold">{user.winRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Streak:</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        {user.streak}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {user.badges.slice(0, 2).map((badge) => (
                      <Badge key={badge} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Full Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaderboard.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{user.points.toLocaleString()}</div>
                        <div className="text-gray-600">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{user.wins}</div>
                        <div className="text-gray-600">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{user.winRate}%</div>
                        <div className="text-gray-600">Win Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Rising Stars</CardTitle>
              <p className="text-sm text-gray-600">Weekly rankings reset every Monday</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaderboard.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">
                        <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">
                          +{Math.floor(Math.random() * 200 + 50)} points this week
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{Math.floor(Math.random() * 10 + 3)} wins</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`relative ${achievement.unlocked ? "ring-2 ring-green-200" : "opacity-75"}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          achievement.unlocked ? "bg-green-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="default" className="mt-2 bg-green-100 text-green-800">
                      <Star className="h-3 w-3 mr-1" />
                      Unlocked!
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rewards Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Available Rewards
              </CardTitle>
              <p className="text-sm text-gray-600">Redeem your points for exclusive rewards</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">🎁</div>
                  <h3 className="font-semibold">20% Off Coupon</h3>
                  <p className="text-sm text-gray-600 mb-2">Valid on any purchase</p>
                  <Badge variant="outline">500 points</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">⭐</div>
                  <h3 className="font-semibold">Featured Styling</h3>
                  <p className="text-sm text-gray-600 mb-2">Get your outfit featured</p>
                  <Badge variant="outline">1000 points</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-2">👑</div>
                  <h3 className="font-semibold">VIP Access</h3>
                  <p className="text-sm text-gray-600 mb-2">Early access to sales</p>
                  <Badge variant="outline">2000 points</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
