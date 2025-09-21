import React, { useState, createContext, useContext } from 'react'
import type { Product } from './types'

interface OutfitState {
  selectedProducts: Product[]
  themeId: string
  totalCost: number
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  clearProducts: () => void
  setTheme: (themeId: string) => void
  isProductSelected: (productId: string) => boolean
}

const OutfitContext = createContext<OutfitState | null>(null)

export function useOutfit() {
  const context = useContext(OutfitContext)
  if (!context) {
    throw new Error('useOutfit must be used within an OutfitProvider')
  }
  return context
}

export function OutfitProvider({ children }: { children: React.ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [themeId, setThemeId] = useState('')

  const totalCost = selectedProducts.reduce((sum, product) => sum + product.price, 0)

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p._id === product._id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== productId))
  }

  const clearProducts = () => {
    setSelectedProducts([])
  }

  const setTheme = (newThemeId: string) => {
    setThemeId(newThemeId)
    clearProducts()
  }

  const isProductSelected = (productId: string) => {
    return selectedProducts.some((p) => p._id === productId)
  }

  return (
    <OutfitContext.Provider
      value={{
        selectedProducts,
        themeId,
        totalCost,
        addProduct,
        removeProduct,
        clearProducts,
        setTheme,
        isProductSelected,
      }}
    >
      {children}
    </OutfitContext.Provider>
  )
}