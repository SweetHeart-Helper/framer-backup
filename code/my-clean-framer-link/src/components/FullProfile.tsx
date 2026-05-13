import * as React from "react";
{
  /* import { addPropertyControls, ControlType } from "framer";*/
}
import { ProjectList } from "./ProjectComponents";

export default function FullProfile(props: any) {
  const {
    themeMode,
    accentColor,
    useCustomColors,
    customBg,
    customText,
    customCard,
    customBorder,
    userProjects,
  } = props;

  // 에러 해결: theme 계산 전에 변수들이 먼저 정의되어야 합니다.
  const isDark = themeMode === "Dark";

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
          color: theme.text,
        }}
      >
        {/* --- [4번 방] Project List 컴포넌트 호출 --- */}
        <ProjectList
          projects={userProjects}
          theme={theme}
          accentColor={accentColor}
          viewAllLink={props.viewAllLink}
        />
      </div>
    </section>
  );
}

// 에러 해결: 유실된 공통 스타일 정의
const sectionStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "40px 20px",
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "800px",
  borderRadius: "32px",
  border: "1px solid",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "48px",
};

// ... addPropertyControls 로직 유지
