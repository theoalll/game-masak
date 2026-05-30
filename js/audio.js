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

  pop() {
    this.playNote(1100, 0.05, 'sine', 0.06);
  },

  page() {
    this.playNote(523, 0.08, 'sine', 0.1);
    setTimeout(() => this.playNote(784, 0.12, 'sine', 0.12), 80);
  },

  error() {
    this.playNote(440, 0.15, 'triangle', 0.12);
    setTimeout(() => this.playNote(330, 0.25, 'triangle', 0.1), 120);
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
