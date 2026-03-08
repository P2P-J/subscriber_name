import { useRef, useCallback } from 'react'

// Generate sounds using Web Audio API (no external files needed)
export function useSoundEffects() {
  const audioCtxRef = useRef(null)

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }

  // Short tick sound during draw
  const playTick = useCallback(() => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800 + Math.random() * 400
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.05)
    } catch (e) {
      // Audio not available
    }
  }, [])

  // Winner fanfare sound
  const playFanfare = useCallback(() => {
    try {
      const ctx = getCtx()
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = freq
        osc.type = 'triangle'
        const startTime = ctx.currentTime + i * 0.15
        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5)
        osc.start(startTime)
        osc.stop(startTime + 0.5)
      })
    } catch (e) {
      // Audio not available
    }
  }, [])

  // Drumroll-like build-up
  const playDrumroll = useCallback(() => {
    try {
      const ctx = getCtx()
      const bufferSize = ctx.sampleRate * 0.03
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3
      }
      const source = ctx.createBufferSource()
      const gain = ctx.createGain()
      source.buffer = buffer
      source.connect(gain)
      gain.connect(ctx.destination)
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      source.start(ctx.currentTime)
    } catch (e) {
      // Audio not available
    }
  }, [])

  return { playTick, playFanfare, playDrumroll }
}
