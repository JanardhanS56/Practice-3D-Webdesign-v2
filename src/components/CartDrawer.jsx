import React from 'react';
import { X, Trash2, ShieldCheck, ShoppingBag, ArrowRight, Gift, CheckCircle } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const complimentaryGiftUnlocked = subtotal >= 80;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-botanical-border shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-lime-neon" />
              <h3 className="font-display text-xl text-white font-medium">Your Botanical Ritual</h3>
              <span className="text-xs font-mono text-lime-neon px-2 py-0.5 rounded-full bg-botanical-deep border border-lime-neon/20">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-botanical-muted space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-neutral-700" />
                <p className="font-display text-lg text-white">Your ritual vessel bag is empty</p>
                <p className="text-xs font-mono">Select a handcrafted botanical formulation from our apothecary catalog.</p>
              </div>
            ) : (
              <>
                {cartItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex gap-4 p-4 rounded-2xl bg-obsidian-900 border border-botanical-border items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-lime-neon block">VESSEL {item.code}</span>
                      <h4 className="text-sm font-semibold text-white">{item.name.replace(/^\d+\s*/, '')}</h4>
                      <p className="text-xs text-botanical-muted">{item.volume}</p>
                      <div className="text-xs font-mono font-bold text-lime-soft mt-1">${item.price}</div>
                    </div>
                    <button
                      onClick={() => onRemoveItem && onRemoveItem(idx)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Complimentary Obsidian Scalp Comb Tier */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  complimentaryGiftUnlocked
                    ? 'bg-botanical-surface/60 border-lime-neon/40'
                    : 'bg-obsidian-900/40 border-dashed border-neutral-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <Gift className={`w-5 h-5 flex-shrink-0 ${complimentaryGiftUnlocked ? 'text-lime-neon' : 'text-neutral-600'}`} />
                    <div className="text-xs">
                      <div className="font-semibold text-white">
                        {complimentaryGiftUnlocked ? 'Unlocked: Carved Obsidian Scalp Comb' : 'Complimentary Scalp Comb at $80+'}
                      </div>
                      <p className="text-botanical-muted mt-0.5">
                        Hand-polished obsidian stone Gua Sha comb for cranial pressure points and lymphatic flow.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-obsidian-900/70 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span className="text-white">${subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Carbon-Neutral Sourcing Dispatch:</span>
                  <span className="text-lime-neon">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total:</span>
                  <span className="text-lime-neon">${subtotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Thank you for selecting Vérité Botanique. Your order has been registered in the botanical cellar dispatch queue.');
                  onClose();
                }}
                className="w-full bg-lime-neon hover:bg-lime-electric text-obsidian-950 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-neon-glow"
              >
                <span>Initiate Cellular Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-botanical-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-neon" />
                <span>Encrypted Apothecary Checkout • 30-Day Ritual Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
