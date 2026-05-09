import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

// 프로젝트 리스트 (기존 동일)
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

export default function FullProfile(props: any) {
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
    selectedStacks, // 기존 리스트
    stackCustomIcons, // ✅ 새로 추가된 업로드 이미지 뭉치
  } = props;

  const isDark = themeMode === "Dark";
  const finalAvatar =
    profileImage ||
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400";

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
            <img src={finalAvatar} alt="profile" style={avatarStyle} />
          </div>
          <h1 style={{ ...titleStyle, color: theme.text }}>{name}</h1>
          <p style={{ ...taglineStyle, color: theme.text, opacity: 0.8 }}>
            {tagline}
          </p>
          <div
            style={{
              ...badgeStyle,
              backgroundColor: accentColor + "15",
              color: accentColor,
            }}
          >
            <div style={{ ...dotStyle, backgroundColor: accentColor }} />
            {badgeText}
          </div>
        </div>

        {/* Tech Stack List (기존 리스트 방식 그대로 유지) */}
        {/* ✅ 수정된 Tech Stack: 구매자가 직접 입력하고 업로드한 리스트만 출력 */}
        {/* ✅ 통합된 테크 스택: 이름 입력, 업로드/크롭 결과 출력 */}
        {/* ✅ X 버튼으로 삭제 가능한 테크 스택 리스트 */}
        {/* ✅ 4가지 기능 통합: 이름 + 업로드 + 크롭 + 삭제(가시적 버튼) */}
        {/* ✅ 구매자가 목록에서 직접 삭제하면 화면에서도 즉시 제거됨 */}
        {/* ✅ Clear 스위치가 켜진 항목은 화면에서 싹 비워짐 */}
        <div style={stackContainerStyle}>
          {props.userStacks &&
            props.userStacks.map((item: any, index: number) => {
              // 1. Clear 스위치가 켜졌거나 2. 내용이 아예 없으면 화면에 표시하지 않음
              if (
                !item ||
                item.isCleared ||
                (!item.stackName && !item.stackIcon)
              )
                return null;

              return (
                <div
                  key={index}
                  style={{
                    ...stackItemStyle,
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E5E5",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {item.stackIcon && (
                    <img
                      src={item.stackIcon}
                      style={{
                        width: "16px",
                        height: "16px",
                        objectFit: "contain",
                      }}
                      alt={item.stackName}
                    />
                  )}
                  <span>{item.stackName || ""}</span>
                </div>
              );
            })}
        </div>

        {/* Featured Projects (기존 동일) */}
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
                    style={{ ...statusDotStyle, backgroundColor: p.color }}
                  />
                  {p.status}
                </div>
                <h3 style={{ ...projectTitleStyle, color: theme.text }}>
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
                <div style={{ ...projectActionStyle, color: accentColor }}>
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
  profileImage: { type: ControlType.Image, title: "Avatar Image" },
  name: { type: ControlType.String, defaultValue: "Assembler" },
  tagline: {
    type: ControlType.String,
    defaultValue: "Building simple tools that solve real problems.",
    displayTextArea: true,
  },
  badgeText: { type: ControlType.String, defaultValue: "Solo Developer" },
  accentColor: {
    type: ControlType.Color,
    title: "Accent Color",
    defaultValue: "#8b5cf6",
  },
  useCustomColors: {
    type: ControlType.Boolean,
    title: "Manual Override",
    defaultValue: false,
  },
  customBg: {
    type: ControlType.Color,
    title: "Custom BG",
    hidden: (props) => !props.useCustomColors,
  },
  customText: {
    type: ControlType.Color,
    title: "Custom Text",
    hidden: (props) => !props.useCustomColors,
  },

  // 기존 스택 선택 시스템 (건드리지 않음)
  // ✅ 구매자를 위한 4개 핵심 기능 (타이핑, 업로드, 삭제, Crop)
  userStacks: {
    type: ControlType.Array,
    title: "My Tech Stack",
    control: {
      type: ControlType.Object,
      controls: {
        // 1. 이름 입력 (타이핑)
        stackName: {
          type: ControlType.String,
          title: "Name",
          placeholder: "이름 입력",
        },
        // 2 & 4. 업로드 및 크롭 (아이콘)
        stackIcon: {
          type: ControlType.Image,
          title: "Icon",
        },
        // 3. 클리어 기능 (X나 휴지통보다 훨씬 직관적인 비우기 스위치)
        isCleared: {
          type: ControlType.Boolean,
          title: "✨ Clear Content",
          defaultValue: false,
        },
      },
    },
    defaultValue: [{ stackName: "React" }, { stackName: "Next.js" }],
  },
  // ✅ 추가: 아이콘이 안 나올 때 직접 업로드할 수 있는 칸만 딱 추가했습니다!
  stackCustomIcons: {
    type: ControlType.Array,
    title: "Upload Custom Icons",
    control: {
      type: ControlType.Object,
      controls: {
        icon: { type: ControlType.Image, title: "Icon File" },
      },
    },
  },
});

// [Styles - 기존 동일]
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
  margin: "0 auto 24px auto",
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
  fontSize: "52px",
  fontWeight: 800,
  margin: "0 0 12px 0",
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

// [Data] 기존 주소 (그대로 유지)
const STACK_ICONS: { [key: string]: string } = {
  React: "https://framerusercontent.com/images/OK6y9S8S4f8S.png",
  "Next.js": "",
  TypeScript: "",
  "Tailwind CSS": "",
  Framer: "",
};
