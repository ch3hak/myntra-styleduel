"use client"

import { Button } from "@/components/ui/button"
import { X, Plus, ImageIcon } from "lucide-react"

interface MoodboardGridProps {
  images: string[]
  onRemoveImage: (index: number) => void
  onAddImage: (imageUrl: string) => void
}

export function MoodboardGrid({ images, onRemoveImage, onAddImage }: MoodboardGridProps) {
  const handleAddSampleImage = () => {
    const sampleImages = [
      "/summer-fashion-inspiration.jpg",
      "/bright-colors-outfit-mood.jpg",
      "/casual-summer-style-inspiration.jpg",
      "/floral-pattern-fashion.png",
      "/beach-outfit-inspiration.jpg",
      "/colorful-accessories-mood.jpg",
    ]
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
    onAddImage(randomImage)
  }

  return (
    <div className="space-y-4">
      {images.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Add inspiration images to create your moodboard</p>
          <Button variant="outline" onClick={handleAddSampleImage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Sample Image
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Moodboard image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="destructive" onClick={() => onRemoveImage(index)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add More Button */}
            <button
              onClick={handleAddSampleImage}
              className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors group"
            >
              <div className="text-center">
                <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary mx-auto mb-2" />
                <span className="text-sm text-muted-foreground group-hover:text-primary">Add Image</span>
              </div>
            </button>
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={handleAddSampleImage}>
              <Plus className="mr-2 h-4 w-4" />
              Add More Images
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
