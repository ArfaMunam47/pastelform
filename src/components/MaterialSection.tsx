import React from 'react';
import { Eye, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';

interface MaterialSectionProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const MaterialSection: React.FC<MaterialSectionProps> = ({
  products,
  onOpenDetail,
  onQuickAdd,
  onToggleWishlist,
  wishlistIds = []
}) => {
  const desk = products.find(p => p.id === 'prod-desk-atelier');
  const shelf = products.find(p => p.id === 'prod-shelf-column');

  const materialStories = [
    {
      title: 'Honed Roman Travertine',
      origin: 'Tivoli, Italy',
      desc: 'Unfilled open-pore natural mineral calcite that absorbs and softens interior daylight.',
      palette: '#E3D7C5'
    },
    {
      title: 'Biella Virgin Wool Bouclé',
      origin: 'Piedmont, Italy',
      desc: 'Heavy-gauge three-dimensional unbleached loop weave with 85,000 Martindale resilience.',
      palette: '#F4EDE1'
    },
    {
      title: 'Murano Opaline Glass',
      origin: 'Venice, Italy',
      desc: 'Mouth-blown double-cased acid-etched glass providing velvety 2200K diffused radiance.',
      palette: '#F7C6A5'
    },
    {
      title: 'Sustainable FSC Ash Wood',
      origin: 'Black Forest, Germany',
      desc: 'Close-grained resilient timber milled into continuous acoustic tambour slats.',
      palette: '#D8CAB3'
    }
  ];

  return (
    <section
      id="materials-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EEF4FA 0%, #F5F4EE 40%, #FCF8EB 100%)'
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full bg-[#F5EED9] blur-[120px] opacity-65 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#9E7745]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Material Provenance
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              Honest Matter & Tactile Surfaces
            </h2>
          </div>
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md">
            We avoid artificial coatings and synthetic veneers. Every grain, pore, and weave tells a geological or artisanal story.
          </p>
        </div>

        {/* 4 Tactile Material Story Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {materialStories.map((mat) => (
            <div
              key={mat.title}
              className="p-6 rounded-[28px] bg-white/80 border border-black/5 shadow-pastel-sm flex flex-col justify-between"
              style={{
                boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 6px 16px -6px rgba(30, 35, 40, 0.04)'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A8598]">
                    {mat.origin}
                  </span>
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: mat.palette }}
                  />
                </div>
                <h3 className="font-display font-normal text-xl text-[#141A26] mb-2">
                  {mat.title}
                </h3>
                <p className="font-editorial text-sm text-[#556075] leading-relaxed">
                  {mat.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 text-[11px] text-[#6E7B90] font-mono">
                100% Certified Origin
              </div>
            </div>
          ))}
        </div>

        {/* Two Featured Materiality Masterpieces: Atelier Writing Desk & Column Display Bookcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Desk Showcase */}
          {desk && (
            <div
              onClick={() => onOpenDetail(desk)}
              className="group relative rounded-[36px] bg-white/85 hover:bg-white border border-black/5 p-8 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#F7EAE3] text-[#9A563D] text-[10px] font-bold tracking-wider uppercase">
                    Soft Sage Lacquer & Ash
                  </span>
                  <span className="text-xs text-[#7A8598] font-mono">
                    Workspace Monolith
                  </span>
                </div>

                <div
                  className="relative w-full h-72 rounded-2xl bg-[#F7EAE3] flex items-center justify-center p-6 my-2 overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 8px 20px -8px rgba(45, 30, 20, 0.06)'
                  }}
                >
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-[240px] h-5 bg-[#25150E] rounded-[100%] pointer-events-none -z-10 opacity-30 blur-md"
                  />
                  <img
                    src={desk.images[0]}
                    alt={desk.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[90%] max-w-[90%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-display font-normal text-2xl text-[#141A26] mt-4">
                  {desk.name}
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#556075] mt-1">
                  {desk.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xl font-bold text-[#141A26]">
                  ${desk.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(desk, 0);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#182030] text-white hover:bg-[#2A3448] text-xs font-semibold uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Acquire Desk</span>
                </button>
              </div>
            </div>
          )}

          {/* Bookcase Showcase */}
          {shelf && (
            <div
              onClick={() => onOpenDetail(shelf)}
              className="group relative rounded-[36px] bg-white/85 hover:bg-white border border-black/5 p-8 transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#DFEAE2] text-[#3E6548] text-[10px] font-bold tracking-wider uppercase">
                    Oat Porous Limestone
                  </span>
                  <span className="text-xs text-[#7A8598] font-mono">
                    Architectural Arches
                  </span>
                </div>

                <div
                  className="relative w-full h-72 rounded-2xl bg-[#DFEAE2] flex items-center justify-center p-6 my-2 overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 8px 20px -8px rgba(30, 45, 35, 0.06)'
                  }}
                >
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-[200px] h-5 bg-[#142318] rounded-[100%] pointer-events-none -z-10 opacity-30 blur-md"
                  />
                  <img
                    src={shelf.images[0]}
                    alt={shelf.name}
                    referrerPolicy="no-referrer"
                    className="max-h-[92%] max-w-[92%] object-contain contact-shadow select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-display font-normal text-2xl text-[#141A26] mt-4">
                  {shelf.name}
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#556075] mt-1">
                  {shelf.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xl font-bold text-[#141A26]">
                  ${shelf.price.toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(shelf, 0);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#182030] text-white hover:bg-[#2A3448] text-xs font-semibold uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Acquire Shelf</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
