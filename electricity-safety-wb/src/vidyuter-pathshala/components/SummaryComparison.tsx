import React from 'react';
import { THEME } from '../styles/constants';

export const SummaryComparison: React.FC = () => {
  return (
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
      {/* LEFT: STATIC ELECTRICITY */}
      <div
        style={{
          flex: 1,
          height: '100%',
          background: THEME.colors.bgCard,
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: 24,
          padding: 36,
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: THEME.colors.electronBlue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 'bold',
            }}
          >
            ১
          </div>
          <div>
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 32, fontWeight: 700, color: THEME.colors.electronBlue }}>
              স্থির তড়িৎ
            </div>
            <div style={{ fontFamily: THEME.fonts.english, fontSize: 15, color: THEME.colors.textMuted }}>
              Static Electricity (Stationary Charge)
            </div>
          </div>
        </div>

        <div style={{ height: 2, background: 'rgba(56, 189, 248, 0.2)', margin: '14px 0 20px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ color: THEME.colors.electronBlue, fontSize: 20 }}>🔹</span>
            <div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
                চার্জের প্রকৃতি
              </div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textMuted }}>
                বৈদ্যুতিক চার্জ বস্তুর পৃষ্ঠে সঞ্চিত বা জমা হয়ে থাকে, অবিরাম প্রবাহিত হয় না।
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ color: THEME.colors.electronBlue, fontSize: 20 }}>🔹</span>
            <div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
                বাস্তব উদাহরণ
              </div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textMuted }}>
                চুলে ঘষা চিরুনির আকর্ষণ, শীতের উলের পোশাকের চটচট শব্দ, আকাশের বজ্রপাত।
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ color: THEME.colors.electronBlue, fontSize: 20 }}>🔹</span>
            <div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
                শক্তির প্রয়োগ
              </div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textMuted }}>
                ক্ষণিক ও অনিয়ন্ত্রিত স্রাব (Discharge); স্থায়ী মোটর বা বাতি জ্বালানো সম্ভব নয়।
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: CURRENT ELECTRICITY */}
      <div
        style={{
          flex: 1,
          height: '100%',
          background: THEME.colors.bgCard,
          border: '1px solid rgba(251, 191, 36, 0.4)',
          borderRadius: 24,
          padding: 36,
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: THEME.colors.currentAmber,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            ২
          </div>
          <div>
            <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 32, fontWeight: 700, color: THEME.colors.currentAmber }}>
              চল তড়িৎ
            </div>
            <div style={{ fontFamily: THEME.fonts.english, fontSize: 15, color: THEME.colors.textMuted }}>
              Electric Current (Dynamic Continuous Flow)
            </div>
          </div>
        </div>

        <div style={{ height: 2, background: 'rgba(251, 191, 36, 0.2)', margin: '14px 0 20px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ color: THEME.colors.currentAmber, fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
                চার্জের প্রকৃতি
              </div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textMuted }}>
                একটি বদ্ধ পরিবাহী বর্তনীর (Closed Circuit) মধ্য দিয়ে চার্জের নিয়মিত ও অবিরাম প্রবাহ।
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ color: THEME.colors.currentAmber, fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
                বাস্তব উদাহরণ
              </div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textMuted }}>
                টর্চের ব্যাটারি, ঘরের তারের বিদ্যুৎ, ফ্যান, রেফ্রিজারেটর ও পাওয়ার গ্রিড।
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ color: THEME.colors.currentAmber, fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
                শক্তির প্রয়োগ
              </div>
              <div style={{ fontFamily: THEME.fonts.bengali, fontSize: 16, color: THEME.colors.textMuted }}>
                অবিচ্ছিন্ন নিয়ন্ত্রিত শক্তি যা আলো, তাপ, শব্দ ও যান্ত্রিক গতি তৈরি করে বিশ্বকে চালায়।
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
