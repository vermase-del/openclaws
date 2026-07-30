import React from 'react';
import { GraduationCap, Users, Heart, Globe, BookOpen } from 'lucide-react';

export default function MegaclawLogo({ showTagline = true, size = 'medium', layout = 'horizontal' }) {
  const isSmall = size === 'small';

  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      alignItems: 'center',
      gap: isSmall ? '0.5rem' : '0.85rem'
    }}>
      {/* SVG Icon Emblem */}
      <div style={{ position: 'relative', width: isSmall ? '38px' : '52px', height: isSmall ? '38px' : '52px', flexShrink: 0 }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 12px rgba(0, 198, 255, 0.35))' }}>
          <defs>
            <linearGradient id="megaclaw-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00416A" />
              <stop offset="50%" stopColor="#0052D4" />
              <stop offset="100%" stopColor="#00C6FF" />
            </linearGradient>

            <linearGradient id="megaclaw-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7971E" />
              <stop offset="100%" stopColor="#FFD200" />
            </linearGradient>

            <linearGradient id="megaclaw-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0052D4" />
              <stop offset="60%" stopColor="#00C6FF" />
              <stop offset="100%" stopColor="#E0F7FA" />
            </linearGradient>
          </defs>

          {/* Orbital Rings & Nodes */}
          <ellipse cx="100" cy="100" rx="88" ry="42" fill="none" stroke="url(#megaclaw-gold-grad)" strokeWidth="2.5" transform="rotate(-30 100 100)" strokeDasharray="6 3 12 3" />
          <ellipse cx="100" cy="100" rx="88" ry="42" fill="none" stroke="url(#megaclaw-blue-grad)" strokeWidth="2.5" transform="rotate(35 100 100)" />

          {/* 3D Star Path */}
          <path
            d="M 100,15 L 124,70 L 185,74 L 138,112 L 153,172 L 100,138 L 47,172 L 62,112 L 15,74 L 76,70 Z"
            fill="url(#megaclaw-star-grad)"
            stroke="url(#megaclaw-gold-grad)"
            strokeWidth="3"
          />

          {/* Inner Book Motif at Base */}
          <path
            d="M 68,132 Q 100,118 100,135 Q 100,118 132,132 L 130,146 Q 100,132 100,148 Q 100,132 70,146 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Human Silhouette Figure */}
          <circle cx="100" cy="85" r="10" fill="#FFFFFF" />
          <path
            d="M 82,122 C 82,105 92,96 100,96 C 108,96 118,105 118,122 L 110,122 C 110,110 104,103 100,103 C 96,103 90,110 90,122 Z"
            fill="#FFFFFF"
          />

          {/* Orbit Nodes */}
          <circle cx="100" cy="12" r="9" fill="#0052D4" stroke="#FFD200" strokeWidth="2" />
          <circle cx="24" cy="98" r="9" fill="#0052D4" stroke="#00C6FF" strokeWidth="2" />
          <circle cx="176" cy="98" r="9" fill="#F7971E" stroke="#FFD200" strokeWidth="2" />
          <circle cx="100" cy="188" r="9" fill="#0052D4" stroke="#00C6FF" strokeWidth="2" />
        </svg>

        {/* Floating Icons Over Nodes */}
        <GraduationCap size={10} style={{ position: 'absolute', top: '1px', left: '50%', transform: 'translateX(-50%)', color: '#FFF' }} />
        <Users size={10} style={{ position: 'absolute', top: '48%', left: '2px', transform: 'translateY(-50%)', color: '#FFF' }} />
        <Heart size={10} style={{ position: 'absolute', top: '48%', right: '2px', transform: 'translateY(-50%)', color: '#FFF' }} />
        <Globe size={10} style={{ position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)', color: '#FFF' }} />
      </div>

      {/* Typography Brand Block */}
      <div style={{ textAlign: layout === 'vertical' ? 'center' : 'left' }}>
        <div style={{
          fontSize: isSmall ? '1.2rem' : '1.5rem',
          fontWeight: '900',
          letterSpacing: '0.04em',
          lineHeight: '1.05',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #0052D4 0%, #00C6FF 60%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            MEGACLAW
          </span>
        </div>

        {showTagline && (
          <div style={{
            fontSize: isSmall ? '0.625rem' : '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginTop: '2px'
          }}>
            A One-Stop Multi-Solution for Students & Mankind
          </div>
        )}
      </div>
    </div>
  );
}
