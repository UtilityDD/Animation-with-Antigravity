import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/constants';
import { HeaderBanner } from '../components/HeaderBanner';
import { SubtitleCard } from '../components/SubtitleCard';

export const Scene8Outro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const sparkFlicker = Math.sin(frame * 0.4) > 0.3 ? 1 : 0.2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <HeaderBanner sceneTitle="দৃশ্য ০৮: সারসংক্ষেপ ও পরবর্তী পর্ব (Recap & Next Teaser)" sceneNumber={8} />

      <div
        style={{
          display: 'flex',
          gap: 36,
          width: 1400,
          height: 520,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* LEFT: VIEWER CHALLENGE QUESTION */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: THEME.colors.bgCard,
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: 24,
            padding: 36,
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(251, 191, 36, 0.15)',
                color: THEME.colors.currentAmber,
                padding: '6px 16px',
                borderRadius: 20,
                fontFamily: THEME.fonts.english,
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              COMMUNITY QUESTION
            </div>
            <div
              style={{
                fontFamily: THEME.fonts.bengali,
                fontSize: 28,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.4,
              }}
            >
              শীতকালে উলের পোশাকে হাত দিলে চটচট শব্দ বা মৃদু আলোর ঝিলিক দেখা যায় কেন?
            </div>
            <div
              style={{
                fontFamily: THEME.fonts.bengali,
                fontSize: 18,
                color: THEME.colors.textMuted,
                marginTop: 10,
              }}
            >
              এটি কি স্থির তড়িৎ (Static) নাকি চল তড়িৎ (Current)? কমেন্টে আপনার বৈজ্ঞানিক যুক্তি জানান!
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 16,
              gap: 20,
            }}
          >
            <svg width="100" height="80" viewBox="0 0 100 80">
              {/* Sweater outline */}
              <path d="M25 15 L40 28 L60 28 L75 15 L90 35 L78 45 L78 75 L22 75 L22 45 L10 35 Z" fill="#4338CA" stroke="#6366F1" strokeWidth="2" />
              {/* Static spark */}
              <path
                d="M50 40 L45 52 L55 52 L48 65 L60 48 L50 48 Z"
                fill={THEME.colors.brandCyan}
                opacity={sparkFlicker}
              />
            </svg>
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.brandCyan }}>
              ঘর্ষণজনিত চার্জের ক্ষণিক নিঃসরণ
            </div>
          </div>
        </div>

        {/* RIGHT: NEXT EPISODE PREVIEW */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(135deg, #131B2E 0%, #0F172A 100%)',
            border: `1px solid ${THEME.colors.bgCardBorder}`,
            borderRadius: 24,
            padding: 36,
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(0, 240, 255, 0.15)',
                color: THEME.colors.brandCyan,
                padding: '6px 16px',
                borderRadius: 20,
                fontFamily: THEME.fonts.english,
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              UPCOMING EPISODE 02
            </div>
            <div
              style={{
                fontFamily: THEME.fonts.bengali,
                fontSize: 34,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.3,
              }}
            >
              পরমাণু ও বৈদ্যুতিক চার্জ
            </div>
            <div
              style={{
                fontFamily: THEME.fonts.english,
                fontSize: 18,
                color: THEME.colors.brandCyan,
                marginTop: 6,
                letterSpacing: 0.5,
              }}
            >
              Atoms and Electric Charge
            </div>

            <div
              style={{
                fontFamily: THEME.fonts.bengali,
                fontSize: 18,
                color: THEME.colors.textMuted,
                marginTop: 16,
                lineHeight: 1.5,
              }}
            >
              পরবর্তী পর্বে আমরা প্রবেশ করব পদার্থের গভীরতম জগতে—জানব কুলম্বের সূত্র, যোজ্য ইলেকট্রন এবং মুক্ত ইলেকট্রন সমুদ্রের গোপন রহস্য!
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 16,
            }}
          >
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: '#FFFFFF', fontWeight: 600 }}>
              বিদ্যুতের পাঠশালা • শূন্য থেকে বিদ্যুতের জগৎকে বোঝা
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: THEME.colors.brandCyan,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#0B0F19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <SubtitleCard
        text="পরের পর্বে আমরা পদার্থের পরমাণু ও চার্জের গূঢ় জগতে পা রাখব—চোখ রাখুন 'বিদ্যুতের পাঠশালা'-য়!"
        subtextEnglish="Stay tuned for Episode 02: Atoms and Electric Charge. Understanding electricity from zero!"
        durationInFrames={durationInFrames}
      />
    </AbsoluteFill>
  );
};
