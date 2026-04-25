import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = window.innerWidth, H = window.innerHeight
    let mx = W / 2, my = H / 2
    let animId

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mx = e.clientX ?? e.touches?.[0]?.clientX ?? mx
      my = e.clientY ?? e.touches?.[0]?.clientY ?? my
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const r = Math.min(W, H) * 0.55
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, r)
      grd.addColorStop(0,    'rgba(100,255,218,0.045)')
      grd.addColorStop(0.35, 'rgba(13,110,153,0.025)')
      grd.addColorStop(1,    'rgba(10,25,47,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
      }}
    />
  )
}
