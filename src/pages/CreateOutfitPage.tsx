import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductGrid } from '@/components/product-grid'
import { SelectedProducts } from '@/components/selected-products'
import { Shirt, ShoppingBag, Gem, Sparkles, ArrowLeft } from 'lucide-react'
import { themesAPI } from '@/lib/api'
import { useOutfit } from '@/lib/outfit-state'
import type { Theme } from '@/lib/types'

const categories = [
  { id: 'clothing', label: 'Clothing', icon: Shirt, subcategories: ['Dresses', 'Tops', 'Kurtas', 'Bottoms'] },
  { id: 'shoes', label: 'Shoes', icon: ShoppingBag, subcategories: ['Heels', 'Flats', 'Sneakers', 'Sandals'] },
  { id: 'accessories', label: 'Accessories', icon: Gem, subcategories: ['Earrings', 'Necklaces', 'Bracelets', 'Bags'] },
  { id: 'addons', label: 'Add-ons', icon: Sparkles, subcategories: ['Perfumes', 'Watches', 'Sunglasses', 'Scarves'] },
]

export default function CreateOutfitPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const themeIdFromUrl = searchParams.get('theme')
  
  const { selectedProducts, themeId, totalCost, setTheme, removeProduct } = useOutfit()
  const [theme, setThemeData] = useState<Theme | null>(null)
  const [activeCategory, setActiveCategory] = useState('clothing')
  const [activeSubcategory, setActiveSubcategory] = useState('Dresses')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTheme = async () => {
      if (themeIdFromUrl && themeIdFromUrl !== themeId) {
        setTheme(themeIdFromUrl)
        try {
          const response = await themesAPI.getById(themeIdFromUrl)
          setThemeData(response.data)
        } catch (error) {
          console.error('Error fetching theme:', error)
        }
      } else if (themeId) {
        try {
          const response = await themesAPI.getById(themeId)
          setThemeData(response.data)
        } catch (error) {
          console.error('Error fetching theme:', error)
        }
      }
      setLoading(false)
    }

    fetchTheme()
  }, [themeIdFromUrl, themeId, setTheme])

  const remainingBudget = theme ? theme.budget - totalCost : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!theme) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Theme not found</h2>
          <Button onClick={() => navigate('/themes')}>Back to Themes</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/themes')} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Themes
            </button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold">{theme.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Budget Remaining</div>
              <div className={`font-semibold ${remainingBudget < 0 ? 'text-destructive' : 'text-primary'}`}>
                ₹{remainingBudget.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Challenge Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Budget: ₹{theme.budget.toLocaleString()}</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {theme.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <SelectedProducts
              products={selectedProducts}
              onRemove={removeProduct}
              totalCost={totalCost}
              budget={theme.budget}
            />
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {category.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-6">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Button
                          key={subcategory}
                          variant={activeSubcategory === subcategory ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveSubcategory(subcategory)}
                        >
                          {subcategory}
                        </Button>
                      ))}
                    </div>

                    <ProductGrid
                      category={category.id}
                      subcategory={activeSubcategory}
                      themeId={themeId}
                      remainingBudget={remainingBudget}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}