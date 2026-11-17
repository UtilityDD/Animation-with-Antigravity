import React from 'react';
import { AbsoluteFill } from 'remotion';
import { MeeraExpression, MeeraRig, createStaticPose } from './MeeraRig';

const EXPRESSIONS: { key: MeeraExpression; label: string }[] = [
  { key: 'neutral', label: 'Neutral' },
  { key: 'curious', label: 'Curious' },
  { key: 'confused', label: 'Confused' },
  { key: 'excited', label: 'Excited' },
  { key: 'surprised', label: 'Surprised' },
  { key: 'concerned', label: 'Concerned' },
  { key: 'determined', label: 'Determined' },
  { key: 'relieved', label: 'Relieved' },
];

export const MeeraModelSheet: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #FBF5E9 0%, #F1E5CE 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#2F251B',
        padding: 48,
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>
        MEERA — CHARACTER MODEL SHEET &amp; EXPRESSION SHEET
      </div>
      <div style={{ fontSize: 15, opacity: 0.72, marginBottom: 28 }}>
        Organic anatomy, sloping shoulders, curved ribcage &amp; waist, S-spine, articulated limbs across 4 turnaround views and 8 facial expressions
      </div>

      {/* Top Row: 4 Turnaround Views */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          height: 460,
          marginBottom: 32,
        }}
      >
        {(
          [
            { view: 'front', title: 'Front View' },
            { view: 'threeQuarter', title: 'Three-Quarter View' },
            { view: 'profile', title: 'Side Profile View' },
            { view: 'back', title: 'Back View' },
          ] as const
        ).map((item) => (
          <div
            key={item.view}
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: 16,
              border: '1px solid rgba(110,80,50,0.16)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 20,
            }}
          >
            <div style={{ position: 'relative', width: 0, height: 0, marginBottom: 42 }}>
              <div style={{ transform: 'scale(1.42)', transformOrigin: '0 0' }}>
                <MeeraRig
                  pose={createStaticPose(
                    item.view,
                    item.view === 'threeQuarter' ? 'curious' : 'neutral',
                    item.view === 'threeQuarter' ? 'lens' : 'none'
                  )}
                />
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 12 }}>{item.title}</div>
          </div>
        ))}
      </div>

      {/* Bottom Row: 8 Facial Expressions */}
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>FACIAL EXPRESSION SHEET (3/4 VIEW)</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 16,
          height: 330,
        }}
      >
        {EXPRESSIONS.map((e) => (
          <div
            key={e.key}
            style={{
              backgroundColor: 'rgba(255,255,255,0.65)',
              borderRadius: 14,
              border: '1px solid rgba(110,80,50,0.15)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 14,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 0,
                height: 0,
                marginBottom: 40,
                transform: 'translate(-18px, 315px) scale(2.0)',
                transformOrigin: '0 0',
              }}
            >
              <MeeraRig pose={createStaticPose('threeQuarter', e.key)} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, zIndex: 2 }}>{e.label}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
