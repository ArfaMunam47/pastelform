import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroChairItem } from '../data/heroChairs';

interface HeroOrbStageProps {
  activeChair: HeroChairItem;
  onInspectProduct?: (productId: string) => void;
  isPaused?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  progress?: number;
  align?: 'left' | 'right' | 'center';
}

export const HeroOrbStage: React.FC<HeroOrbStageProps> = ({
  activeChair,
  onInspectProduct,
  onMouseEnter,
  onMouseLeave,
  align = 'center',
}) => {
  const alignmentClass =
    align === 'left'
      ? 'lg:items-start'
      : align === 'right'
      ? 'lg:items-end'
      : 'lg:items-center';

  const tagAlignmentClass =
    align === 'left'
      ? 'lg:justify-start text-left'
      : align === 'right'
      ? 'lg:justify-end text-right'
      : 'lg:justify-center text-center';

  return (
    <div
      className={`relative flex flex-col items-center ${alignmentClass} w-full select-none`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Sculptural Furniture Stage"
    >
      {/* =========================================================================
          THE LARGE COLORFUL CIRCULAR STAGE
          - Perfectly uncropped 3D chair render with transparent background
          - Fluid pastel stage gradient matching the product and box
          - Hairline rim and soft contact shadow
         ========================================================================= */}
      <div
        id="hero-circular-stage"
        onClick={() => onInspectProduct?.(activeChair.id)}
        className="relative flex items-center justify-center cursor-pointer group"
        title={`Inspect ${activeChair.name}`}
      >
        <div
          className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[290px] md:h-[290px] lg:w-[320px] lg:h-[320px] xl:w-[350px] xl:h-[350px] rounded-full relative flex items-center justify-center transition-all duration-700 ease-out shadow-[0_16px_40px_-10px_rgba(20,30,55,0.16)]"
          style={{
            background: activeChair.circleGradient,
          }}
        >
          {/* Subtle directional ambient light sheen on the circle */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 35% 26%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 65%)',
            }}
          />

          {/* Crisp, delicate hairline rim */}
          <div className="absolute inset-0 rounded-full border border-white/80 pointer-events-none shadow-inner" />

          {/* Ground contact shadow beneath chair base */}
          <div
            className="absolute bottom-[16%] w-[58%] h-8 rounded-[100%] blur-md pointer-events-none transition-opacity duration-500 opacity-35"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(15, 22, 38, 0.62) 0%, rgba(15, 22, 38, 0) 74%)',
            }}
          />

          {/*
            THE HERO FURNITURE OBJECT:
            - 100% uncropped clean 3D render without any cutout holes or artifacts
            - Snappy popLayout crossfade transition (300ms exit, 400ms enter)
            - Never gets stuck between states
          */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none z-10 p-4 sm:p-5">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeChair.id}
                initial={{
                  opacity: 0,
                  scale: 0.93,
                  x: activeChair.enterTransition.x * 0.6,
                  y: (activeChair.enterTransition.y + activeChair.yOffsetPx) * 0.6,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: [
                    activeChair.yOffsetPx - 3,
                    activeChair.yOffsetPx + 3,
                    activeChair.yOffsetPx - 3,
                  ],
                  transition: {
                    opacity: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    x: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    y: {
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.93,
                  x: activeChair.exitTransition.x * 0.6,
                  y: (activeChair.exitTransition.y + activeChair.yOffsetPx) * 0.6,
                  transition: {
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className={`relative flex items-center justify-center ${activeChair.normalizedWidth} pointer-events-auto`}
              >
                <img
                  src={activeChair.image}
                  alt={activeChair.name}
                  className="w-full h-auto max-h-[165px] sm:max-h-[195px] lg:max-h-[240px] xl:max-h-[265px] object-contain drop-shadow-[0_18px_26px_rgba(15,22,38,0.22)] drop-shadow-[0_5px_8px_rgba(15,22,38,0.10)] contrast-[1.03] saturate-[1.04] transition-transform duration-500 group-hover:scale-[1.03]"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Synchronized Minimal Product Tag beneath stage */}
      <div className={`w-full max-w-[420px] mt-2 sm:mt-2.5 flex items-center justify-center ${tagAlignmentClass}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChair.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 text-xs text-slate-600 font-medium"
          >
            <span
              className="font-mono font-bold tracking-wider"
              style={{ color: activeChair.accentColor }}
            >
              {activeChair.indexStr} / 04
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-[#161B26]">
              {activeChair.name}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              ${activeChair.price.toLocaleString()}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
