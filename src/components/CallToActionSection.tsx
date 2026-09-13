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
    ambientHex: '#FFD370',
    lightAura: 'rgba(255, 215, 100, 0.75)',
    textColor: '#8A5D18',
    bgAtmosphere: 'linear-gradient(180deg, #FAF4E8 0%, #F5E8D0 50%, #ECD7B5 100%)',
    specularGradient: 'from-[#FFF8E6]/85 via-[#FFE8B3]/55 to-transparent',
    shadowColor: 'rgba(50, 32, 16, 0.32)'
  },
  sunrise: {
    id: 'sunrise',
    name: 'Sunrise Bloom',
    tag: 'Vitality Dawn',
    kelvin: '3200K Coral',
    icon: 'sunrise',
    haloClass: 'tablet-inner-glow-peach',
    ambientHex: '#FFA892',
    lightAura: 'rgba(255, 165, 140, 0.75)',
    textColor: '#A04533',
    bgAtmosphere: 'linear-gradient(180deg, #FBF0E9 0%, #F8DDD2 50%, #F0C4B4 100%)',
    specularGradient: 'from-[#FFECE5]/85 via-[#FFCCBA]/55 to-transparent',
    shadowColor: 'rgba(60, 25, 20, 0.32)'
  },
  daylight: {
    id: 'daylight',
    name: 'Studio Daylight',
    tag: 'Pure Clarity',
    kelvin: '4500K Opaline',
    icon: 'daylight',
    haloClass: 'tablet-inner-glow-white',
    ambientHex: '#BAE3FF',
    lightAura: 'rgba(195, 235, 255, 0.85)',
    textColor: '#33587A',
    bgAtmosphere: 'linear-gradient(180deg, #EFF6FB 0%, #DFEEFA 50%, #CFE2F2 100%)',
    specularGradient: 'from-[#F2F8FF]/90 via-[#D0E6FA]/55 to-transparent',
    shadowColor: 'rgba(20, 35, 55, 0.28)'
  },
  moonlight: {
    id: 'moonlight',
    name: 'Moonlit Twilight',
    tag: 'Rest & Repair',
    kelvin: '2000K Lavender',
    icon: 'moon',
    haloClass: 'tablet-inner-glow-moon',
    ambientHex: '#CAB7F5',
    lightAura: 'rgba(205, 175, 250, 0.75)',
    textColor: '#594488',
    bgAtmosphere: 'linear-gradient(180deg, #F4EDFA 0%, #E6D8F4 50%, #D5C2EB 100%)',
    specularGradient: 'from-[#F5EDFC]/85 via-[#DCC4F7]/55 to-transparent',
    shadowColor: 'rgba(38, 22, 58, 0.32)'
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
  // Sofa product to showcase
  const sofaProduct = products.find(p => p.id === 'prod-sofa-ondulation') || products.find(p => p.category === 'Sofas') || products[0];

  // Active lighting mode and intensity
  const [activeMode, setActiveMode] = useState<LightingMode>('golden');
  const [glowIntensity, setGlowIntensity] = useState<number>(85); // 30 - 100
  const [selectedFabricIdx, setSelectedFabricIdx] = useState<number>(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [swatchOrdered, setSwatchOrdered] = useState(false);

  const preset = LIGHTING_PRESETS[activeMode];

  // Multiple 3D isolated fabric perspectives for the sofa
  const fabricOptions = [
    {
      name: 'Oat Milk Bouclé',
      hex: '#EBE5DA',
      image: '/src/assets/images/isolated_wave_sofa_1789241218220.jpg',
      material: 'Unbleached Virgin Wool Bouclé'
    },
    {
      name: 'Lavender Dusk Velvet',
      hex: '#C6B5DA',
      image: '/src/assets/images/hero_curved_sofa_1789237735357.jpg',
      material: 'Italian Ribbed Silk-Velvet'
    },
    {
      name: 'Pistachio Mint Velvet',
      hex: '#C3D8C8',
      image: '/src/assets/images/pistachio_sectional_sofa_1789240230359.jpg',
      material: 'Nordic Matted Cotton Velvet'
    }
  ];

  const currentFabric = fabricOptions[selectedFabricIdx] || fabricOptions[0];
  const isSaved = wishlistIds.includes(sofaProduct.id);

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
    onQuickAdd(sofaProduct, selectedFabricIdx);
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
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden transition-colors duration-1000"
      style={{ background: preset.bgAtmosphere }}
    >
      {/* Background Dreamscape Orbs (Matching reference picture ambient atmosphere) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top ambient glow */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] transition-all duration-700 opacity-60"
          style={{ backgroundColor: preset.ambientHex }}
        />
        {/* Bottom soft aura */}
        <div 
          className="absolute -bottom-32 right-10 w-[600px] h-[450px] rounded-full blur-[120px] transition-all duration-700 opacity-50"
          style={{ backgroundColor: preset.ambientHex }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Section Header: 3D Cartoonish-Professional Fredoka Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E53945]" />
            <span className="font-display font-semibold text-xs text-[#202736] tracking-wider uppercase">
              The 2026 Centerpiece Experience
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E53945]" />
            <span className="text-xs text-[#556277]">
              Interactive Lighting Studio
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-[#141A26] text-3d-clay mb-4">
            Sculpt Your Living Space in Pure Light
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#525E72] leading-relaxed max-w-2xl mx-auto">
            Witness the <strong className="text-[#141A26] font-semibold">{sofaProduct.name}</strong> rendered as a floating 3D volume. Adjust the ambient kelvin temperature and luminous flux to preview how organic sculptural contours illuminate throughout the day.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* THE FLOATING INNER-GLOW TABLET (Directly inspired by reference image: lighting ONLY on inside border) */}
        {/* ========================================================================= */}
        <div className="relative max-w-5xl mx-auto mb-12">
          
          {/* Main Floating Tablet Frame: Clean crisp white border with premium soft shadow */}
          <div
            className={`relative rounded-[36px] sm:rounded-[46px] p-6 sm:p-10 lg:p-12 transition-all duration-700 overflow-hidden ${preset.haloClass}`}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
            }}
          >
            {/* Luminous Inner Border Glow: Running strictly along the INSIDE border edge without any outside light spill */}
            <div 
              className="absolute inset-0 rounded-[34px] sm:rounded-[44px] pointer-events-none transition-all duration-700 z-10"
              style={{
                boxShadow: `
                  inset 0 0 16px 2px ${preset.lightAura},
                  inset 0 0 ${glowIntensity * 0.6}px ${preset.lightAura},
                  inset 0 0 ${glowIntensity * 1.1}px ${preset.lightAura},
                  inset 0 2px 2px rgba(255, 255, 255, 1)
                `
              }}
            />

            {/* Inner Border Lighting Experience: Specular Inner Rim Light directly along inner perimeter */}
            <div 
              className="absolute inset-[2px] rounded-[32px] sm:rounded-[42px] pointer-events-none transition-all duration-700 z-10"
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

            {/* Tablet Header: Minimal Status Bar matching reference picture */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-black/[0.06]">
              {/* Left: Current Time & Lighting status */}
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-sm tracking-wide text-[#1A2233]">
                  0:30 PM
                </span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span className="font-display font-medium text-xs tracking-wider uppercase text-[#616E82]">
                  {preset.name} • {preset.kelvin}
                </span>
              </div>

              {/* Center: Live Lux / Lumen Index readout */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/5 shadow-xs">
                <Sliders className="w-3.5 h-3.5 text-[#E53945]" />
                <span className="text-[11px] font-semibold tracking-wider text-[#353F52] uppercase">
                  Luminous Flux: {glowIntensity}%
                </span>
              </div>

              {/* Right: Fabric Swatch Mini Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6A778B] hidden md:inline">
                  Fabric:
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 border border-black/5 shadow-xs">
                  {fabricOptions.map((fabric, idx) => (
                    <button
                      key={fabric.name}
                      id={`cta-fabric-toggle-${idx}`}
                      onClick={() => setSelectedFabricIdx(idx)}
                      title={fabric.name}
                      className={`w-5 h-5 rounded-full transition-all duration-200 border border-black/10 ${
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
            {/* 3D PRODUCT SHOWCASE: THE SOFA WITHOUT ANY BACKGROUND */}
            {/* ========================================================================= */}
            <div
              className="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dynamic 3D Contact Shadow on the Floor below (reacts to mouse tilt & light intensity) */}
              <div
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-4/5 max-w-[620px] h-12 rounded-[100%] pointer-events-none transition-all duration-300"
                style={{
                  backgroundColor: preset.shadowColor,
                  filter: `blur(${isHoveringStage ? '28px' : '20px'})`,
                  opacity: (glowIntensity / 100) * 0.75,
                  transform: `translateX(-50%) translateY(${tilt.x * 0.4}px) scale(${1 + tilt.y * 0.01})`
                }}
              />

              {/* Ambient ground reflection bounce */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/5 max-w-[420px] h-6 rounded-[100%] pointer-events-none transition-all duration-500"
                style={{
                  backgroundColor: preset.ambientHex,
                  filter: 'blur(22px)',
                  opacity: (glowIntensity / 100) * 0.6
                }}
              />

              {/* THE SOFA IN PURE 3D ISOLATION (NO BACKGROUND BOX) */}
              <div
                className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-6 transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHoveringStage ? '-10px' : '0px'}) scale(${isHoveringStage ? 1.03 : 1})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Clean 3D Product Image with Zero Background */}
                <img
                  src={currentFabric.image}
                  alt={`${sofaProduct.name} in ${currentFabric.name}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[300px] sm:max-h-[380px] lg:max-h-[420px] w-auto max-w-full object-contain select-none pointer-events-none transition-all duration-500"
                  style={{
                    mixBlendMode: 'multiply',
                    filter: `drop-shadow(0 20px 25px ${preset.shadowColor}) drop-shadow(0 4px 8px rgba(0,0,0,0.06))`
                  }}
                />

                {/* Floating 3D Spec Tag */}
                <div 
                  className="absolute top-2 left-2 sm:top-6 sm:left-6 z-20 pointer-events-none transition-opacity duration-300"
                  style={{ opacity: isHoveringStage ? 1 : 0.85 }}
                >
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-tactile">
                    <Rotate3d className="w-3.5 h-3.5 text-[#E53945]" />
                    <span className="font-display font-semibold text-[11px] text-[#1E2638] tracking-wider uppercase">
                      3D Interactive Stage
                    </span>
                  </div>
                </div>

                {/* Floating Active Fabric Badge */}
                <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-tactile">
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/10" 
                      style={{ backgroundColor: currentFabric.hex }}
                    />
                    <span className="font-display font-medium text-[11px] text-[#242C3D]">
                      {currentFabric.material}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* INTERACTIVE LIGHTING CONTROLS (Exact Celestial Orbs from reference 35377.png) */}
            {/* ========================================================================= */}
            <div className="relative z-20 pt-6 mt-4 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left: The 4 Celestial Lighting Presets */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 w-full md:w-auto">
                
                {/* 1. Golden Hour Orb */}
                <button
                  id="cta-lighting-golden-btn"
                  onClick={() => setActiveMode('golden')}
                  className={`group flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                    activeMode === 'golden'
                      ? 'bg-white shadow-pastel-md ring-2 ring-[#F59E0B]'
                      : 'bg-white/50 hover:bg-white/80 border border-black/5'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FCD34D] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                    <Sun className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-display font-semibold text-[11px] text-[#1E2638]">
                    Golden Hour
                  </span>
                  <span className="text-[10px] text-[#788599] font-medium">
                    2700K
                  </span>
                </button>

                {/* 2. Sunrise Bloom Orb */}
                <button
                  id="cta-lighting-sunrise-btn"
                  onClick={() => setActiveMode('sunrise')}
                  className={`group flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                    activeMode === 'sunrise'
                      ? 'bg-white shadow-pastel-md ring-2 ring-[#FF6B6B]'
                      : 'bg-white/50 hover:bg-white/80 border border-black/5'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF6B6B] to-[#FFA07A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                    <Sunrise className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-display font-semibold text-[11px] text-[#1E2638]">
                    Sunrise Bloom
                  </span>
                  <span className="text-[10px] text-[#788599] font-medium">
                    3200K
                  </span>
                </button>

                {/* 3. Studio Daylight Orb */}
                <button
                  id="cta-lighting-daylight-btn"
                  onClick={() => setActiveMode('daylight')}
                  className={`group flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                    activeMode === 'daylight'
                      ? 'bg-white shadow-pastel-md ring-2 ring-[#38BDF8]'
                      : 'bg-white/50 hover:bg-white/80 border border-black/5'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#BAE6FD] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-display font-semibold text-[11px] text-[#1E2638]">
                    Studio Light
                  </span>
                  <span className="text-[10px] text-[#788599] font-medium">
                    4500K
                  </span>
                </button>

                {/* 4. Twilight Moon Orb */}
                <button
                  id="cta-lighting-moonlight-btn"
                  onClick={() => setActiveMode('moonlight')}
                  className={`group flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                    activeMode === 'moonlight'
                      ? 'bg-white shadow-pastel-md ring-2 ring-[#818CF8]'
                      : 'bg-white/50 hover:bg-white/80 border border-black/5'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#818CF8] to-[#C7D2FE] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                    <Moon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-display font-semibold text-[11px] text-[#1E2638]">
                    Moonlit Rest
                  </span>
                  <span className="text-[10px] text-[#788599] font-medium">
                    2000K
                  </span>
                </button>

              </div>

              {/* Right: Real-time Lumen / Glow Intensity Slider */}
              <div className="w-full md:w-64 p-3 rounded-2xl bg-white/80 border border-black/5 shadow-xs flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-[#303848]">
                    Inner Glow Intensity
                  </span>
                  <span className="font-display font-bold text-[#E53945]">
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
                  className="w-full h-2 bg-[#E9E4DC] rounded-lg appearance-none cursor-pointer accent-[#E53945]"
                />
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* CALL TO ACTION BUTTON BAR (Exact Reference Styling: Red 3D Pill + Clay Pills) */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Main Action Pill Group */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 mb-8 w-full">
            
            {/* PRIMARY BUTTON: Reference Image "Save" Style Vibrant Coral-Red 3D Cushion Pill */}
            <button
              id="cta-primary-acquire-btn"
              onClick={handlePrimaryBuy}
              disabled={addedAnimation}
              className={`btn-cta-reference flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-white font-display font-bold text-base sm:text-lg tracking-wide ${
                addedAnimation ? 'bg-green-600' : ''
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                  <span>Acquire Wave Sofa • ${sofaProduct.price.toLocaleString()}</span>
                </>
              )}
            </button>

            {/* SECONDARY BUTTON: Tactile 3D Clay Pill from Reference Image */}
            <button
              id="cta-order-swatch-btn"
              onClick={handleOrderSwatchKit}
              disabled={swatchOrdered}
              className="btn-clay-pill flex items-center gap-2.5 px-6 sm:px-7 py-4 sm:py-4.5 rounded-full font-display font-bold text-sm sm:text-base text-[#1E2638]"
            >
              {swatchOrdered ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  <span className="text-emerald-700">Swatch Kit Dispatched</span>
                </>
              ) : (
                <>
                  <Palette className="w-4 h-4 text-[#E53945]" />
                  <span>Request Free 3D Swatch Box</span>
                </>
              )}
            </button>

            {/* TERTIARY BUTTON: Inspect Full Spec */}
            <button
              id="cta-inspect-blueprint-btn"
              onClick={() => onOpenDetail(sofaProduct)}
              className="flex items-center gap-2 px-5 py-4 sm:py-4.5 rounded-full bg-white/80 hover:bg-white text-xs font-display font-semibold text-[#485366] hover:text-[#182030] transition-all border border-black/10 shadow-xs hover:shadow-pastel-sm"
            >
              <Eye className="w-4 h-4 text-[#E53945]" />
              <span>Inspect Architecture</span>
            </button>

            {/* Wishlist Button */}
            {onToggleWishlist && (
              <button
                id="cta-wishlist-toggle-btn"
                onClick={() => onToggleWishlist(sofaProduct)}
                className={`w-12 sm:w-13 h-12 sm:h-13 rounded-full flex items-center justify-center transition-all ${
                  isSaved 
                    ? 'bg-white text-[#E53945] shadow-pastel-sm ring-2 ring-[#E53945]' 
                    : 'bg-white/85 text-[#6B788C] hover:text-[#141A26] hover:bg-white shadow-xs border border-black/5 hover:shadow-pastel-xs'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#E53945]' : ''}`} />
              </button>
            )}

          </div>

          {/* Value Props & Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl pt-6 border-t border-black/[0.07] text-center">
            
            <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/50 border border-black/5">
              <Truck className="w-4 h-4 text-[#E53945]" />
              <span className="font-display font-medium text-xs text-[#283244]">
                White-Glove Placement
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/50 border border-black/5">
              <ShieldCheck className="w-4 h-4 text-[#2E7D52]" />
              <span className="font-display font-medium text-xs text-[#283244]">
                10-Year Archival Warranty
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-white/50 border border-black/5">
              <Box className="w-4 h-4 text-[#5B60A8]" />
              <span className="font-display font-medium text-xs text-[#283244]">
                30-Day In-Home Trial
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
