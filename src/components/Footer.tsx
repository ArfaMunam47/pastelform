import React, { useState } from 'react';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { FurnitureCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: FurnitureCategory | 'All') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollToSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-black/5 pt-20 pb-14 px-4 sm:px-6 lg:px-10 bg-[#F7F4EE]"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/5">
          {/* Brand & Philosophy */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#182030]" />
              <span className="font-display text-xl font-normal tracking-[0.08em] uppercase text-[#141A26]">
                Pastel & Form
              </span>
            </div>
            <p className="font-editorial text-base sm:text-lg text-[#556075] max-w-sm mb-6 leading-relaxed">
              Curated architectural furniture monoliths designed for soft, dimensional living spaces. Crafted in limited studio runs across Milan and Copenhagen.
            </p>
            <div className="text-xs font-mono text-[#8C98AA] space-y-1">
              <div>STUDIO ARCHIVE • 2026 EDITION</div>
              <div>COPENHAGEN • MILAN • KYOTO</div>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A8598] block mb-4">
              Navigation
            </span>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('hero-showcase-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  Hero Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('featured-gallery-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  Featured Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('category-experience-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  Explore Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('signature-collection-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  Signature Collection (20 Artifacts)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('new-arrivals-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('materials-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  Material Provenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('brand-philosophy-section')}
                  className="text-[#556075] hover:text-[#141A26] transition-colors"
                >
                  Design Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Dispatch */}
          <div className="md:col-span-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7A8598] block mb-4">
              Studio Gazette
            </span>
            <p className="font-editorial text-sm text-[#556075] mb-4 leading-relaxed">
              Quarterly monograph invitations, limited textile previews, and archival exhibitions sent quietly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <input
                type="email"
                required
                placeholder="architect@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/80 border border-black/10 px-4 py-2.5 text-xs text-[#141A26] rounded-full focus:outline-none focus:ring-1 focus:ring-[#182030] placeholder:text-[#8C98AA]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#182030] text-white text-[11px] font-semibold tracking-wider uppercase hover:bg-[#2A3448] shadow-tactile transition-all self-start flex items-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#A7F3D0]" />
                    <span>Subscribed to Gazette</span>
                  </>
                ) : (
                  <>
                    <span>Join Studio Gazette</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A8598] gap-4">
          <div>
            © 2026 Pastel & Form Design Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Non-Toxic Living</span>
            <span>Zero VOC</span>
            <span>FSC Beech & Ash</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
