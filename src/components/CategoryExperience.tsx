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
  noteColor: string;
  description: string;
  architecturalNote: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    name: 'Sofas',
    count: 2,
    paletteTitle: 'Soft Lilac & Mint',
    paletteHex: '#9B6CDA',
    bgSurface: 'bg-[#E8DCF5]',
    borderColor: 'border-[#CFBAEB]',
    textColor: '#4E2A78',
    noteColor: 'text-[#5D4777]',
    description: 'Continuous serpentine contours and modular lounge landscapes.',
    architecturalNote: 'Fluid volumes without rigid right angles'
  },
  {
    name: 'Armchairs',
    count: 2,
    paletteTitle: 'Muted Sage & Powder',
    paletteHex: '#388258',
    bgSurface: 'bg-[#D7EBDD]',
    borderColor: 'border-[#B2D8BD]',
    textColor: '#205036',
    noteColor: 'text-[#2E5840]',
    description: 'Tactile virgin wool bouclé loungers with acoustic dampening curves.',
    architecturalNote: 'Contoured lumbar support & 360° rotation'
  },
  {
    name: 'Dining Tables',
    count: 1,
    paletteTitle: 'Warm Travertine Stone',
    paletteHex: '#9B733E',
    bgSurface: 'bg-[#F4E6D2]',
    borderColor: 'border-[#DFCAAA]',
    textColor: '#60431E',
    noteColor: 'text-[#6A4D27]',
    description: 'Monolith Roman travertine carved with twin fluted pedestal bases.',
    architecturalNote: 'Open-pore matte honed mineral calcite'
  },
  {
    name: 'Coffee Tables',
    count: 2,
    paletteTitle: 'Powder Sky Blue',
    paletteHex: '#2E74B0',
    bgSurface: 'bg-[#D4E6F7]',
    borderColor: 'border-[#A8CEF0]',
    textColor: '#1E4E75',
    noteColor: 'text-[#26537A]',
    description: 'Biomorphic pebble tables with liquid-repellent satin composite.',
    architecturalNote: 'Low sightlines preserving daylight flow'
  },
  {
    name: 'Lighting',
    count: 2,
    paletteTitle: 'Peach Amber & Brass',
    paletteHex: '#D96328',
    bgSurface: 'bg-[#FCE1D2]',
    borderColor: 'border-[#F7BEA3]',
    textColor: '#823712',
    noteColor: 'text-[#7A3614]',
    description: 'Hand-blown Murano opaline glass globes with warm dimming curves.',
    architecturalNote: 'Circadian 2200K sunset diffusion'
  },
  {
    name: 'Beds',
    count: 1,
    paletteTitle: 'Muted Blush & Sage',
    paletteHex: '#B8437A',
    bgSurface: 'bg-[#F7D5E5]',
    borderColor: 'border-[#E9ABCA]',
    textColor: '#6E2248',
    noteColor: 'text-[#6F294D]',
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
      {/* Background ambient soft pastel glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-[#E0ECE5] blur-[120px] opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
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
          <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-md leading-relaxed">
            Tactile pastel spaces calibrated around human proportion, domestic acoustic calmness, and honest materials.
          </p>
        </div>

        {/* 6 Rich, Clearly Appearing Pastel Category Surfaces */}
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
                className={`group relative rounded-[28px] p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${item.bgSurface} ${item.borderColor} hover:shadow-[0_16px_32px_-8px_rgba(20,28,45,0.12)] hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#182030] shadow-md' : ''
                }`}
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 8px 24px -8px rgba(30, 40, 50, 0.08)'
                }}
              >
                {/* Top: Swatch & Count */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-2xs">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-xs ring-1 ring-black/10"
                        style={{ backgroundColor: item.paletteHex }}
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: item.textColor }}
                      >
                        {item.paletteTitle}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-white/85 text-[#182030] border border-black/5 shadow-2xs">
                      {item.count} {item.count === 1 ? 'Archetype' : 'Archetypes'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-medium text-2xl sm:text-[26px] text-[#141A26] mb-2 group-hover:translate-x-0.5 transition-transform">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="font-editorial text-sm sm:text-base text-[#374151] leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Architectural Note & Arrow */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className={`text-xs italic font-editorial font-medium ${item.noteColor}`}>
                    {item.architecturalNote}
                  </span>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-[#182030] group-hover:bg-[#182030] group-hover:text-white transition-all shadow-sm active:scale-95 flex-shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
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
