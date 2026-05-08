import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

const PROJECTS = [
  {
    title: "Mortgage Calculator",
    status: "Featured",
    desc: "A smart tool to compare real mortgage costs — not just monthly payments.",
    action: "Try it",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    color: "#8b5cf6",
  },
  {
    title: "Recipe Finder",
    status: "In Progress",
    desc: "Click your ingredients and instantly discover recipes you can make.",
    action: "Preview",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    color: "#3b82f6",
  },
  {
    title: "Daily Converter",
    status: "Personal Project",
    desc: "A fast and simple unit converter for everyday use.",
    action: "Try it",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    color: "#10b981",
  },
];

export default function FullProfile(props) {
  const {
    themeMode,
    name,
    tagline,
    badgeText,
    accentColor,
    profileImage,
    useCustomColors,
    customBg,
    customText,
    customCard,
    customBorder,
  } = props;

  const isDark = themeMode === "Dark";

  // ✅ [STRICT LOGIC] 모드 전환 시 무조건 반전, 'Custom' 체크 시에만 피커 허용
  const theme = {
    bg: useCustomColors && customBg ? customBg : isDark ? "#000000" : "#FFFFFF",
    text:
      useCustomColors && customText
        ? customText
        : isDark
          ? "#FFFFFF"
          : "#000000",
    card:
      useCustomColors && customCard
        ? customCard
        : isDark
          ? "#111111"
          : "#F5F5F7",
    border:
      useCustomColors && customBorder
        ? customBorder
        : isDark
          ? "#222222"
          : "#E5E5E5",
  };

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer",
  ];

  return (
    <section style={{ ...sectionStyle, backgroundColor: theme.bg }}>
      <div
        style={{
          ...containerStyle,
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        {/* Profile Header */}
        <div style={profileHeaderStyle}>
          <div style={avatarWrapperStyle}>
            <div
              style={{
                ...glowStyle,
                background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
              }}
            />
            <img
              src={
                profileImage ||
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
              }
              alt="profile"
              style={avatarStyle}
            />
          </div>
          <h1 style={{ ...titleStyle, color: theme.text }}>{name}</h1>
          <p
            style={{
              ...taglineStyle,
              color: theme.text,
              opacity: 0.8,
            }}
          >
            {tagline}
          </p>
          <div
            style={{
              ...badgeStyle,
              backgroundColor: accentColor + "15",
              color: accentColor,
            }}
          >
            <div
              style={{
                ...dotStyle,
                backgroundColor: accentColor,
              }}
            />
            {badgeText}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={stackContainerStyle}>
          {techStack.map((item) => (
            <div
              key={item}
              style={{
                ...stackItemStyle,
                backgroundColor: theme.bg,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Featured Projects */}
        <div style={projectSectionHeaderStyle}>
          <h2 style={{ ...sectionTitleStyle, color: theme.text }}>
            Featured Projects
          </h2>
          <span style={{ ...viewAllStyle, color: accentColor }}>
            View all →
          </span>
        </div>

        <div style={projectListStyle}>
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              style={{
                ...projectCardStyle,
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              <div style={projectImageWrapperStyle}>
                <img src={p.image} alt={p.title} style={projectImageStyle} />
              </div>
              <div style={projectContentStyle}>
                <div
                  style={{
                    ...projectStatusStyle,
                    color: theme.text,
                    opacity: 0.6,
                  }}
                >
                  <div
                    style={{
                      ...statusDotStyle,
                      backgroundColor: p.color,
                    }}
                  />
                  {p.status}
                </div>
                <h3
                  style={{
                    ...projectTitleStyle,
                    color: theme.text,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    ...projectDescStyle,
                    color: theme.text,
                    opacity: 0.7,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    ...projectActionStyle,
                    color: accentColor,
                  }}
                >
                  {p.action} →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

addPropertyControls(FullProfile, {
  themeMode: {
    type: ControlType.Enum,
    title: "Theme Mode",
    options: ["Light", "Dark"],
    optionTitles: ["☀️ Light", "🌙 Dark"],
    defaultValue: "Light",
  },
  name: { type: ControlType.String, defaultValue: "Assembler" },
  tagline: {
    type: ControlType.String,
    defaultValue: "Building simple tools...",
    displayTextArea: true,
  },
  badgeText: { type: ControlType.String, defaultValue: "Solo Developer" },
  accentColor: {
    type: ControlType.Color,
    title: "Accent Color",
    defaultValue: "#8b5cf6",
  },

  // ✅ 커스텀 모드 스위치 추가 (이걸 켜야만 컬러 피커가 작동함)
  useCustomColors: {
    type: ControlType.Boolean,
    title: "Manual Override",
    defaultValue: false,
  },
  customBg: {
    type: ControlType.Color,
    title: "Custom BG",
    hidden(props) {
      return !props.useCustomColors;
    },
  },
  customText: {
    type: ControlType.Color,
    title: "Custom Text",
    hidden(props) {
      return !props.useCustomColors;
    },
  },
});

// --- Styles (CSS-in-JS) ---
const sectionStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  padding: "80px 20px",
  transition: "all 0.4s ease",
};
const containerStyle = {
  width: "100%",
  maxWidth: "768px",
  border: "1px solid",
  borderRadius: "40px",
  padding: "48px",
};
const profileHeaderStyle = {
  textAlign: "center" as const,
  marginBottom: "40px",
};
const avatarWrapperStyle = {
  position: "relative" as const,
  width: "144px",
  height: "144px",
  margin: "0 auto",
};
const glowStyle = {
  position: "absolute" as const,
  inset: 0,
  borderRadius: "50%",
  filter: "blur(20px)",
  opacity: 0.4,
};
const avatarStyle = {
  position: "relative" as const,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover" as const,
  border: "4px solid white",
};
const titleStyle = {
  fontSize: "60px",
  fontWeight: 800,
  margin: "24px 0 8px 0",
  letterSpacing: "-0.04em",
};
const taglineStyle = {
  fontSize: "18px",
  margin: "0 0 20px 0",
  lineHeight: 1.5,
};
const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 600,
};
const dotStyle = { width: "6px", height: "6px", borderRadius: "50%" };
const stackContainerStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "center",
  gap: "10px",
  marginBottom: "56px",
};
const stackItemStyle = {
  padding: "12px 20px",
  border: "1px solid",
  borderRadius: "16px",
  fontSize: "14px",
  fontWeight: 500,
};
const projectSectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};
const sectionTitleStyle = { fontSize: "30px", fontWeight: 700 };
const viewAllStyle = { fontSize: "14px", fontWeight: 600, cursor: "pointer" };
const projectListStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "24px",
};
const projectCardStyle = {
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: "24px",
  padding: "20px",
  border: "1px solid",
  borderRadius: "24px",
};
const projectImageWrapperStyle = {
  height: "180px",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative" as const,
};
const projectImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};
const projectContentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
};
const projectStatusStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 500,
};
const statusDotStyle = { width: "8px", height: "8px", borderRadius: "50%" };
const projectTitleStyle = {
  fontSize: "24px",
  fontWeight: 700,
  margin: "12px 0 8px 0",
};
const projectDescStyle = {
  fontSize: "16px",
  lineHeight: 1.6,
  marginBottom: "16px",
};
const projectActionStyle = { fontSize: "16px", fontWeight: 600 };
