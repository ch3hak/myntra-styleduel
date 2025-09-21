import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const themes = [
  {
    id: "summer-vibes",
    title: "Summer Vibes",
    description: "Create the perfect summer outfit with bright colors and light fabrics",
    rules: ["Must include bright colors", "Light, breathable fabrics only", "Summer accessories encouraged"],
    budget: 5000,
    requiredColors: ["Yellow", "Orange", "Pink", "Turquoise"],
    rewards: ["₹2000 voucher", "Featured on homepage", "Style influencer badge"],
    status: "active" as const,
    entries: 127,
    endDate: new Date("2024-07-15"),
    image: "/summer-fashion-bright-colors.jpg",
  },
  {
    id: "office-chic",
    title: "Office Chic",
    description: "Professional yet stylish - perfect for the modern workplace",
    rules: ["Professional attire required", "Neutral or muted colors", "Must include blazer or formal top"],
    budget: 8000,
    rewards: ["₹3000 voucher", "LinkedIn feature", "Professional styling session"],
    status: "active" as const,
    entries: 89,
    endDate: new Date("2024-07-20"),
    image: "/office-professional-fashion.jpg",
  },
  {
    id: "festival-ready",
    title: "Festival Ready",
    description: "Traditional meets contemporary for the festive season",
    rules: ["Traditional elements required", "Festive colors preferred", "Cultural accessories encouraged"],
    budget: 12000,
    rewards: ["₹5000 voucher", "Designer consultation", "Festival lookbook feature"],
    status: "active" as const,
    entries: 45,
    endDate: new Date("2024-08-01"),
    image: "/indian-festival-traditional-fashion.jpg",
  },
]

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">StyleDuel</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/vote" className="text-muted-foreground hover:text-foreground transition-colors">
              Vote
            </Link>
            <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Style Challenges</h1>
          <p className="text-xl text-muted-foreground">Choose a theme and create your winning outfit</p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <Card key={theme.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={theme.image || "/placeholder.svg"}
                  alt={theme.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{theme.title}</CardTitle>
                  <Badge variant="secondary">{theme.status}</Badge>
                </div>
                <CardDescription className="text-base">{theme.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Rules */}
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">Rules:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {theme.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Budget & Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Budget: ₹{theme.budget.toLocaleString()}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {theme.entries}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {theme.endDate.toLocaleDateString()}
                  </div>
                </div>

                {/* Rewards */}
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-primary" />
                    Rewards:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {theme.rewards.map((reward, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/create-outfit?theme=${theme.id}`} className="block">
                  <Button className="w-full group">
                    Start Creating
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
