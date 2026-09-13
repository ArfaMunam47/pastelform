import { Product, FurnitureCategory } from '../types';

export const CATEGORIES_LIST: {
  name: FurnitureCategory;
  shortDesc: string;
  tagline: string;
  count: number;
  pastelBg: string;
  accentHex: string;
}[] = [
  { name: 'Sofas', shortDesc: 'Sculptural modular seating', tagline: 'Curved volumes for expansive comfort', count: 2, pastelBg: 'from-[#F3EDF9] to-[#E3D8F3]', accentHex: '#9B82C8' },
  { name: 'Armchairs', shortDesc: 'Tactile statement loungers', tagline: 'Sculpted contours & plush bouclé', count: 2, pastelBg: 'from-[#EAF5EE] to-[#D5ECE0]', accentHex: '#529E74' },
  { name: 'Lounge Chairs', shortDesc: 'Organic enveloping perches', tagline: 'Architectural relaxation silhouettes', count: 1, pastelBg: 'from-[#EEF5FB] to-[#D9EAF8]', accentHex: '#4E8DC4' },
  { name: 'Dining Chairs', shortDesc: 'Sculptural dining forms', tagline: 'Artful contours around the table', count: 1, pastelBg: 'from-[#FDF7E5] to-[#F9EEC5]', accentHex: '#CCA32E' },
  { name: 'Dining Tables', shortDesc: 'Honed monolith stone', tagline: 'Gathering anchors in Roman travertine', count: 1, pastelBg: 'from-[#EDF5EE] to-[#D8ECE0]', accentHex: '#4A8D63' },
  { name: 'Coffee Tables', shortDesc: 'Organic biomorphic pebbles', tagline: 'Geometric anchors for living spaces', count: 2, pastelBg: 'from-[#EEF5FB] to-[#D9EAF8]', accentHex: '#4E8DC4' },
  { name: 'Side Tables', shortDesc: 'Fluted accent pedestals', tagline: 'Compact architectural companions', count: 1, pastelBg: 'from-[#F4EBF7] to-[#DFD0EB]', accentHex: '#906CB8' },
  { name: 'Cabinets', shortDesc: 'Tambour oak & marble', tagline: 'Architectural fluted storage units', count: 1, pastelBg: 'from-[#EAF3EC] to-[#D4E8DA]', accentHex: '#45855A' },
  { name: 'Desks', shortDesc: 'Cylinder leg writing desks', tagline: 'Calm work surfaces with soft radius', count: 1, pastelBg: 'from-[#FDF0E9] to-[#F9DCD0]', accentHex: '#B26244' },
  { name: 'Beds', shortDesc: 'Floating upholstered frames', tagline: 'Cloud-like rest in muted pastels', count: 1, pastelBg: 'from-[#F7ECF2] to-[#EED6E4]', accentHex: '#9E5B7F' },
  { name: 'Bedside Tables', shortDesc: 'Curved floating nightstands', tagline: 'Soft bedside cylinder drawers', count: 1, pastelBg: 'from-[#F3EDF9] to-[#DFD0EB]', accentHex: '#8C6DAF' },
  { name: 'Bookshelves', shortDesc: 'Arched limestone columns', tagline: 'Open architectural display niches', count: 1, pastelBg: 'from-[#EBF5EF] to-[#D6EDE0]', accentHex: '#42936B' },
  { name: 'Benches', shortDesc: 'Sculptural terracotta perches', tagline: 'Linear cushioned architectural utility', count: 1, pastelBg: 'from-[#FEF0EB] to-[#FCD9CD]', accentHex: '#DC6C43' },
  { name: 'Stools', shortDesc: 'Hourglass ceramic accents', tagline: 'Solid matte cast sculptural seats', count: 1, pastelBg: 'from-[#EDF4FA] to-[#D5E6F5]', accentHex: '#4E7D9E' },
  { name: 'Ottomans', shortDesc: 'Ribbed corduroy donut poufs', tagline: 'Plush movable geometric accents', count: 1, pastelBg: 'from-[#F8EDF3] to-[#EDD7E4]', accentHex: '#9C5B7C' },
  { name: 'Lighting', shortDesc: 'Opaline & brass luminaires', tagline: 'Warm ambiance with satin blown glass', count: 2, pastelBg: 'from-[#FFF7EB] to-[#FEE8CA]', accentHex: '#D48624' }
];

export const PRODUCTS: Product[] = [
  // 1. Hero Spotlight: Ondulation Wave Sofa
  {
    id: 'prod-sofa-ondulation',
    name: 'Ondulation Modular Wave Sofa',
    subtitle: 'Continuous serpentine contours with tactile micro-ribbed velvet',
    category: 'Sofas',
    price: 3680,
    originalPrice: 4100,
    rating: 4.98,
    reviewsCount: 62,
    badge: 'ICON',
    editorialSpan: 'large',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Velvet',
    stageBg: 'bg-[#EDE4F5]',
    accentHex: '#8C6DAF',
    description: 'An expansive landscape of rest. The Ondulation sofa breaks free from rectilinear bounds, presenting continuous fluid topography that welcomes conversation, lounging, and visual serenity.',
    editorialStory: 'Sculpted to eliminate rigid angles, Ondulation behaves as an architectural anchor, casting elongated fluid shadows across soft pastel gallery floors.',
    dimensions: { width: 260, depth: 115, height: 74, seatHeight: 40, unit: 'cm' },
    features: [
      'Engineered continuous serpentine frame without hard corners',
      'Italian micro-ribbed silk velvet with stain-resistant coating',
      'Dual-layer pocket spring core wrapped in organic latex',
      'Interlocking hidden modular brackets'
    ],
    colorVariants: [
      {
        name: 'Lavender Dusk',
        hex: '#CDB9E4',
        bgGradient: 'from-[#F6F0FB] via-[#EFE5F7] to-[#E3D2F1]',
        image: '/src/assets/isolated/wave_sofa.png',
        tagColor: '#634483'
      }
    ],
    images: ['/src/assets/isolated/wave_sofa.png'],
    inStock: true,
    leadTime: 'Crafted on Demand (2-3 Weeks)'
  },

  // 2. Featured Gallery: Aura Bouclé Lounge Chair (Cream bouclé on powder blue backdrop)
  {
    id: 'prod-lounge-aura',
    name: 'Aura Sculptural Bouclé Lounge Chair',
    subtitle: 'Organic enveloping contours in unbleached Italian virgin wool bouclé',
    category: 'Lounge Chairs',
    price: 1420,
    originalPrice: 1600,
    rating: 4.97,
    reviewsCount: 48,
    badge: 'AWARD 2026',
    editorialSpan: 'large',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Bouclé',
    stageBg: 'bg-[#DDE9F4]',
    accentHex: '#527A9E',
    description: 'A monument to tactile comfort. The Aura lounge chair contrasts an unbleached organic virgin wool bouclé against an architectural powder blue stage, highlighting the depth and richness of each looping thread.',
    editorialStory: 'Designed in Copenhagen, Aura creates a cocoon of stillness. The seat angle is calibrated to reduce lumbar tension while preserving an uncluttered floating stance.',
    dimensions: { width: 94, depth: 90, height: 78, seatHeight: 41, unit: 'cm' },
    features: [
      'High-gauge unbleached virgin wool loop bouclé from Biella, Italy',
      'Multi-density cold-cured foam over kiln-dried hardwood armature',
      'Concealed floating glides that protect timber and terrazzo floors',
      'Zero-emission natural latex cushion toppers'
    ],
    colorVariants: [
      {
        name: 'Oat Milk Bouclé',
        hex: '#F4ECE1',
        bgGradient: 'from-[#EEF5FB] via-[#E2EDF7] to-[#D3E4F3]',
        image: '/src/assets/isolated/boucle_lounge_chair.png',
        tagColor: '#3B6488'
      }
    ],
    images: ['/src/assets/isolated/boucle_lounge_chair.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 3. Featured Gallery: Monolith Travertine Dining Table (Stone on soft sage backdrop)
  {
    id: 'prod-table-travertine',
    name: 'Monolith Fluted Travertine Dining Table',
    subtitle: 'Circular honed Roman travertine table with twin cylindrical fluted pedestals',
    category: 'Dining Tables',
    price: 3200,
    originalPrice: 3550,
    rating: 4.95,
    reviewsCount: 38,
    badge: 'LIMITED',
    editorialSpan: 'large',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Travertine',
    stageBg: 'bg-[#E0EBE2]',
    accentHex: '#4E7E5A',
    description: 'Carved from a single quarry block in Tivoli, this dining table anchors the domestic space with ancient geological permanence. Unfilled matte travertine gives tactile authenticity to every touch.',
    editorialStory: 'The fluted pedestal plays with daylight, creating soft vertical linear shadows that shift gently from morning to dusk.',
    dimensions: { width: 140, depth: 140, height: 75, unit: 'cm' },
    features: [
      'Genuine Italian Roman travertine with open-pore matte honed finish',
      'Precision water-jet cut circular top with beveled bullnose edge',
      'Weighted fluted dual-pedestal base engineered for absolute stability',
      'Sealed with organic breathable stone-shield protectant'
    ],
    colorVariants: [
      {
        name: 'Alabaster Travertine',
        hex: '#E9E2D5',
        bgGradient: 'from-[#F1F7F2] via-[#E5EFE7] to-[#D8E6DB]',
        image: '/src/assets/isolated/travertine_dining_table.png',
        tagColor: '#366240'
      }
    ],
    images: ['/src/assets/isolated/travertine_dining_table.png'],
    inStock: true,
    leadTime: 'White-Glove Delivery (7-10 Days)'
  },

  // 4. Featured Gallery: Solstice Mint Armchair (Mint wool on warm peach backdrop)
  {
    id: 'prod-armchair-solstice',
    name: 'Solstice Bouclé Armchair',
    subtitle: 'High-density contoured foam enveloped in mint wool bouclé weave',
    category: 'Armchairs',
    price: 1340,
    originalPrice: 1520,
    rating: 4.96,
    reviewsCount: 84,
    badge: 'ICON',
    editorialSpan: 'normal',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Bouclé',
    stageBg: 'bg-[#F5E2D8]',
    accentHex: '#B8684C',
    description: 'A tactile triumph of organic minimalism. The Solstice armchair envelops the human form with gentle radius curves, enveloped in heavy-gauge virgin wool bouclé that breathes warmth.',
    editorialStory: 'Conceived in Copenhagen as a study of gentle domestic monoliths, Solstice balances weightlessness with architectural permanence.',
    dimensions: { width: 92, depth: 88, height: 76, seatHeight: 42, unit: 'cm' },
    features: [
      'Sculptural multi-density cold-cured polyurethane foam',
      'Solid FSC-certified kiln-dried beech inner frame',
      'Heavy-gauge virgin wool bouclé with 85,000 Martindale rating',
      'Recessed concealed gliding feet for floating presence'
    ],
    colorVariants: [
      {
        name: 'Mint Whisper',
        hex: '#D1E8DA',
        bgGradient: 'from-[#FDF3EE] via-[#F8E5DC] to-[#F1D5C8]',
        image: '/src/assets/isolated/isolated_mint_chair.png',
        tagColor: '#9C4E33'
      }
    ],
    images: ['/src/assets/isolated/isolated_mint_chair.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 5. Signature Collection: Kanso Honey Dining Chair
  {
    id: 'prod-chair-kanso',
    name: 'Kanso Honey Sculptural Dining Chair',
    subtitle: 'Continuously bent architectural backrest with butter-yellow wool cushion',
    category: 'Dining Chairs',
    price: 680,
    originalPrice: 790,
    rating: 4.91,
    reviewsCount: 46,
    badge: 'NEW',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Bouclé',
    stageBg: 'bg-[#E3EAF2]',
    accentHex: '#486888',
    description: 'Designed to elevate dining into an intentional ritual. The Kanso chair pairs an organic semicircular backrest with deep butter-yellow upholstery that warms modern dining spaces.',
    editorialStory: 'Inspired by Japanese joinery and Scandinavian proportion, Kanso brings radiant energy to both light wood and natural stone tables.',
    dimensions: { width: 56, depth: 54, height: 78, seatHeight: 46, unit: 'cm' },
    features: [
      'Bent molded plywood frame with zero visible fasteners',
      'Heavy textured butter bouclé fabric with high stain resilience',
      'Acoustic-dampening felt gliders inset into leg bases'
    ],
    colorVariants: [
      {
        name: 'Honey Yellow',
        hex: '#E6BF5C',
        bgGradient: 'from-[#EFF5FA] via-[#E1ECF4] to-[#D1E1EE]',
        image: '/src/assets/isolated/sculptural_yellow_chair.png',
        tagColor: '#345577'
      }
    ],
    images: ['/src/assets/isolated/sculptural_yellow_chair.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 6. Signature Collection: Nuvola Pebble Coffee Table
  {
    id: 'prod-table-nuvola',
    name: 'Nuvola Pebble Coffee Table',
    subtitle: 'Low organic pebble silhouette in polished powder blue composite stone',
    category: 'Coffee Tables',
    price: 1150,
    originalPrice: 1290,
    rating: 4.93,
    reviewsCount: 39,
    badge: 'TRENDING',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Matte Ceramic',
    stageBg: 'bg-[#F6E9DF]',
    accentHex: '#A66B4C',
    description: 'A soothing low-slung table shaped by organic tidal geometries. Its matte powder-blue surface repels liquids while feeling soft and velvety to the hand.',
    editorialStory: 'Nuvola sits low to the ground to keep sightlines open and allow natural daylight to flood living rooms unobstructed.',
    dimensions: { width: 120, depth: 82, height: 34, unit: 'cm' },
    features: [
      'Reinforced natural mineral composite with satin matte topcoat',
      'Heat resistant up to 180°C and impervious to water staining',
      'Rounded organic edge profile designed for safety in dynamic homes'
    ],
    colorVariants: [
      {
        name: 'Powder Sky',
        hex: '#B5CFE3',
        bgGradient: 'from-[#FDF4EE] via-[#F8EAE0] to-[#EED9CC]',
        image: '/src/assets/isolated/blue_coffee_table.png',
        tagColor: '#8C4F32'
      }
    ],
    images: ['/src/assets/isolated/blue_coffee_table.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 7. Signature Collection: Arcadia Terracotta Arch Bench
  {
    id: 'prod-bench-arcadia',
    name: 'Arcadia Terracotta Arch Bench',
    subtitle: 'Dual arch plinth bench with warm terracotta velvet upholstery',
    category: 'Benches',
    price: 920,
    originalPrice: 1040,
    rating: 4.94,
    reviewsCount: 29,
    badge: 'LIMITED',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Velvet',
    stageBg: 'bg-[#E2EEE6]',
    accentHex: '#4E8863',
    description: 'A versatile architectural perch. The Arcadia bench features two robust arch plinths supporting an elongated cushioned beam upholstered in terracotta velvet.',
    editorialStory: 'Equally at home in a grand entryway, at the foot of an architectural platform bed, or alongside an oversized art gallery wall.',
    dimensions: { width: 150, depth: 44, height: 46, seatHeight: 46, unit: 'cm' },
    features: [
      'Dual structural arch supports wrapped in seamless acoustic felt',
      'High-resilience foam core with supportive memory layer',
      'Subtle brushed brass detail along underside junction'
    ],
    colorVariants: [
      {
        name: 'Terracotta Coral',
        hex: '#D77556',
        bgGradient: 'from-[#F0F7F2] via-[#E4EFE7] to-[#D5E6DA]',
        image: '/src/assets/isolated/isolated_coral_bench.png',
        tagColor: '#366847'
      }
    ],
    images: ['/src/assets/isolated/isolated_coral_bench.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 8. Signature Collection: Lumina Frosted Mushroom Lamp
  {
    id: 'prod-lamp-lumina',
    name: 'Lumina Frosted Mushroom Lamp',
    subtitle: 'Mouth-blown opaline glass dome in soft peach amber with dimmable LED core',
    category: 'Lighting',
    price: 460,
    originalPrice: 520,
    rating: 4.99,
    reviewsCount: 112,
    badge: 'ICON',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Smoked Glass',
    stageBg: 'bg-[#E8E1F3]',
    accentHex: '#7C60A6',
    description: 'An atmospheric glowing orb. Lumina casts a flattering 2200K sunset amber glow through hand-etched frosted opaline glass, transforming rooms into serene sanctuaries.',
    editorialStory: 'Every Lumina glass shade is hand-blown by master glassworkers in Murano, Italy, ensuring micro-variations that make each totem unique.',
    dimensions: { width: 32, depth: 32, height: 38, unit: 'cm' },
    features: [
      'Tri-step touch dimmer embedded into brushed champagne base',
      'Ultra-warm 2200K - 2700K circadian LED module included',
      'Braided biscuit textile power cord with gold plug'
    ],
    colorVariants: [
      {
        name: 'Peach Amber',
        hex: '#F7C6A5',
        bgGradient: 'from-[#F4F0FA] via-[#ECE3F4] to-[#DFD0ED]',
        image: '/src/assets/isolated/isolated_sculpt_lamp.png',
        tagColor: '#5E4384'
      }
    ],
    images: ['/src/assets/isolated/isolated_sculpt_lamp.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 9. Signature Collection: Calypso Fluted Pedestal Side Table
  {
    id: 'prod-table-calypso',
    name: 'Calypso Fluted Pedestal Side Table',
    subtitle: 'Monolithic fluted column in soft lilac matte ceramic with satin glaze',
    category: 'Side Tables',
    price: 540,
    originalPrice: 620,
    rating: 4.88,
    reviewsCount: 31,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Matte Ceramic',
    stageBg: 'bg-[#F5EDE0]',
    accentHex: '#9E7745',
    description: 'A compact architectural accent. The Calypso side table features tight fluted vertical striations and a softly recessed circular top designed to cradle books and ceramics.',
    editorialStory: 'Its sculptural footprint acts as an art object whether positioned beside an armchair or holding ambient lighting in a cozy reading nook.',
    dimensions: { width: 38, depth: 38, height: 50, unit: 'cm' },
    features: [
      'High-fired architectural stoneware ceramic',
      'Satin eggshell glaze resistant to beverage rings and heat',
      'Weighted base prevents tipping even on plush rugs'
    ],
    colorVariants: [
      {
        name: 'Lilac Mist',
        hex: '#CDBBE2',
        bgGradient: 'from-[#FAF4EC] via-[#F4E9DB] to-[#E9D9C7]',
        image: '/src/assets/isolated/isolated_pedestal_table.png',
        tagColor: '#7A5728'
      }
    ],
    images: ['/src/assets/isolated/isolated_pedestal_table.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 10. Signature Collection: Aethelgard Platform Bed
  {
    id: 'prod-bed-aethelgard',
    name: 'Aethelgard Curved Platform Bed',
    subtitle: 'Low-slung rounded headboard upholstered in tactile sage green velvet',
    category: 'Beds',
    price: 2890,
    originalPrice: 3200,
    rating: 4.96,
    reviewsCount: 24,
    badge: 'LIMITED',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Velvet',
    stageBg: 'bg-[#F2E5EC]',
    accentHex: '#9A5B78',
    description: 'A haven of acoustic calm. Aethelgard surrounds the sleeping surface in continuous radiused upholstered bolsters, turning bedtime into an effortless sanctuary.',
    editorialStory: 'Engineered with integrated European beech sprung slats that adapt dynamically to body movement for restorative spinal alignment.',
    dimensions: { width: 210, depth: 228, height: 88, unit: 'cm' },
    features: [
      'Upholstered wraparound perimeter headboard that eliminates wall scuffs',
      'Solid FSC ash internal substructure rated to 500kg',
      'Acoustic-dampening internal felt dampeners prevent all squeaks'
    ],
    colorVariants: [
      {
        name: 'Sage Olive',
        hex: '#A7C4B2',
        bgGradient: 'from-[#FAF0F5] via-[#F4E3EC] to-[#E9CEE0]',
        image: '/src/assets/isolated/isolated_sculptural_bed.png',
        tagColor: '#783A58'
      }
    ],
    images: ['/src/assets/isolated/isolated_sculptural_bed.png'],
    inStock: true,
    leadTime: 'Crafted on Demand (2-3 Weeks)'
  },

  // 11. New Arrivals: Zephyr Pistachio Sectional Sofa
  {
    id: 'prod-sectional-zephyr',
    name: 'Zephyr Low Modular Sectional',
    subtitle: 'Deep lounge seating with low-profile cushions in pistachio mint velvet',
    category: 'Sofas',
    price: 4200,
    originalPrice: 4700,
    rating: 4.98,
    reviewsCount: 19,
    badge: 'NEW',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    material: 'Velvet',
    stageBg: 'bg-[#EFE8DC]',
    accentHex: '#8C7449',
    description: 'The pinnacle of relaxed modern living. Zephyr features an extra-deep seat profile and cloud-soft multi-density fill enveloped in pistachio matte velvet.',
    editorialStory: 'New for Summer 2026, Zephyr brings an unhurried Mediterranean pace into contemporary urban homes with its generous modular layout.',
    dimensions: { width: 280, depth: 125, height: 70, seatHeight: 38, unit: 'cm' },
    features: [
      'Hypoallergenic feather-free vegan down topper over bio-poly foam',
      'Modular configuration allows left or right facing layout flexibility',
      'Concealed heavy-duty alligator clips for zero section drift'
    ],
    colorVariants: [
      {
        name: 'Pistachio Mint',
        hex: '#B8D5C2',
        bgGradient: 'from-[#FAF5EC] via-[#F3EADE] to-[#E7DBCB]',
        image: '/src/assets/isolated/pistachio_sectional_sofa.png',
        tagColor: '#6B542E'
      }
    ],
    images: ['/src/assets/isolated/pistachio_sectional_sofa.png'],
    inStock: true,
    leadTime: 'New Release (Delivery in 2 Weeks)'
  },

  // 12. New Arrivals: Breeze Powder Blue Tub Chair
  {
    id: 'prod-tub-breeze',
    name: 'Breeze Barrel Tub Accent Chair',
    subtitle: 'Curved barrel silhouette with pillowed geometry in powder blue textured wool',
    category: 'Armchairs',
    price: 980,
    originalPrice: 1120,
    rating: 4.92,
    reviewsCount: 15,
    badge: 'NEW',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    material: 'Bouclé',
    stageBg: 'bg-[#F7E6DC]',
    accentHex: '#B26244',
    description: 'A striking barrel silhouette that wraps the sitter in seamless tactile comfort. Its powder blue virgin wool contrasts beautifully with warm coral and peach interior surfaces.',
    editorialStory: 'Crafted with a 360-degree swivel mechanism concealed beneath a tailored perimeter skirt for effortless spatial connection.',
    dimensions: { width: 84, depth: 82, height: 74, seatHeight: 42, unit: 'cm' },
    features: [
      'Smooth silent 360-degree precision steel ball-bearing swivel',
      'Custom virgin wool blend with high rub count and pill resistance',
      'Sculpted lumbar curve designed for prolonged reading comfort'
    ],
    colorVariants: [
      {
        name: 'Powder Blue',
        hex: '#A8C3DC',
        bgGradient: 'from-[#FDF3ED] via-[#F8E5DB] to-[#F0D3C4]',
        image: '/src/assets/isolated/powder_blue_tub_chair.png',
        tagColor: '#8C4428'
      }
    ],
    images: ['/src/assets/isolated/powder_blue_tub_chair.png'],
    inStock: true,
    leadTime: 'New Release (Express 3-5 Days)'
  },

  // 13. Editorial Showcase: Venezia Fluted Tambour Credenza
  {
    id: 'prod-credenza-venezia',
    name: 'Venezia Fluted Tambour Credenza',
    subtitle: 'Low architectural sideboard in pale natural ash with peach travertine stone top',
    category: 'Cabinets',
    price: 2450,
    originalPrice: 2780,
    rating: 4.95,
    reviewsCount: 22,
    badge: 'AWARD 2026',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Solid Oak',
    stageBg: 'bg-[#E3EBE4]',
    accentHex: '#527B5A',
    description: 'An architectural statement piece. Venezia conceals media and audio components behind sliding tambour doors crafted from solid European ash wood, crowned with a peach travertine slab.',
    editorialStory: 'Venezia demonstrates how functional storage can become a primary sculpture. Cable pass-throughs and acoustic slots keep technology invisible.',
    dimensions: { width: 190, depth: 48, height: 64, unit: 'cm' },
    features: [
      'Solid FSC ash wood tambour slats that slide along custom milled tracks',
      'Solid 20mm honed peach travertine marble top with natural vein variation',
      'Concealed rear cable management ports and soft-close internal drawers'
    ],
    colorVariants: [
      {
        name: 'Natural Ash & Peach Stone',
        hex: '#D6BEA6',
        bgGradient: 'from-[#EFF5F0] via-[#E4ECE5] to-[#D5E1D7]',
        image: '/src/assets/isolated/fluted_credenza.png',
        tagColor: '#3B6043'
      }
    ],
    images: ['/src/assets/isolated/fluted_credenza.png'],
    inStock: true,
    leadTime: 'White-Glove Delivery (7-10 Days)'
  },

  // 14. Best Sellers: Astral Opaline Disc Brass Floor Lamp
  {
    id: 'prod-lamp-astral',
    name: 'Astral Minimalist Disc Floor Lamp',
    subtitle: 'Matte opaline glowing orb atop slender satin brass stem with pale lilac stone base',
    category: 'Lighting',
    price: 780,
    originalPrice: 890,
    rating: 4.97,
    reviewsCount: 77,
    badge: 'ICON',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    material: 'Brushed Brass',
    stageBg: 'bg-[#EDE4F3]',
    accentHex: '#7F5E9E',
    description: 'A luminous celestial marker. The Astral floor lamp stands like a quiet sentinel, diffusing glare-free omnidirectional light through a double-cased opaline glass globe.',
    editorialStory: 'Its heavy circular stone plinth ensures remarkable stability with a footprint of just 26 centimeters.',
    dimensions: { width: 34, depth: 34, height: 165, unit: 'cm' },
    features: [
      'Hand-finished satin brass stem with micro-oxidation sealant',
      'Integrated foot pedal with continuous smooth dimming curve',
      'Solid honed lilac marble base with felt-lined underside'
    ],
    colorVariants: [
      {
        name: 'Satin Brass & Opaline',
        hex: '#D9C89E',
        bgGradient: 'from-[#F5EFF8] via-[#EDE1F2] to-[#DFCDE7]',
        image: '/src/assets/isolated/minimal_floor_lamp.png',
        tagColor: '#634382'
      }
    ],
    images: ['/src/assets/isolated/minimal_floor_lamp.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 15. Best Sellers: Terra Sculptural Hourglass Stool
  {
    id: 'prod-stool-terra',
    name: 'Terra Sculptural Hourglass Stool',
    subtitle: 'Cast stoneware accent stool in matte terracotta peach ceramic glaze',
    category: 'Stools',
    price: 340,
    originalPrice: 390,
    rating: 4.89,
    reviewsCount: 58,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    material: 'Matte Ceramic',
    stageBg: 'bg-[#DFECF5]',
    accentHex: '#487292',
    description: 'A pure geometric hourglass that functions as occasional seating, drink perch, or bedside companion. Its velvety matte glaze offers warm tactile resonance.',
    editorialStory: 'Cast in limited batches in Portugal using local terracotta clay and fired in solar-assisted kilns.',
    dimensions: { width: 34, depth: 34, height: 44, seatHeight: 44, unit: 'cm' },
    features: [
      'High-durability stoneware safe for indoor and covered outdoor use',
      'Balanced center of gravity prevents tipping',
      'Integrated finger grooves beneath rim for effortless moving'
    ],
    colorVariants: [
      {
        name: 'Matte Terracotta',
        hex: '#C86B4D',
        bgGradient: 'from-[#EFF5FA] via-[#E1EDF5] to-[#D0E2EE]',
        image: '/src/assets/isolated/terracotta_accent_stool.png',
        tagColor: '#325875'
      }
    ],
    images: ['/src/assets/isolated/terracotta_accent_stool.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 16. Best Sellers: Sorella Curved Floating Nightstand
  {
    id: 'prod-nightstand-sorella',
    name: 'Sorella Curved Floating Nightstand',
    subtitle: 'Warm cream lacquer cylindrical bedside table with inset lilac marble top',
    category: 'Bedside Tables',
    price: 490,
    originalPrice: 560,
    rating: 4.93,
    reviewsCount: 34,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    material: 'Matte Ceramic',
    stageBg: 'bg-[#E5E0F2]',
    accentHex: '#71589C',
    description: 'Subtle bedside elegance. Sorella eliminates sharp corners in the bedroom with its cylindrical lacquer casing and recessed soft-close curved drawer.',
    editorialStory: 'The inset lilac stone top provides an impervious surface for water carafes, evening reading lamps, and personal jewelry.',
    dimensions: { width: 44, depth: 44, height: 48, unit: 'cm' },
    features: [
      'Seamless curved birch plywood shell with multi-coat matte lacquer',
      'Concealed soft-close undermount drawer slides with velvet lining',
      'Pre-drilled hidden wireless charger channel under top marble disc'
    ],
    colorVariants: [
      {
        name: 'Cream & Lilac Marble',
        hex: '#EADBCE',
        bgGradient: 'from-[#F3F0FA] via-[#EAE3F4] to-[#DDD2ED]',
        image: '/src/assets/isolated/curved_nightstand.png',
        tagColor: '#533D7C'
      }
    ],
    images: ['/src/assets/isolated/curved_nightstand.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 17. Furniture by Material: Atelier Fluted Writing Desk
  {
    id: 'prod-desk-atelier',
    name: 'Atelier Fluted Cylinder Writing Desk',
    subtitle: 'Architectural writing desk in soft sage matte lacquer with dual fluted column legs',
    category: 'Desks',
    price: 1850,
    originalPrice: 2100,
    rating: 4.94,
    reviewsCount: 21,
    badge: 'TRENDING',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Solid Oak',
    stageBg: 'bg-[#F7EAE3]',
    accentHex: '#A36850',
    description: 'A tranquil workspace anchor. The Atelier desk replaces industrial office severity with rounded contours and soft sage green matte lacquer that fosters creative focus.',
    editorialStory: 'Designed for modern remote work without looking like office equipment. Integrated leather cable trough keeps cords out of sight.',
    dimensions: { width: 140, depth: 68, height: 75, unit: 'cm' },
    features: [
      'Anti-fingerprint matte polyurethane finish over solid ash structure',
      'Dual cylindrical fluted legs conceal internal cable routing',
      'Low-profile integrated central drawer lined in saddle leather'
    ],
    colorVariants: [
      {
        name: 'Sage Matte Lacquer',
        hex: '#B2C4B7',
        bgGradient: 'from-[#FCF4F0] via-[#F7E7DF] to-[#EED6CB]',
        image: '/src/assets/isolated/minimal_curved_desk.png',
        tagColor: '#844D37'
      }
    ],
    images: ['/src/assets/isolated/minimal_curved_desk.png'],
    inStock: true,
    leadTime: 'Crafted on Demand (2 Weeks)'
  },

  // 18. Furniture by Material: Column Arched Display Bookcase
  {
    id: 'prod-shelf-column',
    name: 'Column Arched Display Bookcase',
    subtitle: 'Monolithic open arch shelving unit in smooth warm oat limestone finish',
    category: 'Bookshelves',
    price: 2100,
    originalPrice: 2350,
    rating: 4.96,
    reviewsCount: 18,
    badge: 'AWARD 2026',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Travertine',
    stageBg: 'bg-[#DFEAE2]',
    accentHex: '#517C5B',
    description: 'An architectural sanctuary for literature and art. The Column bookcase features five soft-curved tiered shelves framed by a majestic monolithic arch.',
    editorialStory: 'Its stone-like texture creates an authentic gallery backdrop, casting soft gradient shadows across art monographs and sculptural ceramic vessels.',
    dimensions: { width: 110, depth: 38, height: 195, unit: 'cm' },
    features: [
      'Engineered limestone composite with lightweight cellular core',
      'Each shelf load-tested to 45kg without visible deflection',
      'Includes concealed structural wall anchoring brackets for earthquake safety'
    ],
    colorVariants: [
      {
        name: 'Oat Limestone',
        hex: '#DDD2C3',
        bgGradient: 'from-[#EFF5F1] via-[#E3EDE6] to-[#D4E3D8]',
        image: '/src/assets/isolated/sculptural_arch_shelf.png',
        tagColor: '#3A6343'
      }
    ],
    images: ['/src/assets/isolated/sculptural_arch_shelf.png'],
    inStock: true,
    leadTime: 'White-Glove Delivery (7-10 Days)'
  },

  // 19. Curated Collections: Paloma Biomorphic Pebble Coffee Table
  {
    id: 'prod-table-paloma',
    name: 'Paloma Biomorphic Pebble Coffee Table',
    subtitle: 'Low organic pebble silhouette in matte lavender composite stone',
    category: 'Coffee Tables',
    price: 1280,
    originalPrice: 1450,
    rating: 4.92,
    reviewsCount: 26,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    material: 'Matte Ceramic',
    stageBg: 'bg-[#F6F0DF]',
    accentHex: '#8F7B3E',
    description: 'A sculptural conversation island. Paloma celebrates the asymmetrical beauty of river stones smoothed by millennial waters, rendered in soft lavender composite stone.',
    editorialStory: 'Its organic flowing perimeter allows fluid pathways in the living room, eliminating bruised shins and rigid rectilinear traffic patterns.',
    dimensions: { width: 130, depth: 76, height: 35, unit: 'cm' },
    features: [
      'Seamless monolithic cast stone with velvety hand-rubbed finish',
      'Stain-proof ceramic seal protects against red wine, espresso, and citrus',
      'Sculpted triple boulder leg configuration for absolute ground contact'
    ],
    colorVariants: [
      {
        name: 'Lilac Stone',
        hex: '#C6B5DA',
        bgGradient: 'from-[#FAF6EC] via-[#F4EDE0] to-[#E9DFCE]',
        image: '/src/assets/isolated/biomorphic_coffee_table_1789240321765.png',
        tagColor: '#6B5A27'
      }
    ],
    images: ['/src/assets/isolated/biomorphic_coffee_table_1789240321765.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  },

  // 20. Final Showcase: Cirrus Ribbed Corduroy Donut Pouf
  {
    id: 'prod-pouf-cirrus',
    name: 'Cirrus Ribbed Corduroy Donut Pouf',
    subtitle: 'Oversized rounded donut puff ottoman in soft dusty blue ribbed velvet',
    category: 'Ottomans',
    price: 380,
    originalPrice: 440,
    rating: 4.91,
    reviewsCount: 42,
    badge: 'NEW',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    material: 'Velvet',
    stageBg: 'bg-[#F6E6ED]',
    accentHex: '#9E5B7A',
    description: 'A playful sculptural cloud. The Cirrus pouf invites impromptu perching or resting tired feet atop its wide-wale ribbed velvet donut contour.',
    editorialStory: 'Light enough to carry effortlessly between the living room and the study, yet dense and supportive with its dual-density core.',
    dimensions: { width: 62, depth: 62, height: 42, seatHeight: 42, unit: 'cm' },
    features: [
      'High-grade wide-wale cotton corduroy velvet with soil shield',
      'Removable dry-cleanable zippered outer cover',
      'Anti-slip silicone micro-dot pattern along base perimeter'
    ],
    colorVariants: [
      {
        name: 'Dusty Sky Blue',
        hex: '#96B2C8',
        bgGradient: 'from-[#FAF0F4] via-[#F4E3EC] to-[#EACFDE]',
        image: '/src/assets/isolated/dusty_blue_pouf.png',
        tagColor: '#7C3C5B'
      }
    ],
    images: ['/src/assets/isolated/dusty_blue_pouf.png'],
    inStock: true,
    leadTime: 'In Stock (Express 3-5 Days)'
  }
];
