import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { FurnitureCategory } from '../types';

interface CategoryExperienceProps {
  selectedCategory: FurnitureCategory | 'All';
  onSelectCategory: (cat: FurnitureCategory | 'All') => void;
  onScrollToCatalog: () => void;
}

interface CategoryCardItem {
  name: FurnitureCategory;
  count: number;
  paletteTitle: string;
  paletteHex: string;
  bgSurface: string;
  borderColor: string;
  textColor: string;
  description: string;
  architecturalNote: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    name: 'Sofas',
    count: 2,
    paletteTitle: 'Soft Lilac & Mint',
    paletteHex: '#CDB9E4',
    bgSurface: 'bg-[#F2EEF8]',
    borderColor: 'border-[#E3D8F0]',
    textColor: '#5A3E7A',
    description: 'Continuous serpentine contours and modular lounge landscapes.',
    architecturalNote: 'Fluid volumes without rigid right angles'
  },
  {
    name: 'Armchairs',
    count: 2,
    paletteTitle: 'Muted Sage & Powder',
    paletteHex: '#A7C7B5',
    bgSurface: 'bg-[#EEF5F1]',
    borderColor: 'border-[#D9EAE0]',
    textColor: '#336248',
    description: 'Tactile virgin wool bouclé loungers with acoustic dampening curves.',
    architecturalNote: 'Contoured lumbar support & 360° rotation'
  },
  {
    name: 'Dining Tables',
    count: 1,
    paletteTitle: 'Warm Travertine Stone',
    paletteHex: '#E3D7C5',
    bgSurface: 'bg-[#F9F5EE]',
    borderColor: 'border-[#EFE5D6]',
    textColor: '#685133',
    description: 'Monolith Roman travertine carved with twin fluted pedestal bases.',
    architecturalNote: 'Open-pore matte honed mineral calcite'
  },
  {
    name: 'Coffee Tables',
    count: 2,
    paletteTitle: 'Powder Sky Blue',
    paletteHex: '#ADC8E0',
    bgSurface: 'bg-[#EEF4FA]',
    borderColor: 'border-[#D7E6F3]',
    textColor: '#325C7E',
    description: 'Biomorphic pebble tables with liquid-repellent satin composite.',
    architecturalNote: 'Low sightlines preserving daylight flow'
  },
  {
    name: 'Lighting',
    count: 2,
    paletteTitle: 'Peach Amber & Brass',
    paletteHex: '#F6C4A2',
    bgSurface: 'bg-[#FAF1EC]',
    borderColor: 'border-[#F2DDD2]',
    textColor: '#8C4B29',
    description: 'Hand-blown Murano opaline glass globes with warm dimming curves.',
    architecturalNote: 'Circadian 2200K sunset diffusion'
  },
  {
    name: 'Beds',
    count: 1,
    paletteTitle: 'Muted Blush & Sage',
    paletteHex: '#DEB5C8',
    bgSurface: 'bg-[#F8EFF4]',
    borderColor: 'border-[#ECD7E3]',
    textColor: '#7C3F5E',
    description: 'Floating upholstered platforms surrounded in radiused acoustic bolsters.',
    architecturalNote: 'European beech sprung dynamic slats'
  }
];

export const CategoryExperience: React.FC<CategoryExperienceProps> = ({
  selectedCategory,
  onSelectCategory,
  onScrollToCatalog
}) => {
  return (
    <section
      id="category-experience-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EEF4FA 0%, #F1F6F3 40%, #EDF5F1 100%)'
      }}
    >
      {/* Background aura */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-[#E0ECE5] blur-[120px] opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-black/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4E8863]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#556075]">
                Spatial Typology
              </span>
            </div>
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-[#141A26] tracking-tight">
              Explore by Architectural Category
            </h2>
          </div>
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md">
            Tactile pastel spaces calibrated around human proportion, domestic acoustic calmness, and honest materials.
          </p>
        </div>

        {/* 6 Tactile Pastel Category Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_ITEMS.map((item) => {
            const isSelected = selectedCategory === item.name;

            return (
              <div
                key={item.name}
                id={`cat-card-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  onSelectCategory(item.name);
                  onScrollToCatalog();
                }}
                className={`group relative rounded-[28px] p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${item.bgSurface} ${item.borderColor} hover:shadow-pastel-md hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#182030]' : ''
                }`}
                style={{
                  boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 8px 20px -8px rgba(30, 40, 50, 0.05)'
                }}
              >
                {/* Top: Swatch & Count */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-xs"
                        style={{ backgroundColor: item.paletteHex }}
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: item.textColor }}
                      >
                        {item.paletteTitle}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/80 text-[#303848] border border-black/5 shadow-xs">
                      {item.count} {item.count === 1 ? 'Archetype' : 'Archetypes'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-normal text-2xl text-[#141A26] mb-2 group-hover:translate-x-0.5 transition-transform">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="font-editorial text-sm sm:text-base text-[#556075] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Architectural Note & Arrow */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[11px] text-[#6E7B90] italic font-editorial">
                    {item.architecturalNote}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 group-hover:bg-[#182030] group-hover:text-white transition-all shadow-xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
