export interface Theme {
  _id: string
  id: string
  title: string
  description: string
  rules: string[]
  budget: number
  requiredColors?: string[]
  rewards: string[]
  status: 'active' | 'upcoming' | 'ended'
  entries: number
  endDate: Date
  image?: string
}

export interface Product {
  _id: string
  name: string
  brand: string
  price: number
  image: string
  category: 'clothing' | 'shoes' | 'accessories' | 'addons'
  subcategory: string
  colors: string[]
  sizes: string[]
  tags: string[]
  themes: string[]
}

export interface Outfit {
  _id: string
  userId: {
    _id: string
    name: string
    avatar?: string
  }
  themeId: string
  title: string
  description: string
  products: Product[]
  moodboardImages: string[]
  votes: number
  createdAt: Date
  status: 'draft' | 'submitted' | 'voting' | 'completed'
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