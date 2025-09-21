"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface OutfitVisualizerProps {
  products: Product[]
}

export function OutfitVisualizer({ products }: OutfitVisualizerProps) {
  const categorizedProducts = {
    clothing: products.filter((p) => p.category === "clothing"),
    shoes: products.filter((p) => p.category === "shoes"),
    accessories: products.filter((p) => p.category === "accessories"),
    addons: products.filter((p) => p.category === "addons"),
  }

  return (
    <div className="space-y-6">
      {/* Main Outfit Display */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">₹{product.price.toLocaleString()}</span>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
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
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(categorizedProducts).map(([category, items]) => (
          <div key={category} className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-sm text-muted-foreground capitalize">{category}</div>
            {items.length > 0 && (
              <div className="text-xs text-muted-foreground mt-1">
                ₹{items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Style Summary */}
      <div className="bg-card p-4 rounded-lg border">
        <h4 className="font-semibold mb-3">Style Summary</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Dominant Colors:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {Array.from(new Set(products.flatMap((p) => p.colors))).map((color) => (
                <Badge key={color} variant="secondary" className="text-xs">
                  {color}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Style Tags:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {Array.from(new Set(products.flatMap((p) => p.tags))).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
