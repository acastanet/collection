export class AudioSystem {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  oscillators: OscillatorNode[] = [];
  lfo: OscillatorNode | null = null;
  lfoGain: GainNode | null = null;
  activePattern: number = -1;
  isPlaying: boolean = false;

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);
  }

  playPattern(index: number) {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.masterGain) return;
    
    // Stop previous
    this.stop();
    this.activePattern = index;
    this.isPlaying = true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(0, t);
    this.masterGain.gain.linearRampToValueAtTime(0.3, t + 1.0); // fade in

    // Generative audio parameters based on the artwork index
    const baseFreqs = [
      [55, 110, 164.81], // 0x01 - A1, A2, E3 (Orbital Decay) - Deep, resonant
      [130.81, 155.56, 196.00], // 0x02 - C3, D#3, G3 (Hypercube) - Minor chord
      [65.41, 130.81, 261.63], // 0x03 - C2, C3, C4 (Metropolis) - Octaves, structured
      [87.31, 130.81, 174.61], // 0x04 - F2, C3, F3 (Wave Interference) - Smooth
      [73.42, 110, 146.83], // 0x05 - D2, A2, D3 (Toroidal Knot) - Stable
      [146.83, 220, 293.66], // 0x06 - D3, A3, D4 (Diffusion Limited) - Higher, chaotic potential
      [98.00, 146.83, 196.00], // 0x07 - G2, D3, G3 (Neural Cellular) - Pulse
      [110, 164.81, 220], // 0x08 - A2, E3, A3 (Attractor) - Dynamic
      [123.47, 185.00, 246.94], // 0x09 - B2, F#3, B3 (Reaction Diffusion)
      [65.41, 98.00, 130.81]  // 0x0A - C2, G2, C3 (Vector Flow) - Low rumble
    ];

    const types: OscillatorType[] = ['sine', 'triangle', 'sawtooth', 'square'];
    
    // Choose frequencies based on index, loop back if out of bounds
    const freqs = baseFreqs[index % baseFreqs.length];
    
    // Create LFO
    this.lfo = this.ctx.createOscillator();
    this.lfo.type = 'sine';
    // Frequency of LFO varies based on index (0.1Hz to 1.5Hz)
    this.lfo.frequency.value = 0.1 + (index * 0.15);
    
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.value = 5; // Detune amount
    
    this.lfo.connect(this.lfoGain);
    
    freqs.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      // Alternate wave types to add harmonics
      osc.type = (i === 0 ? 'sine' : types[index % 2 + 1]) as OscillatorType;
      osc.frequency.value = freq;
      
      const panner = this.ctx!.createStereoPanner ? this.ctx!.createStereoPanner() : null;
      if (panner) {
        panner.pan.value = (i - 1) * 0.5; // Spread: -0.5, 0, 0.5
      }

      const oscGain = this.ctx!.createGain();
      oscGain.gain.value = (1 / freqs.length) * (i === 0 ? 1 : 0.4); // Fundamental louder

      // Connect LFO to detune for organic movement
      if (this.lfoGain) {
          this.lfoGain.connect(osc.detune);
      }

      if (panner) {
        osc.connect(oscGain);
        oscGain.connect(panner);
        panner.connect(this.masterGain!);
      } else {
        osc.connect(oscGain);
        oscGain.connect(this.masterGain!);
      }

      osc.start(t);
      this.oscillators.push(osc);
    });

    this.lfo.start(t);
  }

  stop() {
    if (!this.ctx || !this.masterGain || this.oscillators.length === 0) return;
    
    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
    this.masterGain.gain.linearRampToValueAtTime(0, t + 0.5);

    this.oscillators.forEach(osc => {
      osc.stop(t + 0.6);
    });
    if (this.lfo) {
        this.lfo.stop(t + 0.6);
        this.lfo = null;
    }
    this.oscillators = [];
    this.isPlaying = false;
  }
}
