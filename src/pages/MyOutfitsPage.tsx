import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, Heart, MessageCircle, Edit, Trash2, Plus } from 'lucide-react'
import { outfitsAPI } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import type { Outfit } from '@/lib/types'
import { toast } from 'sonner'

export default function MyOutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOutfits = async () => {
      if (!user) return
      
      try {
        const response = await outfitsAPI.getAll(user.id)
        setOutfits(response.data)
      } catch (error) {
        console.error('Error fetching outfits:', error)
        toast.error('Failed to load outfits')
      } finally {
        setLoading(false)
      }
    }

    fetchOutfits()
  }, [user])

  const handleEdit = (outfitId: string) => {
    // Navigate to edit page (you can implement this)
    toast.info('Edit functionality coming soon!')
  }

  const handleDelete = async (outfitId: string) => {
    if (!confirm('Are you sure you want to delete this outfit?')) return
    
    try {
      await outfitsAPI.delete(outfitId)
      setOutfits(prev => prev.filter(outfit => outfit._id !== outfitId))
      toast.success('Outfit deleted successfully')
    } catch (error) {
      console.error('Error deleting outfit:', error)
      toast.error('Failed to delete outfit')
    }
  }

  const handleView = (outfitId: string) => {
    // Navigate to outfit detail view
    toast.info('View functionality coming soon!')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">Please sign in to view your outfits</p>
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const submittedOutfits = outfits.filter((outfit) => outfit.status === 'submitted' || outfit.status === 'voting')
  const draftOutfits = outfits.filter((outfit) => outfit.status === 'draft')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">StyleDuel</span>
          </button>
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/themes')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Themes
            </button>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Outfits</h1>
            <p className="text-xl text-muted-foreground">Manage your style creations and track their performance</p>
          </div>
          <Button size="lg" onClick={() => navigate('/themes')}>
            <Plus className="mr-2 h-5 w-5" />
            Create New Outfit
          </Button>
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
                  <Button onClick={() => navigate('/themes')}>Create Your First Outfit</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submittedOutfits.map((outfit) => (
                  <Card key={outfit._id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                      <img
                        src={outfit.moodboardImages[0] || '/placeholder.svg'}
                        alt={outfit.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={outfit.status === 'voting' ? 'default' : 'secondary'}>
                          {outfit.status === 'voting' ? 'In Voting' : 'Submitted'}
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
                          {outfit.themeId}
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
                            {Math.floor(outfit.votes * 6.5)}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {Math.floor(outfit.votes * 0.3)}
                          </div>
                        </div>
                        <span>₹{outfit.products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-transparent"
                          onClick={() => handleView(outfit._id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(outfit._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(outfit._id)}
                        >
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
                  <Button onClick={() => navigate('/themes')}>Start Creating</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftOutfits.map((outfit) => (
                  <Card key={outfit._id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                      <img
                        src={outfit.moodboardImages[0] || '/placeholder.svg'}
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
                        {outfit.themeId}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{outfit.products.length} items</span>
                        <span>₹{outfit.products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEdit(outfit._id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Continue Editing
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(outfit._id)}
                        >
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