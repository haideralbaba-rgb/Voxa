import { ImageResponse } from 'next/og'

export const alt = 'VOXA — الفكرة تصير أثراً'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: 'radial-gradient(circle at 28% 38%, rgba(201,135,98,.22), transparent 40%), #090909',
        color: '#f0eee8',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -3 }}>VOXA</span>
          <span style={{ fontSize: 18, color: '#c98762' }}>فريق إبداعي ناشئ</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.3 }}>الفكرة تصير أثراً.</span>
          <span style={{ fontSize: 25, color: 'rgba(240,238,232,.6)' }}>هويات وتجارب بصرية تستحق أن تُرى.</span>
        </div>
        <span style={{ fontSize: 16, color: 'rgba(240,238,232,.45)' }}>VOXA · كربلاء / العراق</span>
      </div>
    ),
    { ...size },
  )
}
