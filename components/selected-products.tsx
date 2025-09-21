"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/types"
import Link from "next/link"

interface SelectedProductsProps {
  products: Product[]
  onRemove: (productId: string) => void
  totalCost: number
  budget: number
}

export function SelectedProducts({ products, onRemove, totalCost, budget }: SelectedProductsProps) {
  const hasClothing = products.some((p) => p.category === "clothing")
  const canProceed = hasClothing && products.length > 0

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Selected Items ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No items selected yet</p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <p className="text-sm font-semibold text-primary">₹{product.price.toLocaleString()}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemove(product.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Budget Summary */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Cost:</span>
            <span className="font-semibold">₹{totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Budget:</span>
            <span>₹{budget.toLocaleString()}</span>
          </div>
          <div
            className={`flex justify-between font-semibold ${totalCost > budget ? "text-destructive" : "text-primary"}`}
          >
            <span>Remaining:</span>
            <span>₹{(budget - totalCost).toLocaleString()}</span>
          </div>
        </div>

        {/* Requirements Check */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${hasClothing ? "bg-green-500" : "bg-muted"}`} />
            <span className="text-sm">Clothing item required</span>
          </div>
        </div>

        {/* Proceed Button */}
        {canProceed && totalCost <= budget && (
          <Link href="/create-outfit/moodboard" className="block">
            <Button className="w-full">Create Moodboard</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
