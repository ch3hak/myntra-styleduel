"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Plus } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  category: string
  subcategory: string
  themeId: string
  onProductSelect: (product: Product) => void
  isProductSelected: (productId: string) => boolean
  remainingBudget: number
}

// Mock product data - in a real app, this would come from an API
const generateMockProducts = (category: string, subcategory: string, themeId: string): Product[] => {
  const baseProducts = {
    clothing: {
      Dresses: [
        { name: "Floral Summer Dress", brand: "Zara", price: 2499, colors: ["Yellow", "Pink"] },
        { name: "Maxi Sundress", brand: "H&M", price: 1999, colors: ["Orange", "Turquoise"] },
        { name: "Cotton A-Line Dress", brand: "Mango", price: 2799, colors: ["Pink", "Yellow"] },
      ],
      Tops: [
        { name: "Crop Top", brand: "Forever 21", price: 899, colors: ["Yellow", "Pink"] },
        { name: "Silk Blouse", brand: "Zara", price: 1899, colors: ["Turquoise", "Orange"] },
        { name: "Tank Top", brand: "H&M", price: 699, colors: ["Pink", "Yellow"] },
      ],
    },
    shoes: {
      Sandals: [
        { name: "Strappy Sandals", brand: "Steve Madden", price: 1599, colors: ["Tan", "White"] },
        { name: "Platform Sandals", brand: "Aldo", price: 2199, colors: ["Pink", "Yellow"] },
      ],
    },
    accessories: {
      Earrings: [
        { name: "Hoop Earrings", brand: "Accessorize", price: 599, colors: ["Gold", "Silver"] },
        { name: "Statement Earrings", brand: "Zara", price: 899, colors: ["Pink", "Turquoise"] },
      ],
    },
  }

  const categoryProducts = baseProducts[category as keyof typeof baseProducts]
  const subcategoryProducts = categoryProducts?.[subcategory as keyof typeof categoryProducts] || []

  return subcategoryProducts.map((product, index) => ({
    id: `${category}-${subcategory}-${index}`,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: `/placeholder.svg?height=300&width=250&query=${product.name.toLowerCase()}`,
    category: category as "clothing" | "shoes" | "accessories" | "addons",
    subcategory,
    colors: product.colors,
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["summer", "trendy"],
  }))
}

export function ProductGrid({
  category,
  subcategory,
  themeId,
  onProductSelect,
  isProductSelected,
  remainingBudget,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const mockProducts = generateMockProducts(category, subcategory, themeId)
    setProducts(mockProducts)
  }, [category, subcategory, themeId])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        const selected = isProductSelected(product.id)
        const canAfford = product.price <= remainingBudget || selected

        return (
          <Card
            key={product.id}
            className={`group cursor-pointer transition-all duration-200 ${
              selected ? "ring-2 ring-primary" : "hover:shadow-md"
            } ${!canAfford ? "opacity-50" : ""}`}
            onClick={() => canAfford && onProductSelect(product)}
          >
            <CardContent className="p-0">
              <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {selected && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                {!canAfford && !selected && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Over Budget</span>
                  </div>
                )}
              </div>

              <div className="p-3 space-y-2">
                <div>
                  <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">₹{product.price.toLocaleString()}</span>
                  <Button
                    size="sm"
                    variant={selected ? "default" : "outline"}
                    className="h-7 px-2"
                    disabled={!canAfford}
                  >
                    {selected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.colors.slice(0, 2).map((color) => (
                    <Badge key={color} variant="secondary" className="text-xs px-1 py-0">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
