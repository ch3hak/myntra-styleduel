"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Crown, Heart, MessageCircle, Share2, ShoppingBag } from "lucide-react"

interface WinningOutfit {
  id: string
  user: {
    name: string
    avatar: string
    level: string
  }
  theme: string
  title: string
  description: string
  image: string
  votes: number
  comments: number
  products: Array<{
    id: string
    name: string
    price: number
    image: string
  }>
  winDate: string
  prize: string
}

const mockWinners: WinningOutfit[] = [
  {
    id: "1",
    user: {
      name: "Priya Sharma",
      avatar: "/indian-woman-fashion-stylist.jpg",
      level: "Fashion Icon",
    },
    theme: "Summer Vibes",
    title: "Tropical Paradise",
    description:
      "A vibrant summer look that captures the essence of tropical beaches with flowing fabrics and bright colors.",
    image: "/summer-fashion-bright-colors.jpg",
    votes: 1247,
    comments: 89,
    products: [
      { id: "1", name: "Floral Maxi Dress", price: 2499, image: "/floral-summer-dress.png" },
      { id: "2", name: "Strappy Sandals", price: 1299, image: "/strappy-sandals.png" },
      { id: "3", name: "Statement Earrings", price: 599, image: "/gold-hoop-earrings.png" },
    ],
    winDate: "2024-01-15",
    prize: "₹5,000 Shopping Voucher",
  },
  {
    id: "2",
    user: {
      name: "Arjun Patel",
      avatar: "/indian-man-fashion-stylist.jpg",
      level: "Style Expert",
    },
    theme: "Office Professional",
    title: "Modern Executive",
    description: "A contemporary take on professional wear that balances sophistication with modern style.",
    image: "/office-professional-fashion.jpg",
    votes: 1156,
    comments: 67,
    products: [
      { id: "4", name: "Slim Fit Blazer", price: 3999, image: "/navy-blazer.png" },
      { id: "5", name: "Formal Shirt", price: 1499, image: "/white-shirt.png" },
      { id: "6", name: "Leather Shoes", price: 2799, image: "/brown-leather-shoes.png" },
    ],
    winDate: "2024-01-10",
    prize: "₹3,000 Shopping Voucher",
  },
]

export function WinnersShowcase() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Winners</h2>
        <p className="text-gray-600">Celebrating our style champions and their winning looks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockWinners.map((winner) => (
          <Card key={winner.id} className="overflow-hidden">
            <div className="relative">
              <img src={winner.image || "/placeholder.svg"} alt={winner.title} className="w-full h-64 object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Winner
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary">{winner.theme}</Badge>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={winner.user.avatar || "/placeholder.svg"} alt={winner.user.name} />
                    <AvatarFallback>
                      {winner.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{winner.user.name}</h3>
                    <p className="text-sm text-gray-600">{winner.user.level}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-700 bg-green-50">
                  {winner.prize}
                </Badge>
              </div>
              <CardTitle className="text-xl">{winner.title}</CardTitle>
              <p className="text-gray-600">{winner.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {winner.votes.toLocaleString()} votes
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {winner.comments} comments
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Shop This Look</h4>
                <div className="grid grid-cols-3 gap-3">
                  {winner.products.map((product) => (
                    <div key={product.id} className="text-center">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <p className="text-xs font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-600">₹{product.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop Complete Look - ₹{winner.products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
