// Procedural Web Audio API Sound Generator for extreme UI/UX polish
class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // AudioContext will be lazily initialized upon first interaction to comply with browser safety policies
  }

  toggle(state: boolean) {
    this.enabled = state;
    if (this.enabled && !this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn('Web Audio API not supported in this browser.', e);
      }
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && this.enabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn('Web Audio API not supported in this browser.', e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // A light, crisp mechanical bleep for hovers
  playTick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // A soft organic water bubble rising pop
  playBubble() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Randomized pitch for natural variety
    const baseFreq = 400 + Math.random() * 300;
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // Simulates a soda can opening cracking sound + instant white noise fizzing
  playCanCrack() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Crack sound (high-passed metallic thud)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    oscGain.gain.setValueAtTime(0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.2);

    // 2. High-frequency click
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'sine';
    click.frequency.setValueAtTime(3200, now);
    click.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    clickGain.gain.setValueAtTime(0.15, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    click.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    click.start();
    click.stop(now + 0.1);

    // 3. White noise fizz (carbonated bubble cascade)
    const bufferSize = this.ctx.sampleRate * 1.5; // 1.5 seconds of fizz
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(8000, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(4000, now + 1.2);
    noiseFilter.Q.setValueAtTime(1.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now); // loud snap
    noiseGain.gain.exponentialRampToValueAtTime(0.03, now + 0.2); // settle to fizz
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5); // fade out

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start();
    noise.stop(now + 1.6);
  }

  // Smooth UI slide/swoosh
  playSwoosh() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }
}

export const sfx = new SoundEngine();
