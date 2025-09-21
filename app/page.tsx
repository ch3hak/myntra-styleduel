import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, Palette, Trophy, Crown, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Create. Compete. <span className="text-amber-600">Conquer Style.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-pretty">
            Join the ultimate fashion community where creativity meets competition. Build stunning outfits, participate
            in themed challenges, and vote in style duels.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/themes">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-amber-600 hover:bg-amber-700">
                <Sparkles className="mr-2 h-5 w-5" />
                Create Outfit
              </Button>
            </Link>
            <Link href="/vote">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Vote in Duels
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Link href="/leaderboard">
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <Trophy className="h-8 w-8 text-amber-600" />
                  <div className="text-left">
                    <h3 className="font-semibold">Leaderboard</h3>
                    <p className="text-sm text-gray-600">See top stylists</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/winners">
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <Crown className="h-8 w-8 text-indigo-600" />
                  <div className="text-left">
                    <h3 className="font-semibold">Winners</h3>
                    <p className="text-sm text-gray-600">Recent champions</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/my-outfits">
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <Palette className="h-8 w-8 text-purple-600" />
                  <div className="text-left">
                    <h3 className="font-semibold">My Outfits</h3>
                    <p className="text-sm text-gray-600">Your creations</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Themes */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Challenges</h3>
          <p className="text-gray-600 text-lg">Join these trending style challenges</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/themes">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Summer Vibes</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <CardDescription>Create the perfect summer outfit with bright colors and light fabrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Budget: ₹5,000</span>
                  <span>127 entries</span>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">
                    Bright Colors
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Light Fabrics
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Office Chic</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <CardDescription>Professional yet stylish - perfect for the modern workplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Budget: ₹8,000</span>
                  <span>89 entries</span>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">
                    Professional
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Elegant
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Festival Ready</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">New</Badge>
                </div>
                <CardDescription>Traditional meets contemporary for the festive season</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Budget: ₹12,000</span>
                  <span>45 entries</span>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">
                    Traditional
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Festive
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link href="/themes">
            <Button variant="outline" size="lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              View All Themes
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">2.5K+</div>
              <div className="text-gray-600">Outfits Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">15K+</div>
              <div className="text-gray-600">Votes Cast</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">25</div>
              <div className="text-gray-600">Active Themes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="h-6 w-6 text-amber-600" />
            <span className="text-xl font-bold">StyleDuel</span>
          </div>
          <p className="text-gray-600 mb-6">Where fashion meets competition. Create, vote, and win amazing rewards.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link href="/themes" className="hover:text-gray-900">
              Themes
            </Link>
            <Link href="/vote" className="hover:text-gray-900">
              Vote
            </Link>
            <Link href="/leaderboard" className="hover:text-gray-900">
              Leaderboard
            </Link>
            <Link href="/winners" className="hover:text-gray-900">
              Winners
            </Link>
            <Link href="/my-outfits" className="hover:text-gray-900">
              My Outfits
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
