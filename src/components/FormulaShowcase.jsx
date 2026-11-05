import React, { useState } from 'react';
import ThreeBottleViewer from './ThreeBottleViewer';
import { PRODUCTS } from '../data/products';
import { ShieldCheck, Sparkles, Droplets, CheckCircle2, ChevronRight, Activity, Beaker, ShoppingBag, Info } from 'lucide-react';

export default function FormulaShowcase({ onAddToCart, onOpenDossier }) {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedDrops, setSelectedDrops] = useState(4);

  // 100ml = approx 2,000 drops
  const bottleLifespanDays = Math.round(2000 / (selectedDrops * (selectedProduct.code === '01' ? 3 : 5)));

  return (
    <section id="apothecary" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with 60|30|10 branding */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-deep border border-lime-neon/20 text-lime-neon text-xs font-mono mb-4 tracking-widest uppercase">
            <Beaker className="w-3.5 h-3.5" />
            <span>Formulation Pharmacopoeia</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight">
            Four Cellular <span className="italic text-lime-neon font-normal">Rasayanas</span>.
          </h2>
          <p className="text-botanical-muted mt-3 max-w-xl text-base sm:text-lg">
            Each formulation is single-origin cold-pressed and infused over 14 lunar cycles in sterilized copper vessels for peak phyto-potency.
          </p>
        </div>

        {/* Quick batch certification badge */}
        <div className="flex items-center gap-4 bg-obsidian-900/80 border border-botanical-border px-5 py-3 rounded-2xl backdrop-blur-md">
          <ShieldCheck className="w-6 h-6 text-lime-neon flex-shrink-0" />
          <div className="text-xs">
            <div className="text-white font-medium">100% Unadulterated Purity</div>
            <div className="text-botanical-muted font-mono">HPLC Chromatography Tested • 0% Mineral Oil</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 3D Bottle Viewport */}
        <div className="lg:col-span-7 bg-obsidian-900/90 rounded-3xl border border-botanical-border/70 p-4 sm:p-6 shadow-2xl relative overflow-hidden h-[540px] sm:h-[620px] flex flex-col justify-between">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 blur-3xl transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${selectedProduct.colorHex}, transparent 70%)`
            }}
          />

          {/* Top Label & Quick Info */}
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-lime-neon tracking-widest uppercase">
                Vessel {selectedProduct.code} of 04
              </span>
              <h3 className="text-2xl font-display font-semibold text-white mt-0.5">
                {selectedProduct.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-botanical-muted block">POTENCY</span>
              <span className="text-base font-mono font-bold text-lime-neon">{selectedProduct.potency}</span>
            </div>
          </div>

          {/* 3D Canvas Embed */}
          <div className="flex-1 w-full relative">
            <ThreeBottleViewer product={selectedProduct} interactive={true} />
          </div>

          {/* Interactive Hint & Rotate Instruction */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-botanical-muted font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-neon animate-pulse" />
              <span>Drag to rotate 360° • Click hotspots for details</span>
            </div>
            <div className="hidden sm:block">
              {selectedProduct.volume}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Bottle Selector & Scientific Breakdown */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Formula Thumbnails Selector (Interactive) */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-lime-neon uppercase tracking-wider block">
              Select Botanical Decoction:
            </span>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.map((prod) => {
                const isSelected = prod.id === selectedProduct.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'bg-botanical-surface border-lime-neon shadow-neon-subtle'
                        : 'bg-obsidian-900/80 border-botanical-border hover:border-lime-neon/40 hover:bg-botanical-deep/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-obsidian-950 text-lime-neon border border-lime-neon/30">
                        {prod.code}
                      </span>
                      <span className="text-xs font-mono text-white font-bold">${prod.price}</span>
                    </div>
                    <div className="text-sm font-semibold text-white line-clamp-1">{prod.name.replace(/^\d+\s*/, '')}</div>
                    <div className="text-[11px] text-botanical-muted line-clamp-1 mt-0.5">{prod.viscosity}</div>

                    {isSelected && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-neon" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Product Phyto-Nutrient Dossier */}
          <div className="bg-obsidian-900/90 rounded-2xl border border-botanical-border p-5 space-y-4">
            <div>
              <div className="text-xs font-mono text-botanical-muted uppercase">Target Biological Action</div>
              <p className="text-sm text-neutral-200 mt-1 leading-relaxed">
                {selectedProduct.tagline}
              </p>
            </div>

            {/* Key Actives Pills */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-lime-neon uppercase">Standardized Phytochemicals</div>
              <div className="grid grid-cols-1 gap-2">
                {selectedProduct.keyActives.slice(0, 3).map((active, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-obsidian-950/70 p-2.5 rounded-xl border border-white/5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-neon flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">{active.name}: </span>
                      <span className="text-neutral-400">{active.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Pipette Dosage & Lifespan Estimator */}
            <div className="bg-botanical-deep/80 p-4 rounded-xl border border-lime-neon/20 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-botanical-muted">INTERACTIVE DOSAGE CALIBRATOR</span>
                <span className="font-mono text-lime-neon font-bold">{selectedDrops} Drops / Ritual</span>
              </div>
              <div className="flex items-center gap-2">
                {[2, 4, 6].map((drops) => (
                  <button
                    key={drops}
                    onClick={() => setSelectedDrops(drops)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedDrops === drops
                        ? 'bg-lime-neon text-obsidian-950 font-bold shadow-neon-subtle'
                        : 'bg-obsidian-950 text-neutral-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {drops} Drops
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                <span>Vessel Longevity:</span>
                <span className="text-white font-semibold">~{bottleLifespanDays} Days of Treatment</span>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & View Full Dossier */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onAddToCart && onAddToCart(selectedProduct)}
                className="flex-1 bg-lime-neon hover:bg-lime-electric text-obsidian-950 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-neon-glow hover:shadow-neon-glow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Vessel • ${selectedProduct.price}</span>
              </button>

              <button
                onClick={() => onOpenDossier && onOpenDossier(selectedProduct)}
                title="View Full HPLC Lab Dossier"
                className="p-3.5 rounded-xl bg-obsidian-950 hover:bg-botanical-surface border border-botanical-border text-botanical-muted hover:text-white transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
