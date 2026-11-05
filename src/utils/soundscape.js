/**
 * Procedural Botanical Soundscape Synthesizer via Web Audio API.
 * Synthesizes organic rainforest ambient rain and a warm 432Hz resonant bowl tone.
 */
class BotanicalSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillator = null;
    this.noiseNode = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Master volume
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // 1. Resonant 432Hz Botanical Harmonic Tone (Ayurvedic copper vessel chime)
    this.oscillator = this.ctx.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(432, this.ctx.currentTime); // 432Hz deep meditative resonance

    // Gentle LFO tremolo
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime); // Slow breathing wave
    lfoGain.gain.setValueAtTime(2.5, this.ctx.currentTime);
    lfo.connect(this.oscillator.frequency);
    lfo.start();

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.oscillator.connect(oscGain);
    oscGain.connect(this.gainNode);
    this.oscillator.start();

    // 2. Procedural Pink Noise Filtered Rain/Drizzle
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.08;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate gentle jungle canopy rain
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.gainNode);
    whiteNoise.start();

    this.noiseNode = whiteNoise;
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
      }
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      }
    } catch (e) {
      // Ignored
    }
    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  // Play micro drop click sound on dropper action
  playDroplet() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }
}

export const soundscape = new BotanicalSoundscape();
