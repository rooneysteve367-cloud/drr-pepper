export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'classic' | 'zero' | 'cherry' | 'cream' | 'limited';
  calories: number;
  flavorNotes: string[];
  rating: number;
  image: string;
  accentColor: string; // Tailwind class like text-red-500
  buttonColor: string; // Tailwind class
  bgGradient: string; // Tailwind gradient starting and ending colors
  nutritionInfo: {
    totalFat: string;
    sodium: string;
    totalCarb: string;
    sugars: string;
    protein: string;
  };
  purchaseLinks: {
    retailer: string;
    url: string;
  }[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Cocktail' | 'Mocktail' | 'Dessert' | 'Float';
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Creative';
  ingredients: string[];
  instructions: string[];
  prepTips?: string;
  shareCount: number;
  rating: number;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  badge: string;
  image?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
  coordinates: { lat: number; lng: number };
  features: string[];
  stock: string[]; // Product IDs in stock
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  verified: boolean;
  variationPurchased: string;
}

export interface FlavorQuizQuestion {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: Record<string, number>; // maps product categories or specific IDs to points
  }[];
}
