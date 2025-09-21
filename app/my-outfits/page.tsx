import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Heart, MessageCircle, Edit, Trash2, Plus } from "lucide-react"
import Link from "next/link"

const mockOutfits = [
  {
    id: "1",
    title: "Sunny Day Vibes",
    description: "Perfect for a casual summer day out with friends",
    theme: "Summer Vibes",
    status: "submitted" as const,
    votes: 24,
    views: 156,
    comments: 8,
    createdAt: new Date("2024-06-15"),
    image: "/summer-outfit-bright-colors.jpg",
    products: 4,
    totalCost: 4597,
  },
  {
    id: "2",
    title: "Office Ready",
    description: "Professional yet stylish for important meetings",
    theme: "Office Chic",
    status: "voting" as const,
    votes: 12,
    views: 89,
    comments: 3,
    createdAt: new Date("2024-06-18"),
    image: "/professional-office-outfit.png",
    products: 5,
    totalCost: 7299,
  },
  {
    id: "3",
    title: "Festival Glam",
    description: "Traditional meets modern for the festive season",
    theme: "Festival Ready",
    status: "draft" as const,
    votes: 0,
    views: 0,
    comments: 0,
    createdAt: new Date("2024-06-20"),
    image: "/indian-festival-traditional-outfit.jpg",
    products: 3,
    totalCost: 8999,
  },
]

export default function MyOutfitsPage() {
  const submittedOutfits = mockOutfits.filter((outfit) => outfit.status === "submitted" || outfit.status === "voting")
  const draftOutfits = mockOutfits.filter((outfit) => outfit.status === "draft")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">StyleDuel</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/themes" className="text-muted-foreground hover:text-foreground transition-colors">
              Themes
            </Link>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Outfits</h1>
            <p className="text-xl text-muted-foreground">Manage your style creations and track their performance</p>
          </div>
          <Link href="/themes">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create New Outfit
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="submitted" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="submitted">Submitted ({submittedOutfits.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftOutfits.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="submitted" className="mt-6">
            {submittedOutfits.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">No submitted outfits yet</p>
                  <Link href="/themes">
                    <Button>Create Your First Outfit</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submittedOutfits.map((outfit) => (
                  <Card key={outfit.id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                      <img
                        src={outfit.image || "/placeholder.svg"}
                        alt={outfit.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={outfit.status === "voting" ? "default" : "secondary"}>
                          {outfit.status === "voting" ? "In Voting" : "Submitted"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-1">{outfit.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{outfit.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {outfit.theme}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {outfit.votes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {outfit.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {outfit.comments}
                          </div>
                        </div>
                        <span>₹{outfit.totalCost.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            {draftOutfits.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">No draft outfits</p>
                  <Link href="/themes">
                    <Button>Start Creating</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftOutfits.map((outfit) => (
                  <Card key={outfit.id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                      <img
                        src={outfit.image || "/placeholder.svg"}
                        alt={outfit.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">{outfit.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{outfit.description}</CardDescription>
                      <Badge variant="outline" className="text-xs w-fit">
                        {outfit.theme}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{outfit.products} items</span>
                        <span>₹{outfit.totalCost.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" className="flex-1">
                          <Edit className="mr-2 h-4 w-4" />
                          Continue Editing
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
