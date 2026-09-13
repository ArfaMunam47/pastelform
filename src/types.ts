export type FurnitureCategory =
  | 'Sofas'
  | 'Armchairs'
  | 'Lounge Chairs'
  | 'Dining Chairs'
  | 'Dining Tables'
  | 'Coffee Tables'
  | 'Side Tables'
  | 'Beds'
  | 'Bedside Tables'
  | 'Desks'
  | 'Office Chairs'
  | 'Bookshelves'
  | 'Cabinets'
  | 'Dressers'
  | 'Benches'
  | 'Ottomans'
  | 'Stools'
  | 'TV Units'
  | 'Outdoor Furniture'
  | 'Lighting'
  | 'Decorative Furniture';

export interface ColorVariant {
  name: string;
  hex: string;
  bgGradient: string; // e.g. "from-[#EBF7F0] to-[#DCF0E5]"
  image: string;
  tagColor?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: FurnitureCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'NEW' | 'LIMITED' | 'TRENDING' | 'ICON' | 'AWARD 2026';
  description: string;
  editorialStory?: string;
  material: 'Bouclé' | 'Velvet' | 'Travertine' | 'Solid Oak' | 'Matte Ceramic' | 'Brushed Brass' | 'Smoked Glass' | 'Saddle Leather';
  dimensions: {
    width: number;
    depth: number;
    height: number;
    seatHeight?: number;
    unit: 'cm' | 'in';
  };
  features: string[];
  colorVariants: ColorVariant[];
  selectedColorIndex?: number;
  images: string[];
  inStock: boolean;
  leadTime?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  editorialSpan?: 'large' | 'tall' | 'normal';
  stageBg?: string;
  accentHex?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorVariant;
  quantity: number;
}

export type LightingAtmosphere = 'daylight' | 'golden' | 'lavender' | 'studio';

export interface FilterOptions {
  category: FurnitureCategory | 'All';
  material: string | 'All';
  color: string | 'All';
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
