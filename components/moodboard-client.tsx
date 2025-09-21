"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { OutfitVisualizer } from "@/components/outfit-visualizer"
import { MoodboardGrid } from "@/components/moodboard-grid"
import { ArrowLeft, Save, Send, Plus } from "lucide-react"
import Link from "next/link"
import { ImageIcon } from "lucide-react"
import type { Product } from "@/lib/types"

// Mock selected products - in a real app, this would come from state management
const mockSelectedProducts: Product[] = [
  {
    id: "clothing-dresses-0",
    name: "Floral Summer Dress",
    brand: "Zara",
    price: 2499,
    image: "/floral-summer-dress.png",
    category: "clothing",
    subcategory: "Dresses",
    colors: ["Yellow", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["summer", "trendy"],
  },
  {
    id: "shoes-sandals-0",
    name: "Strappy Sandals",
    brand: "Steve Madden",
    price: 1599,
    image: "/strappy-sandals.png",
    category: "shoes",
    subcategory: "Sandals",
    colors: ["Tan", "White"],
    sizes: ["6", "7", "8", "9", "10"],
    tags: ["summer", "casual"],
  },
  {
    id: "accessories-earrings-0",
    name: "Hoop Earrings",
    brand: "Accessorize",
    price: 599,
    image: "/gold-hoop-earrings.png",
    category: "accessories",
    subcategory: "Earrings",
    colors: ["Gold", "Silver"],
    sizes: ["One Size"],
    tags: ["elegant", "versatile"],
  },
]

export function MoodboardClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const themeId = searchParams.get("theme") || "summer-vibes"

  const [outfitTitle, setOutfitTitle] = useState("")
  const [outfitDescription, setOutfitDescription] = useState("")
  const [moodboardImages, setMoodboardImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const theme = {
    id: themeId,
    title: "Summer Vibes",
    description: "Create the perfect summer outfit with bright colors and light fabrics",
  }

  const totalCost = mockSelectedProducts.reduce((sum, product) => sum + product.price, 0)

  const handleAddMoodboardImage = (imageUrl: string) => {
    setMoodboardImages((prev) => [...prev, imageUrl])
  }

  const handleRemoveMoodboardImage = (index: number) => {
    setMoodboardImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveDraft = async () => {
    // Save as draft logic
    console.log("Saving draft...")
  }

  const handleSubmitOutfit = async () => {
    if (!outfitTitle.trim()) {
      alert("Please add a title for your outfit")
      return
    }

    setIsSubmitting(true)
    try {
      // Submit outfit logic
      console.log("Submitting outfit:", {
        title: outfitTitle,
        description: outfitDescription,
        products: mockSelectedProducts,
        moodboardImages,
        themeId,
      })

      // Redirect to voting page after submission
      router.push("/vote?submitted=true")
    } catch (error) {
      console.error("Error submitting outfit:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/create-outfit?theme=${themeId}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Selection
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold">Create Moodboard - {theme.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handleSubmitOutfit} disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Outfit"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Outfit Details Form */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outfit Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="title" className="text-sm font-medium mb-2 block">
                    Outfit Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="Give your outfit a catchy name..."
                    value={outfitTitle}
                    onChange={(e) => setOutfitTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your style inspiration..."
                    value={outfitDescription}
                    onChange={(e) => setOutfitDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Cost:</span>
                    <span className="font-semibold text-primary">₹{totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Items:</span>
                    <span>{mockSelectedProducts.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Products Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSelectedProducts.map((product) => (
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outfit Visualizer & Moodboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Outfit Visualizer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Outfit Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OutfitVisualizer products={mockSelectedProducts} />
              </CardContent>
            </Card>

            {/* Moodboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Inspiration Moodboard</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would open an image picker
                      const sampleImages = [
                        "/summer-fashion-inspiration.jpg",
                        "/bright-colors-outfit.jpg",
                        "/casual-summer-style.jpg",
                      ]
                      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
                      handleAddMoodboardImage(randomImage)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MoodboardGrid
                  images={moodboardImages}
                  onRemoveImage={handleRemoveMoodboardImage}
                  onAddImage={handleAddMoodboardImage}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
