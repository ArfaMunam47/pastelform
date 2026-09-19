import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, MotionValue } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  ShoppingBag, 
  X, 
  RotateCcw,
  Move3d,
  Layers,
  Sun,
  Eye,
  Maximize2
} from 'lucide-react';

export interface HeroModelItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  dimensions: string;
  material: string;
  chassis: string;
  rating: number;
  reviews: number;
  desc: string;
  tag: string;
  image: string;
  cinematicImage?: string;
  macroTexture: string;
  hotspots: {
    x: number; // percentage
    y: number; // percentage
    label: string;
    detail: string;
  }[];
  swatches: {
    name: string;
    hex: string;
    tintFilter?: string;
    accentGlow?: string;
  }[];
}

export const HERO_FLAGSHIP: HeroModelItem = {
  id: 'prod-lounge-aura',
  name: 'Aura Sculptural Velvet Lounge Chair',
  subtitle: 'Italian Rose Cotton Velvet & Cold-Cured Contour Core',
  category: 'Lounge Chairs',
  price: 1420,
  dimensions: '92 × 88 × 76 cm',
  material: 'Rose Cotton Velvet & Virgin Wool Weave (95,000 Martindale)',
  chassis: 'Solid FSC European Hardwood Subframe',
  rating: 4.98,
  reviews: 184,
  desc: 'A monument to tactile comfort and organic geometry. The Aura armchair eliminates rigid angles, cradling posture in heavy-gauge rose velvet bouclé over an anatomical cold-cured latex core.',
  tag: 'Copenhagen Master Edition',
  image: '/src/assets/isolated/clean_3d_coral_chair.png',
  cinematicImage: '/src/assets/images/cinematic_ivory_chair_1789314982155.jpg',
  macroTexture: 'Unbleached Italian virgin wool loop bouclé with tactile plush resilience, woven in Biella, Italy with natural lanolin dirt-shield treatment.',
  hotspots: [
    { x: 46, y: 32, label: 'Sculpted Lumbar Contour', detail: 'High-resilience cold-cured latex foam sculpted to cradle natural spine alignment' },
    { x: 50, y: 64, label: 'Deep Cocoon Seat', detail: '42cm low-slung ergonomic depth with multi-density comfort core and memory rebound' },
    { x: 68, y: 84, label: 'Smoked Oak Shadow Base', detail: 'Quartersawn European white oak with recessed acoustic gliders and shadow plinth' },
  ],
  swatches: [
    { name: 'Warm Cashmere Ivory', hex: '#F7F4EE', tintFilter: 'none', accentGlow: 'rgba(230, 205, 175, 0.45)' },
    { name: 'Tuscan Terracotta', hex: '#C86D51', tintFilter: 'sepia(0.35) hue-rotate(330deg) saturate(1.25)', accentGlow: 'rgba(200, 109, 81, 0.45)' },
    { name: 'Smoked Truffle Bronze', hex: '#3D332D', tintFilter: 'brightness(0.68) contrast(1.15) sepia(0.25)', accentGlow: 'rgba(61, 51, 45, 0.45)' },
    { name: 'Nordic Sage Eucalyptus', hex: '#587063', tintFilter: 'hue-rotate(85deg) saturate(0.85) brightness(0.96)', accentGlow: 'rgba(88, 112, 99, 0.45)' },
    { name: 'Champagne Ochre', hex: '#D49B53', tintFilter: 'sepia(0.4) hue-rotate(5deg) saturate(1.3) brightness(1.05)', accentGlow: 'rgba(212, 155, 83, 0.45)' }
  ]
};

interface PhotorealisticProductStageProps {
  model?: HeroModelItem;
  activeAtmospherePrimary?: string;
  activeAtmosphereAccent?: string;
  onQuickAdd?: (model: HeroModelItem, swatchIndex: number) => void;
  className?: string;
  scrollFloatY?: MotionValue<number>;
  scrollScale?: MotionValue<number>;
  scrollLightOpacity?: MotionValue<number>;
}

export const PhotorealisticProductStage: React.FC<PhotorealisticProductStageProps> = ({
  model = HERO_FLAGSHIP,
  activeAtmospherePrimary = '#D4A86A',
  activeAtmosphereAccent = '#FAF0E8',
  onQuickAdd,
  className = '',
  scrollFloatY,
  scrollScale,
  scrollLightOpacity,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt & Cursor Physics State
  const [rotateX, setRotateX] = useState(3);
  const [rotateY, setRotateY] = useState(-8);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 35 }); // percentage 0-100
  const [isHovered, setIsHovered] = useState(false);
  
  // Cinematic "Come to Us" Focus State
  const [isComingToUs, setIsComingToUs] = useState(false);
  const [arrivalLightFlash, setArrivalLightFlash] = useState(false);
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState(0);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number | null>(null);

  // Trigger cinematic lighting flash when product comes to us
  const handleBringCloser = () => {
    setIsComingToUs(true);
    setArrivalLightFlash(true);
    setTimeout(() => {
      setArrivalLightFlash(false);
    }, 900);
  };

  // Close "Come to us" on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsComingToUs(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth mouse tilt & dynamic lighting calculation
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const py = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    
    setCursorPos({ x: px, y: py });

    const normalizedX = (px - 50) / 50; // -1 to 1
    const normalizedY = (py - 50) / 50; // -1 to 1

    const ampX = isComingToUs ? 22 : 14;
    const ampY = isComingToUs ? 30 : 20;

    setRotateX(-normalizedY * ampX);
    setRotateY(normalizedX * ampY);
  }, [isComingToUs]);

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!isComingToUs) {
      setRotateX(3);
      setRotateY(-8);
      setCursorPos({ x: 50, y: 35 });
    }
  };

  const currentSwatch = model.swatches[selectedSwatchIdx] || model.swatches[0];

  return (
    <>
      {/* =========================================================================
          MAIN 3D PRODUCT STAGE WITH SCROLL-TRIGGERED REVEAL & CURSOR LIGHTING
         ========================================================================= */}
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 65, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          y: scrollFloatY,
          scale: scrollScale,
        }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        className={`relative w-full h-[480px] sm:h-[550px] lg:h-[600px] flex flex-col items-center justify-center select-none ${className}`}
      >

        {/* 1. Dynamic Volumetric Cursor-Tracking & Scroll Light Beam */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255, 250, 240, 0.95) 0%, rgba(235, 215, 185, 0.45) 32%, transparent 68%)`,
            opacity: scrollLightOpacity ? scrollLightOpacity : (isHovered ? 0.95 : 0.6)
          }}
        />

        {/* 2. Soft Ambient Warm Stage Backdrop Halo */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none -z-20 transition-all duration-700"
          style={{ 
            backgroundColor: currentSwatch.accentGlow || 'rgba(230, 205, 175, 0.45)',
            transform: `translate(${(cursorPos.x - 50) * 0.4}px, ${(cursorPos.y - 50) * 0.4}px)`
          }}
        />

        {/* =========================================================================
            ARCHITECTURAL STAGE & RAYTRACED DYNAMIC SHADOW
           ========================================================================= */}
        <div className="absolute bottom-6 sm:bottom-10 w-[76%] sm:w-[68%] lg:w-[62%] h-28 z-0 pointer-events-none flex items-center justify-center">
          
          {/* Deep Dynamic Ambient Occlusion Ground Shadow (Moves inversely to mouse) */}
          <div 
            className="w-full h-16 sm:h-20 rounded-[100%] blur-xl opacity-75 transition-transform duration-150 ease-out"
            style={{ 
              background: 'radial-gradient(ellipse at center, rgba(35, 28, 20, 0.65) 0%, rgba(45, 36, 26, 0.3) 45%, transparent 75%)',
              transform: `scale(${isHovered ? 1.06 : 1}) translate(${-rotateY * 1.8}px, ${rotateX * 0.8}px)`
            }}
          />

          {/* Secondary Soft Rim Contact Shadow */}
          <div 
            className="absolute bottom-1 w-[80%] h-8 rounded-full blur-md opacity-45 transition-transform duration-200"
            style={{ 
              background: 'radial-gradient(ellipse at center, rgba(40, 30, 22, 0.5) 0%, transparent 70%)',
              transform: `translate(${-rotateY * 0.9}px, ${rotateX * 0.4}px)`
            }}
          />

          {/* Architectural Cashmere Pedestal Glow Step */}
          <div 
            className="absolute -bottom-2 w-[90%] h-7 rounded-full blur-md opacity-35 transition-colors duration-500"
            style={{ backgroundColor: activeAtmospherePrimary }}
          />
        </div>

        {/* =========================================================================
            THE 3D PRODUCT HERO: Interactive, Cursor-Tracking, Click to Bring to Us
           ========================================================================= */}
        <div 
          onClick={handleBringCloser}
          className="group relative z-10 w-full max-w-[430px] sm:max-w-[490px] lg:max-w-[540px] h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-98"
          style={{ perspective: '1400px' }}
        >
          {/* 3D Floating Armature */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
            style={{
              transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 25 : 0}px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            
            {/* The Master Photorealistic Bouclé Chair Image */}
            <img
              src={model.image}
              alt={model.name}
              className="max-w-[88%] max-h-[88%] sm:max-w-[92%] sm:max-h-[92%] object-contain drop-shadow-2xl transition-all duration-500 pointer-events-none"
              style={{
                filter: currentSwatch.tintFilter 
                  ? `${currentSwatch.tintFilter} drop-shadow(0 30px 42px rgba(28, 22, 16, 0.35))` 
                  : 'drop-shadow(0 30px 42px rgba(28, 22, 16, 0.35))'
              }}
            />

            {/* Dynamic Specular Sheen Overlay (Moves with Cursor across the Chair) */}
            <div 
              className="absolute inset-4 rounded-3xl pointer-events-none mix-blend-overlay opacity-65 transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.15) 35%, transparent 60%)`
              }}
            />

            {/* Subtle Rim Light Edge on 3D Tilt */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `linear-gradient(${rotateY * 4 + 90}deg, rgba(255, 255, 255, 0.35) 0%, transparent 40%, rgba(255, 255, 255, 0.2) 100%)`,
                opacity: isHovered ? 0.6 : 0.15
              }}
            />

            {/* Minimalist Floating 3D Badge (Hover indicator without ugly boxes) */}
            <div className="absolute bottom-1 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-[#E8DFD2] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-xs font-semibold text-[#1C1815] pointer-events-none">
              <Move3d className="w-3.5 h-3.5 text-[#8C6A4B] animate-spin" />
              <span>Click to experience in 3D close-up</span>
              <Maximize2 className="w-3 h-3 text-[#8C6A4B]" />
            </div>

          </div>
        </div>

        {/* Clean Luxury Swatch Finishes Row Underneath */}
        <div className="absolute bottom-2 right-4 sm:right-6 z-20 flex items-center gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8DFD2] shadow-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6158] pl-2 hidden sm:inline">
            Finish:
          </span>
          {model.swatches.map((swatch, idx) => {
            const isSelected = selectedSwatchIdx === idx;
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSwatchIdx(idx);
                }}
                title={swatch.name}
                className={`group relative w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  isSelected ? 'ring-2 ring-[#1C1815] scale-110 shadow-xs' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.hex }}
              >
                {isSelected && <Check className="w-3 h-3 text-[#1C1815] drop-shadow-xs stroke-[3]" />}
              </button>
            );
          })}
        </div>

      </motion.div>

      {/* =========================================================================
          CINEMATIC "COME TO US" 3D LIGHTING & CLOSE-UP ARRIVAL EXPERIENCE
          When clicked, the product flies forward to the user with a dramatic light flash!
         ========================================================================= */}
      {isComingToUs && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-2xl bg-[#091510]/55 animate-in fade-in duration-400"
          onClick={() => setIsComingToUs(false)}
        >
          
          {/* Volumetric Arrival Light Flash Beam */}
          {arrivalLightFlash && (
            <div className="absolute inset-0 pointer-events-none z-60 bg-white/25 animate-out fade-out duration-700 backdrop-blur-xs" />
          )}

          {/* Close-Up Stage Card */}
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] rounded-[36px] bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#EAE0D0] border border-white/90 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden animate-in zoom-in-75 duration-500 ease-out text-[#1C1815]"
            onClick={(e) => e.stopPropagation()}
            onPointerMove={handlePointerMove}
          >
            
            {/* Dramatic Cinematic Spotlight Halo */}
            <div 
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[110px] pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(255, 250, 240, 0.95) 0%, ${currentSwatch.accentGlow || 'rgba(212, 168, 106, 0.5)'} 50%, transparent 80%)`
              }}
            />

            {/* Top Bar inside Close-up Card */}
            <div className="relative z-20 flex items-center justify-between pb-4 border-b border-black/5">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#8C6A4B] animate-pulse" />
                <div>
                  <h3 className="font-display text-lg sm:text-2xl text-[#1C1815] font-bold uppercase tracking-tight">
                    {model.name}
                  </h3>
                  <p className="text-xs text-[#6B5E52] font-semibold">
                    {model.subtitle} • Interactive Cinematic 3D
                  </p>
                </div>
              </div>

              {/* Step Back Button */}
              <button
                onClick={() => setIsComingToUs(false)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-[#1C1815] text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#E8DFD2]"
              >
                <span>Return to Stage</span>
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Center: Magnified Product Floating Towards Us with Raytraced Light */}
            <div 
              className="relative my-4 sm:my-6 w-full h-[320px] sm:h-[400px] flex items-center justify-center select-none"
              style={{ perspective: '1600px' }}
            >
              
              {/* Ground Shadow in close-up */}
              <div 
                className="absolute bottom-2 w-72 h-14 rounded-[100%] blur-xl opacity-60 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(35, 28, 20, 0.65) 0%, transparent 70%)',
                  transform: `translate(${-rotateY * 1.5}px, ${rotateX * 0.8}px) scale(1.15)`
                }}
              />

              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
                style={{
                  transform: `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.24)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                
                {/* Master Chair Image */}
                <img
                  src={model.image}
                  alt={model.name}
                  className="max-w-[75%] max-h-[85%] sm:max-w-[80%] sm:max-h-[90%] object-contain drop-shadow-2xl transition-all duration-300 pointer-events-none"
                  style={{
                    filter: currentSwatch.tintFilter 
                      ? `${currentSwatch.tintFilter} drop-shadow(0 35px 55px rgba(28, 22, 16, 0.4))` 
                      : 'drop-shadow(0 35px 55px rgba(28, 22, 16, 0.4))'
                  }}
                />

                {/* Cinematic Specular Spotlight Gleam over Chair */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-80"
                  style={{
                    background: `radial-gradient(circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)`
                  }}
                />

                {/* Interactive Hotspot Pins */}
                {model.hotspots.map((spot, idx) => {
                  const isActive = activeHotspotIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="absolute z-20"
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <button
                        onClick={() => setActiveHotspotIdx(isActive ? null : idx)}
                        className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/95 text-stone-900 shadow-xl hover:scale-115 active:scale-95 transition-all border border-[#E8DFD2] cursor-pointer"
                        title={spot.label}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAtmospherePrimary }} />
                        <span 
                          className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none" 
                          style={{ backgroundColor: activeAtmospherePrimary }} 
                        />
                      </button>

                      {/* Hotspot Card Flyout */}
                      {isActive && (
                        <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-64 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8DFD2] shadow-2xl text-left z-30 pointer-events-auto">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#1C1815]">{spot.label}</span>
                            <button 
                              onClick={() => setActiveHotspotIdx(null)}
                              className="text-[10px] text-stone-400 hover:text-stone-700 font-bold cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-[11px] leading-relaxed text-stone-600 font-medium">
                            {spot.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls inside Close-up */}
            <div className="relative z-20 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
              
              {/* Finish Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D332B]">
                  Finish: {currentSwatch.name}
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 border border-[#E8DFD2] shadow-xs">
                  {model.swatches.map((swatch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSwatchIdx(idx)}
                      className={`w-6 h-6 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                        selectedSwatchIdx === idx ? 'ring-2 ring-[#1C1815] scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {selectedSwatchIdx === idx && <Check className="w-3 h-3 text-[#1C1815] stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Order Action */}
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1C1815]">
                  ${model.price.toLocaleString()}
                </span>
                <button
                  onClick={() => {
                    onQuickAdd?.(model, selectedSwatchIdx);
                    setIsComingToUs(false);
                  }}
                  className="btn-cta-reference flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg active:scale-95 transition-transform cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Order Now • Free Delivery</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
