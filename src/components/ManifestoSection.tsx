import React from 'react';
import { ShieldCheck, Compass, Sparkles, Feather } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section
      id="brand-philosophy-section"
      className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FBF0F3 0%, #F5EDF1 40%, #F0F4EE 100%)'
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[550px] rounded-full bg-[#FCE5ED] blur-[130px] opacity-70 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#9A5B78]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#546072]">
            Studio Philosophy & Ethos
          </span>
        </div>

        <h2 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.15] text-[#141A26] tracking-tight mb-8">
          We sculpt furniture not to occupy space, but to quiet the air within it.
        </h2>

        <p className="font-editorial text-lg sm:text-2xl text-[#525E70] leading-relaxed max-w-3xl mx-auto mb-14">
          Every gentle radius curve absorbs domestic sound reflections. Every mineral hue softens direct daylight. We reject commercial obsolescence in favor of geological longevity.
        </p>

        {/* 3 Core Architectural Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div
            className="p-7 rounded-[28px] bg-white/80 border border-black/5 shadow-pastel-sm flex flex-col justify-between"
            style={{
              boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 6px 16px -6px rgba(35, 40, 45, 0.04)'
            }}
          >
            <div>
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F2E5EC] text-[#8C466A] mb-4">
                <Feather className="w-4 h-4" />
              </span>
              <h3 className="font-display font-normal text-xl text-[#141A26] mb-2">
                Pure Natural Chemistry
              </h3>
              <p className="font-editorial text-sm text-[#556075] leading-relaxed">
                Zero formaldehyde emissions, zero petroleum varnishes. Every wooden and ceramic surface is treated exclusively with cold-pressed natural linseed and beeswax.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/5 text-[10px] uppercase font-mono tracking-wider text-[#7A8598]">
              VOC-Free Certified
            </div>
          </div>

          <div
            className="p-7 rounded-[28px] bg-white/80 border border-black/5 shadow-pastel-sm flex flex-col justify-between"
            style={{
              boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 6px 16px -6px rgba(35, 40, 45, 0.04)'
            }}
          >
            <div>
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E6F0E9] text-[#366847] mb-4">
                <Compass className="w-4 h-4" />
              </span>
              <h3 className="font-display font-normal text-xl text-[#141A26] mb-2">
                Sustainably Harvested
              </h3>
              <p className="font-editorial text-sm text-[#556075] leading-relaxed">
                100% FSC-certified European beech and ash timber from managed regenerative forests in Germany and Scandinavia.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/5 text-[10px] uppercase font-mono tracking-wider text-[#7A8598]">
              100% FSC Certified
            </div>
          </div>

          <div
            className="p-7 rounded-[28px] bg-white/80 border border-black/5 shadow-pastel-sm flex flex-col justify-between"
            style={{
              boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 6px 16px -6px rgba(35, 40, 45, 0.04)'
            }}
          >
            <div>
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E5EEF5] text-[#2D5A7B] mb-4">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h3 className="font-display font-normal text-xl text-[#141A26] mb-2">
                10-Year Monolith Guarantee
              </h3>
              <p className="font-editorial text-sm text-[#556075] leading-relaxed">
                Engineered internal armatures guaranteed against frame deformation, joint failure, and foam sagging for a decade of daily living.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-black/5 text-[10px] uppercase font-mono tracking-wider text-[#7A8598]">
              Heirloom Longevity
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
