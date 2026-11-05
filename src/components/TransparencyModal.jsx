import React from 'react';
import { X, Sprout, Globe, Award, ShieldCheck, Heart, Leaf } from 'lucide-react';

export default function TransparencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <div className="relative bg-obsidian-950 border border-botanical-border rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl z-10 max-h-[85vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-lime-neon" />
            <div>
              <span className="text-[10px] font-mono text-lime-neon tracking-widest uppercase">ECOLOGICAL STEWARDSHIP</span>
              <h3 className="text-2xl font-display text-white font-semibold">Sourcing & Sustainability Monograph</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-obsidian-900 p-3.5 rounded-xl border border-white/5">
            <span className="text-lime-neon font-bold block text-base">300%</span>
            <span className="text-botanical-muted">Living-Wage Fair Trade Premium to Foraging Communities</span>
          </div>
          <div className="bg-obsidian-900 p-3.5 rounded-xl border border-white/5">
            <span className="text-lime-neon font-bold block text-base">0%</span>
            <span className="text-botanical-muted">Synthetic Petrochemicals, Plastics or Non-Biodegradables</span>
          </div>
          <div className="bg-obsidian-900 p-3.5 rounded-xl border border-white/5">
            <span className="text-lime-neon font-bold block text-base">100%</span>
            <span className="text-botanical-muted">Infinitely Recyclable UV Borosilicate Amber Glass</span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-1">Regenerative Wild Foraging Protocols</h4>
            <p>
              We harvest less than 25% of any wild botanical cluster to guarantee natural seed regeneration and ecological biodiversity in the Western Ghats mountain corridors. Every harvest cycle is supervised by native forest tribals holding centuries of hereditary botanical knowledge.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-white mb-1">Cold Geothermal Processing & Zero Carbon Footprint</h4>
            <p>
              Our maceration cellar operates at constant natural geothermal temperature without fossil-fueled artificial heating. All packaging utilizes FSC-certified recycled cotton paper pressed with algae-based non-toxic inks.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-lime-neon">
            <Award className="w-4 h-4" />
            <span>Ayush Ministry Certified Biodynamic</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-lime-neon text-obsidian-950 font-semibold text-xs hover:bg-lime-electric transition-colors"
          >
            Close Monograph
          </button>
        </div>
      </div>
    </div>
  );
}
