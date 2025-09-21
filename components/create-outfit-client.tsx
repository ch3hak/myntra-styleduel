"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product-grid"
import { SelectedProducts } from "@/components/selected-products"
import { Shirt, ShoppingBag, Gem, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/types"

const categories = [
  { id: "clothing", label: "Clothing", icon: Shirt, subcategories: ["Dresses", "Tops", "Kurtas", "Bottoms"] },
  { id: "shoes", label: "Shoes", icon: ShoppingBag, subcategories: ["Heels", "Flats", "Sneakers", "Sandals"] },
  { id: "accessories", label: "Accessories", icon: Gem, subcategories: ["Earrings", "Necklaces", "Bracelets", "Bags"] },
  { id: "addons", label: "Add-ons", icon: Sparkles, subcategories: ["Perfumes", "Watches", "Sunglasses", "Scarves"] },
]

export function CreateOutfitClient() {
  const searchParams = useSearchParams()
  const themeId = searchParams.get("theme") || "summer-vibes"
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState("clothing")
  const [activeSubcategory, setActiveSubcategory] = useState("Dresses")

  const theme = {
    id: themeId,
    title: "Summer Vibes",
    description: "Create the perfect summer outfit with bright colors and light fabrics",
    budget: 5000,
    rules: ["Must include bright colors", "Light, breathable fabrics only", "Summer accessories encouraged"],
  }

  const totalCost = selectedProducts.reduce((sum, product) => sum + product.price, 0)
  const remainingBudget = theme.budget - totalCost

  const handleProductSelect = (product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isProductSelected = (productId: string) => {
    return selectedProducts.some((p) => p.id === productId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/themes" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Themes
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold">{theme.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Budget Remaining</div>
              <div className={`font-semibold ${remainingBudget < 0 ? "text-destructive" : "text-primary"}`}>
                ₹{remainingBudget.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Theme Info & Selected Products */}
          <div className="lg:col-span-1 space-y-6">
            {/* Theme Card */}
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

            {/* Selected Products */}
            <SelectedProducts
              products={selectedProducts}
              onRemove={(productId) => setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))}
              totalCost={totalCost}
              budget={theme.budget}
            />
          </div>

          {/* Product Selection */}
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
                    {/* Subcategory Navigation */}
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Button
                          key={subcategory}
                          variant={activeSubcategory === subcategory ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveSubcategory(subcategory)}
                        >
                          {subcategory}
                        </Button>
                      ))}
                    </div>

                    {/* Product Grid */}
                    <ProductGrid
                      category={category.id}
                      subcategory={activeSubcategory}
                      themeId={themeId}
                      onProductSelect={handleProductSelect}
                      isProductSelected={isProductSelected}
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
