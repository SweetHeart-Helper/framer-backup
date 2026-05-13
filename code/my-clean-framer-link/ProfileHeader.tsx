import * as React from "react";

export function ProfileHeader(props: any) {
  const { name, description, badge, image, theme, accentColor } = props;

  return (
    <div style={containerStyle}>
      <style>{`
                @media (max-width: 600px) {
                    .hero-title { font-size: 32px !important; }
                    .hero-image-wrapper { width: 100px !important; height: 100px !important; }
                    .hero-description { font-size: 15px !important; }
                }
            `}</style>

      <div style={styles.wrapper}>
        <div className="hero-image-wrapper" style={styles.imageWrapper}>
          {/* 엑센트 컬러 광채 효과 추가 */}
          <div
            style={{
              ...styles.glow,
              background: `radial-gradient(circle, ${accentColor}66 0%, transparent 70%)`,
            }}
          />
          <img src={image} alt="profile" style={styles.image} />
        </div>

        <h1
          className="hero-title"
          style={{ ...styles.title, color: theme.text }}
        >
          {name}
        </h1>

        <p
          className="hero-description"
          style={{
            ...styles.description,
            color: theme.text,
            opacity: 0.8,
          }}
        >
          {description}
        </p>

        <div
          style={{
            ...styles.badge,
            background: `${accentColor}14`, // 0.08 투명도 적용
            borderColor: `${accentColor}1F`, // 0.12 투명도 적용
          }}
        >
          <div style={{ ...styles.dot, background: accentColor }} />
          <span style={{ ...styles.badgeText, color: accentColor }}>
            {badge}
          </span>
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "30px 20px",
};

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
  },
  imageWrapper: {
    position: "relative" as const, // 광채 효과의 기준점이 되기 위해 추가
    width: "120px",
    height: "120px",
    borderRadius: "999px",
    padding: "5px",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(220,220,230,0.9) 100%)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    marginBottom: "24px",
    zIndex: 1, // 이미지와 광채의 순서 조절
  },
  // 광채(Glow) 스타일 새로 추가
  glow: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "140%", // 이미지보다 크게 설정
    height: "140%",
    borderRadius: "50%",
    filter: "blur(25px)",
    zIndex: -1, // 이미지 뒤로 배치
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "999px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(32px, 5vw, 56px)",
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  description: {
    marginTop: "16px",
    marginBottom: "24px",
    fontSize: "clamp(15px, 1.5vw, 18px)",
    lineHeight: 1.6,
    maxWidth: "600px",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(120, 119, 255, 0.08)",
    border: "1px solid rgba(120, 119, 255, 0.12)",
    padding: "8px 14px",
    borderRadius: "999px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6D5EF9",
  },
  badgeText: { fontSize: "14px", fontWeight: 600, color: "#5B4FF5" },
};
