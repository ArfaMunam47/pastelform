import React from 'react';
import { motion } from 'motion/react';
import { Feather, Palette, Compass, ShieldCheck } from 'lucide-react';

interface EditorialFeatureSectionProps {
  onExploreCollection: () => void;
}

export const EditorialFeatureSection: React.FC<EditorialFeatureSectionProps> = ({
  onExploreCollection
}) => {
  const materials = [
    {
      name: 'Virgin Wool Bouclé',
      origin: 'Biella, Italy',
      texture: 'Plush three-dimensional loop weave',
      palette: 'Mint Whisper & Oat Milk'
    },
    {
      name: 'Honed Roman Travertine',
      origin: 'Tivoli, Italy',
      texture: 'Unfilled matte porous calcite',
      palette: 'Warm Alabaster & Cream'
    },
    {
      name: 'Mouth-Blown Opaline Glass',
      origin: 'Murano, Venice',
      texture: 'Velvety satin acid-etched finish',
      palette: 'Peach Amber & Soft Glow'
    },
    {
      name: 'Micro-Ribbed Silk Velvet',
      origin: 'Como, Italy',
      texture: 'Dense directional pile with stain-shield',
      palette: 'Lavender Dusk & Lilac Mist'
    }
  ];

  return (
    <section id="editorial-manifesto-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="glass-stage rounded-[36px] p-8 sm:p-14 lg:p-16 relative overflow-hidden">
        
        {/* Soft background aura glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E8F3EE] blur-3xl opacity-50 pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F3EBF7] blur-3xl opacity-50 pointer-events-none -z-10" />

        <div className="max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64748B] block mb-3">
            Studio Manifesto
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-[#111827] leading-[1.08] tracking-[0.02em] mb-6">
            We design furniture not to fill spaces, but to shape the air inside them.
          </h2>
          <p className="font-editorial italic text-lg sm:text-2xl text-[#525B6A] leading-relaxed mb-10">
            Every curve is an acoustic dampener. Every mineral hue softens natural daylight. Rejecting ephemeral commercial trends, our 2026 collection treats domestic seating and tables as timeless monolithic art.
          </p>
        </div>

        {/* Materiality Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-black/5">
          {materials.map((mat) => (
            <div
              key={mat.name}
              className="glass-surface-subtle p-5 rounded-2xl border border-white/90"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-1">
                {mat.origin}
              </span>
              <h4 className="font-display text-base font-medium text-[#111827] mb-1">
                {mat.name}
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-2 font-light">
                {mat.texture}
              </p>
              <div className="text-[10px] font-medium text-[#374151] pt-2 border-t border-black/5 flex items-center justify-between">
                <span>Shades</span>
                <span className="font-mono text-[#6B7280]">{mat.palette}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom studio guarantee */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-black/5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38A169]" />
            <span className="text-xs tracking-wider text-[#4A5568] uppercase font-medium">
              Carbon Neutral Logistics • Certified FSC Wood • 10-Year Monolith Guarantee
            </span>
          </div>

          <button
            id="manifesto-explore-collection-btn"
            onClick={onExploreCollection}
            className="px-6 py-2.5 rounded-full bg-[#111827] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2D3748] shadow-tactile transition-all"
          >
            Explore The 8 Pieces
          </button>
        </div>

      </div>
    </section>
  );
};
