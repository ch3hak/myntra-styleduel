export interface Theme {
  id: string
  title: string
  description: string
  rules: string[]
  budget?: number
  requiredColors?: string[]
  requiredItems?: string[]
  rewards: string[]
  status: "active" | "upcoming" | "ended"
  entries: number
  endDate: Date
}

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: "clothing" | "shoes" | "accessories" | "addons"
  subcategory: string
  colors: string[]
  sizes: string[]
  tags: string[]
}

export interface Outfit {
  id: string
  userId: string
  themeId: string
  title: string
  description: string
  products: Product[]
  moodboardImages: string[]
  votes: number
  createdAt: Date
  status: "draft" | "submitted" | "voting" | "completed"
}

export interface User {
  id: string
  name: string
  avatar: string
  points: number
  outfitsCreated: number
  votesGiven: number
  rank: number
}

export interface Vote {
  id: string
  userId: string
  outfitId: string
  createdAt: Date
}
