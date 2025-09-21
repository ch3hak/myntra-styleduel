import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Plus } from 'lucide-react'
import { productsAPI } from '@/lib/api'
import { useOutfit } from '@/lib/outfit-state'
import type { Product } from '@/lib/types'

interface ProductGridProps {
  category: string
  subcategory: string
  themeId: string
  remainingBudget: number
}

export function ProductGrid({ category, subcategory, themeId, remainingBudget }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const { addProduct, removeProduct, isProductSelected } = useOutfit()

  useEffect(() => {
    const fetchProducts = async () => {
      if (!themeId) return
      
      setLoading(true)
      try {
        const response = await productsAPI.getByTheme(themeId, category, subcategory)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, subcategory, themeId])

  const handleProductSelect = (product: Product) => {
    if (isProductSelected(product._id)) {
      removeProduct(product._id)
    } else {
      addProduct(product)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-muted rounded-t-lg"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found for this category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        const selected = isProductSelected(product._id)
        const canAfford = product.price <= remainingBudget || selected

        return (
          <Card
            key={product._id}
            className={`group cursor-pointer transition-all duration-200 ${
              selected ? 'ring-2 ring-primary' : 'hover:shadow-md'
            } ${!canAfford ? 'opacity-50' : ''}`}
            onClick={() => canAfford && handleProductSelect(product)}
          >
            <CardContent className="p-0">
              <div className="aspect-[4/5] bg-muted rounded-t-lg overflow-hidden relative">
                <img
                  src={product.image || '/placeholder.svg'}
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
                    variant={selected ? 'default' : 'outline'}
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