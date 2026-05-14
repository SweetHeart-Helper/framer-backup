// src/App.tsx

import ProfileHeader from "./components/ProfileHeader";
import { ProjectList } from "./components/ProjectComponents";
import { TechStackList } from "./components/TechStackList";
import { LinkButtons } from "./components/LinkButtons";
import StayInTouch from "./components/StayInTouch";
import { addPropertyControls, ControlType } from "framer";
function App(props: any) {
  const {
    name = "사용자 이름",
    tagline = "Next.js와 Framer로 템플릿을 만드는 제작자입니다.",
    badgeText = "Available for Projects",
    profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000",
    accentColor = "#007AFF",
    themeMode = "Light",
    isVisible = true,
    subscribeData = [{ title: "Stay in Touch", desc: "Let's connect!" }],
    formAction = "",
    calendarUrl = "https://calendly.com/",
    useCustomColors = false,
    customBg = "#ffffff",
    customText = "#1d1d1f",
    customCard = "#f5f5f7",
    customBorder = "#e5e5e5",
    userStacks = [],
    viewAllUrl = "https://",
    userProjects = [],
    showLinkSettings = true,
    userLinks = [],
  } = props;

  const isDark = themeMode === "Dark";

  // 20.tsx 원본 기준 다크/라이트 모드 컬러 시스템
  const theme = {
    bg: useCustomColors ? customBg : isDark ? "#0D0D0D" : "#FFFFFF",
    text: useCustomColors ? customText : isDark ? "#FFFFFF" : "#1D1D1F",
    card: useCustomColors ? customCard : isDark ? "#1A1A1A" : "#F5F5F7",
    border: useCustomColors ? customBorder : isDark ? "#262626" : "#E5E5E5",
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: "100vh",
        padding: "60px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* 1. 헤더 */}
        <ProfileHeader
          name={name}
          tagline={tagline}
          badgeText={badgeText}
          profileImage={profileImage}
          theme={theme}
          accentColor={accentColor}
        />

        {/* 2. 기술 스택 - 여기서 사용하면 경고가 사라집니다! */}

        <TechStackList techStacks={userStacks} theme={theme} isDark={isDark} />

        <div style={{ height: "40px" }} />

        {/* 3. 프로젝트 리스트 - 속성창 데이터 연결 */}
        <ProjectList
          projects={userProjects}
          viewAllLink={viewAllUrl}
          theme={theme}
          accentColor={accentColor}
        />
        {/* --- Social Links (20.tsx 로직 기반 반응형) --- */}

        {/* 🟢 20.tsx의 반응형 디자인이 담긴 LinkButtons 연결 */}
        {showLinkSettings && userLinks && userLinks.length > 0 && (
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <LinkButtons
              links={userLinks} // Framer에서 입력한 링크 배열 전달
              theme={theme} // 20.tsx의 컬러 시스템 전달
              accentColor={accentColor}
            />
          </div>
        )}

        {/* 🔴 [수정] StayInTouch 컴포넌트에 변수들을 연결해줘야 에러가 사라집니다. */}
        <div style={{ marginTop: "60px" }}>
          {isVisible && (
            <StayInTouch
              isVisible={isVisible}
              subscribeData={subscribeData}
              formAction={formAction}
              calendarUrl={calendarUrl}
              isDark={isDark}
              theme={theme}
              accentColor={accentColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

addPropertyControls(App, {
  /* 📂 [1번 방] Profile Settings - Yes/No 스위치 적용 */
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
    defaultValue: "사용자 이름",
    hidden: (props) => !props.showProfileSettings,
  },
  tagline: {
    type: ControlType.String,
    title: "└ Tagline",
    defaultValue: "Next.js와 Framer로 템플릿을 만드는 제작자입니다.",
    displayTextArea: true,
    hidden: (props) => !props.showProfileSettings,
  },
  badgeText: {
    type: ControlType.String,
    title: "└ Badge",
    defaultValue: "Available for Projects",
    hidden: (props) => !props.showProfileSettings,
  },

  /* 📂 [2번 방] Design System - 기존 변수명 엄격 준수 */
  /* 📂 [2번 방] Design System - Yes/No 스위치 추가 */
  /* 📂 [2번 방] Design System */
  showDesignSystem: {
    type: ControlType.Boolean,
    title: "📂 Design System",
    defaultValue: true,
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
  // 쏙 빠졌던 Manual Override 기능 추가
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

  /* 📂 [3번 방] Tech Stack - 이미지와 완벽하게 일치하도록 수정 */
  showTechStack: {
    type: ControlType.Boolean,
    title: "📂 Tech Stack List", // 이미지와 동일한 타이틀
    defaultValue: true,
  },
  userStacks: {
    type: ControlType.Array,
    title: "  └ My Tech Stack", // 이미지와 동일한 하위 타이틀
    hidden: (props) => !props.showTechStack,
    control: {
      type: ControlType.Object,
      controls: {
        stackName: { type: ControlType.String, title: "Name" },
        stackIcon: {
          type: ControlType.Image,
          title: "Icon",
        },
        // 20.tsx 원본에 있는 초기화 스위치 추가
        isCleared: {
          type: ControlType.Boolean,
          title: "✨ Clear",
          defaultValue: false,
        },
      },
    },
    defaultValue: [
      { stackName: "React", stackIcon: "" },
      { stackName: "Next.js", stackIcon: "" },
    ],
  },

  /* 📂 [4번 방] Project Details */
  showProjectDetails: {
    type: ControlType.Boolean,
    title: "📂 Project Details",
    defaultValue: true,
  },
  viewAllUrl: {
    type: ControlType.String,
    title: "  └ View All URL",
    placeholder: "https://",
    hidden: (props) => !props.showProjectDetails,
  },
  userProjects: {
    type: ControlType.Array,
    title: "  └ My Projects",
    hidden: (props) => !props.showProjectDetails,
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, title: "Title" },
        status: { type: ControlType.String, title: "Status" },
        desc: {
          type: ControlType.String,
          title: "Desc",
          displayTextArea: true,
          placeholder: "A smart tool...",
        },
        image: { type: ControlType.Image, title: "Image" },
        color: { type: ControlType.Color, title: "Color" },
        action: {
          type: ControlType.String,
          title: "Button",
          placeholder: "Try it",
        },
        link: {
          type: ControlType.String,
          title: "Link URL",
          placeholder: "https:// (▼ Scroll)",
        },
        isCleared: {
          type: ControlType.Boolean,
          title: "✨ Clear",
          defaultValue: false,
        },
      },
    },
    defaultValue: [
      {
        title: "Mortgage Calculator",
        status: "Featured",
        desc: "A smart tool...",
        action: "Try it",
        link: "https://",
      },
    ],
  },
  /* 🟢 5번 방 Social Links (이미지의 폴더 구조와 일치) */
  /* 🟢 5번 방 Social Links 설정 */
  showLinkSettings: {
    type: ControlType.Boolean,
    title: "📂 Social Links",
    defaultValue: true,
  },
  userLinks: {
    type: ControlType.Array,
    title: "  └ My Links",
    hidden: (props) => !props.showLinkSettings,
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, title: "Title" },
        linkIcon: { type: ControlType.Image, title: "Icon" }, // 20.tsx의 이미지 아이콘
        url: { type: ControlType.String, title: "URL" },
        isCleared: { type: ControlType.Boolean, title: "✨ Clear" },
      },
    },
  },

  /* 📂 [6번 방] Stay In Touch - 기존 변수명 엄격 준수 */
  isVisible: {
    type: ControlType.Boolean,
    title: "Show StayInTouch",
    defaultValue: true,
  },
  calendarUrl: {
    type: ControlType.String,
    title: "Coffee Chat URL",
    defaultValue: "https://calendly.com/",
  },
  formAction: {
    type: ControlType.String,
    title: "Formspree URL",
    placeholder: "https://formspree.io/f/your-id",
  },
  // subscribeData는 App.tsx 상단에서 배열로 사용하므로 명칭 유지
  subscribeData: {
    type: ControlType.Array,
    title: "Subscribe Content",
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, title: "Title" },
        desc: { type: ControlType.String, title: "Desc" },
      },
    },
  },
});
