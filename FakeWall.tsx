import * as React from "react";
import { addPropertyControls, ControlType } from "framer";

// props: any를 사용하여 타입 에러를 방지했습니다.
export default function FakeWall(props: any) {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontSize: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      🧱 가벽이 튼튼하게 세워졌습니다. <br />
      우측 속성창에서 4개의 폴더를 확인하세요!
    </div>
  );
}

// 가벽(뼈대) 및 이삿짐 구조 정리
addPropertyControls(FakeWall, {
  /* --- [SECTION 1] 1번 방: 프로필 설정 --- */
  showProfileSettings: {
    type: ControlType.Boolean,
    title: "📂 Profile Settings",
    defaultValue: true,
  },
  profileImage: {
    type: ControlType.Image,
    title: "└ Avatar Image",
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
    defaultValue: "Building simple tools that solve real problems.",
    displayTextArea: true,
    hidden: (props) => !props.showProfileSettings,
  },
  badgeText: {
    type: ControlType.String,
    title: "└ Badge Text",
    defaultValue: "Solo Developer",
    hidden: (props) => !props.showProfileSettings,
  },

  /* --- [SECTION 2] 2번 방: 디자인 시스템 --- */
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

  /* --- [SECTION 3] 3번 방: 테크 스택 --- */
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

  /* --- [SECTION 4] 4번 방: 프로젝트 가벽 --- */
  showProjectSettings: {
    type: ControlType.Boolean,
    title: "📂 Project Details",
    defaultValue: false,
  },
});
