import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  Heart, 
  Sparkles, 
  Check, 
  Sun, 
  Moon, 
  Sunrise, 
  Sliders, 
  Box, 
  Truck, 
  ShieldCheck, 
  Rotate3d,
  Layers,
  ArrowRight,
  Palette
} from 'lucide-react';
import { Product } from '../types';

interface CallToActionSectionProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
  onScrollToCatalog: () => void;
}

type LightingMode = 'golden' | 'sunrise' | 'daylight' | 'moonlight';

interface LightingPreset {
  id: LightingMode;
  name: string;
  tag: string;
  kelvin: string;
  icon: 'sun' | 'sunrise' | 'daylight' | 'moon';
  haloClass: string;
  ambientHex: string;
  lightAura: string;
  textColor: string;
  bgAtmosphere: string;
  specularGradient: string;
  shadowColor: string;
}

const LIGHTING_PRESETS: Record<LightingMode, LightingPreset> = {
  golden: {
    id: 'golden',
    name: 'Golden Radiance',
    tag: 'Energy Fuel',
    kelvin: '2700K Amber',
    icon: 'sun',
    haloClass: 'tablet-inner-glow-gold',
    ambientHex: '#FFB800',
    lightAura: 'rgba(255, 184, 0, 0.85)',
    textColor: '#8A5308',
    bgAtmosphere: 'linear-gradient(135deg, #FFF9EB 0%, #FFE9BD 35%, #FFD6A0 70%, #FFF3E0 100%)',
    specularGradient: 'from-[#FFFDF5]/90 via-[#FFE7B8]/65 to-transparent',
    shadowColor: 'rgba(70, 42, 10, 0.35)'
  },
  sunrise: {
    id: 'sunrise',
    name: 'Sunrise Bloom',
    tag: 'Vitality Dawn',
    kelvin: '3200K Coral',
    icon: 'sunrise',
    haloClass: 'tablet-inner-glow-peach',
    ambientHex: '#FF6B55',
    lightAura: 'rgba(255, 107, 85, 0.85)',
    textColor: '#9C3322',
    bgAtmosphere: 'linear-gradient(135deg, #FFF1EE 0%, #FFD8CE 35%, #FFAEA0 70%, #FFEBE6 100%)',
    specularGradient: 'from-[#FFF5F2]/90 via-[#FFD0C4]/65 to-transparent',
    shadowColor: 'rgba(75, 25, 18, 0.35)'
  },
  daylight: {
    id: 'daylight',
    name: 'Studio Daylight',
    tag: 'Pure Clarity',
    kelvin: '4500K Opaline',
    icon: 'daylight',
    haloClass: 'tablet-inner-glow-white',
    ambientHex: '#38BDF8',
    lightAura: 'rgba(56, 189, 248, 0.85)',
    textColor: '#0369A1',
    bgAtmosphere: 'linear-gradient(135deg, #F0F8FF 0%, #D4EEFC 35%, #B2E0F9 70%, #E9F6FD 100%)',
    specularGradient: 'from-[#F5FAFF]/95 via-[#CDEBFC]/65 to-transparent',
    shadowColor: 'rgba(15, 50, 75, 0.32)'
  },
  moonlight: {
    id: 'moonlight',
    name: 'Moonlit Twilight',
    tag: 'Rest & Repair',
    kelvin: '2000K Lavender',
    icon: 'moon',
    haloClass: 'tablet-inner-glow-moon',
    ambientHex: '#A855F7',
    lightAura: 'rgba(168, 85, 247, 0.85)',
    textColor: '#581C87',
    bgAtmosphere: 'linear-gradient(135deg, #F7F1FF 0%, #E7D4FC 35%, #D0B2F8 70%, #F3EAFE 100%)',
    specularGradient: 'from-[#FBF8FF]/90 via-[#DEC4F9]/65 to-transparent',
    shadowColor: 'rgba(50, 18, 75, 0.35)'
  }
};

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  products,
  onOpenDetail,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = [],
  onScrollToCatalog
}) => {
  // Dynamic Studio Showcase Pieces with coordinated colorways
  const STUDIO_PIECES_DATA = [
    {
      id: 'prod-lounge-aura',
      name: 'Aura Armchair',
      category: 'Lounge Chairs',
      price: 1420,
      underframe: 'Solid FSC European White Oak Underframe',
      fabrics: [
        {
          name: 'Pistachio Sage Weave',
          hex: '#C4EDDA',
          image: '/src/assets/isolated/isolated_mint_chair.png',
          material: 'Pistachio Tactile Cotton Weave',
          primaryBtn: '#1F4E38',
          primaryBtnHover: '#163B29',
          primaryBtnShadow: 'rgba(31, 78, 56, 0.35)',
          accentBg: '#E7F5EE',
          accentText: '#1F4E38',
          priceBadgeBg: '#1F4E38'
        },
        {
          name: 'Powder Sky Fluid Lounge',
          hex: '#B9D4E8',
          image: '/src/assets/isolated/clean_3d_powder_blue_chair.png',
          material: 'Merino Cashmere Weave',
          primaryBtn: '#234968',
          primaryBtnHover: '#1A374F',
          primaryBtnShadow: 'rgba(35, 73, 104, 0.35)',
          accentBg: '#ECF3F8',
          accentText: '#234968',
          priceBadgeBg: '#234968'
        },
        {
          name: 'Rose Coral Velvet',
          hex: '#EAA29A',
          image: '/src/assets/isolated/clean_3d_coral_chair.png',
          material: 'Sculpted Cotton Velvet',
          primaryBtn: '#A33C30',
          primaryBtnHover: '#873127',
          primaryBtnShadow: 'rgba(163, 60, 48, 0.35)',
          accentBg: '#FDF1EF',
          accentText: '#A33C30',
          priceBadgeBg: '#A33C30'
        },
        {
          name: 'Honey Dijon Velvet',
          hex: '#E8C76D',
          image: '/src/assets/isolated/clean_3d_yellow_chair.png',
          material: 'Matte Brushed Velour',
          primaryBtn: '#946614',
          primaryBtnHover: '#7A540F',
          primaryBtnShadow: 'rgba(148, 102, 20, 0.35)',
          accentBg: '#FEF8E9',
          accentText: '#946614',
          priceBadgeBg: '#946614'
        }
      ]
    },
    {
      id: 'prod-sofa-ondulation',
      name: 'Ondulation Sofa',
      category: 'Sofas',
      price: 3250,
      underframe: 'Fluted Alabaster Plinth & Hardwood Shell',
      fabrics: [
        {
          name: 'Powder Sky Bouclé',
          hex: '#B9D4E8',
          image: '/src/assets/isolated/clean_3d_sky_blue_sofa.png',
          material: 'Powder Sky Wool Bouclé Weave',
          primaryBtn: '#234968',
          primaryBtnHover: '#1A374F',
          primaryBtnShadow: 'rgba(35, 73, 104, 0.35)',
          accentBg: '#ECF3F8',
          accentText: '#234968',
          priceBadgeBg: '#234968'
        },
        {
          name: 'Pistachio Sage Velour',
          hex: '#C4EDDA',
          image: '/src/assets/isolated/pistachio_sectional_sofa.png',
          material: 'Linen Velour Architectural Curves',
          primaryBtn: '#1F4E38',
          primaryBtnHover: '#163B29',
          primaryBtnShadow: 'rgba(31, 78, 56, 0.35)',
          accentBg: '#E7F5EE',
          accentText: '#1F4E38',
          priceBadgeBg: '#1F4E38'
        },
        {
          name: 'Rose Coral Velvet',
          hex: '#EAA29A',
          image: '/src/assets/isolated/clean_3d_coral_chair.png',
          material: 'Sculpted Coral Cotton Velvet',
          primaryBtn: '#A33C30',
          primaryBtnHover: '#873127',
          primaryBtnShadow: 'rgba(163, 60, 48, 0.35)',
          accentBg: '#FDF1EF',
          accentText: '#A33C30',
          priceBadgeBg: '#A33C30'
        },
        {
          name: 'Honey Amber Weave',
          hex: '#E8C76D',
          image: '/src/assets/isolated/clean_3d_yellow_chair.png',
          material: 'Warm Brushed Ochre Weave',
          primaryBtn: '#946614',
          primaryBtnHover: '#7A540F',
          primaryBtnShadow: 'rgba(148, 102, 20, 0.35)',
          accentBg: '#FEF8E9',
          accentText: '#946614',
          priceBadgeBg: '#946614'
        }
      ]
    },
    {
      id: 'prod-armchair-solstice',
      name: 'Solstice Chair',
      category: 'Lounge Chairs',
      price: 1340,
      underframe: 'Solid Steamed European Beech Underframe',
      fabrics: [
        {
          name: 'Rose Terracotta Velvet',
          hex: '#EAA29A',
          image: '/src/assets/isolated/clean_3d_coral_chair.png',
          material: 'Sculpted Terracotta Velvet',
          primaryBtn: '#A33C30',
          primaryBtnHover: '#873127',
          primaryBtnShadow: 'rgba(163, 60, 48, 0.35)',
          accentBg: '#FDF1EF',
          accentText: '#A33C30',
          priceBadgeBg: '#A33C30'
        },
        {
          name: 'Pistachio Sage Weave',
          hex: '#C4EDDA',
          image: '/src/assets/isolated/isolated_mint_chair.png',
          material: 'Pistachio Tactile Cotton Weave',
          primaryBtn: '#1F4E38',
          primaryBtnHover: '#163B29',
          primaryBtnShadow: 'rgba(31, 78, 56, 0.35)',
          accentBg: '#E7F5EE',
          accentText: '#1F4E38',
          priceBadgeBg: '#1F4E38'
        },
        {
          name: 'Honey Dijon Velour',
          hex: '#E8C76D',
          image: '/src/assets/isolated/clean_3d_yellow_chair.png',
          material: 'Matte Brushed Velour',
          primaryBtn: '#946614',
          primaryBtnHover: '#7A540F',
          primaryBtnShadow: 'rgba(148, 102, 20, 0.35)',
          accentBg: '#FEF8E9',
          accentText: '#946614',
          priceBadgeBg: '#946614'
        },
        {
          name: 'Powder Sky Lounge',
          hex: '#B9D4E8',
          image: '/src/assets/isolated/clean_3d_powder_blue_chair.png',
          material: 'Merino Cashmere Weave',
          primaryBtn: '#234968',
          primaryBtnHover: '#1A374F',
          primaryBtnShadow: 'rgba(35, 73, 104, 0.35)',
          accentBg: '#ECF3F8',
          accentText: '#234968',
          priceBadgeBg: '#234968'
        }
      ]
    },
    {
      id: 'prod-chair-kanso',
      name: 'Kanso Chair',
      category: 'Dining Chairs',
      price: 680,
      underframe: 'Solid Natural Steamed European Ash',
      fabrics: [
        {
          name: 'Honey Amber Weave',
          hex: '#E8C76D',
          image: '/src/assets/isolated/clean_3d_yellow_chair.png',
          material: 'Butter-Yellow Wool Cushion',
          primaryBtn: '#946614',
          primaryBtnHover: '#7A540F',
          primaryBtnShadow: 'rgba(148, 102, 20, 0.35)',
          accentBg: '#FEF8E9',
          accentText: '#946614',
          priceBadgeBg: '#946614'
        },
        {
          name: 'Pistachio Sage Weave',
          hex: '#C4EDDA',
          image: '/src/assets/isolated/isolated_mint_chair.png',
          material: 'Pistachio Tactile Cotton Weave',
          primaryBtn: '#1F4E38',
          primaryBtnHover: '#163B29',
          primaryBtnShadow: 'rgba(31, 78, 56, 0.35)',
          accentBg: '#E7F5EE',
          accentText: '#1F4E38',
          priceBadgeBg: '#1F4E38'
        },
        {
          name: 'Rose Coral Velvet',
          hex: '#EAA29A',
          image: '/src/assets/isolated/clean_3d_coral_chair.png',
          material: 'Sculpted Coral Cotton Velvet',
          primaryBtn: '#A33C30',
          primaryBtnHover: '#873127',
          primaryBtnShadow: 'rgba(163, 60, 48, 0.35)',
          accentBg: '#FDF1EF',
          accentText: '#A33C30',
          priceBadgeBg: '#A33C30'
        },
        {
          name: 'Powder Sky Wool',
          hex: '#B9D4E8',
          image: '/src/assets/isolated/clean_3d_powder_blue_chair.png',
          material: 'Merino Wool Weave',
          primaryBtn: '#234968',
          primaryBtnHover: '#1A374F',
          primaryBtnShadow: 'rgba(35, 73, 104, 0.35)',
          accentBg: '#ECF3F8',
          accentText: '#234968',
          priceBadgeBg: '#234968'
        }
      ]
    }
  ];

  // Active product piece and fabric selection
  const [activePieceId, setActivePieceId] = useState<string>('prod-lounge-aura');
  const [selectedFabricIdx, setSelectedFabricIdx] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<LightingMode>('golden');
  const [glowIntensity, setGlowIntensity] = useState<number>(85); // 30 - 100
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [swatchOrdered, setSwatchOrdered] = useState(false);

  const preset = LIGHTING_PRESETS[activeMode];

  // Current active piece and fabric
  const currentPiece = STUDIO_PIECES_DATA.find(p => p.id === activePieceId) || STUDIO_PIECES_DATA[0];
  const currentFabric = currentPiece.fabrics[selectedFabricIdx] || currentPiece.fabrics[0];

  // Matching catalog product for cart & modal actions
  const activeCatalogProduct = products.find(p => p.id === currentPiece.id) || products[0];
  const isSaved = wishlistIds.includes(activeCatalogProduct.id);

  // 3D Parallax Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHoveringStage(false);
  };

  const handlePrimaryBuy = () => {
    onQuickAdd(activeCatalogProduct, selectedFabricIdx);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  const handleOrderSwatchKit = () => {
    setSwatchOrdered(true);
    setTimeout(() => setSwatchOrdered(false), 3000);
  };

  return (
    <section
      id="cta-showcase-section"
      className="relative min-h-[92vh] py-10 sm:py-14 px-4 sm:px-6 lg:px-10 flex flex-col justify-center overflow-hidden transition-colors duration-1000"
      style={{ background: preset.bgAtmosphere }}
    >
      {/* Premium Architectural Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.055] transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #182030 1.5px, transparent 0), linear-gradient(to right, rgba(24,32,48,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,32,48,0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px'
        }}
      />

      {/* Dynamic Chromatic Dreamscape Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top ambient glow */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[950px] h-[500px] rounded-full blur-[140px] transition-all duration-700 opacity-70"
          style={{ backgroundColor: preset.ambientHex }}
        />
        {/* Bottom vibrant soft aura */}
        <div 
          className="absolute -bottom-24 right-6 w-[700px] h-[450px] rounded-full blur-[130px] transition-all duration-700 opacity-60"
          style={{ backgroundColor: preset.ambientHex }}
        />
        {/* Left atmospheric color bloom */}
        <div 
          className="absolute top-1/2 -left-20 w-[500px] h-[450px] rounded-full blur-[140px] transition-all duration-700 opacity-40"
          style={{ backgroundColor: preset.ambientHex }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
        
        {/* Top Section Header: Compact & Elegant */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-black/5 shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#141A26]" />
            <span className="font-sans font-bold text-[11px] text-[#141A26] tracking-wider uppercase">
              3D Interactive Lighting Studio
            </span>
            <span className="w-1 h-1 rounded-full bg-black/30" />
            <span className="text-[11px] font-medium text-slate-500">
              Real-Time Kelvin Ambience
            </span>
          </div>

          <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight text-[#141A26] mb-1.5 tracking-tight">
            Sculpt Your Space in Real-Time Light
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Experience the <strong className="text-[#141A26] font-semibold">{currentPiece.name}</strong> under calibrated circadian Kelvin light.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* THE FLOATING INNER-GLOW TABLET */}
        {/* ========================================================================= */}
        <div className="relative max-w-5xl mx-auto w-full mb-3 sm:mb-4">
          
          {/* Main Floating Tablet Frame */}
          <div
            className={`relative rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 transition-all duration-700 overflow-hidden ${preset.haloClass}`}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
            }}
          >
            {/* Luminous Inner Border Glow */}
            <div 
              className="absolute inset-0 rounded-[22px] sm:rounded-[30px] pointer-events-none transition-all duration-700 z-10"
              style={{
                boxShadow: `
                  inset 0 0 16px 2px ${preset.lightAura},
                  inset 0 0 ${glowIntensity * 0.6}px ${preset.lightAura},
                  inset 0 0 ${glowIntensity * 1.1}px ${preset.lightAura},
                  inset 0 2px 2px rgba(255, 255, 255, 1)
                `
              }}
            />

            {/* Specular Inner Rim Light */}
            <div 
              className="absolute inset-[2px] rounded-[20px] sm:rounded-[28px] pointer-events-none transition-all duration-700 z-10"
              style={{
                border: `2px solid ${preset.ambientHex}`,
                opacity: (glowIntensity / 100) * 0.8,
                filter: 'blur(1px)',
                maskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)'
              }}
            />

            {/* Soft luminous internal wash */}
            <div 
              className={`absolute inset-0 bg-gradient-to-b ${preset.specularGradient} pointer-events-none transition-opacity duration-700`} 
              style={{ opacity: (glowIntensity / 100) * 0.65 }}
            />

            {/* Tablet Header: Minimal Status Bar with Dynamic Piece Switcher & Finishes */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-2.5 border-b border-black/[0.06]">
              {/* Left: Product Piece Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-white/90 border border-black/5 shadow-xs overflow-x-auto">
                {STUDIO_PIECES_DATA.map((piece) => {
                  const isPieceActive = activePieceId === piece.id;
                  return (
                    <button
                      key={piece.id}
                      id={`cta-piece-${piece.id}`}
                      onClick={() => {
                        setActivePieceId(piece.id);
                        setSelectedFabricIdx(0);
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-sans font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isPieceActive
                          ? 'bg-[#182030] text-white shadow-xs'
                          : 'text-[#556075] hover:text-[#182030] hover:bg-black/5'
                      }`}
                    >
                      {piece.name}
                    </button>
                  );
                })}
              </div>

              {/* Center: Real-time Ambient Lighting Status */}
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-black/5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: preset.ambientHex }} />
                <span className="text-[10px] font-semibold tracking-wider text-[#353F52] uppercase">
                  {preset.name} • {preset.kelvin}
                </span>
              </div>

              {/* Right: Fabric Swatch Mini Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6A778B] hidden md:inline">
                  Finish:
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 border border-black/5 shadow-xs">
                  {currentPiece.fabrics.map((fabric, idx) => (
                    <button
                      key={fabric.name}
                      id={`cta-fabric-toggle-${idx}`}
                      onClick={() => setSelectedFabricIdx(idx)}
                      title={fabric.name}
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-200 border border-black/10 cursor-pointer ${
                        selectedFabricIdx === idx 
                          ? 'scale-125 ring-2 ring-offset-1 ring-[#141A26]' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: fabric.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 3D PRODUCT SHOWCASE: ARCHITECTURAL SCULPTURE */}
            {/* ========================================================================= */}
            <div
              className="relative w-full min-h-[200px] sm:min-h-[250px] lg:min-h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseLeave={handleMouseLeave}
            >
              {/* THE CHAIR IN PURE 3D ISOLATION */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4 transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHoveringStage ? '-6px' : '0px'}) scale(${isHoveringStage ? 1.02 : 1})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Clean 3D Product Image with Zero Background */}
                <img
                  src={currentFabric.image}
                  alt={`${currentPiece.name} in ${currentFabric.name}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[210px] sm:max-h-[250px] lg:max-h-[280px] w-auto max-w-full object-contain select-none pointer-events-none transition-all duration-500"
                />

                {/* Floating 3D Spec Tag */}
                <div 
                  className="absolute top-1 left-1 sm:top-3 sm:left-3 z-20 pointer-events-none transition-opacity duration-300"
                  style={{ opacity: isHoveringStage ? 1 : 0.9 }}
                >
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-tactile">
                    <Rotate3d className="w-3 h-3 text-slate-700" />
                    <span className="font-sans font-bold text-[10px] sm:text-[11px] text-[#1E2638] tracking-wider uppercase">
                      3D Interactive Stage
                    </span>
                  </div>
                </div>

                {/* Floating Active Fabric Badge */}
                <div className="absolute bottom-1 right-1 sm:bottom-3 sm:right-3 z-20 pointer-events-none">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-tactile">
                    <span 
                      className="w-2 h-2 rounded-full border border-black/10 transition-colors duration-300" 
                      style={{ backgroundColor: currentFabric.hex }}
                    />
                    <span className="font-sans font-medium text-[10px] sm:text-[11px] text-[#242C3D]">
                      {currentFabric.material}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* INTERACTIVE LIGHTING CONTROLS */}
            {/* ========================================================================= */}
            <div className="relative z-20 pt-4 mt-2 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4">
              
              {/* Left: The 4 Celestial Lighting Presets */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5 w-full md:w-auto p-1 rounded-2xl bg-black/[0.02]">
                
                {/* 1. Golden Hour Orb */}
                <button
                  id="cta-lighting-golden-btn"
                  onClick={() => setActiveMode('golden')}
                  aria-label="Activate Golden Hour 2700K lighting preset"
                  className={`group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeMode === 'golden'
                      ? 'bg-white shadow-sm ring-1.5 ring-[#182030] text-[#182030]'
                      : 'bg-white/70 hover:bg-white text-[#4A5568] hover:text-[#182030] border border-black/5'
                  }`}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FCD34D] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-[11px] sm:text-xs text-[#1E2638] leading-tight whitespace-nowrap">
                      Golden Hour
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#788599] font-mono leading-none mt-0.5">
                      2700K
                    </div>
                  </div>
                </button>

                {/* 2. Sunrise Bloom Orb */}
                <button
                  id="cta-lighting-sunrise-btn"
                  onClick={() => setActiveMode('sunrise')}
                  aria-label="Activate Sunrise Bloom 3200K lighting preset"
                  className={`group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeMode === 'sunrise'
                      ? 'bg-white shadow-sm ring-1.5 ring-[#182030] text-[#182030]'
                      : 'bg-white/70 hover:bg-white text-[#4A5568] hover:text-[#182030] border border-black/5'
                  }`}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#FF6B6B] to-[#FFA07A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <Sunrise className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-[11px] sm:text-xs text-[#1E2638] leading-tight whitespace-nowrap">
                      Sunrise Bloom
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#788599] font-mono leading-none mt-0.5">
                      3200K
                    </div>
                  </div>
                </button>

                {/* 3. Studio Daylight Orb */}
                <button
                  id="cta-lighting-daylight-btn"
                  onClick={() => setActiveMode('daylight')}
                  aria-label="Activate Studio Daylight 4500K lighting preset"
                  className={`group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeMode === 'daylight'
                      ? 'bg-white shadow-sm ring-1.5 ring-[#182030] text-[#182030]'
                      : 'bg-white/70 hover:bg-white text-[#4A5568] hover:text-[#182030] border border-black/5'
                  }`}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#BAE6FD] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-[11px] sm:text-xs text-[#1E2638] leading-tight whitespace-nowrap">
                      Studio Light
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#788599] font-mono leading-none mt-0.5">
                      4500K
                    </div>
                  </div>
                </button>

                {/* 4. Twilight Moon Orb */}
                <button
                  id="cta-lighting-moonlight-btn"
                  onClick={() => setActiveMode('moonlight')}
                  aria-label="Activate Moonlit Twilight 2000K lighting preset"
                  className={`group flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeMode === 'moonlight'
                      ? 'bg-white shadow-sm ring-1.5 ring-[#182030] text-[#182030]'
                      : 'bg-white/70 hover:bg-white text-[#4A5568] hover:text-[#182030] border border-black/5'
                  }`}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#818CF8] to-[#C7D2FE] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-[11px] sm:text-xs text-[#1E2638] leading-tight whitespace-nowrap">
                      Moonlit Rest
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-[#788599] font-mono leading-none mt-0.5">
                      2000K
                    </div>
                  </div>
                </button>

              </div>

              {/* Right: Real-time Lumen / Glow Intensity Slider */}
              <div className="w-full md:w-56 px-3.5 py-2.5 rounded-xl bg-white/85 border border-black/10 shadow-xs flex items-center gap-3">
                <div className="text-[11px] font-display font-semibold text-[#2D3748] whitespace-nowrap flex items-center gap-1.5">
                  <span>Glow:</span>
                  <span className="font-mono text-[#182030] font-bold bg-[#F5F2EB] px-1.5 py-0.5 rounded text-[10px] border border-black/5">
                    {glowIntensity}%
                  </span>
                </div>
                <input
                  id="cta-glow-slider"
                  type="range"
                  min="30"
                  max="100"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(Number(e.target.value))}
                  aria-label="Adjust studio glow intensity"
                  className="w-full h-1.5 bg-[#E2DBD1] rounded-lg appearance-none cursor-pointer accent-[#182030]"
                />
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* REFINED ARCHITECTURAL ATELIER ACTION DOCK */}
        {/* ========================================================================= */}
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center px-2 sm:px-0">
          
          {/* Main Sculptural Warm Travertine Action Bar */}
          <div 
            className="w-full rounded-[26px] sm:rounded-[32px] bg-[#FAF7F2]/95 backdrop-blur-2xl p-4 sm:p-5 lg:p-6 border border-[#E2D9CC] flex flex-col md:flex-row items-center justify-between gap-5 transition-all duration-300"
            style={{
              boxShadow: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.95), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.04), 0 20px 48px -12px rgba(45, 35, 25, 0.12)'
            }}
          >
            
            {/* Product Meta Left */}
            <div className="flex flex-col text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="font-display font-medium text-2xl sm:text-[26px] text-[#141A26] tracking-tight">
                  {currentPiece.name}
                </span>
                <span 
                  className="px-3.5 py-1 rounded-full text-white font-sans font-bold text-xs sm:text-sm tracking-tight shadow-xs transition-colors duration-300"
                  style={{ backgroundColor: currentFabric.priceBadgeBg }}
                >
                  ${currentPiece.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-2">
                <span 
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-black/10 shadow-xs flex-shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: currentFabric.hex }}
                />
                <p className="font-sans text-xs sm:text-sm text-[#556075] font-medium">
                  <strong className="text-[#141A26] font-semibold">{currentFabric.name}</strong> • {currentPiece.underframe}
                </p>
              </div>
            </div>

            {/* Action Buttons Right - Refined, tactile architectural controls with Dynamic Color Matching */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap justify-center w-full md:w-auto">
              
              {/* PRIMARY BUTTON: Add to Bag (Dynamic Color Matching Active Product/Fabric) */}
              <button
                id="cta-primary-acquire-btn"
                onClick={handlePrimaryBuy}
                disabled={addedAnimation}
                onMouseEnter={() => setIsHoveredPrimary(true)}
                onMouseLeave={() => setIsHoveredPrimary(false)}
                aria-label={`Add ${currentPiece.name} to shopping bag`}
                className="flex-1 sm:flex-initial h-12 min-w-[145px] flex items-center justify-center gap-2.5 px-6 sm:px-7 rounded-full font-sans font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap text-white"
                style={{
                  backgroundColor: addedAnimation 
                    ? '#2E7D52' 
                    : (isHoveredPrimary ? currentFabric.primaryBtnHover : currentFabric.primaryBtn),
                  boxShadow: addedAnimation 
                    ? '0 4px 18px rgba(46, 125, 82, 0.35)' 
                    : (isHoveredPrimary ? `0 6px 22px ${currentFabric.primaryBtnShadow}` : `0 4px 14px ${currentFabric.primaryBtnShadow}`)
                }}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* SECONDARY BUTTON: Swatches (Dynamic accent chip matching product) */}
              <button
                id="cta-order-swatch-btn"
                onClick={handleOrderSwatchKit}
                disabled={swatchOrdered}
                aria-label="Request complimentary fabric swatch kit"
                className="h-12 flex items-center justify-center gap-2 px-4 sm:px-5 rounded-full font-sans font-semibold text-xs sm:text-sm text-[#182030] bg-[#F1EBE1] hover:bg-[#E8E0D4] border border-[#D8CFC1] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),_0_1px_2px_rgba(0,0,0,0.03)] transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                {swatchOrdered ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" style={{ color: currentFabric.primaryBtn }} />
                    <span style={{ color: currentFabric.primaryBtn }}>Sent to You</span>
                  </>
                ) : (
                  <>
                    <span 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{ backgroundColor: currentFabric.accentBg, color: currentFabric.accentText }}
                    >
                      <Palette className="w-3 h-3 stroke-[2.2]" />
                    </span>
                    <span>Swatches</span>
                  </>
                )}
              </button>

              {/* DETAILS BUTTON (Tone-on-tone matching active product - zero mismatched blue!) */}
              <button
                id="cta-inspect-blueprint-btn"
                onClick={() => onOpenDetail(activeCatalogProduct)}
                aria-label={`View detailed specifications for ${currentPiece.name}`}
                className="h-12 flex items-center justify-center gap-2 px-4 sm:px-5 rounded-full bg-[#F1EBE1] hover:bg-[#E8E0D4] text-xs sm:text-sm font-sans font-semibold text-[#182030] transition-all border border-[#D8CFC1] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8),_0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <span 
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: currentFabric.accentBg, color: currentFabric.accentText }}
                >
                  <Eye className="w-3 h-3 stroke-[2.2]" />
                </span>
                <span>Details</span>
              </button>

              {/* Wishlist Button (Warm Sandstone Pill) */}
              {onToggleWishlist && (
                <button
                  id="cta-wishlist-toggle-btn"
                  onClick={() => onToggleWishlist(activeCatalogProduct)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer border flex-shrink-0 active:scale-95 ${
                    isSaved 
                      ? 'bg-[#FDF2F4] border-[#F2CCD3] text-[#D43B58]' 
                      : 'bg-[#F1EBE1] hover:bg-[#E8E0D4] text-[#556075] hover:text-[#182030] border-[#D8CFC1] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8)]'
                  }`}
                  aria-label={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
                  title={isSaved ? "Saved" : "Save"}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D43B58] text-[#D43B58]' : ''}`} />
                </button>
              )}

            </div>

          </div>

          {/* Architectural Travertine Micro Guarantees (Harmonized accents, NO blue!) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-4 px-2">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E5DDD0] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),_0_2px_8px_rgba(0,0,0,0.03)] text-xs font-semibold text-[#182030]">
              <span 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: currentFabric.accentBg, color: currentFabric.accentText }}
              >
                <Truck className="w-3 h-3 stroke-[2.2]" />
              </span>
              <span>Complimentary White-Glove Placement</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E5DDD0] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),_0_2px_8px_rgba(0,0,0,0.03)] text-xs font-semibold text-[#182030]">
              <span 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: currentFabric.accentBg, color: currentFabric.accentText }}
              >
                <ShieldCheck className="w-3 h-3 stroke-[2.2]" />
              </span>
              <span>10-Year Frame Warranty</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E5DDD0] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),_0_2px_8px_rgba(0,0,0,0.03)] text-xs font-semibold text-[#182030]">
              <span 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{ backgroundColor: currentFabric.accentBg, color: currentFabric.accentText }}
              >
                <Box className="w-3 h-3 stroke-[2.2]" />
              </span>
              <span>30-Day In-Home Trial</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
