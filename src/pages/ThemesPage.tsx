import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Trophy, Users, ArrowRight } from 'lucide-react'
import { themesAPI } from '@/lib/api'
import { useOutfit } from '@/lib/outfit-state'
import type { Theme } from '@/lib/types'

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { setTheme } = useOutfit()

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await themesAPI.getAll()
        setThemes(response.data)
      } catch (error) {
        console.error('Error fetching themes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchThemes()
  }, [])

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId)
    navigate(`/create-outfit?theme=${themeId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">StyleDuel</span>
          </div>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/vote')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Vote
            </button>
            <button 
              onClick={() => navigate('/leaderboard')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboard
            </button>
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
            <Card key={theme._id} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={theme.image || '/placeholder.svg'}
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
                    {new Date(theme.endDate).toLocaleDateString()}
                  </div>
                </div>

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

                <Button 
                  className="w-full group" 
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}