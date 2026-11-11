import { ImageResponse } from 'next/og'
import { profile } from '@/lib/data/profile'

export const alt = `${profile.name} — ${profile.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 72px',
          background: '#08080a',
          backgroundImage:
            'radial-gradient(circle at 18% 8%, rgba(201,102,63,0.42), transparent 46%), radial-gradient(circle at 88% 92%, rgba(76,125,146,0.34), transparent 50%)',
          color: '#f4f4f6',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 26,
              background: '#f4f4f6',
              color: '#08080a',
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            HA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>{profile.name}</span>
            <span style={{ fontSize: 16, color: 'rgba(244,244,246,0.55)' }}>{profile.role}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontSize: 26, color: '#e08a5f', letterSpacing: -0.2 }}>
            Selected work · 2016 — 2026
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: -3.6,
              maxWidth: 900,
            }}
          >
            {'Interfaces people actually remember.'}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(244,244,246,0.16)',
            paddingTop: 24,
            fontSize: 19,
            color: 'rgba(244,244,246,0.6)',
          }}
        >
          <span>{profile.email}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
