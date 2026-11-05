import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Container */}
      <div className="relative bg-obsidian-950 border border-botanical-border rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl z-10 max-h-[85vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-lime-neon" />
            <div>
              <span className="text-[10px] font-mono text-lime-neon tracking-widest uppercase">LEGAL ARCHITECTURE</span>
              <h3 className="text-2xl font-display text-white font-semibold">Privacy Policy & Data Sovereignty</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs font-mono text-botanical-muted">
          Effective Date: November 2026 • Compliant with EU GDPR, California CCPA, and Global Digital Privacy Standards
        </div>

        {/* Section 1 */}
        <div className="space-y-2">
          <h4 className="text-base font-display font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-lime-neon" />
            1. Zero Commercial Profiling & Local Processing
          </h4>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            At Vérité Botanique, we reject third-party behavioral trackers and intrusive pixel surveillance. All diagnostic questionnaire inputs (scalp sebum tendencies, porosity, lifestyle stress) are computed ephemerally in your browser session and are never sold, rented, or monetized with advertising exchanges.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-2">
          <h4 className="text-base font-display font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-lime-neon" />
            2. Personal Information Collected for Cellular Dispatch
          </h4>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            We only collect strictly necessary details when you acquire a vessel:
          </p>
          <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 ml-2 font-mono">
            <li>Delivery address and recipient coordinates for insured temperature-controlled parcel courier.</li>
            <li>Encrypted payment tokens through PCI-DSS Level 1 certified gateways (we never store raw card numbers).</li>
            <li>Email address for batch certificate transmission and botanical dispatch tracking.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h4 className="text-base font-display font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-lime-neon" />
            3. WebGL & Local Storage Cache
          </h4>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Our interactive 3D WebGL engine uses local browser GPU shaders and minimal session storage to cache high-resolution procedural label textures. These technical cookies are strictly essential for rendering performance and do not monitor your off-site browsing activities.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-2">
          <h4 className="text-base font-display font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-lime-neon" />
            4. Your Data Rights & Right to Erasure
          </h4>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            You retain full ownership of your data under GDPR Articles 15-22. To request an instant export or permanent purging of your dispatch records, contact our privacy compliance officer at <span className="text-lime-neon font-mono">compliance@veritebotanique.com</span>. All deletion tickets are resolved within 48 business hours.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-lime-neon">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted Data Fortress</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-lime-neon text-obsidian-950 font-semibold text-xs hover:bg-lime-electric transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
