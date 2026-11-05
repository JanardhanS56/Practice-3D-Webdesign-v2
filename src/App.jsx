import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Leaf,
  Microscope,
  Award,
  Lock,
  Compass
} from 'lucide-react';
import ThreeBottleViewer from './components/ThreeBottleViewer';
import FormulaShowcase from './components/FormulaShowcase';
import BotanicalJourney from './components/BotanicalJourney';
import PipetteRitual from './components/PipetteRitual';
import DiagnosticQuiz from './components/DiagnosticQuiz';
import CartDrawer from './components/CartDrawer';
import LabDossierModal from './components/LabDossierModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TransparencyModal from './components/TransparencyModal';
import { PRODUCTS } from './data/products';
import { soundscape } from './utils/soundscape';

export default function App() {
  const [heroProduct, setHeroProduct] = useState(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDossierProduct, setSelectedDossierProduct] = useState(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTransparencyOpen, setIsTransparencyOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleSoundscape = () => {
    const active = soundscape.toggle();
    setIsAudioActive(active);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    soundscape.playDroplet();
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubscribeNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-neutral-100 flex flex-col grain-overlay selection:bg-lime-neon selection:text-obsidian-950">
      {/* 1. Top Announcement Bar */}
      <div className="bg-botanical-deep border-b border-botanical-border/60 py-2 px-4 text-center text-xs font-mono tracking-wider text-botanical-muted flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
        <span>HARVEST 2026: 14-LUNAR COPPER CELLAR DECOCTION NOW DISPATCHING</span>
        <button
          onClick={() => setIsTransparencyOpen(true)}
          className="text-lime-neon underline underline-offset-2 hover:text-lime-electric transition-colors"
        >
          Inspect Harvest Map
        </button>
      </div>

      {/* 2. Floating Luxury Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-obsidian-950/85 backdrop-blur-xl border-b border-botanical-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-botanical-surface border border-lime-neon/40 flex items-center justify-center group-hover:border-lime-neon transition-colors shadow-neon-subtle">
              <Leaf className="w-5 h-5 text-lime-neon group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-widest text-white block">
                VÉRITÉ BOTANIQUE
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-botanical-muted block uppercase">
                Cellular Pharmacopoeia
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-300">
            <a href="#apothecary" className="hover:text-lime-neon transition-colors">The Pharmacopoeia</a>
            <a href="#journey" className="hover:text-lime-neon transition-colors">Botanical Journey</a>
            <a href="#diagnostic" className="hover:text-lime-neon transition-colors">Scalp Diagnostics</a>
            <button
              onClick={() => setSelectedDossierProduct(heroProduct)}
              className="hover:text-lime-neon transition-colors cursor-pointer"
            >
              Lab Dossier
            </button>
            <button
              onClick={() => setIsTransparencyOpen(true)}
              className="hover:text-lime-neon transition-colors cursor-pointer"
            >
              Provenance
            </button>
          </div>

          {/* Right Action Icons: Audio, Cart, Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Ambient Soundscape Toggle with live visualizer */}
            <button
              onClick={toggleSoundscape}
              title={isAudioActive ? 'Mute Rainforest & Copper Bowl Soundscape' : 'Play 432Hz Botanical Soundscape'}
              className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono transition-all ${
                isAudioActive
                  ? 'bg-botanical-surface border-lime-neon text-lime-neon shadow-neon-subtle'
                  : 'bg-obsidian-900 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-lime-neon" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">432Hz Sound</span>
              {isAudioActive && (
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 bg-lime-neon h-full animate-pulse" />
                  <span className="w-0.5 bg-lime-neon h-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-lime-neon h-3 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-obsidian-900 border border-botanical-border hover:border-lime-neon/50 transition-colors text-white"
              title="Open Ritual Bag"
            >
              <ShoppingBag className="w-4 h-4 text-lime-neon" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-lime-neon text-obsidian-950 font-mono text-[10px] font-bold flex items-center justify-center shadow-neon-glow">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 lg:hidden rounded-xl bg-obsidian-900 border border-white/10 text-neutral-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-obsidian-950 border-b border-botanical-border p-6 space-y-4 text-sm font-mono uppercase tracking-wider">
            <a
              href="#apothecary"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-300 hover:text-lime-neon"
            >
              The Pharmacopoeia
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-300 hover:text-lime-neon"
            >
              Botanical Journey
            </a>
            <a
              href="#diagnostic"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-300 hover:text-lime-neon"
            >
              Scalp Diagnostics
            </a>
            <button
              onClick={() => { setSelectedDossierProduct(heroProduct); setMobileMenuOpen(false); }}
              className="block text-left text-neutral-300 hover:text-lime-neon"
            >
              Lab Dossier
            </button>
            <button
              onClick={() => { setIsTransparencyOpen(true); setMobileMenuOpen(false); }}
              className="block text-left text-neutral-300 hover:text-lime-neon"
            >
              Provenance
            </button>
            <button
              onClick={() => { setIsPrivacyOpen(true); setMobileMenuOpen(false); }}
              className="block text-left text-neutral-300 hover:text-lime-neon"
            >
              Privacy Policy
            </button>
          </div>
        )}
      </nav>

      {/* 3. Hero Landing Section with 3D Bottle Viewport */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        {/* Glow Spheres */}
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-lime-neon/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-[380px] h-[380px] bg-botanical-amber/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 space-y-8 z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-botanical-deep border border-lime-neon/30 text-lime-neon text-xs font-mono tracking-widest uppercase shadow-neon-subtle">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bio-Cellular Ayurvedic Rasayana</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-light text-white tracking-tight leading-[1.08]">
              Cellular Longevity for the <span className="italic font-normal text-lime-neon">Scalp Follicle</span>.
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Macerated in cold-pressed virgin seed lipids over 14 lunar cycles in pure copper vats. Bioactive wedelolactone and carnosic acid triple-centrifuged to 1.8 microns for trans-epidermal root density.
            </p>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-3 gap-3 border-y border-white/10 py-5 font-mono text-xs">
              <div>
                <span className="text-xl sm:text-2xl font-display font-bold text-lime-neon block">99.4%</span>
                <span className="text-botanical-muted text-[11px]">Bioactive Potency</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-display font-bold text-white block">1.8 μm</span>
                <span className="text-botanical-muted text-[11px]">Sub-Micron Absorption</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-display font-bold text-lime-soft block">+41%</span>
                <span className="text-botanical-muted text-[11px]">Clinical Hair Density</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#apothecary"
                className="bg-lime-neon hover:bg-lime-electric text-obsidian-950 font-semibold px-7 py-4 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-neon-glow hover:scale-[1.02] cursor-pointer"
              >
                <span>Acquire Vessel • ${heroProduct.price}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#diagnostic"
                className="px-6 py-4 rounded-xl bg-botanical-deep hover:bg-botanical-surface border border-botanical-border text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-lime-neon" />
                <span>Diagnostic Scalp Quiz</span>
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-botanical-muted pt-2">
              <ShieldCheck className="w-4 h-4 text-lime-neon flex-shrink-0" />
              <span>Ayush GMP Certified • Eurofins HPLC Tested • 0% Mineral Oil</span>
            </div>
          </div>

          {/* Right Hero: High-Detail 3D Interactive Vessel Container */}
          <div className="lg:col-span-6 z-10">
            <div className="bg-obsidian-900/90 rounded-3xl border border-botanical-border p-4 sm:p-6 shadow-2xl relative h-[560px] sm:h-[640px] flex flex-col justify-between overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-neon animate-pulse" />
                  <span className="text-xs font-mono text-lime-neon font-semibold">3D INTERACTIVE VESSEL</span>
                </div>
                <button
                  onClick={() => setSelectedDossierProduct(heroProduct)}
                  className="text-xs font-mono text-botanical-muted hover:text-white underline underline-offset-4"
                >
                  View Mass-Spec Dossier
                </button>
              </div>

              {/* 3D Bottle Canvas */}
              <div className="flex-1 w-full relative">
                <ThreeBottleViewer product={heroProduct} interactive={true} />
              </div>

              {/* Footer instruction banner */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-botanical-muted z-10">
                <span>Hold & drag to rotate 360°</span>
                <span className="text-white font-bold">{heroProduct.volume}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Formulation Showcase (Multi-Bottle 3D Switching) */}
      <FormulaShowcase
        onAddToCart={handleAddToCart}
        onOpenDossier={(prod) => setSelectedDossierProduct(prod)}
      />

      {/* 5. 3D Botanical Journey & Scrollytelling Sequence */}
      <BotanicalJourney />

      {/* 6. Pipette Scalp Ritual Simulator */}
      <PipetteRitual />

      {/* 7. Diagnostic Scalp Quiz */}
      <DiagnosticQuiz onAddToCart={handleAddToCart} />

      {/* 8. Trichology Reviews & Efficacy Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-botanical-border/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-deep border border-lime-neon/20 text-lime-neon text-xs font-mono mb-4 tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Clinical Verification</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-white">
            Peer-Reviewed <span className="italic text-lime-neon font-normal">Trichology Results</span>.
          </h2>
          <p className="text-botanical-muted mt-3 text-sm sm:text-base">
            Documented through polarized epiluminescence dermoscopy over 12 weeks of nightly use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-obsidian-900/80 border border-botanical-border p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-lime-neon">
              {'★'.repeat(5)}
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
              "In clinical trichology, mineral-oil-heavy formulas suffocate follicle respiration. Vérité's 1.8μm cold-decanted lipid emulsion achieves genuine trans-follicular bioavailability. Shedding counts reduced by 70% in my patient cohort."
            </p>
            <div className="pt-2 border-t border-white/5">
              <div className="text-sm font-semibold text-white">Dr. Aris Thorne, MD</div>
              <div className="text-xs font-mono text-botanical-muted">Consultant Trichologist, Zurich Dermatology Center</div>
            </div>
          </div>

          <div className="bg-obsidian-900/80 border border-botanical-border p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-lime-neon">
              {'★'.repeat(5)}
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
              "The MahaBhringraj formula stopped post-partum diffuse shedding within 3 weeks. The 3D pipette dosing calibration prevents over-saturation, and the sensory notes of holy basil and wild mint are deeply grounding."
            </p>
            <div className="pt-2 border-t border-white/5">
              <div className="text-sm font-semibold text-white">Siddhartha K.</div>
              <div className="text-xs font-mono text-botanical-muted">Verified Apothecary Patron, London</div>
            </div>
          </div>

          <div className="bg-obsidian-900/80 border border-botanical-border p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-lime-neon">
              {'★'.repeat(5)}
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
              "As someone with bleached high-porosity hair, oil usually makes my strands greasy while the scalp remains parched. The Hibiscus Silk Nectar sealed my cuticle frizz instantly with mirror gloss."
            </p>
            <div className="pt-2 border-t border-white/5">
              <div className="text-sm font-semibold text-white">Clara V.</div>
              <div className="text-xs font-mono text-botanical-muted">Verified Apothecary Patron, Kyoto</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Newsletter Dispatch Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-botanical-border/60">
        <div className="bg-obsidian-900/90 border border-botanical-border rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs font-mono text-lime-neon tracking-widest uppercase block">
              LUNAR HARVEST DISPATCH
            </span>
            <h3 className="text-3xl font-display text-white">
              Subscribe to the Cellular Pharmacopoeia.
            </h3>
            <p className="text-botanical-muted text-xs sm:text-sm">
              Receive seasonal wild-foraging reports, lunar decantation alerts, and priority access to limited copper-vat batches.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-botanical-surface border border-lime-neon/40 text-xs font-mono text-lime-soft animate-fade-in">
                ✓ Dispatch confirmed. Your seasonal lunar calendar will arrive shortly.
              </div>
            ) : (
              <form onSubmit={handleSubscribeNewsletter} className="flex flex-col sm:flex-row gap-3 pt-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-4 py-3.5 rounded-xl bg-obsidian-950 border border-botanical-border text-white placeholder-neutral-500 text-xs font-mono focus:outline-none focus:border-lime-neon"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-lime-neon hover:bg-lime-electric text-obsidian-950 font-semibold text-xs font-mono transition-colors shadow-neon-glow"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10. Footer with Compliance & Sourcing Links */}
      <footer className="bg-obsidian-950 border-t border-botanical-border py-14 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono">
          <div className="space-y-3">
            <div className="font-display text-xl font-bold text-white tracking-widest">VÉRITÉ BOTANIQUE</div>
            <p className="text-botanical-muted text-[11px] leading-relaxed">
              Biodynamic cellular hair alchemy engineered in Western Ghats mountain bio-reserves. Hand-macerated in certified copper vats.
            </p>
            <div className="text-neutral-500 text-[10px]">
              © 2026 Vérité Botanique Pharmacopoeia Ltd. All rights reserved.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-lime-neon font-bold uppercase tracking-wider">Apothecary Index</div>
            <div className="flex flex-col gap-1.5 text-neutral-400">
              <a href="#apothecary" className="hover:text-white transition-colors">01 MahaBhringraj Revival</a>
              <a href="#apothecary" className="hover:text-white transition-colors">02 Rosemary & Neem Stimulator</a>
              <a href="#apothecary" className="hover:text-white transition-colors">03 Hibiscus Silk Nectar</a>
              <a href="#apothecary" className="hover:text-white transition-colors">04 Kalonji Root Density</a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-lime-neon font-bold uppercase tracking-wider">Scientific Monograph</div>
            <div className="flex flex-col gap-1.5 text-neutral-400">
              <button onClick={() => setSelectedDossierProduct(heroProduct)} className="text-left hover:text-white transition-colors">
                Eurofins HPLC Chromatography
              </button>
              <button onClick={() => setIsTransparencyOpen(true)} className="text-left hover:text-white transition-colors">
                Western Ghats Provenance Map
              </button>
              <a href="#diagnostic" className="hover:text-white transition-colors">Scalp Diagnostic Assessment</a>
              <a href="#journey" className="hover:text-white transition-colors">1.8μm Decantation Study</a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-lime-neon font-bold uppercase tracking-wider">Legal & Compliance</div>
            <div className="flex flex-col gap-1.5 text-neutral-400">
              <button onClick={() => setIsPrivacyOpen(true)} className="text-left hover:text-lime-neon transition-colors">
                Privacy Policy & Data Rights (GDPR)
              </button>
              <button onClick={() => setIsTransparencyOpen(true)} className="text-left hover:text-lime-neon transition-colors">
                Sustainability & Fair Trade Monograph
              </button>
              <span className="text-neutral-500">Ayush GMP License: AY-2026-KL-88</span>
              <span className="text-neutral-500">ISO 22716 Cosmetics Cleanroom Certified</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
      />

      <LabDossierModal
        isOpen={!!selectedDossierProduct}
        product={selectedDossierProduct}
        onClose={() => setSelectedDossierProduct(null)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <TransparencyModal
        isOpen={isTransparencyOpen}
        onClose={() => setIsTransparencyOpen(false)}
      />
    </div>
  );
}
