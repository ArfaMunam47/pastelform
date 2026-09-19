import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  RotateCw, 
  Sun, 
  Ruler, 
  Download, 
  Layers, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  ChevronRight,
  Sliders,
  Eye,
  Info,
  Compass,
  Palette,
  Camera,
  Grid
} from 'lucide-react';
import { Product, ColorVariant } from '../types';

interface Studio3DShowcaseProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: ColorVariant, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export interface StudioPiece {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
  material: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    seatHeight?: number;
    unit: string;
  };
  details: {
    construction: string;
    finish: string;
    rubCount: string;
    weight: string;
    warranty: string;
  };
  colorways: {
    name: string;
    hex: string;
    category: 'Neutral' | 'Pastel';
    description: string;
    stageBg: string;
  }[];
}

const STUDIO_PIECES: StudioPiece[] = [
  {
    id: 'studio-solis-lounge-chair',
    name: 'Aura Armchair',
    subtitle: 'Modeled 3D Hero Lounge Chair in Rose Velvet & Ergonomic Core',
    category: 'Lounge Chairs',
    price: 1420,
    image: '/src/assets/isolated/clean_3d_coral_chair.png',
    material: 'Rose Sculptural Velvet & Cold-Cured Core',
    dimensions: {
      width: 92,
      depth: 86,
      height: 78,
      seatHeight: 42,
      unit: 'cm'
    },
    details: {
      construction: 'FSC Certified Solid Quarter-Sawn Subframe & Ergonomic Enveloping Shell',
      finish: 'Natural Matte Hardwax Oil Base with Fine Double French Seams',
      rubCount: '95,000 Martindale (High Durability Commercial Grade)',
      weight: '28 kg',
      warranty: '10-Year Architectural Frame Warranty'
    },
    colorways: [
      { name: 'Warm Ivory & Cream', hex: '#F7F4EE', category: 'Neutral', description: 'Unbleached natural alpaca bouclé weave with visible tactile fibers', stageBg: 'bg-[#EDE7DC]' },
      { name: 'Soft Sand & Oat', hex: '#EADCC9', category: 'Neutral', description: 'Subtle warm earthy neutral reminiscent of Nordic dunes', stageBg: 'bg-[#EADCC9]' },
      { name: 'Pale Sage & Mint', hex: '#D7EAE0', category: 'Pastel', description: 'Soft desaturated herbal wash with calming undertones', stageBg: 'bg-[#D7EAE0]' },
      { name: 'Muted Lavender', hex: '#E6DEF2', category: 'Pastel', description: 'Quiet dusk hue with warm mineral undertones', stageBg: 'bg-[#E6DEF2]' },
      { name: 'Dusty Blush', hex: '#F3DDD2', category: 'Pastel', description: 'Delicate terracotta petal tone with low saturation', stageBg: 'bg-[#F3DDD2]' },
      { name: 'Powder Blue', hex: '#D8E5F2', category: 'Pastel', description: 'Serene misty morning sky tone', stageBg: 'bg-[#D8E5F2]' }
    ]
  },
  {
    id: 'studio-mint-armchair',
    name: 'Aurelia Biomorphic Armchair',
    subtitle: 'Sculptural Tufted Velvet Lounge Chair in Soft Mint',
    category: 'Armchairs',
    price: 1850,
    image: '/src/assets/isolated/isolated_mint_chair.png',
    material: 'Italian Cotton Velvet',
    dimensions: {
      width: 94,
      depth: 88,
      height: 82,
      seatHeight: 43,
      unit: 'cm'
    },
    details: {
      construction: 'FSC Solid European Beech Core with Cold-Cured Ergonomic Bio-Foam',
      finish: 'Water-Repellent Dead-Matte Velvet Pile',
      rubCount: '100,000 Martindale (High Traffic Contract Grade)',
      weight: '34 kg',
      warranty: '10-Year Master Frame Guarantee'
    },
    colorways: [
      { name: 'Pale Sage & Mint', hex: '#D7EAE0', category: 'Pastel', description: 'Fresh, muted botanical tone inspired by Nordic moss', stageBg: 'bg-[#D7EAE0]' },
      { name: 'Warm Ivory & Cream', hex: '#F7F4EE', category: 'Neutral', description: 'Classic unbleached organic wool hue', stageBg: 'bg-[#EDE7DC]' },
      { name: 'Muted Lavender', hex: '#E6DEF2', category: 'Pastel', description: 'Desaturated dusk violet with warm undertones', stageBg: 'bg-[#E6DEF2]' },
      { name: 'Soft Sand', hex: '#EADCC9', category: 'Neutral', description: 'Warm tactile grain reminiscent of Kyoto stone', stageBg: 'bg-[#EADCC9]' },
      { name: 'Dusty Blush', hex: '#F3DDD2', category: 'Pastel', description: 'Subtle terracotta petal tone', stageBg: 'bg-[#F3DDD2]' },
      { name: 'Powder Blue', hex: '#D8E5F2', category: 'Pastel', description: 'Serene morning sky mist', stageBg: 'bg-[#D8E5F2]' }
    ]
  },
  {
    id: 'studio-wave-sofa',
    name: 'Ondulation Sky Bouclé Curved Sofa',
    subtitle: 'Continuous Sweeping Architectural Curves in Powder Sky Wool Bouclé',
    category: 'Sofas',
    price: 3250,
    image: '/src/assets/isolated/clean_3d_sky_blue_sofa.png',
    material: 'Textured Sky Wool Bouclé',
    dimensions: {
      width: 242,
      depth: 104,
      height: 74,
      seatHeight: 41,
      unit: 'cm'
    },
    details: {
      construction: 'Multi-Density Orthopedic Foam with Sinuous Spring Suspension',
      finish: 'Anti-Pilling Looped Yarn Weave',
      rubCount: '80,000 Martindale',
      weight: '78 kg',
      warranty: '10-Year Master Frame Guarantee'
    },
    colorways: [
      { name: 'Muted Lavender', hex: '#E6DEF2', category: 'Pastel', description: 'Desaturated dusk violet with warm undertones', stageBg: 'bg-[#E6DEF2]' },
      { name: 'Warm Ivory & Cream', hex: '#F7F4EE', category: 'Neutral', description: 'Classic unbleached organic wool hue', stageBg: 'bg-[#EDE7DC]' },
      { name: 'Pale Sage & Mint', hex: '#D7EAE0', category: 'Pastel', description: 'Fresh, muted botanical tone', stageBg: 'bg-[#D7EAE0]' },
      { name: 'Soft Sand', hex: '#EADCC9', category: 'Neutral', description: 'Warm tactile grain', stageBg: 'bg-[#EADCC9]' },
      { name: 'Dusty Blush', hex: '#F3DDD2', category: 'Pastel', description: 'Subtle terracotta petal tone', stageBg: 'bg-[#F3DDD2]' },
      { name: 'Powder Blue', hex: '#D8E5F2', category: 'Pastel', description: 'Serene morning sky mist', stageBg: 'bg-[#D8E5F2]' }
    ]
  },
  {
    id: 'studio-coral-bench',
    name: 'Terra Sculptural Curved Bench',
    subtitle: 'Architectural Monolithic Seating in Dusty Terracotta Velvet',
    category: 'Benches',
    price: 1420,
    image: '/src/assets/isolated/isolated_coral_bench.png',
    material: 'Plush Architectural Velvet',
    dimensions: {
      width: 160,
      depth: 62,
      height: 48,
      seatHeight: 48,
      unit: 'cm'
    },
    details: {
      construction: 'Reinforced Steel Skeleton with Cast Polyurethane Core',
      finish: 'Stain-Resistant High-Nap Velvet',
      rubCount: '90,000 Martindale',
      weight: '32 kg',
      warranty: '10-Year Master Frame Guarantee'
    },
    colorways: [
      { name: 'Dusty Blush & Coral', hex: '#F3DDD2', category: 'Pastel', description: 'Subtle terracotta clay petal tone', stageBg: 'bg-[#F3DDD2]' },
      { name: 'Warm Ivory & Cream', hex: '#F7F4EE', category: 'Neutral', description: 'Classic unbleached organic wool hue', stageBg: 'bg-[#EDE7DC]' },
      { name: 'Pale Sage & Mint', hex: '#D7EAE0', category: 'Pastel', description: 'Fresh botanical tone', stageBg: 'bg-[#D7EAE0]' },
      { name: 'Soft Sand', hex: '#EADCC9', category: 'Neutral', description: 'Tactile natural grain', stageBg: 'bg-[#EADCC9]' }
    ]
  },
  {
    id: 'studio-pedestal-table',
    name: 'Selene Fluted Pedestal Dining Table',
    subtitle: 'Solid Honed Travertine Stone with Fluted Column Base',
    category: 'Dining Tables',
    price: 2890,
    image: '/src/assets/isolated/isolated_pedestal_table.png',
    material: 'Natural Italian Travertine',
    dimensions: {
      width: 140,
      depth: 140,
      height: 75,
      unit: 'cm'
    },
    details: {
      construction: 'Monolithic Carved Navona Travertine with Internal Core Ring',
      finish: 'Matte Honed Sealant with Open Pores Preserved',
      rubCount: 'Lifetime Natural Stone Resilience',
      weight: '142 kg',
      warranty: 'Lifetime Stone Structural Integrity'
    },
    colorways: [
      { name: 'Warm Ivory & Cream', hex: '#F7F4EE', category: 'Neutral', description: 'Natural Navona travertine tone', stageBg: 'bg-[#EDE7DC]' },
      { name: 'Soft Sand', hex: '#EADCC9', category: 'Neutral', description: 'Roman unfilled travertine', stageBg: 'bg-[#EADCC9]' },
      { name: 'Pale Sage & Mint', hex: '#D7EAE0', category: 'Pastel', description: 'Subtle celadon stone wash', stageBg: 'bg-[#D7EAE0]' }
    ]
  },
  {
    id: 'studio-sculptural-bed',
    name: 'Nara Sculptural Curved Bed',
    subtitle: 'Enveloping Cocoon Headboard in Soft Sand Belgian Linen',
    category: 'Beds',
    price: 3680,
    image: '/src/assets/isolated/isolated_sculptural_bed.png',
    material: 'Heavyweight Belgian Linen',
    dimensions: {
      width: 212,
      depth: 228,
      height: 118,
      seatHeight: 32,
      unit: 'cm'
    },
    details: {
      construction: 'Solid Solid Larch Slatted Foundation with Sound-Dampening Padding',
      finish: 'Brushed Washed Pure Linen with Double French Topstitch',
      rubCount: '65,000 Martindale',
      weight: '96 kg',
      warranty: '15-Year Solid Bedframe Guarantee'
    },
    colorways: [
      { name: 'Soft Sand', hex: '#EADCC9', category: 'Neutral', description: 'Warm tactile unbleached linen grain', stageBg: 'bg-[#EADCC9]' },
      { name: 'Warm Ivory & Cream', hex: '#F7F4EE', category: 'Neutral', description: 'Pure organic ivory weave', stageBg: 'bg-[#EDE7DC]' },
      { name: 'Muted Lavender', hex: '#E6DEF2', category: 'Pastel', description: 'Serene dusk violet tone', stageBg: 'bg-[#E6DEF2]' },
      { name: 'Pale Sage & Mint', hex: '#D7EAE0', category: 'Pastel', description: 'Calming sage leaf tone', stageBg: 'bg-[#D7EAE0]' }
    ]
  }
];

type EnvironmentMode = 'transparent' | 'clay-pedestal' | 'pastel-stage' | 'warm-ivory';
type CameraAngle = 'three-quarter' | 'front' | 'side' | 'top-down';

export const Studio3DShowcase: React.FC<Studio3DShowcaseProps> = ({
  products,
  onOpenDetail,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  // Active Piece
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(0);
  const currentPiece = STUDIO_PIECES[selectedPieceIdx];

  // Selected Colorway
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const currentColorway = currentPiece.colorways[selectedColorIdx] || currentPiece.colorways[0];

  // Environment mode (defaults to pure transparent background as requested)
  const [envMode, setEnvMode] = useState<EnvironmentMode>('transparent');
  const [showAlphaGrid, setShowAlphaGrid] = useState(false);

  // Camera & Orbit state
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('three-quarter');
  const [isTurntableActive, setIsTurntableActive] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [tilt, setTilt] = useState({ x: -4, y: 8 });
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Studio Lighting & Contact Shadow Sliders
  const [keyLightIntensity, setKeyLightIntensity] = useState(85);
  const [rimLightIntensity, setRimLightIntensity] = useState(65);
  const [shadowOpacity, setShadowOpacity] = useState(42);
  const [shadowBlur, setShadowBlur] = useState(20);

  // Overlays & Modes
  const [showDimensions, setShowDimensions] = useState(false);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Auto-turntable spin interval
  useEffect(() => {
    let animId: number;
    if (isTurntableActive) {
      const step = () => {
        setRotationDeg(prev => (prev + 0.35) % 360);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isTurntableActive]);

  // Reset colorway index when piece changes
  const handleSelectPiece = (idx: number) => {
    setSelectedPieceIdx(idx);
    setSelectedColorIdx(0);
    setRotationDeg(0);
  };

  // 3D Parallax Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    // Update loupe position
    setLoupePos({ x: xRatio * 100, y: yRatio * 100 });

    if (!isTurntableActive) {
      // 3/4 front view: slight elevated perspective
      const baseElev = cameraAngle === 'three-quarter' ? -6 : cameraAngle === 'top-down' ? -22 : 0;
      const baseTurn = cameraAngle === 'side' ? 28 : cameraAngle === 'three-quarter' ? 10 : 0;
      const x = (yRatio - 0.5) * -12 + baseElev;
      const y = (xRatio - 0.5) * 14 + baseTurn;
      setTilt({ x, y });
    }
  };

  // Download Alpha PNG helper
  const handleDownloadCutout = () => {
    const link = document.createElement('a');
    link.href = currentPiece.image;
    link.download = `${currentPiece.id}-isolated-cutout.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Find linked full product in PRODUCTS array for cart/wishlist
  const linkedProduct = products.find(p => p.category === currentPiece.category) || products[0];
  const isWishlisted = wishlistIds.includes(linkedProduct.id);

  return (
    <section
      id="studio-3d-showcase"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden bg-[#F9F7F2] border-t border-black/[0.04]"
    >
      {/* Background Soft Studio Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial from-white via-transparent to-transparent opacity-80 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header: Editorial Monograph Label & Reference Stylings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.06]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#182030] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#556075]">
                3D Studio Monograph • Pure Isolated Showcase
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D7EAE0] text-[#2D5A40] text-[9px] font-bold uppercase tracking-wider">
                Alpha Cutout
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151B28] tracking-tight">
              Photorealistic 3D Furniture Studio
            </h2>
          </div>

          {/* Quick Stats Pill Bar (Inspired by Reference Image 1 & 2) */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-4 py-2 rounded-full bg-white/90 border border-black/5 shadow-pastel-sm flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[#556075]" />
              <span className="text-xs font-semibold text-[#182030]">3/4 Elevated Angle</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/90 border border-black/5 shadow-pastel-sm flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="text-xs font-semibold text-[#182030]">Diffused Studio Key</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/90 border border-black/5 shadow-pastel-sm flex items-center gap-2">
              <Grid className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-xs font-semibold text-[#182030]">Clean Alpha Cutout</span>
            </div>
          </div>
        </div>

        {/* Product Switcher Bar: Seamlessly select between the standalone pieces */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {STUDIO_PIECES.map((piece, idx) => {
            const isSelected = selectedPieceIdx === idx;
            return (
              <button
                key={piece.id}
                id={`select-piece-${piece.id}`}
                onClick={() => handleSelectPiece(idx)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 text-left shrink-0 ${
                  isSelected
                    ? 'bg-[#182030] text-white shadow-pastel-md scale-102'
                    : 'bg-white/80 hover:bg-white text-[#4A5465] border border-black/5 hover:border-black/10'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F2EDE4] p-1 flex items-center justify-center shrink-0">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className={`text-xs font-bold block leading-tight ${isSelected ? 'text-white' : 'text-[#182030]'}`}>
                    {piece.name}
                  </span>
                  <span className={`text-[10px] block ${isSelected ? 'text-[#9BB0D3]' : 'text-[#7B8698]'}`}>
                    {piece.category} • ${piece.price.toLocaleString()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Split Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =========================================================================
              LEFT (Col 8): The Photorealistic 3D Viewport Stage
             ========================================================================= */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* The Main 3D Viewport Card */}
            <div
              ref={stageRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                if (!isTurntableActive) setTilt({ x: -4, y: 8 });
              }}
              onMouseMove={handleMouseMove}
              className={`relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[36px] p-6 sm:p-10 flex items-center justify-center overflow-hidden transition-all duration-700 cursor-grab active:cursor-grabbing select-none ${
                envMode === 'transparent'
                  ? showAlphaGrid
                    ? 'bg-[linear-gradient(45deg,#E8E4DD_25%,transparent_25%),linear-gradient(-45deg,#E8E4DD_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#E8E4DD_75%),linear-gradient(-45deg,transparent_75%,#E8E4DD_75%)] bg-[size:24px_24px] bg-[#F5F2EC] border border-black/10'
                    : 'bg-transparent border border-black/5'
                  : envMode === 'pastel-stage'
                  ? `${currentColorway.stageBg} border border-white/90 shadow-[0_24px_64px_-16px_rgba(22,28,44,0.12)]`
                  : envMode === 'warm-ivory'
                  ? 'bg-[#F4EFE6] border border-white/90 shadow-[0_24px_64px_-16px_rgba(22,28,44,0.12)]'
                  : 'bg-[#ECE4F4] border border-white/90 shadow-[0_24px_64px_-16px_rgba(22,28,44,0.12)]'
              }`}
              style={{
                boxShadow: envMode === 'transparent' && !showAlphaGrid ? 'none' : undefined
              }}
            >
              
              {/* Studio Key Lighting Spotlight (Adjustable intensity) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, ${keyLightIntensity / 100}) 0%, rgba(255, 255, 255, 0) 70%)`
                }}
              />

              {/* Subtle Narrow Ground Contact Shadow Directly Underneath Furniture Base */}
              <div
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[48%] max-w-[280px] h-3 bg-[#111624] rounded-[100%] pointer-events-none -z-10 transition-all duration-300"
                style={{
                  opacity: Math.min((shadowOpacity / 100) * 0.55, 0.28),
                  filter: 'blur(8px)',
                  transform: `translateX(-50%) scale(${isHovered ? 0.94 : 1})`
                }}
              />

              {/* The Isolated 3D Product (Centered with Generous Negative Space) */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8 transition-transform duration-300 ease-out"
                style={{
                  transform: isTurntableActive 
                    ? `perspective(1000px) rotateY(${rotationDeg}deg)`
                    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`
                }}
              >
                <img
                  src={currentPiece.image}
                  alt={currentPiece.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[90%] max-w-[90%] object-contain select-none transition-all duration-500"
                  style={{
                    filter: `drop-shadow(0 18px 24px rgba(22, 28, 44, 0.16)) drop-shadow(0 4px 6px rgba(22, 28, 44, 0.08)) brightness(${1 + (keyLightIntensity - 80) * 0.002})`
                  }}
                />
              </div>

              {/* Architectural Dimensions Blueprint Overlay */}
              <AnimatePresence>
                {showDimensions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 font-mono text-xs"
                  >
                    {/* Top Width Dimension Line */}
                    <div className="flex items-center justify-between w-full border-b border-dashed border-[#182030]/40 pb-1">
                      <span className="text-[10px] uppercase font-bold text-[#182030] tracking-wider">
                        ↔ Width: {currentPiece.dimensions.width} {currentPiece.dimensions.unit}
                      </span>
                      <span className="text-[10px] text-[#556075]">Front Elevation</span>
                    </div>

                    {/* Middle Dimension Callouts */}
                    <div className="flex items-center justify-between w-full">
                      {/* Left: Total Height */}
                      <div className="border-l border-dashed border-[#182030]/40 pl-2 h-36 flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-bold text-[#182030] tracking-wider block">
                          ↕ Height: {currentPiece.dimensions.height} {currentPiece.dimensions.unit}
                        </span>
                        {currentPiece.dimensions.seatHeight && (
                          <span className="text-[9px] text-[#556075] block mt-1">
                            Seat: {currentPiece.dimensions.seatHeight} {currentPiece.dimensions.unit}
                          </span>
                        )}
                      </div>

                      {/* Right: Depth */}
                      <div className="border-r border-dashed border-[#182030]/40 pr-2 h-36 flex flex-col justify-center text-right">
                        <span className="text-[10px] uppercase font-bold text-[#182030] tracking-wider block">
                          ⤢ Depth: {currentPiece.dimensions.depth} {currentPiece.dimensions.unit}
                        </span>
                        <span className="text-[9px] text-[#556075] block mt-1">
                          Weight: {currentPiece.details.weight}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Ground Clearance Indicator */}
                    <div className="flex items-center justify-between w-full border-t border-dashed border-[#182030]/40 pt-1">
                      <span className="text-[10px] text-[#556075]">Zero-Clearance Weighted Contact Base</span>
                      <span className="text-[10px] uppercase font-bold text-[#182030]">Scale: 1:1 True Proportions</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Macroscopic Texture Loupe (Simulating high-res material inspection) */}
              <AnimatePresence>
                {isLoupeActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute pointer-events-none z-30 w-36 h-36 rounded-full border-2 border-white shadow-2xl overflow-hidden bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center"
                    style={{
                      left: `clamp(10%, ${loupePos.x}%, 85%)`,
                      top: `clamp(10%, ${loupePos.y}%, 85%)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#556075] mb-1">
                      8K Weave Zoom
                    </span>
                    <span className="text-xs font-bold text-[#182030] leading-tight mb-1">
                      {currentPiece.material}
                    </span>
                    <span className="text-[9px] text-[#2563EB] font-mono">
                      {currentPiece.details.rubCount}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top-Left: Mode & Spec Badges */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-[#182030] shadow-pastel-sm border border-black/5">
                  {currentPiece.category}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#556075] shadow-xs">
                  {currentPiece.material}
                </span>
              </div>

              {/* Top-Right: Quick Floating Action Toggles */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
                {/* Turntable Auto-Spin Toggle */}
                <button
                  id="toggle-turntable-btn"
                  onClick={() => setIsTurntableActive(!isTurntableActive)}
                  className={`p-2.5 rounded-full transition-all duration-200 shadow-pastel-sm flex items-center gap-1.5 text-xs font-semibold ${
                    isTurntableActive
                      ? 'bg-[#182030] text-white'
                      : 'bg-white/95 hover:bg-white text-[#4A5465]'
                  }`}
                  title="Toggle 360° Turntable Rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isTurntableActive ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isTurntableActive ? 'Stop' : '360°'}</span>
                </button>

                {/* Blueprint Dimension Overlay Toggle */}
                <button
                  id="toggle-dimensions-btn"
                  onClick={() => setShowDimensions(!showDimensions)}
                  className={`p-2.5 rounded-full transition-all duration-200 shadow-pastel-sm flex items-center gap-1.5 text-xs font-semibold ${
                    showDimensions
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-white/95 hover:bg-white text-[#4A5465]'
                  }`}
                  title="Toggle Architectural Measurements"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Specs</span>
                </button>

                {/* Texture Loupe Toggle */}
                <button
                  id="toggle-loupe-btn"
                  onClick={() => setIsLoupeActive(!isLoupeActive)}
                  className={`p-2.5 rounded-full transition-all duration-200 shadow-pastel-sm flex items-center gap-1.5 text-xs font-semibold ${
                    isLoupeActive
                      ? 'bg-[#D97706] text-white'
                      : 'bg-white/95 hover:bg-white text-[#4A5465]'
                  }`}
                  title="Toggle Macroscopic Material Loupe"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Weave</span>
                </button>
              </div>

              {/* Bottom Floating Bar: Camera Presets & Cutout Export */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
                {/* Camera Angle Chips */}
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-pastel-sm pointer-events-auto border border-black/5">
                  <button
                    onClick={() => {
                      setCameraAngle('three-quarter');
                      setTilt({ x: -6, y: 10 });
                      setIsTurntableActive(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                      cameraAngle === 'three-quarter' ? 'bg-[#182030] text-white' : 'text-[#556075] hover:text-black'
                    }`}
                  >
                    3/4 Hero
                  </button>
                  <button
                    onClick={() => {
                      setCameraAngle('front');
                      setTilt({ x: 0, y: 0 });
                      setIsTurntableActive(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                      cameraAngle === 'front' ? 'bg-[#182030] text-white' : 'text-[#556075] hover:text-black'
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => {
                      setCameraAngle('side');
                      setTilt({ x: 0, y: 28 });
                      setIsTurntableActive(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                      cameraAngle === 'side' ? 'bg-[#182030] text-white' : 'text-[#556075] hover:text-black'
                    }`}
                  >
                    Side
                  </button>
                </div>

                {/* Direct Cutout PNG Download Button */}
                <button
                  id="download-cutout-png-btn"
                  onClick={handleDownloadCutout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-xs font-bold text-[#182030] shadow-pastel-md hover:shadow-pastel-lg transition-all active:scale-95 pointer-events-auto border border-white/80"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span className="text-[#16A34A]">Downloaded ✓</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Download Cutout PNG</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Viewport Control Strip: Environment Plinth & Lighting Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Studio Environment Selector */}
              <div className="p-5 rounded-[28px] bg-white/90 border border-black/5 shadow-pastel-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8598] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#556075]" />
                    <span>Studio Stage Atmosphere</span>
                  </span>
                  {envMode === 'transparent' && (
                    <button
                      onClick={() => setShowAlphaGrid(!showAlphaGrid)}
                      className="text-[10px] font-semibold text-[#2563EB] hover:underline"
                    >
                      {showAlphaGrid ? 'White BG' : 'Checker Grid'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setEnvMode('clay-pedestal')}
                    className={`py-2 px-1 rounded-2xl text-[10px] font-bold text-center border transition-all ${
                      envMode === 'clay-pedestal'
                        ? 'bg-[#ECE4F4] border-[#8B5CF6] text-[#4C1D95] shadow-xs'
                        : 'bg-[#FAF8F5] border-transparent text-[#556075] hover:bg-white'
                    }`}
                  >
                    Clay Plinth
                  </button>
                  <button
                    onClick={() => setEnvMode('pastel-stage')}
                    className={`py-2 px-1 rounded-2xl text-[10px] font-bold text-center border transition-all ${
                      envMode === 'pastel-stage'
                        ? 'bg-[#D7EAE0] border-[#10B981] text-[#065F46] shadow-xs'
                        : 'bg-[#FAF8F5] border-transparent text-[#556075] hover:bg-white'
                    }`}
                  >
                    Pastel Stage
                  </button>
                  <button
                    onClick={() => setEnvMode('transparent')}
                    className={`py-2 px-1 rounded-2xl text-[10px] font-bold text-center border transition-all ${
                      envMode === 'transparent'
                        ? 'bg-[#EFF6FF] border-[#3B82F6] text-[#1E40AF] shadow-xs'
                        : 'bg-[#FAF8F5] border-transparent text-[#556075] hover:bg-white'
                    }`}
                  >
                    Alpha Cutout
                  </button>
                  <button
                    onClick={() => setEnvMode('warm-ivory')}
                    className={`py-2 px-1 rounded-2xl text-[10px] font-bold text-center border transition-all ${
                      envMode === 'warm-ivory'
                        ? 'bg-[#F4EFE6] border-[#D97706] text-[#92400E] shadow-xs'
                        : 'bg-[#FAF8F5] border-transparent text-[#556075] hover:bg-white'
                    }`}
                  >
                    Warm Ivory
                  </button>
                </div>
              </div>

              {/* Studio Diffused Lighting Sliders */}
              <div className="p-5 rounded-[28px] bg-white/90 border border-black/5 shadow-pastel-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8598] flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Diffused Lighting & Shadows</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#556075]">
                    Studio HDR
                  </span>
                </div>

                {/* Key Light Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-[#556075] w-20">Key Light</span>
                  <input
                    type="range"
                    min="50"
                    max="110"
                    value={keyLightIntensity}
                    onChange={(e) => setKeyLightIntensity(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#182030]"
                  />
                  <span className="text-[10px] font-mono text-[#182030] w-8 text-right">{keyLightIntensity}%</span>
                </div>

                {/* Contact Shadow Softness */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-[#556075] w-20">Contact Blur</span>
                  <input
                    type="range"
                    min="10"
                    max="36"
                    value={shadowBlur}
                    onChange={(e) => setShadowBlur(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#182030]"
                  />
                  <span className="text-[10px] font-mono text-[#182030] w-8 text-right">{shadowBlur}px</span>
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================================
              RIGHT (Col 4): Specifications, Color Direction & Direct Order
             ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Main Product Info Card */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-black/5 shadow-pastel-sm flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#556075]">
                    Studio Masterpiece
                  </span>
                  <span className="text-xl font-black text-[#151B28]">
                    ${currentPiece.price.toLocaleString()}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-extrabold text-[#151B28] leading-snug mb-2">
                  {currentPiece.name}
                </h3>
                <p className="text-xs text-[#556075] leading-relaxed mb-6">
                  {currentPiece.subtitle}
                </p>
              </div>

              {/* Color Direction Switcher (Soft Neutrals & Subtle Pastels as requested) */}
              <div className="mb-6 pt-5 border-t border-black/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#182030] flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Color Direction:</span>
                  </span>
                  <span className="text-xs font-bold text-[#182030]">
                    {currentColorway.name}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {currentPiece.colorways.map((cw, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    return (
                      <button
                        key={cw.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`p-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-white border-[#182030] ring-2 ring-[#182030] shadow-pastel-sm'
                            : 'bg-[#FAF8F5] border-transparent hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: cw.hex }}
                        />
                        <span className="text-[10px] font-semibold text-[#182030] text-center leading-tight truncate w-full">
                          {cw.name.split('&')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-[#7B8698] mt-2 italic">
                  {currentColorway.description}
                </p>
              </div>

              {/* Detailed Physical Construction & Material Highlights */}
              <div className="space-y-3 mb-6 pt-5 border-t border-black/[0.06]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#182030] block mb-2">
                  Physical Construction & Tolerances
                </span>

                <div className="flex items-start gap-2 text-xs text-[#4A5465]">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Frame:</strong> {currentPiece.details.construction}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#4A5465]">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Finish:</strong> {currentPiece.details.finish}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#4A5465]">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Durability:</strong> {currentPiece.details.rubCount}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#4A5465]">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Guarantee:</strong> {currentPiece.details.warranty}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-black/[0.06]">
                <button
                  onClick={() => {
                    const matchedColorVariant: ColorVariant = {
                      name: currentColorway.name,
                      hex: currentColorway.hex,
                      bgGradient: 'from-[#F5EFFE] to-[#EBE3F4]',
                      image: currentPiece.image
                    };
                    onAddToCart(linkedProduct, matchedColorVariant, 1);
                  }}
                  className="w-full py-4 px-6 rounded-full bg-[#182030] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-tactile hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${currentPiece.price.toLocaleString()}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenDetail(linkedProduct)}
                    className="py-3 px-4 rounded-full bg-[#FAF8F5] hover:bg-[#F0EDE7] text-[#182030] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Full Spec</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(linkedProduct)}
                    className={`py-3 px-4 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                      isWishlisted
                        ? 'bg-[#C95332] text-white border-[#C95332]'
                        : 'bg-white border-black/10 text-[#4A5465] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
                    <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM: 4-Column Tactile Pastel Design Pillars (Inspired by Reference Image 2)
           ========================================================================= */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Mint Palette */}
          <div
            className="p-7 rounded-[32px] bg-[#EDF5F1] border border-white/80 transition-all duration-300 hover:shadow-pastel-md flex flex-col justify-between"
            style={{ boxShadow: '0 12px 32px -8px rgba(22, 28, 44, 0.05)' }}
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold uppercase tracking-wider text-[#2D5A40] shadow-xs mb-4">
                01 • Alpha Isolation
              </span>
              <h4 className="font-display text-lg font-bold text-[#182030] mb-2">
                Pure Transparent Cutout
              </h4>
              <p className="text-xs text-[#4A5465] leading-relaxed">
                Completely isolated from rooms, walls, or decorative distractions. Clean alpha silhouette optimized for luxury e-commerce placement.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-[#2D5A40]">
              <span>8K Native Cutout</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Lavender Palette */}
          <div
            className="p-7 rounded-[32px] bg-[#F2EEF8] border border-white/80 transition-all duration-300 hover:shadow-pastel-md flex flex-col justify-between"
            style={{ boxShadow: '0 12px 32px -8px rgba(22, 28, 44, 0.05)' }}
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold uppercase tracking-wider text-[#5A3884] shadow-xs mb-4">
                02 • Physically Based
              </span>
              <h4 className="font-display text-lg font-bold text-[#182030] mb-2">
                Realistic Materials & Seams
              </h4>
              <p className="text-xs text-[#4A5465] leading-relaxed">
                Refined tactile micro-fibers, subtle tufting seams, and organic bevels rendered with physically based global illumination.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-[#5A3884]">
              <span>French Topstitch Details</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Peach / Blush Palette */}
          <div
            className="p-7 rounded-[32px] bg-[#FBF2ED] border border-white/80 transition-all duration-300 hover:shadow-pastel-md flex flex-col justify-between"
            style={{ boxShadow: '0 12px 32px -8px rgba(22, 28, 44, 0.05)' }}
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold uppercase tracking-wider text-[#A04222] shadow-xs mb-4">
                03 • Three-Quarter View
              </span>
              <h4 className="font-display text-lg font-bold text-[#182030] mb-2">
                Elevated Camera Perspective
              </h4>
              <p className="text-xs text-[#4A5465] leading-relaxed">
                Elevated 3/4 camera angle revealing the front, side, and dimensional depth with accurate Scandinavian/Japandi proportions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-[#A04222]">
              <span>Zero Distortion Lens</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Butter Yellow Palette */}
          <div
            className="p-7 rounded-[32px] bg-[#FCF8EB] border border-white/80 transition-all duration-300 hover:shadow-pastel-md flex flex-col justify-between"
            style={{ boxShadow: '0 12px 32px -8px rgba(22, 28, 44, 0.05)' }}
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold uppercase tracking-wider text-[#8C6C0F] shadow-xs mb-4">
                04 • Soft Neutral Harmony
              </span>
              <h4 className="font-display text-lg font-bold text-[#182030] mb-2">
                Calm Desaturated Palette
              </h4>
              <p className="text-xs text-[#4A5465] leading-relaxed">
                Warm ivory, soft sand, pale sage, muted lavender, and powder blue tones formulated to create serene, tasteful luxury.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-[#8C6C0F]">
              <span>Editorial Color Grading</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
