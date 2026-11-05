import React, { useState } from 'react';
import { Droplet, Sparkles, RefreshCw, Volume2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { soundscape } from '../utils/soundscape';

export default function PipetteRitual() {
  const [dropsDispensed, setDropsDispensed] = useState(0);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [absorptionLevel, setAbsorptionLevel] = useState(0);

  const handleDispenseDrop = () => {
    if (dropsDispensed >= 6) return;
    setIsSqueezing(true);
    soundscape.playDroplet();

    setTimeout(() => {
      setIsSqueezing(false);
      setDropsDispensed(prev => prev + 1);
      setAbsorptionLevel(prev => Math.min(100, prev + 18));
    }, 150);
  };

  const handleReset = () => {
    setDropsDispensed(0);
    setAbsorptionLevel(0);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-obsidian-900/90 border border-botanical-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-deep border border-lime-neon/20 text-lime-neon text-xs font-mono tracking-widest uppercase">
              <Droplet className="w-3.5 h-3.5" />
              <span>The Nightly Scalp Ritual</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-display font-light text-white">
              Calibrated Dropper <span className="italic text-lime-neon font-normal">Absorption Simulator</span>.
            </h3>

            <p className="text-botanical-muted text-sm sm:text-base leading-relaxed">
              Experience the micro-viscosity of pure unrefined botanical lipids. Unlike watery commercial tonics or heavy silicones, Vérité creates a slow-release lipid reservoir feeding the papilla throughout the 8-hour sleep cycle.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-300 pb-1 border-b border-white/5">
                <span>Recommended Nightly Dose:</span>
                <span className="text-lime-neon font-bold">4 - 6 Drops</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300 pb-1 border-b border-white/5">
                <span>Follicle Dwell Time:</span>
                <span className="text-white font-bold">Overnight (6-8 hours)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300 pb-1 border-b border-white/5">
                <span>Washout Difficulty:</span>
                <span className="text-white font-bold">Effortless rinse with mild water</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={handleDispenseDrop}
                disabled={dropsDispensed >= 6}
                className={`px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shadow-neon-glow ${
                  dropsDispensed >= 6
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5'
                    : 'bg-lime-neon hover:bg-lime-electric text-obsidian-950 cursor-pointer active:scale-95'
                }`}
              >
                <Droplet className="w-4 h-4" />
                <span>{dropsDispensed >= 6 ? 'Full Dose Reached' : 'Click to Dispense Drop'}</span>
              </button>

              {dropsDispensed > 0 && (
                <button
                  onClick={handleReset}
                  className="px-4 py-3.5 rounded-xl bg-obsidian-950 hover:bg-botanical-surface border border-botanical-border text-botanical-muted hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Pipette</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Visual Simulator Interactive Box */}
          <div className="lg:col-span-6 bg-obsidian-950 rounded-2xl border border-botanical-border p-6 flex flex-col justify-between h-[380px] relative overflow-hidden">
            {/* Visual Header */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-botanical-muted">VIRTUAL APOTHECARY PIPETTE</span>
              <span className="text-lime-neon font-bold">{dropsDispensed} / 6 DROPS CALIBRATED</span>
            </div>

            {/* Dropper & Droplet Graphics */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* Pipette Bulb & Glass Stem */}
              <div className="relative flex flex-col items-center">
                {/* Rubber bulb */}
                <div
                  onClick={handleDispenseDrop}
                  className={`w-12 h-14 rounded-t-full bg-neutral-800 border-2 border-neutral-700 cursor-pointer transition-transform ${
                    isSqueezing ? 'scale-90 bg-neutral-700' : 'hover:scale-105'
                  }`}
                  title="Click to Squeeze Bulb"
                />
                {/* Metallic Gold Ring */}
                <div className="w-10 h-3 bg-botanical-gold border border-yellow-600 rounded-sm" />
                {/* Glass Pipette Tube */}
                <div className="w-4 h-24 bg-white/20 border border-white/40 rounded-b-md relative overflow-hidden backdrop-blur-sm">
                  {/* Viscous Herbal Liquid inside tube */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-lime-neon/80 transition-all duration-300"
                    style={{ height: `${Math.max(10, 100 - dropsDispensed * 16)}%` }}
                  />
                </div>

                {/* Dropping bead */}
                {isSqueezing && (
                  <div className="w-3.5 h-5 rounded-full bg-lime-neon animate-bounce mt-2 shadow-neon-glow" />
                )}
              </div>
            </div>

            {/* Scalp Micro-Absorption Bar */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">Follicular Lipid Saturation</span>
                <span className="text-lime-neon font-bold">{absorptionLevel}%</span>
              </div>
              <div className="w-full bg-obsidian-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-lime-neon h-full transition-all duration-500 rounded-full shadow-neon-glow"
                  style={{ width: `${absorptionLevel}%` }}
                />
              </div>
              <div className="text-[11px] font-mono text-botanical-muted flex items-center justify-between">
                <span>0.05 ml precision droplet calibration</span>
                <span className="text-white">{dropsDispensed * 0.05} ml Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
