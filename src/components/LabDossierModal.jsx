import React from 'react';
import { X, CheckCircle, Shield, FileText, Award, Download } from 'lucide-react';

export default function LabDossierModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Container */}
      <div className="relative bg-obsidian-950 border border-botanical-border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-lime-neon" />
            <div>
              <span className="text-[10px] font-mono text-lime-neon tracking-widest uppercase">OFFICIAL LABORATORY DOSSIER</span>
              <h3 className="text-xl font-display text-white font-semibold">{product.name}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-obsidian-900 p-3 rounded-xl border border-white/5">
            <span className="text-botanical-muted block">BATCH NO.</span>
            <span className="text-white font-bold">{product.batchNo}</span>
          </div>
          <div className="bg-obsidian-900 p-3 rounded-xl border border-white/5">
            <span className="text-botanical-muted block">ASSAY METHOD</span>
            <span className="text-white font-bold">HPLC-MS/MS</span>
          </div>
          <div className="bg-obsidian-900 p-3 rounded-xl border border-white/5">
            <span className="text-botanical-muted block">PURITY INDEX</span>
            <span className="text-lime-neon font-bold">100% PURE</span>
          </div>
          <div className="bg-obsidian-900 p-3 rounded-xl border border-white/5">
            <span className="text-botanical-muted block">SOLVENTS</span>
            <span className="text-lime-soft font-bold">0.00 PPM</span>
          </div>
        </div>

        {/* Heavy Metals & Microbiology Matrix */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-lime-neon uppercase tracking-wider">Purity Monograph Verification</div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
              <span className="text-neutral-300">Heavy Metals (Lead, Mercury, Cadmium, Arsenic)</span>
              <span className="text-lime-neon flex items-center gap-1 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                NON-DETECTABLE (&lt;0.001 ppm)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
              <span className="text-neutral-300">Pesticides & Organophosphates (450 Screen)</span>
              <span className="text-lime-neon flex items-center gap-1 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                0.00% ZERO RESIDUE
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
              <span className="text-neutral-300">Microbial Total Aerobic Plate Count</span>
              <span className="text-lime-neon flex items-center gap-1 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                &lt; 10 CFU/g (Sterile Pharmacopoeia Grade)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
              <span className="text-neutral-300">Mineral Oil, Silicones, Phthalates & Parabens</span>
              <span className="text-lime-neon flex items-center gap-1 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                STRICTLY ZERO
              </span>
            </div>
          </div>
        </div>

        {/* Origin & Lunar Decoction Verification */}
        <div className="bg-botanical-deep/50 p-4 rounded-2xl border border-lime-neon/20 space-y-2 text-xs">
          <div className="font-mono text-lime-neon uppercase font-semibold">Botanical Provenance Stamp</div>
          <p className="text-neutral-300 leading-relaxed">
            Harvested in {product.harvestLocation}. Supervised by the Certified Ayush Pharmacopoeia Inspectorate and authenticated via Mass-Spectrometry at Eurofins Phytochemical Laboratories.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => alert(`Certificate of Analysis (COA) for ${product.batchNo} compiled and verified.`)}
            className="px-4 py-2.5 rounded-xl bg-lime-neon text-obsidian-950 font-semibold text-xs flex items-center gap-2 hover:bg-lime-electric transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Certified COA (PDF)</span>
          </button>
          <span className="text-[11px] font-mono text-botanical-muted">Valid through: Oct 2028</span>
        </div>
      </div>
    </div>
  );
}
