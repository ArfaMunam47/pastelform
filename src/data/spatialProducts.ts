export interface SpatialColorVariant {
  id: string;
  name: string;
  colorHex: string;
  tintFilter?: string; // CSS filter or blend tone for color simulation
  accentHex: string;
}

export interface ProductHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  description: string;
}

export interface SpatialProduct {
  id: string;
  catalogId: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  dimensions: string;
  weight: string;
  materials: string;
  frame: string;
  designer: string;
  image: string;
  hotspots: ProductHotspot[];
  colors: SpatialColorVariant[];
}

export const SPATIAL_PRODUCTS: SpatialProduct[] = [
  {
    id: 'spatial-ondulation',
    catalogId: 'prod-sofa-ondulation',
    name: 'Ondulation Sky Bouclé Curved Sofa',
    subtitle: 'Sweeping Architectural Contour',
    category: 'Sofas',
    price: 3250,
    dimensions: '242 × 104 × 74 cm',
    weight: '52.0 kg',
    materials: 'Textured Sky Wool Bouclé & Cold-Cured Latex Core',
    frame: 'Continuous Sculpted Hardwood & Solid Steel Base',
    designer: 'Studio København • Denmark',
    image: '/src/assets/isolated/clean_3d_sky_blue_sofa.png',
    colors: [
      { id: 'c-cream', name: 'Oyster Bouclé', colorHex: '#F3EFE9', accentHex: '#8C7B6C' },
      { id: 'c-lavender', name: 'Lavender Dusk', colorHex: '#D4C4E8', accentHex: '#7C60A6', tintFilter: 'hue-rotate(270deg) saturate(1.2)' },
      { id: 'c-sage', name: 'Pistachio Sage', colorHex: '#C5E4D4', accentHex: '#3D8C62', tintFilter: 'hue-rotate(90deg) saturate(1.2)' },
      { id: 'c-sky', name: 'Powder Sky', colorHex: '#BBDDF7', accentHex: '#2574A9', tintFilter: 'hue-rotate(190deg) saturate(1.3)' },
      { id: 'c-amber', name: 'Honey Amber', colorHex: '#F6DF9C', accentHex: '#B2821A', tintFilter: 'hue-rotate(30deg) saturate(1.5)' },
    ],
    hotspots: [
      {
        id: 'hs-contour',
        x: 48,
        y: 35,
        title: 'Continuous Serpentine Silhouette',
        description: 'Engineered without hard rectilinear angles to create an organic landscape for domestic spaces.',
      },
      {
        id: 'hs-velvet',
        x: 34,
        y: 60,
        title: 'Italian Micro-Ribbed Velvet',
        description: 'Woven in Tuscany with plush tactile ridges, natural lanolin soil repellency, and breathable core.',
      },
      {
        id: 'hs-modular',
        x: 65,
        y: 78,
        title: 'Concealed Lock Modular Core',
        description: 'Interlocking steel joinery allows free-flowing curved modules to be repositioned effortlessly.',
      },
    ],
  },
  {
    id: 'spatial-solstice',
    catalogId: 'prod-armchair-solstice',
    name: 'Solstice Mint Whisper Armchair',
    subtitle: 'Organic Fluidity Armchair',
    category: 'Armchairs',
    price: 1340,
    dimensions: '82 × 80 × 74 cm',
    weight: '16.5 kg',
    materials: 'High-Resilience Foam & Pistachio Weave',
    frame: 'Internal Steel Skeleton & Birch Plywood',
    designer: 'Elena Rossi • Copenhagen',
    image: '/src/assets/isolated/isolated_mint_chair.png',
    colors: [
      { id: 'c-mint', name: 'Pistachio Sage', colorHex: '#BDE4D0', accentHex: '#2E8F60' },
      { id: 'c-cream', name: 'Oatmeal Bouclé', colorHex: '#F5EFEB', accentHex: '#8E7B6C', tintFilter: 'grayscale(0.85) brightness(1.1)' },
      { id: 'c-coral', name: 'Blush Velvet', colorHex: '#F6BFC8', accentHex: '#D44A63', tintFilter: 'hue-rotate(240deg) saturate(1.5)' },
      { id: 'c-blue', name: 'Glacier Blue', colorHex: '#BBDDF7', accentHex: '#2574A9', tintFilter: 'hue-rotate(110deg) saturate(1.3)' },
      { id: 'c-amber', name: 'Dijon Mustard', colorHex: '#F6DF9C', accentHex: '#B2821A', tintFilter: 'hue-rotate(310deg) saturate(1.7)' },
    ],
    hotspots: [
      {
        id: 'hs-cushion',
        x: 50,
        y: 42,
        title: 'Dual-Density Cushion',
        description: 'Layered foam core provides sink-in comfort with permanent shape recovery.',
      },
      {
        id: 'hs-weave',
        x: 66,
        y: 60,
        title: 'Textured Weave',
        description: 'Custom textured upholstery woven from sustainable botanical fibers.',
      },
      {
        id: 'hs-glides',
        x: 46,
        y: 86,
        title: 'Acoustic Feet Glides',
        description: 'Felt-dampened glides prevent floor marring while dampening ambient reverberation.',
      },
    ],
  },
  {
    id: 'spatial-breeze',
    catalogId: 'prod-tub-breeze',
    name: 'Breeze Barrel Tub Accent Chair',
    subtitle: 'Circular Barrel Form',
    category: 'Accent Chairs',
    price: 980,
    dimensions: '76 × 74 × 70 cm',
    weight: '12.8 kg',
    materials: 'Powder Sky Bouclé & Natural Latex Core',
    frame: 'Molded Steam-Bent Ash & Powder-Coated Steel',
    designer: 'Studio Kanso • Kyoto',
    image: '/src/assets/isolated/clean_3d_sky_blue_chair.png',
    colors: [
      { id: 'c-blue', name: 'Powder Sky', colorHex: '#BBDDF7', accentHex: '#2574A9' },
      { id: 'c-mint', name: 'Sage Dew', colorHex: '#BDE4D0', accentHex: '#2E8F60', tintFilter: 'hue-rotate(240deg) saturate(1.2)' },
      { id: 'c-coral', name: 'Terracotta Coral', colorHex: '#F6BFC8', accentHex: '#D44A63', tintFilter: 'hue-rotate(130deg) saturate(1.4)' },
      { id: 'c-cream', name: 'Pure Chalk', colorHex: '#F5EFEB', accentHex: '#8E7B6C', tintFilter: 'grayscale(0.9) brightness(1.1)' },
      { id: 'c-amber', name: 'Golden Apricot', colorHex: '#F6DF9C', accentHex: '#B2821A', tintFilter: 'hue-rotate(60deg) saturate(1.6)' },
    ],
    hotspots: [
      {
        id: 'hs-barrel',
        x: 54,
        y: 35,
        title: 'Continuous Barrel Lip',
        description: 'Seamless wraparound embrace crafted without visible structural seams.',
      },
      {
        id: 'hs-seat',
        x: 48,
        y: 62,
        title: 'Latex Seat Core',
        description: 'Breathable organic latex formulation for long-session ergonomic support.',
      },
    ],
  },
  {
    id: 'spatial-kanso',
    catalogId: 'prod-chair-kanso',
    name: 'Kanso Sculptural Accent Chair',
    subtitle: 'Minimalist Dining & Lounge',
    category: 'Dining Chairs',
    price: 680,
    dimensions: '68 × 58 × 80 cm',
    weight: '9.4 kg',
    materials: 'Molded Curved Core & Warm Honey Velvet',
    frame: 'Continuous Bent Plywood & Bronze Finished Legs',
    designer: 'Tatsuo Mori • Tokyo',
    image: '/src/assets/isolated/clean_3d_yellow_chair.png',
    colors: [
      { id: 'c-amber', name: 'Honey Velvet', colorHex: '#F6DF9C', accentHex: '#B2821A' },
      { id: 'c-coral', name: 'Berry Velvet', colorHex: '#F6BFC8', accentHex: '#D44A63', tintFilter: 'hue-rotate(290deg) saturate(1.8)' },
      { id: 'c-mint', name: 'Celadon Sage', colorHex: '#BDE4D0', accentHex: '#2E8F60', tintFilter: 'hue-rotate(70deg) saturate(1.2)' },
      { id: 'c-blue', name: 'Midnight Azure', colorHex: '#BBDDF7', accentHex: '#2574A9', tintFilter: 'hue-rotate(180deg) saturate(1.4)' },
      { id: 'c-cream', name: 'Sand Bouclé', colorHex: '#F5EFEB', accentHex: '#8E7B6C', tintFilter: 'grayscale(0.7) brightness(1.05)' },
    ],
    hotspots: [
      {
        id: 'hs-shell',
        x: 50,
        y: 32,
        title: 'Sculpted Silhouette',
        description: 'Minimalist geometric outline conceived from a single continuous curvilinear plane.',
      },
      {
        id: 'hs-legs',
        x: 56,
        y: 84,
        title: 'Slender Bronze Legs',
        description: 'Tapered aerospace-grade alloy finished with warm brushed bronze anodization.',
      },
    ],
  },
];
