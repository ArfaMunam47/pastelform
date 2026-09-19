export interface HeroChairItem {
  id: string;
  indexStr: string;
  number: number;
  name: string;
  category: string;
  materials: string;
  price: number;
  image: string;
  // Sizing of chair inside circle
  normalizedWidth: string;
  // Micro optical vertical alignment in pixels
  yOffsetPx: number;
  enterTransition: { x: number; y: number };
  exitTransition: { x: number; y: number };
  // The Hero Box Palette (where chair color matches the box color like in reference 35686.png)
  boxBg: string;
  boxBorder: string;
  shapeBg: string;
  shapeBorder: string;
  circleGradient: string;
  ambientGlowColor: string;
  accentColor: string;
  tagColor: string;
  pillBg: string;
  thumbnailBg: string;
  flavorLabel: string;
}

export const HERO_CHAIRS: HeroChairItem[] = [
  {
    id: 'prod-lounge-aura',
    indexStr: '01',
    number: 1,
    name: 'Aura Armchair',
    category: 'Lounge Chairs',
    materials: 'Sculpted Foam & Rose Bouclé Velvet',
    price: 1420,
    image: '/src/assets/isolated/clean_3d_coral_chair.png',
    normalizedWidth: 'w-[84%]',
    yOffsetPx: 0,
    enterTransition: { x: -28, y: 0 },
    exitTransition: { x: 28, y: 0 },
    // Rich strawberry rose / coral box
    boxBg: '#FCECEE',
    boxBorder: 'rgba(215, 60, 85, 0.22)',
    shapeBg: '#8B182C', // Richer contrasting berry container
    shapeBorder: 'rgba(255, 255, 255, 0.20)',
    circleGradient: 'radial-gradient(circle at 36% 30%, #FFF5F7 0%, #FCC4D0 42%, #F38C9E 100%)',
    ambientGlowColor: 'rgba(244, 166, 179, 0.50)',
    accentColor: '#BA2F48',
    tagColor: '#D94B64',
    pillBg: '#FDF0F2',
    thumbnailBg: '#FCE2E6',
    flavorLabel: 'Berry Coral',
  },
  {
    id: 'prod-armchair-solstice',
    indexStr: '02',
    number: 2,
    name: 'Solstice Mint Whisper Armchair',
    category: 'Armchairs',
    materials: 'Cold-Cured Foam & Pistachio Weave',
    price: 1340,
    image: '/src/assets/isolated/isolated_mint_chair.png',
    normalizedWidth: 'w-[80%]',
    yOffsetPx: -4,
    enterTransition: { x: 0, y: 26 },
    exitTransition: { x: 0, y: -26 },
    // Rich pastel mint box
    boxBg: '#E7F7EF',
    boxBorder: 'rgba(45, 140, 95, 0.22)',
    shapeBg: '#114B32', // Richer deep forest jade container
    shapeBorder: 'rgba(255, 255, 255, 0.20)',
    circleGradient: 'radial-gradient(circle at 36% 30%, #F2FAF6 0%, #C4EDDA 42%, #9CD8B7 100%)',
    ambientGlowColor: 'rgba(212, 239, 227, 0.50)',
    accentColor: '#25704A',
    tagColor: '#389667',
    pillBg: '#EAF7F0',
    thumbnailBg: '#DCF0E5',
    flavorLabel: 'Pistachio Sage',
  },
  {
    id: 'prod-sofa-ondulation',
    indexStr: '03',
    number: 3,
    name: 'Ondulation Sky Bouclé Curved Sofa',
    category: 'Sofas',
    materials: 'Curved Wood Core & Powder Sky Wool Bouclé',
    price: 3250,
    image: '/src/assets/isolated/clean_3d_sky_blue_sofa.png',
    normalizedWidth: 'w-[94%]',
    yOffsetPx: 0,
    enterTransition: { x: -20, y: -18 },
    exitTransition: { x: 20, y: 18 },
    // Rich pastel powder sky blue box
    boxBg: '#E7F2FC',
    boxBorder: 'rgba(50, 120, 190, 0.22)',
    shapeBg: '#123461', // Richer royal indigo container
    shapeBorder: 'rgba(255, 255, 255, 0.20)',
    circleGradient: 'radial-gradient(circle at 36% 30%, #F2F8FE 0%, #C4E2F9 42%, #9BCBF4 100%)',
    ambientGlowColor: 'rgba(215, 236, 251, 0.50)',
    accentColor: '#205E8E',
    tagColor: '#357DB8',
    pillBg: '#ECF5FC',
    thumbnailBg: '#DFEFFB',
    flavorLabel: 'Powder Sky',
  },
  {
    id: 'prod-chair-kanso',
    indexStr: '04',
    number: 4,
    name: 'Kanso Sculptural Accent Chair',
    category: 'Dining Chairs',
    materials: 'Molded Curved Core & Warm Honey Velvet',
    price: 680,
    image: '/src/assets/isolated/clean_3d_yellow_chair.png', // Clean 3D chair with no cutouts!
    normalizedWidth: 'w-[78%]',
    yOffsetPx: 2,
    enterTransition: { x: 28, y: 0 },
    exitTransition: { x: -28, y: 0 },
    // Rich pastel warm butter honey box
    boxBg: '#FCF6E0',
    boxBorder: 'rgba(200, 145, 25, 0.24)',
    shapeBg: '#7A430B', // Richer warm toasted bronze container
    shapeBorder: 'rgba(255, 255, 255, 0.20)',
    circleGradient: 'radial-gradient(circle at 36% 30%, #FEFAF0 0%, #F9E3B1 42%, #E9C472 100%)',
    ambientGlowColor: 'rgba(248, 235, 202, 0.50)',
    accentColor: '#845C0B',
    tagColor: '#AF7F19',
    pillBg: '#FBF5E6',
    thumbnailBg: '#F6EAC9',
    flavorLabel: 'Honey Mango',
  },
];
