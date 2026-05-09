import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

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
    userStacks, // 3번 방: 테크 스택 데이터
    userProjects, // 4번 방: 프로젝트 데이터
  } = props;

  const isDark = themeMode === "Dark";
  const finalAvatar =
    profileImage ||
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400";

  // 테마 설정 (2번 방 Manual Override 반영)
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
        {/* --- [1번 방 데이터 출력] Profile Header --- */}
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

        {/* --- [3번 방 데이터 출력] Tech Stack List --- */}
        <div style={stackContainerStyle}>
          {userStacks &&
            userStacks.map((item: any, index: number) => {
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

                    backgroundColor: isDark ? "#F5F5F7" : "#FFFFFF",

                    borderColor: isDark ? "#E5E5E5" : theme.border,

                    color: "#1d1d1f",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
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
                  <span style={{ fontWeight: 600 }}>
                    {item.stackName || ""}
                  </span>
                </div>
              );
            })}
        </div>

        {/* --- [4번 방 데이터 출력] Featured Projects --- */}
        <div style={projectSectionHeaderStyle}>
          <h2 style={{ ...sectionTitleStyle, color: theme.text }}>
            Featured Projects
          </h2>
          <span style={{ ...viewAllStyle, color: accentColor }}>
            View all →
          </span>
        </div>

        <div style={projectListStyle}>
          {userProjects &&
            userProjects.map((p: any, index: number) => (
              <div
                key={index}
                style={{
                  ...projectCardStyle,
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div style={projectImageWrapperStyle}>
                  <img
                    src={
                      p.image ||
                      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200"
                    }
                    alt={p.title}
                    style={projectImageStyle}
                  />
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
                        backgroundColor: p.color || accentColor,
                      }}
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
                  <div
                    style={{
                      ...projectActionStyle,
                      color: p.color || accentColor,
                    }}
                  >
                    {p.action || "Try it"} →
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

// --- [속성창 가벽 세우기] ---
addPropertyControls(FullProfile, {
  /* 📂 [1번 방] Profile Settings */
  showProfileSettings: {
    type: ControlType.Boolean,
    title: "📂 Profile Settings",
    defaultValue: true,
  },
  profileImage: {
    type: ControlType.Image,
    title: "└ Avatar",
    hidden: (props) => !props.showProfileSettings,
  },
  name: {
    type: ControlType.String,
    title: "└ Name",
    defaultValue: "Assembler",
    hidden: (props) => !props.showProfileSettings,
  },
  tagline: {
    type: ControlType.String,
    title: "└ Tagline",
    defaultValue: "Building simple tools...",
    displayTextArea: true,
    hidden: (props) => !props.showProfileSettings,
  },
  badgeText: {
    type: ControlType.String,
    title: "└ Badge",
    defaultValue: "Solo Developer",
    hidden: (props) => !props.showProfileSettings,
  },

  /* 📂 [2번 방] Design System */
  showDesignSystem: {
    type: ControlType.Boolean,
    title: "📂 Design System",
    defaultValue: false,
  },
  themeMode: {
    type: ControlType.Enum,
    title: "└ Theme Mode",
    options: ["Light", "Dark"],
    optionTitles: ["☀️ Light", "🌙 Dark"],
    defaultValue: "Light",
    hidden: (props) => !props.showDesignSystem,
  },
  accentColor: {
    type: ControlType.Color,
    title: "└ Accent Color",
    defaultValue: "#8b5cf6",
    hidden: (props) => !props.showDesignSystem,
  },
  useCustomColors: {
    type: ControlType.Boolean,
    title: "└ Manual Override",
    defaultValue: false,
    hidden: (props) => !props.showDesignSystem,
  },
  customBg: {
    type: ControlType.Color,
    title: "  └ Custom BG",
    hidden: (props) => !props.showDesignSystem || !props.useCustomColors,
  },
  customText: {
    type: ControlType.Color,
    title: "  └ Custom Text",
    hidden: (props) => !props.showDesignSystem || !props.useCustomColors,
  },
  customCard: {
    type: ControlType.Color,
    title: "  └ Custom Card",
    hidden: (props) => !props.showDesignSystem || !props.useCustomColors,
  },
  customBorder: {
    type: ControlType.Color,
    title: "  └ Custom Border",
    hidden: (props) => !props.showDesignSystem || !props.useCustomColors,
  },

  /* 📂 [3번 방] Tech Stack List */
  showStackSettings: {
    type: ControlType.Boolean,
    title: "📂 Tech Stack List",
    defaultValue: false,
  },
  userStacks: {
    type: ControlType.Array,
    title: "└ My Tech Stack",
    hidden: (props) => !props.showStackSettings,
    control: {
      type: ControlType.Object,
      controls: {
        stackName: { type: ControlType.String, title: "Name" },
        stackIcon: { type: ControlType.Image, title: "Icon" },
        isCleared: {
          type: ControlType.Boolean,
          title: "✨ Clear",
          defaultValue: false,
        },
      },
    },
    defaultValue: [{ stackName: "React" }, { stackName: "Next.js" }],
  },

  /* 📂 [4번 방] Project Details */
  showProjectSettings: {
    type: ControlType.Boolean,
    title: "📂 Project Details",
    defaultValue: false,
  },
  userProjects: {
    type: ControlType.Array,
    title: "└ My Projects",
    hidden: (props) => !props.showProjectSettings,
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, title: "Title" },
        status: { type: ControlType.String, title: "Status" },
        desc: {
          type: ControlType.String,
          title: "Desc",
          displayTextArea: true,
        },
        image: { type: ControlType.Image, title: "Image" },
        color: { type: ControlType.Color, title: "Color" },
        action: {
          type: ControlType.String,
          title: "Button",
          defaultValue: "Try it",
        },
      },
    },
    defaultValue: [
      {
        title: "Mortgage Calculator",
        status: "Featured",
        desc: "A smart tool...",
        color: "#8b5cf6",
      },
      {
        title: "Recipe Finder",
        status: "In Progress",
        desc: "Discover recipes...",
        color: "#3b82f6",
      },
    ],
  },
});

// --- [스타일 정의] (기존 스타일 동일 유지) ---
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
  objectFit: "contain" as const,
  backgroundColor: "#F5F5F7",
  padding: "10px",
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
