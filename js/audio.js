const GameAudio = {
  ctx: null,
  initialized: false,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API tidak didukung');
    }
  },

  ensureResumed() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playNote(freq, duration, type = 'sine', volume = 0.2) {
    if (!this.initialized) return;
    this.ensureResumed();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  },

  tap() {
    this.playNote(880, 0.08, 'sine', 0.12);
  },

  success() {
    this.playNote(523, 0.15, 'sine', 0.2);
    setTimeout(() => this.playNote(659, 0.15, 'sine', 0.2), 120);
    setTimeout(() => this.playNote(784, 0.3, 'sine', 0.25), 240);
  },

  complete() {
    this.playNote(523, 0.2, 'sine', 0.2);
    setTimeout(() => this.playNote(659, 0.2, 'sine', 0.2), 200);
    setTimeout(() => this.playNote(784, 0.2, 'sine', 0.2), 400);
    setTimeout(() => this.playNote(1047, 0.5, 'sine', 0.3), 600);
  },
};
