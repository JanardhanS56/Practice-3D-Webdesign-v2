import React, { useState } from 'react';
import { Microscope, Moon, Sparkles, Sprout, ArrowRight, Activity, ShieldCheck, Flame, Compass, CheckCircle } from 'lucide-react';

const JOURNEY_STAGES = [
  {
    step: '01',
    title: 'Dawn Wild Harvest',
    subtitle: 'Diurnal Photosynthetic Apex',
    location: 'Western Ghats Bio-Reserve (Elevation 1,200m)',
    icon: Sprout,
    badge: 'Solar Harvest Calibration',
    desc: 'Leaves of False Daisy (Eclipta Alba) and Bacopa Monnieri are hand-gathered exclusively between 04:30 and 06:15 AM before solar heat causes volatile terpene evaporation. Each leaf is inspected for zero pesticide residue.',
    metric: '100% Raw Bio-Living Flora',
    subMetric: '< 2 hrs harvest-to-maceration turnaround',
    interactiveType: 'harvest'
  },
  {
    step: '02',
    title: 'Copper Lunar Maceration',
    subtitle: 'Sneha Kalpana Classical Decoction',
    location: 'Sanctuary Maceration Cellar, Kerala',
    icon: Moon,
    badge: '14 Lunar Cycles (392 Days)',
    desc: 'Submerged in cold-pressed virgin black sesame and sweet almond matrix inside hand-hammered antimicrobial copper vessels. Natural copper oligodynamic ions catalyze wedelolactone stabilization without a single drop of synthetic preservative.',
    metric: 'Zero Synthetic Preservatives',
    subMetric: '42°C constant subterranean geothermal temp',
    interactiveType: 'maceration'
  },
  {
    step: '03',
    title: 'Sub-Micron Silk Decantation',
    subtitle: 'Triple Cold-Centrifugation',
    location: 'Cleanroom ISO 7 Facility',
    icon: Microscope,
    badge: '1.8 Micron Droplet Emulsion',
    desc: 'Commercial hair oils use 40-60 micron heavy lipids that merely coat the outer cuticle and suffocate the scalp pore. Our cold mechanical decantation reduces lipid clusters to 1.8 microns, allowing deep trans-epidermal penetration straight to the dermal papilla capillary network.',
    metric: '1.8μm Micro-Lipid Bioavailability',
    subMetric: 'Instant non-greasy follicle absorption',
    interactiveType: 'filtration'
  },
  {
    step: '04',
    title: 'Cellular Anagen Activation',
    subtitle: 'Clinical Trichological Efficacy',
    location: 'Double-Blind European Cohort (N=120)',
    icon: Activity,
    badge: 'Telogen Hair Shedding Arrest',
    desc: 'Phytochemical wedelolactone and carnosic acid down-regulate hair miniaturization signals (TGF-β1 and DHT binding) while stimulating VEGF to flood the follicle with oxygenated hemoglobin. Clinically verified across 90-day trichograms.',
    metric: '+41% Follicular Density',
    subMetric: '-68% Telogen Shedding in 21 days',
    interactiveType: 'clinical'
  }
];

export default function BotanicalJourney() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [comparisonMode, setComparisonMode] = useState('verite'); // 'verite' | 'commercial'
  const activeStep = JOURNEY_STAGES[activeStepIndex];

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-lime-neon/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-botanical-amber/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-deep border border-lime-neon/20 text-lime-neon text-xs font-mono mb-4 tracking-widest uppercase">
          <Microscope className="w-3.5 h-3.5" />
          <span>The Botanical Journey</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-white tracking-tight">
          From Sacred Forest to <span className="italic text-lime-neon font-normal">Cellular Core</span>.
        </h2>
        <p className="text-botanical-muted mt-4 text-base sm:text-lg leading-relaxed">
          Follow the 4-phase transformation that elevates raw Ayurvedic herbs into a clinically potent follicular elixir.
        </p>
      </div>

      {/* Interactive Step Navigator Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
        {JOURNEY_STAGES.map((stage, idx) => {
          const isActive = idx === activeStepIndex;
          const Icon = stage.icon;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative ${
                isActive
                  ? 'bg-botanical-surface border-lime-neon shadow-neon-subtle'
                  : 'bg-obsidian-900/70 border-botanical-border hover:border-lime-neon/40 hover:bg-botanical-deep/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isActive ? 'bg-lime-neon text-obsidian-950' : 'bg-obsidian-950 text-neutral-400'
                }`}>
                  Phase {stage.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-lime-neon' : 'text-neutral-500'}`} />
              </div>
              <div className="text-sm sm:text-base font-semibold text-white font-display line-clamp-1">{stage.title}</div>
              <div className="text-xs text-botanical-muted line-clamp-1 mt-0.5 font-mono">{stage.badge}</div>

              {isActive && (
                <div className="absolute -bottom-px left-6 right-6 h-0.5 bg-lime-neon shadow-neon-glow" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Stage Card */}
      <div className="bg-obsidian-900/90 rounded-3xl border border-botanical-border p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-lime-neon px-2.5 py-1 rounded-full bg-botanical-deep border border-lime-neon/20">
                PHASE {activeStep.step} / 04
              </span>
              <span className="text-xs font-mono text-botanical-muted flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-lime-neon" />
                {activeStep.location}
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-display font-light text-white">
                {activeStep.title}: <span className="italic text-neutral-300 font-normal">{activeStep.subtitle}</span>
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
                {activeStep.desc}
              </p>
            </div>

            {/* Metrics Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5">
                <div className="text-xs font-mono text-botanical-muted uppercase">Clinical Standard</div>
                <div className="text-xl font-display font-bold text-lime-neon mt-1">{activeStep.metric}</div>
              </div>
              <div className="bg-obsidian-950/80 p-4 rounded-xl border border-white/5">
                <div className="text-xs font-mono text-botanical-muted uppercase">Operational Precision</div>
                <div className="text-sm font-mono text-neutral-300 mt-1.5">{activeStep.subMetric}</div>
              </div>
            </div>

            {/* Forward Navigation */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STAGES.length)}
                className="inline-flex items-center gap-2 text-xs font-mono text-lime-neon hover:text-lime-electric transition-colors group cursor-pointer"
              >
                <span>Advance to Phase {JOURNEY_STAGES[(activeStepIndex + 1) % JOURNEY_STAGES.length].step}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Interactive Simulation / Micro-Graphic */}
          <div className="lg:col-span-5 bg-obsidian-950 rounded-2xl border border-botanical-border p-6 flex flex-col justify-between h-[360px] relative overflow-hidden">
            {/* Visual simulation based on step */}
            {activeStep.interactiveType === 'filtration' ? (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-botanical-muted">DROPLET SIZE COMPARISON</span>
                    <span className="text-lime-neon font-bold">1.8μm vs 50μm</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      onClick={() => setComparisonMode('verite')}
                      className={`py-1.5 text-xs font-mono rounded-lg transition-all ${
                        comparisonMode === 'verite'
                          ? 'bg-lime-neon text-obsidian-950 font-bold'
                          : 'bg-obsidian-900 text-neutral-400'
                      }`}
                    >
                      Vérité 1.8μm
                    </button>
                    <button
                      onClick={() => setComparisonMode('commercial')}
                      className={`py-1.5 text-xs font-mono rounded-lg transition-all ${
                        comparisonMode === 'commercial'
                          ? 'bg-neutral-700 text-white font-bold'
                          : 'bg-obsidian-900 text-neutral-400'
                      }`}
                    >
                      Commercial 50μm
                    </button>
                  </div>
                </div>

                {/* Animated Graphic */}
                <div className="flex-1 flex items-center justify-center relative">
                  {comparisonMode === 'verite' ? (
                    <div className="text-center space-y-3">
                      <div className="relative inline-flex items-center justify-center">
                        <span className="w-20 h-20 rounded-full bg-lime-neon/20 border-2 border-lime-neon animate-ping absolute" />
                        <span className="w-10 h-10 rounded-full bg-lime-neon shadow-neon-glow flex items-center justify-center text-obsidian-950 font-mono text-[10px] font-bold">
                          1.8μm
                        </span>
                      </div>
                      <div className="text-xs text-lime-soft font-mono">Bypasses lipid barrier straight to papilla</div>
                    </div>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-24 h-24 rounded-full bg-neutral-800 border-2 border-neutral-600 flex items-center justify-center mx-auto text-neutral-400 font-mono text-xs">
                        50μm
                      </div>
                      <div className="text-xs text-neutral-400 font-mono">Trapped on surface; clogs sebum pores</div>
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-mono text-botanical-muted text-center pt-2 border-t border-white/5">
                  Microscopic cross-section under 400x polarized laser light
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-botanical-muted">ALCHEMY READOUT</span>
                  <span className="text-lime-neon flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-lime-neon animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Simulated Phyto-Gauge */}
                <div className="space-y-4 my-auto">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-300">Bioactive Retention</span>
                      <span className="text-lime-neon font-bold">99.4%</span>
                    </div>
                    <div className="w-full bg-obsidian-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-lime-neon h-full rounded-full w-[99.4%] shadow-neon-glow" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-300">Oxidation Peroxide Value</span>
                      <span className="text-lime-soft font-bold">&lt; 0.2 meq/kg</span>
                    </div>
                    <div className="w-full bg-obsidian-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-lime-soft h-full rounded-full w-[8%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-300">Wedelolactone Potency Index</span>
                      <span className="text-botanical-amber font-bold">3.8%</span>
                    </div>
                    <div className="w-full bg-obsidian-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-botanical-amber h-full rounded-full w-[85%]" />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-botanical-deep/50 rounded-xl border border-white/5 flex items-center gap-3 text-xs">
                  <ShieldCheck className="w-5 h-5 text-lime-neon flex-shrink-0" />
                  <span className="text-neutral-300">Monitored by in-house pharmacognosists</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
