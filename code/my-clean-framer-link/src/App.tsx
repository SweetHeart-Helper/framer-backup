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
        <ProfileHeader
          name={name}
          tagline={tagline}
          badgeText={badgeText}
          profileImage={profileImage}
          theme={theme}
          accentColor={accentColor}
        />

        <TechStackList techStacks={userStacks} theme={theme} isDark={isDark} />

        <div style={{ height: "40px" }} />

        <ProjectList
          projects={userProjects}
          viewAllLink={viewAllUrl}
          theme={theme}
          accentColor={accentColor}
        />

        {showLinkSettings && userLinks && userLinks.length > 0 && (
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <LinkButtons
              links={userLinks}
              theme={theme}
              accentColor={accentColor}
            />
          </div>
        )}

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

  showTechStack: {
    type: ControlType.Boolean,
    title: "📂 Tech Stack List",
    defaultValue: true,
  },
  userStacks: {
    type: ControlType.Array,
    title: "  └ My Tech Stack",
    hidden: (props) => !props.showTechStack,
    control: {
      type: ControlType.Object,
      controls: {
        stackName: { type: ControlType.String, title: "Name" },
        stackIcon: {
          type: ControlType.Image,
          title: "Icon",
        },
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
        linkIcon: {
          type: ControlType.Image,
          title: "Icon",
        },
        url: {
          type: ControlType.String,
          title: "URL",
          defaultValue: "https://",
        },
        isCleared: {
          type: ControlType.Boolean,
          title: "✨ Clear",
          defaultValue: false,
        },
      },
    },
  },

  showStayInTouch: {
    type: ControlType.Boolean,
    title: "📂 Stay In Touch",
    defaultValue: true,
  },
  isVisible: {
    type: ControlType.Boolean,
    title: "  └ 👁️ Show Section",
    defaultValue: true,
    hidden: (props) => !props.showStayInTouch,
  },
  subscribeData: {
    type: ControlType.Array,
    title: "  └ 📝 Edit Content",
    hidden: (props) => !props.showStayInTouch || !props.isVisible,
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, title: "Title" },
        desc: { type: ControlType.String, title: "Desc" },
      },
    },
  },
  formAction: {
    type: ControlType.String,
    title: "  └ 🔗 Action URL",
    placeholder: "https://formspree.io/f/your-id",
    hidden: (props) => !props.showStayInTouch || !props.isVisible,
  },
  calendarUrl: {
    type: ControlType.String,
    title: "  └ 🗓️ Calendar URL",
    defaultValue: "https://calendly.com/",
    hidden: (props) => !props.showStayInTouch || !props.isVisible,
  },
});
