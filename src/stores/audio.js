import { defineStore } from "pinia";
import { Howl } from "howler";
import { flowConfig, tracks } from "../flows/story";

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

export const useAudioStore = defineStore("audio", {
  state: () => ({
    enabledByUser: false,
    trackId: flowConfig.defaultTrackId,
    isPlaying: false,
    volume: 0.7,
    muted: false,
    secondsPlayed: 0,
    _howl: null,
    _tick: null
  }),
  getters: {
    currentTrack(state) {
      return tracks[state.trackId] ?? tracks[flowConfig.defaultTrackId];
    },
    canAutoplay(state) {
      return state.enabledByUser;
    }
  },
  actions: {
    userEnableAudio() {
      // Must be called from a user gesture (tap/click), otherwise mobile browsers block audio.
      this.enabledByUser = true;
    },
    setTrack(trackId, { autoplay = false } = {}) {
      if (!trackId || trackId === this.trackId) {
        if (autoplay) this.play();
        return;
      }
      this.trackId = trackId;
      this._loadTrack();
      if (autoplay) this.play();
    },
    _loadTrack() {
      this.stop(true);
      const t = this.currentTrack;
      this._howl = new Howl({
        src: [t.src],
        loop: !!t.loop,
        volume: clamp01(this.muted ? 0 : (t.volume ?? 0.6) * this.volume),
        html5: true
      });

      this.secondsPlayed = 0;
      this.isPlaying = false;
    },
    play() {
      if (!this.enabledByUser) return;
      if (!this._howl) this._loadTrack();
      if (this.isPlaying) return;
      this._howl.play();
      this.isPlaying = true;
      this._startTick();
    },
    pause() {
      if (!this._howl) return;
      this._howl.pause();
      this.isPlaying = false;
      this._stopTick();
    },
    togglePlay() {
      if (this.isPlaying) this.pause();
      else this.play();
    },
    setMuted(m) {
      this.muted = !!m;
      if (!this._howl) return;
      const t = this.currentTrack;
      this._howl.volume(clamp01(this.muted ? 0 : (t.volume ?? 0.6) * this.volume));
    },
    setVolume(v) {
      this.volume = clamp01(v);
      if (!this._howl) return;
      const t = this.currentTrack;
      this._howl.volume(clamp01(this.muted ? 0 : (t.volume ?? 0.6) * this.volume));
    },
    stop(silent = false) {
      if (this._howl) {
        try {
          this._howl.stop();
          this._howl.unload();
        } catch (e) {}
      }
      this._howl = null;
      this.isPlaying = false;
      this.secondsPlayed = 0;
      this._stopTick();
      if (!silent) this.enabledByUser = false;
    },
    _startTick() {
      this._stopTick();
      this._tick = window.setInterval(() => {
        if (this.isPlaying) this.secondsPlayed += 1;
      }, 1000);
    },
    _stopTick() {
      if (this._tick) window.clearInterval(this._tick);
      this._tick = null;
    }
  }
});
