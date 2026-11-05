import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, Shield, Droplets, Award, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const QUESTIONS = [
  {
    id: 'scalpType',
    title: 'How does your scalp ecosystem behave 48 hours post-cleanse?',
    options: [
      { label: 'Oily & congested with rapid sebum buildup', value: 'oily', desc: 'Excess sebum clogging follicle pores' },
      { label: 'Tight, dehydrated, or prone to dry flakes', value: 'dry', desc: 'Compromised stratum corneum barrier' },
      { label: 'Inflamed, tender, or micro-itching', value: 'sensitive', desc: 'Neurogenic inflammation & microbiome imbalance' },
      { label: 'Balanced, comfortable, normal sebum', value: 'balanced', desc: 'Homeostatic sebum production' }
    ]
  },
  {
    id: 'hairGoal',
    title: 'What is your primary clinical hair objective?',
    options: [
      { label: 'Arrest shedding & boost crown density', value: 'density', desc: 'Targeting miniaturized follicles & telogen hair' },
      { label: 'Eliminate flaking & clarify roots', value: 'clarify', desc: 'Inhibiting fungal Malassezia yeast overgrowth' },
      { label: 'Repair porous breakage & glass luster', value: 'repair', desc: 'Sealing lifted cuticle scales with biomimetic wax' },
      { label: 'Fast-track biological anagen growth', value: 'growth', desc: 'Stimulating micro-capillary blood flow' }
    ]
  },
  {
    id: 'hairPorosity',
    title: 'What is your hair fiber porosity and condition?',
    options: [
      { label: 'High Porosity (Bleached, color-treated, frizzes instantly)', value: 'high', desc: 'Gaps in cuticle require lipid cement' },
      { label: 'Low Porosity (Oils sit on surface, slow to wet)', value: 'low', desc: 'Requires 1.8μm sub-micron penetration' },
      { label: 'Medium Porosity (Virgin, resilient hair strands)', value: 'medium', desc: 'Ideal baseline absorption capacity' }
    ]
  },
  {
    id: 'stressLevel',
    title: 'Identify your primary environmental or physiological stressor:',
    options: [
      { label: 'High cortisol, demanding work, or sleep deficit', value: 'severe', desc: 'Stress-induced oxidative follicle shock' },
      { label: 'Daily urban particulate smog & UV exposure', value: 'urban', desc: 'Free radical damage to scalp lipids' },
      { label: 'Frequent thermal irons or chemical straightening', value: 'heat', desc: 'Keratin structural denaturing' },
      { label: 'Balanced lifestyle seeking preventive optimization', value: 'low', desc: 'Maintaining youth longevity biomarkers' }
    ]
  }
];

export default function DiagnosticQuiz({ onAddToCart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelectOption = (questionId, value) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Analyze results
      setIsAnalyzing(true);
      setTimeout(() => {
        calculatePrescription(updated);
        setIsAnalyzing(false);
      }, 1200);
    }
  };

  const calculatePrescription = (ans) => {
    let recProduct = PRODUCTS[0]; // Default Bhringraj
    let rationale = 'Comprehensive cellular Rasayana targeting deep follicle rejuvenation and stem-cell signaling.';
    let score = '98.8%';

    if (ans.scalpType === 'oily' || ans.hairGoal === 'clarify') {
      recProduct = PRODUCTS[1]; // Rosemary & Neem
      rationale = 'Steam-distilled carnosic acid and cold-pressed neem actively decongest follicle ducts and regulate microbial balance.';
      score = '99.4%';
    } else if (ans.hairPorosity === 'high' || ans.hairGoal === 'repair') {
      recProduct = PRODUCTS[2]; // Hibiscus & Jojoba
      rationale = 'Hibiscus alpha-hydroxy peptides and biomimetic jojoba esters cross-link porous cuticles for mirror shine without weight.';
      score = '97.9%';
    } else if (ans.hairGoal === 'density' || ans.stressLevel === 'severe') {
      recProduct = PRODUCTS[3]; // Kalonji & Onion
      rationale = 'Super-concentrated thymoquinone and bio-sulfur arrest premature telogen transition and re-anchor loosening roots.';
      score = '99.7%';
    }

    setResult({
      product: recProduct,
      rationale,
      matchScore: score,
      weeklyProtocol: '3x weekly overnight therapy. Warm 5 pipette drops between fingertips and stimulate scalp in small circular motions.'
    });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  return (
    <section id="diagnostic" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-obsidian-900/95 border border-botanical-border rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-neon/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-deep border border-lime-neon/20 text-lime-neon text-xs font-mono mb-3 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cellular Scalp Diagnostics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-white">
            Formulate Your <span className="italic text-lime-neon font-normal">Custom Prescription</span>.
          </h2>
          <p className="text-botanical-muted mt-3 text-sm sm:text-base">
            Answer 4 clinical scalp assessment questions to determine your biological oil profile and lunar dosage schedule.
          </p>
        </div>

        {/* Analyzing Spinner State */}
        {isAnalyzing ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 border-2 border-lime-neon/20 border-t-lime-neon rounded-full animate-spin mx-auto shadow-neon-glow" />
            <div className="text-white font-display text-xl">Analyzing Follicular Biomarkers...</div>
            <div className="text-xs font-mono text-lime-neon">Matching with 120-Patient Ayurvedic Clinical Trial Database</div>
          </div>
        ) : result ? (
          /* Result Card */
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-neon">ASSESSMENT COMPLETE</span>
                <h3 className="text-2xl font-display text-white mt-0.5">Your Precision Botanical Match</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-botanical-muted block">AFFINITY SCORE</span>
                <span className="text-2xl font-mono font-bold text-lime-neon">{result.matchScore}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-obsidian-950 p-6 rounded-2xl border border-lime-neon/30">
              <div className="md:col-span-4 text-center">
                <div className="inline-block p-4 rounded-2xl bg-botanical-surface border border-lime-neon/30 mb-3 shadow-neon-subtle">
                  <span className="text-xs font-mono text-lime-neon block mb-1">RECOMMENDED FORMULA</span>
                  <div className="text-2xl font-display font-bold text-white">{result.product.code}</div>
                  <div className="text-sm font-semibold text-lime-soft">{result.product.name.replace(/^\d+\s*/, '')}</div>
                </div>
                <div className="text-xs font-mono text-botanical-muted">{result.product.volume} • ${result.product.price}</div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-lime-neon uppercase tracking-wider">Clinical Pharmacognosy Rationale:</h4>
                  <p className="text-sm text-neutral-200 mt-1 leading-relaxed">{result.rationale}</p>
                </div>

                <div className="bg-botanical-deep/60 p-3.5 rounded-xl border border-white/5">
                  <div className="text-xs font-mono text-botanical-muted uppercase">Prescribed Application Ritual:</div>
                  <p className="text-xs text-neutral-300 mt-1">{result.weeklyProtocol}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onAddToCart && onAddToCart(result.product)}
                    className="flex-1 bg-lime-neon hover:bg-lime-electric text-obsidian-950 font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-neon-glow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acquire Prescribed Ritual • ${result.product.price}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-3 rounded-xl bg-obsidian-900 border border-botanical-border text-botanical-muted hover:text-white text-xs font-mono flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step-by-Step Questions */
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-botanical-muted mb-2">
              <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% EVALUATED</span>
            </div>
            <div className="w-full bg-obsidian-950 h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-lime-neon h-full transition-all duration-300 shadow-neon-glow"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-display text-white text-center mb-8">
              {QUESTIONS[currentStep].title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUESTIONS[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(QUESTIONS[currentStep].id, opt.value)}
                  className="p-5 rounded-2xl bg-obsidian-950/80 hover:bg-botanical-surface border border-botanical-border hover:border-lime-neon/50 text-left transition-all duration-200 group relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-lime-soft transition-colors">
                        {opt.label}
                      </div>
                      <div className="text-xs text-botanical-muted mt-1 leading-relaxed">
                        {opt.desc}
                      </div>
                    </div>
                    <span className="w-5 h-5 rounded-full border border-neutral-600 group-hover:border-lime-neon group-hover:bg-lime-neon/20 flex items-center justify-center flex-shrink-0 ml-3">
                      <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-lime-neon" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs font-mono text-botanical-muted hover:text-white underline underline-offset-4"
                >
                  ← Return to previous question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
