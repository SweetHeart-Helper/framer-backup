import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

interface DeveloperProps {
  theme: "light" | "dark";
  devName: string;
  bgColor: string; // 우선 배경색 피커만
  textColor: string; // 우선 글자색 피커만
}

export default function Developer(props: DeveloperProps) {
  const { theme, devName, bgColor, textColor } = props;

  const isDark = theme === "dark";

  // 1. 색상 결정 로직 (사용자가 피커로 고르면 그 색, 아니면 테마 기본값)
  const finalBg = bgColor || (isDark ? "#111111" : "#FFFFFF");
  const finalText = textColor || (isDark ? "#EEEEEE" : "#111111");

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: finalBg, // 피커 값 적용
    color: finalText, // 피커 값 적용
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontFamily: "sans-serif",
  };

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>
        {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </div>
      <h1 style={{ margin: 0 }}>{devName}</h1>
    </div>
  );
}

addPropertyControls(Developer, {
  theme: {
    type: ControlType.Enum,
    options: ["light", "dark"],
    optionTitles: ["Light", "Dark"],
    title: "Theme Mode",
  },
  devName: {
    type: ControlType.String,
    defaultValue: "Developer",
    title: "Dev Name",
  },
  // 가장 실용적인 2가지 피커만 먼저 노출
  bgColor: {
    type: ControlType.Color,
    title: "Background",
  },
  textColor: {
    type: ControlType.Color,
    title: "Text",
  },
});
