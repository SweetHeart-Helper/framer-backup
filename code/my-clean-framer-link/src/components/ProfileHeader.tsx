import React from "react";

export interface Theme {
  bg: string;
  text: string;
  card: string;
  border: string;
}

export interface ProfileHeaderProps {
  name: string;
  tagline: string;
  badgeText: string;
  profileImage?: string;
  theme: Theme;
  accentColor: string;
}

export default function ProfileHeader({
  name,
  tagline,
  badgeText,
  profileImage,
  theme,
  accentColor,
}: ProfileHeaderProps) {
  const finalAvatar =
    profileImage ||
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400";

  return (
    <div style={profileHeaderStyle}>
      <div style={avatarWrapperStyle}>
        {/* 아바타 뒤의 글로우 효과 */}
        <div
          style={{
            ...glowStyle,
            background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
          }}
        />
        <img src={finalAvatar} alt="profile" style={avatarStyle} />
      </div>

      <h1 style={{ ...titleStyle, color: theme.text }}>{name}</h1>

      <p style={{ ...taglineStyle, color: theme.text, opacity: 0.8 }}>
        {tagline}
      </p>

      {/* 상태 배지 영역 */}

      <div
        style={{
          ...badgeStyle,
          backgroundColor: "transparent", // 배경은 투명하게
          position: "relative",
          color: accentColor,
          overflow: "hidden",
        }}
      >
        {/* 무조건 적용되는 음영 레이어 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: accentColor, // 사용자가 고른 색상 그대로 사용
            opacity: 0.12, // 여기서 투명도 15% 강제 적용
            zIndex: 0,
          }}
        />

        {/* Content Layer */}
        <div style={{ ...dotStyle, backgroundColor: accentColor, zIndex: 1 }} />
        <span style={{ zIndex: 1 }}>{badgeText}</span>
      </div>
    </div>
  );
}

const profileHeaderStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "40px",
};

const avatarWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "144px",
  height: "144px",
  margin: "0 auto 24px auto",
};

const glowStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  filter: "blur(20px)",
  opacity: 0.4,
};

const avatarStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid white",
};

const titleStyle: React.CSSProperties = {
  fontSize: "52px",
  fontWeight: 800,
  margin: "0 0 12px 0",
  letterSpacing: "-0.04em",
};

const taglineStyle: React.CSSProperties = {
  fontSize: "18px",
  margin: "0 0 20px 0",
  lineHeight: 1.5,
};

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
};

const dotStyle: React.CSSProperties = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
};
